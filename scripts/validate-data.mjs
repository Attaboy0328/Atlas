#!/usr/bin/env node
/**
 * Data integrity checks for Atlas food/recipe/pairing datasets.
 * Run: npm run validate-data
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  loadFoodCatalogIds,
  loadFoodIdAliasMap,
  normalizeRecipeFoodIds,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
const expandedBulkPath = path.join(root, "generated", "foods-expanded-bulk.js");
const expandedBulk = fs.existsSync(expandedBulkPath) ? fs.readFileSync(expandedBulkPath, "utf8") : "";
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

function collectFoodIds(source) {
  const ids = new Set();
  const fRe = /f\(\s*["']([^"']+)["']/g;
  let m;
  while ((m = fRe.exec(source))) ids.add(m[1]);
  const objRe = /\{\s*id:\s*["']([^"']+)["']/g;
  while ((m = objRe.exec(source))) ids.add(m[1]);
  const jsonIdRe = /"id"\s*:\s*"([^"]+)"/g;
  while ((m = jsonIdRe.exec(source))) ids.add(m[1]);
  return ids;
}

const expandedIds = new Set([...collectFoodIds(expanded), ...collectFoodIds(expandedBulk)]);
const cnIds = collectFoodIds(cnBundle);
const tcmBundlePath = path.join(root, "generated", "tcm-herbs-bundle.js");
const tcmBundle = fs.existsSync(tcmBundlePath) ? fs.readFileSync(tcmBundlePath, "utf8") : "";
const tcmIds = collectFoodIds(tcmBundle);
const classicPath = path.join(root, "generated", "classic-diet-recipes.js");
const classicRecipes = fs.existsSync(classicPath) ? fs.readFileSync(classicPath, "utf8") : "";
const handcraftedPath = path.join(root, "generated", "handcrafted-recipes.js");
const handcraftedRecipes = fs.existsSync(handcraftedPath) ? fs.readFileSync(handcraftedPath, "utf8") : "";
const runtimeMatch = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
const runtimeIds = collectFoodIds(runtimeMatch ? runtimeMatch[1] : "");

const allFoodIds = loadFoodCatalogIds();
const aliasMap = loadFoodIdAliasMap();

Object.entries(aliasMap).forEach(([alias, canonical]) => {
  if (alias === canonical) errors.push(`Alias maps to itself: ${alias}`);
  const resolved = resolveFoodId(canonical, aliasMap);
  if (!allFoodIds.has(resolved)) errors.push(`Alias canonical missing from catalog: ${alias} -> ${canonical}`);
});

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

const recipeRefs = collectRecipeFoodRefs([handcraftedRecipes, bulkRecipes, classicRecipes]);
const missingFoodRefs = [...new Set(recipeRefs.map((r) => r.id))].filter((id) => {
  const normalized = normalizeRecipeFoodIds([id], allFoodIds, aliasMap);
  return normalized.length < 1;
});
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

const pairingIds = collectPairingIds(pairingExtra);
const missingPairing = [...pairingIds].filter((id) => {
  const canon = resolveFoodId(id, aliasMap);
  return !allFoodIds.has(id) && !allFoodIds.has(canon);
});
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

const pairingJsonSources = [
  readJson("data/cn/pairing-rules-base.json"),
  readJson("data/cn/pairing-rules-extra.json"),
  readJson("data/cn/pairing-rules-extra-batch2.json"),
  readJson("data/cn/pairing-rules-extra-batch3.json"),
  readJson("data/cn/pairing-rules-extra-batch4.json"),
  readJson("data/cn/pairing-rules-extra-batch5.json"),
  readJson("data/cn/pairing-rules-extra-batch6.json")
].filter(Boolean);

const rulesMissingCategory = [
  ...collectRulesWithoutCategory(pairingExtra),
  ...pairingJsonSources.flatMap((rules) => collectRulesWithoutCategory(JSON.stringify(rules)))
];
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

if (!fs.existsSync(path.join(root, "generated", "food-id-aliases.js"))) {
  errors.push("Missing generated/food-id-aliases.js — run npm run build:data");
}

const originProducts = readJson("data/cn/origin-products.json")
  || readJson("data/cn/origin-products.seed.json");
if (!originProducts?.length) {
  errors.push("Missing or empty origin products — run npm run ingest:origin");
} else {
  const originIds = new Set();
  if (originProducts.length < 4000) {
    warnings.push(`Origin products ${originProducts.length} — target is 4000+ after MARA AGI import`);
  }
  originProducts.forEach((product) => {
    if (!product.id) errors.push("Origin product missing id");
    if (originIds.has(product.id)) errors.push(`Duplicate origin product id: ${product.id}`);
    originIds.add(product.id);
    if (!product.provenance?.source) {
      warnings.push(`Origin product missing provenance.source: ${product.name || product.id}`);
    }
    if (product.baseFoodId) {
      const base = resolveFoodId(product.baseFoodId, aliasMap);
      if (!allFoodIds.has(product.baseFoodId) && !allFoodIds.has(base)) {
        warnings.push(`Origin product baseFoodId not in catalog: ${product.name} -> ${product.baseFoodId}`);
      }
    }
  });
}

const originBundlePath = path.join(root, "generated", "origin-products.js");
if (!fs.existsSync(originBundlePath)) {
  errors.push("Missing generated/origin-products.js — run npm run build:data");
} else {
  const originBundle = fs.readFileSync(originBundlePath, "utf8");
  const originBundleIds = collectFoodIds(originBundle);
  originBundleIds.forEach((id) => {
    if (!allFoodIds.has(id)) warnings.push(`Origin bundle id not in catalog meta: ${id}`);
  });
}

const daoDi = readJson("data/tcm/dao-di-regions.json");
if (!daoDi?.length) {
  warnings.push("Missing or empty data/tcm/dao-di-regions.json");
} else {
  daoDi.forEach((row) => {
    if (!row.canonicalId) warnings.push(`Dao-di row missing canonicalId: ${row.name || "(unknown)"}`);
  });
}

if (!fs.existsSync(path.join(root, "generated", "dao-di-regions.js"))) {
  errors.push("Missing generated/dao-di-regions.js — run npm run build:data");
}

const daoDiSystems = readJson("data/tcm/dao-di-systems.json");
const daoDiProfiles = readJson("data/tcm/dao-di-herb-profiles.json");
if (!daoDiSystems?.length) {
  warnings.push("Missing or empty data/tcm/dao-di-systems.json — run npm run ingest:daodi");
}
if (!daoDiProfiles?.length) {
  warnings.push("Missing or empty data/tcm/dao-di-herb-profiles.json — run npm run ingest:daodi");
}
if (!fs.existsSync(path.join(root, "generated", "dao-di-systems.js"))) {
  errors.push("Missing generated/dao-di-systems.js — run npm run build:data");
}
if (!fs.existsSync(path.join(root, "generated", "dao-di-herb-profiles.js"))) {
  errors.push("Missing generated/dao-di-herb-profiles.js — run npm run build:data");
}

console.log("=== Atlas validate-data ===");
console.log(`Food ids: expanded ${expandedIds.size}, cn bundle ${cnIds.size}, tcm ${tcmIds.size}, runtime ${runtimeIds.size}, total ${allFoodIds.size}`);
console.log(`Food id aliases: ${Object.keys(aliasMap).length}`);
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
