#!/usr/bin/env node
/** Guangxi first-class region: curated GX ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const GX_TUPLES = [
  ["gx-luosifen", "柳州螺蛳粉", "主食", "温", "螺蛳粉", "柳州酸辣螺蛳粉，开胃祛湿适量。"],
  ["gx-guilin-rice-noodle", "桂林米粉", "主食", "平", "卤菜粉", "桂林卤菜粉，日常健脾主食。"],
  ["gx-old-friend-noodle", "老友粉", "主食", "温", "", "南宁老友粉，酸辣开胃祛湿。"],
  ["gx-sour-bamboo", "酸笋", "腌菜", "温", "酸竹笋", "广西发酵酸笋，开胃消食，胃弱者适量。"],
  ["gx-lemon-duck", "柠檬鸭", "肉蛋奶", "温", "", "南宁柠檬鸭，酸香开胃理气。"],
  ["gx-oil-tea", "油茶", "饮品", "温", "瑶族油茶", "广西瑶族油茶，温胃散寒。"],
  ["gx-five-color-rice", "五色糯米饭", "主食", "平", "", "壮族三月三糯米饭，健脾益气。"],
  ["gx-snail-soup", "螺蛳汤", "饮品", "温", "", "柳州螺蛳汤底，酸辣开胃。"],
  ["gx-river-snail", "田螺", "海产", "寒", "", "广西河螺，清热利湿，需彻底煮熟。"],
  ["gx-pomelo-gx", "沙田柚", "水果", "凉", "容县沙田柚", "广西沙田柚，清热化痰生津。"],
  ["gx-sugarcane-gx", "甘蔗", "水果", "凉", "竹蔗", "广西甘蔗，清热生津润燥。"],
  ["gx-passion-fruit", "百香果", "水果", "平", "", "广西热带百香果，开胃生津。"],
  ["gx-mango-gx", "百色芒果", "水果", "凉", "", "广西百色芒果，生津润燥适量。"],
  ["gx-lijiang-pork", "巴马香猪", "肉蛋奶", "平", "", "广西巴马香猪，滋阴补虚适量。"],
  ["gx-duck-blood", "鸭血", "肉蛋奶", "凉", "", "广西粉店鸭血，凉血解毒适量。"],
  ["gx-rice-wine-gx", "糯米酒", "饮品", "温", "甜酒", "广西农家糯米酒，温中活血少量。"],
  ["gx-fermented-bean-curd", "腐乳", "调料", "温", "", "广西红腐乳，开胃佐食。"],
  ["gx-chili-paste-gx", "桂林辣椒酱", "调料", "热", "", "桂林香辣酱，辛温开胃。"],
  ["gx-pickled-pepper", "酸椒", "腌菜", "温", "", "广西酸辣椒，开胃下饭。"],
  ["gx-bamboo-rat", "竹鼠", "肉蛋奶", "温", "", "广西特色野味，温补适量。"],
  ["gx-taro-pork", "芋头扣肉", "肉蛋奶", "温", "", "广西年节芋头扣肉，温中补虚。"],
  ["gx-sticky-rice-dumpling", "粽子", "主食", "温", "壮乡粽子", "广西壮乡糯米粽，健脾益气。"],
  ["gx-herbal-tea-gx", "凉茶", "茶饮", "寒", "", "广西凉茶，清热祛湿体虚慎用。"],
  ["gx-cogon-root-gx", "茅根", "食药物质", "凉", "白茅根", "广西茅根竹蔗饮，清热生津。"],
  ["gx-monk-fruit-gx", "罗汉果", "食药物质", "凉", "", "广西永福罗汉果，润肺利咽。"],
  ["gx-star-anise-gx", "八角", "调料", "温", "大料", "广西八角香料，温中散寒调味。"],
  ["gx-cassia-gx", "肉桂", "调料", "热", "", "广西肉桂，温阳散寒调味。"],
  ["gx-taro-gx", "芋头", "薯类", "平", "", "广西荔浦芋头，健脾益气。"],
  ["gx-water-spinach-gx", "空心菜", "蔬菜", "寒", "通菜", "广西夏季空心菜，清热通肠。"],
  ["gx-bitter-melon-gx", "苦瓜", "蔬菜", "寒", "凉瓜", "广西苦瓜，清热解暑降火。"],
  ["gx-preserved-lemon", "咸柠檬", "腌菜", "温", "", "广西酸腌柠檬，生津开胃。"],
  ["gx-rice-noodle-roll", "卷筒粉", "主食", "平", "", "广西卷筒粉，清淡易消化。"],
  ["gx-fried-dough-gx", "油条", "主食", "温", "", "广西早餐油条，偶尔食用。"],
  ["gx-fermented-rice", "甜酒酿", "发酵食品", "温", "酒酿", "广西甜酒酿，温中活血少量。"],
  ["gx-duck-feet", "鸭脚", "肉蛋奶", "平", "螺蛳鸭脚", "柳州螺蛳粉鸭脚，胶原蛋白适量。"],
  ["gx-wood-ear-gx", "木耳", "菌菇", "平", "", "广西黑木耳，滋阴润燥。"],
  ["gx-daylily-gx", "黄花菜", "蔬菜", "平", "金针菜", "广西干黄花菜，安神利湿。"],
  ["gx-lotus-root-gx", "莲藕", "蔬菜", "平", "", "广西莲藕，健脾开胃。"],
  ["gx-taro-stem", "芋苗", "蔬菜", "平", "", "广西芋苗酸炒，开胃消食。"],
  ["gx-pickled-long-bean", "酸豆角", "腌菜", "温", "", "广西酸豆角，开胃下饭。"]
];

const foods = buildRegionalBatch(GX_TUPLES, "广西", path.join(cnDir, "foods-gx-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "螺蛳粉", foodId: "gx-luosifen" },
  { term: "桂林米粉", foodId: "gx-guilin-rice-noodle" },
  { term: "老友粉", foodId: "gx-old-friend-noodle" },
  { term: "酸笋", foodId: "gx-sour-bamboo" },
  { term: "柠檬鸭", foodId: "gx-lemon-duck" },
  { term: "五色糯米饭", foodId: "gx-five-color-rice" },
  { term: "巴马香猪", foodId: "gx-lijiang-pork" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch9-gx.json"), synonyms);
console.log(`foods-gx-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch9-gx.json: ${synonyms.length}`);
