/* Monthly Expenses offline shell. User financial records stay in browser storage. */
const CACHE_NAME = "monthly-expenses-pwa-2026-10-19-3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./app-icon.svg"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names
        .filter(name => name.startsWith("monthly-expenses-pwa-") && name !== CACHE_NAME)
        .map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.registration.scope)) return;
  const url = new URL(req.url);
  // Only cache known static app assets; never cache user exports or personal data.
  const isDocument = req.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname === new URL(self.registration.scope).pathname;
  const isAsset = /\/(?:manifest\.webmanifest|app-icon\.svg)$/.test(url.pathname);
  if (!isDocument && !isAsset) return;
  if (isAsset) {
    event.respondWith(caches.match(req).then(cached => cached ||
      fetch(req).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return response;
      })));
    return;
  }
  // Fetch latest dashboard code when online; use the last working copy offline.
  event.respondWith(fetch(req).then(response => {
    if (response.ok && response.type === "basic") {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(req);
    return cached || await caches.match("./index.html") || Response.error();
  }));
});
