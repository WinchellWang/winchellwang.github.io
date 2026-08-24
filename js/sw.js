// Legacy location retained so existing installations update cleanly.
// The active site-wide worker is /sw.js.
self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.registration.unregister());
});
