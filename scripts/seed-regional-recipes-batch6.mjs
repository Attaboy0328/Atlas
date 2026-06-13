#!/usr/bin/env node
/** Phase 7E — International therapy recipes: India / Mediterranean / Middle East / Americas */
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
  ["in-dal-rice-lite", "印度豆糊配饭", "平", ["脾气虚", "气血不足"], ["chickpea", "rice", "ginger"], ["印度"], "印式", "健脾充饥", ["四季"], "素食", ["鹰嘴豆 80 克", "米饭 1 碗", "姜丝"], ["豆煮烂", "配米饭"], "素食健脾高蛋白。"],
  ["in-tandoori-lite", "坦都里烤鸡少油", "温", ["脾阳虚", "气血不足"], ["chicken", "in-curry-powder", "yogurt"], ["印度"], "印式", "温中益气", ["冬"], "烤鸡", ["鸡腿 2 只", "咖喱粉 1 茶匙"], ["酸奶腌鸡", "烤熟"], "冬季温补适量。"],
  ["in-lassi-cooling", "芒果酸奶饮", "平", ["胃阴虚", "肠燥便秘"], ["in-lassi", "mango", "honey"], ["印度"], "印式", "滋阴润肠", ["夏"], "饮品", ["酸奶 200 毫升", "芒果 半个"], ["打匀饮用"], "暑热口干时适量控糖。"],
  ["in-turmeric-milk-lite", "黄金奶少姜", "温", ["脾阳虚", "寒湿困脾"], ["turmeric", "milk", "ginger"], ["印度"], "印式", "温胃抗炎", ["冬"], "热饮", ["姜黄粉 1 茶匙", "牛奶 200 毫升"], ["牛奶加热", "拌姜黄"], "冬季暖胃，孕妇慎用。"],
  ["in-paneer-spinach", "菠菜奶酪", "平", ["气血不足", "胃气虚"], ["in-paneer", "spinach", "garlic"], ["印度"], "印式", "滋阴健脾", ["四季"], "素菜", ["奶酪 100 克", "菠菜 150 克"], ["菠菜炒软", "下奶酪"], "素食滋阴参考。"],
  ["in-naan-garlic", "蒜香烤饼", "温", ["胃气虚", "脾气虚"], ["in-naan", "garlic", "butter"], ["印度"], "印式", "温胃主食", ["四季"], "烤饼", ["烤饼 2 张", "蒜末", "黄油少许"], ["烤热刷蒜黄油"], "日常主食适量。"],
  ["in-biryani-lite", "印度香饭清版", "温", ["脾气虚", "气血不足"], ["in-biryani", "chicken", "ginger"], ["印度"], "印式", "温中充饥", ["冬"], "香料饭", ["香饭 1 碗", "鸡肉 100 克"], ["鸡肉炒香", "与饭同焖"], "冬季温补主食。"],
  ["in-chutney-snack", "芒果酸辣酱", "温", ["脾胃气滞", "食欲不振"], ["in-chutney", "mango", "ginger"], ["印度"], "印式", "开胃消食", ["夏"], "蘸酱", ["芒果酱 2 汤匙", "姜丝少许"], ["配烤饼或蔬菜"], "胃口差时开胃。"],

  ["it-minestrone-lite", "意式蔬菜汤", "平", ["胃气虚", "脾气虚"], ["it-minestrone", "tomato", "bean"], ["意大利"], "意式", "健脾润燥", ["秋"], "杂菜汤", ["杂菜 200 克", "番茄 1 个", "豆类 50 克"], ["蔬菜同煮", "炖 30 分钟"], "秋季润燥健脾汤。"],
  ["it-pasta-olive", "橄榄油意面", "平", ["脾气虚", "肠燥便秘"], ["pasta-dry", "olive-oil", "garlic"], ["意大利"], "意式", "健脾润燥", ["四季"], "主食", ["意面 150 克", "橄榄油 1 汤匙", "蒜末"], ["煮面拌油蒜"], "日常健脾主食控油。"],
  ["it-caprese-salad", "卡普雷塞沙拉", "平", ["胃阴虚", "肝郁气滞"], ["tomato", "mozzarella", "basil-fresh"], ["意大利"], "意式", "清热开胃", ["夏"], "沙拉", ["番茄 2 个", "马苏里拉 80 克", "罗勒叶"], ["切片摆盘", "淋橄榄油"], "暑热食欲差时清鲜。"],
  ["it-risotto-mushroom", "蘑菇烩饭", "平", ["脾气虚", "气血不足"], ["it-risotto", "mushroom", "parmesan"], ["意大利"], "意式", "益气健脾", ["秋"], "烩饭", ["烩饭米 100 克", "蘑菇 80 克"], ["蘑菇炒香", "与米同烩"], "秋季菌菇益气参考。"],
  ["it-pesto-pasta", "青酱意面", "平", ["肝郁气滞", "脾胃气滞"], ["pasta-dry", "it-pesto", "pine-nut-snack"], ["意大利"], "意式", "理气开胃", ["春"], "意面", ["意面 150 克", "青酱 2 汤匙"], ["煮面拌青酱"], "春困食欲差时开胃。"],
  ["it-bolognese-lite", "肉酱面少油", "温", ["脾气虚", "气血不足"], ["it-bolognese", "tomato", "beef"], ["意大利"], "意式", "温胃主食", ["冬"], "肉酱面", ["肉酱 100 克", "意面 150 克"], ["煮面拌酱"], "冬季温补主食适量。"],
  ["it-tiramisu-lite", "提拉米苏小份", "温", ["气血不足", "心脾两虚"], ["it-tiramisu", "coffee", "egg"], ["意大利"], "意式", "补益适量", ["冬"], "甜点", ["提拉米苏 1 小块", "咖啡 1 杯"], ["小份食用"], "控糖适量，失眠少咖啡。"],

  ["fr-onion-soup-lite", "法式洋葱汤", "温", ["脾阳虚", "胃寒"], ["onion", "fr-onion-soup", "mozzarella"], ["法国"], "法式", "温胃散寒", ["冬"], "浓汤", ["洋葱 2 个", "芝士少许"], ["洋葱炒焦糖色", "煮汤"], "冬季暖胃，高钠控量。"],
  ["fr-ratatouille-lite", "普罗旺斯炖菜", "平", ["胃阴虚", "肠燥便秘"], ["fr-ratatouille", "tomato", "eggplant"], ["法国"], "法式", "润燥健脾", ["夏"], "炖菜", ["茄子 1 个", "番茄 2 个", "西葫芦 1 根"], ["蔬菜同炖", "炖 40 分钟"], "夏燥口干时适量。"],
  ["fr-crepe-honey", "可丽饼蜂蜜", "平", ["脾气虚", "气血不足"], ["fr-crepe", "honey", "butter"], ["法国"], "法式", "健脾甜点", ["四季"], "薄饼", ["可丽饼 1 张", "蜂蜜 1 汤匙"], ["饼煎热", "淋蜂蜜"], "控糖适量。"],

  ["gr-greek-salad-lite", "希腊沙拉", "凉", ["湿热内蕴", "肝郁气滞"], ["gr-greek-salad", "cucumber", "olive-oil"], ["希腊"], "地中海式", "清热开胃", ["夏"], "沙拉", ["沙拉 1 碗", "橄榄油 1 汤匙"], ["拌匀食用"], "暑热开胃轻食。"],
  ["gr-tzatziki-veg", "酸奶黄瓜蘸酱", "凉", ["胃阴虚", "暑湿"], ["gr-tzatziki", "cucumber", "garlic"], ["希腊"], "地中海式", "清热开胃", ["夏"], "蘸酱", ["酸奶黄瓜酱 3 汤匙", "蔬菜条"], ["蔬菜蘸酱"], "暑热口干时适量。"],
  ["gr-souvlaki-lite", "希腊烤肉串", "温", ["脾阳虚", "气血不足"], ["gr-souvlaki", "lamb", "vinegar"], ["希腊"], "地中海式", "温补气血", ["冬"], "烤肉", ["羊肉 200 克", "柠檬汁"], ["腌制烤熟"], "冬季温补适量。"],
  ["gr-feta-salad", "羊奶酪沙拉", "平", ["气血不足", "胃气虚"], ["gr-feta", "spinach", "olive-oil"], ["希腊"], "地中海式", "滋阴健脾", ["四季"], "沙拉", ["羊奶酪 50 克", "菠菜 100 克"], ["拌匀食用"], "素食滋阴参考。"],

  ["tr-kebab-lite", "土耳其烤肉卷", "温", ["脾阳虚", "气血不足"], ["tr-kebab", "lamb", "onion"], ["土耳其"], "土耳其式", "温补气血", ["冬"], "烤肉", ["羊肉 200 克", "洋葱 半个"], ["烤肉配饼"], "冬季温补适量。"],
  ["tr-hummus-pita", "鹰嘴豆泥配饼", "平", ["脾气虚", "肠燥便秘"], ["sa-hummus", "chickpea", "olive-oil"], ["土耳其"], "土耳其式", "健脾高蛋白", ["四季"], "素食", ["鹰嘴豆泥 3 汤匙", "烤饼 1 张"], ["蘸食"], "素食健脾参考。"],
  ["tr-lentil-soup", "土耳其扁豆汤", "平", ["脾气虚", "气血不足"], ["tr-lentil-soup", "lentil", "carrot"], ["土耳其"], "土耳其式", "健脾充饥", ["冬"], "汤品", ["扁豆 80 克", "胡萝卜 1 根"], ["扁豆煮汤", "炖 40 分钟"], "冬季健脾汤品。"],
  ["tr-ayran-cooling", "咸酸奶饮", "平", ["暑湿", "胃阴虚"], ["tr-ayran", "yogurt", "salt"], ["土耳其"], "土耳其式", "健脾解暑", ["夏"], "饮品", ["酸奶 200 毫升", "盐少许", "冰水"], ["打匀冰镇"], "暑热解暑控盐。"],

  ["sa-shawarma-lite", "沙威玛少酱", "温", ["脾气虚", "气血不足"], ["sa-shawarma", "chicken", "cucumber"], ["沙特阿拉伯"], "中东式", "温补适量", ["四季"], "卷饼", ["鸡肉 150 克", "黄瓜丝", "卷饼 1 张"], ["鸡肉卷饼"], "日常温补适量。"],
  ["sa-falafel-pita", "法拉费配饼", "平", ["脾气虚", "湿热内蕴"], ["sa-falafel", "chickpea", "tahini"], ["沙特阿拉伯"], "中东式", "健脾素食", ["夏"], "素食", ["法拉费 4 个", "烤饼 1 张"], ["夹饼蘸芝麻酱"], "素食健脾油炸控量。"],
  ["sa-tabouleh-lite", "塔博勒沙拉", "凉", ["湿热内蕴", "肝郁气滞"], ["c23-sa-tabouleh", "parsley", "vinegar"], ["沙特阿拉伯"], "中东式", "清热开胃", ["夏"], "沙拉", ["沙拉 1 碗", "柠檬汁"], ["拌匀食用"], "暑热开胃轻食。"],
  ["il-shakshuka-lite", "北非番茄炖蛋", "温", ["胃气虚", "气血不足"], ["il-shakshuka", "tomato", "egg"], ["以色列"], "中东式", "温胃早餐", ["四季"], "炖蛋", ["番茄 2 个", "鸡蛋 2 个"], ["番茄煮软", "打入鸡蛋"], "早餐温胃易消化。"],

  ["mx-taco-lite", "塔可清版", "温", ["脾气虚", "胃气虚"], ["mx-taco", "beef", "tomato"], ["墨西哥"], "墨西哥式", "温胃主食", ["四季"], "玉米饼", ["玉米饼 2 张", "牛肉末 80 克"], ["牛肉炒香", "夹饼食用"], "日常主食适量。"],
  ["mx-guacamole-salad", "牛油果沙拉", "平", ["胃阴虚", "肠燥便秘"], ["mx-guacamole", "avocado", "vinegar"], ["墨西哥"], "墨西哥式", "润燥开胃", ["夏"], "沙拉", ["牛油果 1 个", "青柠汁", "番茄丁"], ["捣成泥拌蔬菜"], "秋燥口干时适量。"],
  ["mx-bean-soup-lite", "墨西哥豆汤", "平", ["脾气虚", "气血不足"], ["mx-bean-soup", "black-bean", "cumin"], ["墨西哥"], "墨西哥式", "健脾充饥", ["冬"], "豆汤", ["黑豆 80 克", "孜然少许"], ["豆子煮汤", "炖 50 分钟"], "冬季健脾汤品。"],
  ["mx-enchilada-lite", "辣酱卷饼少辣", "热", ["寒湿困脾", "食欲不振"], ["mx-enchilada", "chicken", "cheese"], ["墨西哥"], "墨西哥式", "祛湿开胃", ["冬"], "卷饼", ["鸡肉 150 克", "辣酱少许"], ["卷饼烤热"], "辛辣控量，胃热减量。"],

  ["us-gumbo-lite", "秋葵浓汤", "温", ["寒湿困脾", "脾阳虚"], ["us-gumbo", "shrimp", "okra"], ["美国"], "美式", "温胃祛湿", ["冬"], "浓汤", ["虾仁 80 克", "秋葵 100 克"], ["同煮浓汤", "炖 25 分钟"], "冬季祛湿暖胃。"],
  ["us-oatmeal-breakfast", "美式燕麦粥", "平", ["脾气虚", "肠燥便秘"], ["c23-us-oatmeal", "honey", "apple"], ["美国"], "美式", "健脾润肠", ["秋"], "早餐", ["燕麦 50 克", "苹果丁", "蜂蜜少许"], ["燕麦煮粥", "拌苹果"], "秋季润肠早餐控糖。"],
  ["us-clam-chowder-lite", "蛤蜊浓汤清版", "温", ["气血不足", "胃气虚"], ["us-clam-chowder", "clam", "potato"], ["美国"], "美式", "益气补虚", ["冬"], "浓汤", ["蛤蜊 150 克", "土豆 1 个"], ["蛤蜊煮汤", "加土豆"], "体虚乏力时适量。"],
  ["us-caesar-salad-lite", "凯撒沙拉少酱", "平", ["脾胃气滞", "湿热内蕴"], ["us-caesar-salad", "lettuce", "chicken"], ["美国"], "美式", "健脾轻食", ["夏"], "沙拉", ["生菜 150 克", "鸡肉 80 克"], ["拌沙拉酱食用"], "控油适量。"],

  ["br-feijoada-lite", "巴西黑豆炖肉", "温", ["脾阳虚", "气血不足"], ["br-feijoada", "black-bean", "pork"], ["巴西"], "巴西式", "温中补虚", ["冬"], "炖菜", ["黑豆 80 克", "猪肉 100 克"], ["豆子炖肉", "炖 60 分钟"], "冬季温补适量。"],
  ["br-acai-bowl-lite", "巴西莓碗", "凉", ["肝郁气滞", "暑湿"], ["br-acai-bowl", "banana", "honey"], ["巴西"], "巴西式", "清热抗氧化", ["夏"], "早餐碗", ["巴西莓泥 100 克", "香蕉 半根"], ["装碗配水果"], "控糖适量。"],
  ["ca-maple-oat", "枫糖燕麦", "平", ["脾气虚", "气血不足"], ["ca-maple-syrup", "oats", "milk"], ["加拿大"], "加式", "健脾早餐", ["秋"], "早餐", ["燕麦 50 克", "枫糖浆 1 茶匙"], ["燕麦煮粥", "淋枫糖"], "控糖适量。"],
  ["ca-salmon-smoked", "熏三文鱼轻食", "平", ["气血不足", "胃阴虚"], ["ca-smoked-salmon", "cucumber", "rice"], ["加拿大"], "加式", "滋阴补虚", ["四季"], "轻食", ["熏三文鱼 80 克", "黄瓜片", "米饭少许"], ["摆盘同食"], "高蛋白适量。"]
];

const rows = filterRecipeSeedTuples(TUPLES).map(t).filter(Boolean);
const total = mergeAndWriteRecipeJson("regional-recipes-batch6.json", rows);
console.log(`regional-recipes-batch6.json: +${rows.length} seeded, ${total} total`);
