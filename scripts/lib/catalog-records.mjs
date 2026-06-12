import fs from "fs";
import path from "path";
import {
  CN_JSON_SOURCES,
  EXPANDED_BULK_JSON_SOURCES,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./food-catalog.mjs";

const SOURCE_PRIORITY = {
  expanded: 100,
  "expanded-tea": 100,
  tcm: 95,
  cn: 80,
  "cn-ingredients": 85,
  "expanded-bulk": 35,
  origin: 5,
  runtime: 45
};

const CN_FILE_PRIORITY = {
  "foods-ingredients.json": "cn-ingredients",
  "foods-medicine-homologous.json": "cn",
  "expansion-batch4.json": "cn",
  "regional-foods.json": "cn",
  "foods-regional-batch2.json": "cn",
  "foods-seasonal-river.json": "cn",
  "foods-modern-regional-batch.json": "cn-ingredients",
  "foods-pairing-supplement.json": "cn"
};

function scoreRecord(record, sourceKind) {
  const fields = [
    record?.summary,
    record?.caution,
    record?.flavor,
    record?.faCategory,
    ...(record?.aliases || []),
    ...(record?.searchTerms || []),
    ...(record?.effects || []),
    ...(record?.provinces || [])
  ].filter(Boolean).length;
  const bonus = (record?.officialFoodMedicine ? 20 : 0)
    + (record?.pharmacopoeiaEdition ? 15 : 0)
    + (record?.isOriginProduct ? 30 : 0);
  return fields + bonus + (SOURCE_PRIORITY[sourceKind] || 40);
}

function decodeJsStringLiteral(value) {
  if (!value || !value.includes("\\u")) return value;
  return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function isDietaryCatalogRow(row) {
  return Boolean(
    row.record?.officialFoodMedicine
    || row.record?.inDietaryUse
    || row.record?.itemKind === "food-medicine"
    || (row.record?.category && row.record.category !== "中药材" && row.record?.itemKind !== "tcm-herb")
  );
}

const DIETARY_SOURCE_RANK = {
  "cn-ingredients": 5,
  cn: 4,
  expanded: 3,
  "expanded-tea": 3,
  tcm: 1
};

function shouldReplaceCatalogRow(existing, incoming) {
  if (!existing) return true;
  const existingDietary = isDietaryCatalogRow(existing);
  const incomingDietary = isDietaryCatalogRow(incoming);
  if (incomingDietary && !existingDietary) return true;
  if (existingDietary && !incomingDietary) return false;
  if (existingDietary && incomingDietary) {
    const existingRank = DIETARY_SOURCE_RANK[existing.source] || 2;
    const incomingRank = DIETARY_SOURCE_RANK[incoming.source] || 2;
    if (incomingRank !== existingRank) return incomingRank > existingRank;
  }
  return incoming.score > existing.score;
}

function pushRecord(map, row) {
  if (!row?.id || !row?.name) return;
  const existing = map.get(row.id);
  if (shouldReplaceCatalogRow(existing, row)) {
    map.set(row.id, row);
  }
}

export function loadOriginProductIds() {
  const products = readCnJson("origin-products.json", readCnJson("origin-products.seed.json", []));
  return new Set(products.map((p) => p.id).filter(Boolean));
}

export function loadCatalogRecords() {
  const records = new Map();

  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  let m;
  const fRe = /f\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  while ((m = fRe.exec(expanded))) {
    const name = decodeJsStringLiteral(m[2]);
    pushRecord(records, {
      id: m[1],
      name,
      source: "expanded",
      sourceFile: "foods-expanded.js",
      record: { id: m[1], name },
      score: scoreRecord({}, "expanded")
    });
  }
  const teaRe = /tea\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  while ((m = teaRe.exec(expanded))) {
    const name = decodeJsStringLiteral(m[2]);
    pushRecord(records, {
      id: m[1],
      name,
      source: "expanded-tea",
      sourceFile: "foods-expanded.js",
      record: { id: m[1], name },
      score: scoreRecord({}, "expanded-tea")
    });
  }

  CN_JSON_SOURCES.forEach((file) => {
    const kind = CN_FILE_PRIORITY[file] || "cn";
    readCnJson(file, []).forEach((food) => {
      pushRecord(records, {
        id: food.id,
        name: food.name,
        source: kind,
        sourceFile: `data/cn/${file}`,
        record: food,
        score: scoreRecord(food, kind)
      });
    });
  });

  EXPANDED_BULK_JSON_SOURCES.forEach((file) => {
    readCnJson(file, []).forEach((food) => {
      pushRecord(records, {
        id: food.id,
        name: food.name,
        source: "expanded-bulk",
        sourceFile: `data/cn/${file}`,
        record: food,
        score: scoreRecord(food, "expanded-bulk")
      });
    });
  });

  readCnJson("origin-products.json", readCnJson("origin-products.seed.json", [])).forEach((product) => {
    pushRecord(records, {
      id: product.id,
      name: product.name,
      source: "origin",
      sourceFile: "data/cn/origin-products.json",
      record: { ...product, isOriginProduct: true },
      score: scoreRecord({ ...product, isOriginProduct: true }, "origin")
    });
  });

  const tcmPath = path.join(root, "data", "tcm", "herbs-chp2025.json");
  if (fs.existsSync(tcmPath)) {
    JSON.parse(fs.readFileSync(tcmPath, "utf8")).forEach((herb) => {
      pushRecord(records, {
        id: herb.id,
        name: herb.name,
        source: "tcm",
        sourceFile: "data/tcm/herbs-chp2025.json",
        record: { ...herb, itemKind: "tcm-herb", category: "中药材" },
        score: scoreRecord(herb, "tcm")
      });
    });
  }

  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const runtimeMatch = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
  if (runtimeMatch) {
    const blockRe = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?\}/g;
    while ((m = blockRe.exec(runtimeMatch[1]))) {
      pushRecord(records, {
        id: m[1],
        name: m[2],
        source: "runtime",
        sourceFile: "app.js",
        record: { id: m[1], name: m[2] },
        score: scoreRecord({}, "runtime")
      });
    }
  }

  return records;
}

export function findDuplicateNameGroups(aliasMap = loadFoodIdAliasMap()) {
  const records = loadCatalogRecords();
  const originIds = loadOriginProductIds();
  const byName = new Map();

  records.forEach((row) => {
    const key = String(row.name || "").trim();
    if (!key) return;
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(row);
  });

  return [...byName.entries()]
    .map(([name, rows]) => {
      const distinct = [...new Map(rows.map((r) => [r.id, r])).values()];
      const canonicalSet = new Set(distinct.map((r) => resolveFoodId(r.id, aliasMap)));
      return { name, rows: distinct, canonicalSet };
    })
    .filter((group) => group.canonicalSet.size > 1)
    .filter((group) => {
      const originRows = group.rows.filter((r) => originIds.has(r.id) || r.record?.isOriginProduct);
      const nonOriginRows = group.rows.filter((r) => !originIds.has(r.id) && !r.record?.isOriginProduct);
      if (originRows.length && nonOriginRows.length <= 1) return nonOriginRows.length > 0;
      return group.rows.length > 1;
    });
}

function isFoodLibraryRow(row) {
  if (row.record?.officialFoodMedicine || row.record?.itemKind === "food-medicine") return true;
  return row.record?.category !== "中药材" && row.record?.itemKind !== "tcm-herb";
}

const CURATED_SHADOW_ID_RE = /^c1[0-9]{1,2}-[a-z]{2}-/;

function curatedShadowPenalty(id) {
  return CURATED_SHADOW_ID_RE.test(id) ? 1 : 0;
}

export function loadFoodMedicineCanonicalByName() {
  const file = path.join(root, "data", "cn", "food-medicine-catalog.json");
  if (!fs.existsSync(file)) return new Map();
  return new Map(
    JSON.parse(fs.readFileSync(file, "utf8")).map((row) => [row.name, row.canonicalId])
  );
}

export function findVisibleCnDuplicateNameGroups(aliasMap = loadFoodIdAliasMap()) {
  const byName = new Map();
  CN_JSON_SOURCES.forEach((file) => {
    readCnJson(file, []).forEach((food) => {
      if (food.hiddenFromLibrary || !food.name) return;
      const name = String(food.name).trim();
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push({
        id: food.id,
        name,
        source: CN_FILE_PRIORITY[file] || "cn",
        sourceFile: `data/cn/${file}`,
        record: food,
        score: scoreRecord(food, CN_FILE_PRIORITY[file] || "cn")
      });
    });
  });

  return [...byName.entries()]
    .map(([name, rows]) => {
      const distinct = [...new Map(rows.map((r) => [r.id, r])).values()];
      const canonicalSet = new Set(distinct.map((r) => resolveFoodId(r.id, aliasMap)));
      return { name, rows: distinct, canonicalSet };
    })
    .filter((group) => group.canonicalSet.size > 1);
}

export function pickCanonicalFoodRow(group, originIds, aliasMap = loadFoodIdAliasMap()) {
  const fmc = loadFoodMedicineCanonicalByName();
  const catalog = loadCatalogRecords();
  const fmcId = fmc.get(group.name);

  const enriched = group.rows.map((row) => {
    const cat = catalog.get(row.id);
    return {
      ...row,
      score: cat?.score ?? row.score ?? scoreRecord(row.record || {}, row.source || "cn"),
      record: cat?.record || row.record
    };
  });

  const nonOrigin = enriched.filter((r) => !originIds.has(r.id) && !r.record?.isOriginProduct);
  const pool = nonOrigin.length ? nonOrigin : enriched;

  if (fmcId) {
    const match = pool.find((r) => r.id === fmcId);
    if (match) return match;
  }

  const foodRows = pool.filter(isFoodLibraryRow);
  const finalPool = foodRows.length ? foodRows : pool;

  return [...finalPool].sort((a, b) => {
    const penDiff = curatedShadowPenalty(a.id) - curatedShadowPenalty(b.id);
    if (penDiff !== 0) return penDiff;
    const aHom = /foods-medicine-homologous|foods-ingredients/.test(a.sourceFile || "") ? 1 : 0;
    const bHom = /foods-medicine-homologous|foods-ingredients/.test(b.sourceFile || "") ? 1 : 0;
    if (bHom !== aHom) return bHom - aHom;
    if (b.score !== a.score) return b.score - a.score;
    if (a.source !== b.source) return (SOURCE_PRIORITY[b.source] || 0) - (SOURCE_PRIORITY[a.source] || 0);
    return a.id.localeCompare(b.id);
  })[0];
}

export function pickCanonicalRow(rows, originIds, groupName = "") {
  if (groupName) {
    return pickCanonicalFoodRow({ name: groupName, rows }, originIds);
  }
  const nonOrigin = rows.filter((r) => !originIds.has(r.id) && !r.record?.isOriginProduct);
  const pool = nonOrigin.length ? nonOrigin : rows;
  const foodRows = pool.filter(isFoodLibraryRow);
  const finalPool = foodRows.length ? foodRows : pool;
  return [...finalPool].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.source !== b.source) return (SOURCE_PRIORITY[b.source] || 0) - (SOURCE_PRIORITY[a.source] || 0);
    return a.id.localeCompare(b.id);
  })[0];
}

export function writeFoodIdAliasFile(aliasMap) {
  const file = path.join(root, "data", "cn", "food-id-aliases.json");
  const existing = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : [];
  const notes = new Map();
  if (Array.isArray(existing)) {
    existing.forEach((row) => notes.set(row.alias, row.note || ""));
  }
  const rows = Object.entries(aliasMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([alias, canonical]) => ({
      alias,
      canonical,
      ...(notes.get(alias) ? { note: notes.get(alias) } : {})
    }));
  fs.writeFileSync(file, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  return rows.length;
}
