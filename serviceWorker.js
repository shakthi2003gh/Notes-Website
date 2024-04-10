const CACHE_NAME = "notes-website-cache-v1";
const cacheAssets = [
  "/images/icon-72x72.png",
  "/images/icon-96x96.png",
  "/images/icon-128x128.png",
  "/images/icon-144x144.png",
  "/images/icon-152x152.png",
  "/images/icon-192x192.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png",
  "/src/assets/logo-light.svg",
  "/src/assets/logo-dark.svg",
  "/src/assets/user-avatar.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      const promises = cacheNames.map((cache) => {
        if (cache !== CACHE_NAME) return caches.delete(cache);

        return null;
      });

      return Promise.all(promises);
    })
  );
});

self.addEventListener("fetch", (e) => {
  const res = e.request;
  if (res.url.includes("/api/")) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, resClone);
        });

        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
