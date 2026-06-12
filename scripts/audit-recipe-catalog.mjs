#!/usr/bin/env node
/** Fail CI when published therapy recipes have duplicate names or ids. */
import {
  dedupeRecipeRows,
  findDuplicateRecipeNameGroups,
  loadAllRecipeRows,
  readRecipeJson,
  RECIPE_JSON_SOURCES
} from "./lib/recipe-catalog.mjs";
import { loadFoodCatalogIds, loadFoodIdAliasMap, normalizeRecipeFoodIds } from "./lib/food-catalog.mjs";

const catalog = loadFoodCatalogIds();
const aliasMap = loadFoodIdAliasMap();
const issues = [];

const visibleGroups = findDuplicateRecipeNameGroups({ includeHidden: false });
if (visibleGroups.length) {
  visibleGroups.forEach(({ name, rows }) => {
    const refs = rows.map((r) => `${r._sourceFile}:${r.id}`).join(", ");
    issues.push(`duplicate recipe name「${name}」: ${refs}`);
  });
}

const published = loadAllRecipeRows().filter((row) => !row.hiddenFromLibrary);
const idCounts = new Map();
published.forEach((row) => {
  if (!row.id) return;
  idCounts.set(row.id, (idCounts.get(row.id) || 0) + 1);
});
[...idCounts.entries()].filter(([, count]) => count > 1).forEach(([id, count]) => {
  issues.push(`duplicate recipe id ${id} (${count} rows)`);
});

published.forEach((row) => {
  const foodIds = normalizeRecipeFoodIds(row.foodIds || [], catalog, aliasMap);
  if (foodIds.length < 1) {
    issues.push(`recipe missing foodIds: ${row._sourceFile}:${row.id} (${row.name})`);
  }
});

const rawConcat = RECIPE_JSON_SOURCES.flatMap((file) => readRecipeJson(file, []));
const built = dedupeRecipeRows(
  rawConcat
    .filter((row) => !row.hiddenFromLibrary)
    .map((row) => ({
      ...row,
      foodIds: normalizeRecipeFoodIds(row.foodIds || [], catalog, aliasMap)
    }))
    .filter((row) => row.foodIds.length > 0)
);
const builtNames = new Set();
built.forEach((row) => {
  if (builtNames.has(row.name)) issues.push(`build would still duplicate recipe name「${row.name}」`);
  builtNames.add(row.name);
});

console.log("[audit-recipe-catalog]");
console.log(`  recipe source files: ${RECIPE_JSON_SOURCES.length}`);
console.log(`  published rows: ${published.length}`);
console.log(`  built unique names: ${built.length}`);
console.log(`  visible duplicate name groups: ${visibleGroups.length}`);

if (issues.length) {
  console.error(`FAIL: ${issues.length} issue(s)`);
  issues.slice(0, 30).forEach((msg) => console.error(`  - ${msg}`));
  if (issues.length > 30) console.error(`  ... and ${issues.length - 30} more`);
  process.exit(1);
}

console.log("OK: recipe catalog has no duplicate published names");
