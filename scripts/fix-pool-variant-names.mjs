#!/usr/bin/env node
/**
 * Hide or rename pool-batch foods whose names end with a numeric variant suffix (e.g. 澳门白腐乳1).
 * Run: node scripts/fix-pool-variant-names.mjs [--write]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { CN_JSON_SOURCES, readCnJson, root } from "./lib/food-catalog.mjs";

const writeMode = process.argv.includes("--write");
const POOL_BATCH_FILES = new Set([
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
]);

const VARIANT_SUFFIX_RE = /^(.+?)(\d+)$/;

function isPoolVariantName(name) {
  const match = String(name || "").match(VARIANT_SUFFIX_RE);
  if (!match) return false;
  const base = match[1];
  if (!/[\u4e00-\u9fff]/.test(base)) return false;
  return base.length >= 2;
}

function baseName(name) {
  const match = String(name || "").match(VARIANT_SUFFIX_RE);
  return match ? match[1] : name;
}

const allFoods = CN_JSON_SOURCES.flatMap((file) =>
  readCnJson(file, []).map((food) => ({ ...food, sourceFile: file }))
);
const names = new Set(allFoods.map((food) => food.name));

const actions = [];
allFoods.forEach((food) => {
  if (!isPoolVariantName(food.name)) return;
  const base = baseName(food.name);
  if (names.has(base)) {
    actions.push({ type: "hide", food, base });
    return;
  }
  if (POOL_BATCH_FILES.has(food.sourceFile)) {
    actions.push({ type: "rename", food, base });
  }
});

console.log(`pool variant suffix names: ${actions.length}`);
actions.slice(0, 20).forEach((row) => {
  console.log(`  ${row.type}: ${row.food.name} -> ${row.base} (${row.food.sourceFile})`);
});
if (actions.length > 20) console.log(`  ... and ${actions.length - 20} more`);

if (!writeMode) {
  if (actions.length) console.log("\nRun with --write to apply.");
  process.exit(0);
}

const byFile = new Map();
actions.forEach((row) => {
  if (!byFile.has(row.food.sourceFile)) byFile.set(row.food.sourceFile, []);
  byFile.get(row.food.sourceFile).push(row);
});

let hidden = 0;
let renamed = 0;
byFile.forEach((rows, file) => {
  const filePath = path.join(root, "data", "cn", file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const byId = new Map(rows.map((row) => [row.food.id, row]));
  let touched = false;
  data.forEach((food) => {
    const action = byId.get(food.id);
    if (!action) return;
    if (action.type === "hide") {
      if (!food.hiddenFromLibrary) hidden += 1;
      food.hiddenFromLibrary = true;
      touched = true;
      return;
    }
    if (action.type === "rename" && food.name !== action.base) {
      food.name = action.base;
      if (food.en === action.food.name) food.en = action.base;
      food.searchTerms = [...new Set([action.base, ...(food.searchTerms || []).filter((t) => t !== action.food.name)])];
      renamed += 1;
      touched = true;
    }
  });
  if (touched) {
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  }
});

console.log(`hiddenFromLibrary: ${hidden}`);
console.log(`renamed: ${renamed}`);
