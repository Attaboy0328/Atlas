#!/usr/bin/env node
/**
 * Audit curated ingredient batches: real food/seasoning only, required metadata.
 */
import { CN_JSON_SOURCES, loadFoodCatalogIds, readCnJson } from "./lib/food-catalog.mjs";

const INGREDIENT_BATCH_FILES = new Set([
  "foods-international-batch5.json",
  "foods-international-batch6.json",
  "foods-ingredients-batch3.json",
  "foods-ingredients-batch4.json",
  "foods-seasonal-river-batch3.json",
  "foods-seasonal-river-batch4.json",
  "foods-modern-regional-batch2.json",
  "foods-lingnan-ingredients-batch.json",
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json",
  "foods-hk-ingredients-batch.json",
  "foods-mo-ingredients-batch.json",
  "foods-gx-ingredients-batch.json",
  "foods-hainan-ingredients-batch.json",
  "foods-china-curated-batch12.json",
  "foods-china-curated-batch13.json",
  "foods-china-curated-batch14.json",
  "foods-china-curated-batch15.json",
  "foods-china-curated-batch16.json",
  "foods-china-curated-batch17.json",
  "foods-china-curated-batch18.json"
]);

const POOL_BATCH_FILES = new Set([
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
]);
const TEMPLATE_RE = /民间常见.+食养整理条目/;

const ALLOWED_CATEGORIES = new Set([
  "食药物质", "调料", "茶饮", "饮品", "谷物", "主食", "豆类", "豆制品",
  "蔬菜", "野菜", "水生蔬菜", "菌菇", "水果", "肉蛋奶", "海产",
  "坚果种子", "发酵食品", "腌菜", "薯类", "滋补食材"
]);

const ALLOWED_DIETARY = new Set(["素食", "全植物", "清真", "无麸质"]);
const ALLOWED_NATURE = new Set(["寒", "凉", "平", "温", "热", "大热", "复合"]);
const NON_FOOD_RE = /分析仪|仪器|设备|机械|软件|平台|系列$|初加工|毛巾|有限公司|农业局|化肥|农药|饲料(?!.)|种苗(?!.)|种子(?!.)|苗木/;
const ID_RE = /^[a-z][a-z0-9-]*$/;

const catalogIds = loadFoodCatalogIds();
const issues = [];

function pushIssue(file, food, code, detail) {
  issues.push({ file, id: food?.id || "(missing)", name: food?.name || "", code, detail });
}

function auditEntry(food, file) {
  if (!food || typeof food !== "object") {
    pushIssue(file, food, "invalid-row", "not an object");
    return;
  }
  if (!food.id || !ID_RE.test(food.id)) pushIssue(file, food, "bad-id", `id=${food.id}`);
  if (!food.name || food.name.length < 1) pushIssue(file, food, "bad-name", `name=${food.name}`);
  if (!ALLOWED_CATEGORIES.has(food.category)) {
    pushIssue(file, food, "bad-category", food.category || "(empty)");
  }
  if (!ALLOWED_NATURE.has(food.nature)) {
    pushIssue(file, food, "bad-nature", food.nature || "(empty)");
  }
  if (!food.summary || food.summary.length < 8) {
    pushIssue(file, food, "missing-summary", "summary too short");
  }
  if (!food.caution || food.caution.length < 4) {
    pushIssue(file, food, "missing-caution", "caution too short");
  }
  const name = String(food.name || "");
  if (NON_FOOD_RE.test(name) || NON_FOOD_RE.test(String(food.summary || ""))) {
    pushIssue(file, food, "non-food", "matches non-ingredient pattern");
  }
  if (/^\d{7,}$/.test(name.replace(/\s/g, ""))) {
    pushIssue(file, food, "phone-name", "looks like phone number");
  }
  (food.dietaryScenes || []).forEach((scene) => {
    if (!ALLOWED_DIETARY.has(scene)) pushIssue(file, food, "bad-dietary", scene);
  });
  if (food.id && !catalogIds.has(food.id)) {
    pushIssue(file, food, "missing-catalog-id", "id not in built catalog — run build:data");
  }
}

const seenIds = new Map();
INGREDIENT_BATCH_FILES.forEach((file) => {
  const rows = readCnJson(file, []);
  if (!rows.length) {
    issues.push({ file, id: "", name: "", code: "empty-file", detail: "no entries" });
    return;
  }
  rows.forEach((food) => {
    if (food.id) {
      const prior = seenIds.get(food.id);
      if (prior && prior !== file) {
        pushIssue(file, food, "dup-id-across-batches", `also in ${prior}`);
      } else {
        seenIds.set(food.id, file);
      }
    }
    auditEntry(food, file);
  });
});

// Synonym batch: foodId must resolve
[
  "food-search-synonyms-batch5.json",
  "food-search-synonyms-batch6.json",
  "food-search-synonyms-batch7.json",
  "food-search-synonyms-batch8-hk.json",
  "food-search-synonyms-batch9-mo.json",
  "food-search-synonyms-batch9-gx.json",
  "food-search-synonyms-batch9-hainan.json",
  "food-search-synonyms-batch10-phase4.json"
].forEach((synonymFile) => {
readCnJson(synonymFile, []).forEach((row) => {
  const foodId = String(row.foodId || "").trim();
  const term = String(row.term || "").trim();
  if (!term || !foodId) {
    issues.push({ file: synonymFile, id: foodId, name: term, code: "bad-synonym", detail: "missing term or foodId" });
    return;
  }
  if (!catalogIds.has(foodId)) {
    issues.push({ file: synonymFile, id: foodId, name: term, code: "synonym-missing-food", detail: "foodId not in catalog" });
  }
});
});

const byCode = {};
issues.forEach((row) => {
  byCode[row.code] = (byCode[row.code] || 0) + 1;
});

let poolTotal = 0;
let poolTemplate = 0;
POOL_BATCH_FILES.forEach((file) => {
  readCnJson(file, []).forEach((food) => {
    poolTotal += 1;
    if (TEMPLATE_RE.test(String(food.summary || ""))) poolTemplate += 1;
  });
});
const poolTemplateRatio = poolTotal ? poolTemplate / poolTotal : 0;
if (poolTemplateRatio > 0.3) {
  issues.push({
    file: "pool-batches",
    id: "",
    name: "",
    code: "pool-template-ratio",
    detail: `${(poolTemplateRatio * 100).toFixed(1)}% > 30% (${poolTemplate}/${poolTotal})`
  });
}

console.log(`[audit-ingredient-catalog] ${issues.length} issue(s) across ${INGREDIENT_BATCH_FILES.size} batch files`);
if (poolTotal) {
  console.log(`  pool template ratio: ${(poolTemplateRatio * 100).toFixed(1)}% (${poolTemplate}/${poolTotal})`);
}
Object.entries(byCode).forEach(([code, count]) => console.log(`  ${code}: ${count}`));
issues.slice(0, 12).forEach((row) => {
  console.log(`    - ${row.file} ${row.id} (${row.name}): ${row.code} — ${row.detail}`);
});

if (issues.length) process.exit(1);
