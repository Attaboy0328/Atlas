#!/usr/bin/env node
/**
 * Merge origin-product seed + optional data/raw/origin/*.json imports.
 * Writes data/cn/origin-products.json (normalized, auto-linked).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readCnJson, root } from "./lib/food-catalog.mjs";
import {
  autoLinkBaseFoodId,
  buildOriginFoodEntries,
  dedupeOriginProductsByName,
  finalizeOriginProduct,
  isValidOriginProductName,
  loadRawOriginImports,
  mergeOriginProducts,
  sanitizeUserFacingAliases
} from "./lib/origin-products.mjs";
import { applyOriginNatureInference } from "./lib/origin-nature.mjs";
import { applyCrosswalkToProducts } from "./lib/gi-dao-di-crosswalk.mjs";
import { loadFoodCatalogMeta, loadFoodIdAliasMap, resolveFoodId } from "./lib/food-catalog.mjs";

const outPath = path.join(root, "data", "cn", "origin-products.json");

const seed = readCnJson("origin-products.seed.json", []);
const seedIds = new Set(seed.map((row) => row.id).filter(Boolean));
const imported = loadRawOriginImports();
const merged = dedupeOriginProductsByName(mergeOriginProducts([...seed, ...imported]), seedIds);
const crosswalked = applyCrosswalkToProducts(merged);

const aliasMap = loadFoodIdAliasMap();
const catalogMeta = loadFoodCatalogMeta();
const catalogIds = new Set(catalogMeta.map((f) => resolveFoodId(f.id, aliasMap)));
const catalogNames = new Map(catalogMeta.map((f) => [f.name.toLowerCase(), resolveFoodId(f.id, aliasMap)]));
const catalogIndex = {
  index: new Map([...catalogIds].map((id) => [id, id]))
};
catalogNames.forEach((id, name) => catalogIndex.index.set(name, id));

const linked = crosswalked.map((product) => {
  let baseFoodId = autoLinkBaseFoodId(product, catalogIndex, aliasMap);
  if (baseFoodId) {
    const resolved = resolveFoodId(baseFoodId, aliasMap);
    if (!catalogIds.has(resolved)) baseFoodId = null;
  }
  return { ...product, baseFoodId };
});

const { products: inferred, stats: natureStats } = applyOriginNatureInference(linked, { seedIds, aliasMap });
const normalized = inferred
  .filter((product) => isValidOriginProductName(product.name))
  .map((product) => finalizeOriginProduct({
    ...product,
    aliases: sanitizeUserFacingAliases(product.aliases || [])
  }));
const rejected = inferred.length - normalized.length;
const natureCounts = {};
normalized.forEach((p) => {
  natureCounts[p.nature] = (natureCounts[p.nature] || 0) + 1;
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2), "utf8");

const foods = buildOriginFoodEntries(normalized);
const missingBase = foods.filter((f) => f.baseFoodId && !catalogIds.has(f.baseFoodId));
if (missingBase.length) {
  console.warn(`[ingest-origin] baseFoodId not in catalog: ${missingBase.map((f) => `${f.name}->${f.baseFoodId}`).join(", ")}`);
}

console.log(`Origin products: ${normalized.length} (seed ${seed.length}, raw imports ${imported.length}, rejected ${rejected})`);
console.log(`[ingest-origin] nature distribution: ${JSON.stringify(natureCounts)}`);
console.log(`[ingest-origin] nature sources: ${JSON.stringify(natureStats)}`);
console.log(`[ingest-origin] pending review (待考证): 0`);
console.log(`Output: data/cn/origin-products.json`);
