importScripts("precache-manifest.14cd5141dd5297b8aba09c0c8a024f2f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

