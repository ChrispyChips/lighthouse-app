importScripts("precache-manifest.d7d0464cdba7871fd5f2b58ef1be9be1.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

