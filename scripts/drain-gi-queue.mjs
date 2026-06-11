#!/usr/bin/env node
/** Drain all pending + lingnanPriority GI queue rows into registry-manifest. */
import fs from "node:fs";
import path from "node:path";
import { root } from "./lib/food-catalog.mjs";

const queuePath = path.join(root, "data", "cn", "gi-expansion-queue.json");
const manifestPath = path.join(root, "data", "raw", "origin", "registry-manifest.json");

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const queue = readJson(queuePath, { pending: [], applied: [], lingnanPriority: [] });
const manifest = readJson(manifestPath, { items: [] });
const seen = new Set();
(manifest.items || []).forEach((row) => {
  if (row.sourceId) seen.add(`id:${row.sourceId}`);
  if (row.name) seen.add(`name:${row.name}`);
});

const candidates = [...(queue.pending || []), ...(queue.lingnanPriority || [])];
const toApply = [];
const skipped = [];

candidates.forEach((row) => {
  const dup = seen.has(`id:${row.sourceId}`) || seen.has(`name:${row.name}`);
  if (dup) {
    skipped.push(row.name);
    return;
  }
  toApply.push(row);
  seen.add(`id:${row.sourceId}`);
  seen.add(`name:${row.name}`);
});

if (toApply.length) {
  manifest.items = [...(manifest.items || []), ...toApply];
  writeJson(manifestPath, manifest);
  queue.applied = [
    ...(queue.applied || []),
    ...toApply.map((row) => ({ ...row, appliedAt: new Date().toISOString().slice(0, 10) }))
  ];
}
queue.pending = [];
queue.lingnanPriority = [];
writeJson(queuePath, queue);

console.log(`[drain-gi-queue] appended ${toApply.length} rows (${skipped.length} duplicates skipped)`);
console.log(`[drain-gi-queue] queue pending cleared, lingnanPriority cleared`);
