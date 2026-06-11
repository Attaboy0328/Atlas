#!/usr/bin/env node
/**
 * Merge parenthetical / regional form variants into canonical food entries.
 * e.g. 臭豆腐（长沙）→ 臭豆腐, 大闸蟹（沪式）→ 大闸蟹, 长沙臭豆腐 → 臭豆腐
 *
 * Usage:
 *   node scripts/consolidate-form-variants.mjs
 *   node scripts/consolidate-form-variants.mjs --write
 */
import fs from "node:fs";
import path from "node:path";
import {
  findDuplicateNameGroups,
  loadOriginProductIds,
  pickCanonicalRow,
  writeFoodIdAliasFile
} from "./lib/catalog-records.mjs";
import {
  CN_JSON_SOURCES,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./lib/food-catalog.mjs";

const writeMode = process.argv.includes("--write");
const aliasMap = loadFoodIdAliasMap();
const originIds = loadOriginProductIds();

const PAREN_SUFFIX_RE = /^(.+)（[^）]+）$/;
const SPECIAL_BASE = {
  "红烧肉（本帮）": "本帮红烧肉",
  "过桥米线料": "过桥米线",
  "清补凉料": "清补凉"
};

const KIT_SUFFIXES = ["料"];
const KIT_BASE_BLOCK_RE = /(酱|粉|茶|酒|油|醋|浆)$/;

function loadRows() {
  return CN_JSON_SOURCES.flatMap((file) =>
    readCnJson(file, []).map((record) => ({
      id: record.id,
      name: record.name,
      record,
      sourceFile: file
    }))
  );
}

function stripFormSuffix(name) {
  const special = SPECIAL_BASE[name];
  if (special) return special;
  const match = String(name || "").match(PAREN_SUFFIX_RE);
  return match ? match[1] : null;
}

function cityPrefixedBase(name, knownNames) {
  if (knownNames.has(name)) return null;
  const bases = [...knownNames].filter((base) => base.length >= 2).sort((a, b) => b.length - a.length);
  for (const base of bases) {
    if (name.length <= base.length) continue;
    if (!name.endsWith(base)) continue;
    const prefix = name.slice(0, name.length - base.length);
    if (/^[\u4e00-\u9fff]{2,5}$/.test(prefix)) return base;
  }
  return null;
}

function kitSuffixBase(name, knownNames, row) {
  if (knownNames.has(name)) return null;
  const category = row.record?.category || "";
  if (!["主食", "调料", "滋补食材", "饮品"].includes(category)) return null;
  for (const suffix of KIT_SUFFIXES) {
    if (!name.endsWith(suffix) || name.length <= suffix.length + 1) continue;
    const base = name.slice(0, -suffix.length);
    if (!knownNames.has(base) || KIT_BASE_BLOCK_RE.test(base)) continue;
    return base;
  }
  return null;
}

function resolveVariantBase(name, knownNames, row) {
  if (SPECIAL_BASE[name]) return SPECIAL_BASE[name];
  return stripFormSuffix(name)
    || cityPrefixedBase(name, knownNames)
    || kitSuffixBase(name, knownNames, row);
}

function scoreCanonicalRow(row) {
  let score = (row.record?.aliases?.length || 0) * 2 + (row.record?.summary ? 10 : 0);
  const file = row.sourceFile || "";
  if (file.includes("foods-ingredients.json")) score += 50;
  if (file.includes("foods-seasonal-river")) score += 40;
  if (file.includes("regional-foods.json")) score += 35;
  if (file.includes("foods-lingnan-ingredients")) score += 30;
  if (file.includes("foods-china-curated")) score -= 10;
  if (/-rx$|--\d|batch1[0-5]/i.test(row.id)) score -= 15;
  return score;
}

function pickCanonicalForBase(groupRows, variantRow) {
  const resolvedCanonicals = new Set(
    groupRows.map((r) => resolveFoodId(r.id, aliasMap)).filter(Boolean)
  );
  const pool = groupRows.filter((r) => !originIds.has(r.id) && !r.record?.isOriginProduct);
  if (!pool.length) return pickCanonicalRow(groupRows, originIds);

  const ranked = [...pool].sort((a, b) => {
    const aResolved = resolveFoodId(a.id, aliasMap);
    const bResolved = resolveFoodId(b.id, aliasMap);
    const aIsTarget = resolvedCanonicals.has(a.id) && !aliasMap[a.id];
    const bIsTarget = resolvedCanonicals.has(b.id) && !aliasMap[b.id];
    if (aIsTarget !== bIsTarget) return aIsTarget ? -1 : 1;
    const scoreDiff = scoreCanonicalRow(b) - scoreCanonicalRow(a);
    if (scoreDiff) return scoreDiff;
    return a.id.localeCompare(b.id);
  });

  const canonical = ranked[0];
  if (!canonical || canonical.id === variantRow.id) return null;
  return canonical;
}

function buildProposals(rows) {
  const byName = new Map();
  rows.forEach((row) => {
    if (!byName.has(row.name)) byName.set(row.name, []);
    byName.get(row.name).push(row);
  });
  const knownNames = new Set(rows.filter((r) => !r.record?.hiddenFromLibrary).map((r) => r.name));

  const proposals = [];
  const seenAlias = new Set();

  rows.forEach((row) => {
    if (row.record?.hiddenFromLibrary) return;
    if (originIds.has(row.id) || row.record?.isOriginProduct) return;

    const baseName = resolveVariantBase(row.name, knownNames, row);
    if (!baseName || baseName === row.name) return;
    if (!knownNames.has(baseName)) return;

    const groupRows = (byName.get(baseName) || []).filter((r) => !r.record?.hiddenFromLibrary);
    if (!groupRows.length) return;

    const canonical = pickCanonicalForBase(groupRows, row);
    if (!canonical) return;
    if (seenAlias.has(row.id)) return;
    seenAlias.add(row.id);

    proposals.push({
      alias: row.id,
      canonical: canonical.id,
      variantName: row.name,
      baseName,
      from: row.sourceFile,
      note: `auto: form variant「${row.name}」→ ${canonical.id}`
    });
  });

  return proposals;
}

function patchCanonicalAliases(rows, proposals) {
  const aliasTerms = new Map();
  proposals.forEach((p) => {
    if (!aliasTerms.has(p.canonical)) aliasTerms.set(p.canonical, new Set());
    aliasTerms.get(p.canonical).add(p.variantName);
    const stripped = resolveVariantBase(
      p.variantName,
      new Set(rows.filter((r) => !r.record?.hiddenFromLibrary).map((r) => r.name)),
      rows.find((r) => r.id === p.alias) || { record: {} }
    );
    if (stripped) aliasTerms.get(p.canonical).add(stripped);
  });

  const byId = new Map(rows.map((r) => [r.id, r]));
  const touchedFiles = new Set();

  aliasTerms.forEach((terms, canonicalId) => {
    const row = byId.get(canonicalId);
    if (!row) return;
    const aliases = new Set(row.record.aliases || []);
    let changed = false;
    terms.forEach((term) => {
      if (term && term !== row.name && !aliases.has(term)) {
        aliases.add(term);
        changed = true;
      }
    });
    if (!changed) return;
    row.record.aliases = [...aliases];
    touchedFiles.add(row.sourceFile);
  });

  return touchedFiles;
}

const rows = loadRows();
const proposals = buildProposals(rows);

console.log(`form variant merges proposed: ${proposals.length}`);
proposals.forEach((p) => {
  console.log(`  ${p.alias} (${p.variantName}) -> ${p.canonical} [${p.baseName}]`);
});

if (!writeMode) {
  if (proposals.length) console.log("\nRun with --write to apply.");
  process.exit(0);
}

const nextMap = { ...aliasMap };
proposals.forEach((p) => {
  if (nextMap[p.alias] && nextMap[p.alias] !== p.canonical) return;
  nextMap[p.alias] = p.canonical;
});

const touchedAliasFiles = patchCanonicalAliases(rows, proposals);
const hideIds = new Set(proposals.map((p) => p.alias));
const patchFiles = CN_JSON_SOURCES.map((file) => path.join(root, "data", "cn", file));

let hidden = 0;
patchFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(data)) return;
  let touched = false;
  data.forEach((food) => {
    if (hideIds.has(food.id) && !food.hiddenFromLibrary) {
      food.hiddenFromLibrary = true;
      hidden += 1;
      touched = true;
    }
    const row = rows.find((r) => r.id === food.id && r.sourceFile === path.basename(file));
    if (row && touchedAliasFiles.has(path.basename(file)) && row.record.aliases) {
      food.aliases = row.record.aliases;
      touched = true;
    }
  });
  if (touched) fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
});

const notesFile = path.join(root, "data", "cn", "food-id-aliases.json");
const notesRaw = JSON.parse(fs.readFileSync(notesFile, "utf8"));
const noteByAlias = new Map(notesRaw.map((r) => [r.alias, r]));
proposals.forEach((p) => {
  const existing = noteByAlias.get(p.alias) || { alias: p.alias, canonical: p.canonical };
  existing.note = p.note;
  noteByAlias.set(p.alias, existing);
});
fs.writeFileSync(
  notesFile,
  `${JSON.stringify([...noteByAlias.values()].sort((a, b) => a.alias.localeCompare(b.alias)), null, 2)}\n`,
  "utf8"
);

writeFoodIdAliasFile(nextMap);

console.log(`aliases written: ${Object.keys(nextMap).length}`);
console.log(`hiddenFromLibrary patched: ${hidden}`);
console.log(`canonical alias files touched: ${touchedAliasFiles.size}`);
