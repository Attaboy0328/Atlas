#!/usr/bin/env node
/**
 * Materialize data/raw/origin/*.json import batches from curated public-registry stubs.
 * Replace with live fetch output when scrapers are wired.
 */
import fs from "fs";
import path from "path";
import { root } from "./lib/food-catalog.mjs";

const rawDir = path.join(root, "data", "raw", "origin");
fs.mkdirSync(rawDir, { recursive: true });

function gi(system, type, label) {
  return { system, type, label };
}

function prov(source, sourceUrl, sourceId, fetchedAt = "2026-06-08", note = "") {
  return { source, sourceUrl, sourceId, fetchedAt, ...(note ? { note } : {}) };
}

function item(row) {
  return row;
}

const maraItems = [
  item({ id: "yangcheng-lake-crab", name: "阳澄湖大闸蟹", category: "海产", nature: "寒", provinces: ["江苏", "苏州"], baseFoodId: "crab", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "阳澄湖大闸蟹为江浙常见地理标志水产。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-yangcheng-crab") }),
  item({ id: "gannan-navel-orange", name: "赣南脐橙", category: "水果", nature: "凉", provinces: ["江西", "赣州"], aliases: ["脐橙"], searchTerms: ["赣南脐橙", "脐橙"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "赣南脐橙为江西赣州地理标志柑橘。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-gannan-orange") }),
  item({ id: "zigui-navel-orange", name: "秭归脐橙", category: "水果", nature: "凉", provinces: ["湖北", "宜昌"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "秭归脐橙为湖北宜昌地理标志柑橘。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-zigui-orange") }),
  item({ id: "yantai-apple-gi", name: "烟台苹果", category: "水果", nature: "凉", provinces: ["山东", "烟台"], baseFoodId: "apple", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "烟台苹果为山东沿海常见地理标志水果。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-yantai-apple") }),
  item({ id: "luochuan-apple-gi", name: "洛川苹果", category: "水果", nature: "凉", provinces: ["陕西", "延安"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "洛川苹果为陕北黄土高原地理标志苹果。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-luochuan-apple") }),
  item({ id: "korla-pear-gi", name: "库尔勒香梨", category: "水果", nature: "凉", provinces: ["新疆", "巴州"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "库尔勒香梨为新疆巴州地理标志梨品。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-korla-pear") }),
  item({ id: "turpan-grape-gi", name: "吐鲁番葡萄", category: "水果", nature: "平", provinces: ["新疆", "吐鲁番"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "吐鲁番葡萄为新疆绿洲农业地理标志葡萄。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-turpan-grape") }),
  item({ id: "hami-melon-gi", name: "哈密瓜", category: "水果", nature: "寒", provinces: ["新疆", "哈密"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "哈密瓜为新疆哈密地理标志甜瓜。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-hami-melon") }),
  item({ id: "jinhua-ham-gi", name: "金华火腿", category: "肉蛋奶", nature: "温", provinces: ["浙江", "金华"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "金华火腿为浙江金华地理标志腌腊肉制品。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-jinhua-ham") }),
  item({ id: "xuanwei-ham-gi", name: "宣威火腿", category: "肉蛋奶", nature: "温", provinces: ["云南", "宣威"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "宣威火腿为云南宣威地理标志火腿。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-xuanwei-ham") }),
  item({ id: "xinhui-chenpi-gi", name: "新会陈皮", category: "食药物质", nature: "温", provinces: ["广东", "江门"], baseFoodId: "chenpi", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], daoDi: { isAuthentic: true, regions: ["广东新会"] }, summary: "新会陈皮为广陈皮道地产区地理标志产品。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-xinhui-chenpi") }),
  item({ id: "huazhou-juhong-gi", name: "化州橘红", category: "中药材", nature: "温", provinces: ["广东", "化州"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "化州橘红为广东化州地理标志橘红药材。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-huazhou-juhong") }),
  item({ id: "fuling-mustard-tuber", name: "涪陵榨菜", category: "腌菜", nature: "温", provinces: ["重庆", "涪陵"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "涪陵榨菜为重庆涪陵地理标志腌菜。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-fuling-pickle") }),
  item({ id: "zhangqiu-scallion-gi", name: "章丘大葱", category: "蔬菜", nature: "温", provinces: ["山东", "济南"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "章丘大葱为山东济南章丘地理标志蔬菜。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-zhangqiu-scallion") }),
  item({ id: "yantai-cherry-gi", name: "烟台大樱桃", category: "水果", nature: "温", provinces: ["山东", "烟台"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "烟台大樱桃为山东烟台地理标志樱桃。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-yantai-cherry") }),
  item({ id: "cangzhou-jujube-gi", name: "沧州金丝小枣", category: "水果", nature: "温", provinces: ["河北", "沧州"], baseFoodId: "jujube", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "沧州金丝小枣为河北沧州地理标志枣品。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-cangzhou-jujube") }),
  item({ id: "chongming-crab-gi", name: "崇明清水蟹", category: "海产", nature: "寒", provinces: ["上海", "崇明"], baseFoodId: "crab", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "崇明清水蟹为上海崇明地理标志河蟹。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-chongming-crab") }),
  item({ id: "longkou-vermicelli-gi", name: "龙口粉丝", category: "主食", nature: "平", provinces: ["山东", "烟台"], giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "龙口粉丝为山东烟台龙口地理标志粉丝。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-longkou-vermicelli") }),
  item({ id: "anji-white-tea-gi", name: "安吉白茶", category: "茶饮", nature: "凉", provinces: ["浙江", "湖州"], teaClass: "绿茶", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "安吉白茶为浙江湖州地理标志绿茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-anji-white-tea") }),
  item({ id: "huangshan-maofeng-gi", name: "黄山毛峰", category: "茶饮", nature: "凉", provinces: ["安徽", "黄山"], teaClass: "绿茶", baseFoodId: "green-tea", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "黄山毛峰为安徽黄山地理标志绿茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-huangshan-maofeng") }),
  item({ id: "keemun-black-tea-gi", name: "祁门红茶", category: "茶饮", nature: "温", provinces: ["安徽", "祁门"], teaClass: "红茶", baseFoodId: "black-tea", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "祁门红茶为安徽祁门地理标志红茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-keemun-black-tea") }),
  item({ id: "liubao-tea-gi", name: "六堡茶", category: "茶饮", nature: "温", provinces: ["广西", "梧州"], teaClass: "黑茶", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "六堡茶为广西梧州地理标志黑茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-liubao-tea") }),
  item({ id: "fuzhuan-brick-tea-gi", name: "茯砖茶", category: "茶饮", nature: "温", provinces: ["湖南", "益阳"], teaClass: "黑茶", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "茯砖茶为湖南益阳地理标志黑茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-fuzhuan-tea") }),
  item({ id: "enshi-yulu-gi", name: "恩施玉露", category: "茶饮", nature: "凉", provinces: ["湖北", "恩施"], teaClass: "绿茶", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "恩施玉露为湖北恩施地理标志蒸青绿茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-enshi-yulu") }),
  item({ id: "duyun-maojian-gi", name: "都匀毛尖", category: "茶饮", nature: "凉", provinces: ["贵州", "都匀"], teaClass: "绿茶", giSystems: [gi("mara", "农产品地理标志", "农业农村部农产品地理标志")], summary: "都匀毛尖为贵州都匀地理标志绿茶。", provenance: prov("mara", "https://www.moa.gov.cn/", "mara-duyun-maojian") })
];

