importScripts("precache-manifest.6571340716d719a4783e06a2f7184631.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

