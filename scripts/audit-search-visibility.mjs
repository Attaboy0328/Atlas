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

const expanded = loadExpandedFoods();
const cn = loadConst("generated/foods-cn-bundle.js", "CN_SUPPLEMENT_FOODS");
const tcm = fs.existsSync("generated/tcm-herbs-bundle.js")
  ? loadConst("generated/tcm-herbs-bundle.js", "TCM_HERBS_CORE")
  : [];
const synonyms = loadConst("generated/food-search-synonyms.js", "FOOD_SEARCH_SYNONYMS");
const aliases = loadConst("generated/food-id-aliases.js", "FOOD_ID_ALIASES");

const items = dedupeFoods([...expanded, ...cn, ...tcm]);
const byId = new Map(items.map((food) => [food.id, food]));

function resolveId(id) {
  return aliases[id] || id;
}

const terms = [
  "乳鸽", "鸽子", "刺梨", "刺梨子", "蜜饯", "奇亚籽", "瓜子", "竹鼠", "田鼠",
  "油条", "粽子", "月饼", "汤圆", "烧麦", "凉皮", "春卷", "肠粉", "馄饨", "糍粑", "青团",
  "腰果", "开心果", "碧根果", "夏威夷果", "松子", "辣条",
  "三文鱼", "金枪鱼", "鳕鱼", "鸡爪", "鸭脖", "牛腩", "排骨", "燕窝", "木姜子", "栗子", "鱼肚",
  "味噌", "纳豆", "天贝", "马兰头", "莼菜", "慈姑", "青鱼", "豆豉", "醪糟", "百灵草", "百蕊草",
  "香茅", "青稞", "牦牛肉", "清真牛肉", "臭豆腐", "郫县豆瓣"
];
let failed = 0;

for (const term of terms) {
  const sid = resolveId(synonyms[term] || "");
  const food = sid ? byId.get(sid) : null;
  const blobHit = food?.searchBlob?.includes(term.toLowerCase());
  const visible = food && !food.hiddenFromLibrary;
  const ok = visible && (blobHit || synonyms[term]);
  if (!ok) failed += 1;
  console.log(
    term,
    ok ? "OK" : "FAIL",
    "| id:",
    food?.id || "-",
    "| name:",
    food?.name || "-",
    "| hidden:",
    food?.hiddenFromLibrary || false,
    "| blob:",
    blobHit
  );
}

if (failed) {
  console.error(`\n${failed} terms failed visibility audit`);
  process.exit(1);
}

console.log("\nAll terms pass visibility audit");
