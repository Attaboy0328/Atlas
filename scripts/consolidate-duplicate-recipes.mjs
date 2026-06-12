#!/usr/bin/env node
/**
 * Hide duplicate therapy recipes by name (keep richest / earliest source row).
 * Usage:
 *   node scripts/consolidate-duplicate-recipes.mjs
 *   node scripts/consolidate-duplicate-recipes.mjs --write
 */
import fs from "fs";
import path from "path";
import {
  findDuplicateRecipeIdGroups,
  findDuplicateRecipeNameGroups,
  pickCanonicalRecipeRow,
  RECIPE_JSON_SOURCES,
  readRecipeJson
} from "./lib/recipe-catalog.mjs";
import { root } from "./lib/food-catalog.mjs";

const writeMode = process.argv.includes("--write");
const nameGroups = findDuplicateRecipeNameGroups();
const idGroups = findDuplicateRecipeIdGroups();

const hideByFile = new Map();
function markHidden(row, reason, canonical) {
  if (!hideByFile.has(row._sourceFile)) hideByFile.set(row._sourceFile, new Set());
  hideByFile.get(row._sourceFile).add(row.id);
  if (!writeMode) {
    console.log(`  ${row._sourceFile}:${row.id} -> hidden (${reason}, keep ${canonical._sourceFile}:${canonical.id})`);
  }
}

nameGroups.forEach(({ name, rows }) => {
  const canonical = pickCanonicalRecipeRow(rows);
  rows.forEach((row) => {
    if (row.id === canonical.id && row._sourceFile === canonical._sourceFile) return;
    markHidden(row, `duplicate「${name}」`, canonical);
  });
});

idGroups.forEach(({ id, rows }) => {
  const canonical = pickCanonicalRecipeRow(rows);
  rows.forEach((row) => {
    if (row._sourceFile === canonical._sourceFile && row._rowIndex === canonical._rowIndex) return;
    markHidden(row, `duplicate id ${id}`, canonical);
  });
});

const rowsToHide = [...hideByFile.values()].reduce((sum, ids) => sum + ids.size, 0);
console.log(`duplicate recipe name groups: ${nameGroups.length}`);
console.log(`duplicate recipe id groups: ${idGroups.length}`);
console.log(`rows to hide: ${rowsToHide}`);

if (!writeMode) {
  if (nameGroups.length || idGroups.length) {
    console.log("\nRun with --write to set hiddenFromLibrary on duplicate rows.");
  }
  process.exit(0);
}

let hidden = 0;
RECIPE_JSON_SOURCES.forEach((file) => {
  const hideIds = hideByFile.get(file);
  if (!hideIds?.size) return;
  const filePath = path.join(root, "data", "tcm", file);
  const rows = readRecipeJson(file, []);
  let touched = false;
  rows.forEach((row) => {
    if (hideIds.has(row.id) && !row.hiddenFromLibrary) {
      row.hiddenFromLibrary = true;
      hidden += 1;
      touched = true;
    }
  });
  if (touched) {
    fs.writeFileSync(filePath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  }
});

console.log(`hiddenFromLibrary patched on recipes: ${hidden}`);
