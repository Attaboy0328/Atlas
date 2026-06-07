#!/usr/bin/env node
/**
 * Build generated JS bundles from data/cn JSON sources.
 * Run: npm run build:data
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  CN_JSON_SOURCES,
  loadFoodCatalogIds,
  loadFoodIdAliasMap,
  normalizeRecipeFoodIds,
  readCnJson,
  root,
  writeJsAliasBundle
} from "./lib/food-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(root, "data", "cn");
const genDir = path.join(root, "generated");

const AMOUNT_HINTS = {
  米: "80 克", 粳米: "80 克", 大米: "80 克", 小米: "80 克", 糯米: "60 克",
  姜: "3 片", 生姜: "3 片", 陈皮: "3 克", 红枣: "6 枚", 莲子: "20 克",
  百合: "20 克", 山药: "100 克", 银耳: "10 克", 梨: "1 个", 雪梨: "1 个",
  瘦肉: "150 克", 鸡肉: "200 克", 排骨: "250 克", 清水: "500 ml"
};

const NATURE_RANK = { 寒: 1, 凉: 2, 平: 3, 温: 4, 热: 5 };

const BULK_SOURCE = {
  title: "《食疗本草》",
  summary: "按证候与常见食材组合整理的日常食养条目，剂量需按人数与个体耐受调整。"
};

function readJson(name, fallback = []) {
  return readCnJson(name, fallback);
}

function foodNameFromId(id) {
  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  const re = new RegExp(`f\\(\\s*["']${id}["']\\s*,\\s*["']([^"']+)["']`);
  const m = expanded.match(re);
  if (m) return m[1];
  for (const file of CN_JSON_SOURCES) {
    const hit = readJson(file).find((f) => f.id === id);
    if (hit) return hit.name;
  }
  return id;
}

function fixIngredient(line) {
  if (!line.includes("适量")) return line;
  const name = line.split(/\s+/)[0];
  for (const [key, amount] of Object.entries(AMOUNT_HINTS)) {
    if (name.includes(key) || key.includes(name)) return `${name} ${amount}`;
  }
  return `${name} 50–100 克（按人数调整）`;
}

function isGenericSteps(steps) {
  const text = (steps || []).join(" ");
  return /分别处理干净|分别洗净处理|按家常做法|按.*思路做熟|每周 1.?2 次为宜|加水同煮或同炖/u.test(text);
}

function detectCookMethod(item) {
  const text = `${item.name || ""}${item.subtitle || ""}`;
  if (/粥/.test(text)) return "congee";
  if (/羹/.test(text)) return "pudding";
  if (/汤/.test(text)) return "soup";
  if (/饮|茶/.test(text)) return "drink";
  if (/炖|煲|煨/.test(text)) return "stew";
  if (/炒|煸/.test(text)) return "stirfry";
  return "simmer";
}

function buildSteps(foodNames, item) {
  const method = detectCookMethod(item);
  const subtitle = item.subtitle || "日常食养";
  const main = foodNames.join("、");
  const grain = foodNames.find((name) => /米|麦|小米|糯米|薏米|燕麦|玉米/.test(name));
  const others = foodNames.filter((name) => name !== grain);

  if (method === "congee") {
    return [
      grain
        ? `${grain}淘洗${others.length ? `，${others.join("、")}处理干净` : ""}。`
        : `${main}分别处理干净。`,
      grain && others.length
        ? `锅中加清水，先下${grain}煮至半熟，再加入${others.join("、")}。`
        : `将${main}与适量清水一同入锅中。`,
      `转小火慢煮成粥，按${subtitle}思路调味；温热作正餐或加餐，每周 1–2 次为宜。`
    ];
  }

  if (method === "soup" || method === "stew") {
    return [
      `${main}分别洗净，肉类或骨类先焯水去血沫。`,
      method === "stew"
        ? `转入砂锅或炖盅，加清水按${subtitle}思路小火炖 60–90 分钟至熟烂。`
        : `加清水或高汤，按${subtitle}思路同煮 30–45 分钟至食材熟软。`,
      "撇去浮油，少盐调味，温热适量食用；症状持续或加重时请就医。"
    ];
  }

  if (method === "drink") {
    return [
      `${main}洗净${/茶|叶|花|草/.test(main) ? "，必要时稍浸泡" : ""}。`,
      `加清水 500–800 ml，小火煮 15–20 分钟出味，避免久煎偏苦或偏燥。`,
      "滤渣或不滤均可，温饮少量；空腹、睡前及明显上火时不宜大量。"
    ];
  }

  if (method === "pudding") {
    return [
      `${main}分别处理，银耳、百合等干货提前泡发。`,
      `加清水同煮至软烂，可按${subtitle}思路做成羹状。`,
      "温热少量食用，甜腻或痰湿偏重时控制频率。"
    ];
  }

  if (method === "stirfry") {
    return [
      `${main}分别洗净切配，腊肉或肉类先蒸/煮软再切片。`,
      `热锅少油，按${subtitle}思路快炒断生，避免过火或重油。`,
      "趁热作配菜或主菜，高盐高脂人群注意控量。"
    ];
  }

  if (foodNames.length >= 2) {
    return [
      `${main}分别洗净处理。`,
      `加水同煮，按${subtitle}思路做熟，注意火候与个体耐受。`,
      "温热食用，每周 1–2 次为宜，不适时停用并咨询专业人士。"
    ];
  }

  return [
    `${foodNames[0] || "食材"}处理干净。`,
    `按${subtitle}思路做熟，避免一次过量。`,
    "温热食用，按个人耐受调整频率。"
  ];
}

function inferNature(foodIds, fallback) {
  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  const natures = foodIds.map((id) => {
    const re = new RegExp(`f\\(\\s*["']${id}["'][\\s\\S]*?N_(\\w+)`);
    const m = expanded.match(re);
    if (!m) {
      for (const file of CN_JSON_SOURCES) {
        const hit = readJson(file).find((f) => f.id === id);
        if (hit) return hit.nature;
      }
      return null;
    }
    const map = { COLD: "寒", COOL: "凉", NEUTRAL: "平", WARM: "温", HOT: "热" };
    return map[m[1]] || null;
  }).filter(Boolean);
  if (!natures.length) return fallback;
  const avg = natures.reduce((sum, n) => sum + (NATURE_RANK[n] || 3), 0) / natures.length;
  const closest = Object.entries(NATURE_RANK).sort((a, b) => Math.abs(a[1] - avg) - Math.abs(b[1] - avg))[0];
  return closest[0];
}

function enhanceBulkRecipe(item, catalog, publishedNames, aliasMap) {
  const foodIds = normalizeRecipeFoodIds(item.foodIds || [], catalog, aliasMap);
  if (foodIds.length < 1) return null;
  if (publishedNames.has(item.name)) return null;

  const foodNames = foodIds.map((id) => foodNameFromId(id));
  const ingredients = (item.ingredients || []).map(fixIngredient);
  const steps = isGenericSteps(item.steps) ? buildSteps(foodNames, item) : item.steps;
  const nature = inferNature(foodIds, item.nature);

  return {
    id: item.id,
    name: item.name,
    nature,
    syndromes: item.syndromes || [],
    foodIds,
    subtitle: item.subtitle || "日常食养",
    ingredients,
    steps,
    note: item.note,
    sources: [BULK_SOURCE],
    draft: false,
    bulkTier: 2,
    cookingMethod: detectCookMethod(item)
  };
}

function collectPublishedRecipeNames() {
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const names = new Set();
  const recipeRe = /recipe\(\s*["'][^"']+["']\s*,\s*["']([^"']+)["']/g;
  let m;
  while ((m = recipeRe.exec(app))) names.add(m[1]);
  return names;
}

function writeJs(outPath, constName, data) {
  fs.writeFileSync(
    outPath,
    `/** Auto-generated by scripts/build-data.mjs — do not edit */\nconst ${constName} = ${JSON.stringify(data, null, 2)};\n`,
    "utf8"
  );
}

function mergeCnFoods() {
  const byId = new Map();
  CN_JSON_SOURCES.flatMap((file) => readJson(file)).forEach((food) => {
    byId.set(food.id, food);
  });
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

const cnFoods = mergeCnFoods();
const catalog = loadFoodCatalogIds();
const aliasMap = loadFoodIdAliasMap();
const publishedNames = collectPublishedRecipeNames();
const rawBulk = readJson("bulk-recipes.json");
const enhancedBulk = rawBulk
  .map((item) => enhanceBulkRecipe(item, catalog, publishedNames, aliasMap))
  .filter(Boolean);

fs.mkdirSync(genDir, { recursive: true });
writeJsAliasBundle(aliasMap);
writeJs(path.join(genDir, "foods-cn-bundle.js"), "CN_SUPPLEMENT_FOODS", cnFoods);
writeJs(path.join(genDir, "recipes-bulk.js"), "BULK_RECIPES_ENHANCED", enhancedBulk);
function loadPairingRulesAll() {
  return [
    ...readJson("pairing-rules-base.json"),
    ...readJson("pairing-rules-extra.json"),
    ...readJson("pairing-rules-extra-batch2.json", []),
    ...readJson("pairing-rules-extra-batch3.json", []),
    ...readJson("pairing-rules-extra-batch4.json", [])
  ];
}

writeJs(path.join(genDir, "pairing-rules-extra.js"), "PAIRING_RULES_ALL", loadPairingRulesAll());

const catalogManifest = readJson("food-medicine-catalog.json", []);
writeJs(path.join(genDir, "food-medicine-catalog.js"), "FOOD_MEDICINE_CATALOG", catalogManifest);

const publicDir = path.join(root, "public", "data", "cn");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "foods.json"), JSON.stringify(cnFoods, null, 2));
fs.writeFileSync(path.join(publicDir, "bulk-recipes-enhanced.json"), JSON.stringify(enhancedBulk, null, 2));

console.log(`CN foods: ${cnFoods.length} (pairing + regional + batch4 + ingredients)`);
console.log(`Bulk recipes enhanced & published: ${enhancedBulk.length} / ${rawBulk.length}`);
console.log(`Food id aliases: ${Object.keys(aliasMap).length}`);
console.log(`Food-medicine catalog: ${catalogManifest.length} entries`);
console.log(`Output: generated/foods-cn-bundle.js, generated/recipes-bulk.js, generated/pairing-rules-extra.js, generated/food-id-aliases.js, generated/food-medicine-catalog.js`);
