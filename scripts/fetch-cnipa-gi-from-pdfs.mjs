#!/usr/bin/env node
/**
 * Fetch CNIPA GI product names from announcement PDF attachments through cutoff date.
 */
import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "raw", "origin", "cnipa-announcements");
const pdfDir = path.join(outDir, "pdfs");
const cutoff = "2026-06-09";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const COLUMNS = [
  { colid: 1400, unitid: 4536, label: "认定公告" },
  { colid: 1399, unitid: 4535, label: "初步认定公告" }
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function parseDate(html) {
  return html.match(/成文日期[：:]\s*(\d{4}-\d{2}-\d{2})/)?.[1]
    || html.match(/发布日期[：:]\s*(\d{4}-\d{2}-\d{2})/)?.[1]
    || html.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)?.slice(1).map((n) => String(n).padStart(2, "0")).join("-")
    || "";
}

function extractArticleUrls(html) {
  return [...new Set([...html.matchAll(/https:\/\/www\.cnipa\.gov\.cn\/art\/\d+\/\d+\/\d+\/art_\d+_\d+\.html/g)].map((m) => m[0]))];
}

function extractPdfLinks(html) {
  return [...html.matchAll(/href=\"(\/module\/download\/downfile\.jsp[^\"]+\.pdf[^\"]*)\"/gi)]
    .map((m) => m[1].replace(/showname =/g, "showname="))
    .filter((link, i, arr) => arr.indexOf(link) === i);
}

function parseProductsFromPdfText(text) {
  const products = new Set();
  const rowRe = /^\s*(\d{1,4})\s+([\u4e00-\u9fff（）()A-Za-z0-9·\-]{2,24})\s+([\u4e00-\u9fff]{2,8}(?:省|市|自治区)|上海市|北京市|天津市|重庆市)/gm;
  let m;
  while ((m = rowRe.exec(text))) products.add(m[2].trim());
  return [...products].filter((name) => !/序号|产品名称|附件|国家知识产权局|地理标志/.test(name));
}

async function collectColumnArticles(column) {
  const articleUrls = new Set();
  for (let page = 1; page <= 200; page++) {
    const proxy = `https://www.cnipa.gov.cn/module/web/jpage/dataproxy.jsp?page=${page}&webid=1&path=https://www.cnipa.gov.cn/&columnid=${column.colid}&unitid=${column.unitid}&webname=%25E5%259B%25BD%25E5%25AE%25B6%25E7%259F%25A5%25E8%25AF%2586%25E4%25BA%25A7%25E6%259D%2583%25E5%25B1%2580&permissiontype=0`;
    try {
      const xml = await fetchText(proxy);
      const urls = extractArticleUrls(xml);
      if (!urls.length) break;
      urls.forEach((u) => articleUrls.add(u));
      console.log(`[cnipa-pdf] ${column.label} page ${page} +${urls.length} (total ${articleUrls.size})`);
      if (urls.length < 40) break;
      await sleep(100);
    } catch (err) {
      console.warn(`[cnipa-pdf] proxy page ${page} fail: ${err.message}`);
      break;
    }
  }
  try {
    const indexHtml = await fetchText(`https://www.cnipa.gov.cn/col/col${column.colid}/index.html`);
    extractArticleUrls(indexHtml).forEach((u) => articleUrls.add(u));
  } catch (err) {
    console.warn(`[cnipa-pdf] index fail col${column.colid}: ${err.message}`);
  }
  return articleUrls;
}

fs.mkdirSync(pdfDir, { recursive: true });

const articleUrls = new Set();
for (const column of COLUMNS) {
  const urls = await collectColumnArticles(column);
  urls.forEach((u) => articleUrls.add(u));
}
console.log(`[cnipa-pdf] discovered ${articleUrls.size} article urls`);

const rows = [];
let articleIdx = 0;
for (const articleUrl of articleUrls) {
  articleIdx += 1;
  try {
    await sleep(120);
    const html = await fetchText(articleUrl);
    const date = parseDate(html);
    if (date && date > cutoff) continue;
    const pdfs = extractPdfLinks(html);
    if (!pdfs.length) continue;
    const infoPdf = pdfs.find((p) => /公告信息|showname=%E/.test(decodeURIComponent(p))) || pdfs[0];
    const pdfUrl = infoPdf.startsWith("http") ? infoPdf : `https://www.cnipa.gov.cn${infoPdf}`;
    const fileName = pdfUrl.match(/filename=([^&]+)/)?.[1] || `${articleIdx}.pdf`;
    const localPdf = path.join(pdfDir, fileName);
    if (!fs.existsSync(localPdf)) {
      const buf = await fetchBuffer(pdfUrl);
      fs.writeFileSync(localPdf, buf);
    }
    const parser = new PDFParse({ data: fs.readFileSync(localPdf) });
    const parsed = await parser.getText();
    await parser.destroy();
    const names = parseProductsFromPdfText(parsed.text);
    if (!names.length) continue;
    names.forEach((name) => rows.push({ name, date, sourceUrl: articleUrl, system: "cnipa", pdf: fileName }));
    console.log(`[cnipa-pdf] ${articleIdx}/${articleUrls.size} ${date || "?"} +${names.length} ${articleUrl.split("/").slice(-1).join("/")}`);
  } catch (err) {
    console.warn(`[cnipa-pdf] skip ${articleUrl}: ${err.message}`);
  }
}

const byName = new Map();
rows.forEach((row) => { if (!byName.has(row.name)) byName.set(row.name, row); });
const items = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
const outFile = path.join(outDir, `products-through-${cutoff}.json`);
fs.writeFileSync(outFile, `${JSON.stringify({ cutoff, fetchedAt: new Date().toISOString().slice(0, 10), count: items.length, items }, null, 2)}\n`, "utf8");
console.log(`[cnipa-pdf] wrote ${items.length} unique CNIPA GI products`);
