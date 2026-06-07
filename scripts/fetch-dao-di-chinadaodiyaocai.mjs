#!/usr/bin/env node
/**
 * Fetch dao-di system herb lists + compact detail fields from m.chinadaodiyaocai.com.
 * Output: data/raw/tcm/chinadaodiyaocai/*.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DAO_DI_SYSTEM_PAGES } from "./lib/dao-di-systems-meta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "raw", "tcm", "chinadaodiyaocai");
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15";
const DELAY_MS = 100;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function uniq(items) {
  return [...new Set((items || []).filter(Boolean))];
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

function extractDetailIds(html) {
  return [...new Set([...html.matchAll(/article\/detail-(\d+)\.html/g)].map((m) => m[1]))];
}

function extractPagination(html) {
  const m = html.match(/(\d+)\/(\d+)/);
  return m ? Number(m[2]) : 1;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/h\d>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sectionText(text, heading) {
  const re = new RegExp(`${heading}\\s*\\n+([\\s\\S]*?)(?=\\n(?:### |药材|中药|道地|相关|免责|$))`);
  const m = text.match(re);
  if (!m) return "";
  return m[1].replace(/\n+/g, " ").trim();
}

function fieldValue(text, label) {
  const re = new RegExp(`${label}[：:]\\s*([^\\n]+)`);
  return text.match(re)?.[1]?.trim() || "";
}

function parseDetailPage(html, detailId) {
  const text = htmlToText(html);
  let name = fieldValue(text, "中药名称")
    || html.match(/<h1[^>]*>([^<]+)/)?.[1]?.trim()
    || "";
  name = name.split(/[系。]/)[0].replace(/（[^）]+）$/, "").trim();
  const paren = (fieldValue(text, "中药名称") || "").match(/（([^）]+)）/);
  const aliases = fieldValue(text, "别 名") || fieldValue(text, "别名");
  const latinName = fieldValue(text, "中药学名（拉丁名）") || fieldValue(text, "拉丁名");
  const distribution = fieldValue(text, "产区分布")
    || sectionText(text, "分布产地")
    || sectionText(text, "### 分布产地");
  const family = fieldValue(text, "科");
  const efficacyClass = fieldValue(text, "功 效") || fieldValue(text, "功效");
  const daoDiRaw = sectionText(text, "道地性");
  const daoDiSystems = daoDiRaw
    .split(/[、,，\s]+/)
    .map((s) => s.trim())
    .filter((s) => /药$/.test(s));
  const overview = sectionText(text, "概述：") || sectionText(text, "### 概述：");
  const efficacy = sectionText(text, "药材功效") || fieldValue(text, "药材功效");
  const indications = sectionText(text, "药材主治");
  const partUsed = fieldValue(text, "入药部位");
  const productVariants = [];
  if (/浙麦冬|川麦冬|杭麦冬/.test(text)) {
    if (/浙麦冬/.test(text)) productVariants.push("浙麦冬");
    if (/川麦冬/.test(text)) productVariants.push("川麦冬");
    if (/杭麦冬/.test(text)) productVariants.push("杭麦冬");
  }

  return {
    detailId,
    name,
    aliases: uniq([
      ...(aliases ? aliases.split(/[、,，]/).map((s) => s.trim()).filter(Boolean) : []),
      ...(paren ? [paren[1]] : [])
    ]),
    latinName,
    family: family.replace(/科$/, "") ? family : "",
    efficacyClass,
    originDistribution: distribution.slice(0, 200),
    daoDiSystems: [...new Set(daoDiSystems)],
    overview: overview.slice(0, 280),
    efficacy: efficacy.slice(0, 160),
    indications: indications.slice(0, 200),
    partUsed,
    productVariants,
    sourceUrl: `http://www.chinadaodiyaocai.com/article/detail-${detailId}.html`
  };
}

async function fetchSystemList(system) {
  const html1 = await fetchHtml(`http://m.chinadaodiyaocai.com/article/yaocai-${system.siteYaocaiId}-1.html`);
  const pages = extractPagination(html1);
  const detailIds = extractDetailIds(html1);
  for (let p = 2; p <= pages; p++) {
    await sleep(DELAY_MS);
    const html = await fetchHtml(`http://m.chinadaodiyaocai.com/article/yaocai-${system.siteYaocaiId}-${p}.html`);
    detailIds.push(...extractDetailIds(html));
  }
  return [...new Set(detailIds)];
}

fs.mkdirSync(outDir, { recursive: true });

const systemMembership = new Map();
const allDetailIds = new Set();

for (const system of DAO_DI_SYSTEM_PAGES) {
  console.log(`[fetch] ${system.name} …`);
  const ids = await fetchSystemList(system);
  ids.forEach((id) => {
    allDetailIds.add(id);
    if (!systemMembership.has(id)) systemMembership.set(id, []);
    systemMembership.get(id).push(system.id);
  });
  fs.writeFileSync(
    path.join(outDir, `system-${system.id}.json`),
    `${JSON.stringify({ system, detailIds: ids }, null, 2)}\n`,
    "utf8"
  );
  console.log(`  herbs ${ids.length}`);
  await sleep(DELAY_MS);
}

const details = [];
const detailList = [...allDetailIds].sort((a, b) => Number(a) - Number(b));
let idx = 0;
for (const detailId of detailList) {
  idx += 1;
  if (idx % 50 === 0) console.log(`[fetch] details ${idx}/${detailList.length}`);
  await sleep(DELAY_MS);
  try {
    const html = await fetchHtml(`http://m.chinadaodiyaocai.com/article/detail-${detailId}.html`);
    const parsed = parseDetailPage(html, detailId);
    parsed.systemIds = systemMembership.get(detailId) || [];
    if (parsed.name) details.push(parsed);
  } catch (err) {
    console.warn(`  skip detail-${detailId}: ${err.message}`);
  }
}

fs.writeFileSync(
  path.join(outDir, "details-compact.json"),
  `${JSON.stringify(details, null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify({
    fetchedAt: new Date().toISOString().slice(0, 10),
    systems: DAO_DI_SYSTEM_PAGES.length,
    uniqueDetails: details.length,
    source: "chinadaodiyaocai.com"
  }, null, 2)}\n`,
  "utf8"
);

console.log(`Done: ${details.length} detail profiles -> ${outDir}`);
