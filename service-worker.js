const NAME_OF_CACHE = 'drp-tunes-cache-v1';
const APP_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/scripts.js',
    '/images/android-chrome-192x192.png',
    'images/android-chrome-512x512.png',
    'images/screenshot-normal.png',
    'images/screenshot-wide.png',
    'images/favicon.ico',
    '/manifest.json',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(NAME_OF_CACHE).then((cache) => {
            console.log('Caching app files');
            return cache.addAll(APP_FILES);
        })
    );
});


self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cache_Name) => {
            return Promise.all(
                cache_Name.map((cache) => {
                    if (cache !== NAME_OF_CACHE) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cache_response) => {
            if (cache_response) {
                return cache_response;
            }
            return fetch(event.request).then((network_response) => {
                return caches.open(NAME_OF_CACHE).then((cache) => {
                    cache.put(event.request, network_response.clone());
                    return network_response;
                });
            });
        }).catch(() => {
            console.log('no cache available');
        })
    );
});