#!/usr/bin/env node
/**
 * Build generated JS bundles from data/cn JSON sources.
 * Run: npm run build:data
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
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

const CN_JSON_SOURCES = [
  "pairing-aliases.json",
  "regional-foods.json",
  "expansion-batch4.json",
  "foods-ingredients.json"
];

function readJson(name, fallback = []) {
  const file = path.join(dataDir, name);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadFoodCatalogIds() {
  const ids = new Set();
  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  const fRe = /f\(\s*["']([^"']+)["']/g;
  let m;
  while ((m = fRe.exec(expanded))) ids.add(m[1]);
  CN_JSON_SOURCES.flatMap((file) => readJson(file)).forEach((food) => ids.add(food.id));
  const tcmPath = path.join(root, "data", "tcm", "herbs-chp2025.json");
  if (fs.existsSync(tcmPath)) {
    JSON.parse(fs.readFileSync(tcmPath, "utf8")).forEach((herb) => ids.add(herb.id));
  }
  const runtimeMatch = fs.readFileSync(path.join(root, "app.js"), "utf8").match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
  if (runtimeMatch) {
    const idRe = /id:\s*["']([^"']+)["']/g;
    while ((m = idRe.exec(runtimeMatch[1]))) ids.add(m[1]);
  }
  return ids;
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
  return text.includes("分别处理干净") || text.includes("按家常做法煮至熟软");
}

function buildSteps(foodNames, item) {
  if (foodNames.length >= 2) {
    return [
      `${foodNames.join("、")}分别洗净处理。`,
      `加水同煮或同炖，按${item.subtitle || "日常食养"}思路做熟。`,
      "温热食用，每周 1–2 次为宜，不适时停用并咨询专业人士。"
    ];
  }
  return [
    `${foodNames[0] || "食材"}处理干净。`,
    "按家常做法做熟，避免一次过量。",
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

function enhanceBulkRecipe(item, catalog, publishedNames) {
  const foodIds = (item.foodIds || []).filter((id) => catalog.has(id));
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
    bulkTier: 2
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
const publishedNames = collectPublishedRecipeNames();
const rawBulk = readJson("bulk-recipes.json");
const enhancedBulk = rawBulk
  .map((item) => enhanceBulkRecipe(item, catalog, publishedNames))
  .filter(Boolean);

fs.mkdirSync(genDir, { recursive: true });
writeJs(path.join(genDir, "foods-cn-bundle.js"), "CN_SUPPLEMENT_FOODS", cnFoods);
writeJs(path.join(genDir, "recipes-bulk.js"), "BULK_RECIPES_ENHANCED", enhancedBulk);

const publicDir = path.join(root, "public", "data", "cn");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "foods.json"), JSON.stringify(cnFoods, null, 2));
fs.writeFileSync(path.join(publicDir, "bulk-recipes-enhanced.json"), JSON.stringify(enhancedBulk, null, 2));

console.log(`CN foods: ${cnFoods.length} (pairing + regional + batch4 + ingredients)`);
console.log(`Bulk recipes enhanced & published: ${enhancedBulk.length} / ${rawBulk.length}`);
console.log(`Output: generated/foods-cn-bundle.js, generated/recipes-bulk.js`);
