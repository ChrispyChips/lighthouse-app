importScripts("precache-manifest.b968af2c46fd3716db05c23b7dbc81ba.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

console.log('Hello service worker');

workbox.precaching.precacheAndRoute(self.__precacheManifest);

