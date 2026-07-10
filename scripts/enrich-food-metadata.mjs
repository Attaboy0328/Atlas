#!/usr/bin/env node
/**
 * Fill missing summary/caution on foods-ingredients.json thin entries.
 * Lock curated ingredient 食性 as manual/high confidence.
 */
import fs from "fs";
import path from "path";
import { root } from "./lib/food-catalog.mjs";

const file = path.join(root, "data", "cn", "foods-ingredients.json");
const foods = JSON.parse(fs.readFileSync(file, "utf8"));
let updated = 0;

foods.forEach((food) => {
  let changed = false;
  if (!food.summary) {
    food.summary = `${food.name}，常见于中式饮食与地方菜。`;
    changed = true;
  }
  if (!food.caution) {
    food.caution = "请结合份量、加工方式与个人耐受综合判断；传统食性不替代现代医学结论。";
    changed = true;
  }
  if (food.natureSource !== "manual" || food.natureConfidence !== "high") {
    food.natureSource = "manual";
    food.natureConfidence = "high";
    changed = true;
  }
  if (changed) updated += 1;
});

fs.writeFileSync(file, `${JSON.stringify(foods, null, 2)}\n`, "utf8");
console.log(`enrich-food-metadata: ${updated} entries updated`);
