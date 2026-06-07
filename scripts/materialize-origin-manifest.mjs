#!/usr/bin/env node
/**
 * Materialize local GI registry rows into data/raw/origin/fetched-*.json
 * Reads registry-manifest.json + data/raw/origin/incoming/* only (no network).
 */
import path from "path";
import { root } from "./lib/food-catalog.mjs";
import {
  loadIncomingDropFiles,
  loadRegistryManifest,
  writeFetchedBatch
} from "./lib/origin-manifest.mjs";

const outDir = path.join(root, "data", "raw", "origin");
const manifestItems = loadRegistryManifest();
const incomingItems = loadIncomingDropFiles();
const items = [...manifestItems, ...incomingItems];

if (!items.length) {
  console.warn("[materialize] no rows — add data/raw/origin/registry-manifest.json or incoming/*");
  process.exit(1);
}

const file = writeFetchedBatch(outDir, "registry-manifest", items);
console.log(`[materialize] ${items.length} items -> ${path.relative(root, file)}`);
