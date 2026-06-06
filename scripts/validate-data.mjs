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
const supplement = fs.existsSync(path.join(root, "foods-cn-supplement.js"))
  ? fs.readFileSync(path.join(root, "foods-cn-supplement.js"), "utf8")
  : "";
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const errors = [];
const warnings = [];

function collectFoodIds(source, label) {
  const ids = new Set();
  const fRe = /f\(\s*["']([^"']+)["']/g;
  let m;
  while ((m = fRe.exec(source))) ids.add(m[1]);
  const objRe = /\{\s*id:\s*["']([^"']+)["']/g;
  while ((m = objRe.exec(source))) ids.add(m[1]);
  return { ids, label };
}

const expandedIds = collectFoodIds(expanded, "foods-expanded");
const supplementIds = collectFoodIds(supplement, "foods-cn-supplement");
const runtimeMatch = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
const runtimeIds = collectFoodIds(runtimeMatch ? runtimeMatch[1] : "", "runtime");

const allFoodIds = new Set([...expandedIds.ids, ...supplementIds.ids, ...runtimeIds.ids]);

function collectRecipeFoodRefs(source) {
  const refs = [];
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
  return refs;
}

const recipeRefs = collectRecipeFoodRefs(app);
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

const pairingIds = collectPairingIds(app);
const missingPairing = [...pairingIds].filter((id) => !allFoodIds.has(id));
if (missingPairing.length) {
  errors.push(`Pairing rule ids missing from food catalog: ${missingPairing.join(", ")}`);
}

const fffd = (expanded + supplement + app).match(/\uFFFD/g);
if (fffd?.length) warnings.push(`Found ${fffd.length} U+FFFD replacement characters`);

const draftBulk = (app.match(/restored-recipe-/g) || []).length;
warnings.push(`Bulk restored recipes in source: ${draftBulk} (should be draft-only in app)`);

console.log("=== Atlas validate-data ===");
console.log(`Food ids: expanded ${expandedIds.ids.size}, supplement ${supplementIds.ids.size}, runtime ${runtimeIds.ids.size}, total ${allFoodIds.size}`);
console.log(`Recipe food references: ${recipeRefs.length}, pairing food ids: ${pairingIds.size}`);

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
