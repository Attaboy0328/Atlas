#!/usr/bin/env node
/**
 * Create origin-product stubs for all dao-di herb profiles not yet represented.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadFoodIdAliasMap, resolveFoodId, root } from "./lib/food-catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tcmDir = path.join(root, "data", "tcm");
const outFile = path.join(root, "data", "raw", "origin", "dao-di-origin-stubs.json");

function readJson(file, fallback = []) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function slugify(name) {
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "-").slice(0, 40) || "herb";
}

function parseProvinceTokens(place) {
  return String(place || "")
    .split(/[、,，/]/)
    .map((part) => part.replace(/等$/g, "").trim())
    .filter((part) => part && part.length <= 8 && /[\u4e00-\u9fff]/.test(part));
}

const DAO_DI_PROVINCE_PRIORITY = {
  "sichuan-pepper": ["四川", "陕西", "河北", "山东"]
};

function buildProvinces(profile, canonicalId) {
  const parsed = [];
  (profile.daoDiRegions || []).forEach((row) => {
    parsed.push(...parseProvinceTokens(row.place));
    if (row.province) parsed.push(row.province);
  });
  let provinces = [...new Set(parsed)];
  const priority = DAO_DI_PROVINCE_PRIORITY[canonicalId] || [];
  if (priority.length) {
    provinces = [
      ...priority.filter((p) => provinces.includes(p)),
      ...provinces.filter((p) => !priority.includes(p))
    ];
  }
  return provinces.slice(0, 6);
}

const profiles = readJson(path.join(tcmDir, "dao-di-herb-profiles.json"));
const existing = readJson(path.join(root, "data/cn/origin-products.json"));
const aliasMap = loadFoodIdAliasMap();

const existingNames = new Set(existing.map((p) => p.name));
const existingIds = new Set(existing.map((p) => p.id));
const existingBase = new Set(existing.map((p) => p.baseFoodId).filter(Boolean));

const items = [];
profiles.forEach((profile) => {
  const canonicalId = resolveFoodId(profile.canonicalId, aliasMap);
  const name = profile.name;
  if (existingNames.has(name)) return;
  if (existingBase.has(canonicalId) && profile.linkStatus === "linked") {
    // linked herb already has GI via base - still add regional variant if name differs
  }
  const id = `daodi-${slugify(canonicalId || name)}-origin`;
  if (existingIds.has(id)) return;

  const provinces = buildProvinces(profile, canonicalId);

  items.push({
    id,
    name: `${name}（道地）`,
    category: "中药材",
    provinces,
    aliases: [name, ...(profile.productVariants || [])].filter(Boolean),
    searchTerms: [name, "道地", "道地产区", ...(profile.daoDiSystems || [])],
    baseFoodId: profile.linkStatus === "linked" ? canonicalId : null,
    giSystems: [],
    daoDi: {
      isAuthentic: true,
      regions: (profile.daoDiRegions || []).map((r) => r.place || r.province).filter(Boolean).slice(0, 6)
    },
    summary: profile.overview || `${name}为道地药材体系整理条目，产区与概述来自公开道地药材网摘要。`,
    provenance: {
      source: "chinadaodiyaocai.com",
      sourceUrl: profile.provenance?.sourceUrl || "",
      sourceId: `daodi-${canonicalId || slugify(name)}`,
      fetchedAt: new Date().toISOString().slice(0, 10),
      note: "道地药材产区摘要；药典正文以 Atlas 药典2025 为准。"
    }
  });
});

const payload = {
  registry: "dao-di-origin-stubs",
  fetchedAt: new Date().toISOString().slice(0, 10),
  note: "Auto-generated dao-di origin stubs for herbs without dedicated GI entries.",
  items
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`[dao-di-origin] wrote ${items.length} stubs -> ${path.relative(root, outFile)}`);
