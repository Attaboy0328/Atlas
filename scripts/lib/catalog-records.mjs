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

function pushRecord(map, row) {
  if (!row?.id || !row?.name) return;
  const existing = map.get(row.id);
  if (!existing || row.score > existing.score) {
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
    pushRecord(records, {
      id: m[1],
      name: m[2],
      source: "expanded",
      sourceFile: "foods-expanded.js",
      record: { id: m[1], name: m[2] },
      score: scoreRecord({}, "expanded")
    });
  }
  const teaRe = /tea\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  while ((m = teaRe.exec(expanded))) {
    pushRecord(records, {
      id: m[1],
      name: m[2],
      source: "expanded-tea",
      sourceFile: "foods-expanded.js",
      record: { id: m[1], name: m[2] },
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

export function pickCanonicalRow(rows, originIds) {
  const nonOrigin = rows.filter((r) => !originIds.has(r.id) && !r.record?.isOriginProduct);
  const pool = nonOrigin.length ? nonOrigin : rows;
  return [...pool].sort((a, b) => {
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
