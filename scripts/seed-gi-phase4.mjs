#!/usr/bin/env node
/** Phase 4 — 全国 GI 扩库队列（非岭南优先） */
import fs from "node:fs";
import path from "node:path";
import { root } from "./lib/food-catalog.mjs";

const queuePath = path.join(root, "data", "cn", "gi-expansion-queue.json");

const PENDING = [
  { name: "五常大米", system: "mara", region: "黑龙江", category: "谷物", baseFoodId: "rice", sourceId: "mara-wuchang-rice-p4" },
  { name: "盘锦大米", system: "mara", region: "辽宁", category: "谷物", baseFoodId: "rice", sourceId: "mara-panjin-rice-p4" },
  { name: "延边大米", system: "mara", region: "吉林", category: "谷物", baseFoodId: "rice", sourceId: "mara-yanbian-rice-p4" },
  { name: "天津小站稻", system: "mara", region: "天津", category: "谷物", baseFoodId: "rice", sourceId: "mara-xiaozhan-rice-p4" },
  { name: "北京鸭梨", system: "mara", region: "北京", category: "水果", baseFoodId: "pear", sourceId: "mara-beijing-pear-p4" },
  { name: "烟台苹果", system: "mara", region: "山东", category: "水果", baseFoodId: "apple", sourceId: "mara-yantai-apple-p4" },
  { name: "洛川苹果", system: "mara", region: "陕西", category: "水果", baseFoodId: "apple", sourceId: "mara-luochuan-apple-p4" },
  { name: "静宁苹果", system: "mara", region: "甘肃", category: "水果", baseFoodId: "apple", sourceId: "mara-jingning-apple-p4" },
  { name: "库尔勒香梨", system: "mara", region: "新疆", category: "水果", baseFoodId: "pear", sourceId: "mara-korla-pear-p4" },
  { name: "哈密瓜", system: "mara", region: "新疆", category: "水果", baseFoodId: "melon", sourceId: "mara-hami-melon-p4" },
  { name: "吐鲁番葡萄", system: "mara", region: "新疆", category: "水果", baseFoodId: "grape", sourceId: "mara-turpan-grape-p4" },
  { name: "宁夏枸杞", system: "mara", region: "宁夏", category: "滋补食材", baseFoodId: "goji", sourceId: "mara-ningxia-goji-p4" },
  { name: "中宁枸杞", system: "mara", region: "宁夏", category: "滋补食材", baseFoodId: "goji", sourceId: "mara-zhongning-goji-p4" },
  { name: "文山三七", system: "mara", region: "云南", category: "滋补食材", baseFoodId: "ginseng", sourceId: "mara-wenshan-sanqi-p4" },
  { name: "宣威火腿", system: "mara", region: "云南", category: "肉蛋奶", baseFoodId: "pork", sourceId: "mara-xuanwei-ham-p4" },
  { name: "普洱茶", system: "mara", region: "云南", category: "茶饮", baseFoodId: "black-tea", sourceId: "mara-puer-tea-p4" },
  { name: "都匀毛尖", system: "mara", region: "贵州", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-duyun-tea-p4" },
  { name: "西湖龙井", system: "mara", region: "浙江", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-longjing-tea-p4" },
  { name: "黄山毛峰", system: "mara", region: "安徽", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-huangshan-tea-p4" },
  { name: "信阳毛尖", system: "mara", region: "河南", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-xinyang-tea-p4" },
  { name: "武夷岩茶", system: "mara", region: "福建", category: "茶饮", baseFoodId: "oolong-tea", sourceId: "mara-wuyi-tea-p4" },
  { name: "洞庭碧螺春", system: "mara", region: "江苏", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-biluochun-p4" },
  { name: "六安瓜片", system: "mara", region: "安徽", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-liuan-tea-p4" },
  { name: "祁门红茶", system: "mara", region: "安徽", category: "茶饮", baseFoodId: "black-tea", sourceId: "mara-qimen-tea-p4" },
  { name: "恩施玉露", system: "mara", region: "湖北", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-enshi-tea-p4" },
  { name: "君山银针", system: "mara", region: "湖南", category: "茶饮", baseFoodId: "green-tea", sourceId: "mara-junshan-tea-p4" },
  { name: "西湖藕粉", system: "mara", region: "浙江", category: "主食", baseFoodId: "lotus-root", sourceId: "mara-xihu-lotus-p4" },
  { name: "金华火腿", system: "mara", region: "浙江", category: "肉蛋奶", baseFoodId: "pork", sourceId: "mara-jinhua-ham-p4" },
  { name: "德州扒鸡", system: "mara", region: "山东", category: "肉蛋奶", baseFoodId: "chicken", sourceId: "mara-dezhou-chicken-p4" },
  { name: "阳澄湖大闸蟹", system: "mara", region: "江苏", category: "海产", baseFoodId: "crab", sourceId: "mara-yangcheng-crab-p4" },
  { name: "盱眙龙虾", system: "mara", region: "江苏", category: "海产", baseFoodId: "shrimp", sourceId: "mara-xuyi-lobster-p4" },
  { name: "武昌鱼", system: "mara", region: "湖北", category: "海产", baseFoodId: "fish", sourceId: "mara-wuchang-fish-p4" },
  { name: "洪湖莲藕", system: "mara", region: "湖北", category: "蔬菜", baseFoodId: "lotus-root", sourceId: "mara-honghu-lotus-p4" },
  { name: "章丘大葱", system: "mara", region: "山东", category: "蔬菜", baseFoodId: "scallion", sourceId: "mara-zhangqiu-scallion-p4" },
  { name: "寿光蔬菜", system: "mara", region: "山东", category: "蔬菜", baseFoodId: "cabbage", sourceId: "mara-shouguang-veg-p4" },
  { name: "郫县豆瓣", system: "mara", region: "四川", category: "调料", baseFoodId: "bean-paste", sourceId: "mara-pixian-douban-p4" },
  { name: "涪陵榨菜", system: "mara", region: "重庆", category: "腌菜", baseFoodId: "mustard", sourceId: "mara-fuling-zhacai-p4" },
  { name: "山西老陈醋", system: "mara", region: "山西", category: "调料", baseFoodId: "vinegar", sourceId: "mara-shanxi-vinegar-p4" },
  { name: "镇江香醋", system: "mara", region: "江苏", category: "调料", baseFoodId: "vinegar", sourceId: "mara-zhenjiang-vinegar-p4" },
  { name: "内蒙古牛肉干", system: "mara", region: "内蒙古", category: "肉蛋奶", baseFoodId: "beef", sourceId: "mara-nm-beefjerky-p4" },
  { name: "滩羊肉", system: "mara", region: "宁夏", category: "肉蛋奶", baseFoodId: "lamb", sourceId: "mara-tan-lamb-p4" },
  { name: "青海牦牛肉", system: "mara", region: "青海", category: "肉蛋奶", baseFoodId: "beef", sourceId: "mara-qh-yakbeef-p4" },
  { name: "西藏牦牛肉", system: "mara", region: "西藏", category: "肉蛋奶", baseFoodId: "beef", sourceId: "mara-xz-yakbeef-p4" },
  { name: "长白山人参", system: "mara", region: "吉林", category: "滋补食材", baseFoodId: "ginseng", sourceId: "mara-changbai-ginseng-p4" },
  { name: "新会陈皮", system: "mara", region: "广东", category: "调料", baseFoodId: "chenpi-dried", sourceId: "mara-xinhui-chenpi-p4" },
  { name: "化州橘红", system: "mara", region: "广东", category: "滋补食材", baseFoodId: "tangerine-peel", sourceId: "mara-huazhou-juhong-p4" },
  { name: "安溪铁观音", system: "mara", region: "福建", category: "茶饮", baseFoodId: "oolong-tea", sourceId: "mara-anxi-tea-p4" },
  { name: "福鼎白茶", system: "mara", region: "福建", category: "茶饮", baseFoodId: "white-tea", sourceId: "mara-fuding-tea-p4" },
  { name: "赣南脐橙", system: "mara", region: "江西", category: "水果", baseFoodId: "orange", sourceId: "mara-gannan-orange-p4" },
  { name: "南丰蜜橘", system: "mara", region: "江西", category: "水果", baseFoodId: "orange", sourceId: "mara-nanfeng-orange-p4" }
];

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const seen = new Set([
  ...(queue.pending || []).map((r) => r.sourceId),
  ...(queue.applied || []).map((r) => r.sourceId),
  ...(queue.lingnanPriority || []).map((r) => r.sourceId)
]);
const fresh = PENDING.filter((r) => !seen.has(r.sourceId));
queue.pending = [...(queue.pending || []), ...fresh];
fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`, "utf8");
console.log(`gi-expansion-queue: +${fresh.length} pending (total pending ${queue.pending.length})`);
