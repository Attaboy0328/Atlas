#!/usr/bin/env node
/**
 * Fetch public GI registry rows into data/raw/origin/fetched-*.json
 *
 * Usage:
 *   node scripts/fetch-origin-registry.mjs            # try network + manifest + incoming
 *   node scripts/fetch-origin-registry.mjs --offline  # manifest + incoming only
 */
import fs from "fs";
import path from "path";
import { root } from "./lib/food-catalog.mjs";
import {
  loadFetchSources,
  loadIncomingDropFiles,
  loadRegistryManifest,
  runConfiguredFetches,
  writeFetchedBatch
} from "./lib/origin-registry-fetch.mjs";

const offline = process.argv.includes("--offline");
const outDir = path.join(root, "data", "raw", "origin");
const { sources = [] } = loadFetchSources();

let networkItems = [];
if (!offline) {
  const results = await runConfiguredFetches(sources);
  results.forEach((result) => {
    if (result.ok) {
      console.log(`[fetch] ${result.source}: ${result.count} items`);
      networkItems.push(...result.items);
      if (result.count) writeFetchedBatch(outDir, result.source, result.items);
    } else {
      console.warn(`[fetch] ${result.source} failed: ${result.error}`);
    }
  });
} else {
  console.log("[fetch] offline mode — skipping configured URLs");
}

const manifestItems = loadRegistryManifest();
const incomingItems = loadIncomingDropFiles();
const fallbackItems = [...manifestItems, ...incomingItems];

if (fallbackItems.length) {
  const file = writeFetchedBatch(outDir, "registry-manifest", fallbackItems);
  console.log(`[fetch] manifest+incoming: ${fallbackItems.length} items -> ${path.relative(root, file)}`);
}

const total = networkItems.length + fallbackItems.length;
console.log(`[fetch] total new import rows this run: ${total} (network ${networkItems.length}, local ${fallbackItems.length})`);
if (!total) {
  console.warn("[fetch] no rows produced — add data/raw/origin/registry-manifest.json or incoming/*");
  process.exit(1);
}
