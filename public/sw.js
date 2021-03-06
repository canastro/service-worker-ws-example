var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/', '/styles/main.css', '/scripts/main.js'];

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('installing service worker');

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log('handling fetch event...');
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
