/* global self, caches, fetch, URL, Request, Response */
// Service worker template. Not bundled: vite.config.js (offlinePlugin) fills in the placeholders
// below and emits the result as dist/sw.js.
//
// The app shell is served cache-first from the version this worker precached, so the page and its
// hashed assets always match. A new deploy installs in the background and waits; the page shows
// "Update ready" and sends SKIP_WAITING when the user taps it (or the new version starts on the next
// launch once every window has closed).

const SHELL_CACHE = __SHELL_CACHE__;
const TILES_CACHE = __TILES_CACHE__;
const FONTS_CACHE = 'ktm-fonts-v1';
const SHELL_FILES = __SHELL_FILES__;
const PRECACHE_TILES = __PRECACHE_TILES__;

const KNOWN_CACHES = [SHELL_CACHE, TILES_CACHE, FONTS_CACHE];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

const scopeUrl = (file) => new URL(file, self.registration.scope).href;
const TILES_PREFIX = new URL('tiles/', self.registration.scope).pathname;
const ASSETS_PREFIX = new URL('assets/', self.registration.scope).pathname;
const INDEX_URL = scopeUrl('./');

// Cloudflare's SPA fallback answers unknown paths with index.html (200). Never store that as a script,
// stylesheet or image.
const isHtml = (response) => (response.headers.get('content-type') || '').includes('text/html');

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      await Promise.all(
        SHELL_FILES.map(async (file) => {
          const url = scopeUrl(file);
          // Hashed build files never change, so reuse a copy from the previous version's cache
          const previous = new URL(url).pathname.startsWith(ASSETS_PREFIX) && (await caches.match(url));
          const reusable = previous && previous.ok && !isHtml(previous) ? previous : null;
          const response = reusable || (await fetch(new Request(url, { cache: 'no-cache' })));
          if (!response.ok) throw new Error(`Precache failed for ${file}: ${response.status}`);
          if (url !== INDEX_URL && isHtml(response) && !file.endsWith('.html')) throw new Error(`Precache got HTML for ${file}`);
          await shell.put(url, response);
        })
      );

      // Low-zoom tiles are a bonus (tiles are cached as they are viewed anyway): fetch only missing ones,
      // and don't let a flaky tile fail the update
      const tiles = await caches.open(TILES_CACHE);
      await Promise.all(
        PRECACHE_TILES.map(async (file) => {
          const url = scopeUrl(file);
          if (await tiles.match(url)) return;
          try {
            const response = await fetch(url);
            if (response.ok && !isHtml(response)) await tiles.put(url, response);
          } catch {}
        })
      );
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
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
    } else if (url.pathname.startsWith(ASSETS_PREFIX)) {
      event.respondWith(cacheFirst(request, SHELL_CACHE));
    } else {
      event.respondWith(staleWhileRevalidate(request, SHELL_CACHE, event));
    }
  } else if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, FONTS_CACHE, event));
  }
});

// Cache first: the precached page belongs to this worker's assets. Query strings (shared links like
// ?op=S) all map to the same page. The network is only used before the first install completes.
async function navigationResponse(request) {
  const cached = await caches.match(INDEX_URL, { cacheName: SHELL_CACHE });
  if (cached) return cached;
  try {
    return await fetch(request);
  } catch {
    return (await caches.match(INDEX_URL)) || Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && !isHtml(response)) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.type === 'opaque' || (response.ok && !isHtml(response))) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return (await network) || Response.error();
}
