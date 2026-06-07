#!/usr/bin/env node
/**
 * Data integrity checks for Atlas food/recipe/pairing datasets.
 * Run: npm run validate-data
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
const cnBundlePath = path.join(root, "generated", "foods-cn-bundle.js");
const bulkPath = path.join(root, "generated", "recipes-bulk.js");
const pairingExtraPath = path.join(root, "generated", "pairing-rules-extra.js");
const cnBundle = fs.existsSync(cnBundlePath) ? fs.readFileSync(cnBundlePath, "utf8") : "";
const bulkRecipes = fs.existsSync(bulkPath) ? fs.readFileSync(bulkPath, "utf8") : "";
const pairingExtra = fs.existsSync(pairingExtraPath) ? fs.readFileSync(pairingExtraPath, "utf8") : "";
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const errors = [];
const warnings = [];

function readJson(relPath) {
  const file = path.join(root, relPath);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function collectFoodIds(source, label) {
  const ids = new Set();
  const fRe = /f\(\s*["']([^"']+)["']/g;
  let m;
  while ((m = fRe.exec(source))) ids.add(m[1]);
  const objRe = /\{\s*id:\s*["']([^"']+)["']/g;
  while ((m = objRe.exec(source))) ids.add(m[1]);
  const jsonIdRe = /"id"\s*:\s*"([^"]+)"/g;
  while ((m = jsonIdRe.exec(source))) ids.add(m[1]);
  return { ids, label };
}

const expandedIds = collectFoodIds(expanded, "foods-expanded");
const cnIds = collectFoodIds(cnBundle, "foods-cn-bundle");
const tcmBundlePath = path.join(root, "generated", "tcm-herbs-bundle.js");
const tcmBundle = fs.existsSync(tcmBundlePath) ? fs.readFileSync(tcmBundlePath, "utf8") : "";
const tcmIds = collectFoodIds(tcmBundle, "tcm-herbs-bundle");
const classicPath = path.join(root, "generated", "classic-diet-recipes.js");
const classicRecipes = fs.existsSync(classicPath) ? fs.readFileSync(classicPath, "utf8") : "";
const runtimeMatch = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
const runtimeIds = collectFoodIds(runtimeMatch ? runtimeMatch[1] : "", "runtime");

const allFoodIds = new Set([...expandedIds.ids, ...cnIds.ids, ...tcmIds.ids, ...runtimeIds.ids]);

function collectRecipeFoodRefs(sources) {
  const refs = [];
  for (const source of sources) {
    const bulkRe = /"foodIds"\s*:\s*\[([^\]]*)\]/g;
    let m;
    while ((m = bulkRe.exec(source))) {
      const idRe = /"([a-z0-9-]+)"/g;
      let im;
      while ((im = idRe.exec(m[1]))) refs.push({ id: im[1], kind: "bulk" });
    }
    const recipeRe = /recipe\(\s*["'][^"']+["']\s*,[\s\S]*?\[(["'][^\]']+["'](?:\s*,\s*["'][^"']+["'])*)\]\s*,/g;
    while ((m = recipeRe.exec(source))) {
      const idRe = /["']([a-z0-9-]+)["']/g;
      let im;
      while ((im = idRe.exec(m[1]))) refs.push({ id: im[1], kind: "recipe()" });
    }
  }
  return refs;
}

const recipeRefs = collectRecipeFoodRefs([app, bulkRecipes, classicRecipes]);
const missingFoodRefs = [...new Set(recipeRefs.map((r) => r.id))].filter((id) => !allFoodIds.has(id));
if (missingFoodRefs.length) {
  errors.push(`Recipe foodIds missing from food catalog: ${missingFoodRefs.join(", ")}`);
}

function collectPairingIds(source) {
  const ids = new Set();
  const blockRe = /"ids"\s*:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = blockRe.exec(source))) {
    const idRe = /"([a-z0-9-]+)"/g;
    let im;
    while ((im = idRe.exec(m[1]))) ids.add(im[1]);
  }
  const inlineRe = /ids:\s*\[([^\]]*)\]/g;
  while ((m = inlineRe.exec(source))) {
    const idRe = /["']([a-z0-9-]+)["']/g;
    let im;
    while ((im = idRe.exec(m[1]))) ids.add(im[1]);
  }
  return ids;
}

const pairingIds = collectPairingIds([app, pairingExtra].filter(Boolean).join("\n"));
const missingPairing = [...pairingIds].filter((id) => !allFoodIds.has(id));
if (missingPairing.length) {
  errors.push(`Pairing rule ids missing from food catalog: ${missingPairing.join(", ")}`);
}

function collectRulesWithoutCategory(source) {
  const missing = [];
  const ruleRe = /\{\s*(?:\n\s*"ids"|\n\s*ids:)[\s\S]*?\}/g;
  let m;
  while ((m = ruleRe.exec(source))) {
    if (!/category/.test(m[0])) {
      const title = m[0].match(/"title"\s*:\s*"([^"]+)"|title:\s*"([^"]+)"/);
      missing.push(title?.[1] || title?.[2] || "(unknown)");
    }
  }
  return missing;
}

const rulesMissingCategory = collectRulesWithoutCategory(app);
if (rulesMissingCategory.length) {
  warnings.push(`Pairing rules missing category: ${rulesMissingCategory.join(", ")}`);
}

const herbs = readJson("data/tcm/herbs-chp2025.json");
if (!herbs?.length) {
  errors.push("Missing or empty data/tcm/herbs-chp2025.json — run npm run build:data");
} else {
  const herbIds = new Set();
  const herbNames = new Set();
  herbs.forEach((herb) => {
    if (herbIds.has(herb.id)) errors.push(`Duplicate herb id in herbs-chp2025.json: ${herb.id}`);
    if (herbNames.has(herb.name)) errors.push(`Duplicate herb name in herbs-chp2025.json: ${herb.name}`);
    herbIds.add(herb.id);
    herbNames.add(herb.name);
    if (!herb.pharmacopoeiaEdition) warnings.push(`Herb missing pharmacopoeiaEdition: ${herb.name}`);
  });
  if (herbs.length < 600) {
    warnings.push(`TCM catalog ${herbs.length} herbs — ChP 2025 target is ~616`);
  }
}

const ingredients = readJson("data/cn/foods-ingredients.json");
if (!ingredients?.length) {
  errors.push("Missing or empty data/cn/foods-ingredients.json");
} else {
  const ingIds = new Set();
  ingredients.forEach((food) => {
    if (ingIds.has(food.id)) errors.push(`Duplicate food id in foods-ingredients.json: ${food.id}`);
    ingIds.add(food.id);
  });
  const hasLigao = ingredients.some((f) => f.name === "藜蒿" || f.aliases?.includes("芦蒿"));
  if (!hasLigao) errors.push("foods-ingredients.json missing 藜蒿");
}

const fffd = (expanded + cnBundle + app).match(/\uFFFD/g);
if (fffd?.length) warnings.push(`Found ${fffd.length} U+FFFD replacement characters`);

if (/RESTORED_BULK_RECIPES/.test(app)) {
  errors.push("app.js still contains inline RESTORED_BULK_RECIPES — run npm run build:data");
}

const bulkCount = (bulkRecipes.match(/"id"\s*:\s*"restored-recipe-/g) || []).length;
const draftBulk = (bulkRecipes.match(/"draft"\s*:\s*true/g) || []).length;
if (!bulkCount) {
  warnings.push("No bulk recipes in generated/recipes-bulk.js — run npm run build:data");
} else if (draftBulk) {
  warnings.push(`${draftBulk} bulk recipes still marked draft in generated bundle`);
}

const classicCount = (classicRecipes.match(/"classicTier"\s*:\s*1/g) || []).length;
if (classicCount < 100) {
  warnings.push(`Classic diet recipes published: ${classicCount} — target is 100+`);
}

console.log("=== Atlas validate-data ===");
console.log(`Food ids: expanded ${expandedIds.ids.size}, cn bundle ${cnIds.ids.size}, tcm ${tcmIds.ids.size}, runtime ${runtimeIds.ids.size}, total ${allFoodIds.size}`);
console.log(`Recipe food references: ${recipeRefs.length}, pairing food ids: ${pairingIds.size}, bulk recipes: ${bulkCount}, classic recipes: ${classicCount}`);
if (herbs) console.log(`TCM source herbs-chp2025.json: ${herbs.length}`);
if (ingredients) console.log(`CN ingredients: ${ingredients.length}`);

if (warnings.length) {
  console.log("\nWarnings:");
  warnings.forEach((w) => console.log("  ⚠", w));
}

if (errors.length) {
  console.log("\nErrors:");
  errors.forEach((e) => console.log("  ✗", e));
  process.exit(1);
}

console.log("\n✓ All checks passed");
process.exit(0);
