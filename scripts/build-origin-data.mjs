#!/usr/bin/env node
/**
 * Build generated origin-product and dao-di JS bundles.
 */
import fs from "fs";
import path from "path";
import { readCnJson, root } from "./lib/food-catalog.mjs";
import { buildOriginFoodEntries } from "./lib/origin-products.mjs";

const genDir = path.join(root, "generated");
const tcmDir = path.join(root, "data", "tcm");

function writeJs(outPath, constName, data) {
  fs.writeFileSync(
    outPath,
    `/** Auto-generated — do not edit */\nconst ${constName} = ${JSON.stringify(data, null, 2)};\n`,
    "utf8"
  );
}

const products = readCnJson("origin-products.json", readCnJson("origin-products.seed.json", []));
const originFoods = buildOriginFoodEntries(products);

function readTcm(name, fallback = []) {
  const file = path.join(tcmDir, name);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const daoDi = readTcm("dao-di-regions.json");
const daoDiSystems = readTcm("dao-di-systems.json");
const daoDiProfiles = readTcm("dao-di-herb-profiles.json");

fs.mkdirSync(genDir, { recursive: true });
writeJs(path.join(genDir, "origin-products.js"), "ORIGIN_PRODUCT_FOODS", originFoods);
writeJs(path.join(genDir, "dao-di-regions.js"), "DAO_DI_REGIONS", daoDi);
writeJs(path.join(genDir, "dao-di-systems.js"), "DAO_DI_SYSTEMS", daoDiSystems);
writeJs(path.join(genDir, "dao-di-herb-profiles.js"), "DAO_DI_HERB_PROFILES", daoDiProfiles);

const publicTcm = path.join(root, "public", "data", "tcm");
fs.mkdirSync(publicTcm, { recursive: true });
fs.writeFileSync(path.join(publicTcm, "dao-di-regions.json"), JSON.stringify(daoDi, null, 2));
fs.writeFileSync(path.join(publicTcm, "dao-di-systems.json"), JSON.stringify(daoDiSystems, null, 2));
fs.writeFileSync(path.join(publicTcm, "dao-di-herb-profiles.json"), JSON.stringify(daoDiProfiles, null, 2));

console.log(`Origin product foods: ${originFoods.length}`);
console.log(`Dao-di region maps: ${daoDi.length}`);
console.log(`Dao-di systems: ${daoDiSystems.length}, herb profiles: ${daoDiProfiles.length}`);
console.log("Output: generated/origin-products.js, generated/dao-di-regions.js, generated/dao-di-systems.js, generated/dao-di-herb-profiles.js");
