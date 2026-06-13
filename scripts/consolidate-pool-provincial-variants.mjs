#!/usr/bin/env node
/**
 * Merge provincial pool clones (e.g. 河南海带结) into canonical entries (海带结).
 * Provincial rows stay in batch files for coverage but are hidden from library search.
 *
 * Usage:
 *   node scripts/consolidate-pool-provincial-variants.mjs
 *   node scripts/consolidate-pool-provincial-variants.mjs --write
 */
import fs from "node:fs";
import path from "node:path";
import {
  matchProvincialPoolName,
  POOL_BATCH_FILES,
  uniquePoolItems
} from "./lib/china-pool-manifest.mjs";
import { writeFoodIdAliasFile } from "./lib/catalog-records.mjs";
import {
  CN_JSON_SOURCES,
  loadFoodCatalogIds,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";
import { makeFood, writeJsonFile } from "./lib/food-entry.mjs";

const writeMode = process.argv.includes("--write");
const CANONICAL_FILE = "foods-china-pool-canonical.json";
const aliasMap = loadFoodIdAliasMap();

const CANONICAL_FILE_PRIORITY = [
  "foods-ingredients.json",
  "foods-seasonal-river.json",
  "regional-foods.json",
  "foods-lingnan-ingredients-batch.json",
  CANONICAL_FILE
];

function loadRows() {
  return CN_JSON_SOURCES.flatMap((file) =>
    readCnJson(file, []).map((record) => ({
      id: record.id,
      name: record.name,
      record,
      sourceFile: file
    }))
  );
}

function scoreCanonicalRow(row) {
  let score = 0;
  const file = row.sourceFile || "";
  CANONICAL_FILE_PRIORITY.forEach((priority, index) => {
    if (file.includes(priority.replace(".json", ""))) score += (CANONICAL_FILE_PRIORITY.length - index) * 20;
  });
  if (row.record?.summary && row.record.summary.length > 12) score += 10;
  if ((row.record?.aliases || []).length) score += 4;
  if (/-rx$|--\d|batch[0-9]+/i.test(row.id)) score -= 30;
  if (POOL_BATCH_FILES.includes(file)) score -= 50;
  return score;
}

function pickCanonicalRow(poolItem, rowsByName, rowsById) {
  const byId = rowsById.get(poolItem.id);
  if (byId && !byId.record?.hiddenFromLibrary && !POOL_BATCH_FILES.includes(byId.sourceFile)) {
    return byId;
  }

  const sameName = (rowsByName.get(poolItem.name) || []).filter(
    (row) => !row.record?.hiddenFromLibrary && !POOL_BATCH_FILES.includes(row.sourceFile)
  );
  if (sameName.length) {
    return [...sameName].sort((a, b) => scoreCanonicalRow(b) - scoreCanonicalRow(a))[0];
  }

  const byPoolId = rowsById.get(poolItem.id);
  if (byPoolId && !POOL_BATCH_FILES.includes(byPoolId.sourceFile)) return byPoolId;

  return null;
}

function collectVariants(poolItem, rows) {
  return rows.filter((row) => {
    if (row.record?.hiddenFromLibrary) return false;
    if (!POOL_BATCH_FILES.includes(row.sourceFile)) return false;
    return matchProvincialPoolName(row.name, poolItem.name);
  });
}

const rows = loadRows();
const rowsByName = new Map();
const rowsById = new Map();
rows.forEach((row) => {
  if (!rowsByName.has(row.name)) rowsByName.set(row.name, []);
  rowsByName.get(row.name).push(row);
  rowsById.set(row.id, row);
});

const catalogIds = loadFoodCatalogIds();
const catalogNames = new Set(rows.filter((r) => !r.record?.hiddenFromLibrary).map((r) => r.name));
const proposals = [];
const canonicalCreates = [];
const canonicalPatches = new Map();

uniquePoolItems().forEach((poolItem) => {
  const variants = collectVariants(poolItem, rows);
  if (!variants.length) return;

  let canonical = pickCanonicalRow(poolItem, rowsByName, rowsById);
  if (!canonical) {
    canonicalCreates.push(
      makeFood({
        id: poolItem.id,
        name: poolItem.name,
        category: poolItem.category,
        nature: poolItem.nature || "平",
        regions: ["CN"],
        provinces: [],
        summary: `${poolItem.name}常见于中式饮食与地方菜，各地品种与做法有别。`
      })
    );
    canonical = { id: poolItem.id, name: poolItem.name, record: canonicalCreates[canonicalCreates.length - 1], sourceFile: CANONICAL_FILE };
  }

  const provinces = new Set(canonical.record.provinces || []);
  const aliases = new Set(canonical.record.aliases || []);

  variants.forEach((variant) => {
    if (variant.id === canonical.id) return;
    const province = matchProvincialPoolName(variant.name, poolItem.name);
    if (province) provinces.add(province);
    aliases.add(variant.name);
    proposals.push({
      alias: variant.id,
      canonical: canonical.id,
      variantName: variant.name,
      baseName: poolItem.name,
      from: variant.sourceFile,
      note: `auto: provincial pool「${variant.name}」→ ${canonical.id}`
    });
  });

  canonicalPatches.set(canonical.id, {
    id: canonical.id,
    sourceFile: canonical.sourceFile,
    provinces: [...provinces],
    aliases: [...aliases].filter((term) => term !== canonical.name)
  });
});

console.log(`[consolidate-pool-provincial] variants to hide: ${proposals.length}`);
console.log(`[consolidate-pool-provincial] canonical creates: ${canonicalCreates.length}`);
console.log(`[consolidate-pool-provincial] canonical province merges: ${canonicalPatches.size}`);
proposals.slice(0, 15).forEach((p) => {
  console.log(`  ${p.alias} (${p.variantName}) -> ${p.canonical}`);
});
if (proposals.length > 15) console.log(`  ... and ${proposals.length - 15} more`);

if (!writeMode) {
  if (proposals.length) console.log("\nRun with --write to apply.");
  process.exit(0);
}

if (canonicalCreates.length) {
  const canonPath = path.join(root, "data", "cn", CANONICAL_FILE);
  const existing = fs.existsSync(canonPath) ? readCnJson(CANONICAL_FILE, []) : [];
  const seen = new Set(existing.map((f) => f.id));
  const merged = [...existing];
  canonicalCreates.forEach((food) => {
    if (seen.has(food.id)) return;
    seen.add(food.id);
    merged.push(food);
  });
  writeJsonFile(canonPath, merged);
}

const nextMap = { ...aliasMap };
proposals.forEach((p) => {
  if (nextMap[p.alias] && nextMap[p.alias] !== p.canonical) return;
  nextMap[p.alias] = p.canonical;
});

const hideIds = new Set(proposals.map((p) => p.alias));
const patchFiles = CN_JSON_SOURCES.map((file) => path.join(root, "data", "cn", file));
let hidden = 0;

patchFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const base = path.basename(file);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(data)) return;
  let touched = false;
  data.forEach((food) => {
    const patch = canonicalPatches.get(food.id);
    if (patch && patch.sourceFile === base) {
      food.provinces = patch.provinces;
      if (patch.aliases.length) food.aliases = patch.aliases;
      touched = true;
    }
    if (hideIds.has(food.id) && !food.hiddenFromLibrary) {
      food.hiddenFromLibrary = true;
      hidden += 1;
      touched = true;
    }
  });
  if (touched) fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
});

