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

const ORIGIN_EXCLUDE_PATTERNS = [
  /化妆品/,
  /分析仪|光谱仪|色谱仪|检测仪|测量仪/,
  /仪器|设备|机械|构件|制冷|起重/,
  /毛巾|织物|面料|布料|建材|水泥|钢材|瓷砖/,
  /系列/,
  /等产品$/,
  /初加工/,
  /等[\u4e00-\u9fff].{0,24}产品/,
  /有限公司|股份公司|农业局|人民政府|有限合伙/
];
const INTERNAL_ALIAS_RE = /^(cnipa-|mara-|peop-|daodi-)/i;
const PHONE_NAME_RE = /^1[3-9]\d{9}(?:\s+1[3-9]\d{9})?$/;

/** Decode HTML entities and normalize common OCR/PDF artifacts in product names. */
export function normalizeOriginProductName(name) {
  let text = String(name ?? "").trim();
  if (!text) return "";
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&#(\d+);/g, (_, code) => {
      const n = Number(code);
      return Number.isFinite(n) ? String.fromCharCode(n) : "";
    })
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

export function isValidOriginProductName(name) {
  const n = normalizeOriginProductName(name);
  if (!n || n.length < 2 || n.length > 48) return false;
  if (/^&+$/.test(n) || /^nbsp$/i.test(n)) return false;
  if (/^(号[）)]|[）)]|[(（]号)/.test(n)) return false;
  if (/^\d+$/.test(n) || PHONE_NAME_RE.test(n)) return false;
  if (!/[\u4e00-\u9fff]/.test(n)) return false;
  if (/^[^a-zA-Z0-9\u4e00-\u9fff]+$/.test(n)) return false;
  if (/序号|产品名称|申请人|化妆品|生态原产地保护产品/.test(n)) return false;
  if (ORIGIN_EXCLUDE_PATTERNS.some((re) => re.test(n))) return false;
  return true;
}

export function isExcludedOriginProduct(product) {
  const name = normalizeOriginProductName(product?.name);
  if (!isValidOriginProductName(name)) return true;
  return ORIGIN_EXCLUDE_PATTERNS.some((re) => re.test(name));
}

export function sanitizeUserFacingAliases(aliases = []) {
  return uniq(
    aliases
      .map((alias) => normalizeOriginProductName(alias))
      .filter((alias) => alias && isValidOriginProductName(alias) && !INTERNAL_ALIAS_RE.test(alias))
  );
}

const DAO_DI_PRIORITY_PROVINCES = {
  "sichuan-pepper": ["四川", "陕西", "河北", "山东"]
};

function parseProvinceTokens(place) {
  return String(place || "")
    .split(/[、,，/]/)
    .map((part) => part.replace(/等$/g, "").trim())
    .filter((part) => part && part.length <= 8 && /[\u4e00-\u9fff]/.test(part) && part !== "CN");
}

/** Expand dao-di region strings into a sorted province list for display. */
export function expandDaoDiProvinces(product) {
  if (!product?.daoDi?.isAuthentic) return product;
  const parsed = [];
  (product.daoDi.regions || []).forEach((place) => parsed.push(...parseProvinceTokens(place)));
  (product.provinces || []).forEach((province) => parsed.push(...parseProvinceTokens(province)));
  let provinces = [...new Set(parsed)];
  const priority = DAO_DI_PRIORITY_PROVINCES[product.baseFoodId] || [];
  if (priority.length) {
    provinces = [
      ...priority.filter((p) => provinces.includes(p)),
      ...provinces.filter((p) => !priority.includes(p))
    ];
  }
  return {
    ...product,
    provinces: provinces.length ? provinces.slice(0, 6) : product.provinces
  };
}

export function enrichOriginSearchTerms(product) {
  const name = normalizeOriginProductName(product.name);
  const variants = [name];
  if (/〇/.test(name)) variants.push(name.replace(/〇/g, "零"));
  if (/零/.test(name)) variants.push(name.replace(/零/g, "〇"));
  return uniq([...(product.searchTerms || []), ...variants]);
}

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
    if (catalogIndex.index.has(resolved)) {
      const linked = pick(resolved);
      if (linked) return linked;
    }
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

function originNameRank(product, seedIds) {
  let score = 0;
  if (seedIds.has(product.id)) score += 100;
  if (/-gi$/.test(product.id)) score += 50;
  if (!/manifest/.test(product.id)) score += 20;
  if (/^mara-agi\d+$/i.test(product.id)) score += 5;
  if (/[\u4e00-\u9fff]/.test(product.id)) score -= 40;
  if (/^mara-/.test(product.id) && !/^mara-agi/i.test(product.id)) score -= 10;
  score += (product.giSystems?.length || 0) * 5;
  return score;
}

