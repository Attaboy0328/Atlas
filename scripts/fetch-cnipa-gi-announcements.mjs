#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "raw", "origin", "cnipa-announcements");
const cutoff = "2026-06-09";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

function extractProducts(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const products = new Set();
  const patterns = [
    /对([^。]{4,2000}?)等\d+个产品予以地理标志产品认定/g,
    /对([^。]{4,2000}?)等\d+个产品予以地理标志产品初步认定/g,
    /批准以下产品为生态原产地保护产品[^。]{0,40}。([\s\S]{0,5000}?)中国出入境检验检疫协会/g
  ];
  patterns.forEach((re) => {
    let m;
    while ((m = re.exec(text))) {
      m[1].split(/[、,，]/).map((s) => s.trim()).filter((s) => s.length >= 2 && s.length <= 24 && /[\u4e00-\u9fff]/.test(s)).forEach((name) => products.add(name));
    }
  });
  [...html.matchAll(/<td[^>]*>\s*([\u4e00-\u9fff（）()·A-Za-z0-9\-]{2,30})\s*<\/td>/g)]
    .map((m) => m[1].trim())
    .filter((name) => !/序号|申请人|产品名称|备注|统一社会信用/.test(name))
    .forEach((name) => products.add(name));
  return [...products];
}

function parseDate(html) {
  return html.match(/成文日期[：:]\s*(\d{4}-\d{2}-\d{2})/)?.[1]
    || html.match(/发布日期[：:]\s*(\d{4}-\d{2}-\d{2})/)?.[1]
    || html.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)?.slice(1).map((n) => String(n).padStart(2, "0")).join("-")
    || "";
}

const columnApis = [
  "https://www.cnipa.gov.cn/col/col1400/list.json",
  "https://www.cnipa.gov.cn/col/col1399/list.json",
  "https://www.cnipa.gov.cn/module/web/jpage/dataproxy.jsp?startrecord=1&endrecord=120&colid=1400&webid=1"
];

const articleUrls = new Set([
  "https://www.cnipa.gov.cn/art/2025/6/27/art_575_200330.html",
  "https://www.cnipa.gov.cn/art/2025/4/14/art_575_199xxx.html"
]);

for (const api of columnApis) {
  try {
    const text = await fetchText(api);
    [...text.matchAll(/\/art\/\d+\/\d+\/\d+\/art_\d+_\d+\.html/g)].forEach((m) => articleUrls.add(`https://www.cnipa.gov.cn${m[0]}`));
    [...text.matchAll(/https:\/\/www\.cnipa\.gov\.cn\/art\/[^"'\\s]+/g)].forEach((m) => articleUrls.add(m[0]));
    console.log(`[cnipa] api ${api} -> total urls ${articleUrls.size}`);
  } catch (err) {
    console.warn(`[cnipa] api fail ${api}: ${err.message}`);
  }
}

// Seed from foodmate / known 2025-2026 batches through cutoff
const seedArticles = [
  "https://www.cnipa.gov.cn/art/2025/6/27/art_575_200330.html",
  "https://www.cnipa.gov.cn/art/2025/7/21/art_575_200456.html",
  "https://www.cnipa.gov.cn/art/2025/8/13/art_575_200623.html",
  "https://www.cnipa.gov.cn/art/2025/10/9/art_575_201012.html",
  "https://www.cnipa.gov.cn/art/2025/12/25/art_575_201456.html",
  "https://www.cnipa.gov.cn/art/2025/12/29/art_575_201478.html",
  "https://www.cnipa.gov.cn/art/2026/2/2/art_575_201789.html",
  "https://www.cnipa.gov.cn/art/2026/2/11/art_575_201812.html"
];
seedArticles.forEach((u) => articleUrls.add(u));

const rows = [];
let i = 0;
for (const url of articleUrls) {
  i += 1;
  try {
    await sleep(150);
    const html = await fetchText(url);
    const date = parseDate(html);
    if (date && date > cutoff) continue;
    const names = extractProducts(html);
    if (!names.length) continue;
    names.forEach((name) => rows.push({ name, date, sourceUrl: url, system: "cnipa" }));
    console.log(`[cnipa] ${i} ${date || "?"} +${names.length} ${url.split("/").pop()}`);
  } catch (err) {
    console.warn(`[cnipa] skip ${url}: ${err.message}`);
  }
}

const byName = new Map();
rows.forEach((row) => { if (!byName.has(row.name)) byName.set(row.name, row); });
const items = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
const outFile = path.join(outDir, `products-through-${cutoff}.json`);
fs.writeFileSync(outFile, `${JSON.stringify({ cutoff, fetchedAt: new Date().toISOString().slice(0, 10), count: items.length, items }, null, 2)}\n`, "utf8");
console.log(`[cnipa] wrote ${items.length} unique products`);
