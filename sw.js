// PWA service worker for Winchell Wang Blog.
// Home is cache-first; posts/comments are network-only; other pages are
// network-first; static assets use stale-while-revalidate.
const CACHE_VERSION = 'v6';
const HOME_CACHE = `winchell-blog-home-${CACHE_VERSION}`;
const PAGE_CACHE = `winchell-blog-pages-${CACHE_VERSION}`;
const ASSET_CACHE = `winchell-blog-assets-${CACHE_VERSION}`;
const CACHE_NAMES = new Set([HOME_CACHE, PAGE_CACHE, ASSET_CACHE]);
const HOME_URL = new URL('./', self.registration.scope).href;
const PRECACHE_URLS = [
  './', './manifest.json', './css/bootstrap.min.css', './css/moax-blog.css',
  './css/syntax.css', './css/prism.css', './js/prism.js',
  './js/polyfill.min.js', './js/tex-mml-chtml.js', './js/pagination.js',
  './js/jquery.min.js', './js/bootstrap.min.js', './js/moax-blog.min.js',
  './img/favicon.ico',
  './img/apple.png', './img/home-bg.jpg', './img/avatar.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(HOME_CACHE)
      .then((cache) => Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.map((name) => CACHE_NAMES.has(name) ? undefined : caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Third-party APIs and embeds (including Giscus) are never cached.
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === 'navigate') {
    if (isLiveContent(url.pathname)) {
      event.respondWith(fetch(request, { cache: 'no-store' }));
    } else if (isHome(url)) {
      event.respondWith(homeCacheFirst(event, request));
    } else {
      event.respondWith(networkFirst(request, PAGE_CACHE));
    }
    return;
  }

  if (isStaticAsset(request, url)) {
    event.respondWith(staleWhileRevalidate(event, request, ASSET_CACHE));
  }
});

function isHome(url) {
  const normalized = new URL(url.href);
  normalized.search = '';
  normalized.hash = '';
  return normalized.href === HOME_URL || normalized.href === `${HOME_URL}index.html`;
}

function isLiveContent(pathname) {
  const scopePath = new URL(self.registration.scope).pathname.replace(/\/$/, '');
  const relativePath = pathname.slice(scopePath.length) || '/';
  return relativePath === '/comment' ||
    relativePath.startsWith('/comment/') ||
    /^\/\d{4}\/\d{2}\/\d{2}\//.test(relativePath);
}

function isStaticAsset(request, url) {
  return ['style', 'script', 'image', 'font'].includes(request.destination) ||
    /\.(?:css|js|mjs|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$/i.test(url.pathname);
}

async function homeCacheFirst(event, request) {
  const cache = await caches.open(HOME_CACHE);
  const cached = await cache.match(HOME_URL);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(HOME_URL, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  const response = await refresh;
  return response || offlineResponse();
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || offlineResponse();
  }
}

async function staleWhileRevalidate(event, request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  return (await refresh) || Response.error();
}

function offlineResponse() {
  return new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Offline</title><p>This page needs an internet connection.</p>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
