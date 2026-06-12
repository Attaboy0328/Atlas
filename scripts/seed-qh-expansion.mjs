#!/usr/bin/env node
/** Qinghai plateau region: curated QH ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const QH_TUPLES = [
  ["qh-yak-yogurt", "青海牦牛酸奶", "发酵食品", "平", "酸奶", "青海牦牛酸奶，健脾助消化。"],
  ["qh-zanba", "青海糌粑", "主食", "平", "糌粑", "青海糌粑，青稞粉主食。"],
  ["qh-lake-fish", "湟鱼", "海产", "平", "青海湖裸鲤", "青海湖湟鱼，高蛋白适量。"],
  ["qh-yak-beef", "青海牦牛肉", "肉蛋奶", "温", "牦牛肉", "青海牦牛肉，温补气血。"],
  ["qh-plateau-lamb", "青海羊肉", "肉蛋奶", "温", "羊肉", "青海高原羊肉，温中补虚。"],
  ["qh-sweet-ferment", "甜醅", "发酵食品", "温", "甜胚子", "青海甜醅，温胃活血少量。"],
  ["qh-gafanpian", "尕面片", "主食", "温", "面片", "青海尕面片，暖胃汤面。"],
  ["qh-oil-pancake", "狗浇尿", "主食", "温", "油饼", "青海薄油饼，节庆面点适量。"],
  ["qh-liangpi", "青海酿皮", "主食", "凉", "凉皮", "青海酿皮，酸辣凉皮。"],
  ["qh-potato-slice", "青海土豆片", "薯类", "平", "洋芋片", "青海炒土豆片，家常主食。"],
  ["qh-chaidamu-goji", "柴达木枸杞", "滋补食材", "平", "枸杞", "柴达木枸杞，滋阴明目。"],
  ["qh-barley-wine", "互助青稞酒", "饮品", "温", "青稞酒", "互助青稞酒，温胃少量。"],
  ["qh-ledu-garlic", "乐都紫皮大蒜", "蔬菜", "温", "大蒜", "乐都紫皮蒜，温中健胃。"],
  ["qh-menyuan-oil", "门源菜籽油", "调料", "平", "菜籽油", "门源菜籽油，烹饪用油。"],
  ["qh-qilian-mushroom", "祁连黄菇", "菌菇", "平", "黄菇", "祁连黄菇，益气健脾。"],
  ["qh-xunhua-chili", "循化辣椒", "调料", "热", "辣椒", "循化线辣椒，辛温开胃。"],
  ["qh-huangyuan-vinegar", "湟源陈醋", "调料", "温", "陈醋", "湟源陈醋，酸香开胃。"],
  ["qh-xining-liangpi", "西宁酿皮", "主食", "凉", "酿皮", "西宁酿皮，酸辣小吃。"],
  ["qh-brick-tea", "青海砖茶", "茶饮", "温", "茯茶", "青海砖茶，解腻消食。"],
  ["qh-cold-lamb", "冷吃羊肉", "肉蛋奶", "温", "手抓羊肉", "青海手抓羊肉，温补适量。"],
  ["qh-mutton-soup", "羊肉汤", "肉蛋奶", "温", "羊汤", "青海羊肉汤，暖身补虚。"],
  ["qh-highland-barley", "青海青稞", "谷物", "平", "青稞", "青海青稞，健脾粗粮。"],
  ["qh-yak-milk-tea", "青海奶茶", "饮品", "温", "咸奶茶", "青海咸奶茶，温胃抗寒。"],
  ["qh-dried-yak-meat", "青海风干肉", "肉蛋奶", "温", "牛肉干", "青海风干牦牛肉，高蛋白。"],
  ["qh-plateau-rapeseed", "高原油菜", "蔬菜", "平", "菜心", "青海高原油菜，清热润燥。"]
];

const foods = buildRegionalBatch(QH_TUPLES, "青海", path.join(cnDir, "foods-qh-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "尕面片", foodId: "qh-gafanpian" },
  { term: "甜醅", foodId: "qh-sweet-ferment" },
  { term: "湟鱼", foodId: "qh-lake-fish" },
  { term: "柴达木枸杞", foodId: "qh-chaidamu-goji" },
  { term: "互助青稞酒", foodId: "qh-barley-wine" },
  { term: "祁连黄菇", foodId: "qh-qilian-mushroom" },
  { term: "湟源陈醋", foodId: "qh-huangyuan-vinegar" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch12-qh.json"), synonyms);
console.log(`foods-qh-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch12-qh.json: ${synonyms.length}`);
