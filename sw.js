"use strict";
// Offline support: cache the app shell so the list opens with no signal.
// Firebase requests are never intercepted — the app has its own offline fallback.
const CACHE = "sephora-staples-v1";
const PRECACHE = [
    "/",
    "/manifest.json",
    "/icon-180.png",
    "/icon-192.png",
    "/icon-512.png",
    "/app.js",
    "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
];
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE)
        .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
        .then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys()
        .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
        .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
    const req = event.request;
    if (req.method !== "GET")
        return;
    const url = new URL(req.url);
    if (url.hostname.endsWith("firebaseio.com"))
        return; // live data — let the app talk to Firebase directly
    // App shell (page + app.js): network first so updates land, cache fallback when offline
    if (req.mode === "navigate" || url.pathname === "/app.js") {
        event.respondWith(fetch(req)
            .then((resp) => {
            const copy = resp.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
            return resp;
        })
            .catch(() => caches.match(req, { ignoreSearch: true })
            .then((hit) => hit || (req.mode === "navigate" ? caches.match("/") : undefined))));
        return;
    }
    // Everything else (icons, fonts, CDN scripts): cache first, refresh in the background
    event.respondWith(caches.match(req).then((hit) => {
        const refresh = fetch(req)
            .then((resp) => {
            if (resp && (resp.ok || resp.type === "opaque")) {
                const copy = resp.clone();
                caches.open(CACHE).then((cache) => cache.put(req, copy));
            }
            return resp;
        })
            .catch(() => hit);
        return hit || refresh;
    }));
});
