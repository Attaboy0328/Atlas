#!/usr/bin/env node
import fs from "fs";
import vm from "vm";

function loadConst(file, name) {
  const code = `${fs.readFileSync(file, "utf8")}\n;globalThis.__atlasExport = ${name};`;
  const ctx = { globalThis: {} };
  vm.runInNewContext(code, ctx);
  return ctx.globalThis.__atlasExport;
}

function cleanString(value) {
  return String(value ?? "").trim();
}

function uniq(items) {
  return [...new Set(items)];
}

function mergeFoodEntries(current, incoming) {
  const merged = {
    ...incoming,
    ...current,
    aliases: uniq([...(current.aliases || []), ...(incoming.aliases || [])]),
    searchTerms: uniq([...(current.searchTerms || []), ...(incoming.searchTerms || [])]),
    hiddenFromLibrary: Boolean(current.hiddenFromLibrary && incoming.hiddenFromLibrary)
  };
  merged.searchBlob = uniq([merged.name, ...(merged.searchTerms || []), ...(merged.aliases || [])])
    .map((item) => cleanString(item).toLowerCase())
    .filter(Boolean)
    .join(" ");
  return merged;
}

function dedupeFoods(items) {
  const byId = new Map();
  items.forEach((food) => {
    const id = cleanString(food.id);
    if (!id) return;
    byId.set(id, byId.has(id) ? mergeFoodEntries(byId.get(id), food) : food);
  });
  return [...byId.values()];
}

function loadExpandedFoods() {
  const code = [
    fs.readFileSync("generated/foods-expanded-bulk.js", "utf8"),
    fs.readFileSync("foods-expanded.js", "utf8"),
    "globalThis.__atlasExport = EXPANDED_FOODS;"
  ].join("\n");
  const ctx = { globalThis: {} };
  vm.runInNewContext(code, ctx);
  return ctx.globalThis.__atlasExport;
}

function loadSynonymMap() {
  const food = loadConst("generated/food-search-synonyms.js", "FOOD_SEARCH_SYNONYMS");
  return food || {};
}

function resolveId(id, aliases) {
  return aliases[id] || id;
}

const expanded = loadExpandedFoods();
const cn = loadConst("generated/foods-cn-bundle.js", "CN_SUPPLEMENT_FOODS");
let origin = [];
if (fs.existsSync("generated/origin-products.js")) {
  origin = loadConst("generated/origin-products.js", "ORIGIN_PRODUCT_FOODS");
}
const synonyms = loadSynonymMap();
const aliases = loadConst("generated/food-id-aliases.js", "FOOD_ID_ALIASES");

const items = dedupeFoods([...expanded, ...cn, ...origin]);
const byId = new Map(items.map((food) => [food.id, food]));

const terms = [
  "龙井", "longjing", "西湖龙井", "铁观音", "普洱", "普洱茶", "岩茶", "武夷岩茶",
  "大闸蟹", "阳澄湖大闸蟹", "赣南脐橙", "脐橙", "五常大米", "五常米",
  "新会陈皮", "宁夏枸杞", "中宁枸杞", "文山三七", "霍山石斛", "建宁莲子",
  "岷县当归", "陇西当归", "库尔勒香梨", "哈密瓜", "金华火腿", "宣威火腿",
  "涪陵榨菜", "章丘大葱", "龙口粉丝", "安吉白茶", "黄山毛峰", "祁门红茶",
  "都匀毛尖", "茅台酒", "绍兴黄酒", "脆肉鲩", "西峡香菇", "白毫银针",
  "滇红", "英德红茶", "安化黑茶", "响水大米", "阿克苏苹果", "仙居杨梅",
  "舟山小黄鱼", "湛江对虾", "如皋火腿", "罗平小黄姜", "温县怀山药", "亳州菊花"
];

let failed = 0;

for (const term of terms) {
  const normalized = term.toLowerCase();
  const sid = resolveId(synonyms[normalized] || synonyms[term] || "", aliases);
  const food = sid ? byId.get(sid) : null;
  const blobHit = food?.searchBlob?.includes(normalized);
  const visible = food && !food.hiddenFromLibrary;
  const isOriginHit = food?.isOriginProduct || (food?.giSystems || []).length;
  const ok = visible && (blobHit || synonyms[normalized] || synonyms[term]);
  if (!ok) failed += 1;
  console.log(
    term,
    ok ? "OK" : "FAIL",
    "| id:",
    food?.id || "-",
    "| origin:",
    Boolean(isOriginHit),
    "| blob:",
    blobHit
  );
}

if (failed) {
  console.error(`\n${failed} GI terms failed origin search audit`);
  process.exit(1);
}

console.log("\nAll GI terms pass origin search audit");
