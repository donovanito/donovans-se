(() => {
"use strict";

/* =====================================================================
   Planetspelet - ett lugnt hoppspel för små barn.
   Fri värld: spring och hoppa mellan planeter och träd, samla glass,
   hitta Glassplaneten. Man kan aldrig förlora - faller man studsar
   man tillbaka till senaste platsen.
   ===================================================================== */

const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const approach = (v, t, d) => (v < t ? Math.min(t, v + d) : Math.max(t, v - d));
const $ = (s) => document.querySelector(s);

/* ---------- fysik (lätt att ändra) ---------- */
const GRAVITY = 2100;
const JUMP_V = 860; // ~176 px högt
const AIR_JUMP_V = 780; // andra hoppet i luften, ~145 px extra
const MAX_FALL = 1250;
const WALK = 270;
const RUN = 540;
const COYOTE = 0.12; // man hinner hoppa strax efter kanten
const BUFFER = 0.15; // och trycka lite för tidigt
const DEATH_Y = 1100;

/* =====================================================================
   BANAN
   ===================================================================== */

const THEMES = {
  purple: { a: "#c8a2ff", b: "#7a3fe0", rim: "#f0dcff", line: "#4d2399", crater: "#5b2bc0" },
  yellow: { a: "#fff2a0", b: "#ffb000", rim: "#fffbd0", line: "#b06a00", crater: "#d98900" },
  brown:  { a: "#cf9970", b: "#6b3d22", rim: "#ff9fcf", line: "#3f2010", crater: "#3f2010" },
  pink:   { a: "#ffb8dd", b: "#ff4f9f", rim: "#fff0f8", line: "#a1296a", crater: "#c9317f" },
  ice:    { a: "#ffc4e1", b: "#ff7ab8", rim: "#fff6ea", line: "#b83d84", crater: "#c9317f" },
};

// x = mittpunkt, top = höjd på toppen (negativt = högre upp), r = radie
const PLANET_DEFS = [
  { x: 0,    top: 0,    r: 240, theme: "purple", name: "start" },
  { x: 575,  top: -40,  r: 150, theme: "yellow" },
  { x: 930,  top: -85,  r: 58,  theme: "pink" },
  { x: 1330, top: 20,   r: 190, theme: "brown" },
  { x: 1745, top: -30,  r: 62,  theme: "purple" },
  { x: 2135, top: -100, r: 170, theme: "pink" },
  { x: 2515, top: -45,  r: 60,  theme: "yellow" },
  { x: 2925, top: 20,   r: 200, theme: "purple", ring: true },
  { x: 3330, top: -50,  r: 60,  theme: "brown" },
  { x: 3870, top: -120, r: 330, theme: "ice", name: "glass" },
];

// [planetindex, dx från planetens mitt, stamhöjd]
const TREE_DEFS = [
  [0, -130, 165], [0, 165, 185],
  [1, 20, 175],
  [2, 0, 140],
  [3, -80, 170], [3, 120, 200],
  [4, 0, 140],
  [5, -30, 175], [5, 115, 190],
  [6, 0, 140],
  [7, 60, 180],
  [8, 0, 140],
  [9, -230, 190], [9, 150, 200], [9, 250, 190],
];
const CANOPY_COLORS = ["#ff8fc7", "#c58bff", "#7be0a8", "#ffd84d", "#ff9d6e"];
const FLAVORS = ["#ff8fc7", "#8ff0c0", "#c9874f", "#fff2a8", "#c9a0ff"];

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ytans höjd (y) för en plattform vid x. Planeter är cirklar, trädkronor är ellipser. */
function surfaceY(g, x) {
  const u = (x - g.cx) / g.rx;
  return g.cy - g.ry * Math.sqrt(Math.max(0, 1 - u * u));
}

const planets = [];
const trees = [];
const platforms = []; // planeter + trädkronor
let decor = [];
let goal = null;
let X_MIN = 0, X_MAX = 0;

(function buildLevel() {
  const rnd = rng(7);
  PLANET_DEFS.forEach((d, i) => {
    const p = {
      kind: "planet", idx: i, group: i, theme: d.theme, ring: !!d.ring, name: d.name || "",
      cx: d.x, cy: d.top + d.r, r: d.r, rx: d.r, ry: d.r, walk: 0.9, land: 0.93,
      craters: [], seed: Math.floor(rnd() * 1000),
    };
    for (let k = 0; k < 7; k++) p.craters.push({ a: rnd() * TAU, d: 0.15 + rnd() * 0.6, s: 0.07 + rnd() * 0.12 });
    planets.push(p);
    platforms.push(p);
  });

  let ci = 0;
  TREE_DEFS.forEach(([pi, dx, h]) => {
    const pl = planets[pi];
    const x = pl.cx + dx;
    const baseY = surfaceY(pl, x);
    const cone = pl.theme === "ice";
    const t = { pl, x, baseY, h, cone, color: cone ? FLAVORS[ci % FLAVORS.length] : CANOPY_COLORS[ci % CANOPY_COLORS.length] };
    ci++;
    t.platform = { kind: "canopy", group: pl.idx, cx: x, cy: baseY - h, rx: cone ? 78 : 88, ry: 32, walk: 0.9, land: 1, tree: t };
    trees.push(t);
    platforms.push(t.platform);
  });

  // dekor som står på planetytan
  const kinds = { purple: ["flower", "mushroom"], yellow: ["flower", "lolly"], brown: ["lolly", "mushroom"], pink: ["flower", "mushroom"], ice: ["lolly", "lolly", "flower"] };
  const cols = ["#ff6fb5", "#ffd23f", "#ffffff", "#c58bff", "#ff9d6e"];
  planets.forEach((pl) => {
    const n = Math.round(pl.r / 28);
    for (let k = 0; k < n; k++) {
      const dx = (rnd() * 2 - 1) * pl.r * 0.84;
      if (trees.some((t) => t.pl === pl && Math.abs(t.x - (pl.cx + dx)) < 34)) continue;
      const ks = kinds[pl.theme];
      decor.push({ pl, dx, kind: ks[Math.floor(rnd() * ks.length)], col: cols[Math.floor(rnd() * cols.length)], s: 0.8 + rnd() * 0.5 });
    }
  });

  const g9 = planets[planets.length - 1];
  goal = { x: g9.cx - 20, y: surfaceY(g9, g9.cx - 20), pl: g9 };
  X_MIN = planets[0].cx - planets[0].r * 0.88;
  X_MAX = g9.cx + g9.r * 0.88;
})();

let items = [];
function buildItems() {
  const rnd = rng(11);
  const out = [];
  const add = (x, y, kind) => out.push({ x, y, kind, flavor: Math.floor(rnd() * FLAVORS.length), got: false, ph: rnd() * TAU });
  planets.forEach((pl, i) => {
    const isGlass = pl.theme === "ice";
    const n = isGlass ? 9 : Math.max(2, Math.round(pl.r / 55));
    for (let k = 0; k < n; k++) {
      const f = n === 1 ? 0 : (k / (n - 1)) * 2 - 1;
      const x = pl.cx + f * pl.r * 0.78;
      if (isGlass && Math.abs(x - goal.x) < 70) continue;
      add(x, surfaceY(pl, x) - 52, "ice");
    }
    // hoppbåge över gapet till nästa planet
    if (i < planets.length - 1) {
      const nx = planets[i + 1];
      const x0 = pl.cx + pl.r * 0.9, x1 = nx.cx - nx.r * 0.9;
      const y0 = surfaceY(pl, x0), y1 = surfaceY(nx, x1);
      for (let k = 1; k <= 3; k++) {
        const t = k / 4;
        add(lerp(x0, x1, t), lerp(y0, y1, t) - 40 - Math.sin(t * Math.PI) * 120, "ice");
      }
    }
  });
  // stjärnor på alla trädkronor (och en extra högt över glassplaneten)
  trees.forEach((t) => add(t.x, t.platform.cy - t.platform.ry - 42, "star"));
  const g9 = planets[planets.length - 1];
  for (let k = -2; k <= 2; k++) add(g9.cx + k * 110 + 60, surfaceY(g9, g9.cx + k * 110 + 60) - 190, "star");
  items = out;
}
buildItems();

/* =====================================================================
   SPELARENS FYSIK
   ===================================================================== */

function makePlayer() {
  const g = planets[0];
  const x = 0;
  return {
    x, y: surfaceY(g, x), vx: 0, vy: 0, ground: g, face: 1,
    coyote: 0, buffer: 0, airJumps: 1, sq: 0, lastFall: 0,
    safe: { x, y: surfaceY(g, x) }, safeT: 0, t: 0, blink: 0,
  };
}

/** Ett fysiksteg. inp: {left,right,run,jump (kantpuls)}. ev: lista som fylls med händelser. */
function stepPlayer(p, inp, dt, ev) {
  const dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
  p.vx = approach(p.vx, dir * (inp.run ? RUN : WALK), (p.ground ? 4200 : 2400) * dt);
  if (dir) p.face = dir;

  p.buffer = inp.jump ? BUFFER : Math.max(0, p.buffer - dt);
  p.coyote = p.ground ? COYOTE : Math.max(0, p.coyote - dt);
  if (p.buffer > 0) {
    if (p.ground || p.coyote > 0) {
      p.vy = -JUMP_V; p.ground = null; p.coyote = 0; p.buffer = 0; p.airJumps = 1; p.sq = -0.5;
      ev.push("jump");
    } else if (p.airJumps > 0) {
      p.vy = -AIR_JUMP_V; p.airJumps--; p.buffer = 0; p.sq = -0.5;
      ev.push("air");
    }
  }

  const py = p.y;
  p.x += p.vx * dt;
  if (p.x < X_MIN) { p.x = X_MIN; p.vx = Math.max(0, p.vx); }
  if (p.x > X_MAX) { p.x = X_MAX; p.vx = Math.min(0, p.vx); }

  if (p.ground) {
    const g = p.ground;
    if (Math.abs(p.x - g.cx) > g.rx * g.walk) { p.ground = null; p.vy = 0; p.airJumps = 1; }
    else p.y = surfaceY(g, p.x);
  }
  if (!p.ground) {
    p.vy = Math.min(p.vy + GRAVITY * dt, MAX_FALL);
    p.y += p.vy * dt;
    let best = null, bestS = Infinity;
    if (p.vy >= 0) {
      for (const g of platforms) {
        if (Math.abs(p.x - g.cx) > g.rx * g.land) continue;
        const s = surfaceY(g, p.x);
        if (py <= s + 14 && p.y >= s && s < bestS) { best = g; bestS = s; }
      }
    }
    if (best) {
      p.lastFall = p.vy; p.ground = best; p.y = bestS; p.vy = 0; p.airJumps = 1;
      p.sq = clamp(p.lastFall / 1800, 0.15, 0.5); p.safeT = 0;
      ev.push("land");
    } else {
      // planeterna är solida från sidorna: glid runt kanten
      for (const g of planets) {
        const dx = p.x - g.cx, dy = p.y - g.cy, d = Math.hypot(dx, dy);
        if (d < g.r - 1 && d > 0.001) {
          const nx = dx / d, ny = dy / d;
          p.x = g.cx + nx * g.r; p.y = g.cy + ny * g.r;
          const vn = p.vx * nx + p.vy * ny;
          if (vn < 0) { p.vx -= vn * nx; p.vy -= vn * ny; }
        }
      }
    }
  } else {
    p.safeT += dt;
    if (p.safeT > 0.3) {
      const g = p.ground;
      const sx = g.cx + clamp(p.x - g.cx, -g.rx * 0.55, g.rx * 0.55);
      p.safe = { x: sx, y: surfaceY(g, sx) };
    }
  }
  p.sq = approach(p.sq, 0, dt * 3.2);
}

/** Närmaste yta under (x,y) - används för skuggan. */
function groundBelow(x, y) {
  let best = null;
  for (const g of platforms) {
    if (Math.abs(x - g.cx) > g.rx * 0.97) continue;
    const s = surfaceY(g, x);
    if (s >= y - 6 && (best === null || s < best)) best = s;
  }
  return best;
}

/* =====================================================================
   LJUD
   ===================================================================== */

let ac = null;
let muted = false;
function audio() {
  if (!ac) {
    try { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ac = new AC(); } catch (e) { /* inget ljud */ }
  }
  return ac;
}
function unlockAudio() {
  const a = audio();
  if (a && a.state === "suspended") a.resume();
}
function tone(f, dur = 0.15, type = "sine", vol = 0.16, slideTo = null, delay = 0) {
  const a = audio();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(a.destination);
  o.start(t0); o.stop(t0 + dur + 0.02);
}
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16];
const SFX = {
  jump: () => tone(380, 0.16, "sine", 0.18, 720),
  air: () => tone(560, 0.16, "triangle", 0.18, 980),
  land: () => tone(150, 0.09, "sine", 0.14, 90),
  item: (n) => { const f = 523 * Math.pow(2, PENTA[n % PENTA.length] / 12); tone(f, 0.2, "triangle", 0.16); tone(f * 2, 0.12, "sine", 0.06, null, 0.04); },
  pop: () => tone(300, 0.25, "sine", 0.16, 760),
  win: () => [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, 0.24, "triangle", 0.18, null, i * 0.13)),
};

