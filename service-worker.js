self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('manzua-store').then((cache) => cache.addAll([
            '/dashboard.html',
            '/index.html',
            '/assets/css/style.css',
            '/assets/js/booking.js'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});