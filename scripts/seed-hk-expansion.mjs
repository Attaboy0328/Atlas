#!/usr/bin/env node
/** Hong Kong first-class region: curated HK ingredients + synonyms. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { makeFood, writeJsonFile } from "./lib/food-entry.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnDir = path.join(root, "data", "cn");

/** [id, name, category, nature, aliases, summary] — all provinces: ["香港"] */
const HK_TUPLES = [
  ["hk-silk-milk-tea", "丝袜奶茶", "饮品", "温", "港式奶茶", "香港茶餐厅经典奶茶，温胃提神但含咖啡因，晚间少饮。"],
  ["hk-yuen-yeung", "鸳鸯", "饮品", "平", "咖啡奶茶", "港式咖啡与奶茶混合饮品，提神但胃酸反流者适量。"],
  ["hk-lemon-tea", "冻柠茶", "饮品", "凉", "柠檬茶", "港式冻柠茶，清热生津，夏令常见。"],
  ["hk-pineapple-bun", "菠萝包", "主食", "平", "", "香港面包房经典，酥皮香甜，控糖适量。"],
  ["hk-butter-pineapple", "菠萝油", "主食", "温", "", "菠萝包夹牛油，港式下午茶常见，高脂高能量。"],
  ["hk-egg-tart", "蛋挞", "主食", "平", "港式蛋挞", "港式酥皮蛋挞，偶尔小点，糖尿病控糖。"],
  ["hk-wife-cake-hk", "老婆饼", "主食", "温", "", "港式酥饼点心，温中补虚整理，适量食用。"],
  ["hk-sachima", "沙琪玛", "主食", "温", "", "港式茶点常见酥糖糕，甜腻高能量，少量。"],
  ["hk-rice-roll-hk", "港式肠粉", "主食", "平", "肠粉", "港式蒸肠粉，清淡易消化早餐。"],
  ["hk-wonton-noodle", "云吞面", "主食", "平", "", "港式鲜虾云吞面，益气养胃汤面。"],
  ["hk-cart-noodle", "车仔面", "主食", "平", "", "香港街头自选配料面食，搭配因店而异。"],
  ["hk-fish-ball-noodle", "鱼蛋粉", "主食", "平", "鱼蛋面", "港式咖喱或清汤鱼蛋粉，日常小食。"],
  ["hk-beef-brisket-noodle", "牛腩面", "主食", "温", "", "港式清汤或咖喱牛腩面，温补气血。"],
  ["hk-dried-beef-noodle", "干炒牛河", "主食", "温", "", "港式镬气小炒，健脾开胃，控油控盐。"],
  ["hk-congee-base", "港式粥底", "主食", "平", "", "生滚粥常用浓滑粥底，病后养胃参考。"],
  ["hk-preserved-egg-congee", "皮蛋瘦肉粥", "主食", "平", "", "港式生滚粥代表，和胃益气。"],
  ["hk-fish-congee-hk", "鱼片粥", "主食", "平", "", "港式生滚鱼片粥，清淡高蛋白。"],
  ["hk-pork-liver-congee", "及第粥", "主食", "平", "", "港式猪杂生滚粥，健脾益气。"],
  ["hk-shark-fin-soup", "碗仔翅", "主食", "平", "仿鱼翅羹", "港式碗仔翅为淀粉羹品，非真鱼翅，适量。"],
  ["hk-red-bean-soup-hk", "红豆沙", "饮品", "平", "", "港式糖水红豆沙，健脾祛湿，夏令常见。"],
  ["hk-green-bean-soup-hk", "绿豆沙", "饮品", "寒", "", "港式清热解暑糖水，脾胃虚寒减量。"],
  ["hk-black-sesame-soup", "芝麻糊", "饮品", "温", "", "港式芝麻糊，补血润肠，秋冬常见。"],
  ["hk-walnut-soup-hk", "核桃露", "饮品", "温", "", "港式核桃露，温肾健脑甜品。"],
  ["hk-snow-fungus-soup", "冰糖银耳莲子", "饮品", "平", "", "港式炖品糖水，润肺养颜。"],
  ["hk-papaya-soup-hk", "木瓜炖品", "饮品", "平", "", "港式炖木瓜，养胃生津。"],
  ["hk-sago-soup", "西米露", "饮品", "平", "", "港式椰汁西米露，清甜解暑。"],
  ["hk-tofu-pudding-hk", "豆腐花", "饮品", "凉", "姜汁豆花", "港式甜或咸豆腐花，清热润燥。"],
  ["hk-herbal-tea-24", "廿四味", "茶饮", "寒", "二十四味", "港式凉茶复方，清热祛湿，体虚慎用。"],
  ["hk-five-flower-tea", "五花茶", "茶饮", "凉", "", "港式家庭凉茶，清热利湿。"],
  ["hk-chrysanthemum-tea-hk", "菊花茶", "茶饮", "凉", "", "港式凉茶铺常见，清肝明目。"],
  ["hk-sang-ji-sheng", "桑寄生蛋茶", "茶饮", "平", "", "港式蛋茶配伍，养血安神。"],
  ["hk-dried-scallop-hk", "瑶柱", "海产", "平", "干贝", "港式汤粥鲜味干货，滋阴调味。"],
  ["hk-dried-oyster-hk", "蚝豉", "海产", "平", "蚝干", "港式煲汤海产干货，滋阴养血。"],
  ["hk-candied-date-hk", "蜜枣", "水果", "温", "", "港式汤料甜枣，调和甘润。"],
  ["hk-chenpi-hk", "广陈皮", "食药物质", "温", "新会陈皮", "港式汤饮与糖水常用陈皮。"],
  ["hk-watercress-hk", "西洋菜", "水生蔬菜", "凉", "", "港式西洋菜汤，清热润肺。"],
  ["hk-preserved-duck-gizzard-hk", "陈肾", "肉蛋奶", "平", "鸭胗干", "港式西洋菜汤经典搭配。"],
  ["hk-pork-shoulder-hk", "猪展", "肉蛋奶", "平", "猪腱", "港式老火汤瘦肉部位。"],
  ["hk-fish-maw-hk", "花胶", "海产", "平", "", "港式炖品名贵胶类，滋阴养颜。"],
  ["hk-hasma-hk", "雪蛤膏", "滋补食材", "平", "林蛙油", "港式滋补糖水，滋阴润燥。"],
  ["hk-turtle-jelly-hk", "龟苓膏", "滋补食材", "凉", "", "港式清热祛湿甜品。"],
  ["hk-shrimp-roe-hk", "虾籽", "海产", "温", "", "港式捞面蒸蛋鲜味调料。"],
  ["hk-xo-sauce-hk", "XO酱", "调料", "温", "", "港式海鲜辣味酱，拌面佐餐。"],
  ["hk-abalone-sauce", "鲍鱼汁", "调料", "平", "", "港式烹调酱汁，提鲜调味。"],
  ["hk-oyster-sauce-hk", "蚝油", "调料", "平", "", "港式炒菜常用蚝油，控钠。"],
  ["hk-fermented-tofu-hk", "腐乳", "调料", "温", "", "港式煲粥配菜，开胃佐食。"],
  ["hk-chu-hou-hk", "柱侯酱", "调料", "温", "", "港式焖炖调味酱。"],
  ["hk-curry-paste-hk", "咖喱酱", "调料", "温", "", "港式咖喱牛腩鱼蛋常用。"],
  ["hk-yellow-skin-hk", "黄皮酱", "调料", "温", "黄皮", "港式酸甜酱，开胃消食。"],
  ["hk-silkie-chicken-hk", "乌鸡", "肉蛋奶", "平", "", "港式炖汤常用禽肉，滋阴补血。"],
  ["hk-cordyceps-flower-hk", "虫草花", "菌菇", "平", "", "港式炖汤配色菌菇。"],
  ["hk-lotus-seed-hk", "莲子", "谷物", "平", "", "港式糖水炖品常用。"],
  ["hk-lily-bulb-hk", "百合", "蔬菜", "平", "", "港式清润糖水配料。"],
  ["hk-almond-tea-hk", "杏仁茶", "饮品", "平", "", "港式冲调杏仁茶，润肺止咳。"],
  ["hk-yuen-long-rice", "元朗丝苗米", "谷物", "平", "丝苗米", "新界元朗产区籼米，煲饭煮粥。"],
  ["hk-deep-fried-dough", "油炸鬼", "主食", "温", "油条", "港式粥品搭配油炸鬼，偶尔食用。"],
  ["hk-turnip-cake-hk", "萝卜糕", "主食", "平", "", "港式贺年点心，煎香食用。"],
  ["hk-taro-cake-hk", "芋头糕", "主食", "平", "", "港式茶楼芋头糕点心，煎香食用。"],
  ["hk-water-chestnut-cake", "马蹄糕", "主食", "凉", "", "港式马蹄糕清甜糕点，夏令常见。"],
  ["hk-mango-pomelo", "杨枝甘露", "饮品", "凉", "", "港式芒果西米糖水，清热生津。"],
  ["hk-mango-sago", "芒果西米露", "饮品", "凉", "", "港式甜品店常见。"],
  ["hk-almond-cookie", "杏仁饼", "主食", "平", "", "澳门香港手信酥饼，适量。"],
  ["hk-dried-tangerine-hk", "老药桔", "食药物质", "温", "", "潮汕港式冲饮，理气化痰。"]
];

