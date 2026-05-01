const CACHE_NAME = "scripture-simplified-v2";
const STATIC_ASSETS = [
  "/",
  "/read",
  "/search",
  "/plans",
  "/saved",
  "/progress",
  "/manifest.json",
  "/icon-192.svg",
  "/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and API requests (except icon-png)
  if (request.method !== "GET") return;
  if (url.pathname.startsWith("/api/") && !url.pathname.startsWith("/api/icon-png")) return;

  // Navigation requests: network first, fall back to cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/")))
    );
    return;
  }

  // Static assets (fonts, CSS, JS, images): cache first, fall back to network
  if (
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.startsWith("/api/icon-png") ||
    url.pathname.startsWith("/_next/static")
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }

  // Everything else: network first
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
