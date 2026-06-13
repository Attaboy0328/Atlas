/** Shared helpers for regional curated food seed scripts. */
import { makeFood, writeJsonFile } from "./food-entry.mjs";

export function tupleToFood(tuple, province) {
  const [id, name, category, nature, aliases, summary] = tuple;
  return makeFood({
    id,
    name,
    category,
    nature,
    provinces: [province],
    regions: ["CN"],
    aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
    summary
  });
}

export function buildRegionalBatch(tuples, province, outPath) {
  const seen = new Set();
  const foods = [];
  tuples.forEach((tuple) => {
    try {
      const food = tupleToFood(tuple, province);
      if (seen.has(food.id) || seen.has(`name:${food.name}`)) return;
      seen.add(food.id);
      seen.add(`name:${food.name}`);
      foods.push(food);
    } catch (e) {
      console.warn(`Skip ${tuple[0]}: ${e.message}`);
    }
  });
  writeJsonFile(outPath, foods);
  return foods;
}

export function buildCuratedBatch(tuples, outPath) {
  const seen = new Set();
  const foods = [];
  tuples.forEach((tuple) => {
    const [id, name, category, nature, province, aliases, summary] = tuple;
    try {
      const food = makeFood({
        id,
        name,
        category,
        nature,
        provinces: [province],
        aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
        summary
      });
      if (seen.has(food.id) || seen.has(`name:${food.name}`)) return;
      seen.add(food.id);
      seen.add(`name:${food.name}`);
      foods.push(food);
    } catch (e) {
      console.warn(`Skip ${id}: ${e.message}`);
    }
  });
  writeJsonFile(outPath, foods);
  return foods;
}

/** Single-country international batch: [id, name, category, nature, aliases, summary] */
export function buildInternationalBatch(tuples, regionCode, countryLabel, outPath) {
  const seen = new Set();
  const foods = [];
  tuples.forEach((tuple) => {
    const [id, name, category, nature, aliases, summary] = tuple;
    try {
      const food = makeFood({
        id,
        name,
        category,
        nature,
        regions: [regionCode],
        provinces: countryLabel ? [countryLabel] : [],
        aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
        summary
      });
      if (seen.has(food.id) || seen.has(`name:${food.name}`)) return;
      seen.add(food.id);
      seen.add(`name:${food.name}`);
      foods.push(food);
    } catch (e) {
      console.warn(`Skip ${id}: ${e.message}`);
    }
  });
  writeJsonFile(outPath, foods);
  return foods;
}

/** Multi-region batch: [id, name, category, nature, regionCode, countryLabel, aliases, summary] */
export function buildInternationalMultiBatch(tuples, outPath) {
  const seen = new Set();
  const foods = [];
  tuples.forEach((tuple) => {
    const [id, name, category, nature, regionCode, countryLabel, aliases, summary] = tuple;
    try {
      const food = makeFood({
        id,
        name,
        category,
        nature,
        regions: [regionCode],
        provinces: countryLabel ? [countryLabel] : [],
        aliases: aliases ? aliases.split(/[、,]/).map((s) => s.trim()).filter(Boolean) : [],
        summary
      });
      if (seen.has(food.id) || seen.has(`name:${food.name}`)) return;
      seen.add(food.id);
      seen.add(`name:${food.name}`);
      foods.push(food);
    } catch (e) {
      console.warn(`Skip ${id}: ${e.message}`);
    }
  });
  writeJsonFile(outPath, foods);
  return foods;
}

/** Global curated: [id, name, category, nature, regionCode, countryLabel, aliases, summary] */
export function buildGlobalCuratedBatch(tuples, outPath) {
  return buildInternationalMultiBatch(tuples, outPath);
}
