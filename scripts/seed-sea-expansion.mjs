#!/usr/bin/env node
/** Phase 7A — Southeast Asia: TH/VN/MY/SG/ID/PH ingredient expansion. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildInternationalMultiBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const SEA_TUPLES = [
  ["th-pad-thai", "泰式炒河粉", "主食", "平", "TH", "泰国", "Pad Thai、炒粉", "泰国炒河粉，健脾充饥。"],
  ["th-tom-yum", "冬阴功汤", "海产", "热", "TH", "泰国", "酸辣虾汤、冬荫功", "泰国冬阴功，辛热开胃祛湿。"],
  ["th-green-curry", "泰式绿咖喱", "调料", "热", "TH", "泰国", "绿咖喱酱", "泰国绿咖喱，辛热调味辛辣控量。"],
  ["th-red-curry", "泰式红咖喱", "调料", "热", "TH", "泰国", "红咖喱酱", "泰国红咖喱，辛热调味。"],
  ["th-massaman", "马沙曼咖喱", "调料", "温", "TH", "泰国", "马萨曼咖喱", "泰国马沙曼咖喱，温香调味。"],
  ["th-som-tam", "青木瓜沙拉", "蔬菜", "凉", "TH", "泰国", "木瓜沙律、舂木瓜", "泰国青木瓜沙拉，清热开胃。"],
  ["th-sticky-rice", "泰式糯米饭", "谷物", "平", "TH", "泰国", "糯米饭、芒果糯米饭", "泰国糯米饭，健脾主食。"],
  ["th-fish-sauce", "鱼露", "调料", "温", "TH", "泰国", "Nam Pla、鱼酱油", "泰国鱼露，鲜味调味控盐。"],
  ["th-palm-sugar", "棕榈糖", "调料", "平", "TH", "泰国", "椰糖、棕榈糖", "泰国棕榈糖，甘平调味控糖。"],
  ["th-lemongrass", "香茅", "调料", "温", "TH", "泰国", "柠檬草", "泰国香茅，理气祛湿调味。"],
  ["th-galangal", "南姜", "调料", "温", "TH", "泰国", "高良姜、泰国姜", "泰国南姜，温中散寒调味。"],
  ["th-kaffir-lime", "青柠叶", "调料", "温", "TH", "泰国", "泰国柠檬叶", "泰国青柠叶，理气开胃。"],
  ["th-mango-sticky", "芒果糯米饭", "水果", "平", "TH", "泰国", "芒果饭", "泰国芒果糯米饭，健脾甜点控糖。"],
  ["th-papaya-salad", "泰式凉拌木瓜", "蔬菜", "凉", "TH", "泰国", "凉拌木瓜", "泰国凉拌木瓜，清热消食。"],
  ["th-basil-chicken", "罗勒炒鸡", "肉蛋奶", "温", "TH", "泰国", "打抛鸡、九层塔炒鸡", "泰国罗勒炒鸡，温中开胃。"],

  ["vn-pho", "越南河粉", "主食", "温", "VN", "越南", "牛肉粉、Pho", "越南河粉，温胃主食。"],
  ["vn-banh-mi", "越南法棍", "主食", "平", "VN", "越南", "法棍三明治", "越南法棍，健脾便携主食。"],
  ["vn-spring-roll", "越南春卷", "蔬菜", "凉", "VN", "越南", "米纸卷、生春卷", "越南春卷，清热轻食。"],
  ["vn-bun-cha", "烤肉米粉", "主食", "温", "VN", "越南", "烤肉米线", "越南烤肉米粉，温胃主食。"],
  ["vn-nuoc-mam", "越南鱼露", "调料", "温", "VN", "越南", "鱼酱油", "越南鱼露，鲜味调味控盐。"],
  ["vn-coffee", "越南滴漏咖啡", "饮品", "温", "VN", "越南", "滴漏咖啡", "越南咖啡，提神适量失眠少饮。"],
  ["vn-banh-xeo", "越南煎饼", "主食", "温", "VN", "越南", "椰浆煎饼", "越南煎饼，温胃小食适量。"],
  ["vn-goi-cuon", "鲜虾米纸卷", "海产", "凉", "VN", "越南", "虾卷", "越南鲜虾米纸卷，清热高蛋白。"],

  ["my-nasi-lemak", "椰浆饭", "主食", "平", "MY", "马来西亚", "椰饭、Nasi Lemak", "马来椰浆饭，健脾主食。"],
  ["my-rendang", "仁当牛肉", "肉蛋奶", "温", "MY", "马来西亚", "干咖喱牛肉", "马来仁当牛肉，温补气血适量。"],
  ["my-satay", "沙爹", "肉蛋奶", "温", "MY", "马来西亚", "烤肉串、沙爹串", "马来沙爹，温中益气适量。"],
  ["my-laksa", "叻沙", "主食", "热", "MY", "马来西亚", "咖喱面、Laksa", "马来叻沙，辛热开胃辛辣控量。"],
  ["my-sambal", "叁巴酱", "调料", "热", "MY", "马来西亚", "辣椒酱、Sambal", "马来叁巴酱，辛热调味。"],
  ["my-teh-tarik", "拉茶", "饮品", "温", "MY", "马来西亚", "奶茶、Teh Tarik", "马来拉茶，温胃饮品控糖。"],

  ["sg-chili-crab", "辣椒螃蟹", "海产", "热", "SG", "新加坡", "黑胡椒蟹、辣椒蟹", "新加坡辣椒蟹，辛热开胃适量。"],
  ["sg-hainanese-chicken", "海南鸡饭", "肉蛋奶", "平", "SG", "新加坡", "鸡饭", "新加坡海南鸡饭，健脾益气。"],
  ["sg-laksa-singapore", "新加坡叻沙", "主食", "热", "SG", "新加坡", "咖喱米粉", "新加坡叻沙，辛热开胃。"],
  ["sg-kaya-toast", "咖椰吐司", "主食", "平", "SG", "新加坡", "咖椰面包", "新加坡咖椰吐司，早餐主食控糖。"],
  ["sg-fish-head-curry", "鱼头咖喱", "海产", "热", "SG", "新加坡", "咖喱鱼头", "新加坡鱼头咖喱，辛热开胃。"],

  ["id-nasi-goreng", "印尼炒饭", "主食", "平", "ID", "印度尼西亚", "炒饭", "印尼炒饭，健脾充饥。"],
  ["id-sate", "印尼沙爹", "肉蛋奶", "温", "ID", "印度尼西亚", "烤肉串", "印尼沙爹，温中益气。"],
  ["id-gado-gado", "加多加多", "蔬菜", "平", "ID", "印度尼西亚", "花生酱沙拉", "印尼加多加多，健脾素食。"],
  ["id-rendang-id", "印尼仁当", "肉蛋奶", "温", "ID", "印度尼西亚", "干咖喱", "印尼仁当，温补适量。"],
  ["id-tempeh-goreng", "炸天贝", "豆制品", "平", "ID", "印度尼西亚", "炸发酵豆饼", "印尼炸天贝，健脾高蛋白。"],

  ["ph-adobo", "菲律宾阿斗波", "肉蛋奶", "温", "PH", "菲律宾", "醋焖鸡、Adobo", "菲律宾阿斗波，温中开胃。"],
  ["ph-sinigang", "酸汤", "海产", "凉", "PH", "菲律宾", "酸汤鱼、Sinigang", "菲律宾酸汤，清热开胃。"],
  ["ph-lechon", "烤乳猪", "肉蛋奶", "温", "PH", "菲律宾", "烤猪", "菲律宾烤乳猪，温补适量高脂控量。"],
  ["ph-halo-halo", "哈罗哈罗", "水果", "凉", "PH", "菲律宾", "刨冰甜品", "菲律宾哈罗哈罗，清热甜点控糖。"],
  ["ph-lumpia", "菲律宾春卷", "主食", "温", "PH", "菲律宾", "炸春卷", "菲律宾春卷，温胃小食适量。"]
];

const foods = buildInternationalMultiBatch(SEA_TUPLES, path.join(cnDir, "foods-sea-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "冬阴功", foodId: "th-tom-yum" },
  { term: "越南河粉", foodId: "vn-pho" },
  { term: "海南鸡饭", foodId: "sg-hainanese-chicken" },
  { term: "叻沙", foodId: "my-laksa" },
  { term: "沙爹", foodId: "my-satay" },
  { term: "芒果糯米饭", foodId: "th-mango-sticky" },
  { term: "印尼炒饭", foodId: "id-nasi-goreng" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13-sea.json"), synonyms);
console.log(`foods-sea-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch13-sea.json: ${synonyms.length}`);
