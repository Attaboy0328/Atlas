(function atlasBootstrap() {
  "use strict";

  const RECIPE_DEFERRED_BUNDLES = [
    "generated/recipes-bulk.js",
    "generated/classic-diet-recipes.js"
  ];

  const loaded = new Set();
  let deferredPromise = null;

  function loadScript(src) {
    if (loaded.has(src)) return Promise.resolve(src);
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      el.onload = () => {
        loaded.add(src);
        resolve(src);
      };
      el.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(el);
    });
  }

  function needsRecipeBundlesFirst() {
    const params = new URLSearchParams(window.location.search);
    return params.get("view") === "recipes" || params.has("recipe");
  }

  function loadDeferredBundles() {
    if (!deferredPromise) {
      deferredPromise = RECIPE_DEFERRED_BUNDLES.reduce(
        (chain, src) => chain.then(() => loadScript(src)),
        Promise.resolve()
      ).then(() => {
        if (typeof window.atlasMergeDeferredBundles === "function") {
          window.atlasMergeDeferredBundles();
        }
      }).catch((error) => {
        console.warn("[atlas-bootstrap]", error);
        deferredPromise = null;
      });
    }
    return deferredPromise;
  }

  window.atlasEnsureDeferredBundles = loadDeferredBundles;

  window.__atlasDeferBoot = true;

  function notifyInstallPromptReady() {
    if (window.__atlasInstallPrompt) {
      window.dispatchEvent(new Event("atlas:beforeinstallprompt"));
    }
  }

  function startApp() {
    return loadScript("app.js").then(() => {
      if (typeof window.atlasBoot === "function") window.atlasBoot();
      notifyInstallPromptReady();
    });
  }

  const preloadCore = [
    "foods-expanded.js",
    "generated/foods-expanded-bulk.js",
    "generated/foods-cn-bundle.js",
    "generated/food-enrichment-runtime.js",
    "generated/food-id-aliases.js",
    "generated/food-search-synonyms.js",
    "generated/app-version.js",
    "generated/tcm-herbs-bundle.js",
    "generated/food-medicine-catalog.js",
    "generated/pairing-rules-extra.js",
    "generated/handcrafted-recipes.js",
    "generated/origin-products.js",
    "generated/dao-di-regions.js",
    "generated/dao-di-systems.js",
    "generated/dao-di-herb-profiles.js"
  ];

  preloadCore.reduce((chain, src) => chain.then(() => loadScript(src)), Promise.resolve())
    .then(() => {
      if (needsRecipeBundlesFirst()) {
        return loadDeferredBundles().then(startApp);
      }
      return startApp().then(() => {
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
        idle(() => loadDeferredBundles());
      });
    })
    .catch((error) => {
      console.error("[atlas-bootstrap] boot failed", error);
    });
})();
