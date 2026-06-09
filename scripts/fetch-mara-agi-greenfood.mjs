#!/usr/bin/env node
/**
 * Fetch all historical MARA 农产品地理标志 from China Green Food Center API.
 * Registration ended Nov 2022; this is the authoritative public query archive.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "data", "raw", "origin", "mara-agi");
const cutoff = "2026-06-09";
const PAGE_SIZE = 100;
const API = "http://www.greenfood.agri.cn/api/product/productSearch";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(pageIndex) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8", "User-Agent": UA },
    body: JSON.stringify({
      date: "",
      productName: "",
      address: "",
      certificatePossessor: "",
      certificateId: "",
      pageSize: pageIndex,
      pageNum: PAGE_SIZE
    })
  });
  if (!res.ok) throw new Error(`API page ${pageIndex} -> ${res.status}`);
  const payload = await res.json();
  if (!payload?.success) throw new Error(`API page ${pageIndex} failed: ${payload?.message || "unknown"}`);
  return payload.data;
}

function slugify(name) {
  return `mara-${String(name).trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48)}`;
}

fs.mkdirSync(outDir, { recursive: true });

const first = await fetchPage(1);
const total = first.total || 0;
const totalPages = Math.ceil(total / PAGE_SIZE);
const byName = new Map();

function ingestRows(rows) {
  rows.forEach((row) => {
    const name = String(row.productName || "").trim();
    if (!name || name.length < 2) return;
    const region = String(row.address || "").trim() || "CN";
    const existing = byName.get(name);
    if (existing) {
      if (!existing.regions.includes(region)) existing.regions.push(region);
      if (row.date && (!existing.registerYear || row.date < existing.registerYear)) {
        existing.registerYear = row.date;
      }
      return;
    }
    byName.set(name, {
      name,
      system: "mara",
      region,
      regions: [region],
      category: row.category || "",
      registerYear: row.date || "",
      certificateId: row.certificateId || "",
      certificatePossessor: row.certificatePossessor || "",
      sourceId: row.certificateId
        ? `mara-${String(row.certificateId).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
        : slugify(name),
      sourceUrl: "http://www.greenfood.agri.cn/xxcx/dlbzcx/",
      date: cutoff
    });
  });
}

ingestRows(first.data || []);
console.log(`[mara-agi] total ${total}, pages ${totalPages}`);

for (let page = 2; page <= totalPages; page++) {
  await sleep(80);
  try {
    const data = await fetchPage(page);
    ingestRows(data.data || []);
    if (page % 10 === 0 || page === totalPages) {
      console.log(`[mara-agi] page ${page}/${totalPages} unique ${byName.size}`);
    }
  } catch (err) {
    console.warn(`[mara-agi] page ${page} retry: ${err.message}`);
    await sleep(500);
    const data = await fetchPage(page);
    ingestRows(data.data || []);
  }
}

const items = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
const outFile = path.join(outDir, `products-through-${cutoff}.json`);
fs.writeFileSync(outFile, `${JSON.stringify({
  registry: "mara-agi-greenfood",
  cutoff,
  fetchedAt: new Date().toISOString().slice(0, 10),
  apiTotal: total,
  count: items.length,
  note: "农业农村部农产品地理标志登记名录（登记程序已于2022年11月废止）；数据来自中国绿色食品发展中心公开查询接口。",
  items
}, null, 2)}\n`, "utf8");

console.log(`[mara-agi] wrote ${items.length} unique products -> ${path.relative(root, outFile)}`);
