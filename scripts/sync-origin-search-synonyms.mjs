#!/usr/bin/env node
/** Keep origin-search-synonyms foodIds aligned with surviving origin catalog rows. */
import fs from "fs";
import path from "path";
import {
  loadFoodCatalogIds,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const synPath = path.join(root, "data", "cn", "origin-search-synonyms.json");
const rows = readCnJson("origin-search-synonyms.json", []);
const origin = readCnJson("origin-products.json", readCnJson("origin-products.seed.json", []));
const catalogIds = loadFoodCatalogIds();
const aliasMap = loadFoodIdAliasMap();
const originIds = new Set(origin.map((product) => product.id));
const byName = new Map();

origin.forEach((product) => {
  if (product?.name) byName.set(product.name, product.id);
  (product.aliases || []).forEach((alias) => byName.set(alias, product.id));
});

function existsInCatalog(foodId) {
  if (!foodId) return false;
  const resolved = resolveFoodId(foodId, aliasMap);
  return originIds.has(resolved) || originIds.has(foodId) || catalogIds.has(resolved) || catalogIds.has(foodId);
}

let fixed = 0;
const next = rows.map((row) => {
  const term = String(row.term || "").trim();
  const foodId = String(row.foodId || "").trim();
  if (!term || !foodId) return row;
  if (existsInCatalog(foodId)) return row;
  const replacement = byName.get(term) || byName.get(term.toLowerCase());
  if (replacement && replacement !== foodId) {
    fixed += 1;
    return { ...row, foodId: replacement };
  }
  return row;
});

fs.writeFileSync(synPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`sync-origin-search-synonyms: ${fixed} foodId(s) updated`);
