/* Delta Roadster - service worker: laddar ned hela spelet för offline-spel.
   Nät först (alltid senaste versionen när du är online, med 3 s tidsgräns) och cache som
   reserv, så spelet startar även utan nät. Höj VERSION för att tvinga omladdning av allt. */
const VERSION = "delta-v2";
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
      const fromCache = () => cache.match(req, { ignoreSearch: true });
      try {
        const net = await Promise.race([
          fetch(req),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 3000)),
        ]);
        if (net && net.ok) { cache.put(req, net.clone()); return net; }
        return (await fromCache()) || net;
      } catch (err) {
        const hit = await fromCache();
        if (hit) return hit;
        if (req.mode === "navigate") return cache.match("index.html");
        return new Response("", { status: 504 });
      }
    })
  );
});
