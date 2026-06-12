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
  "foods-china-snacks-batch11.json",
  "foods-hk-ingredients-batch.json",
  "foods-mo-ingredients-batch.json",
  "foods-gx-ingredients-batch.json",
  "foods-hainan-ingredients-batch.json",
  "foods-china-curated-batch12.json",
  "foods-china-curated-batch13.json",
  "foods-china-curated-batch14.json",
  "foods-china-curated-batch15.json",
  "foods-china-curated-batch16.json",
  "foods-china-curated-batch17.json",
  "foods-china-curated-batch18.json",
  "foods-china-curated-batch19.json",
  "foods-china-curated-batch20.json"
];
const CURATED_BATCH_FILES = [
  "foods-china-curated-batch12.json",
  "foods-china-curated-batch13.json",
  "foods-china-curated-batch14.json",
  "foods-china-curated-batch15.json",
  "foods-china-curated-batch16.json",
  "foods-china-curated-batch17.json",
  "foods-china-curated-batch18.json",
  "foods-china-curated-batch19.json",
  "foods-china-curated-batch20.json"
];
const POOL_BATCH_FILES = [
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
];
const TEMPLATE_RE = /民间常见.+食养整理条目/;

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
const hkOnlyFoods = cnFoods.filter((food) => {
  const ps = food.provinces || [];
  return ps.includes("香港") && ps.length === 1;
});
const moFoods = cnFoods.filter((food) => (food.provinces || []).includes("澳门"));
const moOnlyFoods = cnFoods.filter((food) => {
  const ps = food.provinces || [];
  return ps.includes("澳门") && ps.length === 1;
});
const gxFoods = cnFoods.filter((food) => (food.provinces || []).includes("广西"));
const hiFoods = cnFoods.filter((food) => (food.provinces || []).includes("海南"));

const recipeFiles = [
  "handcrafted-recipes.json",
  "handcrafted-recipes-batch2.json",
  "handcrafted-recipes-batch3.json",
  "cantonese-recipes-batch.json",
  "regional-recipes-batch.json",
  "regional-recipes-batch2.json",
  "regional-recipes-batch3.json"
];
const allRecipes = recipeFiles.flatMap(readTcmJson);
const cantoneseRecipes = readTcmJson("cantonese-recipes-batch.json");
const regionalRecipes = [
  ...readTcmJson("regional-recipes-batch.json"),
  ...readTcmJson("regional-recipes-batch2.json"),
  ...readTcmJson("regional-recipes-batch3.json")
];
const hkCuisineRecipes = [...cantoneseRecipes, ...regionalRecipes].filter((r) => r.cuisine === "港式");
const moCuisineRecipes = regionalRecipes.filter((r) => r.cuisine === "澳式");
const gxCuisineRecipes = regionalRecipes.filter((r) => r.cuisine === "桂菜");
const hiCuisineRecipes = regionalRecipes.filter((r) => r.cuisine === "琼式");
const withRegionalSchema = allRecipes.filter((r) => r.provinces?.length || r.cuisine || r.recipeTopic);

const newBatchCounts = Object.fromEntries(
  NEW_BATCH_FILES.map((file) => [file, readCnJson(file, []).length])
);
const newBatchTotal = Object.values(newBatchCounts).reduce((a, b) => a + b, 0);
const curatedTotal = CURATED_BATCH_FILES.reduce((sum, file) => sum + readCnJson(file, []).length, 0);

let poolTotal = 0;
let poolTemplate = 0;
POOL_BATCH_FILES.forEach((file) => {
  readCnJson(file, []).forEach((food) => {
    poolTotal += 1;
    if (TEMPLATE_RE.test(String(food.summary || ""))) poolTemplate += 1;
  });
});
const poolTemplateRatio = poolTotal ? poolTemplate / poolTotal : 0;

const giQueue = readCnJson("gi-expansion-queue.json", {});
const lingnanPriority = giQueue.lingnanPriority || [];
const pendingGi = giQueue.pending || [];

