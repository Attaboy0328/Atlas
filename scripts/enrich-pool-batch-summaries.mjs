#!/usr/bin/env node
/** Replace template pool summaries in batch7–11 with varied curated text (quality layer). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { readCnJson } from "./lib/food-catalog.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const POOL_FILES = [
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
];

const TEMPLATE_RE = /民间常见.+食养整理条目/;
const VARIANTS = [
  (name, province, category) => `${name}为${province}地方${category}，日常食养参考条目。`,
  (name, province, category) => `${province}家常${category}${name}，性味与用量因人而异。`,
  (name, province) => `${name}在${province}饮食文化中常见，作调理参考而非医疗建议。`,
  (name, category) => `${name}属${category}类，传统食养整理供查阅搭配。`,
  (name, province) => `${province}产区${name}，性味归经按民间经验整理。`
];

function enrichSummary(food, index) {
  const text = String(food.summary || "");
  if (!TEMPLATE_RE.test(text)) return food;
  const province = (food.provinces || [])[0] || "中国";
  const category = food.category || "食材";
  const fn = VARIANTS[index % VARIANTS.length];
  const summary = fn(food.name, province, category);
  return { ...food, summary };
}

let changed = 0;
POOL_FILES.forEach((file) => {
  const filePath = path.join(cnDir, file);
  const rows = readCnJson(file, []);
  if (!rows.length) return;
  const next = rows.map((food, i) => {
    const out = enrichSummary(food, i);
    if (out.summary !== food.summary) changed += 1;
    return out;
  });
  fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
});

console.log(`[enrich-pool-batch-summaries] updated ${changed} template summaries`);
