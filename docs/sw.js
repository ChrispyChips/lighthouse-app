importScripts("precache-manifest.3484a49660d3770d34087b7ca86d8573.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

