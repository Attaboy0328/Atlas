#!/usr/bin/env node
/** Hainan first-class region: curated Hainan ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const HI_TUPLES = [
  ["hi-wenchang-chicken", "文昌鸡", "肉蛋奶", "温", "", "海南文昌鸡，温中益气滋补。"],
  ["hi-jiaji-duck", "加积鸭", "肉蛋奶", "平", "", "海南加积鸭，滋阴补虚。"],
  ["hi-dongshan-goat", "东山羊", "肉蛋奶", "温", "", "海南东山羊，温阳补虚。"],
  ["hi-hele-crab", "和乐蟹", "海产", "寒", "", "海南和乐膏蟹，滋阴鲜味，寒凉适量。"],
  ["hi-coconut-hi", "椰子", "水果", "平", "", "海南椰子，生津润燥补虚。"],
  ["hi-coconut-rice", "椰子饭", "主食", "平", "", "海南椰香糯米饭，健脾益气。"],
  ["hi-qingbuliang", "清补凉", "饮品", "凉", "", "海南清补凉糖水，清热解暑。"],
  ["hi-yellow-chili", "黄灯笼椒", "蔬菜", "热", "海南灯笼椒", "海南黄灯笼辣椒，辛温开胃。"],
  ["hi-zaochu-vinegar", "糟粕醋", "调料", "温", "", "海南糟粕醋，发酵酸辣开胃。"],
  ["hi-wild-pineapple", "凤梨", "水果", "凉", "", "海南热带凤梨，生津消食。"],
  ["hi-mango-hi", "芒果", "水果", "凉", "", "海南芒果，生津润燥适量。"],
  ["hi-lychee-hi", "荔枝", "水果", "温", "", "海南荔枝，温中益气，多食上火。"],
  ["hi-longan-hi", "龙眼", "水果", "温", "", "海南龙眼，补血安神适量。"],
  ["hi-papaya-hi", "木瓜", "水果", "平", "", "海南木瓜，健脾润肺。"],
  ["hi-sea-snail", "花螺", "海产", "平", "", "海南花螺，滋阴鲜味海产。"],
  ["hi-grouper", "石斑鱼", "海产", "平", "", "海南石斑鱼，益气养血。"],
  ["hi-squid-hi", "鱿鱼", "海产", "平", "", "海南鲜鱿鱼，滋阴补虚。"],
  ["hi-sea-eel", "黄鳝", "海产", "温", "", "海南黄鳝，温中补血。"],
  ["hi-seaweed-hi", "紫菜", "海产", "寒", "", "海南紫菜，清热化痰。"],
  ["hi-taro-hi", "芋头", "薯类", "平", "", "海南芋头，健脾益气。"],
  ["hi-sweet-potato-hi", "番薯", "薯类", "平", "", "海南番薯，补中益气。"],
  ["hi-wild-rice", "山兰酒", "饮品", "温", "山兰糯酒", "海南黎族山兰酒，温中活血少量。"],
  ["hi-bamboo-shoot", "竹笋", "蔬菜", "凉", "", "海南鲜笋，清热化痰。"],
  ["hi-bitter-melon-hi", "苦瓜", "蔬菜", "寒", "凉瓜", "海南苦瓜，清热解暑。"],
  ["hi-water-spinach-hi", "空心菜", "蔬菜", "寒", "通菜", "海南空心菜，清热通肠。"],
  ["hi-herbal-tea-hi", "凉茶", "茶饮", "寒", "", "海南凉茶，清热祛湿。"],
  ["hi-coconut-chicken-soup", "椰子鸡汤料", "滋补食材", "平", "", "海南椰子鸡底料，补虚生津。"],
  ["hi-sour-bamboo-hi", "酸笋", "腌菜", "温", "", "海南酸笋，开胃消食。"],
  ["hi-preserved-mango", "芒果干", "水果", "温", "", "海南芒果干，生津适量。"],
  ["hi-sea-coconut-drink", "椰青", "水果", "平", "嫩椰子", "海南椰青，清热生津。"]
];

const foods = buildRegionalBatch(HI_TUPLES, "海南", path.join(cnDir, "foods-hainan-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "文昌鸡", foodId: "hi-wenchang-chicken" },
  { term: "加积鸭", foodId: "hi-jiaji-duck" },
  { term: "东山羊", foodId: "hi-dongshan-goat" },
  { term: "和乐蟹", foodId: "hi-hele-crab" },
  { term: "清补凉", foodId: "hi-qingbuliang" },
  { term: "糟粕醋", foodId: "hi-zaochu-vinegar" },
  { term: "黄灯笼椒", foodId: "hi-yellow-chili" },
  { term: "椰子饭", foodId: "hi-coconut-rice" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch9-hainan.json"), synonyms);
console.log(`foods-hainan-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch9-hainan.json: ${synonyms.length}`);
