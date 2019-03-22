importScripts("precache-manifest.70bf86e8ce282e15a520f0f2dd64e69a.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

