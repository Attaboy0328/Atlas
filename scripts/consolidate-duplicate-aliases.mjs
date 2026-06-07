#!/usr/bin/env node
/**
 * Suggest alias consolidations for duplicate food names (report only).
 */
import { loadFoodCatalogMeta, loadFoodIdAliasMap, resolveFoodId } from "./lib/food-catalog.mjs";

const aliasMap = loadFoodIdAliasMap();
const foods = loadFoodCatalogMeta();
const byName = new Map();

foods.forEach((food) => {
  if (!byName.has(food.name)) byName.set(food.name, []);
  byName.get(food.name).push(food.id);
});

const dupes = [...byName.entries()].filter(([, ids]) => {
  const canon = new Set(ids.map((id) => resolveFoodId(id, aliasMap)));
  return canon.size > 1;
});

console.log(`duplicate name groups: ${dupes.length}`);
dupes.slice(0, 20).forEach(([name, ids]) => {
  console.log(`  ${name}: ${ids.join(", ")}`);
});
if (dupes.length > 20) console.log(`  ... and ${dupes.length - 20} more`);
