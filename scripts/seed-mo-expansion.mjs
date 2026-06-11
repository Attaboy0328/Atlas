#!/usr/bin/env node
/** Macau first-class region: curated MO ingredients + synonyms. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildRegionalBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

/** [id, name, category, nature, aliases, summary] */
const MO_TUPLES = [
  ["mo-almond-cookie", "澳门杏仁饼", "主食", "平", "杏仁饼", "澳门手信酥饼，健脾开胃，含糖适量。"],
  ["mo-egg-tart", "葡挞", "主食", "平", "葡式蛋挞", "澳门葡式蛋挞，奶香酥皮，控糖适量。"],
  ["mo-pork-chop-bun", "猪扒包", "主食", "温", "", "澳门街头猪扒包，温胃饱腹早餐。"],
  ["mo-african-chicken", "非洲鸡", "肉蛋奶", "温", "", "澳门葡非融合烤鸡，辛香开胃。"],
  ["mo-bacalhau", "马介休", "海产", "平", "鳕鱼干", "澳门葡式咸鳕鱼，煲汤焗菜常用。"],
  ["mo-crab-congee", "水蟹粥", "主食", "平", "", "澳门粤式生滚蟹粥，滋阴鲜味。"],
  ["mo-almond-drink", "杏仁露", "饮品", "平", "", "澳门糖水杏仁露，润肺止咳。"],
  ["mo-serradura", "木糠杯", "主食", "平", "", "澳门葡式木糠布丁杯，甜腻适量。"],
  ["mo-portuguese-chicken", "葡国鸡", "肉蛋奶", "温", "", "澳门咖喱椰浆鸡，温中开胃。"],
  ["mo-minchi", "免治", "肉蛋奶", "温", "澳门免治", "澳门碎肉炒蛋，家常下饭菜。"],
  ["mo-papaya-salad", "青木瓜沙律", "蔬菜", "凉", "", "澳门泰式青木瓜凉拌，开胃消食。"],
  ["mo-curry-crab", "咖喱蟹", "海产", "温", "", "澳门海鲜咖喱蟹，温中补虚适量。"],
  ["mo-clam-sauce", "蚬汁", "调料", "平", "", "澳门蒸鱼提鲜蚬汁，咸鲜调味。"],
  ["mo-dried-scallop-mo", "瑶柱", "海产", "平", "干贝", "澳门汤粥鲜味干货，滋阴调味。"],
  ["mo-dried-oyster-mo", "蚝豉", "海产", "平", "蚝干", "澳门煲汤海产干货，滋阴养血。"],
  ["mo-candied-fruit", "蜜饯", "水果", "温", "", "澳门传统蜜饯，生津开胃适量。"],
  ["mo-lotus-paste", "莲蓉", "滋补食材", "平", "", "澳门月饼馅料莲蓉，甘润健脾。"],
  ["mo-sesame-paste-mo", "芝麻糊", "饮品", "温", "", "澳门糖水芝麻糊，补血润肠。"],
  ["mo-ginger-milk", "姜汁撞奶", "饮品", "温", "", "澳门甜品姜汁撞奶，温胃散寒。"],
  ["mo-tofu-pudding", "豆腐花", "饮品", "凉", "姜汁豆花", "澳门甜或咸豆腐花，清热润燥。"],
  ["mo-rice-pudding", "椰汁糕", "主食", "凉", "", "澳门椰汁西米糕，清热解暑。"],
  ["mo-pork-jerky", "猪肉干", "肉蛋奶", "温", "", "澳门手信肉干，高蛋白适量。"],
  ["mo-beef-jerky", "牛肉干", "肉蛋奶", "温", "", "澳门炭烤牛肉干，温补适量。"],
  ["mo-shrimp-roe-mo", "虾籽", "海产", "温", "", "澳门捞面蒸蛋鲜味调料。"],
  ["mo-xo-sauce", "XO酱", "调料", "温", "", "澳门港式海鲜辣味酱，拌面佐餐。"],
  ["mo-oyster-sauce-mo", "蚝油", "调料", "平", "", "澳门炒菜蚝油，提鲜控钠。"],
  ["mo-chu-hou", "柱侯酱", "调料", "温", "", "澳门焖炖柱侯酱，温中调味。"],
  ["mo-dried-tangerine", "老药桔", "食药物质", "温", "", "澳门冲饮老药桔，理气化痰。"],
  ["mo-herbal-tea", "凉茶", "茶饮", "寒", "", "澳门凉茶铺复方，清热祛湿体虚慎用。"],
  ["mo-silkie-chicken", "乌鸡", "肉蛋奶", "平", "", "澳门炖汤乌鸡，滋阴补血。"],
  ["mo-fish-maw", "花胶", "海产", "平", "", "澳门炖品花胶，滋阴养颜。"],
  ["mo-sea-coconut", "海底椰", "水果", "平", "", "澳门润燥汤料海底椰，润肺止咳。"],
  ["mo-chenpi-mo", "广陈皮", "食药物质", "温", "新会陈皮", "澳门汤饮陈皮，理气健脾。"],
  ["mo-coconut-milk", "椰浆", "饮品", "平", "", "澳门甜品椰浆基料，生津润燥。"],
  ["mo-pine-nut-candy", "松子糖", "坚果种子", "温", "", "澳门传统松子糖，温中适量。"]
];

const foods = buildRegionalBatch(MO_TUPLES, "澳门", path.join(cnDir, "foods-mo-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "葡挞", foodId: "mo-egg-tart" },
  { term: "猪扒包", foodId: "mo-pork-chop-bun" },
  { term: "马介休", foodId: "mo-bacalhau" },
  { term: "水蟹粥", foodId: "mo-crab-congee" },
  { term: "木糠杯", foodId: "mo-serradura" },
  { term: "葡国鸡", foodId: "mo-portuguese-chicken" },
  { term: "澳门杏仁饼", foodId: "mo-almond-cookie" },
  { term: "澳式杏仁饼", foodId: "mo-almond-cookie" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch9-mo.json"), synonyms);
console.log(`foods-mo-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch9-mo.json: ${synonyms.length}`);
