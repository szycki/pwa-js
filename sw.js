const cacheName = 'pwa-v1';

const filesToCache = [
	'/pwa-js/',
	'/pwa-js/index.html',
	'/pwa-js/style.css',
	'/pwa-js/js/main.js'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request).then(fetchResponse => {
				if (event.request.method === 'GET') {
					return caches.open(cacheName).then(cache => {
						cache.put(event.request, fetchResponse.clone());
						return fetchResponse;
					});
				}
				return fetchResponse;
			});
		}).catch(() => {
			if (event.request.method === 'navigate') {
				return caches.match('/index.html');
			}
		})
	);
});

self.addEventListener('activate', (event) => {
	const cacheWhitelist = [cacheName];

	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (!cacheWhitelist.includes(cache)) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

