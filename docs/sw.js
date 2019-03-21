importScripts("precache-manifest.5f21a45cba50b6b8d2fdbf8ee1809707.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

