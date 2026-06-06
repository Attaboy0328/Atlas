#!/usr/bin/env node
/** Extract RESTORED_BULK_RECIPES array from app.js into data/cn/bulk-recipes.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const start = app.indexOf("const RESTORED_BULK_RECIPES = [");
const end = app.indexOf("\n];", start);
if (start < 0 || end < 0) {
  console.error("RESTORED_BULK_RECIPES block not found");
  process.exit(1);
}
const arraySrc = app.slice(start + "const RESTORED_BULK_RECIPES = ".length, end + 3);
const recipes = Function(`"use strict"; return ${arraySrc}`)();
const outDir = path.join(root, "data", "cn");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "bulk-recipes.json"), JSON.stringify(recipes, null, 2), "utf8");
console.log(`Wrote ${recipes.length} bulk recipes to data/cn/bulk-recipes.json`);