/** Collapse manifest duplicates that share a display name with an existing GI seed row. */
export function dedupeOriginProductsByName(items, seedIds = new Set()) {
  const byName = new Map();
  items.forEach((product) => {
    const name = String(product.name || "").trim();
    if (!name) return;
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(product);
  });

  const dropIds = new Set();
  const mergedById = new Map(items.map((item) => [item.id, { ...item }]));

  byName.forEach((rows) => {
    if (rows.length <= 1) return;
    const ranked = [...rows].sort(
      (a, b) => originNameRank(b, seedIds) - originNameRank(a, seedIds) || a.id.localeCompare(b.id)
    );
    const canonical = mergedById.get(ranked[0].id);
    ranked.slice(1).forEach((dup) => {
      dropIds.add(dup.id);
      canonical.giSystems = uniq([...(canonical.giSystems || []), ...(dup.giSystems || [])]);
      canonical.aliases = sanitizeUserFacingAliases([
        ...(canonical.aliases || []),
        ...(dup.aliases || [])
      ]);
      canonical.searchTerms = uniq([...(canonical.searchTerms || []), ...(dup.searchTerms || []), dup.id]);
      canonical.provinces = uniq([...(canonical.provinces || []), ...(dup.provinces || [])]);
      if (!canonical.peop && dup.peop) canonical.peop = dup.peop;
      if (!canonical.summary && dup.summary) canonical.summary = dup.summary;
      canonical.provenance = {
        ...(canonical.provenance || {}),
        ...(dup.provenance?.sourceId && !canonical.provenance?.sourceId ? dup.provenance : {}),
        mergedFrom: uniq([...(canonical.provenance?.mergedFrom || []), dup.id])
      };
    });
  });

  return [...mergedById.values()].filter((product) => !dropIds.has(product.id));
}

export function mergeOriginProducts(items) {
  const byId = new Map();
  items.forEach((raw) => {
    const id = String(raw.id || "").trim();
    if (!id) return;
    const existing = byId.get(id);
    if (!existing) {
      byId.set(id, {
        ...raw,
        name: normalizeOriginProductName(raw.name),
        aliases: sanitizeUserFacingAliases(raw.aliases || [])
      });
      return;
    }
    byId.set(id, {
      ...existing,
      ...raw,
      name: normalizeOriginProductName(raw.name || existing.name),
      aliases: sanitizeUserFacingAliases([...(existing.aliases || []), ...(raw.aliases || [])]),
      searchTerms: uniq([...(existing.searchTerms || []), ...(raw.searchTerms || [])]),
      giSystems: [...(existing.giSystems || []), ...(raw.giSystems || [])],
      provinces: uniq([...(existing.provinces || []), ...(raw.provinces || [])])
    });
  });
  return [...byId.values()];
}

export function originProductToFood(product, aliasMap, catalogFoodIds = null) {
  const baseFoodId = product.baseFoodId ? resolveFoodId(product.baseFoodId, aliasMap) : null;
  const hideLinkedDaoDi = Boolean(
    baseFoodId
    && catalogFoodIds?.has(baseFoodId)
    && /（道地）$/.test(String(product.name || ""))
  );
  const giLabels = (product.giSystems || []).map((row) => row.label || GI_SYSTEM_LABELS[row.system] || row.system);
  const peopLabel = product.peop?.label || (product.peop ? "PEOP" : "");
  const daoDiRegions = product.daoDi?.regions || [];
  const displayAliases = sanitizeUserFacingAliases(product.aliases || []);

  const searchTerms = uniq([
    product.name,
    ...displayAliases,
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
    aliases: displayAliases,
    searchTerms,
    registryStatus: product.registryStatus || "",
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
    regulatoryNote,
    hiddenFromLibrary: hideLinkedDaoDi
  };
}

const RAW_ORIGIN_SKIP = new Set([
  "registry-manifest.json"
]);

export function loadRawOriginImports() {
  const rawDir = path.join(root, "data", "raw", "origin");
  if (!fs.existsSync(rawDir)) return [];
  const incomingDir = path.join(rawDir, "incoming");
  const out = [];

  function ingestFile(filePath) {
    const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (Array.isArray(payload)) out.push(...payload);
    else if (payload?.items) out.push(...payload.items);
    else if (payload?.id && payload?.name) out.push(payload);
  }

  fs.readdirSync(rawDir)
    .filter((name) => name.endsWith(".json") && !RAW_ORIGIN_SKIP.has(name))
    .forEach((name) => ingestFile(path.join(rawDir, name)));

  if (fs.existsSync(incomingDir)) {
    fs.readdirSync(incomingDir)
      .filter((name) => name.endsWith(".json"))
      .forEach((name) => ingestFile(path.join(incomingDir, name)));
  }

  return out
    .map((item) => ({
      ...item,
      name: normalizeOriginProductName(item.name),
      aliases: sanitizeUserFacingAliases(item.aliases || [])
    }))
    .filter((item) => !isExcludedOriginProduct(item));
}

function normalizeMaraRegistry(product) {
  const isMara = (product.giSystems || []).some((row) => row.system === "mara");
  if (!isMara) return product;
  const summary = /登记已于2022年废止|登记制度已于2022年/.test(product.summary || "")
    ? `${product.name}为农业农村部农产品地理标志历史登记产品（登记制度已于2022年11月停止新登记；本条整理自绿色食品中心公开历史名录，产品本身仍可作为产地参考）。`
    : product.summary;
  return {
    ...product,
    registryStatus: product.registryStatus || "historical",
    summary
  };
}

export function finalizeOriginProduct(product) {
  const base = normalizeMaraRegistry(expandDaoDiProvinces({
    ...product,
    name: normalizeOriginProductName(product.name),
    aliases: sanitizeUserFacingAliases(product.aliases || [])
  }));
  return {
    ...base,
    searchTerms: enrichOriginSearchTerms(base)
  };
}

export function buildOriginFoodEntries(products) {
  const aliasMap = loadFoodIdAliasMap();
  const catalogIndex = catalogNameIndex();
  const catalogFoodIds = new Set(
    loadFoodCatalogMeta().map((food) => resolveFoodId(food.id, aliasMap))
  );
  const linked = products.map((product) => {
    const baseFoodId = autoLinkBaseFoodId(product, catalogIndex, aliasMap);
    return originProductToFood({ ...product, baseFoodId }, aliasMap, catalogFoodIds);
  });
  return linked;
}
