import fs from "node:fs";

const src = fs.readFileSync("foods-cn-supplement.js", "utf8");
const match = src.match(/const CN_SUPPLEMENT_FOODS = (\[[\s\S]*\]);/);
if (!match) throw new Error("CN_SUPPLEMENT_FOODS not found");
const foods = Function(`"use strict"; return ${match[1]};`)();

const aliasIds = new Set([
  "peanut",
  "black-tea",
  "green-tea",
  "tea",
  "beer",
  "spinach",
  "grape",
  "ginseng",
  "honey",
  "vinegar",
  "celery",
  "rabbit",
  "iron-rich-meal",
]);

const pairing = foods.filter((f) => aliasIds.has(f.id));
const regional = foods.filter((f) => !aliasIds.has(f.id));

fs.mkdirSync("data/cn", { recursive: true });
fs.writeFileSync("data/cn/foods-pairing-supplement.json", JSON.stringify(pairing, null, 2));
fs.writeFileSync("data/cn/regional-foods.json", JSON.stringify(regional, null, 2));
console.log(`pairing ${pairing.length}, regional ${regional.length}`);
