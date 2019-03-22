importScripts("precache-manifest.8a6b607660a94eb9d40a8e71bec4cca0.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

