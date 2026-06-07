(function atlasBootstrap() {
  "use strict";

  const DEFERRED_BUNDLES = [
    "generated/tcm-herbs-bundle.js",
    "generated/recipes-bulk.js",
    "generated/classic-diet-recipes.js",
    "generated/food-medicine-catalog.js"
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

  function needsDeferredFirst() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    return view === "library" || view === "recipes" || params.has("food") || params.has("recipe");
  }

  function loadDeferredBundles() {
    if (!deferredPromise) {
      deferredPromise = DEFERRED_BUNDLES.reduce(
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
    "generated/food-id-aliases.js",
    "generated/pairing-rules-extra.js",
    "generated/handcrafted-recipes.js"
  ];

  preloadCore.reduce((chain, src) => chain.then(() => loadScript(src)), Promise.resolve())
    .then(() => {
      if (needsDeferredFirst()) {
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
