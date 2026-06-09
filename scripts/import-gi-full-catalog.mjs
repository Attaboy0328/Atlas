#!/usr/bin/env node
/**
 * Merge CNIPA/MARA/PEOP/dao-di fetched catalogs into origin import bulk + registry manifest.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readCnJson, root } from "./lib/food-catalog.mjs";
import { loadGiDaoDiCrosswalk, buildCrosswalkIndex, applyGiDaoDiCrosswalk } from "./lib/gi-dao-di-crosswalk.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cutoff = "2026-06-09";

function readJson(file, fallback = null) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function slugify(name, system) {
  return `${system}-${String(name).trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48)}`;
}

function inferRegion(name) {
  const m = name.match(/(北京|天津|上海|重庆|河北|山西|辽宁|吉林|黑龙江|江苏|浙江|安徽|福建|江西|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|台湾|内蒙古|广西|西藏|宁夏|新疆|香港|澳门)/);
  return m ? m[1] : "CN";
}

function inferCategory(name) {
  if (/茶|毛尖|龙井|铁观音|普洱|岩茶|红茶|绿茶|白茶|黄茶|黑茶|单丛|乌龙/.test(name)) return { category: "茶饮", teaClass: /红茶/.test(name) ? "红茶" : /绿茶|毛尖|龙井/.test(name) ? "绿茶" : /白茶/.test(name) ? "白茶" : /黄茶/.test(name) ? "黄茶" : /普洱|黑茶|茯/.test(name) ? "黑茶" : /乌龙|铁观音|岩茶|单丛/.test(name) ? "乌龙茶" : "" };
  if (/猪|羊|牛|鸡|鸭|鹅|鱼|虾|蟹|螺|鲍|参|带|鲈|鳊|鲩|乌骨|肉/.test(name)) return { category: /鱼|虾|蟹|螺|鲍|参|带|鲈|鳊|鲩/.test(name) ? "海产" : "肉蛋奶" };
  if (/米|麦|粉|面|粮|谷/.test(name)) return { category: "谷物" };
  if (/果|桃|梨|橙|柚|枣|瓜|莓|李|柿|蔗|橘|柑|荔|枝|樱|葡/.test(name)) return { category: "水果" };
  if (/药|参|归|芪|斛|苓|菊|杞|三七|黄精|诃子|连翘|橘红|天麻|贝|虫草|姜黄/.test(name)) return { category: "中药材" };
  if (/菇|耳|菌|松茸|竹荪/.test(name)) return { category: "菌菇" };
  if (/豆|腐|酱|醋|油|椒|蒜|葱|姜|菜|笋|藕|萝|芹|芥|榨菜|芽菜|豆豉/.test(name)) return { category: /酱|醋|油|椒|豆豉/.test(name) ? "调料" : "蔬菜" };
  if (/酒|啤酒|葡萄酒|黄酒|白酒| whiskey/i.test(name)) return { category: "饮品" };
  if (/坚果|核桃|板栗|松子|榛|腰果|花生/.test(name)) return { category: "坚果种子" };
  return { category: "滋补食材" };
}

function loadCatalogItems(file, systemDefault) {
  const payload = readJson(file, { items: [] });
  const items = payload?.items || payload || [];
  return items.map((row) => ({
    name: row.name,
    system: row.system || systemDefault,
    region: row.region || row.provinces?.[0] || inferRegion(row.name),
    category: row.category || inferCategory(row.name).category,
    teaClass: row.teaClass || inferCategory(row.name).teaClass || "",
    sourceId: row.sourceId || slugify(row.name, row.system || systemDefault),
    sourceUrl: row.sourceUrl || "",
    date: row.date || row.fetchedAt || "",
    peop: row.peop || null
  }));
}

const sources = [
  path.join(root, "data/raw/origin/cnipa-announcements", `products-through-${cutoff}.json`),
  path.join(root, "data/raw/origin/peop-announcements", `products-through-${cutoff}.json`),
  path.join(root, "data/raw/origin/dao-di-origin-stubs.json")
];

const existing = readCnJson("origin-products.json", []);
const existingNames = new Set(existing.map((p) => p.name));
const existingIds = new Set(existing.map((p) => p.id));
const manifest = readJson(path.join(root, "data/raw/origin/registry-manifest.json"), { items: [] });
const manifestNames = new Set((manifest.items || []).map((r) => r.name));
const manifestIds = new Set((manifest.items || []).map((r) => r.sourceId));

const crossIndex = buildCrosswalkIndex(loadGiDaoDiCrosswalk());
const importItems = [];
const manifestAdds = [];

sources.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.warn(`[import-gi] missing ${path.relative(root, file)}`);
    return;
  }
  const systemDefault = file.includes("peop") ? "peop" : file.includes("dao-di") ? "daodi" : "cnipa";
  const rows = file.endsWith("dao-di-origin-stubs.json")
    ? (readJson(file)?.items || [])
    : loadCatalogItems(file, systemDefault);

  rows.forEach((row) => {
    const name = String(row.name || "").trim();
    if (!name || existingNames.has(name)) return;
    const system = row.system || systemDefault;
    const sourceId = row.sourceId || slugify(name, system);
    if (manifestIds.has(sourceId) || existingIds.has(sourceId)) return;

    const meta = inferCategory(name);
    const stub = {
      id: sourceId,
      name,
      category: row.category || meta.category,
      nature: "平",
      provinces: [row.region || inferRegion(name)].filter(Boolean),
      teaClass: row.teaClass || meta.teaClass || "",
      giSystems: system === "peop"
        ? []
        : system === "daodi"
          ? []
          : [{ system: system === "cnipa" ? "cnipa" : system === "mara" ? "mara" : "provincial", type: system === "cnipa" ? "地理标志保护产品" : "农产品地理标志", label: system === "cnipa" ? "国家知识产权局地理标志" : system === "mara" ? "农业农村部农产品地理标志" : "省级地理标志" }],
      peop: system === "peop" || row.peop ? (row.peop || { status: "historical", label: "生态原产地保护产品", region: row.region || inferRegion(name) }) : null,
      summary: system === "peop"
        ? `${name}为生态原产地保护产品整理条目（历史或现行公告）。`
        : system === "daodi"
          ? row.summary || `${name}为道地药材整理条目。`
          : `${name}为公开地理标志名录整理条目（${row.date || cutoff} 前公告）。`,
      provenance: {
        source: system,
        sourceUrl: row.sourceUrl || "",
        sourceId,
        fetchedAt: cutoff,
        note: "整理自公开登记公告或抓取缓存，以登记机关最新公告为准。"
      }
    };
    const linked = applyGiDaoDiCrosswalk(stub, crossIndex);
    importItems.push(linked);
    if (!manifestNames.has(name)) {
      manifestAdds.push({
        name,
        system: system === "peop" ? "provincial" : system === "daodi" ? "mara" : system,
        region: row.region || inferRegion(name),
        category: linked.category,
        teaClass: linked.teaClass || undefined,
        baseFoodId: linked.baseFoodId || undefined,
        sourceId
      });
      manifestNames.add(name);
      manifestIds.add(sourceId);
    }
    existingNames.add(name);
    existingIds.add(sourceId);
  });
});

const outImport = path.join(root, "data/raw/origin/cn-gi-full-import.json");
fs.writeFileSync(outImport, `${JSON.stringify({
  registry: "cn-gi-full-import",
  cutoff,
  fetchedAt: new Date().toISOString().slice(0, 10),
  count: importItems.length,
  items: importItems
}, null, 2)}\n`, "utf8");

if (manifestAdds.length) {
  manifest.items = [...(manifest.items || []), ...manifestAdds];
  fs.writeFileSync(path.join(root, "data/raw/origin/registry-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

console.log(`[import-gi] import bulk ${importItems.length} items -> ${path.relative(root, outImport)}`);
console.log(`[import-gi] manifest +${manifestAdds.length} (total ${manifest.items.length})`);