/* =====================================================================
   KANVAS, KAMERA, BAKGRUND
   ===================================================================== */

const canvas = $("#c");
const ctx = canvas.getContext("2d");
let W = 0, H = 0, dpr = 1, S = 1;
const cam = { x: 0, y: 0 };

function resize() {
  dpr = Math.min(2, window.devicePixelRatio || 1);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  const portrait = H > W * 1.1;
  S = portrait ? W / 760 : Math.min(W / 1000, H / 620);
  S = clamp(S, 0.3, 1.5);
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", () => setTimeout(resize, 150));
resize();

const bgRnd = rng(3);
const bgStars = Array.from({ length: 80 }, () => ({ u: bgRnd(), v: bgRnd(), s: 3 + bgRnd() * 6, ph: bgRnd() * TAU, c: ["#ffffff", "#fff2a8", "#ffd0ea"][Math.floor(bgRnd() * 3)] }));
const bgPlanets = [
  { u: 0.08, v: 0.2, r: 70, a: "#e6d6ff", b: "#c4a5ff" }, { u: 0.34, v: 0.55, r: 46, a: "#ffe0f0", b: "#ffb0d6" },
  { u: 0.58, v: 0.16, r: 56, a: "#fff6c0", b: "#ffe070" }, { u: 0.8, v: 0.5, r: 84, a: "#f1d6bf", b: "#d9a98a", ring: true },
  { u: 0.95, v: 0.22, r: 40, a: "#e6d6ff", b: "#c4a5ff" },
];
const bgClouds = Array.from({ length: 8 }, () => ({ u: bgRnd(), v: 0.55 + bgRnd() * 0.4, w: 120 + bgRnd() * 140, sp: 4 + bgRnd() * 8 }));
const wrap = (v, T) => ((v % T) + T) % T;

function drawSky(t) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#b49cff");
  g.addColorStop(0.5, "#e9b2ff");
  g.addColorStop(0.8, "#ffc4e4");
  g.addColorStop(1, "#ffe2b8");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  const m = 120, T = W + m * 2;
  // stjärnor
  for (const s of bgStars) {
    const x = wrap(s.u * T - cam.x * 0.05 * S, T) - m;
    const y = s.v * H * 0.85 - cam.y * 0.02 * S;
    const k = 0.6 + 0.4 * Math.sin(t * 2 + s.ph);
    sparkle(ctx, x, y, s.s * k, s.c);
  }
  // avlägsna planeter
  for (const p of bgPlanets) {
    const x = wrap(p.u * T - cam.x * 0.09 * S, T) - m;
    const y = p.v * H - cam.y * 0.04 * S;
    const r = p.r * Math.max(0.6, S);
    if (p.ring) { ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = r * 0.14; ctx.beginPath(); ctx.ellipse(x, y, r * 1.7, r * 0.4, -0.25, 0, TAU); ctx.stroke(); }
    const rg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r);
    rg.addColorStop(0, p.a); rg.addColorStop(1, p.b);
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.globalAlpha = 1;
  }
  // godisnoll
  for (const c of bgClouds) {
    const x = wrap(c.u * T - cam.x * 0.25 * S - t * c.sp, T) - m;
    const y = c.v * H - cam.y * 0.1 * S;
    const w = c.w * Math.max(0.6, S);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(x, y, w * 0.5, w * 0.16, 0, 0, TAU);
    ctx.ellipse(x - w * 0.2, y - w * 0.08, w * 0.22, w * 0.15, 0, 0, TAU);
    ctx.ellipse(x + w * 0.15, y - w * 0.1, w * 0.26, w * 0.18, 0, 0, TAU);
    ctx.fill();
  }
}

