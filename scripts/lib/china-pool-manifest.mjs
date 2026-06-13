/** Shared China expansion pool definitions — single source for seed + consolidation. */
import { makeFood } from "./food-entry.mjs";

export const CN_PROVINCES = [
  "广东", "香港", "澳门", "广西", "福建", "海南", "湖南", "湖北", "江西", "四川",
  "重庆", "云南", "贵州", "浙江", "江苏", "上海", "安徽", "山东", "河南", "河北",
  "山西", "陕西", "甘肃", "青海", "宁夏", "新疆", "西藏", "内蒙古", "辽宁", "吉林",
  "黑龙江", "北京", "天津"
];

export const POOL_BATCH_FILES = [
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json"
];

export const CONDIMENT_POOL = [
  { id: "bean-paste", name: "黄豆酱", nature: "温" },
  { id: "sweet-bean-sauce", name: "甜面酱", nature: "温" },
  { id: "chili-bean-paste", name: "辣豆瓣酱", nature: "热" },
  { id: "fermented-tofu-white", name: "白腐乳", nature: "温" },
  { id: "fermented-tofu-rose", name: "玫瑰腐乳", nature: "温" },
  { id: "sesame-oil", name: "芝麻油", nature: "平" },
  { id: "chili-oil", name: "辣椒油", nature: "热" },
  { id: "sichuan-pepper-oil", name: "花椒油", nature: "温" },
  { id: "oyster-sauce", name: "蚝油", nature: "平" },
  { id: "shrimp-sauce", name: "虾酱", nature: "温" },
  { id: "fish-sauce-gd", name: "鱼露", nature: "温" },
  { id: "rice-wine-cooking", name: "料酒", nature: "温" },
  { id: "yellow-rice-wine", name: "黄酒", nature: "温" },
  { id: "rose-fermented-wine", name: "玫瑰露酒", nature: "温" },
  { id: "preserved-plum", name: "咸酸梅", nature: "温" },
  { id: "master-stock", name: "卤水汁", nature: "温" },
  { id: "five-spice-powder", name: "五香粉", nature: "温" },
  { id: "curry-powder-cn", name: "咖喱粉", nature: "温" },
  { id: "satay-sauce", name: "沙茶酱", nature: "温" },
  { id: "bbq-sauce-cn", name: "叉烧酱", nature: "温" }
];

export const SEAFOOD_POOL = [
  { id: "hairtail", name: "带鱼", nature: "温" },
  { id: "spanish-mackerel", name: "马鲛鱼", nature: "温" },
  { id: "pomfret", name: "鲳鱼", nature: "平" },
  { id: "yellow-fin-tuna", name: "黄鳍金枪鱼", nature: "温" },
  { id: "squid-tube", name: "鱿鱼筒", nature: "平" },
  { id: "cuttlefish", name: "墨鱼", nature: "平" },
  { id: "dried-squid", name: "鱿鱼干", nature: "温" },
  { id: "dried-cuttlefish", name: "墨鱼干", nature: "温" },
  { id: "clams", name: "花甲", nature: "寒" },
  { id: "razor-clam", name: "蛏子", nature: "寒" },
  { id: "oyster-meat", name: "生蚝肉", nature: "凉" },
  { id: "abalone-small", name: "鲍鱼仔", nature: "平" },
  { id: "sea-cucumber-dried", name: "海参干", nature: "温" },
  { id: "seaweed-sheet", name: "紫菜", nature: "寒" },
  { id: "kelp-knot", name: "海带结", nature: "寒" },
  { id: "whitebait", name: "银鱼", nature: "平" },
  { id: "anchovy", name: "凤尾鱼", nature: "温" },
  { id: "yellow-croaker-dried", name: "黄花鱼干", nature: "温" },
  { id: "fish-ball", name: "鱼丸", nature: "平" },
  { id: "shrimp-paste-ball", name: "虾滑", nature: "温" }
];

