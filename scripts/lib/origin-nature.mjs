import fs from "fs";
import path from "path";
import {
  CN_JSON_SOURCES,
  EXPANDED_BULK_JSON_SOURCES,
  readCnJson,
  resolveFoodId,
  root
} from "./food-catalog.mjs";
import { normalizeCategory, normalizeNature } from "./origin-products.mjs";

const NATURE_CONST = {
  N_COLD: "寒",
  N_COOL: "凉",
  N_NEUTRAL: "平",
  N_WARM: "温",
  N_HOT: "热"
};

const ORIGIN_CATEGORY_ALIASES = {
  水产: "海产",
  果类: "水果",
  肉类产品: "肉蛋奶",
  水产动物: "海产",
  水产初级加工品: "海产",
  药材: "中药材",
  食用菌: "菌菇",
  薯类: "蔬菜",
  主食: "谷物",
  奶制品: "肉蛋奶",
  其它畜牧产品: "肉蛋奶",
  "肉类产品、蛋类产品": "肉蛋奶",
  糖料: "谷物",
  油料: "坚果种子",
  花卉: "蔬菜",
  香料: "调料",
  烟草: "调料",
  棉麻蚕桑: "滋补食材",
  蜂类产品: "滋补食材",
  其它植物: "蔬菜"
};

function normalizeOriginCategory(category) {
  const decoded = String(category || "").trim();
  return ORIGIN_CATEGORY_ALIASES[decoded] || normalizeCategory(decoded);
}

const CATEGORY_DEFAULT = {
  谷物: "平",
  水果: "凉",
  蔬菜: "凉",
  肉蛋奶: "温",
  海产: "平",
  菌菇: "平",
  坚果种子: "平",
  茶饮: "凉",
  饮品: "平",
  中药材: "平",
  调料: "温",
  滋补食材: "平"
};

const NAME_RULES = [
  [/白酒|浓香型|酱香型|清香型|黄酒|花雕|米酒|烧酒|药酒|威士忌|白兰地|伏特加|朗姆酒|保健酒|露酒|原浆酒/, "温"],
  [/葡萄酒|红酒/, "温"],
  [/啤酒/, "凉"],
  [/绿茶|毛尖|龙井|碧螺春|瓜片|雀舌|银针|抹茶|蒸青|烘青|晒青/, "凉"],
  [/红茶|普洱|黑茶|熟普|茯茶|六堡|祁门|正山小种|滇红|英德红/, "温"],
  [/白茶/, "凉"],
  [/黄茶/, "平"],
  [/乌龙茶|铁观音|岩茶|单丛|大红袍|水仙茶|肉桂茶|凤凰单/, "平"],
  [/大闸蟹|河蟹|青蟹|梭子蟹|螃蟹/, "寒"],
  [/田螺|螺蛳|蚌|蛤|蚬|牡蛎|生蚝|扇贝|海蜇|海带|紫菜|昆布|海苔|裙带菜/, "寒"],
  [/龙虾|小龙虾|盱眙/, "温"],
  [/对虾|明虾|基围虾|海虾|青虾|白虾/, "温"],
  [/羊肉|滩羊|乌冉克羊|藏羊|绒山羊|绒山羊|肉羊|肉牛|黄牛|牦牛|鹿肉|鹿茸|狗肉/, "温"],
  [/鸭肉|北京鸭|麻鸭/, "凉"],
  [/鸡肉|土鸡|三黄鸡|乌鸡|阉鸡|肉鸡|鸡蛋|鸭蛋|鹅肉|鸽子|鹌鹑/, "温"],
  [/猪肉|猪蹄|排骨|腊肉|火腿|香肠|培根/, "平"],
  [/枸杞|大枣|红枣|桂圆|龙眼干|核桃|板栗|松子|榛子|腰果/, "温"],
  [/生姜|干姜|辣椒|花椒|胡椒|肉桂|桂皮|八角|茴香|孜然/, "温"],
  [/梨|雪梨|鸭梨|香梨|库尔勒|酥梨/, "凉"],
  [/西瓜|黄瓜|苦瓜|冬瓜|丝瓜|绿豆|莲藕|藕|荸荠|茭白|芦荟|薄荷|菊花|金银花|栀子|夏枯草|决明子/, "凉"],
  [/柚子|橙|柑|橘|脐橙|柠檬|猕猴桃|草莓|蓝莓|番茄|西红柿|白萝卜|萝卜|芹菜|菠菜|莴笋|生菜|油菜|空心菜|苋菜|茄子/, "凉"],
  [/荔枝|芒果|榴莲|樱桃|石榴|桃|杨梅|枇杷|木瓜|菠萝|释迦/, "温"],
  [/苹果|葡萄|提子|枣|柿子|甘蔗|无花果|香蕉|哈密瓜|香瓜/, "平"],
  [/人参|党参|黄芪|当归|川芎|白芍|熟地|杜仲|巴戟|三七|天麻|何首乌|肉桂|灵芝|冬虫夏草|淫羊藿|肉苁蓉|锁阳|补骨脂/, "温"],
  [/黄连|黄芩|黄柏|石膏|知母|大黄|芒硝|栀子|板蓝根|大青叶|蒲公英|鱼腥草|马齿苋/, "寒"],
  [/生地|玄参|麦冬|石斛|玉竹|沙参|百合|银耳|桑葚|女贞子/, "凉"],
  [/白术|茯苓|甘草|山药|莲子|芡实|薏苡仁|薏米|白扁豆|大枣|蜂蜜/, "平"],
  [/麻黄|附子|干姜|肉桂|吴茱萸|花椒|胡椒/, "热"],
  [/鱼|鲈|鳜|鲢|鳙|鲫|鲤|黄鱼|带鱼|鲳|鳕|鲩|草鱼|鳊鱼|鳗鱼|鲑|鲟/, "平"],
  [/虾|蟹/, "温"],
  [/大米|小米|糯米|黑米|糙米|小麦|面粉|挂面|粉丝|粉条|米粉|玉米|高粱|燕麦/, "平"],
  [/黄豆|黑豆|红豆|豆腐|豆浆|腐竹|豆干/, "平"],
  [/茶叶|茗茶|春毫|银毫|毛峰|雀舌|雪芽|芽茶|云雾茶|云雾/, "凉"],
  [/松针|松花粉/, "温"],
  [/蚕蛹|蚕茧|柞蚕/, "温"],
  [/五味子|辽五味|人参|林下参|园参|西洋参|党参|黄芪|当归|川芎|天麻|三七|石斛|枸杞|贝母|百合|麦冬/, "温"],
  [/桔|橘|柑|柚|蜜柚|脐橙|金桔|年桔|蜜桔/, "凉"],
  [/烟叶|烟草|香烟/, "热"],
  [/鳖|甲鱼|龟/, "平"],
  [/蝴蝶兰|兰花|花卉/, "平"],
  [/蜂蜜|蜂胶|蜂王浆|蜂花粉/, "平"],
  [/矿泉水|饮用水|纯净水|苏打水|天然水/, "平"],
  [/醋|陈醋|米醋/, "温"],
  [/酱油|豆瓣酱|豆豉|腐乳/, "凉"],
  [/香菇|木耳|银耳|竹荪|松茸|猴头|金针菇|平菇|茶树菇/, "平"],
  [/姜|蒜|葱|韭|薤/, "温"]
];

