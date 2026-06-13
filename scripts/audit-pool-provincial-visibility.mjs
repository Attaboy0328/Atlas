#!/usr/bin/env node
/** Fail if provincial pool clones (河南海带结) are still visible in library search. */
import { matchProvincialPoolName, POOL_BATCH_FILES, uniquePoolItems } from "./lib/china-pool-manifest.mjs";
import { readCnJson } from "./lib/food-catalog.mjs";

const poolNames = new Set(uniquePoolItems().map((item) => item.name));
const issues = [];

POOL_BATCH_FILES.forEach((file) => {
  readCnJson(file, []).forEach((food) => {
    if (food.hiddenFromLibrary || !food.name) return;
    for (const baseName of poolNames) {
      const province = matchProvincialPoolName(food.name, baseName);
      if (province) {
        issues.push(`${file}:${food.id} visible provincial clone「${food.name}」(base ${baseName})`);
        break;
      }
    }
  });
});

console.log("[audit-pool-provincial-visibility]");
console.log(`  pool base items: ${poolNames.size}`);
console.log(`  visible provincial clones: ${issues.length}`);
if (issues.length) {
  issues.slice(0, 20).forEach((line) => console.error(`  ${line}`));
  if (issues.length > 20) console.error(`  ... and ${issues.length - 20} more`);
  process.exit(1);
}
console.log("OK: no visible provincial pool clones");