export const PRODUCE_POOL = [
  { id: "bok-choy", name: "小白菜", nature: "凉" },
  { id: "shanghai-greens", name: "上海青", nature: "凉" },
  { id: "chinese-cabbage", name: "大白菜", nature: "平" },
  { id: "mustard-greens", name: "芥菜", nature: "温" },
  { id: "amaranth", name: "苋菜", nature: "凉" },
  { id: "malabar-spinach", name: "木耳菜", nature: "凉" },
  { id: "water-spinach-tip", name: "空心菜苗", nature: "寒" },
  { id: "garlic-chive", name: "韭菜", nature: "温" },
  { id: "chive-flower", name: "韭菜花", nature: "温" },
  { id: "winter-gourd", name: "节瓜", nature: "凉" },
  { id: "bitter-gourd", name: "凉瓜", nature: "寒" },
  { id: "luffa", name: "丝瓜", nature: "凉" },
  { id: "snake-gourd", name: "蛇瓜", nature: "凉" },
  { id: "chayote", name: "佛手瓜", nature: "凉" },
  { id: "okra", name: "秋葵", nature: "凉" },
  { id: "yardlong-bean", name: "长豆角", nature: "平" },
  { id: "snow-pea", name: "荷兰豆", nature: "平" },
  { id: "sugar-snap", name: "甜豆", nature: "平" },
  { id: "lotus-seedpod", name: "莲蓬", nature: "平" },
  { id: "pomelo", name: "柚子", nature: "凉" }
];

export const SNACK_POOL = [
  { id: "rice-noodle-roll", name: "卷粉", nature: "平" },
  { id: "rice-flour-cake", name: "米糕", nature: "平" },
  { id: "glutinous-rice-ball", name: "糯米糍", nature: "温" },
  { id: "sesame-ball", name: "煎堆", nature: "温" },
  { id: "turnip-pudding", name: "萝卜糕", nature: "平" },
  { id: "taro-pudding", name: "芋头糕", nature: "平" },
  { id: "rice-dumpling-salty", name: "咸肉粽", nature: "温" },
  { id: "rice-dumpling-sweet", name: "碱水粽", nature: "平" },
  { id: "steamed-bun", name: "包子", nature: "平" },
  { id: "mantou", name: "馒头", nature: "平" },
  { id: "scallion-pancake", name: "葱油饼", nature: "温" },
  { id: "fried-dough-twist", name: "麻花", nature: "温" },
  { id: "rice-cracker", name: "米饼", nature: "平" },
  { id: "soy-milk-hot", name: "热豆浆", nature: "平" },
  { id: "tofu-pudding", name: "豆腐花", nature: "凉" },
  { id: "grass-jelly", name: "凉粉", nature: "凉" },
  { id: "sweet-potato-ginger", name: "番薯姜糖水", nature: "温" },
  { id: "egg-waffle", name: "鸡蛋仔", nature: "平" },
  { id: "pineapple-bun", name: "菠萝包", nature: "平" },
  { id: "wife-cake", name: "老婆饼", nature: "温" }
];

export const REGIONAL_EXTRA_POOL = [
  { id: "hand-pulled-noodle", name: "拉面", category: "主食", nature: "平" },
  { id: "knife-cut-noodle", name: "刀削面", category: "主食", nature: "平" },
  { id: "liangpi", name: "凉皮", category: "主食", nature: "凉" },
  { id: "roujiamo", name: "肉夹馍", category: "主食", nature: "温" },
  { id: "steamed-bread", name: "发糕", category: "主食", nature: "平" }
];

export const REGIONAL_POOL = [
  ...CONDIMENT_POOL,
  ...SEAFOOD_POOL,
  ...PRODUCE_POOL,
  ...SNACK_POOL,
  ...REGIONAL_EXTRA_POOL
];

const POOL_WITH_CATEGORY = [
  ...CONDIMENT_POOL.map((item) => ({ ...item, category: "调料" })),
  ...SEAFOOD_POOL.map((item) => ({ ...item, category: "海产" })),
  ...PRODUCE_POOL.map((item) => ({ ...item, category: "蔬菜" })),
  ...SNACK_POOL.map((item) => ({ ...item, category: "主食" })),
  ...REGIONAL_EXTRA_POOL
];

export function uniquePoolItems() {
  const byId = new Map();
  POOL_WITH_CATEGORY.forEach((item) => {
    if (!byId.has(item.id)) byId.set(item.id, item);
  });
  return [...byId.values()];
}

export function provincialPoolName(province, baseName) {
  return `${province}${baseName}`;
}

export function matchProvincialPoolName(name, baseName) {
  if (!name || name === baseName) return null;
  for (const province of CN_PROVINCES) {
    if (name === provincialPoolName(province, baseName)) return province;
  }
  return null;
}

export function buildPoolCanonicalFoods(existingIds = new Set(), existingNames = new Set()) {
  const foods = [];
  uniquePoolItems().forEach((item) => {
    if (existingIds.has(item.id) || existingNames.has(item.name)) return;
    foods.push(makeFood({
      id: item.id,
      name: item.name,
      category: item.category,
      nature: item.nature || "平",
      regions: ["CN"],
      provinces: [],
      summary: `${item.name}常见于中式饮食与地方菜，各地品种与做法有别。`
    }));
  });
  return foods;
}
