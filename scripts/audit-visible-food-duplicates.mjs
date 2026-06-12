#!/usr/bin/env node
/** Fail when visible library foods share a name but resolve to different canonical ids. */
import { CN_JSON_SOURCES, loadFoodIdAliasMap, readCnJson, resolveFoodId } from "./lib/food-catalog.mjs";

const aliasMap = loadFoodIdAliasMap();
const byName = new Map();

CN_JSON_SOURCES.forEach((file) => {
  readCnJson(file, []).forEach((food) => {
    if (food.hiddenFromLibrary || !food.name) return;
    const canonical = resolveFoodId(food.id, aliasMap);
    if (!byName.has(food.name)) byName.set(food.name, new Map());
    const group = byName.get(food.name);
    if (!group.has(canonical)) group.set(canonical, []);
    group.get(canonical).push({ id: food.id, file });
  });
});

const conflicts = [...byName.entries()].filter(([, ids]) => ids.size > 1);

console.log("[audit-visible-food-duplicates]");
console.log(`  visible name groups with multiple canonical ids: ${conflicts.length}`);

if (conflicts.length) {
  conflicts.slice(0, 25).forEach(([name, idMap]) => {
    const detail = [...idMap.entries()].map(([canon, rows]) => `${canon} (${rows.map((r) => r.id).join(", ")})`).join(" | ");
    console.error(`  -「${name}」: ${detail}`);
  });
  if (conflicts.length > 25) console.error(`  ... and ${conflicts.length - 25} more`);
  console.error("FAIL: run consolidate:aliases and consolidate:form-variants, or add aliases");
  process.exit(1);
}

console.log("OK: no visible duplicate food names with conflicting ids");
