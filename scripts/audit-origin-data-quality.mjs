#!/usr/bin/env node
/**
 * Scan origin-products.json for name/alias quality issues.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  isValidOriginProductName,
  normalizeOriginProductName,
  sanitizeUserFacingAliases
} from "./lib/origin-products.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = path.join(root, "data", "cn", "origin-products.json");

if (!fs.existsSync(file)) {
  console.error("Missing data/cn/origin-products.json — run ingest:origin first.");
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(file, "utf8"));
const issues = {
  invalidName: [],
  internalAlias: [],
  phoneName: [],
  htmlEntityName: [],
  seriesOrNonFood: []
};

const SERIES_NON_FOOD_RE = /系列|等产品$|初加工|分析仪|仪器|设备|机械|毛巾|有限公司|农业局/;

products.forEach((product) => {
  const name = normalizeOriginProductName(product.name);
  if (!isValidOriginProductName(name)) issues.invalidName.push({ id: product.id, name: product.name });
  if (isValidOriginProductName(name) && SERIES_NON_FOOD_RE.test(name)) {
    issues.seriesOrNonFood.push({ id: product.id, name: product.name });
  }
  if (/^\d{10,}$/.test(name)) issues.phoneName.push({ id: product.id, name });
  if (/&(?:#?\w+);/.test(String(product.name || ""))) issues.htmlEntityName.push({ id: product.id, name: product.name });
  const dirtyAliases = (product.aliases || []).filter((alias) => alias !== sanitizeUserFacingAliases([alias])[0]);
  if (dirtyAliases.length) issues.internalAlias.push({ id: product.id, name, dirtyAliases: dirtyAliases.slice(0, 3) });
});

const totalIssues = Object.values(issues).reduce((sum, rows) => sum + rows.length, 0);
console.log(`[audit-origin-quality] ${products.length} products, ${totalIssues} issue rows`);
Object.entries(issues).forEach(([key, rows]) => {
  if (!rows.length) return;
  console.log(`  ${key}: ${rows.length}`);
  rows.slice(0, 8).forEach((row) => console.log(`    - ${row.id}: ${JSON.stringify(row.name || row.dirtyAliases)}`));
});

if (totalIssues) process.exit(1);
