#!/usr/bin/env node
/** Phase 7C — Americas: US/MX/BR/AR/CA ingredient expansion. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildInternationalMultiBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const AMERICAS_TUPLES = [
  ["us-burger", "美式汉堡", "肉蛋奶", "温", "US", "美国", "牛肉汉堡", "美式汉堡，温中充饥适量。"],
  ["us-bbq-ribs", "美式烤肋排", "肉蛋奶", "温", "US", "美国", "BBQ肋排", "美式烤肋排，温补适量高脂控量。"],
  ["us-clam-chowder", "蛤蜊浓汤", "海产", "温", "US", "美国", "海鲜浓汤", "美式蛤蜊浓汤，温胃补虚。"],
  ["us-pancakes", "美式松饼", "主食", "平", "US", "美国", "煎饼、Pancake", "美式松饼，健脾早餐控糖。"],
  ["us-mac-cheese", "芝士通心粉", "主食", "温", "US", "美国", "Mac and Cheese", "美式芝士通心粉，温胃主食适量。"],
  ["us-caesar-salad", "凯撒沙拉", "蔬菜", "平", "US", "美国", "Caesar Salad", "美式凯撒沙拉，健脾开胃。"],
  ["us-apple-pie", "苹果派", "水果", "平", "US", "美国", "Apple Pie", "美式苹果派，健脾甜点控糖。"],
  ["us-gumbo", "秋葵浓汤", "海产", "温", "US", "美国", "Gumbo", "美式秋葵浓汤，温胃祛湿。"],

  ["mx-taco", "墨西哥塔可", "主食", "温", "MX", "墨西哥", "Taco、玉米饼", "墨西哥塔可，温胃主食。"],
  ["mx-burrito", "墨西哥卷饼", "主食", "温", "MX", "墨西哥", "Burrito", "墨西哥卷饼，温胃便携主食。"],
  ["mx-guacamole", "牛油果酱", "水果", "平", "MX", "墨西哥", "Guacamole", "墨西哥牛油果酱，润燥开胃。"],
  ["mx-enchilada", "辣酱卷饼", "主食", "热", "MX", "墨西哥", "Enchilada", "墨西哥辣酱卷饼，辛热开胃辛辣控量。"],
  ["mx-mole", "墨西哥摩尔酱", "调料", "温", "MX", "墨西哥", "Mole、巧克力辣酱", "墨西哥摩尔酱，温香调味。"],
  ["mx-tortilla", "玉米薄饼", "谷物", "平", "MX", "墨西哥", "Tortilla", "墨西哥玉米薄饼，健脾主食。"],
  ["mx-pozole", "墨西哥 pozole", "肉蛋奶", "温", "MX", "墨西哥", "玉米肉汤", "墨西哥玉米肉汤，温胃补虚。"],
  ["mx-churros", "西班牙油条", "主食", "温", "MX", "墨西哥", "Churros、吉事果", "墨西哥吉事果，甜点控糖。"],

  ["br-feijoada", "巴西黑豆炖肉", "豆类", "温", "BR", "巴西", "Feijoada", "巴西黑豆炖肉，温中补虚。"],
  ["br-pao-de-acucar", "巴西芝士面包", "主食", "平", "BR", "巴西", "Pão de Queijo", "巴西芝士面包，健脾小食。"],
  ["br-acai-bowl", "巴西莓碗", "水果", "凉", "BR", "巴西", "Açaí Bowl", "巴西莓碗，清热抗氧化控糖。"],
  ["br-churrasco", "巴西烤肉", "肉蛋奶", "温", "BR", "巴西", "Churrasco", "巴西烤肉，温补气血适量。"],
  ["br-moqueca", "巴西海鲜炖", "海产", "温", "BR", "巴西", "椰奶炖鱼", "巴西海鲜炖，温胃补虚。"],
  ["br-brigadeiro", "巴西巧克力球", "坚果种子", "温", "BR", "巴西", "Brigadeiro", "巴西巧克力球，甜点控糖。"],

  ["ar-asado", "阿根廷烤肉", "肉蛋奶", "温", "AR", "阿根廷", "Asado", "阿根廷烤肉，温补气血适量。"],
  ["ar-empanada", "阿根廷馅饼", "主食", "温", "AR", "阿根廷", "Empanada", "阿根廷馅饼，温胃主食。"],
  ["ar-dulce-de-leche", "焦糖牛奶酱", "调料", "温", "AR", "阿根廷", "Dulce de Leche", "阿根廷焦糖酱，甘温调味控糖。"],
  ["ar-chimichurri", "阿根廷青酱", "调料", "平", "AR", "阿根廷", "Chimichurri", "阿根廷青酱，开胃调味。"],
  ["ar-mate", "马黛茶", "茶饮", "温", "AR", "阿根廷", "Mate、马黛", "阿根廷马黛茶，提神适量。"],

  ["ca-poutine", "肉汁芝士薯条", "薯类", "温", "CA", "加拿大", "Poutine", "加拿大肉汁薯条，温胃小食高脂控量。"],
  ["ca-maple-syrup", "枫糖浆", "调料", "平", "CA", "加拿大", "Maple Syrup", "加拿大枫糖浆，甘平调味控糖。"],
  ["ca-butter-tart", "黄油挞", "主食", "温", "CA", "加拿大", "Butter Tart", "加拿大黄油挞，甜点控糖。"],
  ["ca-tourtiere", "法式肉派", "肉蛋奶", "温", "CA", "加拿大", "Tourtière", "加拿大法式肉派，温胃主食。"],
  ["ca-smoked-salmon", "加拿大熏三文鱼", "海产", "平", "CA", "加拿大", "熏鲑鱼", "加拿大熏三文鱼，滋阴高蛋白。"]
];

const foods = buildInternationalMultiBatch(AMERICAS_TUPLES, path.join(cnDir, "foods-americas-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "塔可", foodId: "mx-taco" },
  { term: "墨西哥卷饼", foodId: "mx-burrito" },
  { term: "牛油果酱", foodId: "mx-guacamole" },
  { term: "巴西烤肉", foodId: "br-churrasco" },
  { term: "阿根廷烤肉", foodId: "ar-asado" },
  { term: "枫糖浆", foodId: "ca-maple-syrup" },
  { term: "凯撒沙拉", foodId: "us-caesar-salad" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13-americas.json"), synonyms);
console.log(`foods-americas-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch13-americas.json: ${synonyms.length}`);
