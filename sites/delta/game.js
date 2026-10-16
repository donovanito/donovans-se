(() => {
"use strict";

/* =====================================================================
   Delta Roadster - sandlåda för en roadster som kan köra, köra upp och
   ner (gravitationsflipp, tak-körning) och flyga (thrusters).
   Sidovy, liggande läge. Inga poäng, ingen förlust - bara lek.
   ===================================================================== */

const TAU = Math.PI * 2;
const $ = (s) => document.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
const rnd = (a, b) => a + Math.random() * (b - a);
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

/* ---------- fysik (lätt att ändra) ---------- */
const G = 2200;          // gravitation
const ACC = 950;         // acceleration på marken
const VMAX = 900;        // toppfart, normalt
const VBOOST = 1750;     // toppfart med boost
const VREV = 420;        // max backfart
const THR = 1.5 * G;     // thrusterkraft (längs takriktningen)
const H0 = 20;           // axelhöjd över ytan
const HEADROOM = 36;     // takets avstånd till motsatt yta

/* ---------- världen ---------- */
const CEIL = -520;       // taknivå
const VIEW_H = 620;      // synlig höjd i världsenheter
const CAM_Y = -245;      // fast kameranivå

const smooth = (t) => t * t * (3 - 2 * t);
// ramp: kurvad stigning, sedan ett brant fall - bra att hoppa från
function kicker(x, period, offset, rise, len) {
  const u = (((x - offset) % period) + period) % period;
  if (u < len) { const k = u / len; return rise * k * (0.55 + 0.45 * k); }
  if (u < len + 90) return rise * (1 - smooth((u - len) / 90));
  return 0;
}
const floorY = (x) => -(22 * Math.sin(x / 310) + 14 * Math.sin(x / 131 + 2) + 30 * Math.sin(x / 1100) + kicker(x, 2700, 1500, 95, 270));
const ceilY = (x) => CEIL + 14 * Math.sin(x / 270 + 1) + 10 * Math.sin(x / 117) + 20 * Math.sin(x / 900) + kicker(x, 3300, 2500, 95, 270);
const slopeOf = (fn, x) => (fn(x + 3) - fn(x - 3)) / 6;

/* =====================================================================
   SPARAT
   ===================================================================== */
const KEY = "delta-roadster-v1";
const PAINT = ["#e82127", "#f2f4f8", "#232b3b", "#2f7bff"];
let save = { top: 0, air: 0, flips: 0, color: 0, muted: false };
try { Object.assign(save, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
const store = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) {} };

/* =====================================================================
   BILEN
   ===================================================================== */
const car = {
  x: 0, y: floorY(0) - H0,
  vx: 0, vy: 0,
  s: 1,            // gravitationsriktning: 1 = golv, -1 = tak
  grounded: true,
  a: 0,            // lutning (roof lutar mot +x när a > 0)
  face: 1,         // körriktning
  faceVis: 1, sVis: 1,
  wheel: 0,
  vt: 0,
  airT: 0,
  flipCd: 0,
  flying: false,
};

const inp = { left: false, right: false, fly: false, boost: false, flipQ: false };

/* =====================================================================
   LJUD (WebAudio, startas vid första tryck)
   ===================================================================== */
let actx = null, master, motorG, motorO, whineO, whineG, thrG, thrF, noiseBuf;
function initAudio() {
  if (actx) { if (actx.state === "suspended") actx.resume(); return; }
  try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  master = actx.createGain();
  master.gain.value = save.muted ? 0 : 0.5;
  master.connect(actx.destination);

  noiseBuf = actx.createBuffer(1, actx.sampleRate * 2, actx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  motorO = actx.createOscillator(); motorO.type = "sawtooth";
  const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 380;
  motorG = actx.createGain(); motorG.gain.value = 0;
  motorO.connect(lp); lp.connect(motorG); motorG.connect(master); motorO.start();

  whineO = actx.createOscillator(); whineO.type = "sine";
  whineG = actx.createGain(); whineG.gain.value = 0;
  whineO.connect(whineG); whineG.connect(master); whineO.start();

  const src = actx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
  thrF = actx.createBiquadFilter(); thrF.type = "bandpass"; thrF.frequency.value = 900; thrF.Q.value = 0.7;
  thrG = actx.createGain(); thrG.gain.value = 0;
  src.connect(thrF); thrF.connect(thrG); thrG.connect(master); src.start();
}
function sfxNoise(freq0, freq1, dur, vol, type) {
  if (!actx) return;
  const src = actx.createBufferSource(); src.buffer = noiseBuf;
  const f = actx.createBiquadFilter(); f.type = type || "bandpass"; f.Q.value = 1.2;
  const g = actx.createGain();
  const t = actx.currentTime;
  f.frequency.setValueAtTime(freq0, t);
  f.frequency.exponentialRampToValueAtTime(freq1, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.25);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f); f.connect(g); g.connect(master); src.start(t, Math.random()); src.stop(t + dur + 0.05);
}
function sfxThump(vol) {
  if (!actx) return;
  const o = actx.createOscillator(); o.type = "sine";
  const g = actx.createGain(); const t = actx.currentTime;
  o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.25);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.35);
}
function audioFrame(spd, flying, boosting, grounded) {
  if (!actx) return;
  const t = actx.currentTime;
  const k = clamp(Math.abs(spd) / VBOOST, 0, 1);
  motorO.frequency.setTargetAtTime(55 + k * 150, t, 0.08);
  motorG.gain.setTargetAtTime(0.05 + k * 0.1, t, 0.1);
  whineO.frequency.setTargetAtTime(380 + k * 1700, t, 0.08);
  whineG.gain.setTargetAtTime(0.012 + k * 0.05, t, 0.1);
  const thr = flying ? 0.28 : boosting ? 0.2 : 0;
  thrG.gain.setTargetAtTime(thr, t, 0.07);
  thrF.frequency.setTargetAtTime(flying ? 700 : 1400, t, 0.1);
}
function setMuted(m) {
  save.muted = m; store();
  if (master) master.gain.value = m ? 0 : 0.5;
  $("#mute").innerHTML = m
    ? '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z M17 9l5 6 M22 9l-5 6"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z M16.5 8.5a5 5 0 0 1 0 7 M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
}