function sparkle(c, x, y, r, col) {
  c.fillStyle = col;
  c.beginPath();
  c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r);
  c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r);
  c.fill();
}
function starPath(c, x, y, r) {
  c.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.48;
    c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  c.closePath();
}

/* =====================================================================
   RITA VÄRLDEN
   ===================================================================== */

function drawPlanet(c, P, t) {
  const th = THEMES[P.theme];
  const { cx, cy, r } = P;
  if (P.ring) drawRing(c, P, true);

  // kropp
  c.save();
  c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.clip();
  const g = c.createRadialGradient(cx - r * 0.35, cy - r * 0.45, r * 0.1, cx, cy, r);
  g.addColorStop(0, th.a); g.addColorStop(1, th.b);
  c.fillStyle = g; c.fillRect(cx - r, cy - r, r * 2, r * 2);

  if (P.theme === "ice") {
    // gräddglasyr med droppar + strössel
    c.fillStyle = th.rim;
    c.beginPath();
    c.moveTo(cx - r - 4, cy - r - 4); c.lineTo(cx + r + 4, cy - r - 4);
    const base = cy - r * 0.42;
    for (let x = cx + r + 4; x >= cx - r - 4; x -= 6) {
      const d = Math.abs(Math.sin((x - cx) * 0.035 + P.seed)) * 46 + Math.abs(Math.sin((x - cx) * 0.011)) * 30;
      c.lineTo(x, base + d);
    }
    c.closePath(); c.fill();
    const rr = rng(P.seed);
    for (let k = 0; k < 70; k++) {
      const x = cx + (rr() * 2 - 1) * r, y = cy - r + rr() * r * 0.62;
      c.strokeStyle = ["#ff6fb5", "#ffd23f", "#7be0a8", "#8a4fff", "#ff9d6e"][k % 5];
      c.lineWidth = 6; c.lineCap = "round";
      const a = rr() * TAU;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * 9, y + Math.sin(a) * 9); c.stroke();
    }
  } else {
    for (const k of P.craters) {
      const x = cx + Math.cos(k.a) * k.d * r, y = cy + Math.sin(k.a) * k.d * r, rr = k.s * r;
      c.globalAlpha = 0.18; c.fillStyle = th.crater; c.beginPath(); c.arc(x, y, rr, 0, TAU); c.fill();
      c.globalAlpha = 0.25; c.fillStyle = "#fff"; c.beginPath(); c.arc(x - rr * 0.2, y - rr * 0.2, rr * 0.55, 0, TAU); c.fill();
      c.globalAlpha = 1;
    }
  }
  c.restore();

  c.lineWidth = 5; c.strokeStyle = th.line; c.globalAlpha = 0.55;
  c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke();
  c.globalAlpha = 1;

  // gräs/glasyr längs översidan (här går man)
  if (P.theme !== "ice") {
    c.strokeStyle = th.rim; c.lineCap = "round"; c.lineWidth = 18;
    c.beginPath(); c.arc(cx, cy, r - 9, -Math.PI / 2 - 1.3, -Math.PI / 2 + 1.3); c.stroke();
    c.fillStyle = th.rim;
    for (let a = -1.3; a <= 1.3; a += 26 / r) {
      const rad = r - 4;
      c.beginPath(); c.arc(cx + Math.sin(a) * rad, cy - Math.cos(a) * rad, 8 + 2.5 * Math.sin(a * 17 + P.seed), 0, TAU); c.fill();
    }
  } else {
    c.fillStyle = th.rim;
    for (let a = -1.3; a <= 1.3; a += 24 / r) {
      c.beginPath(); c.arc(cx + Math.sin(a) * (r - 4), cy - Math.cos(a) * (r - 4), 9, 0, TAU); c.fill();
    }
  }
  if (P.ring) drawRing(c, P, false);
}

function drawRing(c, P, back) {
  c.save();
  c.translate(P.cx, P.cy); c.rotate(-0.22);
  c.lineWidth = P.r * 0.14;
  const grad = c.createLinearGradient(-P.r * 1.7, 0, P.r * 1.7, 0);
  grad.addColorStop(0, "#ffd23f"); grad.addColorStop(0.5, "#ff9fcf"); grad.addColorStop(1, "#ffd23f");
  c.strokeStyle = grad;
  c.beginPath();
  if (back) c.ellipse(0, 0, P.r * 1.65, P.r * 0.32, 0, Math.PI, TAU);
  else c.ellipse(0, 0, P.r * 1.65, P.r * 0.32, 0, 0, Math.PI);
  c.stroke();
  c.restore();
}

