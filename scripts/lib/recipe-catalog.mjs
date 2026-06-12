/** Shared helpers for therapy recipe sources, dedup, and seed guards. */
import fs from "fs";
import path from "path";
import { root } from "./food-catalog.mjs";

const tcmDir = path.join(root, "data", "tcm");

export const RECIPE_JSON_SOURCES = [
  "handcrafted-recipes.json",
  "handcrafted-recipes-batch2.json",
  "handcrafted-recipes-batch3.json",
  "cantonese-recipes-batch.json",
  "regional-recipes-batch.json",
  "regional-recipes-batch2.json",
  "regional-recipes-batch3.json",
  "regional-recipes-batch4.json"
];

export function readRecipeJson(name, fallback = []) {
  const file = path.join(tcmDir, name);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function recipeRichnessScore(item) {
  let score = 0;
  if (item.provinces?.length) score += 4;
  if (item.cuisine) score += 2;
  if (item.recipeTopic) score += 2;
  if (item.seasonTags?.length) score += 1;
  if ((item.ingredients || []).length) score += 1;
  if ((item.steps || []).length) score += 1;
  if ((item.syndromes || []).length) score += 1;
  if ((item.foodIds || []).length) score += 1;
  return score;
}

export function loadAllRecipeRows() {
  return RECIPE_JSON_SOURCES.flatMap((file, sourceIndex) =>
    readRecipeJson(file, []).map((row, rowIndex) => ({
      ...row,
      _sourceFile: file,
      _sourceIndex: sourceIndex,
      _rowIndex: rowIndex
    }))
  );
}

export function loadPublishedRecipeNames() {
  const names = new Set();
  loadAllRecipeRows().forEach((row) => {
    if (!row.hiddenFromLibrary && row.name) names.add(row.name);
  });
  return names;
}

export function loadPublishedRecipeIds() {
  const ids = new Set();
  loadAllRecipeRows().forEach((row) => {
    if (!row.hiddenFromLibrary && row.id) ids.add(row.id);
  });
  return ids;
}

export function pickCanonicalRecipeRow(rows) {
  return [...rows].sort((a, b) => {
    const scoreDiff = recipeRichnessScore(b) - recipeRichnessScore(a);
    if (scoreDiff !== 0) return scoreDiff;
    if (a._sourceIndex !== b._sourceIndex) return a._sourceIndex - b._sourceIndex;
    return a._rowIndex - b._rowIndex;
  })[0];
}

export function findDuplicateRecipeIdGroups({ includeHidden = false } = {}) {
  const byId = new Map();
  loadAllRecipeRows().forEach((row) => {
    if (!includeHidden && row.hiddenFromLibrary) return;
    if (!row.id) return;
    if (!byId.has(row.id)) byId.set(row.id, []);
    byId.get(row.id).push(row);
  });
  return [...byId.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([id, rows]) => ({ id, rows }));
}

export function findDuplicateRecipeNameGroups({ includeHidden = false } = {}) {
  const byName = new Map();
  loadAllRecipeRows().forEach((row) => {
    if (!includeHidden && row.hiddenFromLibrary) return;
    if (!row.name) return;
    if (!byName.has(row.name)) byName.set(row.name, []);
    byName.get(row.name).push(row);
  });
  return [...byName.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([name, rows]) => ({ name, rows }));
}

export function dedupeRecipeRows(rows, { onSkip } = {}) {
  const seenNames = new Set();
  const seenIds = new Set();
  const kept = [];

  rows.forEach((item) => {
    if (item.hiddenFromLibrary) return;
    if (item.id && seenIds.has(item.id)) {
      onSkip?.(item, "duplicate-id");
      return;
    }
    if (item.name && seenNames.has(item.name)) {
      onSkip?.(item, "duplicate-name");
      return;
    }
    if (item.id) seenIds.add(item.id);
    if (item.name) seenNames.add(item.name);
    kept.push(item);
  });

  return kept;
}

/** Merge seed rows into an existing recipe JSON file (by id) and write. */
export function mergeAndWriteRecipeJson(fileName, newRows) {
  const filePath = path.join(tcmDir, fileName);
  const existing = readRecipeJson(fileName, []);
  const byId = new Map(existing.map((row) => [row.id, row]));
  newRows.forEach((row) => {
    if (row?.id) byId.set(row.id, { ...byId.get(row.id), ...row });
  });
  const merged = [...byId.values()];
  fs.writeFileSync(filePath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  return merged.length;
}

/** Filter seed tuples: [id, name, ...] — skip names or ids already published. */
export function filterRecipeSeedTuples(
  tuples,
  existingNames = loadPublishedRecipeNames(),
  existingIds = loadPublishedRecipeIds()
) {
  const seenNames = new Set(existingNames);
  const seenIds = new Set(existingIds);
  return tuples.filter((tuple) => {
    const [id, name] = tuple;
    if (id && seenIds.has(id)) {
      console.warn(`Skip recipe seed「${name}」 (${id}): duplicate id`);
      return false;
    }
    if (seenNames.has(name)) {
      console.warn(`Skip recipe seed「${name}」: duplicate name`);
      return false;
    }
    if (id) seenIds.add(id);
    seenNames.add(name);
    return true;
  });
}
