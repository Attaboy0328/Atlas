#!/usr/bin/env node
/** Phase 7D — International therapy recipes: East Asia + Southeast Asia */
import path from "node:path";
import { fileURLToPath } from "url";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import { filterRecipeSeedTuples, mergeAndWriteRecipeJson } from "./lib/recipe-catalog.mjs";

const catalog = loadFoodCatalogIds();

function recipe(row) {
  const foodIds = row.foodIds.filter((id) => catalog.has(id));
  if (foodIds.length < 1) {
    console.warn(`Skip ${row.name}: no valid foodIds`);
    return null;
  }
  return {
    id: row.id,
    name: row.name,
    nature: row.nature,
    syndromes: row.syndromes,
    foodIds,
    provinces: row.provinces,
    cuisine: row.cuisine,
    recipeTopic: row.recipeTopic,
    seasonTags: row.seasonTags || [],
    subtitle: row.subtitle,
    ingredients: row.ingredients,
    steps: row.steps,
    note: row.note,
    sources: row.sources || [{ title: "地域食疗整理", summary: `${row.name}为${row.cuisine}常见食养方。` }]
  };
}

function t(row) {
  return recipe({
    id: row[0], name: row[1], nature: row[2], syndromes: row[3], foodIds: row[4],
    provinces: row[5], cuisine: row[6], recipeTopic: row[7], seasonTags: row[8],
    subtitle: row[9], ingredients: row[10], steps: row[11], note: row[12]
  });
}

