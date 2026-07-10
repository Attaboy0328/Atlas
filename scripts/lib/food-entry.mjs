/** Shared helpers for curated CN food batch generation. */
import fs from "node:fs";
import { loadFoodCatalogIds, loadFoodCatalogMeta } from "./food-catalog.mjs";

const ALLOWED_CATEGORIES = new Set([
  "食药物质", "调料", "茶饮", "饮品", "谷物", "主食", "豆类", "豆制品",
  "蔬菜", "野菜", "水生蔬菜", "菌菇", "水果", "肉蛋奶", "海产",
  "坚果种子", "发酵食品", "腌菜", "薯类", "滋补食材"
]);

const NATURE_EFFECTS = {
  寒: ["清热", "清利"],
  凉: ["清热", "清润"],
  平: ["健脾", "补虚"],
  温: ["暖胃", "补气"],
  热: ["温阳", "散寒"]
};

export function makeFood({
  id,
  name,
  category = "蔬菜",
  nature = "平",
  natureSource = "",
  natureConfidence = "",
  provinces = ["广东"],
  regions = ["CN"],
  aliases = [],
  dietaryScenes = [],
  ethnicGroups = [],
  en = "",
  pinyin = "",
  initials = "",
  searchTerms = [],
  summary = "",
  caution = "",
  effects = []
}) {
  if (!ALLOWED_CATEGORIES.has(category)) {
    throw new Error(`Invalid category ${category} for ${name}`);
  }
  const fx = effects.length ? effects : (NATURE_EFFECTS[nature] || ["调理"]);
  const autoSummary = summary || `${name}为${provinces[0] || "中国"}常见${category}，传统食养整理作日常${fx[0]}参考。`;
  const autoCaution = caution || "因人而异，消化弱者适量；过敏或慢病用药期请咨询医生。";
  const terms = [...new Set([name, ...aliases, ...searchTerms, id].filter(Boolean))];
  return {
    id,
    name,
    en: en || name,
    category,
    nature,
    effects: fx,
    regions,
    provinces,
    ...(aliases.length ? { aliases } : {}),
    ...(dietaryScenes.length ? { dietaryScenes } : {}),
    ...(ethnicGroups.length ? { ethnicGroups } : {}),
    pinyin: pinyin || id.replace(/-/g, ""),
    initials: initials || id.slice(0, 3),
    searchTerms: terms,
    summary: autoSummary,
    caution: autoCaution,
    ...(natureSource ? { natureSource } : {}),
    ...(natureConfidence ? { natureConfidence } : {})
  };
}

export function loadCatalogSets() {
  const ids = loadFoodCatalogIds();
  const names = new Set(loadFoodCatalogMeta().map((f) => f.name));
  return { ids, names };
}

export function pushUniqueFood(target, food, catalog, seenInBatch) {
  if (!food?.id || !food?.name) return false;
  if (catalog.ids.has(food.id) || catalog.names.has(food.name)) return false;
  if (seenInBatch.has(food.id) || seenInBatch.has(`name:${food.name}`)) return false;
  seenInBatch.add(food.id);
  seenInBatch.add(`name:${food.name}`);
  target.push(food);
  return true;
}

export function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
