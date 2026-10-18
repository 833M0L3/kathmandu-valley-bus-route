/* global self, caches, fetch, URL, Response */
// Service worker template. Not bundled: vite.config.js (offlinePlugin) fills in the placeholders
// below and emits the result as dist/sw.js.

const SHELL_CACHE = __SHELL_CACHE__;
const TILES_CACHE = __TILES_CACHE__;
const FONTS_CACHE = 'ktm-fonts-v1';
const SHELL_FILES = __SHELL_FILES__;
const PRECACHE_TILES = __PRECACHE_TILES__;

const KNOWN_CACHES = [SHELL_CACHE, TILES_CACHE, FONTS_CACHE];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const NAVIGATION_TIMEOUT_MS = 3500;

const scopeUrl = (file) => new URL(file, self.registration.scope).href;
const TILES_PREFIX = new URL('tiles/', self.registration.scope).pathname;
const INDEX_URL = scopeUrl('./');

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      await shell.addAll(SHELL_FILES.map(scopeUrl));
      const tiles = await caches.open(TILES_CACHE);
      await tiles.addAll(PRECACHE_TILES.map(scopeUrl));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n.startsWith('ktm-') && !KNOWN_CACHES.includes(n)).map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith(navigationResponse(request));
    } else if (url.pathname.startsWith(TILES_PREFIX)) {
      event.respondWith(cacheFirst(request, TILES_CACHE));
    } else {
      event.respondWith(staleWhileRevalidate(request, SHELL_CACHE, event));
    }
  } else if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, FONTS_CACHE, event));
  }
});

// Network first (with a timeout for slow mobile data), falling back to the cached app page.
// Query strings (shared links like ?op=S) all map to the same cached page.
async function navigationResponse(request) {
  const cache = await caches.open(SHELL_CACHE);
  const network = fetch(request).then((response) => {
    if (response.ok) cache.put(INDEX_URL, response.clone());
    return response;
  });
  network.catch(() => {});
  try {
    return await withTimeout(network, NAVIGATION_TIMEOUT_MS);
  } catch {
    // Offline or slow: serve the cached page, else keep waiting on the network
    return (await cache.match(INDEX_URL)) || network;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return (await network) || Response.error();
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timed out')), ms);
    promise.then(
      (response) => {
        clearTimeout(timer);
        resolve(response);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}