const cnipaItems = [
  item({ id: "shaoxing-rice-wine-gi", name: "绍兴酒", category: "饮品", nature: "温", provinces: ["浙江", "绍兴"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "绍兴酒为浙江绍兴地理标志黄酒。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-shaoxing-wine") }),
  item({ id: "fenjiu-gi", name: "汾酒", category: "饮品", nature: "温", provinces: ["山西", "汾阳"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "汾酒为山西汾阳地理标志白酒。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-fenjiu") }),
  item({ id: "wuliangye-gi", name: "五粮液", category: "饮品", nature: "温", provinces: ["四川", "宜宾"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "五粮液为四川宜宾地理标志白酒。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-wuliangye") }),
  item({ id: "moutai-gi", name: "茅台酒", category: "饮品", nature: "温", provinces: ["贵州", "茅台镇"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "茅台酒为贵州仁怀地理标志酱香白酒。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-moutai") }),
  item({ id: "luzhou-laojiao-gi", name: "泸州老窖", category: "饮品", nature: "温", provinces: ["四川", "泸州"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "泸州老窖为四川泸州地理标志白酒。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-luzhou-laojiao") }),
  item({ id: "jingdezhen-tea-gi", name: "庐山云雾茶", category: "茶饮", nature: "凉", provinces: ["江西", "庐山"], teaClass: "绿茶", giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "庐山云雾茶为江西庐山地理标志绿茶。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-lushan-tea") }),
  item({ id: "junshan-yinzhen-gi", name: "君山银针", category: "茶饮", nature: "凉", provinces: ["湖南", "岳阳"], teaClass: "黄茶", giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "君山银针为湖南岳阳地理标志黄茶。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-junshan-yinzhen") }),
  item({ id: "mengding-ganlu-gi", name: "蒙顶甘露", category: "茶饮", nature: "凉", provinces: ["四川", "雅安"], teaClass: "绿茶", giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "蒙顶甘露为四川雅安地理标志绿茶。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-mengding-ganlu") }),
  item({ id: "biluochun-dongting-gi", name: "洞庭山碧螺春", category: "茶饮", nature: "凉", provinces: ["江苏", "苏州"], teaClass: "绿茶", baseFoodId: "green-tea", giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "洞庭山碧螺春为江苏苏州地理标志绿茶。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-biluochun") }),
  item({ id: "zhengshan-souchong-gi", name: "正山小种", category: "茶饮", nature: "温", provinces: ["福建", "武夷山"], teaClass: "红茶", giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "正山小种为福建武夷山地理标志红茶。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-zhengshan-souchong") }),
  item({ id: "taihe-wuji-gi", name: "泰和乌鸡", category: "肉蛋奶", nature: "平", provinces: ["江西", "泰和"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "泰和乌鸡为江西泰和地理标志禽肉。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-taihe-wuji") }),
  item({ id: "jinzhai-shiitake-gi", name: "金寨香菇", category: "菌菇", nature: "平", provinces: ["安徽", "金寨"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "金寨香菇为安徽金寨地理标志菌菇。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-jinzhai-shiitake") }),
  item({ id: "qingyuan-mushroom-gi", name: "庆元香菇", category: "菌菇", nature: "平", provinces: ["浙江", "庆元"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "庆元香菇为浙江庆元地理标志菌菇。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-qingyuan-mushroom") }),
  item({ id: "suixing-honey-gi", name: "遂昌蜂蜜", category: "滋补食材", nature: "平", provinces: ["浙江", "遂昌"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "遂昌蜂蜜为浙江遂昌地理标志蜂蜜。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-suixing-honey") }),
  item({ id: "tianshui-guagua-gi", name: "天水花牛苹果", category: "水果", nature: "凉", provinces: ["甘肃", "天水"], giSystems: [gi("cnipa", "地理标志保护产品", "国家知识产权局地理标志")], summary: "天水花牛苹果为甘肃天水地理标志苹果。", provenance: prov("cnipa", "https://www.cnipa.gov.cn/", "cnipa-tianshui-apple") })
];

