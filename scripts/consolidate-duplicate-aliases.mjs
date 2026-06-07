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
  loadOriginProductIds,
  pickCanonicalRow,
  writeFoodIdAliasFile
} from "./lib/catalog-records.mjs";
import {
  CN_JSON_SOURCES,
  EXPANDED_BULK_JSON_SOURCES,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const writeMode = process.argv.includes("--write");
const aliasMap = loadFoodIdAliasMap();
const originIds = loadOriginProductIds();
const groups = findDuplicateNameGroups(aliasMap);

const proposed = [];
groups.forEach((group) => {
  const canonical = pickCanonicalRow(group.rows, originIds);
  if (!canonical) return;
  group.rows.forEach((row) => {
    if (row.id === canonical.id) return;
    if (originIds.has(row.id)) return;
    if (resolveFoodId(row.id, aliasMap) === resolveFoodId(canonical.id, aliasMap)) return;
    if (row.record?.hiddenFromLibrary) return;
    const isTcm = row.record?.category === "中药材" || row.record?.itemKind === "tcm-herb";
    const canonTcm = canonical.record?.category === "中药材" || canonical.record?.itemKind === "tcm-herb";
    if (isTcm !== canonTcm) return;
    proposed.push({
      alias: row.id,
      canonical: canonical.id,
      name: group.name,
      from: row.sourceFile,
      note: `auto: duplicate name「${group.name}」→ ${canonical.id}`
    });
  });
});

const unique = new Map();
proposed.forEach((row) => {
  if (row.alias === row.canonical) return;
  if (aliasMap[row.alias] && aliasMap[row.alias] !== row.canonical) return;
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

const nextMap = { ...aliasMap };
[...unique.values()].forEach((row) => {
  nextMap[row.alias] = row.canonical;
});

const hideTargets = new Set([...unique.values()].map((r) => r.alias));
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
console.log(`hiddenFromLibrary patched: ${hidden}`);