const notesFile = path.join(root, "data", "cn", "food-id-aliases.json");
const notesRaw = JSON.parse(fs.readFileSync(notesFile, "utf8"));
const noteByAlias = new Map(notesRaw.map((r) => [r.alias, r]));
proposals.forEach((p) => {
  const existing = noteByAlias.get(p.alias) || { alias: p.alias, canonical: p.canonical };
  existing.note = p.note;
  noteByAlias.set(p.alias, existing);
});
fs.writeFileSync(
  notesFile,
  `${JSON.stringify([...noteByAlias.values()].sort((a, b) => a.alias.localeCompare(b.alias)), null, 2)}\n`,
  "utf8"
);

writeFoodIdAliasFile(nextMap);

const synonymPath = path.join(root, "data", "cn", "food-search-synonyms-pool.json");
const synonymRows = [];
const seenSyn = new Set();
uniquePoolItems().forEach((poolItem) => {
  const canonical = pickCanonicalRow(poolItem, rowsByName, rowsById);
  const foodId = resolveFoodId(canonical?.id || poolItem.id, nextMap);
  if (!foodId) return;
  const key = `${poolItem.name}:${foodId}`;
  if (seenSyn.has(key)) return;
  seenSyn.add(key);
  synonymRows.push({ term: poolItem.name, foodId });
});
writeJsonFile(synonymPath, synonymRows);

console.log(`hiddenFromLibrary patched: ${hidden}`);
console.log(`aliases written: ${Object.keys(nextMap).length}`);
console.log(`pool search synonyms: ${synonymRows.length}`);
