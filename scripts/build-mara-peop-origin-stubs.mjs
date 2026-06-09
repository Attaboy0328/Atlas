#!/usr/bin/env node
/**
 * Build origin-product stubs from MARA AGI + PEOP fetched catalogs for raw import.
 * Overlapping names merge via dedupeOriginProductsByName at ingest time.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { root } from "./lib/food-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cutoff = "2026-06-09";

function readJson(file) {
  if (!fs.existsSync(file)) return { items: [] };
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function inferCategory(name, fallback = "") {
  if (fallback) return fallback;
  if (/茶|毛尖|龙井|铁观音|普洱|岩茶|红茶|绿茶|白茶|黄茶|黑茶|单丛|乌龙/.test(name)) return "茶饮";
  if (/猪|羊|牛|鸡|鸭|鹅|鱼|虾|蟹|螺|鲍|参|带|鲈|鳊|鲩|肉|乳|奶/.test(name)) return /鱼|虾|蟹|螺|鲍|参|带|鲈|鳊|鲩/.test(name) ? "海产" : "肉蛋奶";
  if (/米|麦|粉|面|粮|谷|豆/.test(name)) return "谷物";
  if (/果|桃|梨|橙|柚|枣|瓜|莓|李|柿|橘|柑|荔|樱|葡|核桃|栗/.test(name)) return /核桃|栗/.test(name) ? "坚果种子" : "水果";
  if (/药|参|归|芪|斛|苓|菊|杞|三七|天麻|贝/.test(name)) return "中药材";
  if (/菇|耳|菌|松茸/.test(name)) return "菌菇";
  if (/酒|啤酒|葡萄酒|黄酒|白酒/.test(name)) return "饮品";
  return "滋补食材";
}

function greenfoodCategoryMap(cat) {
  const map = { 果品: "水果", 粮食: "谷物", 蔬菜: "蔬菜", 水产: "海产", 畜禽: "肉蛋奶", 茶叶: "茶饮" };
  return map[cat] || cat || "";
}

function buildMaraStub(row) {
  const name = String(row.name || "").trim();
  const region = row.region || row.regions?.[0] || "CN";
  const category = greenfoodCategoryMap(row.category) || inferCategory(name);
  const id = row.sourceId || (row.certificateId
    ? `mara-${String(row.certificateId).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    : `mara-${name}`);
  return {
    id,
    name,
    category,
    nature: "平",
    provinces: row.regions?.length ? row.regions : [region],
    giSystems: [{
      system: "mara",
      type: "农产品地理标志",
      label: "农业农村部农产品地理标志"
    }],
    summary: `${name}为农业农村部农产品地理标志登记产品（登记已于2022年废止，以绿色食品中心公开名录为准）。`,
    provenance: {
      source: "mara",
      sourceUrl: row.sourceUrl || "http://www.greenfood.agri.cn/xxcx/dlbzcx/",
      sourceId: id,
      fetchedAt: cutoff,
      registerYear: row.registerYear || "",
      certificateId: row.certificateId || "",
      note: "整理自中国绿色食品发展中心全国农产品地理标志登记产品查询。"
    }
  };
}

function slugify(name) {
  return `peop-${String(name).trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48)}`;
}

const PEOP_SKIP = /^(板栗|土鸡|茶叶|茶油|肉羊|笋干|艾草)$/;
function isValidPeopStubName(name) {
  const n = String(name || "").trim();
  if (n.length < 3 || n.length > 36) return false;
  if (PEOP_SKIP.test(n)) return false;
  if (/有限公司|股份公司|农业农村局|养殖场$|^的/.test(n)) return false;
  if (/、.*、/.test(n)) return false;
  return true;
}

function buildPeopStub(row) {
  const name = String(row.name || "").trim();
  if (!isValidPeopStubName(name)) return null;
  const region = row.region || "CN";
  return {
    id: slugify(name),
    name,
    category: inferCategory(name),
    nature: "平",
    provinces: [region],
    peop: {
      status: "protected",
      label: "生态原产地保护产品",
      region
    },
    summary: `${name}为生态原产地保护产品（PEOP）整理条目。`,
    provenance: {
      source: "peop",
      sourceUrl: row.sourceUrl || "",
      sourceId: slugify(name),
      fetchedAt: cutoff,
      note: "整理自中检协生态原产地公告或 stycd 证书名录。"
    }
  };
}

const maraFile = path.join(root, "data/raw/origin/mara-agi", `products-through-${cutoff}.json`);
const peopFile = path.join(root, "data/raw/origin/peop-announcements", `products-through-${cutoff}.json`);

const maraItems = (readJson(maraFile).items || []).map(buildMaraStub);
const peopItems = (readJson(peopFile).items || []).map(buildPeopStub).filter(Boolean);

const maraOut = path.join(root, "data/raw/origin/mara-agi-origin-stubs.json");
const peopOut = path.join(root, "data/raw/origin/peop-origin-stubs.json");

fs.writeFileSync(maraOut, `${JSON.stringify({
  registry: "mara-agi-origin-stubs",
  cutoff,
  count: maraItems.length,
  items: maraItems
}, null, 2)}\n`, "utf8");

fs.writeFileSync(peopOut, `${JSON.stringify({
  registry: "peop-origin-stubs",
  cutoff,
  count: peopItems.length,
  items: peopItems
}, null, 2)}\n`, "utf8");

console.log(`[mara-peop-stubs] mara ${maraItems.length} -> ${path.relative(root, maraOut)}`);
console.log(`[mara-peop-stubs] peop ${peopItems.length} -> ${path.relative(root, peopOut)}`);
