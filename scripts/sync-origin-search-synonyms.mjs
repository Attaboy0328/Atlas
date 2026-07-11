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
  (product.searchTerms || []).forEach((term) => byName.set(term, product.id));
});

function existsInOrigin(foodId) {
  if (!foodId) return false;
  const resolved = resolveFoodId(foodId, aliasMap);
  return originIds.has(resolved) || originIds.has(foodId);
}

function existsInCatalog(foodId) {
  if (!foodId) return false;
  const resolved = resolveFoodId(foodId, aliasMap);
  return originIds.has(resolved) || originIds.has(foodId) || catalogIds.has(resolved) || catalogIds.has(foodId);
}

function findOriginProductForTerm(term) {
  const exact = byName.get(term) || byName.get(term.toLowerCase());
  if (exact && existsInOrigin(exact)) return exact;

  if (term.length < 2) return "";

  const norm = term.toLowerCase();
  const ranked = origin
    .filter((product) => {
      const name = String(product.name || "");
      if (name === term || name.toLowerCase() === norm || name.includes(term)) return true;
      return (product.searchTerms || []).some((value) => value === term || String(value).toLowerCase() === norm)
        || (product.aliases || []).some((value) => value === term || String(value).toLowerCase() === norm);
    })
    .sort((a, b) => {
      const score = (product) => {
        const name = String(product.name || "");
        if (name === term) return 0;
        if (name.includes(term)) return 1;
        return 2;
      };
      return score(a) - score(b) || String(a.name).length - String(b.name).length;
    });

  return ranked[0]?.id || "";
}

function resolveSynonymFoodId(term, foodId) {
  if (existsInOrigin(foodId)) return foodId;

  const replacement = findOriginProductForTerm(term);
  if (replacement && replacement !== foodId) return replacement;

  if (existsInCatalog(foodId)) return foodId;
  return foodId;
}

let fixed = 0;
const next = rows.map((row) => {
  const term = String(row.term || "").trim();
  const foodId = String(row.foodId || "").trim();
  if (!term || !foodId) return row;
  const resolved = resolveSynonymFoodId(term, foodId);
  if (resolved !== foodId) {
    fixed += 1;
    return { ...row, foodId: resolved };
  }
  return row;
});

fs.writeFileSync(synPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`sync-origin-search-synonyms: ${fixed} foodId(s) updated`);
