/** Food 食性 metadata: source tags, confidence, and build-time assignment. */
import fs from "fs";
import path from "path";
import {
  CN_JSON_SOURCES,
  EXPANDED_BULK_JSON_SOURCES,
  loadFoodIdAliasMap,
  readCnJson,
  resolveFoodId,
  root
} from "./food-catalog.mjs";
import { buildNatureLookup, inferOriginNature } from "./origin-nature.mjs";

const INGREDIENTS_FILE = "foods-ingredients.json";
const FOOD_MEDICINE_FILE = "food-medicine-catalog.json";
const MANUAL_HIGH_FILES = new Set([
  INGREDIENTS_FILE,
  "foods-base-staples.json",
  "regional-foods.json"
]);

const CURATED_BATCH_RE = /^foods-china-curated-batch\d+\.json$/;

let manualIngredientIds = null;
let ingredientNatureById = null;
let foodMedicineNatureById = null;
let expandedCoreIds = null;

function loadManualIngredientIds() {
  if (manualIngredientIds) return manualIngredientIds;
  manualIngredientIds = new Set(
    readCnJson(INGREDIENTS_FILE, []).map((row) => row.id).filter(Boolean)
  );
  return manualIngredientIds;
}

function loadIngredientNatureById() {
  if (ingredientNatureById) return ingredientNatureById;
  ingredientNatureById = new Map(
    readCnJson(INGREDIENTS_FILE, [])
      .filter((row) => row?.id && row?.nature)
      .map((row) => [row.id, row.nature])
  );
  return ingredientNatureById;
}

function resolveCanonicalNature(canonicalId, lookup) {
  return loadIngredientNatureById().get(canonicalId)
    || lookup.byId.get(canonicalId)
    || null;
}

function loadFoodMedicineNatureById() {
  if (foodMedicineNatureById) return foodMedicineNatureById;
  foodMedicineNatureById = new Map();
  const manifest = readCnJson(FOOD_MEDICINE_FILE, []);
  const lookup = buildNatureLookup();
  manifest.forEach((row) => {
    const id = row.canonicalId || row.id;
    if (!id) return;
    const nature = lookup.byId.get(id) || lookup.byName.get(String(row.name || "").toLowerCase())?.nature;
    if (nature) foodMedicineNatureById.set(id, nature);
  });
  return foodMedicineNatureById;
}

function loadExpandedCoreIds() {
  if (expandedCoreIds) return expandedCoreIds;
  expandedCoreIds = new Set();
  const file = path.join(root, "foods-expanded.js");
  if (!fs.existsSync(file)) return expandedCoreIds;
  const text = fs.readFileSync(file, "utf8");
  const re = /(?:f|tea)\(\s*["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(text))) expandedCoreIds.add(match[1]);
  return expandedCoreIds;
}

export function mapOriginNatureConfidence(natureSource) {
  switch (natureSource) {
    case "seed":
    case "catalog-id":
    case "tcm-herb":
    case "tcm-herb-alias":
    case "catalog-name":
    case "manual":
    case "herb-catalog":
      return "high";
    case "rule-name":
    case "pool-inherit":
    case "inferred":
      return "medium";
    case "category-default":
      return "low";
    default:
      return "medium";
  }
}

export function assignFoodNatureMetadata(food, options = {}) {
  const {
    lookup = buildNatureLookup(),
    aliasMap = loadFoodIdAliasMap(),
    seedIds = new Set(readCnJson("origin-products.seed.json", []).map((row) => row.id)),
    originIds = new Set(readCnJson("origin-products.json", readCnJson("origin-products.seed.json", [])).map((row) => row.id))
  } = options;

  const { __sourceFile, ...base } = food;
  const sourceFile = String(__sourceFile || "");

  if (base.natureSource && base.natureConfidence) {
    return base;
  }

  const canonicalId = resolveFoodId(base.id, aliasMap);
  const medicineNature = loadFoodMedicineNatureById().get(canonicalId);

  if (canonicalId !== base.id) {
    const inheritedNature = resolveCanonicalNature(canonicalId, lookup);
    if (inheritedNature) {
      return {
        ...base,
        nature: inheritedNature,
        natureSource: "pool-inherit",
        natureConfidence: "medium"
      };
    }
  }

  if (base.natureSource === "manual" || loadManualIngredientIds().has(base.id)) {
    const canonicalNature = resolveCanonicalNature(canonicalId, lookup);
    return {
      ...base,
      nature: canonicalNature || base.nature,
      natureSource: "manual",
      natureConfidence: "high"
    };
  }

  if (loadExpandedCoreIds().has(base.id)) {
    return { ...base, natureSource: "manual", natureConfidence: "high" };
  }

  if (base.officialFoodMedicine || base.itemKind === "food-medicine") {
    return { ...base, natureSource: "herb-catalog", natureConfidence: "high" };
  }

  if (medicineNature) {
    return { ...base, natureSource: "herb-catalog", natureConfidence: "high", nature: base.nature || medicineNature };
  }

  if (originIds.has(base.id) || base.isOriginProduct) {
    const inferred = inferOriginNature(base, lookup, { seedIds, aliasMap });
    return {
      ...base,
      nature: inferred.nature,
      natureSource: inferred.natureSource,
      natureConfidence: mapOriginNatureConfidence(inferred.natureSource)
    };
  }

  if (CURATED_BATCH_RE.test(sourceFile) || MANUAL_HIGH_FILES.has(sourceFile)) {
    return { ...base, natureSource: base.natureSource || "manual", natureConfidence: base.natureConfidence || "high" };
  }

  if (base.hiddenFromLibrary) {
    return {
      ...base,
      natureSource: base.natureSource || "pool-inherit",
      natureConfidence: base.natureConfidence || "medium"
    };
  }

  const fromCatalogId = lookup.byId.get(canonicalId);
  if (fromCatalogId && base.nature === fromCatalogId) {
    return { ...base, natureSource: "catalog-id", natureConfidence: "high" };
  }

  const fromName = lookup.byName.get(String(base.name || "").toLowerCase())?.nature;
  if (fromName && base.nature === fromName) {
    return { ...base, natureSource: "catalog-name", natureConfidence: "medium" };
  }

  if (/民间常见.+食养整理条目/.test(String(base.summary || ""))) {
    return { ...base, natureSource: "category-default", natureConfidence: "low" };
  }

  if (base.natureSource) {
    return {
      ...base,
      natureConfidence: base.natureConfidence || mapOriginNatureConfidence(base.natureSource)
    };
  }

  return { ...base, natureSource: "inferred", natureConfidence: "medium" };
}

export function annotateCatalogFoods(foods, options = {}) {
  const sourceIndex = new Map();
  CN_JSON_SOURCES.forEach((file) => {
    readCnJson(file, []).forEach((row) => {
      if (row?.id) sourceIndex.set(row.id, file);
    });
  });
  EXPANDED_BULK_JSON_SOURCES.forEach((file) => {
    readCnJson(file, []).forEach((row) => {
      if (row?.id) sourceIndex.set(row.id, file);
    });
  });

  return foods.map((food) => assignFoodNatureMetadata(
    { ...food, __sourceFile: sourceIndex.get(food.id) || food.__sourceFile || "" },
    options
  ));
}