function cleanDisplayName(name) {
  return String(name || "")
    .replace(/（道地）$/, "")
    .replace(/[""「」『』]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function parseExpandedNatureIndex() {
  const byId = new Map();
  const file = path.join(root, "foods-expanded.js");
  if (!fs.existsSync(file)) return byId;
  const text = fs.readFileSync(file, "utf8");
  const re = /(?:f|tea)\(\s*["']([^"']+)["']\s*,\s*["'][^"']+["']\s*,\s*(N_\w+)/g;
  let m;
  while ((m = re.exec(text))) {
    const nature = NATURE_CONST[m[2]];
    if (nature) byId.set(m[1], nature);
  }
  return byId;
}

function addNameEntry(byName, term, nature) {
  const key = String(term || "").trim().toLowerCase();
  if (key.length < 2) return;
  const normalized = normalizeNature(nature);
  const prev = byName.get(key);
  if (!prev || key.length >= prev.len) {
    byName.set(key, { nature: normalized, len: key.length });
  }
}

export function buildNatureLookup() {
  const byId = parseExpandedNatureIndex();
  const byName = new Map();

  function register(food) {
    if (!food?.id || !food?.name) return;
    const nature = normalizeNature(food.nature);
    if (!nature) return;
    byId.set(food.id, nature);
    addNameEntry(byName, food.name, nature);
    (food.aliases || []).forEach((alias) => addNameEntry(byName, alias, nature));
  }

  CN_JSON_SOURCES.flatMap((file) => readCnJson(file)).forEach(register);
  EXPANDED_BULK_JSON_SOURCES.flatMap((file) => readCnJson(file)).forEach(register);
  readCnJson("origin-products.seed.json", []).forEach(register);

  const herbsPath = path.join(root, "data", "tcm", "herbs-chp2025.json");
  if (fs.existsSync(herbsPath)) {
    JSON.parse(fs.readFileSync(herbsPath, "utf8")).forEach((herb) => {
      register(herb);
      addNameEntry(byName, herb.name, herb.nature);
      (herb.aliases || []).forEach((alias) => addNameEntry(byName, alias, herb.nature));
    });
  }

  const daoDiProfilesPath = path.join(root, "data", "tcm", "dao-di-herb-profiles.json");
  if (fs.existsSync(daoDiProfilesPath)) {
    JSON.parse(fs.readFileSync(daoDiProfilesPath, "utf8")).forEach((profile) => {
      const nature = profile.canonicalId ? byId.get(profile.canonicalId) : null;
      if (!nature) return;
      addNameEntry(byName, profile.name, nature);
      (profile.productVariants || []).forEach((variant) => addNameEntry(byName, variant, nature));
    });
  }

  const nameEntries = [...byName.entries()]
    .sort((a, b) => b[1].len - a[1].len)
    .map(([term, meta]) => ({ term, nature: meta.nature }));

  return { byId, byName, nameEntries };
}

function resolveFromCatalogId(id, lookup) {
  if (!id) return null;
  return lookup.byId.get(id) || null;
}

function resolveFromNameText(name, lookup) {
  const clean = cleanDisplayName(name);
  if (!clean) return null;

  const direct = lookup.byName.get(clean.toLowerCase());
  if (direct) return direct.nature;

  for (const { term, nature } of lookup.nameEntries) {
    if (term.length < 2) continue;
    if (clean.toLowerCase().includes(term)) return nature;
  }

  const stripped = clean
    .replace(/(宁夏|文山|霍山|建宁|武夷|安溪|西湖|五常|盘锦|怀|陇西|岷县|中山|云南|浙江|福建|广东|甘肃|辽宁|黑龙江|河南|四川|贵州|湖南|湖北|江苏|山东|山西|陕西|广西|新疆|内蒙古|西藏|青海|海南|台湾|香港|澳门|道地|产地|生态|有机|绿色|富硒|野生|高山|精品|特级|一级|纯正|天然|品牌|系列|产品|制品|加工|种植|养殖|合作社|有限公司)/g, "")
    .trim();
  if (stripped && stripped !== clean) {
    const hit = lookup.byName.get(stripped.toLowerCase());
    if (hit) return hit.nature;
    for (const { term, nature } of lookup.nameEntries) {
      if (term.length < 2) continue;
      if (stripped.toLowerCase().includes(term)) return nature;
    }
  }

  return null;
}

function resolveFromNameRules(name, category, teaClass, lookup) {
  const text = cleanDisplayName(name);
  if (!text) return null;

  if (/冻干|冻干粉|冻干片/.test(text)) {
    const base = text
      .replace(/及/g, "")
      .replace(/冻干[粉片]*/g, "")
      .replace(/[（）()]/g, "")
      .trim();
    const fromBase = resolveFromNameText(base, lookup);
    if (fromBase) return fromBase;
    for (const [re, nature] of NAME_RULES) {
      if (re.test(base)) return nature;
    }
  }

  if (teaClass) {
    if (/绿茶|白茶|黄茶/.test(teaClass)) return "凉";
    if (/红茶|黑茶|普洱/.test(teaClass)) return "温";
    if (/乌龙/.test(teaClass)) return "平";
  }

  for (const [re, nature] of NAME_RULES) {
    if (re.test(text)) return nature;
  }

  if (category === "饮品" && /酒/.test(text)) return "温";
  if (category === "茶饮") return "凉";
  if (category === "海产" && /蟹|螺|蚌|蛤|贝|海带|紫菜/.test(text)) return "寒";
  if (category === "肉蛋奶") return /猪|排骨|火腿/.test(text) ? "平" : "温";
  if (category === "水果" && /荔|芒|榴|樱|桃|杨梅|枇杷|菠萝/.test(text)) return "温";

  return null;
}

function resolveCategoryDefault(category) {
  return CATEGORY_DEFAULT[normalizeOriginCategory(category)] || "平";
}

/**
 * Infer 食性 for GI / PEOP / 道地 origin products.
 * Returns { nature, natureSource } — never "待考证"; always a resolved source tag.
 */
export function inferOriginNature(product, lookup, { seedIds = new Set(), aliasMap = {} } = {}) {
  if (seedIds.has(product.id)) {
    return {
      nature: normalizeNature(product.nature || "平"),
      natureSource: "seed"
    };
  }

  const baseId = product.baseFoodId ? resolveFoodId(product.baseFoodId, aliasMap) : null;
  const fromBase = resolveFromCatalogId(baseId, lookup);
  if (fromBase) {
    return { nature: fromBase, natureSource: "catalog-id" };
  }

  const cleanName = cleanDisplayName(product.name);
  const category = normalizeOriginCategory(product.category);

  if (/（道地）$/.test(product.name || "") || product.daoDi?.isAuthentic) {
    const herbNature = resolveFromNameText(cleanName, lookup);
    if (herbNature) return { nature: herbNature, natureSource: "tcm-herb" };
    const aliasHit = (product.aliases || [])
      .map((alias) => resolveFromNameText(alias, lookup))
      .find(Boolean);
    if (aliasHit) return { nature: aliasHit, natureSource: "tcm-herb-alias" };
  }

  const fromName = resolveFromNameText(product.name, lookup);
  if (fromName) return { nature: fromName, natureSource: "catalog-name" };

  const fromRules = resolveFromNameRules(product.name, category, product.teaClass, lookup);
  if (fromRules) return { nature: fromRules, natureSource: "rule-name" };

  return {
    nature: resolveCategoryDefault(category),
    natureSource: "category-default"
  };
}

export function applyOriginNatureInference(products, { seedIds = new Set(), aliasMap = {} } = {}) {
  const lookup = buildNatureLookup();
  const stats = {};

  const enriched = products.map((product) => {
    const { nature, natureSource } = inferOriginNature(product, lookup, { seedIds, aliasMap });
    stats[natureSource] = (stats[natureSource] || 0) + 1;
    return {
      ...product,
      nature,
      natureSource
    };
  });

  return { products: enriched, stats };
}
