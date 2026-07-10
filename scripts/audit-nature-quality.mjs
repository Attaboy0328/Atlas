#!/usr/bin/env node
/** Audit 食性 source/confidence and cross-catalog conflicts for visible foods. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CN_JSON_SOURCES,
  loadFoodCatalogIds,
  loadFoodCatalogMeta,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";
import { annotateCatalogFoods, assignFoodNatureMetadata } from "./lib/food-nature.mjs";
import { buildNatureLookup } from "./lib/origin-nature.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const warnings = [];
const info = [];
const aliasMap = loadFoodIdAliasMap();
const catalogIds = loadFoodCatalogIds();
const lookup = buildNatureLookup();

const hiddenCnIds = new Set();
CN_JSON_SOURCES.flatMap((file) => readCnJson(file)).forEach((food) => {
  if (food?.hiddenFromLibrary && food?.id) hiddenCnIds.add(food.id);
});

function isVisibleId(id) {
  return id && !hiddenCnIds.has(id);
}

const cnFoods = CN_JSON_SOURCES.flatMap((file) => readCnJson(file).map((food) => ({ ...food, __sourceFile: file })));
const annotated = annotateCatalogFoods(cnFoods, { lookup, aliasMap });
const visibleRaw = annotated.filter((food) => isVisibleId(food.id) && catalogIds.has(food.id));

function scoreVisibleFood(food) {
  if (food.natureSource === "manual") return 0;
  if (food.natureConfidence === "high") return 1;
  if (food.natureConfidence === "medium") return 2;
  return 3;
}

const visibleByCanonical = new Map();
visibleRaw.forEach((food) => {
  const canonical = resolveFoodId(food.id, aliasMap);
  const prev = visibleByCanonical.get(canonical);
  if (!prev || scoreVisibleFood(food) < scoreVisibleFood(prev)) {
    visibleByCanonical.set(canonical, food);
  }
});
const visible = [...visibleByCanonical.values()];

const lowVisible = visible.filter((food) => food.natureConfidence === "low");
const lowRatio = visible.length ? lowVisible.length / visible.length : 0;

info.push(`visible foods: ${visible.length}`);
info.push(`low-confidence visible nature: ${lowVisible.length} (${(lowRatio * 100).toFixed(1)}%)`);

if (visible.length && lowRatio > 0.15) {
  warnings.push(`visible low-confidence nature ${(lowRatio * 100).toFixed(1)}% > 15%`);
} else if (visible.length && lowRatio > 0.05) {
  info.push(`visible low-confidence nature above 5% soft threshold (${(lowRatio * 100).toFixed(1)}%)`);
}

const byVisibleName = new Map();
visible.forEach((food) => {
  if (!byVisibleName.has(food.name)) byVisibleName.set(food.name, new Set());
  byVisibleName.get(food.name).add(food.nature);
});
const visibleNameConflicts = [...byVisibleName.values()].filter((natures) => natures.size > 1).length;
if (visibleNameConflicts) {
  warnings.push(`visible duplicate-name nature conflicts: ${visibleNameConflicts}`);
}

const herbsPath = path.join(root, "data", "tcm", "herbs-chp2025.json");
const herbRows = fs.existsSync(herbsPath) ? JSON.parse(fs.readFileSync(herbsPath, "utf8")) : [];
const herbNatureById = new Map(herbRows.map((row) => [row.id, row.nature]));

let herbMismatches = 0;
visible.forEach((food) => {
  if (food.category !== "中药材") return;
  const canonical = resolveFoodId(food.id, aliasMap);
  const herbNature = herbNatureById.get(canonical);
  if (herbNature && herbNature !== food.nature) herbMismatches += 1;
});
if (herbMismatches) {
  warnings.push(`visible TCM herb nature mismatches vs herbs-chp2025: ${herbMismatches}`);
}

const categoryDefaultVisible = visible.filter((food) => food.natureSource === "category-default");
info.push(`visible category-default nature: ${categoryDefaultVisible.length}`);
if (categoryDefaultVisible.length > 25) {
  warnings.push(`visible category-default nature rows ${categoryDefaultVisible.length} > 25`);
}

console.log("[audit-nature-quality]");
info.forEach((line) => console.log(`  · ${line}`));
if (warnings.length) {
  console.log("\nAudit warnings:");
  warnings.forEach((line) => console.warn(`  ⚠ ${line}`));
  categoryDefaultVisible.slice(0, 10).forEach((food) => {
    console.warn(`    - ${food.name} (${food.id})`);
  });
  process.exit(1);
}

console.log("OK: nature quality thresholds met");
