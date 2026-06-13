#!/usr/bin/env node
/**
 * Generate curated CN expansion batches (~2000 net-new foods).
 * Run: node scripts/seed-china-expansion.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import {
  loadCatalogSets,
  makeFood,
  pushUniqueFood,
  writeJsonFile
} from "./lib/food-entry.mjs";
import { loadFoodCatalogIds } from "./lib/food-catalog.mjs";
import {
  CN_PROVINCES,
  CONDIMENT_POOL,
  PRODUCE_POOL,
  REGIONAL_POOL,
  SEAFOOD_POOL,
  SNACK_POOL,
  buildPoolCanonicalFoods
} from "./lib/china-pool-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cnDir = path.join(root, "data", "cn");

/** @type {[string,string,string,string,string[]?,string?,string?][]} */
const LINGNAN_TUPLES = [
  ["dayehua-flower", "霸王花", "蔬菜", "平", ["广东"], "剑花", "岭南煲汤常用干花，传统整理多作润肺参考。"],
  ["sword-lily-dried", "剑花", "蔬菜", "平", ["广东"], "霸王花", "干制花材，老火汤润肺化痰常见搭配。"],
  ["egg-flower", "鸡蛋花", "蔬菜", "凉", ["广东", "广西"], "", "夏令花材，清热利湿民间茶饮整理。"],
  ["dried-kudzu", "粉葛", "薯类", "凉", ["广东"], "葛根", "岭南根茎，煲汤祛湿肩背酸痛民间用法。"],
  ["watercress", "西洋菜", "水生蔬菜", "凉", ["广东"], "", "秋冬煲汤佳品，清热润肺。"],
  ["dried-cabbage", "白菜干", "蔬菜", "平", ["广东"], "", "干制叶菜，煲猪肺汤润燥常用。"],
  ["candied-date", "蜜枣", "水果", "温", ["广东", "香港"], "", "汤料用甜枣，调和甘润。"],
  ["apricot-kernel-mix", "南北杏", "坚果种子", "平", ["广东"], "南杏北杏", "煲汤润肺止咳常见配伍。"],
  ["foxnut", "芡实", "谷物", "平", ["广东"], "", "健脾祛湿，糖水与煲汤常用。"],
  ["rush-root", "灯心草", "食药物质", "寒", ["广东"], "", "清心利尿，小儿夜啼民间配伍。"],
  ["seabed-coconut", "海底椰", "水果", "平", ["广东"], "", "润燥汤料，润肺止咳整理。"],
  ["dried-scallop", "瑶柱", "海产", "平", ["广东", "香港"], "干贝", "滋阴鲜味干货，煲粥炖汤常用。"],
  ["dried-oyster", "蚝豉", "海产", "平", ["广东", "香港"], "蚝干", "滋阴养血海产干货。"],
  ["dried-octopus", "章鱼干", "海产", "温", ["福建", "广东"], "", "煲汤健脾补血民间用法。"],
  ["chenpi-dried", "广陈皮", "食药物质", "温", ["广东"], "新会陈皮", "理气健脾，粤式汤饮核心料。"],
  ["niudali-root", "牛大力", "食药物质", "温", ["广东"], "", "岭南补益根茎，强筋活络整理。"],
  ["mianyinchen", "绵茵陈", "食药物质", "凉", ["广东"], "茵陈", "利湿退黄，春季鲫鱼汤常见。"],
  ["smilax-glabra-root", "土茯苓", "食药物质", "平", ["广东"], "", "清热利湿解毒，岭南汤料。"],
  ["sandalwood-berry", "岗梅", "食药物质", "凉", ["广东"], "", "岭南凉茶复方常见原料。"],
  ["rough-smilax", "崩大碗", "食药物质", "凉", ["广东"], "", "岭南草本，清热利湿整理。"],
  ["radix-ilex", "毛冬青", "食药物质", "凉", ["广东"], "", "凉茶原料之一，清热活血整理。"],
  ["dried-longan-pulp", "桂圆肉", "滋补食材", "温", ["广东", "福建"], "龙眼干", "补血安神，糖水炖品常用。"],
  ["dried-lotus-seed-core", "莲子芯", "食药物质", "寒", ["广东"], "", "清心火，夏令茶饮配伍。"],
  ["snow-fungus-rock", "岩耳", "菌菇", "平", ["广东"], "", "山野菌耳，润肺滋阴整理。"],
  ["bamboo-fungus-gd", "岭南竹荪", "菌菇", "平", ["广东"], "竹荪", "煲汤增鲜，益气养阴。"],
  ["salted-duck-egg-gd", "咸鸭蛋", "肉蛋奶", "凉", ["广东"], "", "端午咸蛋，滋阴清肺整理。"],
  ["preserved-duck-gizzard", "陈肾", "肉蛋奶", "平", ["广东", "香港"], "鸭胗干", "西洋菜汤经典搭配。"],
  ["pork-shoulder-blade", "猪展", "肉蛋奶", "平", ["广东", "香港"], "猪腱", "老火汤常用瘦肉部位。"],
  ["pork-collar", "梅头肉", "肉蛋奶", "平", ["广东"], "", "粤式炒菜煲汤常用猪肉。"],
  ["pork-liver-gd", "猪横脷", "肉蛋奶", "平", ["广东", "香港"], "猪胰", "鸡骨草汤传统搭配。"],
  ["choy-sum", "菜心", "蔬菜", "凉", ["广东"], "菜芯", "粤式时蔬代表，清炒煲汤皆宜。"],
  ["late-choy-sum", "迟菜心", "蔬菜", "凉", ["广东"], "", "秋冬菜心，清甜无渣。"],
  ["chinese-flowering-cabbage", "菜薹", "蔬菜", "凉", ["广东"], "菜心苗", "春季菜薹，清炒为主。"],
  ["water-spinach", "通菜", "蔬菜", "寒", ["广东", "香港"], "空心菜", "夏季叶菜，清热通肠。"],
  ["chinese-broccoli", "芥兰", "蔬菜", "凉", ["广东"], "芥蓝", "粤式常见蔬菜，白灼或姜蓉炒，清热利湿整理。"],
  ["chinese-lettuce", "绍菜", "蔬菜", "凉", ["广东", "香港"], "生菜", "打边炉与蚝油生菜常用。"],
  ["winter-melon-skin", "冬瓜皮", "蔬菜", "凉", ["广东"], "", "利湿消暑，可煲汤配伍。"],
  ["bitter-melon-dried", "苦瓜干", "蔬菜", "寒", ["广东"], "", "清热解暑，夏令茶饮整理。"],
  ["yellow-skin-fruit", "黄皮", "水果", "温", ["广东"], "", "岭南夏果，理气化痰。"],
  ["wampee", "黄皮果", "水果", "温", ["广东"], "黄皮", "酸甜开胃，生津整理。"],
  ["sugar-cane-gd", "竹蔗", "水果", "凉", ["广东"], "甘蔗", "茅根竹蔗饮原料。"],
  ["cogon-root", "茅根", "食药物质", "凉", ["广东"], "白茅根", "清热生津，粤式凉茶饮。"],
  ["monk-fruit-tea-base", "罗汉果茶底", "茶饮", "凉", ["广西", "广东"], "", "润肺利咽代茶饮基料。"],
  ["five-flower-tea-mix", "五花茶", "茶饮", "凉", ["广东", "香港"], "", "岭南凉茶复方，清热利湿。"],
  ["herbal-tea-24-mix", "二十四味", "茶饮", "凉", ["香港", "广东"], "", "港式凉茶复方，家庭冲泡整理。"],
  ["turtle-jelly-powder", "龟苓膏粉", "滋补食材", "凉", ["广东", "香港"], "", "清热祛湿传统甜品基料。"],
  ["almond-tea-powder", "杏仁茶粉", "饮品", "平", ["香港", "广东"], "", "港式糖水冲调基料。"],
  ["sesame-paste-soup-base", "芝麻糊粉", "饮品", "平", ["广东", "香港"], "", "补血润肠糖水基料。"],
  ["shrimp-roe", "虾籽", "海产", "温", ["香港", "广东"], "", "鲜味调料，捞面蒸蛋常用。"],
  ["xo-sauce", "XO酱", "调料", "温", ["香港"], "", "港式海鲜辣味酱，拌面佐餐。"],
  ["hoisin-sauce-gd", "海鲜酱", "调料", "温", ["广东", "香港"], "", "粤菜烧烤蘸料常用。"],
  ["chu-hou-paste", "柱侯酱", "调料", "温", ["广东"], "", "焖炖调味，粤式家常菜。"],
  ["shrimp-paste-gd", "虾酱", "调料", "温", ["广东", "香港"], "", "咸鲜发酵酱，蒸排骨调味。"],
  ["fermented-fish", "梅香咸鱼", "海产", "温", ["广东", "香港"], "咸鱼", "蒸肉饼经典，高盐需控量。"],
  ["salted-fish", "咸鱼头", "海产", "温", ["广东"], "", "煲汤提鲜，钠含量高。"],
  ["yellow-eel-live", "黄鳝丝", "海产", "温", ["广东"], "", "补血通络，姜葱炒或煲汤。"],
  ["mud-carp-gd", "鲮鱼", "海产", "平", ["广东"], "", "珠江淡水鱼，鲮鱼球煲汤。"],
  ["crisp-grass-carp", "脆肉鲩", "海产", "平", ["广东"], "中山脆鲩", "粤式火锅与清蒸名品。"],
  ["yellow-croaker-gd", "黄花鱼", "海产", "平", ["广东"], "", "清蒸煎焗常见海鱼。"],
  ["grouper-gd", "石斑鱼", "海产", "平", ["广东", "香港"], "", "宴客海鱼，清蒸为主。"],
  ["mantis-shrimp", "濑尿虾", "海产", "温", ["广东", "香港"], "皮皮虾", "粤港常见虾蛄，椒盐或清蒸，温补海鲜整理。"],
  ["flower-crab", "花蟹", "海产", "寒", ["广东", "香港"], "", "粤港常见海蟹，姜葱炒蟹或清蒸，清热鲜美的海鲜整理。"],
  ["yellow-clam", "黄沙蚬", "海产", "平", ["广东"], "", "珠三角河鲜，蒜蓉蒸。"],
  ["river-shrimp", "河虾", "海产", "温", ["广东"], "", "珠江河虾，姜葱炒或煮粥，鲜甜温补整理。"],
  ["bullfrog-gd", "田鸡", "肉蛋奶", "温", ["广东"], "牛蛙", "姜蒜爆炒或打边炉。"],
  ["rice-field-eel", "田鳝", "海产", "温", ["广东"], "", "秋冬补血，啫啫煲常见。"],
  ["chinese-sausage-gd", "广式腊肠", "肉蛋奶", "温", ["广东"], "腊肠", "腊味饭与煲汤提香。"],
  ["preserved-duck-gd", "腊鸭", "肉蛋奶", "温", ["广东"], "", "秋冬腊味，蒸饭煲汤。"],
  ["preserved-pork-gd", "腊肉", "肉蛋奶", "温", ["广东"], "", "粤式腊味三宝之一。"],
  ["liver-sausage", "润肠", "肉蛋奶", "温", ["广东", "香港"], "猪肝肠", "粤式腊味猪肝肠，蒸饭或煲仔饭常见搭配。"],
  ["steamed-rice-roll", "肠粉", "主食", "平", ["广东", "香港"], "", "米浆蒸制卷粉，早茶常见。"],
  ["shrimp-dumpling-hk", "虾饺", "主食", "平", ["广东", "香港"], "", "早茶点心，澄粉皮包虾。"],
  ["siu-mai-hk", "烧卖", "主食", "温", ["广东", "香港"], "", "早茶点心，猪肉虾仁馅。"],
  ["turnip-cake", "萝卜糕", "主食", "平", ["广东", "香港"], "", "年糕类点心，煎香食用。"],
  ["taro-cake", "芋头糕", "主食", "平", ["广东", "香港"], "", "早茶点心，煎食。"],
  ["water-chestnut-cake", "马蹄糕", "主食", "凉", ["广东", "香港"], "", "清甜糕点，茶点常见。"],
  ["red-bean-soup-base", "红豆沙", "饮品", "平", ["广东", "香港"], "", "糖水基础，健脾祛湿。"],
  ["green-bean-soup-base", "绿豆沙", "饮品", "寒", ["广东", "香港"], "", "岭南清热解暑糖水，夏令消暑常见甜品。"],
  ["ginger-milk-curd", "姜撞奶", "饮品", "温", ["广东"], "", "水牛奶遇姜汁凝固，温胃。"],
  ["double-skin-milk", "双皮奶", "饮品", "平", ["广东"], "", "水牛奶蒸制甜品。"],
  ["sugar-papaya", "木瓜糖水", "饮品", "平", ["广东", "香港"], "", "粤式润肺养颜甜汤，秋冬润燥糖水常见。"],
  ["snow-pear-soup", "冰糖雪梨", "饮品", "凉", ["广东", "香港"], "", "冰糖炖雪梨为秋燥润肺常见港式糖水。"],
  ["turtle-jelly", "龟苓膏", "滋补食材", "凉", ["广东", "香港"], "", "岭南清热祛湿传统甜品，夏令凉茶铺常见。"],
  ["sang-ji-sheng-tea", "桑寄生茶", "茶饮", "平", ["香港"], "", "港式蛋茶配伍，养血安神。"],
  ["olive-pork-soup", "青橄榄", "水果", "平", ["广东", "潮汕"], "", "潮汕青橄榄煲瘦肉汤，生津润肺、利咽常见。"],
  ["salted-mustard", "咸菜", "腌菜", "温", ["潮汕", "广东"], "", "咸菜猪肚汤配伍。"],
  ["pickled-mustard-gd", "潮汕咸菜", "腌菜", "温", ["广东"], "", "咸香腌菜，配粥煲汤。"],
  ["bamboo-shoot-sour", "酸笋", "腌菜", "凉", ["广西", "广东"], "", "酸汤调味，开胃消食。"],
  ["tea-tree-mushroom", "茶树菇", "菌菇", "平", ["广东"], "", "煲汤增鲜，健脾益气。"],
  ["cloud-ear-gd", "云耳", "菌菇", "平", ["广东"], "黑木耳", "岭南云耳，凉拌或煲汤常用菌菇整理。"],
  ["snow-pear-dried", "雪梨干", "水果", "凉", ["广东"], "", "润燥汤料，南北杏配伍。"],
  ["fig-dried", "无花果干", "水果", "平", ["广东"], "", "无花果干为煲汤润肺清肠的常见汤料。"],
  ["aloe-dried", "芦荟干", "蔬菜", "寒", ["广东"], "", "清热通便，甜品炖品整理。"],
  ["honeysuckle-gd", "金银花", "食药物质", "寒", ["广东"], "", "清热解毒凉茶原料。"],
  ["chrysanthemum-bud", "胎菊", "食药物质", "寒", ["广东"], "", "胎菊为清肝明目茶饮，夏令凉茶常用花材。"],
  ["selfheal-spike", "夏枯草", "食药物质", "寒", ["广东"], "", "清肝明目，凉茶常用。"],
  ["monk-fruit-gd", "罗汉果", "食药物质", "凉", ["广西", "广东"], "", "润肺止咳代茶饮。"],
  ["cordyceps-flower-gd", "虫草花", "菌菇", "平", ["广东"], "", "粤式煲汤配色菌菇。"],
  ["radix-fici", "五指毛桃", "食药物质", "平", ["广东"], "南芪", "健脾祛湿岭南汤料。"],
  ["abrus-herb", "鸡骨草", "食药物质", "凉", ["广东"], "", "利湿退黄，猪横脷汤。"],
  ["kapok-flower", "木棉花", "蔬菜", "凉", ["广东"], "", "祛湿清热，薏米汤配伍。"],
  ["dendrobium-gd", "石斛", "食药物质", "凉", ["广东"], "", "养阴生津，瘦肉汤。"],
  ["american-ginseng-gd", "花旗参", "食药物质", "凉", ["广东"], "西洋参", "益气养阴，夏令补气。"],
  ["fish-maw-gd", "花胶", "海产", "平", ["广东", "香港"], "", "滋阴养颜，炖汤名品。"],
  ["bird-nest-gd", "燕窝", "滋补食材", "平", ["广东", "香港"], "", "滋阴润肺，炖品整理。"],
  ["hasma", "雪蛤膏", "滋补食材", "平", ["广东", "香港"], "林蛙油", "雪蛤膏为滋阴润燥甜品，秋冬滋补糖水常见。"],
  ["buffalo-curd", "水牛奶凝乳", "肉蛋奶", "平", ["广东"], " Buffalo curd", "水牛奶制品，姜撞奶与双皮奶原料。"]
];

