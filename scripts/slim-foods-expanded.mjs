#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "foods-expanded.js");
const app = fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n");

const coreEnd = app.indexOf("\n];\n\n/* BEGIN RESTORED BULK FOODS */");
if (coreEnd === -1) throw new Error("BEGIN RESTORED marker not found");
const fStart = app.indexOf("\nfunction f(id, name, nature, category, aliases, effects, regions, extra = {}) {");
if (fStart === -1) throw new Error("function f() not found");

let tail = app.slice(fStart);
tail = tail.replace(/\nEXPANDED_FOODS\.push\([\s\S]*?\n\);\s*$/, "");

const footer = `

if (typeof EXPANDED_FOODS_BULK !== "undefined") {
  EXPANDED_FOODS.push(...EXPANDED_FOODS_BULK);
}
`;

const out = app.slice(0, coreEnd + 3) + tail + footer;
fs.writeFileSync(target, out, "utf8");
console.log(`Slimmed foods-expanded.js → ${out.split("\n").length} lines, ${out.length} bytes`);