const issues = [];
if (newBatchTotal < 1700) {
  issues.push(`new-batch-total ${newBatchTotal} < 1700`);
}
if (curatedTotal < 580) {
  issues.push(`curated batches total ${curatedTotal} < 580`);
}
if (poolTemplateRatio > 0.3) {
  issues.push(`pool template ratio ${(poolTemplateRatio * 100).toFixed(1)}% > 30%`);
}
if (cantoneseRecipes.length < 118) {
  issues.push(`cantonese-recipes ${cantoneseRecipes.length} < 118`);
}
if (regionalRecipes.length < 195) {
  issues.push(`regional-recipes ${regionalRecipes.length} < 195`);
}
if (lingnanFoods.length < 200) {
  issues.push(`lingnan-tagged foods ${lingnanFoods.length} < 200`);
}
if (gdFoods.length < 150) {
  issues.push(`guangdong-tagged foods ${gdFoods.length} < 150`);
}
if (hkOnlyFoods.length < 50) {
  issues.push(`hk-only foods ${hkOnlyFoods.length} < 50`);
}
if (moOnlyFoods.length < 30) {
  issues.push(`mo-only foods ${moOnlyFoods.length} < 30`);
}
if (hkCuisineRecipes.length < 18) {
  issues.push(`港式 recipes ${hkCuisineRecipes.length} < 18`);
}
if (moCuisineRecipes.length < 15) {
  issues.push(`澳式 recipes ${moCuisineRecipes.length} < 15`);
}
if (gxCuisineRecipes.length < 20) {
  issues.push(`桂菜 recipes ${gxCuisineRecipes.length} < 20`);
}
if (hiCuisineRecipes.length < 15) {
  issues.push(`琼式 recipes ${hiCuisineRecipes.length} < 15`);
}
if (pendingGi.length > 0 || lingnanPriority.length > 0) {
  issues.push(`gi-queue not drained: pending ${pendingGi.length}, lingnanPriority ${lingnanPriority.length}`);
}
if (withRegionalSchema.length < cantoneseRecipes.length + regionalRecipes.length + 3) {
  issues.push(`recipes with regional schema ${withRegionalSchema.length} too low`);
}

console.log("[audit-regional-coverage]");
console.log(`  CN curated foods: ${cnFoods.length}`);
console.log(`  lingnan-tagged: ${lingnanFoods.length} (GD ${gdFoods.length}, HK ${hkFoods.length}, HK-only ${hkOnlyFoods.length}, MO ${moFoods.length}, MO-only ${moOnlyFoods.length}, GX ${gxFoods.length}, HI ${hiFoods.length})`);
console.log(`  港式 recipes: ${hkCuisineRecipes.length}`);
console.log(`  澳式 recipes: ${moCuisineRecipes.length}`);
console.log(`  桂菜 recipes: ${gxCuisineRecipes.length}`);
console.log(`  琼式 recipes: ${hiCuisineRecipes.length}`);
console.log(`  curated batches total: ${curatedTotal}`);
console.log(`  pool template ratio: ${(poolTemplateRatio * 100).toFixed(1)}% (${poolTemplate}/${poolTotal})`);
console.log(`  new CN batches: ${newBatchTotal}`);
Object.entries(newBatchCounts).forEach(([file, count]) => console.log(`    ${file}: ${count}`));
console.log(`  cantonese recipes: ${cantoneseRecipes.length}`);
console.log(`  regional recipes: ${regionalRecipes.length}`);
console.log(`  recipes with provinces/cuisine/topic: ${withRegionalSchema.length}`);
console.log(`  gi pending: ${pendingGi.length}, lingnanPriority: ${lingnanPriority.length}`);

if (issues.length) {
  console.error(`FAIL: ${issues.join("; ")}`);
  process.exit(1);
}
console.log("OK: regional coverage thresholds met");
