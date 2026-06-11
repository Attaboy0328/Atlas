#!/usr/bin/env node
/** Phase 4 — 华北东北/西北西南/华中华东 精品层搜索同义词 */
import path from "node:path";
import { fileURLToPath } from "url";
import { writeJsonFile } from "./lib/food-entry.mjs";

const cnDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "cn");

const SYNONYMS = [
  { term: "锅巴菜", foodId: "c16-tj-gabacai" },
  { term: "天津嘎巴菜", foodId: "c16-tj-gabacai" },
  { term: "独流老醋", foodId: "c16-tj-duliuvinegar" },
  { term: "杨村糕干", foodId: "c16-tj-yangcui" },
  { term: "卤煮", foodId: "c16-tj-braised-intestine" },
  { term: "艾窝窝", foodId: "c16-bj-aiwowo" },
  { term: "北京豆汁", foodId: "c16-bj-douzhi" },
  { term: "铜锅涮肉", foodId: "c16-bj-shuanyang" },
  { term: "炙子烤肉", foodId: "c16-bj-zhizi" },
  { term: "哈尔滨红肠", foodId: "c16-hlj-sausage" },
  { term: "东北酸菜", foodId: "c16-hlj-sauerkraut" },
  { term: "大马哈鱼", foodId: "c16-hlj-salmon" },
  { term: "延边冷面", foodId: "c16-jl-cold-noodle" },
  { term: "朝鲜族泡菜", foodId: "c16-jl-kimchi" },
  { term: "老边饺子", foodId: "c16-ln-bianjiao" },
  { term: "熏肉大饼", foodId: "c16-ln-smoked-meat" },
  { term: "大连海蛎子", foodId: "c16-ln-oyster" },
  { term: "奶豆腐", foodId: "c16-nm-milk-curd" },
  { term: "手扒肉", foodId: "c16-nm-hand-meat" },
  { term: "马奶酒", foodId: "c16-nm-kumiss" },
  { term: "酥油茶", foodId: "c17-xz-butter-tea" },
  { term: "牦牛肉", foodId: "c17-xz-yak-meat" },
  { term: "新疆拉条子", foodId: "c17-xj-lagman" },
  { term: "新疆馕", foodId: "c17-xj-naan" },
  { term: "大盘鸡", foodId: "c17-xj-big-plate-chicken" },
  { term: "手抓饭", foodId: "c17-xj-pilaf" },
  { term: "和田核桃", foodId: "c17-xj-walnut" },
  { term: "宁夏滩羊", foodId: "c17-nx-tan-lamb" },
  { term: "中宁枸杞", foodId: "c17-nx-goji" },
  { term: "青海糌粑", foodId: "c17-qh-zanba" },
  { term: "兰州酿皮", foodId: "c17-gs-liangpi" },
  { term: "宁夏酿皮", foodId: "c17-nx-rice-noodle" },
  { term: "敦煌李广杏", foodId: "c17-gs-dunhuang" },
  { term: "云南野生菌", foodId: "c17-yn-wild-mushroom" },
  { term: "云南菌子", foodId: "c17-yn-wild-mushroom" },
  { term: "鲜花饼", foodId: "c17-yn-rose-cake" },
  { term: "宣威火腿", foodId: "c17-yn-ham" },
  { term: "酸汤鱼", foodId: "c17-gz-sour-soup" },
  { term: "肠旺面", foodId: "c17-gz-noodle" },
  { term: "武汉热干面", foodId: "c18-hb-hot-dry-noodle" },
  { term: "排骨藕汤", foodId: "c18-hb-lotus-root-soup" },
  { term: "武昌鱼", foodId: "c18-hb-wuchang-fish" },
  { term: "周黑鸭", foodId: "c18-hb-preserves" },
  { term: "湖南剁椒", foodId: "c18-hn-chopped-pepper" },
  { term: "湘莲", foodId: "c18-hn-lotus-seed" },
  { term: "君山银针", foodId: "c18-hn-tea" },
  { term: "南昌拌粉", foodId: "c18-jx-rice-noodle" },
  { term: "臭鳜鱼", foodId: "c18-ah-stinky-mandarin" },
  { term: "毛豆腐", foodId: "c18-ah-tofu" },
  { term: "祁门红茶", foodId: "c18-ah-tea" },
  { term: "山东煎饼", foodId: "c18-sd-scallion-pancake" },
  { term: "九转大肠", foodId: "c18-sd-braised-intestine" },
  { term: "河南烩面", foodId: "c18-henan-huimian" },
  { term: "胡辣汤", foodId: "c18-henan-stewed-noodle" },
  { term: "新郑大枣", foodId: "c18-henan-date" },
  { term: "驴肉火烧", foodId: "c18-he-shijiazhuang" },
  { term: "迁西板栗", foodId: "c18-he-chestnut" },
  { term: "山西刀削面", foodId: "c18-sx-noodle" },
  { term: "陕西肉夹馍", foodId: "c18-sn-roujiamo" },
  { term: "西安泡馍", foodId: "c14-sx-lamb-soup" },
  { term: "油泼面", foodId: "c18-sn-biangbiang" }
];

writeJsonFile(path.join(cnDir, "food-search-synonyms-batch10-phase4.json"), SYNONYMS);
console.log(`food-search-synonyms-batch10-phase4.json: ${SYNONYMS.length}`);
