#!/usr/bin/env node
/**
 * One-time / maintenance: extract recipe() calls from app.js → data/tcm/handcrafted-recipes.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(root, "app.js");
const outPath = path.join(root, "data", "tcm", "handcrafted-recipes.json");

const app = fs.readFileSync(appPath, "utf8");

function extractBlock(startMarker, endComment) {
  const start = app.indexOf(startMarker);
  if (start === -1) return "";
  const from = start + startMarker.length;
  const end = app.indexOf(endComment, from);
  if (end === -1) return "";
  const chunk = app.slice(from, end).replace(/\r\n/g, "\n");
  const close = chunk.lastIndexOf("\n];");
  if (close === -1) return "";
  return chunk.slice(0, close).trim().replace(/,\s*$/, "");
}

const recipeFn = (id, name, nature, syndromes, foodIds, subtitle, ingredients, steps, note) => ({
  id,
  name,
  nature,
  syndromes,
  foodIds,
  subtitle,
  ingredients,
  steps,
  note
});

const blocks = [
  extractBlock("const RECIPES = [", "/* BEGIN RESTORED BULK APP DATA */"),
  extractBlock("const SYNDROME_RECIPE_EXPANSION_PACK = [", "RECIPES.push(...SYNDROME_RECIPE_EXPANSION_PACK);")
].filter(Boolean);

const items = [];
for (const block of blocks) {
  // eslint-disable-next-line no-new-func
  const batch = Function("recipe", `return [${block}]`)(recipeFn);
  items.push(...batch);
}

const seen = new Set();
const deduped = items.filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2), "utf8");
console.log(`Wrote ${deduped.length} handcrafted recipes → ${outPath}`);