function drawDecor(c, d, t) {
  const P = d.pl;
  const x = P.cx + d.dx;
  const y = surfaceY(P, x);
  const tilt = Math.asin(clamp(d.dx / P.r, -0.99, 0.99));
  c.save();
  c.translate(x, y + 2); c.rotate(tilt); c.scale(d.s, d.s);
  c.lineCap = "round"; c.lineJoin = "round";
  if (d.kind === "flower") {
    c.strokeStyle = "#35b36c"; c.lineWidth = 4;
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(3, -10, 0, -22); c.stroke();
    c.fillStyle = d.col;
    for (let k = 0; k < 5; k++) { const a = (k / 5) * TAU; c.beginPath(); c.arc(Math.cos(a) * 6, -24 + Math.sin(a) * 6, 5, 0, TAU); c.fill(); }
    c.fillStyle = d.col === "#ffd23f" ? "#ff6fb5" : "#ffd23f"; c.beginPath(); c.arc(0, -24, 4, 0, TAU); c.fill();
  } else if (d.kind === "mushroom") {
    c.fillStyle = "#fff4e0"; c.strokeStyle = "rgba(75,34,115,0.4)"; c.lineWidth = 2;
    c.beginPath(); c.roundRect ? c.roundRect(-4, -14, 8, 14, 3) : c.rect(-4, -14, 8, 14); c.fill(); c.stroke();
    c.fillStyle = d.col === "#ffffff" ? "#ff6fb5" : d.col;
    c.beginPath(); c.ellipse(0, -14, 13, 10, 0, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = "rgba(255,255,255,0.9)";
    c.beginPath(); c.arc(-5, -18, 2.3, 0, TAU); c.arc(4, -20, 2.6, 0, TAU); c.arc(7, -15, 1.8, 0, TAU); c.fill();
  } else { // klubba
    c.strokeStyle = "#fff4e0"; c.lineWidth = 4;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -22); c.stroke();
    c.fillStyle = d.col; c.strokeStyle = "rgba(75,34,115,0.45)"; c.lineWidth = 2.5;
    c.beginPath(); c.arc(0, -30, 11, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 2.6;
    c.beginPath(); c.arc(0, -30, 3.5, 0, TAU * 0.85); c.arc(0, -30, 7.5, 0, TAU * 0.85); c.stroke();
  }
  c.restore();
}

function drawTree(c, T) {
  const cp = T.platform;
  const topY = cp.cy;
  c.save();
  c.lineCap = "round"; c.lineJoin = "round";
  if (T.cone) {
    // glasstrad: vaffelstrut + kula
    c.fillStyle = "#f1b265"; c.strokeStyle = "#8a4e1c"; c.lineWidth = 3;
    c.beginPath(); c.moveTo(T.x - 30, topY + 14); c.lineTo(T.x + 30, topY + 14); c.lineTo(T.x, T.baseY + 3); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = "rgba(138,78,28,0.5)"; c.lineWidth = 2;
    for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(T.x + k * 11, topY + 16); c.lineTo(T.x + k * 3, T.baseY - 6 - Math.abs(k) * 8); c.stroke(); }
  } else {
    c.strokeStyle = "#5d3820"; c.lineWidth = 26;
    c.beginPath(); c.moveTo(T.x, T.baseY + 4); c.lineTo(T.x, topY + 18); c.stroke();
    c.strokeStyle = "#a8683a"; c.lineWidth = 19;
    c.beginPath(); c.moveTo(T.x, T.baseY + 4); c.lineTo(T.x, topY + 18); c.stroke();
    c.strokeStyle = "rgba(255,255,255,0.25)"; c.lineWidth = 5;
    c.beginPath(); c.moveTo(T.x - 5, T.baseY - 6); c.lineTo(T.x - 5, topY + 24); c.stroke();
  }
  // krona: plattformens yta ligger exakt i toppen
  const line = T.cone ? "rgba(160,44,120,0.55)" : "rgba(75,34,115,0.45)";
  c.fillStyle = T.color; c.strokeStyle = line; c.lineWidth = 3;
  const puffs = [[-0.62, 0.45, 0.78], [0.62, 0.45, 0.78], [-0.3, 0.1, 0.95], [0.3, 0.1, 0.95], [0, 0, 1]];
  c.beginPath();
  for (const [px, py, pr] of puffs) { c.moveTo(T.x + px * cp.rx + pr * 36, topY + py * 32 + 32 * 0.9); c.arc(T.x + px * cp.rx, topY + py * 32 + 32 * 0.9, pr * 36, 0, TAU); }
  c.fill(); c.stroke();
  // fyll för att dölja inre linjer
  c.beginPath();
  for (const [px, py, pr] of puffs) { c.moveTo(T.x + px * cp.rx + pr * 33, topY + py * 32 + 32 * 0.9); c.arc(T.x + px * cp.rx, topY + py * 32 + 32 * 0.9, pr * 33, 0, TAU); }
  c.fill();
  // ljuspunkter
  c.fillStyle = "rgba(255,255,255,0.45)";
  c.beginPath(); c.ellipse(T.x - cp.rx * 0.35, topY + 8, 16, 7, -0.3, 0, TAU); c.fill();
  c.fillStyle = "rgba(255,255,255,0.9)";
  const dots = T.cone ? ["#ff6fb5", "#ffd23f", "#8a4fff", "#ffffff"] : ["#ffffff", "#ffd23f", "#ffffff"];
  for (let k = 0; k < 6; k++) { c.fillStyle = dots[k % dots.length]; c.beginPath(); c.arc(T.x - cp.rx * 0.6 + k * (cp.rx * 0.24), topY + 24 + (k % 2) * 12, 3.4, 0, TAU); c.fill(); }
  c.restore();
}

function drawIceItem(c, x, y, flavor, s) {
  c.save();
  c.translate(x, y); c.scale(s, s);
  c.lineJoin = "round"; c.lineCap = "round";
  c.fillStyle = "#f1b265"; c.strokeStyle = "#8a4e1c"; c.lineWidth = 2.6;
  c.beginPath(); c.moveTo(-9, 0); c.lineTo(9, 0); c.lineTo(0, 22); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = FLAVORS[flavor]; c.strokeStyle = "rgba(160,44,120,0.7)";
  c.beginPath(); c.arc(0, -7, 12, 0, TAU); c.fill(); c.stroke();
  c.fillStyle = "rgba(255,255,255,0.7)"; c.beginPath(); c.arc(-4, -11, 3.5, 0, TAU); c.fill();
  c.restore();
}

function drawStarItem(c, x, y, s) {
  c.save();
  c.translate(x, y); c.scale(s, s);
  c.lineJoin = "round";
  starPath(c, 0, 0, 17);
  c.fillStyle = "#ffd23f"; c.fill();
  c.lineWidth = 3; c.strokeStyle = "#d98900"; c.stroke();
  c.fillStyle = "rgba(255,255,255,0.7)"; c.beginPath(); c.arc(-3, -4, 3, 0, TAU); c.fill();
  c.restore();
}

