/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-0241c78';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./manifest.json","./index.html","./resources.html","./slon_a_jeho_strycek_001.html","./slon_a_jeho_strycek_003.html","./slon_a_jeho_strycek_005.html","./slon_a_jeho_strycek_006.html","./slon_a_jeho_strycek_007.html","./slon_a_jeho_strycek_008.html","./slon_a_jeho_strycek_009.html","./slon_a_jeho_strycek_010.html","./slon_a_jeho_strycek_011.html","./slon_a_jeho_strycek_012.html","./slon_a_jeho_strycek_013.html","./slon_a_jeho_strycek_014.html","./slon_a_jeho_strycek_015.html","./slon_a_jeho_strycek_016.html","./slon_a_jeho_strycek_017.html","./slon_a_jeho_strycek_018.html","./slon_a_jeho_strycek_019.html","./slon_a_jeho_strycek_020.html","./slon_a_jeho_strycek_021.html","./slon_a_jeho_strycek_022.html","./slon_a_jeho_strycek_023.html","./slon_a_jeho_strycek_024.html","./slon_a_jeho_strycek_025.html","./slon_a_jeho_strycek_026.html","./slon_a_jeho_strycek_027.html","./slon_a_jeho_strycek_028.html","./slon_a_jeho_strycek_029.html","./slon_a_jeho_strycek_030.html","./slon_a_jeho_strycek_031.html","./slon_a_jeho_strycek_032.html","./slon_a_jeho_strycek_033.html","./resources/image001.jpg","./resources/image002.jpg","./resources/index.xml","./resources/obalka_slon_a_jeho_strycek.jpg","./resources/obr1.jpg","./resources/obr11.jpg","./resources/obr2.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
