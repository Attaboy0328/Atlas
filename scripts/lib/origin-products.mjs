import fs from "fs";
import path from "path";
import {
  loadFoodCatalogMeta,
  resolveFoodId,
  loadFoodIdAliasMap,
  root
} from "./food-catalog.mjs";

const CATEGORY_ALIASES = {
  水产: "海产",
  果类: "水果",
  海产: "海产",
  水果: "水果"
};

const GI_SYSTEM_LABELS = {
  cnipa: "国家知识产权局",
  mara: "农业农村部",
  provincial: "省级地理标志",
  peop: "生态原产地（历史）"
};

export function decodeUnicodeLiterals(value) {
  const text = String(value ?? "").trim();
  if (!text || !/\\u[0-9a-fA-F]{4}/.test(text)) return text;
  try {
    return JSON.parse(`"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
  } catch {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }
}

export function normalizeCategory(category) {
  const decoded = decodeUnicodeLiterals(category);
  return CATEGORY_ALIASES[decoded] || decoded || "滋补食材";
}

export function normalizeNature(nature) {
  const decoded = decodeUnicodeLiterals(nature);
  const aliases = { 微寒: "寒", 大寒: "寒", 微温: "温", 大温: "温", 大热: "热" };
  const mapped = aliases[decoded] || decoded;
  return ["寒", "凉", "平", "温", "热", "复合"].includes(mapped) ? mapped : "平";
}

function uniq(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function catalogNameIndex() {
  const aliasMap = loadFoodIdAliasMap();
  const index = new Map();
  loadFoodCatalogMeta().forEach((food) => {
    const id = resolveFoodId(food.id, aliasMap);
    const key = food.name.trim().toLowerCase();
    if (!index.has(key)) index.set(key, id);
    if (!index.has(id)) index.set(id, id);
  });
  return { index, aliasMap };
}

export function autoLinkBaseFoodId(product, catalogIndex, aliasMap) {
  const selfId = resolveFoodId(product.id, aliasMap);
  const pick = (id) => {
    if (!id || id === selfId) return null;
    return id;
  };

  if (product.baseFoodId) {
    const resolved = resolveFoodId(product.baseFoodId, aliasMap);
    return pick(catalogIndex.index.has(resolved) ? resolved : product.baseFoodId);
  }

  const name = String(product.name || "").trim();
  if (!name) return null;

  const direct = pick(catalogIndex.index.get(name.toLowerCase()));
  if (direct) return direct;

  for (const [catalogName, id] of catalogIndex.index.entries()) {
    if (id === selfId) continue;
    if (name.includes(catalogName) && catalogName.length >= 2) return pick(id);
    if (catalogName.includes(name) && name.length >= 2) return pick(id);
  }

  const stripped = name
    .replace(/(宁夏|文山|霍山|建宁|武夷|安溪|西湖|五常|盘锦|怀|陇西|岷县|中山|云南|浙江|福建|广东|甘肃|辽宁|黑龙江|河南)/g, "")
    .trim();
  if (stripped && stripped !== name) {
    const hit = pick(catalogIndex.index.get(stripped.toLowerCase()));
    if (hit) return hit;
  }

  return null;
}

export function mergeOriginProducts(items) {
  const byId = new Map();
  items.forEach((raw) => {
    const id = String(raw.id || "").trim();
    if (!id) return;
    const existing = byId.get(id);
    if (!existing) {
      byId.set(id, raw);
      return;
    }
    byId.set(id, {
      ...existing,
      ...raw,
      aliases: uniq([...(existing.aliases || []), ...(raw.aliases || [])]),
      searchTerms: uniq([...(existing.searchTerms || []), ...(raw.searchTerms || [])]),
      giSystems: [...(existing.giSystems || []), ...(raw.giSystems || [])],
      provinces: uniq([...(existing.provinces || []), ...(raw.provinces || [])])
    });
  });
  return [...byId.values()];
}

export function originProductToFood(product, aliasMap) {
  const baseFoodId = product.baseFoodId ? resolveFoodId(product.baseFoodId, aliasMap) : null;
  const giLabels = (product.giSystems || []).map((row) => row.label || GI_SYSTEM_LABELS[row.system] || row.system);
  const peopLabel = product.peop?.label || (product.peop ? "PEOP" : "");
  const daoDiRegions = product.daoDi?.regions || [];

  const searchTerms = uniq([
    product.name,
    ...(product.aliases || []),
    ...(product.searchTerms || []),
    ...giLabels,
    peopLabel,
    ...daoDiRegions,
    ...(product.provinces || []),
    baseFoodId,
    "地理标志",
    "GI",
    product.peop ? "PEOP" : "",
    product.peop ? "生态原产地" : "",
    product.daoDi?.isAuthentic ? "道地" : "",
    product.daoDi?.isAuthentic ? "道地产区" : ""
  ]).filter(Boolean);

  const regulatoryNote = [
    "产地与认证信息整理自公开登记名录或种子数据，以登记机关最新公告为准，不替代官方证明文件。",
    product.provenance?.note || ""
  ].filter(Boolean).join(" ");

  return {
    id: product.id,
    name: product.name,
    en: product.en || "",
    category: normalizeCategory(product.category),
    nature: normalizeNature(product.nature),
    effects: uniq(product.effects || ["产地认证"]),
    regions: uniq(product.regions || ["CN"]),
    provinces: uniq(product.provinces || []),
    aliases: uniq(product.aliases || []),
    searchTerms,
    summary: product.summary || `${product.name}为公开地理标志或产地认证整理条目。`,
    caution: product.caution || "认证信息仅说明产地与登记来源，不表示适合所有人群；请结合个人状态判断。",
    teaClass: product.teaClass || "",
    itemKind: product.itemKind || (product.category === "中药材" ? "tcm-herb" : "food"),
    isOriginProduct: true,
    baseFoodId,
    giSystems: product.giSystems || [],
    peop: product.peop || null,
    daoDi: product.daoDi || null,
    provenance: product.provenance || null,
    regulatoryNote
  };
}

export function loadRawOriginImports() {
  const rawDir = path.join(root, "data", "raw", "origin");
  if (!fs.existsSync(rawDir)) return [];
  const out = [];
  fs.readdirSync(rawDir).filter((name) => name.endsWith(".json")).forEach((name) => {
    const payload = JSON.parse(fs.readFileSync(path.join(rawDir, name), "utf8"));
    if (Array.isArray(payload)) out.push(...payload);
    else if (payload?.items) out.push(...payload.items);
    else out.push(payload);
  });
  return out;
}

export function buildOriginFoodEntries(products) {
  const aliasMap = loadFoodIdAliasMap();
  const catalogIndex = catalogNameIndex();
  const linked = products.map((product) => {
    const baseFoodId = autoLinkBaseFoodId(product, catalogIndex, aliasMap);
    return originProductToFood({ ...product, baseFoodId }, aliasMap);
  });
  return linked;
}
