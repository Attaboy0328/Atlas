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

const daoDiPath = path.join(tcmDir, "dao-di-regions.json");
const daoDi = fs.existsSync(daoDiPath) ? JSON.parse(fs.readFileSync(daoDiPath, "utf8")) : [];

fs.mkdirSync(genDir, { recursive: true });
writeJs(path.join(genDir, "origin-products.js"), "ORIGIN_PRODUCT_FOODS", originFoods);
writeJs(path.join(genDir, "dao-di-regions.js"), "DAO_DI_REGIONS", daoDi);

const publicTcm = path.join(root, "public", "data", "tcm");
fs.mkdirSync(publicTcm, { recursive: true });
fs.writeFileSync(path.join(publicTcm, "dao-di-regions.json"), JSON.stringify(daoDi, null, 2));

console.log(`Origin product foods: ${originFoods.length}`);
console.log(`Dao-di region maps: ${daoDi.length}`);
console.log("Output: generated/origin-products.js, generated/dao-di-regions.js");