function tupleToFood([id, name, category, nature, aliases, summary]) {
  return makeFood({
    id,
    name,
    category,
    nature,
    provinces: ["香港"],
    regions: ["CN"],
    aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
    summary,
    ethnicGroups: ["汉族"]
  });
}

function main() {
  const seen = new Set();
  const foods = [];
  HK_TUPLES.forEach((tuple) => {
    try {
      const food = tupleToFood(tuple);
      if (seen.has(food.id) || seen.has(`name:${food.name}`)) return;
      seen.add(food.id);
      seen.add(`name:${food.name}`);
      foods.push(food);
    } catch (e) {
      console.warn(`Skip ${tuple[0]}: ${e.message}`);
    }
  });

  writeJsonFile(path.join(cnDir, "foods-hk-ingredients-batch.json"), foods);
  const catalog = loadFoodCatalogIds();
  foods.forEach((food) => catalog.add(food.id));

  const synonymRows = [
    { term: "丝袜奶茶", foodId: "hk-silk-milk-tea" },
    { term: "港式奶茶", foodId: "hk-silk-milk-tea" },
    { term: "冻柠茶", foodId: "hk-lemon-tea" },
    { term: "菠萝油", foodId: "hk-butter-pineapple" },
    { term: "港式蛋挞", foodId: "hk-egg-tart" },
    { term: "云吞面", foodId: "hk-wonton-noodle" },
    { term: "车仔面", foodId: "hk-cart-noodle" },
    { term: "鱼蛋粉", foodId: "hk-fish-ball-noodle" },
    { term: "干炒牛河", foodId: "hk-dried-beef-noodle" },
    { term: "碗仔翅", foodId: "hk-shark-fin-soup" },
    { term: "杨枝甘露", foodId: "hk-mango-pomelo" },
    { term: "老药桔", foodId: "hk-dried-tangerine-hk" },
    { term: "油炸鬼", foodId: "hk-deep-fried-dough" },
    { term: "元朗丝苗", foodId: "hk-yuen-long-rice" },
    { term: "港式肠粉", foodId: "hk-rice-roll-hk" }
  ].filter((row) => catalog.has(row.foodId) || foods.some((f) => f.id === row.foodId));

  const synFile = path.join(cnDir, "food-search-synonyms-batch8-hk.json");
  writeJsonFile(synFile, synonymRows);

  console.log(`foods-hk-ingredients-batch.json: ${foods.length}`);
  console.log(`food-search-synonyms-batch8-hk.json: ${synonymRows.length}`);
}

main();
