#!/usr/bin/env node
/** Phase 7B — India / Mediterranean / Middle East ingredient expansion. */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { buildInternationalMultiBatch } from "./lib/region-food-seed.mjs";
import { writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

const IN_MED_TUPLES = [
  ["in-dal", "印度豆糊", "豆类", "平", "IN", "印度", "Dal、扁豆糊", "印度豆糊，健脾高蛋白。"],
  ["in-naan", "印度烤饼", "主食", "温", "IN", "印度", "馕、烤饼", "印度烤饼，温胃主食。"],
  ["in-biryani", "印度香饭", "主食", "温", "IN", "印度", "香料饭、Biryani", "印度香饭，温中充饥。"],
  ["in-tandoori", "坦都里烤鸡", "肉蛋奶", "温", "IN", "印度", "烤鸡、Tandoori", "印度坦都里烤鸡，温中益气。"],
  ["in-paneer", "印度奶酪", "肉蛋奶", "平", "IN", "印度", "奶豆腐、Paneer", "印度奶酪，滋阴高蛋白。"],
  ["in-ghee", "印度酥油", "调料", "温", "IN", "印度", "澄清黄油、Ghee", "印度酥油，温中润燥适量。"],
  ["in-curry-powder", "印度咖喱粉", "调料", "温", "IN", "印度", "马萨拉、香料粉", "印度咖喱粉，温香调味。"],
  ["in-samosa", "印度咖喱角", "主食", "温", "IN", "印度", "三角饺、Samosa", "印度咖喱角，温胃小食油炸控量。"],
  ["in-chapati", "恰巴提", "主食", "平", "IN", "印度", "全麦薄饼", "印度恰巴提，健脾粗粮主食。"],
  ["in-lassi", "印度酸奶饮", "饮品", "平", "IN", "印度", "酸奶昔、Lassi", "印度酸奶饮，健脾润肠。"],
  ["in-chutney", "印度酸辣酱", "调料", "温", "IN", "印度", "芒果酱、Chutney", "印度酸辣酱，开胃调味。"],
  ["in-turmeric-milk", "黄金奶", "饮品", "温", "IN", "印度", "姜黄奶", "印度黄金奶，温胃抗炎适量。"],

  ["it-risotto", "意大利烩饭", "主食", "平", "IT", "意大利", "Risotto、奶油饭", "意大利烩饭，健脾充饥。"],
  ["it-bruschetta", "意式烤面包", "主食", "平", "IT", "意大利", "Bruschetta", "意大利烤面包，健脾开胃。"],
  ["it-pesto", "青酱", "调料", "平", "IT", "意大利", "罗勒酱、Pesto", "意大利青酱，理气调味。"],
  ["it-prosciutto", "意大利火腿", "肉蛋奶", "温", "IT", "意大利", "风干火腿", "意大利火腿，温补适量高盐控量。"],
  ["it-bolognese", "肉酱面", "主食", "温", "IT", "意大利", "番茄肉酱意面", "意大利肉酱面，温胃主食。"],
  ["it-tiramisu", "提拉米苏", "发酵食品", "温", "IT", "意大利", "咖啡甜点", "意大利提拉米苏，甜点适量控糖。"],
  ["it-caprese", "卡普雷塞沙拉", "蔬菜", "平", "IT", "意大利", "番茄芝士沙拉", "意大利卡普雷塞，清热开胃。"],
  ["it-minestrone", "意式蔬菜汤", "蔬菜", "平", "IT", "意大利", "杂菜汤", "意大利蔬菜汤，健脾润燥。"],

  ["fr-baguette", "法棍", "主食", "平", "FR", "法国", "长棍面包", "法国法棍，健脾主食。"],
  ["fr-ratatouille", "普罗旺斯炖菜", "蔬菜", "平", "FR", "法国", "杂蔬炖", "法国普罗旺斯炖菜，健脾润燥。"],
  ["fr-onion-soup", "法式洋葱汤", "蔬菜", "温", "FR", "法国", "洋葱汤", "法国洋葱汤，温胃散寒冬季。"],
  ["fr-crepe", "可丽饼", "主食", "平", "FR", "法国", "薄饼、Crêpe", "法国可丽饼，健脾主食控糖。"],
  ["fr-coq-au-vin", "红酒炖鸡", "肉蛋奶", "温", "FR", "法国", "红酒鸡", "法国红酒炖鸡，温中益气适量。"],

  ["gr-tzatziki", "希腊酸奶黄瓜酱", "发酵食品", "凉", "GR", "希腊", "Tzatziki", "希腊酸奶黄瓜酱，清热开胃。"],
  ["gr-souvlaki", "希腊烤肉串", "肉蛋奶", "温", "GR", "希腊", "烤肉串", "希腊烤肉串，温中益气。"],
  ["gr-greek-salad", "希腊沙拉", "蔬菜", "凉", "GR", "希腊", "羊奶酪沙拉", "希腊沙拉，清热开胃。"],
  ["gr-moussaka", "慕萨卡", "肉蛋奶", "温", "GR", "希腊", "茄子千层", "希腊慕萨卡，温胃主食适量。"],
  ["gr-feta", "羊奶酪", "肉蛋奶", "凉", "GR", "希腊", "Feta、羊乳酪", "希腊羊奶酪，滋阴适量。"],

  ["tr-kebab", "土耳其烤肉", "肉蛋奶", "温", "TR", "土耳其", "Kebab、烤肉卷", "土耳其烤肉，温补气血适量。"],
  ["tr-baklava", "果仁蜜饼", "坚果种子", "温", "TR", "土耳其", "Baklava", "土耳其果仁蜜饼，甜点控糖。"],
  ["tr-hummus-tr", "土耳其鹰嘴豆泥", "豆类", "平", "TR", "土耳其", "豆泥", "土耳其鹰嘴豆泥，健脾高蛋白。"],
  ["tr-pide", "土耳其披萨", "主食", "温", "TR", "土耳其", "船形饼", "土耳其披萨，温胃主食。"],
  ["tr-ayran", "土耳其酸奶饮", "饮品", "平", "TR", "土耳其", "咸酸奶", "土耳其酸奶饮，健脾解暑。"],

  ["sa-kabsa", "卡布萨饭", "主食", "温", "SA", "沙特阿拉伯", "香料饭", "沙特卡布萨饭，温中主食。"],
  ["sa-falafel", "法拉费", "豆类", "平", "SA", "沙特阿拉伯", "炸豆丸", "中东法拉费，健脾素食油炸控量。"],
  ["sa-shawarma", "沙威玛", "肉蛋奶", "温", "SA", "沙特阿拉伯", "烤肉卷", "中东沙威玛，温补适量。"],
  ["sa-tahini", "芝麻酱中东版", "坚果种子", "平", "SA", "沙特阿拉伯", "Tahini", "中东芝麻酱，润燥调味。"],
  ["sa-hummus", "鹰嘴豆泥", "豆类", "平", "SA", "沙特阿拉伯", "Hummus", "中东鹰嘴豆泥，健脾高蛋白。"],

  ["il-shakshuka", "北非蛋", "肉蛋奶", "温", "IL", "以色列", "番茄炖蛋", "以色列北非蛋，温胃早餐。"],
  ["il-falafel-il", "以色列法拉费", "豆类", "平", "IL", "以色列", "炸豆饼", "以色列法拉费，健脾素食。"],
  ["eg-koshari", "埃及杂饭", "主食", "平", "EG", "埃及", "扁豆米饭", "埃及杂饭，健脾充饥。"],
  ["eg-ful-medames", "埃及蚕豆", "豆类", "平", "EG", "埃及", "炖蚕豆", "埃及炖蚕豆，健脾高蛋白。"]
];

const foods = buildInternationalMultiBatch(IN_MED_TUPLES, path.join(cnDir, "foods-in-med-ingredients-batch.json"));
const catalog = loadFoodCatalogIds();
foods.forEach((f) => catalog.add(f.id));

const synonyms = [
  { term: "印度香饭", foodId: "in-biryani" },
  { term: "坦都里", foodId: "in-tandoori" },
  { term: "提拉米苏", foodId: "it-tiramisu" },
  { term: "希腊沙拉", foodId: "gr-greek-salad" },
  { term: "土耳其烤肉", foodId: "tr-kebab" },
  { term: "鹰嘴豆泥", foodId: "sa-hummus" },
  { term: "冬阴功", foodId: "th-tom-yum" }
].filter((row) => catalog.has(row.foodId));

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch13-inmed.json"), synonyms);
console.log(`foods-in-med-ingredients-batch.json: ${foods.length}`);
console.log(`food-search-synonyms-batch13-inmed.json: ${synonyms.length}`);
