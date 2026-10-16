/* Delta Roadster - service worker: laddar ned hela spelet för offline-spel.
   Cache först (spelet startar direkt, även utan nät) och uppdatering i bakgrunden,
   så en ny version syns nästa gång appen startas. Höj VERSION för att tvinga omladdning av allt. */
const VERSION = "delta-v1";
const ASSETS = [
  "./", "index.html", "style.css", "game.js", "manifest.webmanifest",
  "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(ASSETS.map((a) => new Request(a, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ includeUncontrolled: true }))
      .then((cs) => cs.forEach((c) => c.postMessage({ type: "offline-ready", version: VERSION })))
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: true });
      const net = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }          // cache först, uppdatera i bakgrunden
      const res = await net;
      if (res) return res;
      if (req.mode === "navigate") return cache.match("index.html");
      return new Response("", { status: 504 });
    })
  );
});