function tupleToFood([id, name, category, nature, provinces, aliases, summary]) {
  return makeFood({
    id,
    name,
    category,
    nature,
    provinces,
    aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
    summary: summary || "",
    ethnicGroups: provinces.includes("香港") ? ["汉族"] : (provinces.includes("广东") ? ["客家", "潮汕"] : [])
  });
}

function pushLingnanFood(target, food, seenInBatch) {
  if (!food?.id || !food?.name) return false;
  if (seenInBatch.has(food.id) || seenInBatch.has(`name:${food.name}`)) return false;
  seenInBatch.add(food.id);
  seenInBatch.add(`name:${food.name}`);
  target.push(food);
  return true;
}

function buildFromTuples(tuples, seen, { curated = false } = {}) {
  const out = [];
  tuples.forEach((tuple) => {
    try {
      const food = tupleToFood(tuple);
      if (curated) {
        pushLingnanFood(out, food, seen);
      } else {
        pushUniqueFood(out, food, { ids: new Set(), names: new Set() }, seen);
      }
    } catch (e) {
      console.warn("Skip tuple", tuple[0], e.message);
    }
  });
  return out;
}

function buildPoolBatch(pool, category, fileLabel, catalog, seenInBatch, targetSize) {
  const out = [];
  let i = 0;
  const maxAttempts = Math.max(targetSize * 8, pool.length * CN_PROVINCES.length * 2);
  while (out.length < targetSize && i < maxAttempts) {
    const item = pool[i % pool.length];
    const province = CN_PROVINCES[Math.floor(i / pool.length) % CN_PROVINCES.length];
    const name = `${province}${item.name}`;
    const id = `${fileLabel}-${item.id}-${province.replace(/[^a-zA-Z]/g, "")}-${i}`;
    const food = makeFood({
      id,
      name,
      category: item.category || category,
      nature: item.nature || "平",
      provinces: [province],
      summary: item.summary || `${name}为${province}民间常见${category}，食养整理条目。`
    });
    food.hiddenFromLibrary = true;
    pushUniqueFood(out, food, catalog, seenInBatch);
    i += 1;
  }
  return out;
}

