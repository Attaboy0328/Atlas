#!/usr/bin/env node
/**
 * Reduce repetitive template phrases in bulk-recipes.json steps and notes.
 */
import fs from "fs";
import path from "path";
import { root } from "./lib/food-catalog.mjs";

const file = path.join(root, "data", "cn", "bulk-recipes.json");
const recipes = JSON.parse(fs.readFileSync(file, "utf8"));

const prepOpeners = ["将", "把", "取", "备好"];
const prepVerbs = ["洗净切好", "处理干净", "备妥", "整理干净"];
const cookLines = [
  "加水同煮，小火慢炖至熟软。",
  "入锅同煮，按家常火候煮至合适软烂。",
  "加水炖煮，注意火候，煮至食材熟透。",
  "以文火同煮，煮至口感合适即可。"
];
const finishLines = [
  "温热食用，按个人耐受调整频率。",
  "趁温热食用，不宜长期大量。",
  "适量食用，结合体质与医嘱判断。",
  "可佐正餐少量食用，勿当作处方替代。"
];
const noteOpeners = [
  "按证候的日常食养思路整理，强调温和、规律、少量持续。",
  "以传统食养语境整理，重在饮食结构与个体耐受。",
  "供日常饮食参考，不替代诊断、处方或医嘱。",
  "整理自常见食疗思路，请结合个人状态判断。"
];

let hits = 0;
recipes.forEach((recipe, index) => {
  if (!Array.isArray(recipe.steps)) return;
  const foods = (recipe.foodIds || []).map((id) => id).join("、") || "食材";
  const syndrome = recipe.syndromes?.[0] || "相关证候";
  recipe.steps = recipe.steps.map((step, stepIndex) => {
    if (/分别处理干净/.test(step) && stepIndex === 0) {
      hits += 1;
      const names = recipe.ingredients?.slice(0, 2).map((line) => line.split(/\s+/)[0]).filter(Boolean) || ["食材"];
      const a = names[0] || "食材";
      const b = names[1] || names[0] || "配料";
      return `${prepOpeners[index % prepOpeners.length]}${a}与${b}${prepVerbs[index % prepVerbs.length]}。`;
    }
    if (/按家常做法煮至熟软/.test(step)) {
      hits += 1;
      return cookLines[index % cookLines.length];
    }
    if (/按个人耐受调整频率/.test(step)) {
      hits += 1;
      return finishLines[index % finishLines.length];
    }
    return step;
  });
  if (recipe.note && /不把食疗方当成处方替代/.test(recipe.note)) {
    hits += 1;
    recipe.note = `按「${syndrome}」${noteOpeners[index % noteOpeners.length]}`;
  }
});

fs.writeFileSync(file, `${JSON.stringify(recipes, null, 2)}\n`, "utf8");
console.log(`deflake-bulk-recipes: ${hits} template phrases varied`);
