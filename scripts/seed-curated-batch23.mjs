#!/usr/bin/env node
/** Phase 7E — Global curated bridge ingredients (cross-region staples). */
import path from "node:path";
import { fileURLToPath } from "url";
import { buildGlobalCuratedBatch } from "./lib/region-food-seed.mjs";

const cnDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "cn");

const GLOBAL_TUPLES = [
  ["c23-jp-miso-soup", "味噌汤", "豆制品", "温", "JP", "日本", "味噌汁", "日式味噌汤，温胃暖胃。"],
  ["c23-kr-kimchi-stew", "韩式泡菜汤", "腌菜", "温", "KR", "韩国", "泡菜汤", "韩式泡菜汤，温胃开胃适量。"],
  ["c23-th-coconut-curry", "椰奶咖喱", "调料", "温", "TH", "泰国", "椰浆咖喱", "泰式椰奶咖喱，温香调味。"],
  ["c23-vn-pho-lite", "清炖河粉", "主食", "温", "VN", "越南", "牛肉河粉", "越南清炖河粉，温胃易消化。"],
  ["c23-in-dal-rice", "豆糊配饭", "豆类", "平", "IN", "印度", "Dal米饭", "印度豆糊配饭，健脾素食。"],
  ["c23-it-pasta-marinara", "番茄意面", "主食", "平", "IT", "意大利", "Marinara", "意大利番茄意面，健脾主食。"],
  ["c23-fr-quiche", "法式咸派", "肉蛋奶", "平", "FR", "法国", "Quiche", "法式咸派，健脾早餐适量。"],
  ["c23-gr-yogurt-honey", "希腊酸奶蜂蜜", "发酵食品", "平", "GR", "希腊", "酸奶碗", "希腊酸奶蜂蜜，滋阴润肠。"],
  ["c23-tr-lentil-soup", "土耳其扁豆汤", "豆类", "平", "TR", "土耳其", "扁豆汤", "土耳其扁豆汤，健脾高蛋白。"],
  ["c23-mx-bean-soup", "墨西哥豆汤", "豆类", "平", "MX", "墨西哥", "黑豆汤", "墨西哥豆汤，健脾充饥。"],
  ["c23-us-oatmeal", "美式燕麦粥", "谷物", "平", "US", "美国", "Oatmeal", "美式燕麦粥，健脾早餐。"],
  ["c23-br-black-bean", "巴西黑豆", "豆类", "平", "BR", "巴西", "黑豆", "巴西黑豆，健脾高蛋白。"],
  ["c23-sg-chicken-rice", "新加坡鸡饭", "肉蛋奶", "平", "SG", "新加坡", "鸡饭", "新加坡鸡饭，健脾益气。"],
  ["c23-my-coconut-rice", "马来椰饭", "谷物", "平", "MY", "马来西亚", "椰浆饭", "马来椰浆饭，健脾主食。"],
  ["c23-id-peanut-sauce", "印尼花生酱", "坚果种子", "平", "ID", "印度尼西亚", "沙爹酱", "印尼花生酱，润燥调味。"],
  ["c23-ph-vinegar-adobo", "醋焖鸡", "肉蛋奶", "温", "PH", "菲律宾", "Adobo鸡", "菲律宾醋焖鸡，温中开胃。"],
  ["c23-jp-salmon-don", "三文鱼盖饭", "海产", "平", "JP", "日本", "鲑鱼丼", "日式三文鱼盖饭，滋阴主食。"],
  ["c23-kr-seaweed-soup", "韩式海带汤", "海产", "凉", "KR", "韩国", "海带汤", "韩式海带汤，清热软坚。"],
  ["c23-th-basil-fried-rice", "罗勒炒饭", "主食", "温", "TH", "泰国", "打抛炒饭", "泰式罗勒炒饭，温胃主食。"],
  ["c23-in-yogurt-curry", "酸奶咖喱", "调料", "平", "IN", "印度", "酸奶咖喱酱", "印度酸奶咖喱，健脾调味。"],
  ["c23-it-olive-tapenade", "橄榄酱", "调料", "平", "IT", "意大利", "Tapenade", "意大利橄榄酱，开胃调味。"],
  ["c23-sa-tabouleh", "塔博勒沙拉", "蔬菜", "凉", "SA", "沙特阿拉伯", "Tabbouleh", "中东塔博勒沙拉，清热开胃。"],
  ["c23-eg-lentil-stew", "埃及扁豆炖", "豆类", "平", "EG", "埃及", "炖扁豆", "埃及扁豆炖，健脾充饥。"],
  ["c23-ca-peameal-bacon", "加拿大腌里脊", "肉蛋奶", "温", "CA", "加拿大", "Peameal Bacon", "加拿大腌里脊，温补适量。"],
  ["c23-ar-milanesa", "阿根廷炸肉排", "肉蛋奶", "温", "AR", "阿根廷", "Milanesa", "阿根廷炸肉排，温胃适量。"],
  ["c23-jp-tofu-salad", "日式豆腐沙拉", "豆制品", "凉", "JP", "日本", "冷奴", "日式豆腐沙拉，清热易消化。"],
  ["c23-kr-seaweed-rice", "韩式海苔饭", "海产", "平", "KR", "韩国", "海苔包饭", "韩式海苔饭，健脾主食。"],
  ["c23-th-mango-salad", "泰式芒果沙拉", "水果", "凉", "TH", "泰国", "芒果沙律", "泰式芒果沙拉，清热开胃。"],
  ["c23-vn-vermicelli", "越南米线", "主食", "平", "VN", "越南", "米粉", "越南米线，健脾主食。"],
  ["c23-in-spinach-paneer", "菠菜奶酪", "蔬菜", "平", "IN", "印度", "Palak Paneer", "印度菠菜奶酪，滋阴健脾。"],
  ["c23-it-risotto-mushroom", "蘑菇烩饭", "菌菇", "平", "IT", "意大利", "蘑菇Risotto", "意大利蘑菇烩饭，益气健脾。"],
  ["c23-mx-corn-soup", "墨西哥玉米汤", "谷物", "平", "MX", "墨西哥", "玉米浓汤", "墨西哥玉米汤，健脾润燥。"],
  ["c23-us-turkey-sandwich", "火鸡三明治", "肉蛋奶", "平", "US", "美国", "Turkey Sandwich", "美式火鸡三明治，健脾轻食。"],
  ["c23-br-coconut-water", "巴西椰青", "饮品", "凉", "BR", "巴西", "椰子水", "巴西椰青，清热生津。"],
  ["c23-sg-laksa-lite", "叻沙清汤", "主食", "温", "SG", "新加坡", "清汤叻沙", "新加坡叻沙清汤，温胃适量。"]
];

const foods = buildGlobalCuratedBatch(GLOBAL_TUPLES, path.join(cnDir, "foods-china-curated-batch23.json"));
console.log(`foods-china-curated-batch23.json: ${foods.length}`);
