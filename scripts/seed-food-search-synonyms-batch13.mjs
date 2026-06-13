#!/usr/bin/env node
/** Phase 7 — merge international synonym batches + global search terms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds, readCnJson } from "./lib/food-catalog.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const cnDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "cn");
const catalog = loadFoodCatalogIds();

const merged = [];
["food-search-synonyms-batch13-jp.json", "food-search-synonyms-batch13-kr.json", "food-search-synonyms-batch13-sea.json", "food-search-synonyms-batch13-inmed.json", "food-search-synonyms-batch13-americas.json"].forEach((file) => {
  readCnJson(file, []).forEach((row) => merged.push(row));
});

const EXTRA = [
  { term: "味噌汤", foodId: "c23-jp-miso-soup" },
  { term: "泡菜汤", foodId: "c23-kr-kimchi-stew" },
  { term: "椰奶咖喱", foodId: "c23-th-coconut-curry" },
  { term: "清炖河粉", foodId: "c23-vn-pho-lite" },
  { term: "番茄意面", foodId: "c23-it-pasta-marinara" },
  { term: "希腊酸奶", foodId: "c23-gr-yogurt-honey" },
  { term: "塔博勒", foodId: "c23-sa-tabouleh" },
  { term: "燕麦粥", foodId: "c23-us-oatmeal" },
  { term: "三文鱼丼", foodId: "c23-jp-salmon-don" },
  { term: "罗勒炒饭", foodId: "c23-th-basil-fried-rice" }
];

EXTRA.forEach((row) => merged.push(row));

const seen = new Set();
const rows = merged.filter((row) => {
  if (!row.term || !row.foodId || !catalog.has(row.foodId)) return false;
  const key = `${row.term}:${row.foodId}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13.json"), rows);
console.log(`food-search-synonyms-batch13.json: ${rows.length}`);
