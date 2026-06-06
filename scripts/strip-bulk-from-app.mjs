#!/usr/bin/env node
/** Remove inline RESTORED_BULK_RECIPES block from app.js */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(root, "app.js");
let app = fs.readFileSync(appPath, "utf8");

const start = app.indexOf("const RESTORED_BULK_RECIPES = [");
const pushLine = "RECIPES.push(...RESTORED_BULK_RECIPES.map((item) => ({ ...item, draft: true, sources: [] })));";
const pushIdx = app.indexOf(pushLine);

if (start === -1 || pushIdx === -1) {
  console.log("RESTORED_BULK_RECIPES already removed or not found");
  process.exit(0);
}

const replacement =
  'RECIPES.push(...(typeof BULK_RECIPES_ENHANCED !== "undefined" ? BULK_RECIPES_ENHANCED : []));\n';
app = app.slice(0, start) + replacement + app.slice(pushIdx + pushLine.length);

fs.writeFileSync(appPath, app, "utf8");
console.log("Removed RESTORED_BULK_RECIPES from app.js");