function drawGoal(c, t) {
  const { x, y } = goal;
  // glöd
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  const g = c.createRadialGradient(x, y - 110, 10, x, y - 110, 180);
  g.addColorStop(0, `rgba(255,255,255,${0.55 + 0.2 * pulse})`); g.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = g; c.beginPath(); c.arc(x, y - 110, 180, 0, TAU); c.fill();

  c.save();
  c.translate(x, y); c.lineJoin = "round"; c.lineCap = "round";
  // sockel
  c.fillStyle = "#ffd23f"; c.strokeStyle = "#b06a00"; c.lineWidth = 4;
  c.beginPath(); c.ellipse(0, -6, 62, 14, 0, 0, TAU); c.fill(); c.stroke();
  c.fillStyle = "#ff9fcf"; c.strokeStyle = "#b83d84";
  c.beginPath(); c.ellipse(0, -16, 46, 11, 0, 0, TAU); c.fill(); c.stroke();
  // strut (spets nedåt)
  c.fillStyle = "#f1b265"; c.strokeStyle = "#8a4e1c"; c.lineWidth = 4;
  c.beginPath(); c.moveTo(-40, -92); c.lineTo(40, -92); c.lineTo(0, -20); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = "rgba(138,78,28,0.5)"; c.lineWidth = 2.5;
  for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(k * 11, -90); c.lineTo(k * 3, -26 - Math.abs(k) * 4); c.stroke(); }
  // kulor
  const scoops = [["#ff8fc7", 0, -112, 40], ["#8ff0c0", 0, -158, 34], ["#fff2a8", 0, -196, 28]];
  for (const [col, sx, sy, sr] of scoops) {
    c.fillStyle = col; c.strokeStyle = "rgba(160,44,120,0.7)"; c.lineWidth = 4;
    c.beginPath(); c.arc(sx, sy, sr, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = "rgba(255,255,255,0.65)"; c.beginPath(); c.arc(sx - sr * 0.35, sy - sr * 0.35, sr * 0.22, 0, TAU); c.fill();
  }
  // körsbär
  c.fillStyle = "#ff3d5e"; c.strokeStyle = "#a02c3c"; c.beginPath(); c.arc(0, -232, 12, 0, TAU); c.fill(); c.stroke();
  c.strokeStyle = "#35b36c"; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -243); c.quadraticCurveTo(10, -258, 22, -254); c.stroke();
  c.restore();
  for (let k = 0; k < 5; k++) {
    const a = t * 1.3 + (k / 5) * TAU;
    sparkle(c, x + Math.cos(a) * 80, y - 130 + Math.sin(a * 1.4) * 80, 6 + 4 * Math.sin(t * 5 + k), k % 2 ? "#fff" : "#ffd23f");
  }
}

/* ---------- djuren ---------- */

const OUT = "#4a2660";
function ell(c, x, y, rx, ry, fill, rot = 0, line = true) {
  c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU);
  c.fillStyle = fill; c.fill();
  if (line) { c.lineWidth = 3; c.strokeStyle = OUT; c.stroke(); }
}
function limb(c, x0, y0, x1, y1, w, col) {
  c.lineCap = "round";
  c.strokeStyle = OUT; c.lineWidth = w + 5;
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  c.strokeStyle = col; c.lineWidth = w;
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
}
function eye(c, x, y, blink, r = 4.2) {
  if (blink) { c.strokeStyle = OUT; c.lineWidth = 2.6; c.lineCap = "round"; c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r, y); c.stroke(); return; }
  c.fillStyle = "#2b1538"; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  c.fillStyle = "#fff"; c.beginPath(); c.arc(x + r * 0.35, y - r * 0.4, r * 0.4, 0, TAU); c.fill();
}

/** Ritar ett djur som tittar åt höger med fötterna i (0,0). st: {t, run 0..1, air, vy, blink} */
function drawAnimal(c, kind, st) {
  c.save();
  c.lineJoin = "round"; c.lineCap = "round";
  const ph = st.t * (9 + 9 * st.run);
  const bob = st.air ? 0 : -Math.abs(Math.sin(ph)) * 5 * st.run + Math.sin(st.t * 3) * 1.4 - 1.4;
  const rising = st.air && st.vy < 0;

  const legPos = (lx, phase) => {
    if (st.air) return [lx + (lx > 0 ? 11 : -11), rising ? -9 : -3];
    const sw = Math.sin(ph + phase), k = 0.3 + 0.7 * st.run;
    return [lx + sw * 14 * k, -3 - Math.max(0, Math.cos(ph + phase)) * 9 * st.run];
  };
  const body = { rabbit: "#d6b8ff", hedgehog: "#f2c9a0", bear: "#b9763f" }[kind];
  const dark = { rabbit: "#b894f0", hedgehog: "#d9a77a", bear: "#9a5f2f" }[kind];
  const legY = -20 + bob;

  const drawLegs = (far) => {
    const spec = far ? [[-10, Math.PI + 0.6], [34, 0.6]] : [[-24, Math.PI], [22, 0]];
    for (const [lx, phase] of spec) {
      const [fx, fy] = legPos(lx, phase);
      limb(c, lx, legY, fx, fy, 12, far ? dark : body);
    }
  };

  if (kind === "rabbit") {
    const earSwing = st.air ? (rising ? -0.15 : -0.45) : Math.sin(ph) * 0.12 * st.run;
    // öron bakom huvudet
    for (const [ex, er] of [[18, -0.22], [34, 0.08]]) {
      c.save(); c.translate(ex, -84 + bob); c.rotate(er + earSwing);
      ell(c, 0, -22, 9, 26, body); ell(c, 0, -21, 4.5, 18, "#ffa6d2", 0, false);
      c.restore();
    }
    drawLegs(true);
    ell(c, -37, -44 + bob, 11, 11, "#fff"); // svans
    ell(c, 0, -42 + bob, 38, 28, body);
    ell(c, 8, -34 + bob, 24, 17, "#fff", 0, false);
    drawLegs(false);
    ell(c, 30, -66 + bob, 25, 23, body);
    ell(c, 44, -58 + bob, 12, 9, "#fff", 0, false);
    ell(c, 51, -62 + bob, 4.5, 3.5, "#ff7eb8", 0, false);
    c.fillStyle = "#fff"; c.strokeStyle = OUT; c.lineWidth = 2;
    c.beginPath(); c.rect(45, -53 + bob, 6, 7); c.fill(); c.stroke();
    eye(c, 37, -72 + bob, st.blink);
    c.fillStyle = "rgba(255,110,170,0.55)"; c.beginPath(); c.arc(31, -60 + bob, 5, 0, TAU); c.fill();
  } else if (kind === "hedgehog") {
    drawLegs(true);
    // taggar
    const cx0 = -6, cy0 = -42 + bob;
    c.fillStyle = "#7a4528"; c.strokeStyle = OUT; c.lineWidth = 2.5;
    c.beginPath();
    const N = 17;
    for (let i = 0; i <= N; i++) {
      const a = Math.PI * 0.82 + (i / N) * Math.PI * 1.3;
      const rr = 40 + (i % 2 ? 15 : 0);
      c.lineTo(cx0 + Math.cos(a) * rr * 1.08, cy0 + Math.sin(a) * rr * 0.85);
    }
    c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = "#b9763f"; c.lineWidth = 2.4;
    for (let i = 1; i < N; i += 2) {
      const a = Math.PI * 0.82 + (i / N) * Math.PI * 1.3;
      c.beginPath(); c.moveTo(cx0 + Math.cos(a) * 30, cy0 + Math.sin(a) * 25); c.lineTo(cx0 + Math.cos(a) * 52, cy0 + Math.sin(a) * 43); c.stroke();
    }
    ell(c, 2, -32 + bob, 31, 20, body);
    drawLegs(false);
    ell(c, 34, -40 + bob, 21, 18, body); // huvud
    ell(c, 52, -36 + bob, 15, 10, "#f7d9b8"); // nos
    ell(c, 64, -37 + bob, 4.6, 4, "#2b1538", 0, false);
    ell(c, 22, -56 + bob, 8, 8, body); ell(c, 22, -56 + bob, 4, 4, "#ffa6d2", 0, false);
    eye(c, 40, -46 + bob, st.blink);
    c.fillStyle = "rgba(255,110,170,0.55)"; c.beginPath(); c.arc(36, -35 + bob, 5, 0, TAU); c.fill();
  } else { // bear
    drawLegs(true);
    ell(c, -39, -44 + bob, 9, 9, dark); // svans
    ell(c, 0, -44 + bob, 39, 31, body);
    ell(c, 6, -36 + bob, 25, 19, "#e8b985", 0, false);
    drawLegs(false);
    ell(c, 15, -92 + bob, 10, 10, body); ell(c, 15, -92 + bob, 5, 5, "#e8b985", 0, false);
    ell(c, 44, -94 + bob, 10, 10, body); ell(c, 44, -94 + bob, 5, 5, "#e8b985", 0, false);
    ell(c, 30, -70 + bob, 28, 26, "#c4844b");
    ell(c, 44, -62 + bob, 14, 11, "#f0cfa0", 0, false);
    ell(c, 50, -67 + bob, 5.5, 4, "#2b1538", 0, false);
    eye(c, 36, -76 + bob, st.blink);
    c.strokeStyle = OUT; c.lineWidth = 2; c.beginPath(); c.arc(46, -62 + bob, 5, 0.2, Math.PI - 0.2); c.stroke();
    c.fillStyle = "rgba(255,110,170,0.55)"; c.beginPath(); c.arc(28, -62 + bob, 5, 0, TAU); c.fill();
  }
  c.restore();
}

