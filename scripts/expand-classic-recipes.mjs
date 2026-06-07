import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function collectIdsFromSource(source) {
  const ids = new Set();
  let m;
  const fRe = /f\(\s*["']([^"']+)["']/g;
  while ((m = fRe.exec(source))) ids.add(m[1]);
  const teaRe = /tea\(\s*["']([^"']+)["']/g;
  while ((m = teaRe.exec(source))) ids.add(m[1]);
  const jsonIdRe = /"id"\s*:\s*"([^"]+)"/g;
  while ((m = jsonIdRe.exec(source))) ids.add(m[1]);
  return ids;
}
function loadIds() {
  const ids = new Set();
  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  collectIdsFromSource(expanded).forEach((id) => ids.add(id));
  let m;
  for (const file of ["pairing-aliases.json", "regional-foods.json", "expansion-batch4.json"]) {
    const p = path.join(root, "data/cn", file);
    if (fs.existsSync(p)) readJson(p).forEach((f) => ids.add(f.id));
  }
  for (const file of ["herbs-core.json", "herbs-phase2.json", "herbs-phase3.json", "herbs-phase4.json", "herbs-phase5.json"]) {
    const p = path.join(root, "data/tcm", file);
    if (fs.existsSync(p)) readJson(p).forEach((h) => ids.add(h.id));
  }
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const rm = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
  if (rm) {
    const idRe = /id:\s*["']([^"']+)["']/g;
    while ((m = idRe.exec(rm[1]))) ids.add(m[1]);
  }
  return ids;
}
const ids = loadIds();
const existing = readJson(path.join(root, "data/tcm/classic-diet-recipes.json"));
const dupNames = new Set(["银耳百合羹","莲子百合粥","陈皮小米粥","茯苓薏米粥","山药红枣粥","姜枣饮","生姜羊肉汤","白萝卜陈皮汤","桑葚红枣饮"]);
existing.forEach((r) => {
  if (dupNames.has(r.name) && !r.name.endsWith("（经典）")) r.name += "（经典）";
  r.foodIds = r.foodIds.map((id) => (id === "mulberry" ? "mulberry-fruit" : id === "longan" ? "longan-dried" : id));
});
function mk(id, name, nature, syndromes, foodIds, subtitle, ingredients, steps, note, sourceTitle, sourceSummary) {
  return { id, name, nature, syndromes, foodIds, subtitle, ingredients, steps, note, sources: [{ title: sourceTitle, summary: sourceSummary }] };
}
const newRecipes = [
  { id:"classic-shanyao-dangshen-zhou", name:"山药党参粥", nature:"平", syndromes:["脾气虚","胃气虚"], foodIds:["yam","codonopsis-pilosula","rice"], subtitle:"健脾益气", ingredients:["山药 100 克","党参 12 克","粳米 80 克"], steps:["山药去皮切块","与党参、粳米同煮至软烂"], note:"适合食欲差、乏力、病后恢复期。", sources:[{title:"《脾胃论》",summary:"山药配党参入粥，为补中益气常见食养结构。"}]},
  { id:"classic-huangqi-shanyao-tang", name:"黄芪山药汤", nature:"温", syndromes:["脾气虚","气血两虚"], foodIds:["astragalus-membranaceus","yam","chicken"], subtitle:"益气健脾", ingredients:["黄芪 15 克","山药 80 克","鸡肉 200 克"], steps:["鸡肉焯水","与黄芪、山药同炖 1 小时"], note:"外感发热、实热证不宜。", sources:[{title:"《饮膳正要》",summary:"黄芪与山药、鸡肉同炖，偏温补益气。"}]},
  { id:"classic-danggui-jizhi", name:"当归鸡汤", nature:"温", syndromes:["血虚","脾气虚"], foodIds:["angelica-sinensis","chicken","jujube"], subtitle:"补血养血", ingredients:["当归 10 克","鸡肉 250 克","红枣 5 枚"], steps:["鸡肉焯水","与当归、红枣同炖 50 分钟"], note:"孕妇、月经过多者慎用。", sources:[{title:"《千金要方·食治篇》",summary:"当归配鸡肉，为传统补血食养方。"}]},
  { id:"classic-baizhu-fuling-zhou", name:"白术茯苓粥", nature:"温", syndromes:["脾气虚","痰湿困脾"], foodIds:["atractylodes-macrocephala","poria-cocos","rice"], subtitle:"健脾渗湿", ingredients:["白术 10 克","茯苓 15 克","大米 80 克"], steps:["白术、茯苓先煎取汁","药汁与米同煮成粥"], note:"燥渴、阴虚内热者少量。", sources:[{title:"《脾胃论》",summary:"白术、茯苓同入粥，健脾燥湿渗湿并举。"}]},
  { id:"classic-shashen-yiner", name:"沙参银耳汤", nature:"凉", syndromes:["肺阴虚","胃阴虚"], foodIds:["glehnia-littoralis","white-fungus","pear"], subtitle:"养阴润肺", ingredients:["北沙参 15 克","银耳 10 克","雪梨 1 个"], steps:["银耳泡发","与沙参、雪梨同煮 30 分钟"], note:"脾胃虚寒、腹泻者不宜多饮。", sources:[{title:"《随息居饮食谱》",summary:"沙参配银耳、梨，清润而不腻。"}]},
  { id:"classic-yiner-lianzi-geng", name:"银耳莲子羹（经典）", nature:"平", syndromes:["心脾两虚","胃阴虚"], foodIds:["white-fungus","lotus-seed","jujube"], subtitle:"养心安神", ingredients:["银耳 10 克","莲子 20 克","红枣 4 枚"], steps:["银耳煮至软糯","加莲子、红枣再煮 20 分钟"], note:"甜腻偏重时控制频率。", sources:[{title:"《养老奉亲书》",summary:"银耳莲子羹为老年虚弱调养常见甜品。"}]},
  { id:"classic-yimi-chixiao-zhou", name:"薏米赤小豆粥", nature:"凉", syndromes:["湿热内蕴","痰湿困脾"], foodIds:["coix-seed","red-bean","rice"], subtitle:"清热利湿", ingredients:["薏米 40 克","赤小豆 30 克","大米 60 克"], steps:["薏米、赤小豆浸泡 2 小时","与米同煮至软烂"], note:"孕妇、阳虚怕冷者慎用。", sources:[{title:"《食疗本草》",summary:"薏米配赤小豆，利湿消肿常用组合。"}]},
  { id:"classic-lvdou-geng", name:"绿豆百合羹", nature:"寒", syndromes:["阴虚内热","湿热内蕴"], foodIds:["mung-bean","lily-bulb"], subtitle:"清热养阴", ingredients:["绿豆 50 克","百合 20 克","冰糖 适量（可选）"], steps:["绿豆煮至开花","加百合再煮 15 分钟"], note:"脾胃虚寒、腹泻者忌用。", sources:[{title:"《本草纲目》",summary:"绿豆清热，百合养阴，夏令常用。"}]},
  { id:"classic-donggua-yimi-tang", name:"冬瓜薏米汤", nature:"凉", syndromes:["湿热内蕴","痰湿困脾"], foodIds:["wax-gourd","coix-seed","pork"], subtitle:"利湿消肿", ingredients:["冬瓜 300 克","薏米 30 克","瘦肉 100 克"], steps:["薏米先煮 20 分钟","加冬瓜、瘦肉同煮"], note:"阳虚水肿者不宜。", sources:[{title:"《饮膳正要》",summary:"冬瓜配薏米，清淡利湿，夏秋季常见。"}]},
  mk("classic-kugua-jiangzhi","苦瓜姜汁饮","寒",["湿热内蕴","肝胃不和"],["bitter-melon","ginger"],"清热和胃",["苦瓜 100 克","生姜汁 5 ml","温水 200 ml"],["苦瓜榨汁或煮汁","兑入姜汁温服"],"脾胃虚寒、孕妇不宜。","《食疗本草》","苦瓜清热，少佐姜汁以护胃。")
];
const batchPath = path.join(root, "data/tcm/classic-diet-recipes-batch.json");
if (fs.existsSync(batchPath)) {
  newRecipes.push(...readJson(batchPath));
}
const missing = [];
[...existing, ...newRecipes].forEach((r) => r.foodIds.forEach((id) => { if (!ids.has(id)) missing.push(`${r.id}:${id}`); }));
if (missing.length) {
  console.error("Missing foodIds:", [...new Set(missing)].join(", "));
  process.exit(1);
}
const seen = new Set(existing.map((r) => r.id));
const merged = [...existing, ...newRecipes.filter((r) => !seen.has(r.id))];
const outPath = path.join(root, "data/tcm/classic-diet-recipes.json");
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
console.log("Total recipes:", merged.length);
console.log("New added:", newRecipes.filter((r) => !seen.has(r.id)).length);
console.log("Sample new:", newRecipes.slice(0, 5).map((r) => r.name).join(", "));