const TUPLES = [
  ["jp-miso-soup-lite", "味噌汤清版", "温", ["胃寒", "脾阳虚"], ["miso", "tofu", "wakame"], ["日本"], "日式", "温胃散寒", ["冬"], "家常汤品", ["味噌 1 汤匙", "豆腐 100 克", "裙带菜少许"], ["水烧开", "溶入味噌与豆腐裙带菜"], "高血压控盐，胃热减量。"],
  ["jp-salmon-don-lite", "三文鱼盖饭少酱", "平", ["气血不足", "胃气虚"], ["rice", "jp-sashimi-salmon", "ginger"], ["日本"], "日式", "滋阴补虚", ["四季"], "盖饭", ["米饭 1 碗", "三文鱼 80 克", "姜丝"], ["米饭铺底", "放三文鱼与姜丝"], "生鱼须新鲜，消化弱者适量。"],
  ["jp-oden-winter", "关东煮暖身", "温", ["脾阳虚", "寒湿困脾"], ["tofu", "fish", "ginger"], ["日本"], "日式", "温胃暖身", ["冬"], "煮物", ["豆腐 2 块", "鱼糕 3 片", "高汤 500 毫升"], ["高汤煮开", "下料煮 15 分钟"], "冬季畏寒暖胃，高钠控量。"],
  ["jp-soba-summer", "荞麦凉面", "凉", ["湿热内蕴", "暑湿"], ["soba-noodles", "ginger", "vinegar"], ["日本"], "日式", "清热健脾", ["夏"], "冷面", ["荞麦面 150 克", "陈醋少许", "姜丝"], ["面煮熟过冷", "蘸汁食用"], "暑热烦渴时，胃寒减量。"],
  ["jp-chawanmushi-soft", "茶碗蒸软嫩版", "平", ["胃气虚", "气血不足"], ["egg", "chicken", "mushroom"], ["日本"], "日式", "滋阴易消化", ["四季"], "蒸蛋", ["鸡蛋 2 个", "鸡肉末 30 克"], ["蛋液加高汤", "蒸 12 分钟"], "病后体虚易消化。"],
  ["jp-ume-kombu-tea", "梅干昆布茶", "温", ["肝郁气滞", "食欲不振"], ["jp-umeboshi", "dashi-kombu", "green-tea"], ["日本"], "日式", "开胃生津", ["夏"], "茶饮", ["梅干 1 颗", "昆布高汤 200 毫升"], ["梅干去核", "冲入热汤"], "胃口差时少量，胃酸过多减量。"],
  ["jp-sukiyaki-lite", "寿喜烧少油", "温", ["脾阳虚", "气血不足"], ["beef", "tofu", "scallion"], ["日本"], "日式", "温补气血", ["冬"], "涮锅", ["牛肉片 150 克", "豆腐 100 克"], ["少油煎香", "加汤涮食"], "冬季温补，高脂控量。"],
  ["jp-onigiri-ginger", "姜味饭团", "温", ["胃气虚", "脾气虚"], ["rice", "ginger", "jp-furikake"], ["日本"], "日式", "温胃充饥", ["四季"], "便携主食", ["米饭 1 碗", "姜丝少许", "香松 1 茶匙"], ["拌入姜丝", "捏成饭团"], "日常暖胃便携主食。"],
  ["jp-tofu-miso-salad", "豆腐味噌沙拉", "凉", ["胃阴虚", "肠燥便秘"], ["tofu", "miso", "cucumber"], ["日本"], "日式", "清热润燥", ["夏"], "凉拌", ["豆腐 150 克", "味噌 1 茶匙", "黄瓜丝"], ["豆腐切块", "拌味噌酱"], "暑热口干时适量。"],
  ["jp-genmaicha-aftermeal", "玄米茶饭后", "平", ["脾胃气滞", "食积"], ["jp-genmaicha", "ginger"], ["日本"], "日式", "消食解腻", ["四季"], "茶饮", ["玄米茶 1 包", "温水 300 毫升"], ["冲泡温热", "饭后饮用"], "油腻后消食，失眠晚间少饮。"],

  ["kr-kimchi-jjigae-lite", "泡菜锅少辣", "温", ["脾胃气滞", "寒湿困脾"], ["kimchi-kr", "tofu", "pork"], ["韩国"], "韩式", "温胃开胃", ["冬"], "炖锅", ["泡菜 100 克", "豆腐 100 克", "猪肉 50 克"], ["泡菜炒香", "加水炖 15 分钟"], "开胃祛湿，胃热辛辣减量。"],
  ["kr-bibimbap-veg", "石锅拌饭素食", "平", ["脾气虚", "气血不足"], ["rice", "egg", "spinach"], ["韩国"], "韩式", "健脾充饥", ["四季"], "拌饭", ["米饭 1 碗", "鸡蛋 1 个", "菠菜 50 克"], ["蔬菜焯水", "与饭蛋拌匀"], "日常健脾主食。"],
  ["kr-seaweed-soup-lite", "海带汤清版", "凉", ["甲状腺肿大", "湿热内蕴"], ["wakame", "tofu", "ginger"], ["韩国"], "韩式", "清热软坚", ["夏"], "汤品", ["海带 20 克", "豆腐 100 克"], ["海带泡发", "与豆腐同煮"], "甲状腺问题遵医嘱，胃寒减量。"],
["kr-doenjang-soup", "大酱汤", "温", ["胃寒", "脾气虚"], ["doenjang", "tofu", "cucumber"], ["韩国"], "韩式", "温胃健脾", ["冬"], "酱汤", ["大酱 1 汤匙", "豆腐 100 克", "黄瓜 50 克"], ["大酱化开", "下料煮 10 分钟"], "冬季暖胃，控盐适量。"],
["kr-naengmyeon-summer", "荞麦冷面", "凉", ["暑湿", "肝郁气滞"], ["soba-noodles", "vinegar", "cucumber"], ["韩国"], "韩式", "清热解暑", ["夏"], "冷面", ["荞麦面 150 克", "陈醋少许", "黄瓜丝"], ["面煮熟过冰", "配冷汤"], "暑热食欲差时，胃寒减量。"],
  ["kr-gimbap-lite", "紫菜包饭", "平", ["胃气虚", "脾气虚"], ["rice", "egg", "carrot"], ["韩国"], "韩式", "健脾充饥", ["四季"], "饭卷", ["米饭 1 碗", "鸡蛋 1 个", "胡萝卜丝"], ["铺海苔卷饭", "切段食用"], "便携健脾主食。"],
  ["kr-bossam-lite", "包肉生菜", "温", ["脾阳虚", "气血不足"], ["pork", "kr-perilla-leaf", "garlic"], ["韩国"], "韩式", "温补适量", ["冬"], "包肉", ["五花肉 150 克", "苏子叶 6 片"], ["肉煮熟切片", "包叶蘸酱"], "冬季温补，高脂控量。"],
  ["kr-yukgaejang-lite", "辣牛肉汤少辣", "热", ["肾阳虚", "寒湿困脾"], ["beef", "mung-bean-sprout", "ginger"], ["韩国"], "韩式", "温阳散寒", ["冬"], "辣汤", ["牛肉 150 克", "豆芽 50 克", "姜丝"], ["牛肉煮汤", "下豆芽"], "畏寒冬季，辛辣胃热减量。"],

  ["th-tom-yum-lite", "冬阴功少辣", "热", ["寒湿困脾", "食欲不振"], ["shrimp", "th-lemongrass", "ginger"], ["泰国"], "泰式", "祛湿开胃", ["夏"], "酸辣汤", ["虾仁 100 克", "香茅 2 根", "姜丝"], ["香茅煮水", "下虾煮 5 分钟"], "湿重开胃，辛辣控量。"],
  ["th-pad-thai-lite", "泰式炒河粉少油", "平", ["脾气虚", "胃气虚"], ["rice", "egg", "mung-bean-sprout"], ["泰国"], "泰式", "健脾充饥", ["四季"], "炒粉", ["河粉 150 克", "鸡蛋 1 个", "豆芽 50 克"], ["少油快炒", "调味出锅"], "日常主食，控油盐。"],
  ["th-green-curry-chicken", "绿咖喱鸡", "热", ["脾阳虚", "寒湿困脾"], ["chicken", "th-green-curry", "coconut-milk"], ["泰国"], "泰式", "温中祛湿", ["冬"], "咖喱", ["鸡肉 200 克", "绿咖喱 1 汤匙", "椰浆 100 毫升"], ["咖喱炒香", "下鸡炖 20 分钟"], "辛辣控量，胃热减量。"],
  ["th-mango-sticky-lite", "芒果糯米饭", "平", ["脾气虚", "肠燥便秘"], ["th-mango-sticky", "honey"], ["泰国"], "泰式", "健脾润肠", ["夏"], "甜点", ["糯米饭 100 克", "芒果 半个", "蜂蜜少许"], ["糯米饭蒸熟", "配芒果"], "控糖适量，糖尿病慎用。"],
  ["th-som-tam-lite", "青木瓜沙拉", "凉", ["湿热内蕴", "肝郁气滞"], ["th-som-tam", "vinegar", "peanut"], ["泰国"], "泰式", "清热开胃", ["夏"], "凉拌", ["青木瓜 150 克", "青柠汁", "花生碎"], ["木瓜切丝", "拌汁食用"], "暑热开胃，胃寒减量。"],
  ["th-basil-chicken-lite", "罗勒炒鸡", "温", ["脾胃气滞", "食欲不振"], ["chicken", "th-basil-chicken", "garlic"], ["泰国"], "泰式", "理气开胃", ["四季"], "小炒", ["鸡肉 200 克", "罗勒叶 1 把", "蒜末"], ["鸡肉滑炒", "下罗勒快炒"], "胃口差时开胃小炒。"],
  ["th-coconut-soup", "椰奶南瓜汤", "平", ["胃阴虚", "肠燥便秘"], ["pumpkin", "coconut-milk", "ginger"], ["泰国"], "泰式", "润燥健脾", ["秋"], "浓汤", ["南瓜 200 克", "椰浆 100 毫升"], ["南瓜煮软", "加椰浆打匀"], "秋燥口干时适量。"],
  ["th-fish-sauce-veg", "鱼露拌时蔬", "平", ["脾胃气滞", "湿热内蕴"], ["cucumber", "fish-sauce", "vinegar"], ["泰国"], "泰式", "开胃消食", ["夏"], "凉拌", ["黄瓜 1 根", "鱼露 1 茶匙", "青柠汁"], ["黄瓜拍碎", "拌汁食用"], "控盐适量，高血压减量。"],

  ["vn-pho-lite", "越南河粉清汤", "温", ["胃气虚", "气血不足"], ["beef", "rice", "ginger"], ["越南"], "越式", "温胃补虚", ["冬"], "汤粉", ["牛肉 100 克", "米粉 150 克", "姜丝"], ["牛肉煮汤", "下粉煮软"], "病后体虚易消化。"],
  ["vn-spring-roll-fresh", "鲜虾米纸卷", "凉", ["湿热内蕴", "肝郁气滞"], ["vn-spring-roll", "shrimp", "mint"], ["越南"], "越式", "清热轻食", ["夏"], "生食", ["米纸 4 张", "虾仁 6 只", "薄荷叶"], ["米纸泡软", "卷馅切段"], "暑热轻食，生冷适量。"],
  ["vn-bun-cha-lite", "烤肉米粉", "温", ["脾气虚", "气血不足"], ["pork", "rice", "vinegar"], ["越南"], "越式", "健脾充饥", ["四季"], "米粉", ["烤肉 100 克", "米粉 150 克"], ["烤肉配米粉", "蘸鱼露醋"], "日常主食适量。"],
  ["vn-ginger-chicken", "姜鸡越式", "温", ["脾阳虚", "胃寒"], ["chicken", "ginger", "fish-sauce"], ["越南"], "越式", "温中散寒", ["冬"], "炖鸡", ["鸡腿 2 只", "生姜 5 片"], ["姜鸡同炖", "炖 40 分钟"], "畏寒冬季暖胃。"],
  ["vn-lotus-tea", "莲花茶", "平", ["肝郁气滞", "心烦失眠"], ["lotus-seed", "green-tea", "honey"], ["越南"], "越式", "清心解郁", ["夏"], "茶饮", ["莲子 10 克", "绿茶 3 克"], ["莲子煮水", "泡绿茶"], "情绪郁结时适量。"],

  ["my-nasi-lemak-lite", "椰浆饭清版", "平", ["脾气虚", "胃气虚"], ["my-nasi-lemak", "egg", "cucumber"], ["马来西亚"], "马来式", "健脾充饥", ["四季"], "主食", ["椰浆饭 1 碗", "鸡蛋 1 个", "黄瓜片"], ["配蛋黄瓜", "同食"], "日常健脾主食。"],
  ["my-satay-lite", "沙爹少油", "温", ["脾阳虚", "气血不足"], ["chicken", "my-satay", "peanut"], ["马来西亚"], "马来式", "温补益气", ["冬"], "烤肉", ["鸡肉 200 克", "花生酱 1 汤匙"], ["鸡肉腌制", "烤熟蘸酱"], "冬季温补适量。"],
  ["my-laksa-lite", "叻沙清汤", "热", ["寒湿困脾", "食欲不振"], ["my-laksa", "shrimp", "coconut-milk"], ["马来西亚"], "马来式", "祛湿开胃", ["冬"], "咖喱面", ["叻沙酱 1 汤匙", "虾仁 80 克"], ["汤底煮开", "下面煮软"], "辛辣控量，胃热减量。"],
  ["sg-hainan-chicken-lite", "海南鸡饭清版", "平", ["脾气虚", "气血不足"], ["sg-hainanese-chicken", "rice", "ginger"], ["新加坡"], "新式", "健脾益气", ["四季"], "鸡饭", ["鸡肉 200 克", "米饭 1 碗", "姜蓉"], ["白切鸡配饭", "蘸姜蓉"], "日常健脾益气。"],
  ["sg-fish-curry-lite", "鱼头咖喱少辣", "热", ["寒湿困脾", "脾胃气滞"], ["fish", "coconut-milk", "ginger"], ["新加坡"], "新式", "祛湿开胃", ["冬"], "咖喱", ["鱼头 1 个", "椰浆 100 毫升", "姜丝"], ["咖喱煮鱼头", "炖 20 分钟"], "开胃祛湿，辛辣控量。"],
  ["sg-kaya-toast-lite", "咖椰吐司早餐", "平", ["胃气虚", "脾气虚"], ["sg-kaya-toast", "egg"], ["新加坡"], "新式", "健脾早餐", ["四季"], "早餐", ["吐司 2 片", "鸡蛋 1 个"], ["吐司烤热", "配水煮蛋"], "控糖适量。"]
];

const rows = filterRecipeSeedTuples(TUPLES).map(t).filter(Boolean);
const total = mergeAndWriteRecipeJson("regional-recipes-batch5.json", rows);
console.log(`regional-recipes-batch5.json: +${rows.length} seeded, ${total} total`);
