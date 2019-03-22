importScripts("precache-manifest.c390ceb626bb1579c647ccf6134c20d7.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

