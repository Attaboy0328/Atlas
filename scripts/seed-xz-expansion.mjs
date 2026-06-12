#!/usr/bin/env node
/** Tibet first-class region: curated XZ ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const XZ_TUPLES = [
  ["xz-butter-tea", "酥油茶", "饮品", "温", "奶茶、咸茶", "藏式酥油茶，高海拔温胃御寒。"],
  ["xz-tsampa", "糌粑", "主食", "平", "青稞糌粑", "藏族青稞糌粑，高原主食。"],
  ["xz-yak-beef", "牦牛肉", "肉蛋奶", "温", "牛肉", "高原牦牛肉，温补气血。"],
  ["xz-yak-butter", "酥油", "肉蛋奶", "温", "黄油", "藏区酥油，温胃润肠高能量。"],
  ["xz-highland-barley", "藏青稞", "谷物", "平", "青稞", "西藏青稞，健脾益气粗粮。"],
  ["xz-matsutake", "藏松茸", "菌菇", "平", "松茸", "藏区松茸，益气健脾，须煮熟。"],
  ["xz-yak-milk-curd", "奶渣", "发酵食品", "平", "曲拉", "牦牛奶渣，高蛋白易消化。"],
  ["xz-air-dried-meat", "风干牦牛肉", "肉蛋奶", "温", "牛肉干", "藏区风干牦牛肉，温补适量。"],
  ["xz-tibetan-mutton", "藏羊肉", "肉蛋奶", "温", "羊肉", "高原藏羊肉，温中补虚。"],
  ["xz-highland-potato", "高原土豆", "薯类", "平", "土豆", "西藏高原土豆，健脾益气。"],
  ["xz-highland-radish", "高原萝卜", "蔬菜", "凉", "白萝卜", "藏区萝卜，清热化痰。"],
  ["xz-highland-cabbage", "圆白菜", "蔬菜", "平", "卷心菜", "高原圆白菜，健脾养胃。"],
  ["xz-wild-mushroom", "藏蘑菇", "菌菇", "平", "野蘑菇", "藏区野生菌，益气健脾须煮熟。"],
  ["xz-ginseng-fruit", "人参果", "水果", "平", "香瓜茄", "西藏人参果，生津润燥。"],
  ["xz-highland-buckwheat", "高原荞麦", "谷物", "凉", "荞麦", "藏区荞麦，健脾降脂。"],
  ["xz-tibetan-noodle", "藏面", "主食", "平", "牛肉面", "拉萨藏面，日常主食。"],
  ["xz-sweet-tea", "甜茶", "饮品", "温", "藏式甜茶", "拉萨甜茶，温胃提神。"],
  ["xz-barley-wine", "青稞酒", "饮品", "温", "咂酒", "藏区青稞酒，温胃少量。"],
  ["xz-yak-yogurt", "牦牛酸奶", "发酵食品", "平", "酸奶", "高原牦牛酸奶，健脾助消化。"],
  ["xz-blood-sausage", "血肠", "肉蛋奶", "温", "羊血肠", "藏式血肠，温补适量。"],
  ["xz-meat-sausage", "灌肠", "肉蛋奶", "温", "肉肠", "藏式灌肠，节日食品适量。"],
  ["xz-dried-meat-stew", "腊牛羊肉", "肉蛋奶", "温", "风干肉", "藏区腊牛羊肉，高蛋白适量。"],
  ["xz-tibetan-pork", "藏香猪", "肉蛋奶", "平", "香猪", "林芝藏香猪，滋阴补虚适量。"],
  ["xz-highland-pea", "藏豌豆", "豆类", "平", "豌豆", "高原豌豆，健脾益气。"],
  ["xz-herbal-tea", "藏药茶", "茶饮", "温", "药王茶", "藏区药茶，温胃行气少量。"],
  ["xz-cheese", "藏奶酪", "发酵食品", "平", "干酪", "牦牛奶酪，补钙易消化。"],
  ["xz-roasted-barley", "炒青稞", "谷物", "平", "炒麦", "藏族炒青稞，零食主食。"],
  ["xz-yak-milk", "牦牛奶", "肉蛋奶", "平", "牛奶", "高原牦牛奶，滋阴补虚。"],
  ["xz-wild-berry", "高原浆果", "水果", "平", "沙棘果", "藏区浆果，生津润燥。"],
  ["xz-barley-cake", "青稞饼", "主食", "平", "糌粑饼", "藏区青稞饼，便携主食。"],
  ["xz-butter-bun", "酥油馍", "主食", "温", "油馍", "酥油面馍，高能量主食。"],
  ["xz-lamb-ribs", "藏羊排", "肉蛋奶", "温", "羊排", "藏区烤羊排，温补气血。"],
  ["xz-turnip-stew", "萝卜炖牦牛肉", "肉蛋奶", "温", "萝卜牛肉", "藏式萝卜炖肉，温胃补虚。"],
  ["xz-mushroom-soup", "松茸汤料", "菌菇", "平", "菌汤", "藏区菌汤料，益气健脾。"],
  ["xz-highland-turnip", "蔓菁", "蔬菜", "平", "芜菁", "高原蔓菁，健脾消食。"]
];

const foods = buildRegionalBatch(XZ_TUPLES, "西藏", path.join(cnDir, "foods-xz-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "酥油茶", foodId: "xz-butter-tea" },
  { term: "糌粑", foodId: "xz-tsampa" },
  { term: "牦牛肉", foodId: "xz-yak-beef" },
  { term: "酥油", foodId: "xz-yak-butter" },
  { term: "藏松茸", foodId: "xz-matsutake" },
  { term: "甜茶", foodId: "xz-sweet-tea" },
  { term: "藏香猪", foodId: "xz-tibetan-pork" },
  { term: "青稞酒", foodId: "xz-barley-wine" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch12-xz.json"), synonyms);
console.log(`foods-xz-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch12-xz.json: ${synonyms.length}`);
