import fs from "fs";
import path from "path";
import { root } from "./food-catalog.mjs";

function uniq(items) {
  return [...new Set((items || []).filter(Boolean))];
}

export function loadGiDaoDiCrosswalk() {
  const file = path.join(root, "data", "cn", "gi-dao-di-crosswalk.json");
  if (!fs.existsSync(file)) return { entries: [] };
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function mergeDaoDi(current, incoming) {
  if (!incoming) return current || null;
  if (!current) return incoming;
  return {
    isAuthentic: Boolean(current.isAuthentic || incoming.isAuthentic),
    regions: uniq([...(current.regions || []), ...(incoming.regions || [])])
  };
}

export function buildCrosswalkIndex(crosswalk) {
  const byGiId = new Map();
  const byGiName = new Map();
  (crosswalk.entries || []).forEach((entry) => {
    if (entry.giId) byGiId.set(entry.giId, entry);
    if (entry.giName) byGiName.set(String(entry.giName).trim(), entry);
  });
  return { byGiId, byGiName };
}

export function applyGiDaoDiCrosswalk(product, index) {
  const hit = index.byGiId.get(product.id)
    || index.byGiName.get(String(product.name || "").trim());
  if (!hit) return product;

  const out = { ...product };
  if (hit.canonicalId && !out.baseFoodId) out.baseFoodId = hit.canonicalId;
  if (hit.daoDi) out.daoDi = mergeDaoDi(out.daoDi, hit.daoDi);
  if (hit.peop && !out.peop) out.peop = hit.peop;
  return out;
}

export function applyCrosswalkToProducts(products) {
  const index = buildCrosswalkIndex(loadGiDaoDiCrosswalk());
  return products.map((product) => applyGiDaoDiCrosswalk(product, index));
}
