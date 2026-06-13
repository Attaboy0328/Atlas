#!/usr/bin/env node
/** Phase 7A — Korea ingredient expansion. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildInternationalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const KR_TUPLES = [
  ["kr-ssamjang", "韩式包饭酱", "调料", "温", "包饭酱、蘸酱", "韩国包饭酱，辛温开胃。"],
  ["kr-gochugaru", "韩式辣椒粉", "调料", "热", "粗辣椒粉、辣椒面", "韩国辣椒粉，辛热开胃适量。"],
  ["kr-perilla-leaf", "苏子叶", "蔬菜", "温", "紫苏叶、包饭叶", "韩国苏子叶，理气开胃。"],
  ["kr-bulgogi", "韩式烤牛肉", "肉蛋奶", "温", "烤肉、烤牛肉", "韩国烤牛肉，温补气血适量。"],
  ["kr-bibimbap", "石锅拌饭", "主食", "平", "拌饭、石锅饭", "韩国石锅拌饭，健脾充饥。"],
  ["kr-japchae", "杂菜", "主食", "平", "粉丝杂菜、炒粉丝", "韩国杂菜，健脾润燥。"],
  ["kr-kimchi-jjigae", "泡菜锅", "腌菜", "温", "泡菜汤、泡菜锅", "韩国泡菜锅，温胃开胃适量。"],
  ["kr-sundubu", "嫩豆腐锅", "豆制品", "温", "豆腐锅、辣豆腐汤", "韩国嫩豆腐锅，温胃补虚。"],
  ["kr-samgyeopsal", "五花肉烤肉", "肉蛋奶", "温", "烤五花肉", "韩国烤五花肉，温中补虚适量。"],
  ["kr-gimbap", "紫菜包饭", "主食", "平", "饭卷、韩式寿司", "韩国紫菜包饭，便携主食。"],
  ["kr-tteokbokki", "辣炒年糕", "主食", "温", "炒年糕、辣年糕", "韩国辣炒年糕，温胃小食辛辣控量。"],
  ["kr-galbi", "韩式烤排骨", "肉蛋奶", "温", "烤排骨、牛小排", "韩国烤排骨，温补气血适量。"],
  ["kr-jjajangmyeon", "炸酱面", "主食", "平", "韩式炸酱面", "韩国炸酱面，健脾充饥。"],
  ["kr-naengmyeon", "冷面", "主食", "凉", "荞麦冷面、冰面", "韩国冷面，清热解暑夏季。"],
  ["kr-hotteok", "糖饼", "主食", "温", "甜煎饼、韩式糖饼", "韩国糖饼，温胃甜点适量。"],
  ["kr-makgeolli", "马格利酒", "饮品", "温", "米酒、浊酒", "韩国马格利酒，温胃少量。"],
  ["kr-soju", "烧酒", "饮品", "热", "韩国烧酒", "韩国烧酒，辛热少量，孕妇禁用。"],
  ["kr-doenjang-jjigae", "大酱汤", "豆制品", "温", "味噌汤、大酱锅", "韩国大酱汤，温胃健脾。"],
  ["kr-kongnamul", "豆芽拌菜", "蔬菜", "平", "凉拌豆芽", "韩国豆芽拌菜，清热健脾。"],
  ["kr-pajeon", "葱煎饼", "主食", "温", "海鲜葱饼、煎饼", "韩国葱煎饼，温胃小食适量。"],
  ["kr-haemul-pajeon", "海鲜葱饼", "海产", "温", "海鲜煎饼", "韩国海鲜葱饼，益气鲜味适量。"],
  ["kr-yukgaejang", "辣牛肉汤", "肉蛋奶", "热", "牛肉辣汤", "韩国辣牛肉汤，温阳散寒冬季。"],
  ["kr-seolleongtang", "雪浓汤", "肉蛋奶", "温", "牛骨汤、雪浓汤", "韩国牛骨汤，温胃补虚。"],
  ["kr-bossam", "包肉", "肉蛋奶", "温", "白切肉、包生菜", "韩国包肉，温补适量。"],
  ["kr-kimchi-pancake", "泡菜煎饼", "腌菜", "温", "泡菜饼", "韩国泡菜煎饼，开胃小食适量。"],
  ["kr-rice-cake", "韩式年糕", "主食", "平", "年糕、打糕", "韩国年糕，糯米主食适量。"],
  ["kr-perilla-oil", "苏子油", "调料", "温", "紫苏油", "韩国苏子油，润燥调味。"],
  ["kr-red-pepper-paste-soup", "辣酱汤", "调料", "热", "辣酱汤底", "韩国辣酱汤底，辛热开胃。"],
  ["kr-dakgalbi", "辣炒鸡排", "肉蛋奶", "热", "炒鸡排、辣鸡", "韩国辣炒鸡排，温阳开胃辛辣控量。"],
  ["kr-sikhye", "甜米露", "饮品", "平", "米露、甜饮", "韩国甜米露，健脾甜点控糖。"],
  ["kr-banchan-spinach", "凉拌菠菜", "蔬菜", "平", "菠菜小菜", "韩国凉拌菠菜，滋阴润燥。"],
  ["kr-instant-ramyeon", "韩式方便面", "主食", "温", "辛拉面、方便面", "韩国方便面，温胃速食适量控盐。"]
];

const foods = buildInternationalBatch(KR_TUPLES, "KR", "韩国", path.join(cnDir, "foods-kr-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "石锅拌饭", foodId: "kr-bibimbap" },
  { term: "泡菜锅", foodId: "kr-kimchi-jjigae" },
  { term: "紫菜包饭", foodId: "kr-gimbap" },
  { term: "辣炒年糕", foodId: "kr-tteokbokki" },
  { term: "韩式烤肉", foodId: "kr-bulgogi" },
  { term: "大酱汤", foodId: "kr-doenjang-jjigae" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13-kr.json"), synonyms);
console.log(`foods-kr-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch13-kr.json: ${synonyms.length}`);
