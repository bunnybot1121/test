const CACHE_NAME = 'placeforus-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'sw.js',
  'assets/cute-heart.gif',
  'assets/bunny.png',
  'assets/pichu.png',
  // yahan aur bhi files add kar sakte hain jo offline chahiye
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});