/* =====================================================================
   PARTIKLAR OCH TEXT
   ===================================================================== */

const parts = [];
const floaters = [];
function burst(x, y, n, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU, sp = (o.speed || 200) * (0.4 + Math.random() * 0.8);
    parts.push({
      x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (o.up || 0), g: o.g ?? 500,
      life: o.life || 0.7, max: o.life || 0.7, size: (o.size || 6) * (0.6 + Math.random() * 0.8),
      color: o.colors ? o.colors[Math.floor(Math.random() * o.colors.length)] : "#fff", shape: o.shape || "dot", rot: Math.random() * TAU,
    });
  }
}
const CONFETTI = ["#ff6fb5", "#ffd23f", "#8a4fff", "#7be0a8", "#ff9d6e", "#5ccfee", "#ffffff"];

function updateParts(dt) {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0) { parts.splice(i, 1); continue; }
    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 6;
  }
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.life -= dt; f.y -= 40 * dt;
    if (f.life <= 0) floaters.splice(i, 1);
  }
}
function drawParts(c) {
  for (const p of parts) {
    c.globalAlpha = clamp(p.life / p.max * 1.6, 0, 1);
    c.fillStyle = p.color;
    if (p.shape === "star") sparkle(c, p.x, p.y, p.size * 1.6, p.color);
    else if (p.shape === "conf") { c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size); c.restore(); }
    else { c.beginPath(); c.arc(p.x, p.y, p.size, 0, TAU); c.fill(); }
  }
  c.globalAlpha = 1;
  c.font = "900 30px ui-rounded, 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif";
  c.textAlign = "center"; c.lineJoin = "round";
  for (const f of floaters) {
    c.globalAlpha = clamp(f.life * 2, 0, 1);
    c.lineWidth = 7; c.strokeStyle = "#fff"; c.strokeText(f.text, f.x, f.y);
    c.fillStyle = "#8a4fff"; c.fillText(f.text, f.x, f.y);
  }
  c.globalAlpha = 1;
}

/* =====================================================================
   SPELLOGIK
   ===================================================================== */

const ANIMALS = [
  { id: "rabbit", label: "Kaninen" },
  { id: "hedgehog", label: "Igelkotten" },
  { id: "bear", label: "Björnen" },
];

const state = { mode: "menu", animal: null, name: "", count: 0, won: false, winTimer: 0, combo: 0, comboT: 0, t: 0 };
let P = makePlayer();

const kb = { left: false, right: false, run: false };
const touch = { left: false, right: false, turbo: false };
let jumpEdge = false;

function resetWorld() {
  P = makePlayer();
  buildItems();
  parts.length = 0; floaters.length = 0;
  state.count = 0; state.won = false; state.winTimer = 0; state.combo = 0;
  cam.x = P.x + 60; cam.y = P.y - 40;
  setCount(0, false);
}

const countEl = $("#count");
function setCount(n, bump) {
  state.count = n;
  countEl.textContent = n;
  if (bump) { const el = $("#score"); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
}

let bufferedEvents = [];
function update(dt) {
  state.t += dt;
  const inp = { left: kb.left || touch.left, right: kb.right || touch.right, run: kb.run || touch.turbo, jump: jumpEdge };
  jumpEdge = false;
  const ev = [];
  // flera små steg ger stabil fysik även om bildrutan dröjer
  const n = Math.max(1, Math.ceil(dt / (1 / 90)));
  for (let i = 0; i < n; i++) { stepPlayer(P, inp, dt / n, ev); inp.jump = false; }
  P.t += dt;
  P.blink = (P.t % 3.4) > 3.28 ? 1 : 0;

  for (const e of ev) {
    if (e === "jump") { SFX.jump(); burst(P.x, P.y, 5, { colors: ["#fff", "#ffe9a8"], speed: 90, life: 0.4, size: 4, g: 200 }); }
    else if (e === "air") { SFX.air(); burst(P.x, P.y - 30, 10, { colors: CONFETTI, shape: "star", speed: 160, life: 0.5, size: 4, g: 100 }); }
    else if (e === "land") {
      if (P.lastFall > 400) SFX.land();
      burst(P.x, P.y, 6, { colors: ["#fff", "#ffe9a8"], speed: 100, life: 0.4, size: 4, g: 150, up: 40 });
    }
  }
  const moving = P.ground && Math.abs(P.vx) > 60;
  if (moving && Math.abs(P.vx) > WALK * 1.3 && Math.random() < dt * 22) {
    burst(P.x - P.face * 20, P.y - 4, 1, { colors: ["#fff"], speed: 40, life: 0.35, size: 6, g: -30 });
  }

  // samla
  state.comboT -= dt;
  if (state.comboT <= 0) state.combo = 0;
  const cx = P.x, cy = P.y - 46;
  for (const it of items) {
    if (it.got) continue;
    if (Math.abs(it.x - cx) < 52 && Math.abs(it.y - cy) < 62 && Math.hypot(it.x - cx, it.y - cy) < 60) {
      it.got = true;
      setCount(state.count + 1, true);
      SFX.item(state.combo); state.combo++; state.comboT = 1.6;
      burst(it.x, it.y, 10, { colors: it.kind === "star" ? ["#ffd23f", "#fff"] : CONFETTI, shape: "star", speed: 180, life: 0.6, size: 4.5, g: 120 });
    }
  }

  // föll i rymden: mjuk studs tillbaka
  if (P.y > DEATH_Y) {
    P.x = P.safe.x; P.y = P.safe.y - 4; P.vx = 0; P.vy = -420; P.ground = null; P.airJumps = 1; P.sq = -0.4;
    SFX.pop();
    burst(P.x, P.y - 40, 22, { colors: CONFETTI, shape: "star", speed: 260, life: 0.8, size: 5, g: 160 });
    floaters.push({ x: P.x, y: P.y - 120, text: "Hoppsan!", life: 1.3 });
  }

  // mål
  if (!state.won && Math.abs(P.x - goal.x) < 95 && Math.abs(P.y - goal.y) < 170) {
    state.won = true; state.winTimer = 1.3;
    SFX.win();
    for (let k = 0; k < 3; k++) burst(goal.x, goal.y - 230, 40, { colors: CONFETTI, shape: "conf", speed: 520, life: 2.6, size: 6, g: 420, up: 380 });
  }
  if (state.winTimer > 0) {
    state.winTimer -= dt;
    if (Math.random() < dt * 30) burst(goal.x + (Math.random() - 0.5) * 500, goal.y - 380, 3, { colors: CONFETTI, shape: "conf", speed: 80, life: 2.2, size: 6, g: 260 });
    if (state.winTimer <= 0) showWin();
  }

  updateParts(dt);

  // kamera
  const tx = P.x + P.face * 70 + P.vx * 0.12;
  const ty = Math.min(P.y - 30, 400);
  cam.x += (tx - cam.x) * (1 - Math.exp(-5 * dt));
  cam.y += (ty - cam.y) * (1 - Math.exp(-4 * dt));
}

/* =====================================================================
   RENDER
   ===================================================================== */

function render(t) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawSky(t);

  ctx.save();
  ctx.translate(W / 2, H * 0.62);
  ctx.scale(S, S);
  ctx.translate(-cam.x, -cam.y);
  const halfW = W / 2 / S + 300;
  const vis = (x, r) => Math.abs(x - cam.x) < halfW + r;

  for (const pl of planets) if (vis(pl.cx, pl.r * 1.7)) drawPlanet(ctx, pl, t);
  for (const d of decor) if (vis(d.pl.cx + d.dx, 40)) drawDecor(ctx, d, t);
  for (const tr of trees) if (vis(tr.x, 130)) drawTree(ctx, tr);
  if (vis(goal.x, 200)) drawGoal(ctx, t);

  for (const it of items) {
    if (it.got || !vis(it.x, 40)) continue;
    const bob = Math.sin(t * 3 + it.ph) * 5;
    if (it.kind === "star") drawStarItem(ctx, it.x, it.y + bob, 1 + 0.08 * Math.sin(t * 5 + it.ph));
    else drawIceItem(ctx, it.x, it.y + bob - 10, it.flavor, 1);
  }

  if (state.mode === "play") drawPlayer(ctx, t);
  drawParts(ctx);
  ctx.restore();

  if (state.mode === "play" && !state.won) drawHintArrow(t);
}

