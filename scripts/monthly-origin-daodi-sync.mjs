#!/usr/bin/env node
/**
 * Monthly sync: drain GI expansion queue → registry-manifest, refresh dao-di raw cache, materialize origin.
 * Full build/test is run by CI workflow after this script.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
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

function existingKeys(manifest) {
  const keys = new Set();
  (manifest.items || []).forEach((row) => {
    if (row.sourceId) keys.add(`id:${row.sourceId}`);
    if (row.name) keys.add(`name:${row.name}`);
  });
  return keys;
}

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
}

const queue = readJson(queuePath, { pending: [], applied: [], batchSize: 30 });
const manifest = readJson(manifestPath, { items: [] });
const seen = existingKeys(manifest);
const batchSize = queue.batchSize || 30;
const pending = [...(queue.pending || [])];
const toApply = [];
const remain = [];

pending.forEach((row) => {
  const dup = seen.has(`id:${row.sourceId}`) || seen.has(`name:${row.name}`);
  if (dup) return;
  if (toApply.length < batchSize) {
    toApply.push(row);
    seen.add(`id:${row.sourceId}`);
    seen.add(`name:${row.name}`);
  } else {
    remain.push(row);
  }
});

if (toApply.length) {
  manifest.items = [...(manifest.items || []), ...toApply];
  writeJson(manifestPath, manifest);
  queue.pending = remain;
  queue.applied = [
    ...(queue.applied || []),
    ...toApply.map((row) => ({ ...row, appliedAt: new Date().toISOString().slice(0, 10) }))
  ];
  writeJson(queuePath, queue);
  console.log(`[monthly] appended ${toApply.length} GI rows to registry-manifest (${remain.length} still pending)`);
} else {
  console.log("[monthly] no new GI queue rows to append (duplicates or empty queue)");
}

try {
  run("node scripts/fetch-dao-di-chinadaodiyaocai.mjs");
  run("node scripts/ingest-dao-di-profiles.mjs");
} catch (err) {
  console.warn("[monthly] dao-di fetch/ingest skipped or failed — continuing with local cache:", err.message || err);
}

run("node scripts/materialize-origin-manifest.mjs");

console.log("[monthly] origin/dao-di sync stage complete — run npm run build:data && npm test next");
