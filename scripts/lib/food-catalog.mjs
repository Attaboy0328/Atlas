import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.join(__dirname, "..", "..");

export const CN_JSON_SOURCES = [
  "foods-pairing-supplement.json",
  "regional-foods.json",
  "foods-regional-batch2.json",
  "expansion-batch4.json",
  "foods-ingredients.json",
  "foods-seasonal-river.json",
  "foods-medicine-homologous.json",
  "foods-medicine-homologous-batch2.json",
  "foods-base-staples.json",
  "foods-ingredients-batch2.json",
  "foods-seasonal-river-batch2.json",
  "foods-modern-regional-batch.json",
  "foods-search-supplement-batch3.json",
  "foods-search-supplement-batch4.json",
  "foods-ingredients-batch3.json",
  "foods-seasonal-river-batch3.json",
  "foods-international-batch5.json",
  "foods-seasonal-river-batch4.json",
  "foods-ingredients-batch4.json",
  "foods-modern-regional-batch2.json",
  "foods-international-batch6.json",
  "foods-lingnan-ingredients-batch.json",
  "foods-china-regional-batch7.json",
  "foods-china-condiments-batch8.json",
  "foods-china-seafood-batch9.json",
  "foods-china-produce-batch10.json",
  "foods-china-snacks-batch11.json",
  "foods-hk-ingredients-batch.json",
  "foods-china-curated-batch12.json",
  "foods-mo-ingredients-batch.json",
  "foods-gx-ingredients-batch.json",
  "foods-hainan-ingredients-batch.json",
  "foods-china-curated-batch13.json",
  "foods-china-curated-batch14.json",
  "foods-china-curated-batch15.json",
  "foods-china-curated-batch16.json",
  "foods-china-curated-batch17.json",
  "foods-china-curated-batch18.json"
];

export const EXPANDED_BULK_JSON_SOURCES = [
  "foods-official-bulk.json",
  "foods-extra-bulk.json",
  "foods-regional-push.json",
  "foods-search-supplement.json",
  "foods-regional-push-batch2.json",
  "foods-search-supplement-batch2.json",
  "foods-search-supplement-batch3.json",
  "foods-search-supplement-batch4.json"
];

export function readCnJson(name, fallback = []) {
  const file = path.join(root, "data", "cn", name);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function loadFoodIdAliasMap() {
  const file = path.join(root, "data", "cn", "food-id-aliases.json");
  if (!fs.existsSync(file)) return {};
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  if (Array.isArray(raw)) {
    return Object.fromEntries(raw.map((row) => [row.alias, row.canonical]));
  }
  return raw;
}

export function resolveFoodId(id, aliasMap) {
  if (!id) return id;
  const seen = new Set();
  let current = id;
  while (aliasMap[current] && !seen.has(current)) {
    seen.add(current);
    current = aliasMap[current];
  }
  return current;
}

export function resolveFoodIds(ids, aliasMap) {
  const out = [];
  const seen = new Set();
  ids.forEach((id) => {
    const resolved = resolveFoodId(id, aliasMap);
    if (resolved && !seen.has(resolved)) {
      seen.add(resolved);
      out.push(resolved);
    }
  });
  return out;
}

export function normalizeRecipeFoodIds(rawIds, catalog, aliasMap) {
  const out = [];
  const seen = new Set();
  (rawIds || []).forEach((raw) => {
    const canonical = resolveFoodId(raw, aliasMap);
    const pick = catalog.has(raw) ? raw : (catalog.has(canonical) ? canonical : null);
    if (pick && !seen.has(pick)) {
      seen.add(pick);
      out.push(pick);
    }
  });
  return out;
}

export function loadFoodCatalogMeta() {
  const foods = [];
  const expanded = fs.readFileSync(path.join(root, "foods-expanded.js"), "utf8");
  let m;
  const fRe = /f\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  while ((m = fRe.exec(expanded))) {
    foods.push({ id: m[1], name: m[2], source: "expanded" });
  }
  const teaRe = /tea\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g;
  while ((m = teaRe.exec(expanded))) {
    foods.push({ id: m[1], name: m[2], source: "expanded-tea" });
  }
  EXPANDED_BULK_JSON_SOURCES.flatMap((file) => readCnJson(file))
    .forEach((food) => {
      if (food?.id && food?.name) foods.push({ id: food.id, name: food.name, source: "expanded-bulk" });
    });
  CN_JSON_SOURCES.flatMap((file) => readCnJson(file)).forEach((food) => {
    foods.push({ id: food.id, name: food.name, source: "cn" });
  });
  readCnJson("origin-products.json", readCnJson("origin-products.seed.json", [])).forEach((food) => {
    if (food?.id && food?.name) foods.push({ id: food.id, name: food.name, source: "origin" });
  });
  ["herbs-chp2025.json", "herbs-supplement.json", "dao-di-orphan-herbs.json"].forEach((tcmFile) => {
    const tcmPath = path.join(root, "data", "tcm", tcmFile);
    if (!fs.existsSync(tcmPath)) return;
    JSON.parse(fs.readFileSync(tcmPath, "utf8")).forEach((herb) => {
      if (herb?.id && herb?.name) foods.push({ id: herb.id, name: herb.name, source: "tcm" });
    });
  });
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const runtimeMatch = app.match(/const RUNTIME_FOOD_EXPANSION = \[([\s\S]*?)\n\];/);
  if (runtimeMatch) {
    const idName = /id:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["']/g;
    while ((m = idName.exec(runtimeMatch[1]))) {
      foods.push({ id: m[1], name: m[2], source: "runtime" });
    }
  }
  return foods;
}

export function loadFoodCatalogIds() {
  return new Set(loadFoodCatalogMeta().map((food) => food.id));
}

export function writeJsAliasBundle(aliasMap) {
  const genDir = path.join(root, "generated");
  fs.mkdirSync(genDir, { recursive: true });
  fs.writeFileSync(
    path.join(genDir, "food-id-aliases.js"),
    `/** Auto-generated by scripts/build-data.mjs — do not edit */\nconst FOOD_ID_ALIASES = ${JSON.stringify(aliasMap, null, 2)};\n`,
    "utf8"
  );
}