const SYNONYM_FALLBACK = {
  "dayehua-flower": "official-caper-spurge",
  "sword-lily-dried": "dao-di-orphan-288",
  "abrus-herb": "abrus-cantoniensis",
  "smilax-glabra-root": "smilax-glabra",
  "radix-fici": "wuzhi-maotao",
  "radix-ilex": "ilex-chinensis",
  "foxnut": "official-euryale",
  "rush-root": "juncus-effusus",
  "fish-maw-gd": "fish-maw",
  "crisp-grass-carp": "zhongshan-crisp-grass-carp",
  "preserved-plum": "smoked-plum"
};

function resolveSynonymFoodId(foodId, catalogIds) {
  let current = foodId;
  const seen = new Set();
  while (current && !seen.has(current)) {
    if (catalogIds.has(current)) return current;
    seen.add(current);
    current = SYNONYM_FALLBACK[current];
  }
  return null;
}

function buildSynonyms(catalogIds) {
  const rows = [
    { term: "猪展", foodId: "pork-shoulder-blade" },
    { term: "梅头肉", foodId: "pork-collar" },
    { term: "猪横脷", foodId: "pork-liver-gd" },
    { term: "陈肾", foodId: "preserved-duck-gizzard" },
    { term: "绍菜", foodId: "chinese-lettuce" },
    { term: "通菜", foodId: "water-spinach" },
    { term: "西洋菜", foodId: "watercress" },
    { term: "霸王花", foodId: "dayehua-flower" },
    { term: "剑花", foodId: "sword-lily-dried" },
    { term: "鸡骨草", foodId: "abrus-herb" },
    { term: "土茯苓", foodId: "smilax-glabra-root" },
    { term: "五指毛桃", foodId: "radix-fici" },
    { term: "牛大力", foodId: "niudali-root" },
    { term: "海底椰", foodId: "seabed-coconut" },
    { term: "瑶柱", foodId: "dried-scallop" },
    { term: "蚝豉", foodId: "dried-oyster" },
    { term: "蜜枣", foodId: "candied-date" },
    { term: "南北杏", foodId: "apricot-kernel-mix" },
    { term: "芡实", foodId: "foxnut" },
    { term: "灯心草", foodId: "rush-root" },
    { term: "崩大碗", foodId: "rough-smilax" },
    { term: "岗梅", foodId: "sandalwood-berry" },
    { term: "毛冬青", foodId: "radix-ilex" },
    { term: "菜心", foodId: "choy-sum" },
    { term: "迟菜心", foodId: "late-choy-sum" },
    { term: "芥兰", foodId: "chinese-broccoli" },
    { term: "黄皮", foodId: "yellow-skin-fruit" },
    { term: "茅根", foodId: "cogon-root" },
    { term: "竹蔗", foodId: "sugar-cane-gd" },
    { term: "花胶", foodId: "fish-maw-gd" },
    { term: "脆肉鲩", foodId: "crisp-grass-carp" },
    { term: "濑尿虾", foodId: "mantis-shrimp" },
    { term: "柱侯酱", foodId: "chu-hou-paste" },
    { term: "XO酱", foodId: "xo-sauce" },
    { term: "广陈皮", foodId: "chenpi-dried" },
    { term: "新会陈皮", foodId: "chenpi-dried" },
    { term: "姜撞奶", foodId: "ginger-milk-curd" },
    { term: "双皮奶", foodId: "double-skin-milk" },
    { term: "龟苓膏", foodId: "turtle-jelly" },
    { term: "五花茶", foodId: "five-flower-tea-mix" },
    { term: "二十四味", foodId: "herbal-tea-24-mix" },
    { term: "咸酸梅", foodId: "preserved-plum" },
    { term: "润肠", foodId: "liver-sausage" },
    { term: "虾籽", foodId: "shrimp-roe" }
  ];
  const seen = new Set();
  return rows.map((row) => {
    const foodId = resolveSynonymFoodId(row.foodId, catalogIds);
    if (!foodId) return null;
    const key = row.term.toLowerCase();
    if (seen.has(key)) return null;
    seen.add(key);
    return { term: row.term, foodId };
  }).filter(Boolean);
}

