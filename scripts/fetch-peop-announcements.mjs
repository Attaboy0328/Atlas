#!/usr/bin/env node
/**
 * Fetch PEOP (生态原产地保护产品) from stycd certificate pages + ycdoffice announcements.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "raw", "origin", "peop-announcements");
const pdfDir = path.join(outDir, "pdfs");
const cutoff = "2026-06-09";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url, encoding = "utf-8") {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (encoding === "gbk" || encoding === "gb2312") {
    return new TextDecoder("gbk").decode(buf);
  }
  return buf.toString("utf8");
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseDate(html) {
  return html.match(/发布日期[：:]\s*(\d{4}-\d{2}-\d{2})/)?.[1]
    || html.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)?.slice(1).map((n) => String(n).padStart(2, "0")).join("-")
    || "";
}

function cleanProductName(raw) {
  return String(raw || "")
    .replace(/\n/g, "")
    .replace(/（[^）]*工厂[^）]*）/g, "")
    .replace(/\([^)]*工厂[^)]*\)/g, "")
    .replace(/["""].*?["""]/g, "")
    .replace(/（[^）]{0,8}牌）/g, "")
    .trim();
}

function extractProductsFromTable(html) {
  const products = [];
  [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].forEach((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)]
      .map((c) => stripHtml(c[1]).replace(/\n/g, " ").trim());
    if (cells.length < 3) return;
    if (/序号|申请人|产品名称/.test(cells[0])) return;
    const name = cleanProductName(cells[cells.length - 1]);
    if (isValidPeopName(name)) {
      products.push(name);
    }
  });
  return products;
}

const PEOP_GENERIC_SKIP = new Set(["板栗", "土鸡", "茶叶", "茶油", "肉羊", "笋干", "艾草", "猪肉", "鸡肉", "羊肉", "蓝莓", "紫薯", "辣椒", "羊"]);

function isValidPeopName(name) {
  const n = String(name || "").trim();
  if (n.length < 3 || n.length > 36) return false;
  if (/^的/.test(n)) return false;
  if (/有限公司|股份公司|农业农村局|人民政府|养殖场$|生态产业股份公司$/.test(n)) return false;
  if (PEOP_GENERIC_SKIP.has(n)) return false;
  if (/生态原产地|PEOP|证书|序号|申请人/.test(n)) return false;
  return true;
}

function extractProductFromH1(h1) {
  const text = stripHtml(h1).trim();
  if (!text) return [];

  const afterCompany = text
    .replace(/^[\u4e00-\u9fffA-Za-z0-9·（）()]+(?:有限公司|有限责任公司|股份公司|集团有限公司|集团|合作社|协会|政府|局|办公室|公司)/, "")
    .replace(/^[\u4e00-\u9fff]+(?:的)/, "")
    .trim();

  const primary = afterCompany.split(/[、,，]/)[0].trim();
  if (isValidPeopName(primary)) return [primary];

  const colonTail = text.split(/[：:]/).pop()?.trim() || "";
  const fromColon = colonTail.split(/[、,，]/)[0].trim();
  if (isValidPeopName(fromColon)) return [fromColon];

  if (isValidPeopName(text) && text.length <= 24) return [text];
  return [];
}

function parseProductsFromPdfText(text) {
  const products = new Set();
  [...text.matchAll(/^\s*\d{1,3}\s+[\u4e00-\u9fff（）()A-Za-z0-9·\-]{2,40}?\s+([\u4e00-\u9fff（）()A-Za-z0-9·\-、,，]{2,40})/gm)].forEach((m) => {
    cleanProductName(m[1]).split(/[、,，]/).forEach((n) => products.add(n.trim()));
  });
  extractProductsFromTable(`<table>${text.replace(/\|/g, "</td><td>")}</table>`).forEach((n) => products.add(n));
  [...text.matchAll(/产品名称[：:]\s*([\u4e00-\u9fff（）()A-Za-z0-9·、\-]{2,40})/g)]
    .forEach((m) => products.add(cleanProductName(m[1])));
  return [...products].filter((n) => n.length >= 2 && !/序号|申请人|生态原产地|中检协/.test(n));
}

async function crawlStycdCertificates(rows, byName) {
  const base = "http://www.stycd.org.cn/gonggongchaxun/zhengshuminglu/";
  let page = 1;
  while (page <= 80) {
    const url = page === 1 ? base : `${base}list_40_${page}.html`;
    await sleep(100);
    let html;
    try {
      html = await fetchHtml(url);
    } catch (err) {
      console.warn(`[peop] stycd page ${page} skip: ${err.message}`);
      break;
    }
    const detailLinks = [...html.matchAll(/href=\"(\/gonggongchaxun\/zhengshuminglu\/[^\"]+\.html)\"/g)]
      .map((m) => m[1]);
    if (!detailLinks.length && page > 1) break;

    for (const link of detailLinks) {
      await sleep(60);
      try {
        const detail = await fetchHtml(`http://www.stycd.org.cn${link}`);
        const h1 = detail.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
        const certDate = detail.match(/有效日期[：:]\s*(\d{4})年(\d{1,2})月(\d{1,2})日/)?.slice(1);
        const date = certDate
          ? certDate.map((n, i) => (i === 0 ? n : String(n).padStart(2, "0"))).join("-")
          : cutoff;
        extractProductFromH1(h1).forEach((name) => {
          rows.push({ name, date, region: "CN", sourceUrl: `http://www.stycd.org.cn${link}`, system: "peop", source: "stycd-cert" });
          if (!byName.has(name)) byName.set(name, rows[rows.length - 1]);
        });
      } catch (err) {
        console.warn(`[peop] stycd detail ${link}: ${err.message}`);
      }
    }
    console.log(`[peop] stycd page ${page} +${detailLinks.length} details (unique ${byName.size})`);
    const maxPage = Math.max(0, ...[...html.matchAll(/list_40_(\d+)\.html/g)].map((m) => +m[1]));
    if (page >= maxPage && maxPage > 0) break;
    page++;
  }
}

async function crawlYcdAnnouncements(rows, byName) {
  const ID_START = 74000;
  const ID_END = 82000;
  let hits = 0;

  for (let id = ID_START; id <= ID_END; id++) {
    const url = `http://ycdoffice.ciq.org.cn/fhdt/${id}.htm`;
    await sleep(40);
    let html;
    try {
      html = await fetchHtml(url, "gbk");
    } catch {
      continue;
    }
    if (!/生态原产地|PEOP|产品名称|中检协/.test(html)) continue;

    const date = parseDate(html);
    if (date && date > cutoff) continue;

    const products = extractProductsFromTable(html);
    if (!products.length) continue;

    hits++;
    products.forEach((name) => {
      rows.push({ name, date: date || cutoff, region: "CN", sourceUrl: url, system: "peop", source: "ycdoffice" });
      if (!byName.has(name)) byName.set(name, rows[rows.length - 1]);
    });

    const pdfLinks = [...html.matchAll(/href=\"([^\"]+\.pdf[^\"]*)\"/gi)].map((m) => {
      const link = m[1];
      return link.startsWith("http") ? link : `http://ycdoffice.ciq.org.cn${link.startsWith("/") ? "" : "/"}${link}`;
    });
    for (const pdfUrl of pdfLinks.slice(0, 3)) {
      try {
        await sleep(100);
        const buf = await fetchBuffer(pdfUrl);
        fs.mkdirSync(pdfDir, { recursive: true });
        const localName = path.basename(pdfUrl).replace(/[^\w.\-]+/g, "_").slice(0, 80);
        const localPath = path.join(pdfDir, localName);
        if (!fs.existsSync(localPath)) fs.writeFileSync(localPath, buf);
        const parser = new PDFParse({ data: buf });
        const parsed = await parser.getText();
        await parser.destroy();
        parseProductsFromPdfText(parsed.text || "").forEach((name) => {
          rows.push({ name, date: date || cutoff, region: "CN", sourceUrl: pdfUrl, system: "peop", source: "ycdoffice-pdf" });
          if (!byName.has(name)) byName.set(name, rows[rows.length - 1]);
        });
      } catch (err) {
        console.warn(`[peop] pdf ${pdfUrl}: ${err.message}`);
      }
    }

    if (hits % 25 === 0) console.log(`[peop] ycdoffice id ${id}, hits ${hits}, unique ${byName.size}`);
  }
  console.log(`[peop] ycdoffice done: ${hits} announcements`);
}

async function crawlYcdIndex(rows, byName) {
  const seeds = [
    "http://ycdoffice.ciq.org.cn/",
    "http://ycdoffice.ciq.org.cn/fhdt/index.htm"
  ];
  const queue = [...seeds];
  const visited = new Set();

  while (queue.length && visited.size < 200) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    try {
      await sleep(80);
      const html = await fetchHtml(url, url.includes("ycdoffice") ? "gbk" : "utf-8");
      const date = parseDate(html);
      if (!date || date <= cutoff) {
        extractProductsFromTable(html).forEach((name) => {
          rows.push({ name, date: date || cutoff, region: "CN", sourceUrl: url, system: "peop", source: "ycdoffice-index" });
          if (!byName.has(name)) byName.set(name, rows[rows.length - 1]);
        });
      }
      [...html.matchAll(/href=\"(\/fhdt\/\d+\.htm)\"/g)].forEach((m) => {
        queue.push(`http://ycdoffice.ciq.org.cn${m[1]}`);
      });
    } catch (err) {
      console.warn(`[peop] index ${url}: ${err.message}`);
    }
  }
}

fs.mkdirSync(outDir, { recursive: true });

const rows = [];
const byName = new Map();

console.log("[peop] crawling stycd certificates...");
await crawlStycdCertificates(rows, byName);
console.log("[peop] crawling ycdoffice index...");
await crawlYcdIndex(rows, byName);
console.log("[peop] crawling ycdoffice fhdt archive...");
await crawlYcdAnnouncements(rows, byName);

const items = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
const outFile = path.join(outDir, `products-through-${cutoff}.json`);
fs.writeFileSync(outFile, `${JSON.stringify({
  cutoff,
  fetchedAt: new Date().toISOString().slice(0, 10),
  count: items.length,
  items
}, null, 2)}\n`, "utf8");
console.log(`[peop] wrote ${items.length} unique PEOP products -> ${path.relative(root, outFile)}`);