/* =====================================================================
   PARTIKLAR
   ===================================================================== */
const glow = {};
function makeGlow(name, rgb) {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, `rgba(${rgb},1)`);
  g.addColorStop(0.35, `rgba(${rgb},0.45)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  glow[name] = c;
}
makeGlow("cyan", "90,220,255");
makeGlow("white", "235,248,255");
makeGlow("orange", "255,150,50");
makeGlow("red", "255,59,74");
makeGlow("dust", "120,135,155");
makeGlow("spark", "255,225,160");

const parts = [];
function emit(x, y, vx, vy, life, size, sprite, grow, add) {
  if (parts.length > 650) parts.splice(0, 40);
  parts.push({ x, y, vx, vy, life, max: life, size, sprite, grow: grow || 0, add: add !== false });
}

/* =====================================================================
   STATE / HJÄLPARE
   ===================================================================== */
const canvas = $("#c");
const ctx = canvas.getContext("2d");
let W = 0, Hs = 0, DPR = 1, sc = 1, camX = 0;
let shake = 0;
let paused = true;
let started = false;
let time = 0;
let airStart = 0;

// körorienterade axlar: F = framåt, Y = mot hjulen (= -tak)
function axes(c) {
  const ca = Math.cos(c.a), sa = Math.sin(c.a);
  return {
    fx: c.face * ca, fy: c.face * c.s * sa,
    rx: sa, ry: -c.s * ca,         // takriktning (bort från hjulen)
  };
}
const toWorld = (c, ax, lx, ly) => ({ x: c.x + ax.fx * lx - ax.rx * ly, y: c.y + ax.fy * lx - ax.ry * ly });

function doFlip() {
  const c = car;
  if (c.flipCd > 0) return;
  c.flipCd = 0.45;
  c.s = -c.s;
  c.grounded = false;
  c.vy += c.s * 380;
  save.flips++;
  sfxNoise(500, 3200, 0.4, 0.5);
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * TAU;
    emit(c.x, c.y, Math.cos(a) * 420 + c.vx * 0.3, Math.sin(a) * 420 + c.vy * 0.3, 0.45, 26, "cyan", -20);
  }
}

function land(impact) {
  const c = car;
  if (impact > 320) {
    sfxThump(clamp(impact / 1400, 0.15, 0.7));
    shake = Math.max(shake, clamp(impact / 100, 3, 12));
    const ax = axes(c);
    const p = toWorld(c, ax, 0, 18);
    for (let i = 0; i < 14; i++) {
      emit(p.x, p.y, rnd(-260, 260) + c.vx * 0.2, rnd(220, 420) * -c.s * (Math.random() * 0.7 + 0.3) , rnd(0.4, 0.8), rnd(14, 28), "dust", 30, false);
    }
    for (let i = 0; i < 8; i++) emit(p.x, p.y, rnd(-300, 300), -c.s * rnd(120, 420), rnd(0.2, 0.45), rnd(6, 12), "spark", -10);
  }
  const t = (time - airStart);
  if (t > 0.6 && t > save.air) { save.air = +t.toFixed(1); }
}

/* =====================================================================
   UPPDATERING
   ===================================================================== */
function update(dt) {
  const c = car;
  time += dt;
  c.flipCd = Math.max(0, c.flipCd - dt);
  const inx = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
  const fly = inp.fly, boost = inp.boost;
  c.flying = fly;
  if (inp.flipQ) { inp.flipQ = false; doFlip(); }

  const fn = c.s > 0 ? floorY : ceilY;
  const other = c.s > 0 ? ceilY : floorY;
  const wasGrounded = c.grounded;

  if (c.grounded && !fly) {
    // ---- på marken (eller taket) ----
    const sl = slopeOf(fn, c.x), inv = 1 / Math.hypot(1, sl);
    const tx = inv, ty = sl * inv;
    let vt = c.vx * tx + c.vy * ty;
    const vmax = boost ? VBOOST : VMAX;
    if (inx) vt += inx * ACC * (boost ? 2.6 : 1) * dt * (Math.sign(vt) === -inx ? 2.2 : 1);
    else vt *= Math.exp(-0.6 * dt);
    if (boost && !inx) vt += c.face * ACC * 1.8 * dt;
    vt += c.s * G * 0.35 * (sl * inv) * dt;             // backar drar
    if (vt > vmax) vt = Math.max(vmax, vt - 1500 * dt);
    else if (vt < -VREV) vt = -VREV;
    c.vt = vt;
    c.vx = vt * tx; c.vy = vt * ty;
    if (inx && (Math.abs(vt) < 90)) c.face = inx;

    const nx = c.x + c.vx * dt, ny = c.y + c.vy * dt;
    const sl2 = slopeOf(fn, nx);
    const target = fn(nx) - c.s * H0 * Math.min(2, Math.hypot(1, sl2));
    c.x = nx;
    if (c.s * (target - ny) > 7) { c.grounded = false; c.y = ny; }   // lämnar ytan (krön, ramp)
    else c.y = target;
  } else {
    // ---- i luften ----
    c.grounded = false;
    const ax = axes(c);
    let aX = 0, aY = c.s * G;
    if (fly) { aX += ax.rx * THR; aY += ax.ry * THR; }
    else aX += inx * 260;
    if (boost) { aX += ax.fx * 2600; aY += ax.fy * 2600; }
    c.vx += aX * dt; c.vy += aY * dt;
    c.vx *= Math.exp(-(fly ? 1.3 : 0.18) * dt);
    c.vy *= Math.exp(-(fly ? 1.6 : 0.05) * dt);
    const sp = Math.hypot(c.vx, c.vy), cap = VBOOST * 1.1;
    if (sp > cap) { c.vx *= cap / sp; c.vy *= cap / sp; }
    if (inx && (fly || Math.abs(c.vx) < 160 || Math.sign(c.vx) === inx)) c.face = inx;
    c.x += c.vx * dt; c.y += c.vy * dt;

    // landa på den yta gravitationen drar mot
    const sl2 = slopeOf(fn, c.x);
    const target = fn(c.x) - c.s * H0 * Math.min(2, Math.hypot(1, sl2));
    const depth = c.s * (c.y - target);
    if (depth > 0 && (c.s * c.vy > 0 || depth > 6)) {
      const impact = Math.abs(c.vy);
      c.y = target;
      const inv = 1 / Math.hypot(1, sl2);
      const vt = c.vx * inv + c.vy * sl2 * inv;
      c.vx = vt * inv; c.vy = vt * sl2 * inv; c.vt = vt;
      c.grounded = true;
      land(impact);
    }
    // stöt i motsatt yta (huvudet i taket)
    const lim = other(c.x) + c.s * HEADROOM;
    if (c.s * (c.y - lim) < 0) {
      c.y = lim;
      if (c.s * c.vy < 0) { c.vy = -c.vy * 0.25; if (Math.abs(c.vy) > 200) { shake = Math.max(shake, 4); sfxThump(0.25); } }
    }
    c.vt = c.vx;
  }
  if (wasGrounded && !c.grounded) airStart = time;

  // ---- lutning ----
  let at, rate;
  if (c.grounded) { at = c.s * Math.atan(slopeOf(fn, c.x)); rate = 16; }
  else if (fly || inx) { at = inx * 0.72; rate = 6; }
  else { at = 0; rate = 2.2; }
  c.a = damp(c.a, at, rate, dt);
  c.faceVis = damp(c.faceVis, c.face, 14, dt);
  c.sVis = damp(c.sVis, c.s, 9, dt);
  c.wheel += (c.grounded ? c.vt * c.face : c.vt * c.face * 0.25) / 17 * dt;

  // ---- effekter ----
  const spd = Math.hypot(c.vx, c.vy);
  const ax = axes(c);
  if (fly) {
    for (const lx of [-24, 24]) {
      const p = toWorld(c, ax, lx, 9);
      const v = rnd(620, 900);
      emit(p.x, p.y, -ax.rx * v + c.vx * 0.35 + rnd(-40, 40), -ax.ry * v + c.vy * 0.35 + rnd(-40, 40), rnd(0.22, 0.4), rnd(18, 30), Math.random() < 0.5 ? "white" : "cyan", -34);
    }
    // damm från marken när man hovrar lågt
    const surf = fn(c.x);
    const h = c.s * (surf - c.y);
    if (h < 130 && Math.random() < 0.9) {
      emit(c.x + rnd(-50, 50), surf, rnd(-360, 360), -c.s * rnd(20, 90), rnd(0.35, 0.7), rnd(16, 30), "dust", 26, false);
    }
  }
  if (boost) {
    const p = toWorld(c, ax, -64, -8);
    for (let i = 0; i < 2; i++) {
      emit(p.x, p.y, -ax.fx * rnd(650, 950) + c.vx * 0.2 + rnd(-50, 50), -ax.fy * rnd(650, 950) + c.vy * 0.2 + rnd(-50, 50), rnd(0.2, 0.38), rnd(20, 34), Math.random() < 0.4 ? "white" : "orange", -40);
    }
  }
  if (c.grounded && Math.abs(c.vt) > 380 && Math.random() < 0.55) {
    const p = toWorld(c, ax, -c.face * 38, 17);
    emit(p.x, p.y, -c.vx * 0.15 + rnd(-40, 40), -c.s * rnd(30, 120), rnd(0.3, 0.6), rnd(10, 20), "dust", 22, false);
    if (c.s < 0 || Math.abs(c.vt) > 1000) emit(p.x, p.y, -c.vx * 0.2, -c.s * rnd(60, 200), rnd(0.15, 0.3), rnd(5, 9), "spark", -10);
  }

  // ---- statistik ----
  const kmh = spd * 0.18;
  if (kmh > save.top) save.top = Math.round(kmh);

  // ---- kamera ----
  camX = damp(camX, c.x + c.vx * 0.2, 4, dt);
  shake = damp(shake, 0, 9, dt);

  // partiklar
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0) { parts[i] = parts[parts.length - 1]; parts.pop(); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vx *= Math.exp(-1.2 * dt); p.vy *= Math.exp(-1.2 * dt);
    p.size = Math.max(1, p.size + p.grow * dt);
  }

  // hastighetslinjer
  if (spd > 650 && streaks.length < 28 && Math.random() < 0.7) {
    streaks.push({ x: c.vx >= 0 ? W + 20 : -20, y: rnd(0, Hs), len: rnd(60, 200) * (spd / 1200), v: rnd(0.8, 1.4) });
  }
  for (let i = streaks.length - 1; i >= 0; i--) {
    const s = streaks[i];
    s.x -= c.vx * sc * 1.5 * s.v * dt;
    if (s.x < -320 || s.x > W + 320) { streaks[i] = streaks[streaks.length - 1]; streaks.pop(); }
  }

  audioFrame(spd, fly, boost, c.grounded);
}
const streaks = [];

/* =====================================================================
   RITNING
   ===================================================================== */
const sx = (wx) => (wx - camX) * sc + W / 2;
const sy = (wy) => (wy - CAM_Y) * sc + Hs / 2;

const stars = Array.from({ length: 90 }, (_, i) => ({ x: hash(i) , y: hash(i + 99) * 0.75, r: 0.4 + hash(i + 7) * 1.1, a: 0.3 + hash(i + 3) * 0.7 }));

const LAYERS = [
  { par: 0.10, stride: 170, minH: 220, maxH: 460, color: "#0a1019", win: "rgba(110,190,255,0.26)", seed: 11 },
  { par: 0.24, stride: 120, minH: 140, maxH: 360, color: "#0d1624", win: "rgba(130,210,255,0.34)", seed: 57 },
  { par: 0.45, stride: 90,  minH: 70,  maxH: 210, color: "#101c2e", win: "rgba(180,230,255,0.42)", seed: 101 },
];

function drawSky() {
  const g = ctx.createLinearGradient(0, 0, 0, Hs);
  g.addColorStop(0, "#03050a");
  g.addColorStop(0.55, "#0a1220");
  g.addColorStop(1, "#16243a");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, Hs);

  ctx.fillStyle = "#fff";
  for (const s of stars) {
    ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(time * 2 + s.x * 40));
    const px = ((s.x * W * 1.4 - camX * sc * 0.02) % W + W) % W;
    ctx.fillRect(px, s.y * Hs, s.r, s.r);
  }
  ctx.globalAlpha = 1;

  // måne
  const mx = W * 0.78 - camX * sc * 0.01, my = Hs * 0.3, mr = Hs * 0.065;
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.5; ctx.drawImage(glow.white, mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#dfe9f5"; ctx.beginPath(); ctx.arc(mx, my, mr, 0, TAU); ctx.fill();
  ctx.fillStyle = "rgba(120,140,170,0.35)";
  ctx.beginPath(); ctx.arc(mx - mr * 0.3, my - mr * 0.1, mr * 0.28, 0, TAU); ctx.arc(mx + mr * 0.35, my + mr * 0.35, mr * 0.18, 0, TAU); ctx.fill();

  // skyline
  const base = sy(60);
  for (const L of LAYERS) {
    const left = camX * L.par - W / 2 / sc - L.stride * 2;
    const right = camX * L.par + W / 2 / sc + L.stride * 2;
    const i0 = Math.floor(left / L.stride), i1 = Math.ceil(right / L.stride);
    ctx.fillStyle = L.color;
    for (let i = i0; i <= i1; i++) {
      const w = L.stride * (0.62 + 0.3 * hash(i + L.seed));
      const h = lerp(L.minH, L.maxH, hash(i * 3 + L.seed + 5));
      const bx = (i * L.stride - camX * L.par) * sc + W / 2;
      ctx.fillRect(bx, base - h * sc, w * sc, h * sc + 400);
    }
    ctx.fillStyle = L.win;
    ctx.beginPath();
    for (let i = i0; i <= i1; i++) {
      const w = L.stride * (0.62 + 0.3 * hash(i + L.seed));
      const h = lerp(L.minH, L.maxH, hash(i * 3 + L.seed + 5));
      const bx = (i * L.stride - camX * L.par) * sc + W / 2;
      const step = 14;
      for (let gy = 10; gy < h - 6; gy += step) {
        for (let gx = 8; gx < w - 8; gx += step) {
          if (hash(i * 131 + gx * 7 + gy * 13 + L.seed) > 0.72) ctx.rect(bx + gx * sc, base - (h - gy) * sc, 4 * sc, 6 * sc);
        }
      }
    }
    ctx.fill();
  }
  // dis vid horisonten
  const hz = ctx.createLinearGradient(0, base - 160 * sc, 0, base + 40 * sc);
  hz.addColorStop(0, "rgba(40,90,140,0)");
  hz.addColorStop(1, "rgba(60,130,190,0.28)");
  ctx.fillStyle = hz; ctx.fillRect(0, base - 160 * sc, W, 200 * sc);
}

function surfacePath(fn, x0, x1, step) {
  ctx.moveTo(sx(x0), sy(fn(x0)));
  for (let x = x0 + step; x <= x1 + step; x += step) ctx.lineTo(sx(x), sy(fn(x)));
}

function drawRoad() {
  const x0 = Math.floor((camX - W / 2 / sc - 60) / 14) * 14;
  const x1 = camX + W / 2 / sc + 60;
  const step = 14;

  // ---- tak ----
  ctx.beginPath();
  surfacePath(ceilY, x0, x1, step);
  ctx.lineTo(sx(x1 + step), -50); ctx.lineTo(sx(x0), -50); ctx.closePath();
  const cg = ctx.createLinearGradient(0, 0, 0, sy(CEIL));
  cg.addColorStop(0, "#04060a"); cg.addColorStop(1, "#111826");
  ctx.fillStyle = cg; ctx.fill();
  // vägband (ovanför kanten)
  ctx.beginPath();
  surfacePath((x) => ceilY(x) - 20, x0, x1, step);
  for (let x = x1 + step; x >= x0; x -= step) ctx.lineTo(sx(x), sy(ceilY(x)));
  ctx.closePath(); ctx.fillStyle = "#1b2536"; ctx.fill();
  // streckad linje
  ctx.strokeStyle = "rgba(255,255,255,0.38)"; ctx.lineWidth = 3 * sc; ctx.lineCap = "butt";
  ctx.beginPath();
  for (let x = Math.floor(x0 / 110) * 110; x < x1; x += 110) { ctx.moveTo(sx(x), sy(ceilY(x) - 10)); ctx.lineTo(sx(x + 50), sy(ceilY(x + 50) - 10)); }
  ctx.stroke();
  // neon
  ctx.beginPath(); surfacePath(ceilY, x0, x1, step);
  ctx.strokeStyle = "rgba(255,59,74,0.18)"; ctx.lineWidth = 12 * sc; ctx.stroke();
  ctx.strokeStyle = "rgba(255,90,100,0.95)"; ctx.lineWidth = 2.4 * sc; ctx.stroke();

  // ---- golv ----
  ctx.beginPath();
  surfacePath(floorY, x0, x1, step);
  ctx.lineTo(sx(x1 + step), Hs + 50); ctx.lineTo(sx(x0), Hs + 50); ctx.closePath();
  const fg = ctx.createLinearGradient(0, sy(40), 0, Hs);
  fg.addColorStop(0, "#131b29"); fg.addColorStop(1, "#04060a");
  ctx.fillStyle = fg; ctx.fill();
  ctx.beginPath();
  surfacePath(floorY, x0, x1, step);
  for (let x = x1 + step; x >= x0; x -= step) ctx.lineTo(sx(x), sy(floorY(x) + 20));
  ctx.closePath(); ctx.fillStyle = "#1c2738"; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.38)"; ctx.lineWidth = 3 * sc;
  ctx.beginPath();
  for (let x = Math.floor(x0 / 110) * 110; x < x1; x += 110) { ctx.moveTo(sx(x), sy(floorY(x) + 10)); ctx.lineTo(sx(x + 50), sy(floorY(x + 50) + 10)); }
  ctx.stroke();
  ctx.beginPath(); surfacePath(floorY, x0, x1, step);
  ctx.strokeStyle = "rgba(62,224,255,0.18)"; ctx.lineWidth = 12 * sc; ctx.stroke();
  ctx.strokeStyle = "rgba(110,235,255,0.95)"; ctx.lineWidth = 2.4 * sc; ctx.stroke();

  // ---- gatlyktor och takarmaturer ----
  ctx.globalCompositeOperation = "lighter";
  for (let x = Math.floor(x0 / 520) * 520; x < x1; x += 520) {
    const px = sx(x), gy = sy(floorY(x)), top = gy - 175 * sc;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#202b3c"; ctx.lineWidth = 5 * sc;
    ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, top); ctx.quadraticCurveTo(px, top - 14 * sc, px + 26 * sc, top - 14 * sc); ctx.stroke();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.85; ctx.drawImage(glow.white, px + 26 * sc - 60 * sc, top - 14 * sc - 60 * sc, 120 * sc, 120 * sc);
    ctx.globalAlpha = 1;
  }
  for (let x = Math.floor(x0 / 340) * 340; x < x1; x += 340) {
    const px = sx(x), cy = sy(ceilY(x));
    ctx.globalAlpha = 0.9; ctx.drawImage(glow.red, px - 70 * sc, cy - 30 * sc, 140 * sc, 100 * sc);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffd5d8"; ctx.fillRect(px - 16 * sc, cy + 2 * sc, 32 * sc, 4 * sc);
    ctx.globalCompositeOperation = "lighter";
  }
  ctx.globalCompositeOperation = "source-over";

  // ramp-varningsmarkering
  ctx.fillStyle = "rgba(255,200,40,0.9)";
  for (let k = Math.floor((x0 - 1500) / 2700); k * 2700 + 1500 < x1; k++) {
    const bx = k * 2700 + 1500;
    if (bx + 270 < x0) continue;
    for (let i = 0; i < 4; i++) {
      const x = bx + 40 + i * 55;
      ctx.beginPath(); ctx.moveTo(sx(x), sy(floorY(x) + 8)); ctx.lineTo(sx(x + 20), sy(floorY(x + 20) + 8)); ctx.lineTo(sx(x + 8), sy(floorY(x + 8) + 16)); ctx.lineTo(sx(x - 12), sy(floorY(x - 12) + 16)); ctx.closePath(); ctx.fill();
    }
  }
  for (let k = Math.floor((x0 - 2500) / 3300); k * 3300 + 2500 < x1; k++) {
    const bx = k * 3300 + 2500;
    if (bx + 270 < x0) continue;
    for (let i = 0; i < 4; i++) {
      const x = bx + 40 + i * 55;
      ctx.beginPath(); ctx.moveTo(sx(x), sy(ceilY(x) - 8)); ctx.lineTo(sx(x + 20), sy(ceilY(x + 20) - 8)); ctx.lineTo(sx(x + 8), sy(ceilY(x + 8) - 16)); ctx.lineTo(sx(x - 12), sy(ceilY(x - 12) - 16)); ctx.closePath(); ctx.fill();
    }
  }
}

function drawParticles(addMode) {
  ctx.globalCompositeOperation = addMode ? "lighter" : "source-over";
  for (const p of parts) {
    if (p.add !== addMode) continue;
    const k = p.life / p.max;
    const s = p.size * sc * (addMode ? (0.5 + 0.5 * k) : (1.4 - 0.4 * k));
    ctx.globalAlpha = addMode ? k : k * 0.5;
    ctx.drawImage(glow[p.sprite], sx(p.x) - s, sy(p.y) - s, s * 2, s * 2);
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
}

function drawCar() {
  const c = car;
  const ca = Math.cos(c.a), sa = Math.sin(c.a);
  const k = sc;
  // underglöd på ytan
  const surf = (c.s > 0 ? floorY : ceilY)(c.x);
  const gap = Math.abs(surf - c.y);
  if (gap < 160) {
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = clamp(1 - gap / 160, 0, 1) * (c.flying ? 0.9 : 0.45);
    ctx.drawImage(glow[c.flying ? "white" : "cyan"], sx(c.x) - 90 * k, sy(surf) - 24 * k, 180 * k, 48 * k);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  }

  ctx.save();
  ctx.translate(sx(c.x), sy(c.y));
  // lokala axlar: x = framåt, y = mot hjulen
  ctx.transform(c.faceVis * ca * k, c.faceVis * c.sVis * sa * k, -sa * k, c.sVis * ca * k, 0, 0);

  const paint = PAINT[save.color] || PAINT[0];

  // hjulhus + hjul
  const wheel = (x) => {
    ctx.fillStyle = "#04060a"; ctx.beginPath(); ctx.arc(x, 0, 19.5, 0, TAU); ctx.fill();
    ctx.fillStyle = "#0e1118"; ctx.beginPath(); ctx.arc(x, 0, 17, 0, TAU); ctx.fill();
    ctx.save(); ctx.translate(x, 0); ctx.rotate(c.wheel);
    ctx.fillStyle = "#aab4c2"; ctx.beginPath(); ctx.arc(0, 0, 11, 0, TAU); ctx.fill();
    ctx.fillStyle = "#3a4352";
    for (let i = 0; i < 5; i++) { ctx.rotate(TAU / 5); ctx.fillRect(2, -1.6, 9, 3.2); }
    ctx.fillStyle = "#e9f3ff"; ctx.beginPath(); ctx.arc(0, 0, 3, 0, TAU); ctx.fill();
    ctx.restore();
  };

  // kaross
  ctx.beginPath();
  ctx.moveTo(-63, 5);
  ctx.lineTo(-65, -10);
  ctx.quadraticCurveTo(-60, -17, -46, -19);
  ctx.quadraticCurveTo(-32, -30, -6, -31);
  ctx.quadraticCurveTo(18, -31, 34, -20);
  ctx.quadraticCurveTo(52, -18, 64, -9);
  ctx.quadraticCurveTo(69, -5, 67, 2);
  ctx.lineTo(66, 7);
  ctx.lineTo(-63, 7);
  ctx.closePath();
  ctx.fillStyle = paint; ctx.fill();
  const sh = ctx.createLinearGradient(0, -31, 0, 8);
  sh.addColorStop(0, "rgba(255,255,255,0.45)"); sh.addColorStop(0.45, "rgba(255,255,255,0)"); sh.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = sh; ctx.fill();

  wheel(-38); wheel(39);

  // glaskupol
  ctx.beginPath();
  ctx.moveTo(-40, -19);
  ctx.quadraticCurveTo(-28, -28, -6, -29);
  ctx.quadraticCurveTo(14, -29, 30, -19);
  ctx.closePath();
  const gl = ctx.createLinearGradient(-40, -29, 30, -19);
  gl.addColorStop(0, "#0b1624"); gl.addColorStop(0.5, "#2c5a78"); gl.addColorStop(1, "#0d1b2c");
  ctx.fillStyle = gl; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(-20, -27); ctx.lineTo(-8, -20); ctx.stroke();

  // sidolist
  ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(-14, -5); ctx.lineTo(16, -5); ctx.stroke();

  // strålkastare och baklykta
  ctx.fillStyle = "#fff"; ctx.fillRect(59, -8, 7, 3);
  ctx.fillStyle = "#ff3040"; ctx.fillRect(-65, -11, 3, 7);
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(glow.red, -86, -22, 44, 36);
  ctx.globalAlpha = 0.8;
  ctx.drawImage(glow.white, 60, -22, 54, 36);
  ctx.globalAlpha = 1;

  // thrusters
  ctx.globalCompositeOperation = "source-over";
  for (const x of [-24, 24]) {
    ctx.fillStyle = "#06080c"; ctx.fillRect(x - 7, 5, 14, 5);
    if (c.flying) { ctx.globalCompositeOperation = "lighter"; ctx.drawImage(glow.white, x - 14, 0, 28, 28); ctx.globalCompositeOperation = "source-over"; }
    else { ctx.fillStyle = "rgba(62,224,255,0.7)"; ctx.fillRect(x - 5, 8.5, 10, 1.4); }
  }
  ctx.restore();
}

function drawStreaks() {
  ctx.strokeStyle = "rgba(220,240,255,0.22)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  const dir = car.vx >= 0 ? 1 : -1;
  for (const s of streaks) { ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len * dir, s.y); }
  ctx.stroke();
}

function render() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const shx = shake ? rnd(-shake, shake) : 0, shy = shake ? rnd(-shake, shake) : 0;
  ctx.save();
  ctx.translate(shx, shy);
  drawSky();
  drawRoad();
  drawParticles(false);
  drawCar();
  drawParticles(true);
  drawStreaks();
  ctx.restore();
}

/* =====================================================================
   HUD / MENY
   ===================================================================== */
const hud = $("#hud"), touchUI = $("#touch"), menu = $("#menu");
let hudSpd = -1, hudCeil = null, hudFly = null;
function updateHud() {
  const c = car;
  const kmh = Math.round(Math.hypot(c.vx, c.vy) * 0.18);
  if (kmh !== hudSpd) { hudSpd = kmh; $("#spd").textContent = kmh; }
  const ceil = c.s < 0;
  if (ceil !== hudCeil) { hudCeil = ceil; const m = $("#modeChip"); m.textContent = ceil ? "TAK" : "GOLV"; m.classList.toggle("ceil", ceil); }
  if (c.flying !== hudFly) { hudFly = c.flying; $("#flyChip").hidden = !c.flying; }
}

function showStats() {
  const l = [];
  if (save.top) l.push(`Toppfart ${save.top} km/h`);
  if (save.air) l.push(`Längsta flygtur ${save.air} s`);
  if (save.flips) l.push(`Vändningar ${save.flips}`);
  $("#stats").textContent = l.join("  ·  ");
}

function buildPaint() {
  const box = $("#paint");
  box.innerHTML = "";
  PAINT.forEach((col, i) => {
    const b = document.createElement("button");
    b.style.background = col; b.setAttribute("aria-label", "Färg " + (i + 1));
    if (i === save.color) b.classList.add("sel");
    b.addEventListener("click", () => { save.color = i; store(); buildPaint(); });
    box.appendChild(b);
  });
}

function openMenu() {
  paused = true;
  clearInput();
  showStats(); buildPaint();
  $("#go").textContent = started ? "Fortsätt" : "Kör!";
  menu.hidden = false;
  store();
}
function closeMenu() {
  initAudio();
  started = true; paused = false;
  menu.hidden = true;
  hud.hidden = false; touchUI.hidden = false;
  last = performance.now();
}
$("#go").addEventListener("click", closeMenu);
$("#menuBtn").addEventListener("click", openMenu);
$("#mute").addEventListener("click", () => { initAudio(); setMuted(!save.muted); });

/* =====================================================================
   INPUT
   ===================================================================== */
const holds = { left: new Set(), right: new Set(), fly: new Set(), boost: new Set(), flip: new Set() };
function syncInput() {
  inp.left = holds.left.size > 0 || kb.left;
  inp.right = holds.right.size > 0 || kb.right;
  inp.fly = holds.fly.size > 0 || kb.fly;
  inp.boost = holds.boost.size > 0 || kb.boost;
  document.querySelectorAll(".btn").forEach((b) => {
    const a = b.dataset.act;
    const on = (a === "left" && inp.left) || (a === "right" && inp.right) || (a === "fly" && inp.fly) || (a === "boost" && inp.boost) || (a === "flip" && holds.flip.size > 0);
    b.classList.toggle("on", on);
  });
}
const kb = { left: false, right: false, fly: false, boost: false };
function clearInput() {
  for (const k in holds) holds[k].clear();
  kb.left = kb.right = kb.fly = kb.boost = false;
  syncInput();
}
document.querySelectorAll(".btn").forEach((b) => {
  const act = b.dataset.act;
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    initAudio();
    try { b.setPointerCapture(e.pointerId); } catch (_) {}
    holds[act].add(e.pointerId);
    if (act === "flip") inp.flipQ = true;
    syncInput();
  });
  const up = (e) => { holds[act].delete(e.pointerId); syncInput(); };
  b.addEventListener("pointerup", up);
  b.addEventListener("pointercancel", up);
  b.addEventListener("lostpointercapture", up);
  b.addEventListener("contextmenu", (e) => e.preventDefault());
});
// förhindra zoom/scroll/gester på iOS
document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
document.addEventListener("gesturestart", (e) => e.preventDefault());
let lastTap = 0;
document.addEventListener("touchend", (e) => { const n = Date.now(); if (n - lastTap < 350) e.preventDefault(); lastTap = n; }, { passive: false });

const KEYMAP = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowUp: "fly", w: "fly", W: "fly", " ": "fly", Shift: "boost" };
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.key === "Escape" || e.key === "p" || e.key === "P") { paused ? (started && closeMenu()) : openMenu(); return; }
  if (paused) { if (e.key === "Enter") closeMenu(); return; }
  if (e.key === "f" || e.key === "F" || e.key === "ArrowDown" || e.key === "s" || e.key === "S") { inp.flipQ = true; holds.flip.add(-1); syncInput(); return; }
  const k = KEYMAP[e.key];
  if (k) { kb[k] = true; e.preventDefault(); syncInput(); }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "f" || e.key === "F" || e.key === "ArrowDown" || e.key === "s" || e.key === "S") { holds.flip.delete(-1); syncInput(); return; }
  const k = KEYMAP[e.key];
  if (k) { kb[k] = false; syncInput(); }
});
window.addEventListener("blur", () => { clearInput(); if (started && !paused) openMenu(); });
document.addEventListener("visibilitychange", () => { if (document.hidden) { clearInput(); if (started && !paused) openMenu(); } else if (actx && actx.state === "suspended" && !paused) actx.resume(); });
window.addEventListener("pagehide", store);

/* =====================================================================
   LOOP
   ===================================================================== */
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; Hs = window.innerHeight;
  canvas.width = Math.round(W * DPR); canvas.height = Math.round(Hs * DPR);
  sc = Hs / VIEW_H;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", () => setTimeout(resize, 200));

let last = performance.now();
let saveT = 0;
function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  if (!paused) {
    // två delsteg ger stabilare kollision i hög fart
    update(dt / 2); update(dt / 2);
    updateHud();
    saveT += dt; if (saveT > 6) { saveT = 0; store(); }
  } else {
    time += dt; camX += 40 * dt;   // menybakgrunden rullar långsamt
  }
  render();
  requestAnimationFrame(frame);
}

resize();
setMuted(!!save.muted);
camX = car.x;
openMenu();
requestAnimationFrame(frame);

// för test
window.__delta = { car, inp, parts, floorY, ceilY, update, get paused() { return paused; } };
})();
