const CACHE_NAME = "atlas-v58";
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./atlas-bootstrap.js",
  "./foods-expanded.js",
  "./generated/foods-expanded-bulk.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./generated/foods-cn-bundle.js",
  "./generated/food-id-aliases.js",
  "./generated/food-search-synonyms.js",
  "./generated/app-version.js",
  "./generated/pairing-rules-extra.js",
  "./generated/handcrafted-recipes.js",
  "./generated/tcm-herbs-bundle.js",
  "./generated/recipes-bulk.js",
  "./generated/classic-diet-recipes.js",
  "./generated/food-medicine-catalog.js",
  "./generated/origin-products.js",
  "./generated/dao-di-regions.js",
  "./generated/dao-di-systems.js",
  "./generated/dao-di-herb-profiles.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
