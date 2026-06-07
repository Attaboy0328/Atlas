#!/usr/bin/env node
/**
 * Decode \\uXXXX literals in data/cn JSON sources to real UTF-8.
 */
import fs from "fs";
import path from "path";
import { deepDecodeStrings } from "./lib/decode-json-strings.mjs";
import { root } from "./lib/food-catalog.mjs";

const cnDir = path.join(root, "data", "cn");
const files = fs.readdirSync(cnDir).filter((name) => name.endsWith(".json"));

let touched = 0;
files.forEach((name) => {
  const file = path.join(cnDir, name);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = JSON.parse(raw);
  const decoded = deepDecodeStrings(parsed);
  const before = JSON.stringify(parsed);
  const after = JSON.stringify(decoded);
  if (before !== after) {
    fs.writeFileSync(file, `${JSON.stringify(decoded, null, 2)}\n`, "utf8");
    touched += 1;
  }
});

console.log(`normalize-cn-sources: ${touched} files updated`);
