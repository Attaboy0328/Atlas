#!/usr/bin/env node
/** Phase 6 — merge XJ/XZ/QH synonym batches + inland curated search terms. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds, readCnJson } from "./lib/food-catalog.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const cnDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "cn");
const catalog = loadFoodCatalogIds();

const merged = [];
["food-search-synonyms-batch12-xj.json", "food-search-synonyms-batch12-xz.json", "food-search-synonyms-batch12-qh.json"].forEach((file) => {
  readCnJson(file, []).forEach((row) => merged.push(row));
});

const EXTRA = [
  { term: "淮扬狮子头", foodId: "c22-js-lion-head" },
  { term: "西湖醋鱼", foodId: "c22-zj-westlake-fish" },
  { term: "东坡肉", foodId: "c22-zj-dongpo-pork" },
  { term: "小笼包", foodId: "c22-sh-xiaolongbao" },
  { term: "生煎", foodId: "c22-sh-shengjian" },
  { term: "盐水鸭", foodId: "c22-js-salted-duck" },
  { term: "腌笃鲜", foodId: "c22-sh-yanduxian" },
  { term: "奶皮子", foodId: "c21-nm-dried-milk" },
  { term: "手把肉", foodId: "c21-nm-hand-grab-meat" },
  { term: "兰州牛肉面", foodId: "c21-gs-lanzhou-beef" }
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

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch12.json"), rows);
console.log(`food-search-synonyms-batch12.json: ${rows.length}`);
