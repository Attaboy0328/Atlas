#!/usr/bin/env node
/**
 * Merge raw chinadaodiyaocai fetch into dao-di-systems, dao-di-herb-profiles, dao-di-regions.
 */
import fs from "fs";
import path from "path";
import {
  loadFoodCatalogMeta,
  loadFoodIdAliasMap,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";
import {
  DAO_DI_MANUAL_LINK,
  DAO_DI_ORPHAN_ID_BY_NAME
} from "./lib/dao-di-orphan-ids.mjs";

const MANUAL_NAME_TO_CANONICAL = {
  "延胡索（元胡）": "延胡索",
  元胡: "延胡索",
  禹南星: "天南星",
  虎掌南星: "天南星",
  百合花: "百合",
  巫山淫羊藿: "淫羊藿",
  蛤蟆油: "蛤蟆油",
  滑石粉: "滑石",
  马钱子粉: "马钱子",
  焦槟榔: "槟榔",
  苦参实: "苦参",
  银耳: "white-fungus",
  白木耳: "white-fungus",
  沙苑子: "astragalus-complanatus",
  沙苑蒺藜: "astragalus-complanatus",
  黄芪: "astragalus",
  广防己: "aristolochia-fangchi",
  防己: "stephania-tetrandra",
  苦杏仁: "almond-bitter",
  柑皮: "chenpi",
  柚果: "pomelo",
  荔枝壳: "lychee",
  荔枝: "lychee"
};
import { DAO_DI_SYSTEM_PAGES, DAO_DI_SYSTEM_BY_NAME } from "./lib/dao-di-systems-meta.mjs";

const tcmDir = path.join(root, "data", "tcm");
const rawDir = path.join(root, "data", "raw", "tcm", "chinadaodiyaocai");
const detailsPath = path.join(rawDir, "details-compact.json");

function readJson(file, fallback = null) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function uniq(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function normalizeName(name) {
  return String(name || "").trim().replace(/\s+/g, "");
}

function buildNameIndex() {
  const aliasMap = loadFoodIdAliasMap();
  const herbs = readJson(path.join(tcmDir, "herbs-chp2025.json"), []);
  const byName = new Map();
  const byAlias = new Map();

  function register(name, id) {
    const key = normalizeName(name);
    const resolved = resolveFoodId(id, aliasMap);
    if (!key || !resolved) return;
    if (!byName.has(key)) byName.set(key, resolved);
  }

  herbs.forEach((herb) => {
    register(herb.name, herb.id);
    (herb.aliases || []).forEach((alias) => {
      const ak = normalizeName(alias);
      if (ak && !byAlias.has(ak)) byAlias.set(ak, resolveFoodId(herb.id, aliasMap));
    });
  });

  loadFoodCatalogMeta().forEach((food) => register(food.name, food.id));
  Object.entries(DAO_DI_MANUAL_LINK).forEach(([name, id]) => register(name, id));
  Object.entries(DAO_DI_ORPHAN_ID_BY_NAME).forEach(([name, id]) => register(name, id));

  Object.entries(MANUAL_NAME_TO_CANONICAL).forEach(([name, target]) => {
    const targetKey = normalizeName(target);
    const id = byName.get(targetKey) || byAlias.get(targetKey);
    if (id) register(name, id);
  });

  return { aliasMap, byName, byAlias, herbs };
}

function resolveCanonicalId(raw, index) {
  const { aliasMap, byName, byAlias } = index;
  const name = normalizeName(raw.name);
  if (!name) return null;

  const manualId = DAO_DI_MANUAL_LINK[raw.name];
  if (manualId) return resolveFoodId(manualId, aliasMap);

  const orphanId = DAO_DI_ORPHAN_ID_BY_NAME[raw.name];
  if (orphanId) return orphanId;

  if (MANUAL_NAME_TO_CANONICAL[raw.name]) {
    const manualKey = normalizeName(MANUAL_NAME_TO_CANONICAL[raw.name]);
    const manualHit = byName.get(manualKey) || byAlias.get(manualKey);
    if (manualHit) return resolveFoodId(manualHit, aliasMap);
  }

  let hit = byName.get(name) || byAlias.get(name);
  if (hit) return resolveFoodId(hit, aliasMap);

  (raw.aliases || []).forEach((alias) => {
    if (hit) return;
    const ak = normalizeName(alias);
    hit = byName.get(ak) || byAlias.get(ak);
  });
  if (hit) return resolveFoodId(hit, aliasMap);

  const stripped = name
    .replace(/^(制|盐|醋|酒|蜜|炒|炙|煅|蒸|姜)/, "")
    .replace(/(炭|片|粉|子|仁|壳|皮|根|花|叶|藤|油|霜|露|膏|浆)$/, "");
  if (stripped !== name) {
    hit = byName.get(stripped) || byAlias.get(stripped);
    if (hit) return resolveFoodId(hit, aliasMap);
  }

  return `daodi-site-${raw.detailId}`;
}

function cleanRawName(name) {
  return String(name || "")
    .split(/[系。]/)[0]
    .replace(/（[^）]+）/g, "")
    .trim();
}

function parseProvinceHints(text) {
  const provinces = [];
  const PROVINCES = [
    "黑龙江", "内蒙古", "吉林", "辽宁", "河北", "山西", "山东", "河南", "江苏", "安徽",
    "浙江", "福建", "江西", "湖北", "湖南", "广东", "广西", "海南", "四川", "重庆",
    "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "台湾", "香港", "澳门"
  ];
  PROVINCES.forEach((p) => {
    if (text.includes(p)) provinces.push(p);
  });
  return provinces;
}

function mergeDaoDiSystems(siteSystems, listSystems) {
  const names = uniq([
    ...siteSystems,
    ...listSystems.map((id) => DAO_DI_SYSTEM_PAGES.find((s) => s.id === id)?.name).filter(Boolean)
  ]);
  return uniq(names.map((n) => DAO_DI_SYSTEM_BY_NAME[n] || null).filter(Boolean));
}

function placeFromDistribution(text, name) {
  const t = String(text || "").trim();
  if (!t) return null;
  const provinces = parseProvinceHints(t);
  const province = provinces[0] || "";
  const place = t.length <= 24 ? t : (province ? `${province}${name}` : name);
  return { place: place.slice(0, 40), province };
}

const index = buildNameIndex();
const rawDetails = readJson(detailsPath, []);
if (!rawDetails?.length) {
  console.error("Missing raw details — run: node scripts/fetch-dao-di-chinadaodiyaocai.mjs");
  process.exit(1);
}

const existingRegions = readJson(path.join(tcmDir, "dao-di-regions.json"), []);
const regionByCanonical = new Map(existingRegions.map((r) => [resolveFoodId(r.canonicalId, index.aliasMap), r]));

const profilesByCanonical = new Map();
const unmapped = [];

rawDetails.forEach((raw) => {
  raw.name = cleanRawName(raw.name);
  const canonicalId = resolveCanonicalId(raw, index);
  if (!canonicalId) {
    unmapped.push(raw.name);
    return;
  }
  const isOrphan = canonicalId.startsWith("daodi-site-");
  if (isOrphan) unmapped.push(raw.name);

  const daoDiSystemIds = mergeDaoDiSystems(raw.daoDiSystems || [], raw.systemIds || []);
  const regionHint = placeFromDistribution(raw.originDistribution, raw.name);
  const daoDiRegions = regionHint ? [regionHint] : [];

  const profile = profilesByCanonical.get(canonicalId) || {
    canonicalId,
    name: raw.name,
    linkStatus: isOrphan ? "site-only" : "linked",
    daoDiSystemIds: [],
    daoDiSystems: [],
    taxonomy: {},
    originDistribution: "",
    daoDiRegions: [],
    efficacyClass: "",
    efficacy: "",
    indications: "",
    partUsed: "",
    productVariants: [],
    overview: "",
    provenance: {
      source: "chinadaodiyaocai.com",
      sourceUrl: raw.sourceUrl,
      detailId: raw.detailId,
      note: "道地体系与产区摘要整理自道地药材网公开条目；药典正文以 Atlas 药典2025 为准。"
    }
  };

  profile.daoDiSystemIds = uniq([...profile.daoDiSystemIds, ...daoDiSystemIds]);
  profile.daoDiSystems = uniq([
    ...profile.daoDiSystems,
    ...daoDiSystemIds.map((id) => DAO_DI_SYSTEM_PAGES.find((s) => s.id === id)?.name).filter(Boolean)
  ]);
  if (raw.latinName && !profile.taxonomy.latinName) profile.taxonomy.latinName = raw.latinName;
  if (raw.family && !profile.taxonomy.family) profile.taxonomy.family = raw.family;
  if (raw.originDistribution && raw.originDistribution.length > profile.originDistribution.length) {
    profile.originDistribution = raw.originDistribution;
  }
  if (raw.efficacyClass) profile.efficacyClass = raw.efficacyClass;
  if (raw.efficacy) profile.efficacy = raw.efficacy;
  if (raw.indications) profile.indications = raw.indications;
  if (raw.partUsed) profile.partUsed = raw.partUsed;
  if (raw.overview && raw.overview.length > (profile.overview || "").length) profile.overview = raw.overview;
  profile.productVariants = uniq([...(profile.productVariants || []), ...(raw.productVariants || [])]);

  raw.daoDiRegions = daoDiRegions;
  daoDiRegions.forEach((row) => {
    const key = `${row.place}|${row.province}`;
    const seen = profile.daoDiRegions.map((r) => `${r.place}|${r.province}`);
    if (!seen.includes(key)) profile.daoDiRegions.push(row);
  });

  profilesByCanonical.set(canonicalId, profile);
});

const profiles = [...profilesByCanonical.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

const systemHerbs = Object.fromEntries(DAO_DI_SYSTEM_PAGES.map((s) => [s.id, []]));
profiles.forEach((p) => {
  p.daoDiSystemIds.forEach((sid) => {
    if (systemHerbs[sid]) systemHerbs[sid].push(p.canonicalId);
  });
});

const systems = DAO_DI_SYSTEM_PAGES.map((system) => ({
  ...system,
  representativeHerbIds: uniq(systemHerbs[system.id] || []).sort(),
  herbCount: uniq(systemHerbs[system.id] || []).length,
  sources: [
    {
      title: "道地药材网",
      url: `http://www.chinadaodiyaocai.com/article/yaocai-${system.siteYaocaiId}.html`
    }
  ]
}));

const mergedRegions = new Map();
existingRegions.forEach((row) => {
  const id = resolveFoodId(row.canonicalId, index.aliasMap);
  mergedRegions.set(id, { ...row, canonicalId: id });
});

profiles.forEach((profile) => {
  const id = profile.canonicalId;
  const existing = mergedRegions.get(id);
  const regions = uniq([
    ...(existing?.daoDiRegions || []),
    ...profile.daoDiRegions
  ].map((r) => JSON.stringify(r))).map((s) => JSON.parse(s));

  const profileSystems = profile.daoDiSystems || [];
  mergedRegions.set(id, {
    canonicalId: id,
    name: existing?.name || profile.name,
    daoDiRegions: regions,
    daoDiSystemIds: uniq([...(existing?.daoDiSystemIds || []), ...profile.daoDiSystemIds]),
    daoDiSystems: uniq([...(existing?.daoDiSystems || []), ...profileSystems]),
    sources: uniq([
      ...(existing?.sources || []),
      "道地药材网整理",
      "《中国药材志》",
      "《中华本草》"
    ])
  });
});

const daoDiRegions = [...mergedRegions.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

fs.writeFileSync(path.join(tcmDir, "dao-di-systems.json"), `${JSON.stringify(systems, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(tcmDir, "dao-di-herb-profiles.json"), `${JSON.stringify(profiles, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(tcmDir, "dao-di-regions.json"), `${JSON.stringify(daoDiRegions, null, 2)}\n`, "utf8");

console.log(`Dao-di systems: ${systems.length}`);
console.log(`Dao-di herb profiles: ${profiles.length} (unmapped names: ${unmapped.length})`);
console.log(`Dao-di regions merged: ${daoDiRegions.length}`);
if (unmapped.length) {
  console.log(`  unmapped sample: ${unmapped.slice(0, 15).join("、")}`);
}