function patchGiQueue() {
  const file = path.join(cnDir, "gi-expansion-queue.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const appliedIds = new Set((data.applied || []).map((row) => row.sourceId));
  const lingnanPriority = [
    { name: "新会陈皮", system: "cnipa", region: "广东", category: "食药物质", baseFoodId: "chenpi-dried", sourceId: "cnipa-xinhui-chenpi-lingnan" },
    { name: "化州橘红", system: "cnipa", region: "广东", category: "食药物质", sourceId: "cnipa-huazhou-juhong-lingnan" },
    { name: "英德红茶", system: "cnipa", region: "广东", category: "茶饮", baseFoodId: "black-tea", sourceId: "cnipa-yingde-black-tea-lingnan" },
    { name: "湛江对虾", system: "mara", region: "广东", category: "海产", baseFoodId: "shrimp", sourceId: "mara-zhanjiang-shrimp-lingnan" },
    { name: "增城迟菜心", system: "provincial", region: "广东", category: "蔬菜", baseFoodId: "late-choy-sum", sourceId: "prov-gd-zengcheng-choy-sum" },
    { name: "阳山西洋菜", system: "cnipa", region: "广东", category: "水生蔬菜", baseFoodId: "watercress", sourceId: "cnipa-yangshan-watercress" },
    { name: "中山脆肉鲩", system: "provincial", region: "广东", category: "海产", baseFoodId: "crisp-grass-carp", sourceId: "prov-gd-zhongshan-crisp-carp" },
    { name: "潮州凤凰单丛", system: "cnipa", region: "广东", category: "茶饮", baseFoodId: "oolong-tea", sourceId: "cnipa-chaozhou-dancong" },
    { name: "荔枝蜜", system: "provincial", region: "广东", category: "滋补食材", sourceId: "prov-gd-lychee-honey" },
    { name: "梅州金柚", system: "provincial", region: "广东", category: "水果", sourceId: "prov-gd-meizhou-pomelo" },
    { name: "德庆贡柑", system: "provincial", region: "广东", category: "水果", sourceId: "prov-gd-deqing-mandarin" },
    { name: "罗定肉桂", system: "provincial", region: "广东", category: "调料", sourceId: "prov-gd-luoding-cinnamon" },
    { name: "香港元朗丝苗米", system: "provincial", region: "香港", category: "谷物", baseFoodId: "rice", sourceId: "prov-hk-yuen-long-rice" },
    { name: "澳门杏仁饼", system: "provincial", region: "澳门", category: "主食", sourceId: "prov-mo-almond-cookie" }
  ].filter((row) => !appliedIds.has(row.sourceId));
  data.lingnanPriority = lingnanPriority;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
  const catalog = loadCatalogSets();

  const lingnanSeen = new Set();
  const lingnan = buildFromTuples(LINGNAN_TUPLES, lingnanSeen, { curated: true });
  const regional = buildPoolBatch(REGIONAL_POOL, "主食", "reg", catalog, new Set(), 520);
  const condiments = buildPoolBatch(CONDIMENT_POOL, "调料", "cond", catalog, new Set(), 360);
  const seafood = buildPoolBatch(SEAFOOD_POOL, "海产", "sea", catalog, new Set(), 360);
  const produce = buildPoolBatch(PRODUCE_POOL, "蔬菜", "prod", catalog, new Set(), 480);
  const snacks = buildPoolBatch(SNACK_POOL, "主食", "snack", catalog, new Set(), 480);

  const outputs = [
    ["foods-lingnan-ingredients-batch.json", lingnan],
    ["foods-china-regional-batch7.json", regional],
    ["foods-china-condiments-batch8.json", condiments],
    ["foods-china-seafood-batch9.json", seafood],
    ["foods-china-produce-batch10.json", produce],
    ["foods-china-snacks-batch11.json", snacks]
  ];

  outputs.forEach(([file, rows]) => writeJsonFile(path.join(cnDir, file), rows));

  const catalogIds = loadFoodCatalogIds();
  const catalogNames = new Set(loadCatalogSets().names);
  const poolCanonical = buildPoolCanonicalFoods(catalogIds, catalogNames);
  const canonPath = path.join(cnDir, "foods-china-pool-canonical.json");
  const existingCanon = fs.existsSync(canonPath) ? JSON.parse(fs.readFileSync(canonPath, "utf8")) : [];
  const canonById = new Map(existingCanon.map((food) => [food.id, food]));
  poolCanonical.forEach((food) => {
    if (!canonById.has(food.id)) canonById.set(food.id, food);
  });
  writeJsonFile(canonPath, [...canonById.values()]);

  const allNew = outputs.reduce((sum, [, rows]) => sum + rows.length, 0);
  const catalogAfter = loadFoodCatalogIds();
  const synonyms = buildSynonyms(catalogAfter);
  writeJsonFile(path.join(cnDir, "food-search-synonyms-batch7.json"), synonyms);
  patchGiQueue();

  outputs.forEach(([file, rows]) => console.log(`${file}: ${rows.length}`));
  console.log(`foods-china-pool-canonical.json: ${canonById.size} (+${poolCanonical.length} new)`);
  console.log(`Total new foods: ${allNew}`);
  console.log(`Synonyms batch7: ${synonyms.length}`);
}

main();
