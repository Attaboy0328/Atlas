#!/usr/bin/env node
/**
 * Build dao-di site-only herb cards so orphan dao-di profiles are searchable in Atlas.
 */
import fs from "fs";
import path from "path";
import { root } from "./lib/food-catalog.mjs";
import { DAO_DI_ORPHAN_ID_BY_NAME, DAO_DI_ORPHAN_RELATED } from "./lib/dao-di-orphan-ids.mjs";

const tcmDir = path.join(root, "data", "tcm");
const rawDir = path.join(root, "data", "raw", "tcm", "chinadaodiyaocai");

function readJson(file, fallback = []) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function uniq(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function cleanText(value) {
  return String(value || "").trim();
}

function cleanAlias(value) {
  const alias = cleanText(value);
  if (!alias) return "";
  if (alias.startsWith("中药学名（拉丁名）")) return "";
  if (alias === "产区分布") return "";
  return alias;
}

function deriveEffects(profile) {
  const pieces = cleanText(profile.efficacy)
    .replace(/（《[^）]+》）/g, "")
    .split(/[，、；。]/)
    .map(cleanText)
    .filter((item) => item && item.length <= 12);
  if (pieces.length) return uniq(pieces).slice(0, 4);
  const fallback = cleanText(profile.efficacyClass).replace(/药$/, "");
  return fallback ? [fallback] : [];
}

function buildSummary(profile) {
  const systems = uniq(profile.daoDiSystems || []).slice(0, 3);
  if (systems.length) {
    return `${profile.name}为道地药材参考条目，Atlas 当前未对应到药典2025正名；可查阅其${systems.join("、")}等体系与产区摘要。`;
  }
  return `${profile.name}为道地药材参考条目，Atlas 当前未对应到药典2025正名；可查阅其道地体系与产区摘要。`;
}

const orphanIdSet = new Set(Object.values(DAO_DI_ORPHAN_ID_BY_NAME));
const profiles = readJson(path.join(tcmDir, "dao-di-herb-profiles.json"), []);
const rawDetails = readJson(path.join(rawDir, "details-compact.json"), []);
const rawByDetailId = new Map(rawDetails.map((row) => [String(row.detailId), row]));

const herbs = profiles
  .filter((profile) => orphanIdSet.has(profile.canonicalId))
  .map((profile) => {
    const detailId = String(profile.provenance?.detailId || "");
    const raw = rawByDetailId.get(detailId);
    const aliases = uniq(raw?.aliases || []).map(cleanAlias).filter(Boolean);
    const searchTerms = uniq([
      profile.name,
      ...aliases,
      cleanText(profile.taxonomy?.latinName),
      cleanText(profile.efficacyClass),
      ...(profile.daoDiSystems || []),
      ...(profile.daoDiRegions || []).map((row) => cleanText(row.place))
    ]);

    const sourceRow = {
      title: "道地药材网",
      summary: `站点参考条目整理；非药典2025正名。${detailId ? ` detailId ${detailId}。` : ""}`.trim()
    };
    const sourceUrl = cleanText(raw?.sourceUrl || profile.provenance?.sourceUrl);
    if (sourceUrl) sourceRow.url = sourceUrl;

    return {
      id: profile.canonicalId,
      name: profile.name,
      aliases,
      en: "",
      pinyin: "",
      initials: "",
      itemKind: "tcm-herb",
      usageScope: "dao-di-reference",
      officialFoodMedicine: false,
      category: "中药材",
      nature: "待考",
      flavor: "",
      meridians: [],
      partUsed: cleanText(profile.partUsed),
      effects: deriveEffects(profile),
      relatedForms: DAO_DI_ORPHAN_RELATED[profile.canonicalId] || [],
      summary: buildSummary(profile),
      caution: "道地药材参考档，非药典2025正名；仅供查阅，不替代诊断、处方或医嘱。",
      sources: [sourceRow],
      regions: ["CN"],
      searchTerms
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

const outputPath = path.join(tcmDir, "dao-di-orphan-herbs.json");
fs.writeFileSync(outputPath, `${JSON.stringify(herbs, null, 2)}\n`, "utf8");

console.log(`Dao-di orphan herbs: ${herbs.length}`);
console.log(`Output: ${path.relative(root, outputPath)}`);
