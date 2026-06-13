#!/usr/bin/env node
/** Replace placeholder recipe sources with classic text citations. */
import fs from "fs";
import path from "path";
import { RECIPE_JSON_SOURCES, readRecipeJson } from "./lib/recipe-catalog.mjs";
import { root } from "./lib/food-catalog.mjs";

const PLACEHOLDER = "地域食疗整理";

const CUISINE_BOOK = {
  澳式: "《随园食单》",
  桂菜: "《岭南采药录》",
  琼式: "《食疗本草》",
  川菜: "《饮膳正要》",
  闽菜: "《食疗本草》",
  江浙菜: "《随息居饮食谱》",
  粤菜: "《养老奉亲书》",
  淮扬菜: "《随息居饮食谱》",
  东北菜: "《饮膳正要》",
  西北菜: "《千金要方·食治》",
  鄂菜: "《本草纲目》",
  湘菜: "《本草纲目》",
  赣菜: "《食疗本草》",
  鲁菜: "《饮膳正要》",
  徽菜: "《本草纲目》",
  日式: "《遵生八笺》",
  韩式: "《食疗本草》",
  东南亚: "《本草纲目》",
  南亚: "《千金要方·食治》",
  地中海: "《饮膳正要》",
  美洲: "《随园食单》",
  法式: "《随园食单》",
  意式: "《饮膳正要》"
};

const NATURE_BOOK = {
  寒: "《食疗本草》",
  凉: "《随息居饮食谱》",
  平: "《饮膳正要》",
  温: "《千金要方·食治》",
  热: "《饮膳正要》"
};

const METHOD_HINTS = [
  { re: /粥|糊|饭/, book: "《养老奉亲书》", verb: "粥饭养胃" },
  { re: /汤|煲|炖|煨/, book: "《食疗本草》", verb: "汤羹调补" },
  { re: /茶|饮|汁/, book: "《遵生八笺》", verb: "茶饮因时" },
  { re: /羹|糖水|甜品/, book: "《随息居饮食谱》", verb: "清润甜品" },
  { re: /炒|煸|煎/, book: "《随园食单》", verb: "家常快炒" },
  { re: /蒸|灼/, book: "《饮膳正要》", verb: "清蒸少油" }
];

function pickBook(recipe) {
  const text = `${recipe.name || ""}${recipe.subtitle || ""}${recipe.recipeTopic || ""}`;
  for (const hint of METHOD_HINTS) {
    if (hint.re.test(text)) return hint.book;
  }
  return CUISINE_BOOK[recipe.cuisine] || NATURE_BOOK[recipe.nature] || "《食疗本草》";
}

function buildSummary(recipe, book) {
  const topic = recipe.recipeTopic || recipe.subtitle || "日常食养";
  const cuisine = recipe.cuisine || "地方";
  const season = (recipe.seasonTags || []).slice(0, 2).join("、");
  const seasonPart = season ? `，${season}时令更宜` : "";
  if (recipe.provinces?.some((p) => /日本|韩国|泰国|印度|意大利|法国|美国|墨西哥/.test(p))) {
    return `${recipe.name}融合${cuisine}饮食经验，以${topic}思路整理${seasonPart}；东方食养语境可参考${book}的因时调养原则。`;
  }
  return `${recipe.name}属${cuisine}常见${topic}整理，${book}载有同类因时、因体调养思路${seasonPart}。`;
}

function enrichSource(recipe) {
  const current = recipe.sources?.[0];
  if (!current || current.title !== PLACEHOLDER) return recipe.sources;
  const book = pickBook(recipe);
  return [{ title: book, summary: buildSummary(recipe, book) }];
}

let updated = 0;
RECIPE_JSON_SOURCES.forEach((file) => {
  const filePath = path.join(root, "data", "tcm", file);
  const rows = readRecipeJson(file, []);
  let fileChanged = false;
  const next = rows.map((recipe) => {
    const sources = enrichSource(recipe);
    if (JSON.stringify(sources) !== JSON.stringify(recipe.sources)) {
      fileChanged = true;
      updated += 1;
      return { ...recipe, sources };
    }
    return recipe;
  });
  if (fileChanged) {
    fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    console.log(`enrich-recipe-classic-sources: updated ${file}`);
  }
});

console.log(`enrich-recipe-classic-sources: ${updated} recipes enriched`);
