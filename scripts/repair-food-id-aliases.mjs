#!/usr/bin/env node
/** Re-point stale food-id aliases after batch re-seeds change --suffix ids. */
import {
  loadFoodCatalogIds,
  loadFoodCatalogMeta,
  loadFoodIdAliasMap,
  resolveFoodId,
  writeJsAliasBundle
} from "./lib/food-catalog.mjs";
import { writeFoodIdAliasFile } from "./lib/catalog-records.mjs";

function idSlug(id) {
  return String(id || "").replace(/--\d+$/, "");
}

function buildSlugIndex(catalogIds) {
  const bySlug = new Map();
  catalogIds.forEach((id) => {
    const slug = idSlug(id);
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(id);
  });
  return bySlug;
}

function pickBestId(candidates, metaById) {
  if (!candidates.length) return null;
  return [...candidates].sort((a, b) => {
    const ma = metaById.get(a);
    const mb = metaById.get(b);
    const aHidden = ma?.hiddenFromLibrary ? 1 : 0;
    const bHidden = mb?.hiddenFromLibrary ? 1 : 0;
    if (aHidden !== bHidden) return aHidden - bHidden;
    if (a === idSlug(a) && b !== idSlug(b)) return -1;
    if (b === idSlug(b) && a !== idSlug(a)) return 1;
    return a.localeCompare(b);
  })[0];
}

function repairAliasMap(aliasMap, catalogIds, metaById) {
  const bySlug = buildSlugIndex(catalogIds);
  const next = {};
  let repaired = 0;
  let dropped = 0;

  const resolveToCatalog = (id) => {
    if (!id) return null;
    if (catalogIds.has(id)) return id;
    const slug = idSlug(id);
    const candidates = bySlug.get(slug) || [];
    return pickBestId(candidates, metaById);
  };

  Object.entries(aliasMap).forEach(([alias, canonical]) => {
    if (alias === canonical) return;
    let target = resolveFoodId(canonical, aliasMap);
    if (!catalogIds.has(target)) {
      const replacement = resolveToCatalog(target);
      if (replacement) {
        target = replacement;
        repaired += 1;
      }
    }
    if (!target || !catalogIds.has(target)) {
      dropped += 1;
      return;
    }
    if (alias === target) return;
    next[alias] = target;
  });

  return { next, repaired, dropped };
}

const catalogIds = loadFoodCatalogIds();
const metaById = new Map(loadFoodCatalogMeta().map((row) => [row.id, row]));
const aliasMap = loadFoodIdAliasMap();
const { next, repaired, dropped } = repairAliasMap(aliasMap, catalogIds, metaById);

writeFoodIdAliasFile(next);
writeJsAliasBundle(next);

console.log(
  `repair-food-id-aliases: ${Object.keys(next).length} aliases`
  + ` (repaired ${repaired}, dropped ${dropped})`
);
