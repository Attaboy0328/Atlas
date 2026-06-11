#!/usr/bin/env node
/**
 * Data quality audit — thin entries, alias health, bulk template ratio.
 * Run: node scripts/audit-data.mjs
 */
import fs from "fs";
import path from "path";
import {
  loadFoodCatalogMeta,
  loadFoodIdAliasMap,
  loadFoodCatalogIds,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const warnings = [];
const info = [];

function readGenerated(name) {
  const file = path.join(root, "generated", name);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

const aliasMap = loadFoodIdAliasMap();
const catalogIds = loadFoodCatalogIds();
const foods = loadFoodCatalogMeta();

// Orphan aliases
Object.entries(aliasMap).forEach(([alias, canonical]) => {
  if (alias === canonical) warnings.push(`Alias self-map: ${alias}`);
  if (!catalogIds.has(canonical)) warnings.push(`Alias canonical missing from catalog: ${alias} -> ${canonical}`);
});

// Duplicate names, different ids (after alias resolve)
const byName = new Map();
foods.forEach((food) => {
  const key = food.name;
  if (!byName.has(key)) byName.set(key, new Set());
  byName.get(key).add(resolveFoodId(food.id, aliasMap));
});
const dupNames = [...byName.entries()].filter(([, ids]) => ids.size > 1);
if (dupNames.length) {
  info.push(`duplicate food names (different ids): ${dupNames.length} (see alias table to consolidate)`);
  if (dupNames.length >= 300) {
    warnings.push(`duplicate food names ${dupNames.length} >= 300 — run consolidate:aliases`);
  }
}

// Thin CN ingredients
const ingredients = JSON.parse(fs.readFileSync(path.join(root, "data/cn/foods-ingredients.json"), "utf8"));
const thin = ingredients.filter((f) => !f.summary || !f.caution);
info.push(`foods-ingredients thin entries (missing summary or caution): ${thin.length} / ${ingredients.length}`);

// Official medicine coverage
const officialInCatalog = foods.filter((f) => {
  const id = resolveFoodId(f.id, aliasMap);
  return f.id.includes("official-") || aliasMap[f.id];
}).length;
const catalogManifest = path.join(root, "data/cn/food-medicine-catalog.json");
if (fs.existsSync(catalogManifest)) {
  const manifest = JSON.parse(fs.readFileSync(catalogManifest, "utf8"));
  const linked = manifest.filter((row) => {
    const id = resolveFoodId(row.canonicalId || row.id, aliasMap);
    return catalogIds.has(id) || catalogIds.has(row.canonicalId || row.id);
  }).length;
  const ratio = manifest.length ? Math.round((linked / manifest.length) * 100) : 0;
  info.push(`food-medicine-catalog link ratio: ${linked}/${manifest.length} (${ratio}%)`);
} else {
  info.push("food-medicine-catalog.json not yet created");
}

const daoDiSystemsPath = path.join(root, "data/tcm/dao-di-systems.json");
const daoDiProfilesPath = path.join(root, "data/tcm/dao-di-herb-profiles.json");
if (fs.existsSync(daoDiSystemsPath) && fs.existsSync(daoDiProfilesPath)) {
  const systems = JSON.parse(fs.readFileSync(daoDiSystemsPath, "utf8"));
  const profiles = JSON.parse(fs.readFileSync(daoDiProfilesPath, "utf8"));
  const linked = profiles.filter((row) => row.linkStatus !== "site-only").length;
  info.push(`dao-di systems: ${systems.length}, herb profiles: ${profiles.length} (catalog-linked ${linked})`);
}

// Bulk template ratio
const bulk = readGenerated("recipes-bulk.js");
const bulkTotal = (bulk.match(/"id"\s*:/g) || []).length;
const templateHits = (bulk.match(/按家常做法|分别处理干净|每周 1.?2 次为宜/g) || []).length;
if (bulkTotal) {
  info.push(`bulk recipes: ${bulkTotal}, template-phrase hits: ${templateHits}`);
}

// Garbled search index in app.js
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const garbled = (app.match(/name: "\?\?/g) || []).length;
if (garbled) warnings.push(`app.js RUNTIME_SEARCH_INDEX garbled entries: ${garbled}`);

const fffd = (app.match(/\uFFFD/g) || []).length;
if (fffd) warnings.push(`U+FFFD replacement chars in app.js: ${fffd}`);

console.log("=== Atlas audit-data ===");
info.forEach((line) => console.log("  ·", line));
if (warnings.length) {
  console.log("\nAudit warnings:");
  warnings.forEach((w) => console.log("  ⚠", w));
  process.exit(1);
}
console.log("\n✓ Audit passed");
process.exit(0);
