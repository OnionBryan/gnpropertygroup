/* Napier Portfolio service worker.
   Shell precached; pages network-first so updates always win;
   photos cached as viewed so brochures reopen instantly/offline. */
var VERSION = 'napier-v1';
var SHELL = [
    '/',
    '/index.html',
    '/portfolio.html',
    '/rent.html',
    '/npv.html',
    '/macon.html',
    '/404.html',
    '/css/main.css',
    '/css/components.css',
    '/css/craft.css',
    '/css/gallery.css',
    '/css/responsive.css',
    '/css/mobile-app.css',
    '/js/data.js',
    '/js/navigation.js',
    '/js/contact.js',
    '/js/gallery.js',
    '/js/app.js',
    '/js/mobile-app.js',
    '/favicon.svg',
    '/manifest.json'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(VERSION).then(function (c) {
            return Promise.allSettled(SHELL.map(function (u) { return c.add(u); }));
        }).then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== VERSION; })
                .map(function (k) { return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

    // Pages: network first, cache fallback (offline brochures)
    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        e.respondWith(
            fetch(req).then(function (res) {
                var copy = res.clone();
                caches.open(VERSION).then(function (c) { c.put(req, copy); });
                return res;
            }).catch(function () {
                return caches.match(req).then(function (hit) {
                    return hit || caches.match('/404.html');
                });
            })
        );
        return;
    }

    // Photos and static assets: cache first, refresh in background
    e.respondWith(
        caches.match(req).then(function (hit) {
            var refresh = fetch(req).then(function (res) {
                if (res && res.status === 200) {
                    var copy = res.clone();
                    caches.open(VERSION).then(function (c) { c.put(req, copy); });
                }
                return res;
            }).catch(function () { return hit; });
            return hit || refresh;
        })
    );
});
