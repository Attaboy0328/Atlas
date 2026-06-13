#!/usr/bin/env node
/** Phase 7A — Japan ingredient expansion (distinct from batch5 staples). */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildInternationalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const JP_TUPLES = [
  ["jp-sake", "日本清酒", "饮品", "温", "清酒、米酒", "日本清酒，温胃少量佐餐。"],
  ["jp-matcha", "抹茶粉", "茶饮", "凉", "抹茶、碾茶", "日本抹茶粉，清热提神适量。"],
  ["jp-sushi-rice", "寿司醋饭", "主食", "平", "醋饭、寿司米", "日本寿司醋饭，健脾充饥。"],
  ["jp-ramen", "日式拉面", "主食", "温", "拉面、豚骨面", "日本拉面，温胃主食适量。"],
  ["jp-teriyaki", "照烧酱", "调料", "温", "照烧汁、甜酱油", "日本照烧酱，调味增香。"],
  ["jp-tempura", "天妇罗", "主食", "温", "炸虾、炸蔬菜", "日本天妇罗，油炸适量控量。"],
  ["jp-wasabi", "山葵", "调料", "温", "芥末、青芥", "日本山葵，辛温开窍少量。"],
  ["jp-edamame", "枝豆", "豆类", "平", "毛豆、盐水豆", "日本枝豆，健脾高蛋白。"],
  ["jp-tamari", "浓口酱油", "调料", "温", "酱油、日式酱油", "日本浓口酱油，调味适量控盐。"],
  ["jp-umeboshi", "梅干", "腌菜", "温", "梅干、酸梅", "日本梅干，生津开胃少量。"],
  ["jp-shirataki", "白滝", "薯类", "平", "魔芋丝、白滝", "日本魔芋丝，低卡饱腹。"],
  ["jp-konnyaku", "蒟蒻", "薯类", "平", "魔芋、蒟蒻块", "日本蒟蒻，低卡高纤。"],
  ["jp-panko", "面包糠", "谷物", "平", "日式面包糠", "日本面包糠，炸物裹粉。"],
  ["jp-furikake", "拌饭香松", "调料", "平", "香松、拌饭料", "日本拌饭香松，增香开胃。"],
  ["jp-wagyu", "和牛", "肉蛋奶", "温", "和牛、雪花牛", "日本和牛，温补气血适量。"],
  ["jp-unagi", "蒲烧鳗鱼", "海产", "温", "鳗鱼、烤鳗", "日本蒲烧鳗鱼，滋阴补虚。"],
  ["jp-takoyaki", "章鱼烧", "主食", "温", "章鱼小丸子", "日本章鱼烧，温胃小食适量。"],
  ["jp-okonomiyaki", "大阪烧", "主食", "平", "御好烧、关西烧", "日本大阪烧，健脾充饥。"],
  ["jp-curry-roux", "日式咖喱块", "调料", "温", "咖喱块、咖喱酱", "日本咖喱块，温胃调味。"],
  ["jp-genmaicha", "玄米茶", "茶饮", "平", "糙米茶", "日本玄米茶，健脾消食。"],
  ["jp-tonkatsu", "炸猪排", "肉蛋奶", "温", "猪排、炸猪扒", "日本炸猪排，温中补虚适量。"],
  ["jp-yakitori", "烤鸡肉串", "肉蛋奶", "温", "烧鸟、烤鸡串", "日本烤鸡肉串，温中益气。"],
  ["jp-mochi", "麻糬", "主食", "平", "糯米团、年糕", "日本麻糬，糯米主食适量。"],
  ["jp-somen", "素面", "主食", "凉", "冷面、细面", "日本素面，清热解暑夏季。"],
  ["jp-abura-age", "油豆腐", "豆制品", "平", "炸豆腐、豆皮", "日本油豆腐，健脾吸汁。"],
  ["jp-pickled-ginger", "红姜丝", "腌菜", "温", "姜渍、寿司姜", "日本红姜丝，温胃解腻。"],
  ["jp-dashi-powder", "日式高汤粉", "调料", "平", "高汤粉、出汁粉", "日本高汤粉，鲜味基底。"],
  ["jp-onigiri", "饭团", "主食", "平", "御饭团、三角饭团", "日本饭团，便携主食。"],
  ["jp-miso-soup-base", "味噌汤料", "调料", "温", "味噌汤包", "日本味噌汤料，温胃暖胃。"],
  ["jp-sesame-dressing", "芝麻沙拉酱", "调料", "平", "和风酱、芝麻酱", "日本芝麻沙拉酱，润燥调味。"],
  ["jp-sashimi-salmon", "三文鱼刺身", "海产", "平", "刺身、生鱼片", "日本三文鱼刺身，滋阴适量。"],
  ["jp-chawanmushi", "茶碗蒸", "肉蛋奶", "平", "蒸蛋羹", "日本茶碗蒸，滋阴易消化。"],
  ["jp-oden", "关东煮", "海产", "温", "御田、煮物", "日本关东煮，温胃暖身冬季。"],
  ["jp-sukiyaki", "寿喜烧", "肉蛋奶", "温", "涮牛肉", "日本寿喜烧，温补气血适量。"],
  ["jp-tsukemono", "日式渍菜", "腌菜", "凉", "腌萝卜、渍物", "日本渍菜，开胃消食适量。"],
  ["jp-soba-fresh", "日式荞麦凉面", "主食", "凉", "冷荞麦面", "日本荞麦凉面，清热健脾夏季。"],
  ["jp-katsu-sauce", "炸猪排酱", "调料", "温", "猪排酱、中浓酱", "日本炸猪排酱，酸甜调味。"],
  ["jp-yuzu-kosho", "柚子胡椒", "调料", "温", "柚子胡椒酱", "日本柚子胡椒，辛温开胃。"]
];

const foods = buildInternationalBatch(JP_TUPLES, "JP", "日本", path.join(cnDir, "foods-jp-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "照烧", foodId: "jp-teriyaki" },
  { term: "天妇罗", foodId: "jp-tempura" },
  { term: "章鱼烧", foodId: "jp-takoyaki" },
  { term: "大阪烧", foodId: "jp-okonomiyaki" },
  { term: "寿喜烧", foodId: "jp-sukiyaki" },
  { term: "关东煮", foodId: "jp-oden" },
  { term: "抹茶", foodId: "jp-matcha" },
  { term: "和牛", foodId: "jp-wagyu" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13-jp.json"), synonyms);
console.log(`foods-jp-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch13-jp.json: ${synonyms.length}`);