function drawPlayer(c, t) {
  const p = P;
  // skugga på marken under
  const gy = groundBelow(p.x, p.y);
  if (gy !== null) {
    const h = clamp(1 - (gy - p.y) / 380, 0.25, 1);
    c.fillStyle = `rgba(75,34,115,${0.2 * h})`;
    c.beginPath(); c.ellipse(p.x, gy + 2, 34 * h, 7 * h, 0, 0, TAU); c.fill();
  }
  const run = clamp(Math.abs(p.vx) / RUN, 0, 1) * (Math.abs(p.vx) > 20 ? 1 : 0);
  const turbo = Math.abs(p.vx) > WALK * 1.3;
  if (turbo) {
    c.strokeStyle = "rgba(255,255,255,0.7)"; c.lineWidth = 5; c.lineCap = "round";
    for (let k = 0; k < 3; k++) {
      const yy = p.y - 25 - k * 24, xx = p.x - p.face * (50 + k * 8);
      c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx - p.face * (30 + 10 * Math.sin(t * 30 + k)), yy); c.stroke();
    }
  }
  c.save();
  c.translate(p.x, p.y);
  if (p.ground && p.ground.kind === "planet") c.rotate(Math.asin(clamp((p.x - p.ground.cx) / p.ground.r, -0.99, 0.99)));
  const sq = p.sq;
  c.scale(1 + sq * 0.28, 1 - sq * 0.28);
  c.scale(p.face, 1);
  drawAnimal(c, state.animal, { t: P.t, run, air: !p.ground, vy: p.vy, blink: P.blink });
  c.restore();
}

function drawHintArrow(t) {
  const gx = W / 2 + (goal.x - cam.x) * S;
  if (gx < W + 60 && gx > -60) return; // målet syns redan
  const dirRight = gx > W / 2;
  const x = dirRight ? W - 54 : 54;
  const y = H * 0.42 + Math.sin(t * 4) * 6;
  ctx.save();
  ctx.translate(x, y);
  if (!dirRight) ctx.scale(-1, 1);
  const s = 1 + 0.06 * Math.sin(t * 4);
  ctx.scale(s, s);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.beginPath(); ctx.arc(0, 0, 38, 0, TAU); ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = "#ff6fb5"; ctx.stroke();
  ctx.save(); ctx.scale(0.8, 0.8); ctx.translate(-4, 0); drawIceItem(ctx, 0, -8, 0, 1); ctx.restore();
  ctx.fillStyle = "#ff6fb5";
  ctx.beginPath(); ctx.moveTo(22, -9); ctx.lineTo(36, 0); ctx.lineTo(22, 9); ctx.closePath(); ctx.fill();
  ctx.restore();
}

/* =====================================================================
   MENY, HUD OCH STYRNING
   ===================================================================== */

const store = {
  get() { try { return JSON.parse(localStorage.getItem("planetspelet") || "{}"); } catch (e) { return {}; } },
  set(o) { try { localStorage.setItem("planetspelet", JSON.stringify(Object.assign(store.get(), o))); } catch (e) { /* ok */ } },
};

const iceSvg = (col) => `<svg viewBox="0 0 32 40" width="1em" height="1.25em"><path d="M7 19 L16 38 L25 19Z" fill="#f1b265" stroke="#8a4e1c" stroke-width="2.4" stroke-linejoin="round"/><circle cx="16" cy="13" r="11" fill="${col}" stroke="#a02c78" stroke-width="2.4"/><circle cx="12" cy="9" r="3" fill="#fff" opacity=".7"/></svg>`;
$("#scoreIcon").innerHTML = iceSvg("#ff8fc7");
$("#winIcon").innerHTML = iceSvg("#ff8fc7");
const speakerOn = '<svg viewBox="0 0 24 24"><path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M16 9 Q18.5 12 16 15"/><path d="M19 6.5 Q23 12 19 17.5"/></svg>';
const speakerOff = '<svg viewBox="0 0 24 24"><path d="M4 9 H8 L13 5 V19 L8 15 H4 Z"/><path d="M17 9 L22 15 M22 9 L17 15"/></svg>';
const houseIcon = '<svg viewBox="0 0 24 24"><path d="M3 12 L12 4 L21 12"/><path d="M6 10.5 V20 H18 V10.5"/><path d="M10 20 V14 H14 V20"/></svg>';
$("#home").innerHTML = houseIcon;
function paintMute() { $("#mute").innerHTML = muted ? speakerOff : speakerOn; }

// djurkort med levande förhandsvisning
const previews = [];
ANIMALS.forEach((a) => {
  const b = document.createElement("button");
  b.className = "animal"; b.dataset.animal = a.id; b.setAttribute("aria-label", a.label);
  const cv = document.createElement("canvas"); cv.width = 240; cv.height = 240;
  const sp = document.createElement("span"); sp.textContent = a.label;
  b.append(cv, sp);
  $("#animals").append(b);
  previews.push({ id: a.id, ctx: cv.getContext("2d"), el: b });
  b.addEventListener("click", () => { unlockAudio(); chooseAnimal(a.id); });
});

