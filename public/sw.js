/*
  Prostatis service worker. One job: when a page can't load because the device is offline,
  show /offline.html instead of the browser's error, and that page reloads the original
  address by itself once the connection returns (so a payment status check, a lesson or the
  dashboard picks up where it was). Only full page loads go through here; nothing else is
  cached, so no private page is ever stored on the device.
*/
const CACHE = "prostatis-offline-v1";
const OFFLINE = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add(new Request(OFFLINE, { cache: "reload" }))));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || req.mode !== "navigate") return;
  event.respondWith(fetch(req).catch(() => caches.match(OFFLINE).then((res) => res || Response.error())));
});
