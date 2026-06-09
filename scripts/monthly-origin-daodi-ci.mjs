#!/usr/bin/env node
/**
 * Monthly GI / PEOP / dao-di refresh. Runs on schedule or manually.
 * Drains gi-expansion-queue, fetches dao-di cache, materializes origin manifest,
 * rebuilds data, runs audits, and commits if changed.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
}

function bumpServiceWorker() {
  const swPath = path.join(root, "sw.js");
  if (!fs.existsSync(swPath)) return;
  const text = fs.readFileSync(swPath, "utf8");
  const m = text.match(/const CACHE_NAME = "atlas-v(\d+)"/);
  if (!m) return;
  const next = Number(m[1]) + 1;
  fs.writeFileSync(swPath, text.replace(/const CACHE_NAME = "atlas-v\d+"/, `const CACHE_NAME = "atlas-v${next}"`), "utf8");
  console.log(`[monthly-ci] sw.js -> atlas-v${next}`);
}

run("node scripts/monthly-origin-daodi-sync.mjs");
run("npm run build:data");
run("npm test");
bumpServiceWorker();
run("npm run build");

console.log("[monthly-ci] complete");
