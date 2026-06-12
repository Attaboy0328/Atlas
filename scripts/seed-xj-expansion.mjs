#!/usr/bin/env node
/** Xinjiang first-class region: curated XJ ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const XJ_TUPLES = [
  ["xj-dapanji", "新疆大盘鸡", "肉蛋奶", "温", "大盘鸡", "新疆大盘鸡，土豆鸡肉温中补虚。"],
  ["xj-shouzhuafan", "新疆手抓饭", "主食", "温", "抓饭、羊肉抓饭", "新疆羊肉手抓饭，温阳补虚主食。"],
  ["xj-lagman-noodle", "新疆拌面", "主食", "平", "拉条子、过油肉拌面", "新疆拉条子拌面，筋道饱腹。"],
  ["xj-naan-bread", "新疆馕", "主食", "平", "烤馕、油馕", "新疆烤馕，日常主食。"],
  ["xj-samsa", "新疆烤包子", "主食", "温", "烤包子", "新疆烤包子，羊肉馅面食。"],
  ["xj-lamb-skewer", "新疆烤羊肉串", "肉蛋奶", "温", "羊肉串", "新疆烤羊肉串，温补适量。"],
  ["xj-yogurt-curd", "酸奶疙瘩", "发酵食品", "平", "干酪、奶疙瘩", "新疆酸奶疙瘩，助消化益生菌。"],
  ["xj-hotan-walnut", "和田核桃", "坚果种子", "温", "核桃", "和田核桃，补肾温肺。"],
  ["xj-turpan-grape", "吐鲁番葡萄", "水果", "平", "葡萄、无核白", "吐鲁番葡萄，补血益气生津。"],
  ["xj-hami-melon", "哈密瓜", "水果", "凉", "甜瓜", "哈密瓜，清热解暑生津。"],
  ["xj-korla-pear", "库尔勒香梨", "水果", "凉", "香梨", "库尔勒香梨，润肺清热。"],
  ["xj-ruoqiang-jujube", "若羌红枣", "水果", "温", "灰枣", "若羌红枣，补中益气养血。"],
  ["xj-cumin-seed", "新疆孜然", "调料", "温", "孜然", "新疆孜然，温中行气调味。"],
  ["xj-chili-flake", "新疆辣皮子", "调料", "热", "干辣椒、皮牙子辣", "新疆辣皮子，辛温开胃。"],
  ["xj-saffron-flower", "新疆红花", "滋补食材", "温", "红花", "新疆红花，活血调经，遵医嘱。"],
  ["xj-dried-apricot", "新疆杏干", "水果", "温", "杏脯", "新疆杏干，润肺生津。"],
  ["xj-raisin", "新疆葡萄干", "水果", "温", "葡萄干", "吐鲁番葡萄干，补血益气。"],
  ["xj-badam", "巴旦木", "坚果种子", "平", "扁桃仁", "新疆巴旦木，润肺通便适量。"],
  ["xj-pomegranate", "新疆石榴", "水果", "温", "石榴", "新疆石榴，生津涩肠适量。"],
  ["xj-dried-fig", "喀什无花果干", "水果", "平", "无花果干", "喀什无花果，健脾润肠。"],
  ["xj-air-dried-beef", "新疆风干牛肉", "肉蛋奶", "温", "牛肉干", "新疆风干牛肉，高蛋白适量。"],
  ["xj-yili-horse-meat", "伊犁马肉", "肉蛋奶", "温", "马肉", "伊犁马肉，温补气血适量。"],
  ["xj-sanzi", "馓子", "主食", "温", "油馓子", "新疆油炸馓子，节日点心适量。"],
  ["xj-oil-cake", "油香", "主食", "温", "油饼", "回族油香，节庆面点适量。"],
  ["xj-pepper-chicken", "新疆椒麻鸡", "肉蛋奶", "温", "椒麻鸡", "新疆椒麻鸡，辛香开胃。"],
  ["xj-milk-tea", "新疆奶茶", "饮品", "温", "砖茶奶茶", "新疆砖茶奶茶，温胃抗寒。"],
  ["xj-horse-sausage", "马肠子", "肉蛋奶", "温", "熏马肠", "哈萨克马肠子，温补适量。"],
  ["xj-lamb-hoof", "胡辣羊蹄", "肉蛋奶", "温", "羊蹄", "新疆胡辣羊蹄，胶原蛋白适量。"],
  ["xj-thin-skin-bun", "薄皮包子", "主食", "温", "烤包子", "南疆薄皮包子，羊肉馅。"],
  ["xj-noodle-soup", "新疆丸子汤", "主食", "温", "牛骨头汤", "新疆丸子汤，暖身汤面。"],
  ["xj-turnip-lamb", "恰玛古炖羊肉", "肉蛋奶", "温", "芜菁羊肉", "南疆恰玛古炖羊肉，温胃补虚。"],
  ["xj-noodle-lung", "新疆面肺子", "肉蛋奶", "温", "面肺", "新疆面肺子，民族风味适量。"],
  ["xj-stir-fried-meat", "新疆过油肉", "肉蛋奶", "温", "过油肉", "新疆过油肉，下饭荤菜。"],
  ["xj-flatbread-meat", "馕坑肉", "肉蛋奶", "温", "坑肉", "馕坑烤肉，温补适量。"],
  ["xj-tomato-noodle", "番茄拌面", "主食", "平", "西红柿拌面", "新疆番茄拌面，酸甜开胃。"],
  ["xj-pilaf-lamb", "南疆碎肉抓饭", "主食", "温", "碎肉抓饭", "南疆碎肉抓饭，温中补虚。"],
  ["xj-sour-milk", "新疆老酸奶", "发酵食品", "平", "酸奶", "新疆浓稠酸奶，健脾助消化。"],
  ["xj-wheat-flour", "新疆面粉", "谷物", "平", "高筋粉", "新疆优质小麦粉，面食主食。"],
  ["xj-onion", "皮芽子", "蔬菜", "温", "洋葱", "新疆皮芽子，辛温健胃调味。"],
  ["xj-carrot", "新疆胡萝卜", "蔬菜", "平", "黄萝卜", "新疆胡萝卜，健脾明目。"]
];

const foods = buildRegionalBatch(XJ_TUPLES, "新疆", path.join(cnDir, "foods-xj-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "大盘鸡", foodId: "xj-dapanji" },
  { term: "手抓饭", foodId: "xj-shouzhuafan" },
  { term: "拉条子", foodId: "xj-lagman-noodle" },
  { term: "馕", foodId: "xj-naan-bread" },
  { term: "烤包子", foodId: "xj-samsa" },
  { term: "羊肉串", foodId: "xj-lamb-skewer" },
  { term: "酸奶疙瘩", foodId: "xj-yogurt-curd" },
  { term: "和田核桃", foodId: "xj-hotan-walnut" },
  { term: "哈密瓜", foodId: "xj-hami-melon" },
  { term: "椒麻鸡", foodId: "xj-pepper-chicken" },
  { term: "新疆奶茶", foodId: "xj-milk-tea" },
  { term: "恰玛古", foodId: "xj-turnip-lamb" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch12-xj.json"), synonyms);
console.log(`foods-xj-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch12-xj.json: ${synonyms.length}`);
