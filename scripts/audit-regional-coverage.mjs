#!/usr/bin/env node
/** Audit regional food/recipe coverage — CN provinces, 粤港食疗, new batches. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { CN_JSON_SOURCES, readCnJson, root } from "./lib/food-catalog.mjs";

const tcmDir = path.join(root, "data", "tcm");
const LINGNAN_PROVINCES = new Set(["广东", "广西", "香港", "澳门", "海南"]);
const NEW_BATCH_FILES = [
  "foods-lingnan-ingredients-batch.json",
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
];

function readTcmJson(name) {
  const file = path.join(tcmDir, name);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const cnFoods = CN_JSON_SOURCES.flatMap((file) => readCnJson(file, []));
const lingnanFoods = cnFoods.filter((food) =>
  (food.provinces || []).some((p) => LINGNAN_PROVINCES.has(p))
);
const gdFoods = cnFoods.filter((food) => (food.provinces || []).includes("广东"));
const hkFoods = cnFoods.filter((food) => (food.provinces || []).includes("香港"));

const recipeFiles = [
  "handcrafted-recipes.json",
  "handcrafted-recipes-batch2.json",
  "handcrafted-recipes-batch3.json",
  "cantonese-recipes-batch.json"
];
const allRecipes = recipeFiles.flatMap(readTcmJson);
const cantoneseRecipes = readTcmJson("cantonese-recipes-batch.json");
const withRegionalSchema = allRecipes.filter((r) => r.provinces?.length || r.cuisine || r.recipeTopic);

const newBatchCounts = Object.fromEntries(
  NEW_BATCH_FILES.map((file) => [file, readCnJson(file, []).length])
);
const newBatchTotal = Object.values(newBatchCounts).reduce((a, b) => a + b, 0);

const giQueue = readCnJson("gi-expansion-queue.json", {});
const lingnanPriority = giQueue.lingnanPriority || [];

const issues = [];
if (newBatchTotal < 1800) {
  issues.push(`new-batch-total ${newBatchTotal} < 1800`);
}
if (cantoneseRecipes.length < 80) {
  issues.push(`cantonese-recipes ${cantoneseRecipes.length} < 80`);
}
if (lingnanFoods.length < 200) {
  issues.push(`lingnan-tagged foods ${lingnanFoods.length} < 200`);
}
if (gdFoods.length < 150) {
  issues.push(`guangdong-tagged foods ${gdFoods.length} < 150`);
}
if (!lingnanPriority.length) {
  issues.push("gi-expansion-queue missing lingnanPriority");
}
if (withRegionalSchema.length < cantoneseRecipes.length + 3) {
  issues.push(`recipes with regional schema ${withRegionalSchema.length} too low`);
}

console.log("[audit-regional-coverage]");
console.log(`  CN curated foods: ${cnFoods.length}`);
console.log(`  lingnan-tagged: ${lingnanFoods.length} (GD ${gdFoods.length}, HK ${hkFoods.length})`);
console.log(`  new CN batches: ${newBatchTotal}`);
Object.entries(newBatchCounts).forEach(([file, count]) => console.log(`    ${file}: ${count}`));
console.log(`  cantonese recipes: ${cantoneseRecipes.length}`);
console.log(`  recipes with provinces/cuisine/topic: ${withRegionalSchema.length}`);
console.log(`  gi lingnanPriority: ${lingnanPriority.length}`);

if (issues.length) {
  console.error(`FAIL: ${issues.join("; ")}`);
  process.exit(1);
}
console.log("OK: regional coverage thresholds met");
