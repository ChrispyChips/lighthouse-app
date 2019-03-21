console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