const provincialItems = [
  item({ id: "piyazi-apple-gi", name: "花牛苹果", category: "水果", nature: "凉", provinces: ["甘肃", "天水"], giSystems: [gi("provincial", "省级地理标志", "甘肃省级地理标志")], summary: "花牛苹果为甘肃省级地理标志苹果品种。", provenance: prov("provincial", "", "prov-gansu-apple", "2026-06-08", "省级名录整理条目。") }),
  item({ id: "chaozhou-gongfu-tea-gi", name: "潮州工夫茶", category: "茶饮", nature: "温", provinces: ["广东", "潮州"], teaClass: "乌龙茶", giSystems: [gi("provincial", "省级地理标志", "广东省级地理标志")], summary: "潮州工夫茶为广东潮州省级地理标志茶文化产品。", provenance: prov("provincial", "", "prov-gd-chaozhou-tea") }),
  item({ id: "wuchang-rice-prov-gi", name: "五常大米", category: "谷物", nature: "平", provinces: ["黑龙江", "五常"], baseFoodId: "rice", giSystems: [gi("provincial", "省级地理标志", "黑龙江省级地理标志")], summary: "五常大米为黑龙江省级地理标志大米。", provenance: prov("provincial", "", "prov-hlj-wuchang-rice") }),
  item({ id: "xiangxi-ciba-gi", name: "湘西糍粑", category: "主食", nature: "平", provinces: ["湖南", "湘西"], giSystems: [gi("provincial", "省级地理标志", "湖南省级地理标志")], summary: "湘西糍粑为湖南湘西省级地理标志米制品。", provenance: prov("provincial", "", "prov-hn-xiangxi-ciba") }),
  item({ id: "yibin-bamboo-shoot-gi", name: "宜宾竹笋", category: "蔬菜", nature: "寒", provinces: ["四川", "宜宾"], giSystems: [gi("provincial", "省级地理标志", "四川省级地理标志")], summary: "宜宾竹笋为四川宜宾省级地理标志笋品。", provenance: prov("provincial", "", "prov-sc-yibin-bamboo") }),
  item({ id: "wenshan-cordyceps-gi", name: "文山虫草花", category: "菌菇", nature: "平", provinces: ["云南", "文山"], giSystems: [gi("provincial", "省级地理标志", "云南省级地理标志")], summary: "文山虫草花为云南文山省级地理标志菌菇。", provenance: prov("provincial", "", "prov-yn-wenshan-cordyceps") }),
  item({ id: "hangzhou-longjing-prov-gi", name: "西湖龙井", category: "茶饮", nature: "凉", provinces: ["浙江", "杭州"], teaClass: "绿茶", baseFoodId: "longjing-tea", giSystems: [gi("provincial", "省级地理标志", "浙江省级地理标志")], summary: "西湖龙井为浙江省级地理标志绿茶。", provenance: prov("provincial", "", "prov-zj-longjing") }),
  item({ id: "ruian-orange-gi", name: "瑞安脐橙", category: "水果", nature: "凉", provinces: ["浙江", "温州"], giSystems: [gi("provincial", "省级地理标志", "浙江省级地理标志")], summary: "瑞安脐橙为浙江温州省级地理标志柑橘。", provenance: prov("provincial", "", "prov-zj-ruian-orange") }),
  item({ id: "fuding-white-tea-gi", name: "福鼎白茶", category: "茶饮", nature: "凉", provinces: ["福建", "宁德"], teaClass: "白茶", baseFoodId: "white-tea", giSystems: [gi("provincial", "省级地理标志", "福建省级地理标志")], summary: "福鼎白茶为福建宁德省级地理标志白茶。", provenance: prov("provincial", "", "prov-fj-fuding-white-tea") }),
  item({ id: "zhangzhou-pomelo-gi", name: "琯溪蜜柚", category: "水果", nature: "凉", provinces: ["福建", "漳州"], giSystems: [gi("provincial", "省级地理标志", "福建省级地理标志")], summary: "琯溪蜜柚为福建漳州省级地理标志柚类。", provenance: prov("provincial", "", "prov-fj-zhangzhou-pomelo") })
];

function writeBatch(name, items) {
  const out = {
    registry: name,
    fetchedAt: "2026-06-08",
    note: "整理自公开地理标志名录结构样例；以登记机关最新公告为准。",
    items
  };
  fs.writeFileSync(path.join(rawDir, `${name}.json`), `${JSON.stringify(out, null, 2)}\n`, "utf8");
}

writeBatch("mara-gi-batch1", maraItems);
writeBatch("cnipa-gi-batch1", cnipaItems);
writeBatch("provincial-gi-batch1", provincialItems);

console.log(`origin raw batches: mara ${maraItems.length}, cnipa ${cnipaItems.length}, provincial ${provincialItems.length}`);
