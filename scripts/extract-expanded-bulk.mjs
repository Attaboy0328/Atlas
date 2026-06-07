#!/usr/bin/env node
/**
 * Extract RESTORED_* and inline push blocks from foods-expanded.js → data/cn/*.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = path.join(root, "foods-expanded.js");
const cnDir = path.join(root, "data", "cn");
const app = fs.readFileSync(srcPath, "utf8").replace(/\r\n/g, "\n");

function extractJsonArray(marker, endComment) {
  const open = `${marker} = [`;
  const start = app.indexOf(open);
  if (start === -1) throw new Error(`Missing ${marker}`);
  const from = start + open.length;
  const endCommentAt = app.indexOf(endComment, from);
  if (endCommentAt === -1) throw new Error(`Missing end marker for ${marker}`);
  const chunk = app.slice(from, endCommentAt);
  const close = chunk.lastIndexOf("\n];");
  if (close === -1) throw new Error(`Missing ]; for ${marker}`);
  const body = chunk.slice(0, close).trim().replace(/,\s*$/, "");
  const jsonText = `[${body}]`;
  return JSON.parse(jsonText);
}

function extractPushBlock(startComment, endMarker) {
  const start = app.indexOf(startComment);
  const pushStart = app.indexOf("EXPANDED_FOODS.push(", start);
  const from = pushStart + "EXPANDED_FOODS.push(".length;
  const end = app.indexOf(endMarker, from);
  const chunk = app.slice(from, end).replace(/\r\n/g, "\n");
  const close = chunk.lastIndexOf("\n);");
  if (close === -1) throw new Error(`Push block end not found before ${endMarker}`);
  return chunk.slice(0, close).trim().replace(/,\s*$/, "");
}

const CAT_KEYS = [
  "CAT_OFFICIAL", "CAT_GRAIN", "CAT_DRINK", "CAT_TEA", "CAT_VEG", "CAT_WILD",
  "CAT_FUNGI", "CAT_FRUIT", "CAT_PROTEIN", "CAT_SEA", "CAT_CONDIMENT", "CAT_PICKLE",
  "CAT_TONIC", "CAT_NUT", "CAT_BEAN", "CAT_BEAN_PRODUCT", "CAT_STARCH", "CAT_FERMENTED"
];
const N_KEYS = ["N_COLD", "N_COOL", "N_NEUTRAL", "N_WARM", "N_HOT"];

function parsePushEntries(block) {
  const scope = {};
  for (const key of [...CAT_KEYS, ...N_KEYS]) {
    const re = new RegExp(`const ${key} = "([^"]+)";`);
    const m = app.match(re);
    if (m) scope[key] = m[1];
  }
  const collected = [];
  const f = (id, name, nature, category, aliases, effects, regions, extra = {}) => {
    collected.push({ id, name, nature, category, aliases, effects, regions, extra });
  };
  const argNames = [...Object.keys(scope), "f"];
  const argValues = [...Object.values(scope), f];
  // eslint-disable-next-line no-new-func
  Function(...argNames, block)(...argValues);
  return collected;
}

const official = extractJsonArray("const RESTORED_OFFICIAL_BULK", "const RESTORED_EXTRA_BULK");
const extra = extractJsonArray("const RESTORED_EXTRA_BULK", "EXPANDED_FOODS.push(\n  ...RESTORED_OFFICIAL_BULK");
const regionalBlock = extractPushBlock(
  "/* BEGIN RESTORED BULK FOODS */",
  "const RESTORED_OFFICIAL_BULK"
);
const regional = parsePushEntries(regionalBlock);
const tailPushStart = app.lastIndexOf("EXPANDED_FOODS.push(");
const tailFrom = tailPushStart + "EXPANDED_FOODS.push(".length;
const tailChunk = app.slice(tailFrom);
const tailClose = tailChunk.indexOf("\n);");
const tailBlock2 = tailChunk.slice(0, tailClose).trim().replace(/,\s*$/, "");
const tail = parsePushEntries(tailBlock2);

fs.mkdirSync(cnDir, { recursive: true });
fs.writeFileSync(path.join(cnDir, "foods-official-bulk.json"), JSON.stringify(official, null, 2), "utf8");
fs.writeFileSync(path.join(cnDir, "foods-extra-bulk.json"), JSON.stringify(extra, null, 2), "utf8");
fs.writeFileSync(path.join(cnDir, "foods-regional-push.json"), JSON.stringify(regional, null, 2), "utf8");
fs.writeFileSync(path.join(cnDir, "foods-search-supplement.json"), JSON.stringify(tail, null, 2), "utf8");

console.log(`foods-official-bulk.json: ${official.length}`);
console.log(`foods-extra-bulk.json: ${extra.length}`);
console.log(`foods-regional-push.json: ${regional.length}`);
console.log(`foods-search-supplement.json: ${tail.length}`);