function chooseAnimal(id) {
  state.animal = id;
  store.set({ animal: id });
  previews.forEach((p) => p.el.classList.toggle("on", p.id === id));
  paintPlay();
}
function chooseName(n) {
  state.name = n;
  store.set({ name: n });
  document.querySelectorAll("#names .pill").forEach((b) => {
    const known = b.dataset.name !== "*";
    b.classList.toggle("on", known ? b.dataset.name === n : !["Hedvig", "Elsie", ""].includes(n));
  });
}
function paintPlay() {
  const ok = !!state.animal;
  $("#play").disabled = !ok;
  $("#playLabel").textContent = ok ? "SPELA!" : "Välj ett djur!";
}

document.querySelectorAll("#names .pill").forEach((b) => {
  b.addEventListener("click", () => {
    unlockAudio();
    const inp = $("#nameInput");
    if (b.dataset.name === "*") { inp.hidden = false; inp.focus(); chooseName(inp.value.trim()); }
    else { inp.hidden = true; chooseName(b.dataset.name); }
  });
});
$("#nameInput").addEventListener("input", (e) => chooseName(e.target.value.trim()));
$("#nameInput").addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") e.target.blur(); });

function drawPreviews(t) {
  for (const p of previews) {
    const c = p.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, 240, 240);
    const on = state.animal === p.id;
    const hop = on ? Math.abs(Math.sin(t * 5)) * 16 : 0;
    c.setTransform(1.6, 0, 0, 1.6, 120 - 52 * 1.6 * 0.5 - 8, 210 - hop);
    drawAnimal(c, p.id, { t, run: on ? 0.6 : 0, air: false, vy: 0, blink: (t % 3.4) > 3.28 });
  }
}

function setMode(m) {
  state.mode = m;
  $("#start").hidden = m !== "menu";
  $("#hud").hidden = m !== "play";
  $("#touch").hidden = m !== "play";
  $("#kbdHint").hidden = m !== "play";
  if (m !== "play") $("#win").hidden = true;
}

function startGame() {
  if (!state.animal) return;
  unlockAudio();
  kb.left = kb.right = kb.run = false; touch.left = touch.right = false; touch.turbo = false;
  $("#runBtn").classList.remove("on");
  resetWorld();
  $("#who").textContent = state.name || ANIMALS.find((a) => a.id === state.animal).label;
  setMode("play");
  setTimeout(() => { $("#kbdHint").style.opacity = 0; }, 9000);
  $("#kbdHint").style.opacity = 1;
}

function showWin() {
  $("#winTitle").textContent = state.name ? `Grattis ${state.name}!` : "Grattis!";
  $("#winCount").textContent = state.count;
  $("#win").hidden = false;
}

$("#play").addEventListener("click", startGame);
$("#home").addEventListener("click", () => { setMode("menu"); });
$("#mute").addEventListener("click", () => { muted = !muted; store.set({ muted }); paintMute(); unlockAudio(); });
$("#keepGoing").addEventListener("click", () => { $("#win").hidden = true; });
$("#again").addEventListener("click", () => { $("#win").hidden = true; resetWorld(); });
$("#otherAnimal").addEventListener("click", () => { setMode("menu"); });

/* ---------- tangentbord ---------- */
const KEYMAP = {
  ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
  ShiftLeft: "run", ShiftRight: "run",
};
window.addEventListener("keydown", (e) => {
  unlockAudio();
  if (e.target && e.target.tagName === "INPUT") return;
  if (state.mode !== "play") {
    if ((e.code === "Enter" || e.code === "Space") && state.mode === "menu" && state.animal) { e.preventDefault(); startGame(); }
    return;
  }
  const k = KEYMAP[e.code];
  if (k) { kb[k] = true; e.preventDefault(); }
  else if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") { if (!e.repeat) jumpEdge = true; e.preventDefault(); }
});
window.addEventListener("keyup", (e) => { const k = KEYMAP[e.code]; if (k) kb[k] = false; });
window.addEventListener("blur", () => { kb.left = kb.right = kb.run = false; touch.left = touch.right = false; });

/* ---------- touch ---------- */
function showTouch() { document.body.classList.add("touch"); }
if ((window.matchMedia && window.matchMedia("(pointer: coarse)").matches) || navigator.maxTouchPoints > 0) showTouch();
window.addEventListener("pointerdown", (e) => { unlockAudio(); if (e.pointerType === "touch") showTouch(); }, true);
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("gesturestart", (e) => e.preventDefault());

const dpad = $("#dpad");
const dirs = new Map();
const arrowEls = { left: dpad.querySelector('[data-dir="left"]'), right: dpad.querySelector('[data-dir="right"]') };
function syncDirs() {
  const v = [...dirs.values()];
  touch.left = v.includes("left"); touch.right = v.includes("right");
  arrowEls.left.classList.toggle("pressed", touch.left);
  arrowEls.right.classList.toggle("pressed", touch.right);
}
function dpadMove(e) {
  const r = dpad.getBoundingClientRect();
  dirs.set(e.pointerId, e.clientX < r.left + r.width / 2 ? "left" : "right");
  syncDirs();
}
dpad.addEventListener("pointerdown", (e) => { try { dpad.setPointerCapture(e.pointerId); } catch (x) { /* ok */ } dpadMove(e); e.preventDefault(); });
dpad.addEventListener("pointermove", (e) => { if (dirs.has(e.pointerId)) dpadMove(e); });
const dpadUp = (e) => { dirs.delete(e.pointerId); syncDirs(); };
["pointerup", "pointercancel", "lostpointercapture"].forEach((ev) => dpad.addEventListener(ev, dpadUp));

const jumpBtn = $("#jumpBtn"), runBtn = $("#runBtn");
jumpBtn.addEventListener("pointerdown", (e) => { jumpEdge = true; jumpBtn.classList.add("pressed"); e.preventDefault(); });
["pointerup", "pointercancel", "pointerleave"].forEach((ev) => jumpBtn.addEventListener(ev, () => jumpBtn.classList.remove("pressed")));
runBtn.addEventListener("pointerdown", (e) => { touch.turbo = !touch.turbo; runBtn.classList.toggle("on", touch.turbo); runBtn.classList.add("pressed"); e.preventDefault(); });
["pointerup", "pointercancel", "pointerleave"].forEach((ev) => runBtn.addEventListener(ev, () => runBtn.classList.remove("pressed")));

/* ---------- huvudloop ---------- */
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  const t = now / 1000;
  if (state.mode === "play") update(dt);
  else {
    // bakgrund bakom menyn: långsam kamerapanorering
    cam.x = 700 + Math.sin(t * 0.18) * 520; cam.y = 20;
    updateParts(dt);
    drawPreviews(t);
  }
  render(t);
  requestAnimationFrame(frame);
}

// startvärden från förra gången
(function init() {
  const s = store.get();
  muted = !!s.muted;
  paintMute();
  if (s.animal && ANIMALS.some((a) => a.id === s.animal)) chooseAnimal(s.animal);
  else paintPlay();
  const n = typeof s.name === "string" ? s.name : "";
  if (n && !["Hedvig", "Elsie"].includes(n)) { $("#nameInput").hidden = false; $("#nameInput").value = n; }
  chooseName(n);
  setMode("menu");
  requestAnimationFrame(frame);
})();

// test- och felsökningshook
window.__planet = { stepPlayer, makePlayer, platforms, planets, trees, goal, state, get P() { return P; }, items: () => items, constants: { WALK, RUN, DEATH_Y }, startGame, chooseAnimal };
})();
