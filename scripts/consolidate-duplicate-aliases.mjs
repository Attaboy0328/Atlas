#!/usr/bin/env node
/**
 * Auto-consolidate duplicate food names via food-id-aliases.json.
 * Usage:
 *   node scripts/consolidate-duplicate-aliases.mjs          # report
 *   node scripts/consolidate-duplicate-aliases.mjs --write  # apply aliases + hide dupes
 */
import fs from "fs";
import path from "path";
import {
  findDuplicateNameGroups,
  findVisibleCnDuplicateNameGroups,
  loadCatalogRecords,
  loadOriginProductIds,
  pickCanonicalFoodRow,
  writeFoodIdAliasFile
} from "./lib/catalog-records.mjs";
import {
  CN_JSON_SOURCES,
  EXPANDED_BULK_JSON_SOURCES,
  loadFoodCatalogIds,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const writeMode = process.argv.includes("--write");
const aliasMap = loadFoodIdAliasMap();
const originIds = loadOriginProductIds();
const groupMap = new Map();
[...findDuplicateNameGroups(aliasMap), ...findVisibleCnDuplicateNameGroups(aliasMap)].forEach((group) => {
  if (!groupMap.has(group.name)) groupMap.set(group.name, group);
});
const groups = [...groupMap.values()];

function isTcmRow(row) {
  if (row.record?.officialFoodMedicine || row.record?.itemKind === "food-medicine") return false;
  return row.record?.category === "中药材" || row.record?.itemKind === "tcm-herb";
}

function isBulkNoiseRow(row) {
  return row.source === "expanded-bulk" && (/^official-|^cat-/.test(row.id));
}

function isIngredientShadowRow(row, canonical) {
  return row.source === "cn-ingredients" && canonical.source === "cn";
}

const CURATED_FILE_RE = /foods-china-curated-batch|foods-\w+-ingredients-batch|foods-lingnan-ingredients-batch/;
const BASE_FOOD_FILE_RE = /foods-ingredients\.json|foods-base-staples|foods-medicine-homologous|foods-seasonal-river\.json|regional-foods\.json|foods-regional-batch/;

function isCuratedLayerRow(row) {
  return CURATED_FILE_RE.test(row.sourceFile || "");
}

function shouldMergeDuplicateFood(row, canonical) {
  if (isTcmRow(row) !== isTcmRow(canonical)) return false;
  if (isBulkNoiseRow(row)) return false;
  if (!isTcmRow(row) && !isTcmRow(canonical)) return true;
  if (isIngredientShadowRow(row, canonical)) return true;
  if (isCuratedLayerRow(row) || isCuratedLayerRow(canonical)) return true;
  if (BASE_FOOD_FILE_RE.test(row.sourceFile || "") || BASE_FOOD_FILE_RE.test(canonical.sourceFile || "")) {
    return row.source === "cn" || row.source === "cn-ingredients" || canonical.source === "cn" || canonical.source === "cn-ingredients";
  }
  return row.source === canonical.source;
}

const proposed = [];
const originHideTargets = new Set();

groups.forEach((group) => {
  const canonical = pickCanonicalFoodRow(group, originIds, aliasMap);
  if (!canonical) return;

  const originRows = group.rows.filter((row) => originIds.has(row.id) || row.record?.isOriginProduct);
  const baseFoodIds = new Set(
    originRows.map((row) => resolveFoodId(row.record?.baseFoodId || "", aliasMap)).filter(Boolean)
  );

  group.rows.forEach((row) => {
    if (row.id === canonical.id) return;
    if (originIds.has(row.id)) return;
    if (resolveFoodId(row.id, aliasMap) === resolveFoodId(canonical.id, aliasMap)) return;
    if (row.record?.hiddenFromLibrary) return;

    const isTcm = isTcmRow(row);
    const canonTcm = isTcmRow(canonical);
    const bulkNoise = isBulkNoiseRow(row);
    const ingredientShadow = isIngredientShadowRow(row, canonical);

    if (!shouldMergeDuplicateFood(row, canonical)) return;

    if (
      originRows.length
      && !isTcm
      && !canonTcm
      && !baseFoodIds.has(row.id)
      && row.source === "expanded-bulk"
    ) {
      const sharesOriginName = originRows.some((originRow) => originRow.name === row.name);
      if (sharesOriginName) {
        originHideTargets.add(row.id);
        return;
      }
    }

    proposed.push({
      alias: row.id,
      canonical: canonical.id,
      name: group.name,
      from: row.sourceFile,
      note: bulkNoise
        ? `auto: bulk duplicate「${group.name}」→ ${canonical.id}`
        : ingredientShadow
          ? `auto: ingredient duplicate「${group.name}」→ ${canonical.id}`
          : `auto: duplicate name「${group.name}」→ ${canonical.id}`
    });
  });
});

const unique = new Map();
proposed.forEach((row) => {
  if (row.alias === row.canonical) return;
  unique.set(row.alias, row);
});

console.log(`duplicate name groups: ${groups.length}`);
console.log(`proposed alias merges: ${unique.size}`);

if (!writeMode) {
  [...unique.values()].slice(0, 25).forEach((row) => {
    console.log(`  ${row.alias} -> ${row.canonical} (${row.name})`);
  });
  if (unique.size > 25) console.log(`  ... and ${unique.size - 25} more`);
  if (unique.size) console.log("\nRun with --write to apply.");
  process.exit(0);
}

const catalogIds = loadFoodCatalogIds();
const nextMap = { ...aliasMap };
[...unique.values()].forEach((row) => {
  if (!catalogIds.has(row.canonical)) return;
  nextMap[row.alias] = row.canonical;
});

let pruned = 0;
Object.entries(nextMap).forEach(([alias, canonical]) => {
  if (alias === canonical) return;
  let target = canonical;
  const seen = new Set();
  while (nextMap[target] && !seen.has(target)) {
    seen.add(target);
    target = nextMap[target];
  }
  if (!catalogIds.has(target)) {
    delete nextMap[alias];
    pruned += 1;
  }
});

const catalogRecords = loadCatalogRecords();
Object.entries(aliasMap).forEach(([alias, canonical]) => {
  if (alias === canonical) return;
  const aliasRow = catalogRecords.get(alias);
  const canonRow = catalogRecords.get(resolveFoodId(canonical, aliasMap));
  if (!aliasRow || !canonRow || aliasRow.name !== canonRow.name) return;
  if (!aliasRow.record?.hiddenFromLibrary) originHideTargets.add(alias);
});

const hideTargets = new Set([
  ...[...unique.values()].map((r) => r.alias),
  ...originHideTargets
]);
const patchFiles = [
  ...CN_JSON_SOURCES,
  ...EXPANDED_BULK_JSON_SOURCES
].map((file) => path.join(root, "data", "cn", file));

let hidden = 0;
patchFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(data)) return;
  let touched = false;
  data.forEach((food) => {
    if (hideTargets.has(food.id) && !food.hiddenFromLibrary) {
      food.hiddenFromLibrary = true;
      hidden += 1;
      touched = true;
    }
  });
  if (touched) {
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  }
});

const aliasRows = writeFoodIdAliasFile(nextMap);
const notesFile = path.join(root, "data", "cn", "food-id-aliases.json");
const notesRaw = JSON.parse(fs.readFileSync(notesFile, "utf8"));
const noteByAlias = new Map(notesRaw.map((r) => [r.alias, r]));
[...unique.values()].forEach((row) => {
  const existing = noteByAlias.get(row.alias) || { alias: row.alias, canonical: row.canonical };
  existing.note = row.note;
  noteByAlias.set(row.alias, existing);
});
fs.writeFileSync(
  notesFile,
  `${JSON.stringify([...noteByAlias.values()].sort((a, b) => a.alias.localeCompare(b.alias)), null, 2)}\n`,
  "utf8"
);

console.log(`aliases written: ${aliasRows}`);
if (pruned) console.log(`invalid alias targets pruned: ${pruned}`);
console.log(`hiddenFromLibrary patched: ${hidden}`);
