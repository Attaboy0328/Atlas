import fs from "fs";
import path from "path";
import { root } from "./food-catalog.mjs";

const GI_LABELS = {
  cnipa: "国家知识产权局地理标志",
  mara: "农业农村部农产品地理标志",
  provincial: "省级地理标志"
};

function slugify(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "item";
}

function makeId(name, system, sourceId) {
  if (sourceId) return String(sourceId).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  return `${system}-${slugify(name)}`;
}

export function manifestRowToOrigin(row, defaults = {}) {
  const system = row.system || defaults.system || "mara";
  const fetchedAt = row.fetchedAt || defaults.fetchedAt || new Date().toISOString().slice(0, 10);
  const id = row.id || makeId(row.name, system, row.sourceId);
  return {
    id,
    name: row.name,
    category: row.category || "滋补食材",
    nature: row.nature || "平",
    provinces: row.provinces || (row.region ? [row.region] : []),
    aliases: row.aliases || [],
    searchTerms: row.searchTerms || [row.name, ...(row.aliases || [])],
    baseFoodId: row.baseFoodId || null,
    giSystems: row.giSystems || [{
      system,
      type: row.giType || (system === "cnipa" ? "地理标志保护产品" : "农产品地理标志"),
      label: GI_LABELS[system] || system
    }],
    daoDi: row.daoDi || null,
    summary: row.summary || `${row.name}为公开地理标志名录整理条目。`,
    provenance: {
      source: row.provenanceSource || system,
      sourceUrl: row.sourceUrl || defaults.sourceUrl || "",
      sourceId: row.sourceId || `${system}-${id}`,
      fetchedAt,
      note: row.note || defaults.note || "整理自公开地理标志名录，以登记机关最新公告为准。"
    }
  };
}

export async function fetchJsonUrl(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json,text/plain,*/*",
        "User-Agent": "AtlasOriginFetcher/1.0"
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return JSON.parse(text);
  } finally {
    clearTimeout(timer);
  }
}

export function parseRegistryPayload(payload, defaults) {
  const rows = Array.isArray(payload)
    ? payload
    : (payload?.items || payload?.data || payload?.records || []);
  return rows
    .filter((row) => row?.name)
    .map((row) => manifestRowToOrigin(row, defaults));
}

export function parseCsvText(text, defaults) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  const idx = (name) => header.indexOf(name);
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const row = {
      name: cols[idx("name")] || cols[0],
      region: cols[idx("region")] || cols[idx("province")] || "",
      system: cols[idx("system")] || defaults.system || "mara",
      sourceId: cols[idx("sourceId")] || cols[idx("id")] || "",
      category: cols[idx("category")] || "滋补食材"
    };
    if (row.region) row.provinces = [row.region];
    return manifestRowToOrigin(row, defaults);
  }).filter((r) => r.name);
}

export function loadFetchSources() {
  const file = path.join(root, "data", "raw", "origin", "fetch-sources.json");
  if (!fs.existsSync(file)) return { sources: [], defaults: {} };
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function loadRegistryManifest() {
  const file = path.join(root, "data", "raw", "origin", "registry-manifest.json");
  if (!fs.existsSync(file)) return [];
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  return parseRegistryPayload(payload, {
    note: "整理自 registry-manifest 公开名录索引；以登记机关最新公告为准。"
  });
}

export function loadIncomingDropFiles() {
  const dir = path.join(root, "data", "raw", "origin", "incoming");
  if (!fs.existsSync(dir)) return [];
  const out = [];
  fs.readdirSync(dir).forEach((name) => {
    const file = path.join(dir, name);
    if (name.endsWith(".json")) {
      out.push(...parseRegistryPayload(JSON.parse(fs.readFileSync(file, "utf8")), { note: `imported from incoming/${name}` }));
    } else if (name.endsWith(".csv")) {
      out.push(...parseCsvText(fs.readFileSync(file, "utf8"), { note: `imported from incoming/${name}` }));
    }
  });
  return out;
}

export async function runConfiguredFetches(sources) {
  const results = [];
  for (const source of sources) {
    if (source.enabled === false) continue;
    try {
      if (source.type === "json" && source.url) {
        const payload = await fetchJsonUrl(source.url, source.timeoutMs);
        const items = parseRegistryPayload(payload, {
          system: source.system,
          sourceUrl: source.url,
          note: source.note
        });
        results.push({ source: source.id, ok: true, count: items.length, items });
      } else if (source.type === "csv" && source.url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), source.timeoutMs || 15000);
        const res = await fetch(source.url, { signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items = parseCsvText(await res.text(), {
          system: source.system,
          sourceUrl: source.url,
          note: source.note
        });
        results.push({ source: source.id, ok: true, count: items.length, items });
      }
    } catch (error) {
      results.push({ source: source.id, ok: false, error: error.message, items: [] });
    }
  }
  return results;
}

export function writeFetchedBatch(outDir, label, items) {
  fs.mkdirSync(outDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(outDir, `fetched-${label}-${date}.json`);
  const payload = {
    registry: label,
    fetchedAt: date,
    note: "Auto-fetched by scripts/fetch-origin-registry.mjs",
    items
  };
  fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return file;
}
