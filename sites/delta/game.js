(() => {
"use strict";

/* =====================================================================
   Delta Roadster - sandlåda för en roadster som kör, flyger och gör
   stunts. Sidovy, liggande läge, öppen himmel, banan har ett slut.
   Två stuntbanor: BILHOPPET (ramp + parkerade bilar) och VÄGGEN
   (rundeln: kör upp, lämna kanten bakåt och loopa i luften).
   Efter varje hopp sätts ett betyg på stil och landning.
   ===================================================================== */

const TAU = Math.PI * 2;
const $ = (s) => document.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
const rnd = (a, b) => a + Math.random() * (b - a);
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const wrap = (a) => { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; };

/* ---------- fysik (lätt att ändra) ---------- */
const G = 2200;          // gravitation
const ACC = 950;         // acceleration på marken
const VMAX = 900;        // toppfart, normalt
const VBOOST = 1750;     // toppfart med boost
const VREV = 420;        // max backfart (med gas)
const THR = 1.5 * G;     // thrusterkraft (längs takriktningen)
const H0 = 20;           // axelhöjd över ytan
const ROLL_W = 9.0;      // tunnrullens hastighet, rad/s
const ALT_SOFT = -2000;  // över denna höjd tappar thrustrarna kraft
const ALT_MAX = -2300;   // ...och här är de helt slut

/* ---------- världen ---------- */
const VIEW_H = 620;      // synlig höjd i världsenheter
const CAM_Y = -245;      // normal kameranivå
const START_X = -360;    // bakre barriär
const END_X = 11100;     // banans slut

const smooth = (t) => t * t * (3 - 2 * t);
// ramp: kurvad stigning, sedan ett brant fall - bra att hoppa från
function kicker(x, period, offset, rise, len) {
  const u = (((x - offset) % period) + period) % period;
  if (u < len) { const k = u / len; return rise * k * (0.55 + 0.45 * k); }
  if (u < len + 90) return rise * (1 - smooth((u - len) / 90));
  return 0;
}

/* stuntbanor: plana zoner */
const ZONES = [{ a: 4000, b: 6900 }, { a: 7600, b: 10300 }];
const ZE = 250;
function zoneF(x) {
  let f = 0;
  for (const z of ZONES) {
    const t = smooth(clamp((x - (z.a - ZE)) / ZE, 0, 1)) * smooth(clamp(((z.b + ZE) - x) / ZE, 0, 1));
    if (t > f) f = t;
  }
  return f;
}
const RAMP = { x: 4800, len: 320, rise: 170 };
const VEH = [
  { id: 0, type: "model3", name: "Model 3", x0: 5400, w: 124, h: 54, color: "#2748d8" },
  { id: 1, type: "modelY", name: "Model Y", x0: 5538, w: 124, h: 62, color: "#c4262e" },
  { id: 2, type: "semi", name: "Semi", x0: 5676, w: 190, h: 112, color: "#e9eef3" },
  { id: 3, type: "cyber", name: "Cybertruck", x0: 5880, w: 150, h: 66, color: "#98a1ab" },
];
for (const v of VEH) { v.x1 = v.x0 + v.w; v.topY = -v.h; }

/* rundeln: en cirkelbåge som reser sig ur marken, förbi lodrätt, så att
   man kastas ut bakåt. Cirkelns mittpunkt är (x0, -R). */
const WALL = { x0: 8800, R: 420, thMax: (112 * Math.PI) / 180, thLow: (89 * Math.PI) / 180 };
WALL.xLow = WALL.x0 + WALL.R * Math.sin(WALL.thLow);                 // höjdfältet (för landning) når hit
WALL.lipX = WALL.x0 + WALL.R * Math.sin(WALL.thMax);
WALL.lipY = -WALL.R + WALL.R * Math.cos(WALL.thMax);
WALL.xMax = WALL.x0 + WALL.R;
const wallH = (x) => {
  if (x <= WALL.x0 || x >= WALL.xLow) return 0;
  const u = (x - WALL.x0) / WALL.R;
  return WALL.R * (1 - Math.sqrt(1 - u * u));
};
const PE = 8;
const plate = (x, x0, x1, h) => h * smooth(clamp((x - x0) / PE, 0, 1)) * smooth(clamp((x1 - x) / PE, 0, 1));

const floorY = (x) => {
  const f = zoneF(x);
  let h = (22 * Math.sin(x / 310) + 14 * Math.sin(x / 131 + 2) + 30 * Math.sin(x / 1100) + kicker(x, 2700, 1500, 95, 270)) * (1 - f);
  if (f > 0.001) {
    h += kicker(x, 1e9, RAMP.x, RAMP.rise, RAMP.len) + wallH(x);
    for (let i = 0; i < VEH.length; i++) h += plate(x, VEH[i].x0, VEH[i].x1, VEH[i].h);
  }
  return -h;
};
const slopeOf = (x) => (floorY(x + 1) - floorY(x - 1)) / 2;

// ytans koordinatsystem i punkten x: px,py = punkten, rx,ry = normal bort från ytan (takriktning)
function frameAt(x) {
  const sl = slopeOf(x), inv = 1 / Math.hypot(1, sl);
  return { sl, inv, px: x, py: floorY(x), rx: sl * inv, ry: -inv };
}

// bilens mittpunkt på rundeln (H0 från ytan) för vinkeln th
const arcCenter = (th) => ({ x: WALL.x0 + (WALL.R - H0) * Math.sin(th), y: -WALL.R + (WALL.R - H0) * Math.cos(th) });

/* =====================================================================
   SPARAT
   ===================================================================== */
const KEY = "delta-roadster-v1";
const PAINT = ["#e82127", "#f2f4f8", "#232b3b", "#2f7bff"];
let save = { top: 0, air: 0, color: 0, muted: false, best: 0, stars: 0, maxFlips: 0 };
try { Object.assign(save, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
const store = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) {} };

/* =====================================================================
   BILEN
   ===================================================================== */
const car = {
  x: 0, y: 0, xc: 0,        // x,y = bilens mitt; xc = kontaktpunkt på marken
  vx: 0, vy: 0,
  grounded: true,
  arc: null,                 // { th } när bilen kör på rundeln
  a: 0,                      // lutning/pitch (takriktning = (sin a, -cos a))
  pr: 0,                     // pitch-hastighet efter att ha lämnat rundeln (loop)
  face: 1,                   // körriktning
  faceVis: 1,
  roll: 0, rollRem: 0,       // tunnrulle (åt sidan)
  wheel: 0,
  vt: 0,                     // fart längs ytan
  dx: 1, dy: 0,              // filtrerad körriktning längs ytan (behåller rampens vinkel vid avhopp)
  flying: false,
  spinBuf: 0,
  leftWall: false,
};
function resetCar(x) {
  const c = car;
  c.face = 1; c.faceVis = 1; c.a = 0; c.pr = 0; c.vt = 0; c.vx = 0; c.vy = 0;
  c.roll = 0; c.rollRem = 0; c.arc = null; c.grounded = true; c.xc = x; c.spinBuf = 0; c.leftWall = false;
  const fr = frameAt(x);
  c.x = fr.px + fr.rx * H0; c.y = fr.py + fr.ry * H0;
  c.a = Math.atan(fr.sl);
  c.dx = fr.inv; c.dy = fr.sl * fr.inv;
  air = null;
  parts.length = 0;
  camX = c.x; camYv = CAM_Y; zoom = 1;
}

const inp = { left: false, right: false, fly: false, boost: false, spinQ: false };

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
function sfxTone(freq, delay, dur, vol, type) {
  if (!actx) return;
  const o = actx.createOscillator(); o.type = type || "triangle";
  const g = actx.createGain(); const t = actx.currentTime + delay;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
}
function sfxRating(stars, crash) {
  if (crash) { sfxThump(0.6); sfxNoise(300, 80, 0.5, 0.5); return; }
  const base = [392, 440, 494, 523, 587, 659];
  for (let i = 0; i < Math.max(1, stars); i++) sfxTone(base[Math.min(i, 5)] * (i > 3 ? 1.5 : 1), i * 0.09, 0.4, 0.22);
  if (stars >= 5) sfxTone(1046, 0.5, 0.7, 0.2);
}
function audioFrame(spd, flying, boosting) {
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
makeGlow("gold", "255,214,90");

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
let W = 0, Hs = 0, DPR = 1, baseSc = 1, sc = 1, camX = 0, camYv = CAM_Y, zoom = 1;
let shake = 0;
let paused = true;
let started = false;
let time = 0;
let air = null;         // pågående hopp (för betyg)
let lastResult = null;

const axes = (c) => {
  const ca = Math.cos(c.a), sa = Math.sin(c.a);
  return { fx: c.face * ca, fy: c.face * sa, rx: sa, ry: -ca };
};
const toWorld = (c, ax, lx, ly) => ({ x: c.x + ax.fx * lx - ax.rx * ly, y: c.y + ax.fy * lx - ax.ry * ly });

// tunnrulle: rullar åt sidan (inte volt framåt/bakåt) - bilen ska vara hel när den landar
function doSpin() {
  const c = car;
  if (c.grounded) { c.spinBuf = 0.4; return; }          // tryck strax före avhopp räknas också
  if (c.rollRem > 2.5 * TAU) return;
  c.rollRem += TAU;
  sfxNoise(300, 1800, 0.35, 0.35);
}

/* ---------- hopp och betyg ---------- */
function beginAir() {
  air = { t0: time, rollTotal: 0, loops: 0, maxH: 0, over: new Set(), crashed: false, wall: car.leftWall };
  car.leftWall = false;
}
const airFlips = (a) => Math.floor(a.rollTotal / TAU + 0.12) + a.loops;
function trackAir() {
  const c = car;
  if (!air) return;
  const h = floorY(c.x) - c.y - H0;
  if (h > air.maxH) air.maxH = h;
  for (const v of VEH) {
    if (c.x >= v.x0 + 10 && c.x <= v.x1 - 10 && c.y + 17 < v.topY - 4) air.over.add(v.id);
  }
}

const GRADES = [
  [92, "PERFEKT!"], [78, "SJUKT COOLT!"], [58, "SNYGGT!"], [38, "Helt okej"], [0, "Wobbly..."],
];
function endAir(land) {
  const a = air; air = null;
  if (!a || !land) return;
  const c = car;
  const t = time - a.t0;
  const flips = airFlips(a);
  const over = a.over.size;
  const worthy = t >= 0.8 && (flips > 0 || over > 0 || a.maxH >= 250);
  if (!worthy) return;

  const e = Math.abs(land.err);
  const crash = e > 1.2 || a.crashed;
  const style = Math.min(100, flips * 32 + Math.min(28, a.maxH / 14) + Math.min(18, t * 9) + over * 9);
  const angleQ = 1 - clamp((e - 0.08) / 0.9, 0, 1);
  const impactQ = 1 - clamp((land.vn - 350) / 1500, 0, 1);
  const landing = Math.round(100 * (0.6 * angleQ + 0.4 * impactQ));
  let total = 0.55 * style + 0.45 * landing;
  if (crash) total = Math.min(total, 14);
  total = Math.round(total);
  const stars = crash ? 0 : clamp(Math.round(total / 20), 1, 5);
  const grade = crash ? "KRASCH!" : GRADES.find((g) => total >= g[0])[1];
  const res = { total, stars, grade, crash, flips, over, height: a.maxH, time: t, style: Math.round(style), landing, impact: land.vn, err: e };
  lastResult = res;
  showResult(res);
  sfxRating(stars, crash);
  if (total > save.best) save.best = total;
  if (stars > save.stars) save.stars = stars;
  if (flips > save.maxFlips) save.maxFlips = flips;
  if (a.maxH * 0.05 > (save.high || 0)) save.high = Math.round(a.maxH * 0.05);
  store();
  if (stars >= 4) {
    for (let i = 0; i < 40; i++) emit(c.x + rnd(-80, 80), c.y - rnd(40, 200), rnd(-200, 200), rnd(-380, -80), rnd(0.6, 1.2), rnd(16, 30), "gold", -8);
  }
}
let resultT = 0;
function showResult(r) {
  const box = $("#result");
  const stars = "★".repeat(r.stars) + '<span class="dim">' + "★".repeat(5 - r.stars) + "</span>";
  const parts2 = [];
  if (r.flips) parts2.push(`Snurr ×${r.flips}`);
  if (r.over) parts2.push(`${r.over} ${r.over === 1 ? "bil" : "bilar"} över`);
  parts2.push(`Höjd ${Math.round(r.height * 0.05)} m`);
  parts2.push(`Flygtid ${r.time.toFixed(1).replace(".", ",")} s`);
  const landTxt = r.crash ? "Krasch-landning" : r.landing >= 90 ? "Mjuk och rak landning" : r.landing >= 65 ? "Hyfsad landning" : "Hård landning";
  box.innerHTML =
    `<div class="grade${r.crash ? " crash" : ""}">${r.grade}</div>` +
    `<div class="stars">${r.crash ? "✕" : stars}</div>` +
    `<div class="line">${parts2.join("  ·  ")}</div>` +
    `<div class="bars"><span>Stil <b>${r.style}</b></span><span>Landning <b>${r.landing}</b></span><span>${landTxt}</span></div>` +
    `<div class="score">${r.total}<small>/100</small></div>`;
  box.hidden = false; box.classList.remove("show"); void box.offsetWidth; box.classList.add("show");
  clearTimeout(resultT); resultT = setTimeout(() => { box.hidden = true; }, 4200);
}

function land(info) {
  const c = car;
  const impact = info.vn;
  if (impact > 320) {
    sfxThump(clamp(impact / 1400, 0.15, 0.7));
    shake = Math.max(shake, clamp(impact / 100, 3, 12));
    const ax = axes(c);
    const p = toWorld(c, ax, 0, 18);
    for (let i = 0; i < 14; i++) {
      emit(p.x, p.y, rnd(-260, 260) + c.vx * 0.2, -rnd(220, 420) * (Math.random() * 0.7 + 0.3), rnd(0.4, 0.8), rnd(14, 28), "dust", 30, false);
    }
    for (let i = 0; i < 8; i++) emit(p.x, p.y, rnd(-300, 300), -rnd(120, 420), rnd(0.2, 0.45), rnd(6, 12), "spark", -10);
    if (info.crash) for (let i = 0; i < 18; i++) emit(p.x, p.y, rnd(-500, 500), -rnd(100, 600), rnd(0.4, 0.9), rnd(14, 30), "orange", -10);
  }
}

function bump(intensity) {
  shake = Math.max(shake, 5);
  sfxThump(intensity || 0.4);
  const c = car;
  for (let i = 0; i < 10; i++) emit(c.x + c.face * 50, c.y, rnd(-200, 200), rnd(-300, 100), rnd(0.2, 0.5), rnd(6, 14), "spark", -10);
}

/* =====================================================================
   UPPDATERING
   ===================================================================== */
// närmaste punkt på marken till (ex,ey), sökt längs ytan i ~lika långa steg
function nearestOnSurface(ex, ey, xg, inv0) {
  const d = 7 * inv0 + 0.5;
  let best = Infinity, bx = xg;
  for (let k = -7; k <= 7; k++) {
    const x = xg + k * d, dx = ex - x, dy = ey - floorY(x), dd = dx * dx + dy * dy;
    if (dd < best) { best = dd; bx = x; }
  }
  const x0 = bx;
  for (let k = -4; k <= 4; k++) {
    const x = x0 + k * d * 0.25, dx = ex - x, dy = ey - floorY(x), dd = dx * dx + dy * dy;
    if (dd < best) { best = dd; bx = x; }
  }
  return { x: bx, d: Math.sqrt(best) };
}

function enterArc(vt, th) {
  const c = car;
  c.arc = { th: Math.max(0, th) };
  c.vt = vt;
}

// på rundeln: bilen följer cirkelbågen, tyngdkraften drar längs banan
function arcStep(dt, inx, boost) {
  const c = car, R = WALL.R;
  let vt = c.vt, th = c.arc.th;
  const vmax = boost ? VBOOST : VMAX;
  if (inx) vt += inx * ACC * (boost ? 2.6 : 1) * dt;
  else vt *= Math.exp(-0.3 * dt);
  if (boost && !inx) vt += ACC * 1.8 * dt;
  vt -= G * Math.sin(th) * dt;
  if (vt > vmax) vt = Math.max(vmax, vt - 3600 * dt);
  else if (vt < -1500) vt = -1500;
  th += (vt / R) * dt;
  c.vt = vt;

  if (th <= 0) {                                      // tillbaka ner på golvet
    c.arc = null; c.xc = WALL.x0 - 1;
    c.x = WALL.x0 - 1; c.y = -H0; c.vx = vt; c.vy = 0; c.dx = 1; c.dy = 0;
    return;
  }
  const lip = th >= WALL.thMax;
  const N = (vt * vt) / R + G * Math.cos(th);          // anpressning mot ytan
  if (lip || N < 0) {                                  // lämnar rundeln (kanten, eller för lite fart uppe)
    th = Math.min(th, WALL.thMax);
    const p = arcCenter(th);
    c.x = p.x; c.y = p.y;
    c.vx = vt * Math.cos(th); c.vy = -vt * Math.sin(th);
    c.arc = null; c.grounded = false;
    if (lip && vt > 300) { c.pr = -Math.abs(vt) / R; c.leftWall = true; }   // loopen fortsätter i luften
    return;
  }
  c.arc.th = th;
  const p = arcCenter(th);
  c.x = p.x; c.y = p.y;
  c.dx = Math.cos(th); c.dy = -Math.sin(th);
  c.vx = vt * c.dx; c.vy = vt * c.dy;
}

function groundStep(dt, inx, boost) {
  const c = car;
  if (c.arc) { arcStep(dt, inx, boost); return; }
  const fr = frameAt(c.xc);
  let vt = c.vt;
  const tx = fr.inv, ty = fr.sl * fr.inv;
  const sinT = fr.sl * fr.inv;
  const vmax = boost ? VBOOST : VMAX;
  if (inx) {
    if (!(inx < 0 && vt <= -VREV)) vt += inx * ACC * (boost ? 2.6 : 1) * dt * (Math.sign(vt) === -inx ? 2.2 : 1);
  } else vt *= Math.exp(-0.6 * dt);
  if (boost && !inx) vt += c.face * ACC * 1.8 * dt;
  const k = 0.35 + 0.65 * clamp((Math.abs(sinT) - 0.45) / 0.4, 0, 1);   // branta partier drar hårdare
  vt += G * k * sinT * dt;
  if (vt > vmax) vt = Math.max(vmax, vt - 3600 * dt);
  else if (vt < -1500) vt = -1500;
  if (inx && Math.abs(vt) < 90) c.face = inx;

  // rundeln börjar vid x0: därifrån följer bilen cirkelbågen
  if (vt > 0 && c.xc < WALL.x0 && c.xc + vt * fr.inv * dt >= WALL.x0) {
    enterArc(vt, 0);
    arcStep(dt, inx, boost);
    return;
  }

  // förväntad mittpunkt längs filtrerad riktning, och närmaste punkt på ytan
  const ex = c.x + vt * c.dx * dt, ey = c.y + vt * c.dy * dt;
  const near = nearestOnSurface(ex, ey, c.xc + vt * fr.inv * dt, fr.inv);
  const fr2 = frameAt(near.x);
  const xc = near.x;
  const rise = fr.py - fr2.py;                        // positivt = nya punkten är högre
  if (rise > Math.abs(vt) * dt * 1.25 + 12) {         // vägg som man kör in i
    if (Math.abs(vt) > 150) bump(clamp(Math.abs(vt) / 1500, 0.2, 0.7));
    vt = -vt * 0.25;
    c.vt = vt; c.vx = vt * c.dx; c.vy = vt * c.dy;
    return;
  }
  c.vt = vt;
  if (near.d > H0 + 2.5) {                            // ytan försvinner under bilen (krön, ramp, kant)
    c.vx = vt * c.dx; c.vy = vt * c.dy;
    c.grounded = false; c.x = ex; c.y = ey;
  } else {
    c.xc = xc; c.x = fr2.px + fr2.rx * H0; c.y = fr2.py + fr2.ry * H0;
    // riktningen följer ytan med lite eftersläpning
    const nx = c.dx + (fr2.inv - c.dx) * 0.4, ny = c.dy + (fr2.sl * fr2.inv - c.dy) * 0.4;
    const nl = Math.hypot(nx, ny) || 1;
    c.dx = nx / nl; c.dy = ny / nl;
    c.vx = vt * c.dx; c.vy = vt * c.dy;
  }
}

function airStep(dt, inx, fly, boost) {
  const c = car;
  const ax = axes(c);
  let aX = 0, aY = G;
  if (fly) {
    const f = clamp((c.y - ALT_MAX) / (ALT_SOFT - ALT_MAX), 0, 1);      // thrustrarna tappar kraft på extrem höjd
    aX += ax.rx * THR * f; aY += ax.ry * THR * f;
  } else aX += inx * 260;
  if (boost) { aX += ax.fx * 1500; aY += ax.fy * 1500; }
  c.vx += aX * dt; c.vy += aY * dt;
  c.vx *= Math.exp(-(fly ? 1.3 : 0.18) * dt);
  c.vy *= Math.exp(-(fly ? 1.6 : 0.05) * dt);
  const sp = Math.hypot(c.vx, c.vy), cap = VBOOST * 1.25;
  if (sp > cap) { c.vx *= cap / sp; c.vy *= cap / sp; }
  if (inx && (fly || Math.abs(c.vx) < 160 || Math.sign(c.vx) === inx)) c.face = inx;
  const ox = c.x, oy = c.y;
  c.x += c.vx * dt; c.y += c.vy * dt;

  // kontakt med marken (eller rundeln)
  let xc = c.x;
  let fr;
  for (let i = 0; i < 4; i++) { fr = frameAt(xc); xc = c.x - fr.rx * H0; }
  fr = frameAt(xc);
  const dist = (c.x - fr.px) * fr.rx + (c.y - fr.py) * fr.ry;
  const pen = H0 - dist;
  if (pen > 0) {
    const vn = c.vx * fr.rx + c.vy * fr.ry;           // negativ = på väg in i ytan
    if (pen > Math.hypot(c.vx, c.vy) * dt * 1.25 + 14) {
      // sidokrock mot vägg/bil: studsa tillbaka
      c.x = ox; c.y = oy;
      if (Math.hypot(c.vx, c.vy) > 250) { bump(0.5); if (air) air.crashed = true; }
      c.vx = -c.vx * 0.3; c.vy *= 0.5;
    } else if (vn <= 0 || pen > 6) {
      const onWall = xc > WALL.x0 + 1 && xc < WALL.xLow;
      let info;
      if (onWall) {                                    // landar på rundeln: fortsätt längs cirkelbågen
        const th = Math.asin(clamp((xc - WALL.x0) / WALL.R, 0, 1));
        const vt = c.vx * Math.cos(th) - c.vy * Math.sin(th);
        info = { vn: Math.max(0, -vn), err: wrap(c.a + th), crash: false };
        enterArc(vt, th);
        const p = arcCenter(th);
        c.x = p.x; c.y = p.y; c.dx = Math.cos(th); c.dy = -Math.sin(th);
        c.vx = vt * c.dx; c.vy = vt * c.dy;
      } else {
        info = { vn: Math.max(0, -vn), err: wrap(c.a - Math.atan(fr.sl)), crash: false };
        c.xc = xc;
        c.x = fr.px + fr.rx * H0; c.y = fr.py + fr.ry * H0;
        const tx = fr.inv, ty = fr.sl * fr.inv;
        const vt = c.vx * tx + c.vy * ty;
        c.vt = vt; c.vx = vt * tx; c.vy = vt * ty; c.dx = tx; c.dy = ty;
      }
      // tunnrullen måste vara klar - annars landar man på sidan / upp och ner
      const rollErr = Math.abs(wrap(c.roll));
      if (rollErr > Math.abs(info.err)) info.err = rollErr;
      info.crash = Math.abs(info.err) > 1.2;
      c.grounded = true;
      c.rollRem = 0; c.pr = 0;
      land(info);
      c.landInfo = info;
    }
  }
  if (!c.grounded) c.vt = c.vx;
}

// parkerade bilar är fasta hinder: nosen/aktern stoppar mot sidan
function vehCollide() {
  const c = car;
  if (c.arc) return;
  const dir = c.vx >= 0 ? 1 : -1;
  const bottom = c.y + 17;
  for (const v of VEH) {
    if (bottom <= v.topY + 6) continue;                // ovanpå eller över bilen
    const nose = c.x + dir * 58;
    if (dir > 0 && nose > v.x0 && c.x < v.x1 - 6 && c.x < v.x0 + v.w * 0.5) {
      c.x = v.x0 - 58;
    } else if (dir < 0 && nose < v.x1 && c.x > v.x0 + 6 && c.x > v.x0 + v.w * 0.5) {
      c.x = v.x1 + 58;
    } else continue;
    if (Math.abs(c.vx) > 200) { bump(0.55); if (air) air.crashed = true; }
    c.vx = -c.vx * 0.3; c.vy *= 0.5; c.vt = -c.vt * 0.3;
    if (c.grounded) c.xc = c.x;
  }
}

// banans slut: barriärer i båda ändar
function boundsCollide() {
  const c = car;
  if (c.x > END_X - 62) {
    c.x = END_X - 62; if (c.vx > 200) { bump(0.6); if (air) air.crashed = true; }
    c.vx = -Math.abs(c.vx) * 0.25; c.vt = -Math.abs(c.vt) * 0.25; if (c.grounded) c.xc = c.x;
  } else if (c.x < START_X + 62) {
    c.x = START_X + 62; if (c.vx < -200) { bump(0.6); if (air) air.crashed = true; }
    c.vx = Math.abs(c.vx) * 0.25; c.vt = Math.abs(c.vt) * 0.25; if (c.grounded) c.xc = c.x;
  }
}

function update(dt) {
  const c = car;
  time += dt;
  const inx = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
  const fly = inp.fly, boost = inp.boost;
  c.flying = fly;
  if (inp.spinQ) { inp.spinQ = false; doSpin(); }

  const wasGrounded = c.grounded;
  c.landInfo = null;

  if (c.grounded && (!fly || c.arc)) groundStep(dt, inx, boost);   // på rundeln gäller banans fysik
  else { c.grounded = false; c.arc = null; airStep(dt, inx, fly, boost); }

  vehCollide();
  boundsCollide();
  if (wasGrounded && !c.grounded) { beginAir(); if (c.spinBuf > 0) doSpin(); }
  c.spinBuf = Math.max(0, c.spinBuf - dt);
  if (!c.grounded) trackAir();
  if (!wasGrounded && c.grounded) endAir(c.landInfo);

  // ---- lutning (pitch) ----
  if (c.grounded) {
    const at = c.arc ? -c.arc.th : Math.atan(slopeOf(c.xc));
    c.a = damp(c.a, at, 16, dt);
  } else if (c.pr) {
    c.a += c.pr * dt;                                  // loopen från rundeln fortsätter tills bilen är på hjulen igen
    if (c.a <= -TAU) {
      c.a = 0; c.pr = 0;
      if (air) air.loops++;
    }
  } else {
    if (Math.abs(c.a) > Math.PI) c.a = wrap(c.a);
    let at, rate;
    if (fly || inx) { at = inx * 0.72; rate = 6; } else { at = 0; rate = 2.2; }
    c.a = damp(c.a, at, rate, dt);
  }

  // ---- tunnrulle (åt sidan) ----
  if (!c.grounded && c.rollRem > 0) {
    const d = Math.min(c.rollRem, ROLL_W * dt);
    c.roll += d; c.rollRem -= d;
    if (air) air.rollTotal += d;
    if (c.rollRem <= 1e-4) { c.rollRem = 0; c.roll = wrap(c.roll); }
  } else if (c.grounded) {
    c.roll = damp(wrap(c.roll), 0, 14, dt);
  } else {
    c.roll = damp(wrap(c.roll), 0, 10, dt);
  }
  c.faceVis = damp(c.faceVis, c.face, 14, dt);
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
    const surf = floorY(c.x);
    if (surf - c.y < 130 && Math.random() < 0.9) {
      emit(c.x + rnd(-50, 50), surf, rnd(-360, 360), -rnd(20, 90), rnd(0.35, 0.7), rnd(16, 30), "dust", 26, false);
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
    emit(p.x, p.y, -c.vx * 0.15 + rnd(-40, 40), -rnd(30, 120), rnd(0.3, 0.6), rnd(10, 20), "dust", 22, false);
    if (Math.abs(c.vt) > 1000) emit(p.x, p.y, -c.vx * 0.2, -rnd(60, 200), rnd(0.15, 0.3), rnd(5, 9), "spark", -10);
  }

  // ---- statistik ----
  const kmh = spd * 0.18;
  if (kmh > save.top) save.top = Math.round(kmh);

  // ---- kamera (följer upp i luften och zoomar ut för att se marken) ----
  let tz = 1, ty = CAM_Y;
  {
    const topY = Math.min(c.y, c.y + c.vy * 0.3) - 150, botY = 90;
    const span = botY - topY;
    if (span > VIEW_H) { tz = VIEW_H / span; ty = (topY + botY) / 2; }
  }
  zoom = damp(zoom, tz, tz < zoom ? 7 : 2.5, dt);        // zoomar ut snabbt, in långsamt
  camYv = damp(camYv, ty, ty < camYv ? 7 : 2.5, dt);
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

  audioFrame(spd, fly, boost);
}
const streaks = [];

/* =====================================================================
   RITNING
   ===================================================================== */
const sx = (wx) => (wx - camX) * sc + W / 2;
const sy = (wy) => (wy - camYv) * sc + Hs / 2;

const stars = Array.from({ length: 90 }, (_, i) => ({ x: hash(i), y: hash(i + 99) * 0.75, r: 0.4 + hash(i + 7) * 1.1, a: 0.3 + hash(i + 3) * 0.7 }));

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
    const px = ((s.x * W * 1.4 - camX * baseSc * 0.02) % W + W) % W;
    ctx.fillRect(px, s.y * Hs, s.r, s.r);
  }
  ctx.globalAlpha = 1;

  // måne
  const mx = W * 0.78 - camX * baseSc * 0.01, my = Hs * 0.3, mr = Hs * 0.065;
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.5; ctx.drawImage(glow.white, mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#dfe9f5"; ctx.beginPath(); ctx.arc(mx, my, mr, 0, TAU); ctx.fill();
  ctx.fillStyle = "rgba(120,140,170,0.35)";
  ctx.beginPath(); ctx.arc(mx - mr * 0.3, my - mr * 0.1, mr * 0.28, 0, TAU); ctx.arc(mx + mr * 0.35, my + mr * 0.35, mr * 0.18, 0, TAU); ctx.fill();

  // skyline
  const base = sy(60);
  if (base < Hs + 600) {
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
    const hz = ctx.createLinearGradient(0, base - 160 * sc, 0, base + 40 * sc);
    hz.addColorStop(0, "rgba(40,90,140,0)");
    hz.addColorStop(1, "rgba(60,130,190,0.28)");
    ctx.fillStyle = hz; ctx.fillRect(0, base - 160 * sc, W, 200 * sc);
  }
}

// punkter längs marken, tätare där den är brant
function surfacePts(x0, x1) {
  const pts = [];
  let x = x0;
  while (x < x1) {
    pts.push(x);
    const sl = Math.abs(slopeOf(x));
    x += clamp(14 / (1 + sl * 1.5), 1.2, 14);
  }
  pts.push(x1);
  return pts;
}

// ritar polylinjen i två färger beroende på pred(x); hide(x) = rita inte
function strokeRuns(xs, ys, pred, styleA, widthA, styleB, widthB, hide) {
  for (const pass of [0, 1]) {
    ctx.beginPath();
    let open = false;
    for (let i = 0; i < xs.length; i++) {
      const on = !(hide && hide(xs[i])) && (pass === 1 ? pred(xs[i]) : !pred(xs[i]));
      if (on) { if (!open) { ctx.moveTo(sx(xs[i]), ys[i]); open = true; } else ctx.lineTo(sx(xs[i]), ys[i]); }
      else open = false;
    }
    ctx.strokeStyle = pass === 1 ? styleB : styleA;
    ctx.lineWidth = pass === 1 ? widthB : widthA;
    ctx.stroke();
  }
}

function chevrons(bx, len) {
  ctx.fillStyle = "rgba(255,200,40,0.9)";
  for (let i = 0; i < 4; i++) {
    const x = bx + 40 + i * (len / 5);
    ctx.beginPath();
    ctx.moveTo(sx(x), sy(floorY(x) + 8)); ctx.lineTo(sx(x + 20), sy(floorY(x + 20) + 8));
    ctx.lineTo(sx(x + 8), sy(floorY(x + 8) + 16)); ctx.lineTo(sx(x - 12), sy(floorY(x - 12) + 16));
    ctx.closePath(); ctx.fill();
  }
}

function drawRoad() {
  const x0 = Math.floor((camX - W / 2 / sc - 80) / 14) * 14;
  const x1 = camX + W / 2 / sc + 80;
  const pts = surfacePts(Math.max(x0, START_X - 300), Math.min(x1, END_X + 300));
  if (pts.length < 2) return;
  const fYs = pts.map((x) => sy(floorY(x)));
  const xa = pts[0], xb = pts[pts.length - 1];

  ctx.beginPath();
  pts.forEach((x, i) => (i ? ctx.lineTo(sx(x), fYs[i]) : ctx.moveTo(sx(x), fYs[i])));
  ctx.lineTo(sx(xb), Hs + 400); ctx.lineTo(sx(xa), Hs + 400); ctx.closePath();
  const fg = ctx.createLinearGradient(0, sy(40), 0, Math.max(sy(40) + 50, sy(400)));
  fg.addColorStop(0, "#131b29"); fg.addColorStop(1, "#04060a");
  ctx.fillStyle = fg; ctx.fill();
  ctx.beginPath();
  pts.forEach((x, i) => (i ? ctx.lineTo(sx(x), fYs[i]) : ctx.moveTo(sx(x), fYs[i])));
  for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(sx(pts[i]), fYs[i] + 20 * sc);
  ctx.closePath(); ctx.fillStyle = "#1c2738"; ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.38)"; ctx.lineWidth = 3 * sc;
  ctx.beginPath();
  for (let x = Math.floor(xa / 110) * 110; x < xb; x += 110) {
    if (Math.abs(slopeOf(x)) > 1 || Math.abs(slopeOf(x + 50)) > 1) continue;
    if (x > VEH[0].x0 - 40 && x < VEH[3].x1 + 20) continue;
    ctx.moveTo(sx(x), sy(floorY(x) + 10)); ctx.lineTo(sx(x + 50), sy(floorY(x + 50) + 10));
  }
  ctx.stroke();
  const inZone = (x) => zoneF(x) > 0.5;
  const underCars = (x) => x > VEH[0].x0 - 14 && x < VEH[VEH.length - 1].x1 + 14;   // bilarna täcker ytan
  const underWall = (x) => x > WALL.x0 + 1 && x < WALL.xLow + 2;                    // rundeln ritas separat
  const hide = (x) => underCars(x) || underWall(x);
  strokeRuns(pts, fYs, inZone, "rgba(62,224,255,0.18)", 12 * sc, "rgba(255,59,74,0.2)", 12 * sc, hide);
  strokeRuns(pts, fYs, inZone, "rgba(110,235,255,0.95)", 2.4 * sc, "rgba(255,90,100,0.95)", 2.4 * sc, hide);

  // ---- gatlyktor ----
  ctx.globalCompositeOperation = "lighter";
  for (let x = Math.floor(xa / 520) * 520; x < xb; x += 520) {
    if (zoneF(x) > 0.02 || x < START_X + 100 || x > END_X - 150) continue;
    const px = sx(x), gy = sy(floorY(x)), top = gy - 175 * sc;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#202b3c"; ctx.lineWidth = 5 * sc;
    ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, top); ctx.quadraticCurveTo(px, top - 14 * sc, px + 26 * sc, top - 14 * sc); ctx.stroke();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.85; ctx.drawImage(glow.white, px + 26 * sc - 60 * sc, top - 14 * sc - 60 * sc, 120 * sc, 120 * sc);
    ctx.globalAlpha = 1;
  }
  ctx.globalCompositeOperation = "source-over";

  // ramp-varningsmarkering
  for (let k = Math.floor((xa - 1500) / 2700); k * 2700 + 1500 < xb; k++) {
    const bx = k * 2700 + 1500;
    if (bx + 270 < xa || zoneF(bx + 135) > 0.3 || bx < START_X + 50 || bx > END_X - 400) continue;
    chevrons(bx, 270);
  }
  if (RAMP.x + 300 > xa && RAMP.x < xb) chevrons(RAMP.x, RAMP.len);
}

/* ---------- arenornas rekvisita ---------- */
function drawVehicle(v) {
  if (sx(v.x1) < -20 || sx(v.x0) > W + 20) return;
  const w = v.w, h = v.h;
  ctx.save();
  ctx.translate(sx(v.x0), sy(0));
  ctx.scale(sc, sc);
  ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.beginPath(); ctx.ellipse(w / 2, 1, w * 0.55, 5, 0, 0, TAU); ctx.fill();
  const wheel = (x, r) => {
    ctx.fillStyle = "#06080c"; ctx.beginPath(); ctx.arc(x, -r, r, 0, TAU); ctx.fill();
    ctx.fillStyle = "#8a93a0"; ctx.beginPath(); ctx.arc(x, -r, r * 0.55, 0, TAU); ctx.fill();
    ctx.fillStyle = "#1d2330"; ctx.beginPath(); ctx.arc(x, -r, r * 0.2, 0, TAU); ctx.fill();
  };
  const shade = () => {
    const sh = ctx.createLinearGradient(0, -h, 0, 0);
    sh.addColorStop(0, "rgba(255,255,255,0.35)"); sh.addColorStop(0.5, "rgba(255,255,255,0)"); sh.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = sh; ctx.fill();
  };
  if (v.type === "model3" || v.type === "modelY") {
    const roof = v.type === "modelY" ? h - 3 : h - 4;
    const rx0 = v.type === "modelY" ? 34 : 44, rx1 = v.type === "modelY" ? 100 : 84;
    ctx.beginPath();
    ctx.moveTo(2, -10); ctx.lineTo(3, -h * 0.5);
    ctx.quadraticCurveTo(10, -h * 0.58, 28, -h * 0.6);
    ctx.quadraticCurveTo(rx0 - 6, -roof, rx0 + 6, -roof);
    ctx.lineTo(rx1, -roof);
    ctx.quadraticCurveTo(rx1 + 14, -h * 0.62, w - 14, -h * 0.5);
    ctx.quadraticCurveTo(w - 2, -h * 0.45, w - 2, -h * 0.28);
    ctx.lineTo(w - 2, -9); ctx.lineTo(2, -9); ctx.closePath();
    ctx.fillStyle = v.color; ctx.fill(); shade();
    ctx.beginPath();
    ctx.moveTo(rx0 + 2, -roof + 4); ctx.lineTo(rx1 - 2, -roof + 4);
    ctx.quadraticCurveTo(rx1 + 8, -h * 0.62, rx1 + 12, -h * 0.55); ctx.lineTo(rx0 - 10, -h * 0.55);
    ctx.quadraticCurveTo(rx0 - 6, -roof + 6, rx0 + 2, -roof + 4);
    ctx.fillStyle = "#0b1624"; ctx.fill();
    wheel(24, 14); wheel(w - 26, 14);
    ctx.fillStyle = "#ffffff"; ctx.fillRect(w - 6, -h * 0.4, 5, 3);
    ctx.fillStyle = "#ff3040"; ctx.fillRect(1, -h * 0.4, 4, 5);
  } else if (v.type === "semi") {
    ctx.beginPath();
    ctx.moveTo(0, -12); ctx.lineTo(0, -34); ctx.lineTo(8, -34); ctx.lineTo(8, -h + 10);
    ctx.quadraticCurveTo(8, -h, 20, -h); ctx.lineTo(128, -h);
    ctx.lineTo(176, -h * 0.55); ctx.lineTo(w - 2, -h * 0.4); ctx.lineTo(w - 2, -12); ctx.closePath();
    ctx.fillStyle = v.color; ctx.fill(); shade();
    ctx.beginPath(); ctx.moveTo(132, -h + 8); ctx.lineTo(172, -h * 0.56); ctx.lineTo(132, -h * 0.56); ctx.closePath();
    ctx.fillStyle = "#0b1624"; ctx.fill();
    ctx.fillStyle = "#1a2230"; ctx.fillRect(8, -34, w - 10, 6);
    wheel(46, 17); wheel(82, 17); wheel(w - 38, 17);
    ctx.fillStyle = "#cfefff"; ctx.fillRect(w - 6, -h * 0.5, 5, 4);
    ctx.fillStyle = "#ff3040"; ctx.fillRect(1, -40, 4, 6);
  } else {
    ctx.beginPath();
    ctx.moveTo(2, -10); ctx.lineTo(3, -h * 0.62); ctx.lineTo(54, -h * 0.66);
    ctx.lineTo(112, -h); ctx.lineTo(w - 2, -h * 0.5); ctx.lineTo(w - 2, -10); ctx.closePath();
    ctx.fillStyle = v.color; ctx.fill(); shade();
    ctx.strokeStyle = "rgba(0,0,0,0.45)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(54, -h * 0.66); ctx.lineTo(54, -12); ctx.moveTo(112, -h); ctx.lineTo(96, -12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(60, -h * 0.7); ctx.lineTo(108, -h + 4); ctx.lineTo(122, -h * 0.58); ctx.lineTo(60, -h * 0.58); ctx.closePath();
    ctx.fillStyle = "#0b1624"; ctx.fill();
    wheel(32, 17); wheel(w - 34, 17);
    ctx.fillStyle = "#cfefff"; ctx.fillRect(w - 8, -h * 0.55, 6, 3);
  }
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.7; ctx.drawImage(glow.white, w - 14, -h * 0.55 - 12, 40, 28);
  ctx.globalAlpha = 0.6; ctx.drawImage(glow.red, -22, -h * 0.45 - 10, 36, 26);
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawSign(x, text, color, sub) {
  const px = sx(x);
  if (px < -300 || px > W + 300) return;
  const py = sy(-250);
  ctx.save();
  ctx.strokeStyle = "#1f2a3b"; ctx.lineWidth = 4 * sc;
  ctx.beginPath(); ctx.moveTo(px - 120 * sc, sy(0)); ctx.lineTo(px - 120 * sc, py + 28 * sc); ctx.moveTo(px + 120 * sc, sy(0)); ctx.lineTo(px + 120 * sc, py + 28 * sc); ctx.stroke();
  ctx.fillStyle = "rgba(8,12,20,0.9)"; ctx.strokeStyle = color; ctx.lineWidth = 2 * sc;
  const bw = 270 * sc, bh = 58 * sc;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(px - bw / 2, py - bh / 2, bw, bh, 8 * sc); else ctx.rect(px - bw / 2, py - bh / 2, bw, bh);
  ctx.fill(); ctx.stroke();
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `700 ${26 * sc}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = color; ctx.globalAlpha = 0.35;
  ctx.fillText(text, px, py - 6 * sc, bw - 20 * sc); ctx.fillText(text, px, py - 6 * sc, bw - 20 * sc);
  ctx.globalAlpha = 1; ctx.fillStyle = "#fff";
  ctx.fillText(text, px, py - 6 * sc, bw - 20 * sc);
  ctx.font = `600 ${11 * sc}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(sub, px, py + 17 * sc, bw - 20 * sc);
  ctx.restore();
}

// barriär i banans ändar, med varningsrandor (dir: 1 = slutet åt höger, -1 = starten åt vänster)
function drawBarrier(x, dir, label) {
  const px = sx(x);
  if (px < -400 || px > W + 400) return;
  const top = sy(-330), bot = sy(60), w = 170 * sc * dir;
  ctx.save();
  ctx.fillStyle = "#0b111b"; ctx.fillRect(Math.min(px, px + w), top, Math.abs(w), bot - top);
  // varningsrandor längs framkanten
  ctx.save();
  ctx.beginPath(); ctx.rect(dir > 0 ? px : px - 24 * sc, top, 24 * sc, bot - top); ctx.clip();
  ctx.fillStyle = "#ffd23f"; ctx.fillRect(px - 40 * sc, top, 80 * sc, bot - top);
  ctx.fillStyle = "#14181f";
  for (let y = top - 40 * sc; y < bot; y += 36 * sc) {
    ctx.beginPath(); ctx.moveTo(px - 40 * sc, y); ctx.lineTo(px + 40 * sc, y + 28 * sc); ctx.lineTo(px + 40 * sc, y + 46 * sc); ctx.lineTo(px - 40 * sc, y + 18 * sc); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  // röd neonkant
  ctx.strokeStyle = "rgba(255,59,74,0.3)"; ctx.lineWidth = 12 * sc;
  ctx.beginPath(); ctx.moveTo(px, top); ctx.lineTo(px, bot); ctx.stroke();
  ctx.strokeStyle = "rgba(255,95,105,1)"; ctx.lineWidth = 2.4 * sc; ctx.stroke();
  // text
  ctx.translate(px + 96 * sc * dir, sy(-135)); ctx.rotate((-Math.PI / 2) * dir);
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `800 ${34 * sc}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fillText(label, 0, 0);
  ctx.restore();
}

function drawWall() {
  const R = WALL.R, cx = WALL.x0, cy = -R, ro = R + 26;
  if (sx(WALL.xMax + 140) < 0 || sx(WALL.x0 - 40) > W) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, -2000, W, sy(3) + 2000); ctx.clip();

  // stålstomme bakom och under rundeln
  const xcol = cx + ro + 14;
  const ytop = WALL.lipY - 40;
  ctx.strokeStyle = "#56606c"; ctx.lineWidth = 2.2 * sc;
  ctx.beginPath();
  ctx.moveTo(sx(xcol), sy(0)); ctx.lineTo(sx(xcol), sy(ytop));
  ctx.moveTo(sx(xcol + 30), sy(0)); ctx.lineTo(sx(xcol + 30), sy(ytop));
  for (let y = 0, i = 0; y > ytop; y -= 38, i++) {
    ctx.moveTo(sx(xcol + (i % 2 ? 30 : 0)), sy(y)); ctx.lineTo(sx(xcol + (i % 2 ? 0 : 30)), sy(y - 38));
    ctx.moveTo(sx(xcol), sy(y)); ctx.lineTo(sx(xcol + 30), sy(y));
  }
  ctx.stroke();
  ctx.lineWidth = 1.4 * sc; ctx.strokeStyle = "#3d4650";
  ctx.beginPath();
  for (let th = 0.25; th <= WALL.thMax + 0.01; th += 0.2) {
    const px = cx + ro * Math.sin(th), py = cy + ro * Math.cos(th);
    ctx.moveTo(sx(px), sy(py)); ctx.lineTo(sx(xcol), sy(Math.min(0, py + 60)));
  }
  ctx.stroke();

  // betongskal
  const N = 64;
  ctx.beginPath();
  for (let i = 0; i <= N; i++) { const th = (WALL.thMax * i) / N; ctx.lineTo(sx(cx + R * Math.sin(th)), sy(cy + R * Math.cos(th))); }
  for (let i = N; i >= 0; i--) { const th = (WALL.thMax * i) / N; ctx.lineTo(sx(cx + ro * Math.sin(th)), sy(cy + ro * Math.cos(th))); }
  ctx.closePath();
  const cg = ctx.createLinearGradient(0, sy(WALL.lipY), 0, sy(0));
  cg.addColorStop(0, "#a4a8ad"); cg.addColorStop(1, "#4b5057");
  ctx.fillStyle = cg; ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.18)"; ctx.lineWidth = 1 * sc;
  ctx.beginPath();
  for (let th = 0.1; th < WALL.thMax; th += 0.14) {
    ctx.moveTo(sx(cx + R * Math.sin(th)), sy(cy + R * Math.cos(th))); ctx.lineTo(sx(cx + ro * Math.sin(th)), sy(cy + ro * Math.cos(th)));
  }
  ctx.stroke();

  // röd neonkant längs körytan
  ctx.beginPath();
  for (let i = 0; i <= N; i++) { const th = (WALL.thMax * i) / N; ctx.lineTo(sx(cx + R * Math.sin(th)), sy(cy + R * Math.cos(th))); }
  ctx.strokeStyle = "rgba(255,59,74,0.25)"; ctx.lineWidth = 14 * sc; ctx.stroke();
  ctx.strokeStyle = "rgba(255,95,105,1)"; ctx.lineWidth = 3 * sc; ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 2 * sc;
  ctx.beginPath();
  for (let th = 0.05; th < WALL.thMax - 0.1; th += 0.16) {
    ctx.moveTo(sx(cx + (R + 9) * Math.sin(th)), sy(cy + (R + 9) * Math.cos(th)));
    ctx.lineTo(sx(cx + (R + 9) * Math.sin(th + 0.07)), sy(cy + (R + 9) * Math.cos(th + 0.07)));
  }
  ctx.stroke();
  ctx.restore();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.7;
  ctx.drawImage(glow.red, sx(WALL.lipX) - 60 * sc, sy(WALL.lipY) - 60 * sc, 120 * sc, 120 * sc);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
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
  const surf = floorY(c.x);
  const gap = Math.abs(surf - c.y);
  if (gap < 160 && Math.abs(slopeOf(c.x)) < 2 && !c.arc) {
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = clamp(1 - gap / 160, 0, 1) * (c.flying ? 0.9 : 0.45);
    ctx.drawImage(glow[c.flying ? "white" : "cyan"], sx(c.x) - 90 * k, sy(surf) - 24 * k, 180 * k, 48 * k);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  }

  // tunnrulle: bilen vrids runt sin längdaxel och syns uppifrån/underifrån (cos) i sidovy
  let vr = Math.cos(c.roll);
  if (Math.abs(vr) < 0.08) vr = vr < 0 ? -0.08 : 0.08;

  ctx.save();
  ctx.translate(sx(c.x), sy(c.y));
  // lokala axlar: x = framåt, y = mot hjulen
  ctx.transform(c.faceVis * ca * k, c.faceVis * vr * sa * k, -sa * k, vr * ca * k, 0, 0);

  const paint = PAINT[save.color] || PAINT[0];

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

  ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(-14, -5); ctx.lineTo(16, -5); ctx.stroke();

  ctx.fillStyle = "#fff"; ctx.fillRect(59, -8, 7, 3);
  ctx.fillStyle = "#ff3040"; ctx.fillRect(-65, -11, 3, 7);
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(glow.red, -86, -22, 44, 36);
  ctx.globalAlpha = 0.8;
  ctx.drawImage(glow.white, 60, -22, 54, 36);
  ctx.globalAlpha = 1;

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
  sc = baseSc * zoom;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const shx = shake ? rnd(-shake, shake) : 0, shy = shake ? rnd(-shake, shake) : 0;
  ctx.save();
  ctx.translate(shx, shy);
  drawSky();
  drawRoad();
  drawWall();
  for (const v of VEH) drawVehicle(v);
  drawBarrier(START_X, -1, "START");
  drawBarrier(END_X, 1, "BANANS SLUT");
  drawSign(4380, "BILHOPPET", "#3ee0ff", "Boost + ramp = flyg över bilarna");
  drawSign(8150, "VÄGGEN", "#ff5a64", "Boost upp i rundeln - loopa tillbaka");
  drawSign(END_X - 330, "SLUT", "#ffd23f", "Vänd om - längre går det inte");
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
let hudSpd = -1, hudArea = "", hudFly = null, hudAir = "";
function areaName(x) {
  if (x >= ZONES[0].a - 100 && x <= ZONES[0].b) return "BILHOPPET";
  if (x >= ZONES[1].a - 100 && x <= ZONES[1].b) return "VÄGGEN";
  return "SANDLÅDA";
}
function updateHud() {
  const c = car;
  const kmh = Math.round(Math.hypot(c.vx, c.vy) * 0.18);
  if (kmh !== hudSpd) { hudSpd = kmh; $("#spd").textContent = kmh; }
  const area = areaName(c.x);
  if (area !== hudArea) { hudArea = area; $("#modeChip").textContent = area; }
  if (c.flying !== hudFly) { hudFly = c.flying; $("#flyChip").hidden = !c.flying; }
  let txt = "";
  if (air && !c.grounded) {
    const fl = airFlips(air);
    if (air.maxH > 120 || fl > 0 || air.over.size) txt = `${fl ? "SNURR ×" + fl + "  ·  " : ""}${Math.round(air.maxH * 0.05)} m`;
  }
  if (txt !== hudAir) { hudAir = txt; const ch = $("#stuntChip"); ch.textContent = txt; ch.hidden = !txt; }
}

function showStats() {
  const l = [];
  if (save.best) l.push(`Bästa betyg ${save.best}/100 ${"★".repeat(save.stars)}`);
  if (save.top) l.push(`Toppfart ${save.top} km/h`);
  if (save.high) l.push(`Högsta hopp ${save.high} m`);
  if (save.maxFlips) l.push(`Flest snurr ${save.maxFlips}`);
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

const SPAWNS = [{ x: 0, label: "Sandlåda" }, { x: 4150, label: "Bilhoppet" }, { x: 7800, label: "Väggen" }];
let spawnSel = 0;
function buildSpawn() {
  const box = $("#spawn");
  box.innerHTML = "";
  SPAWNS.forEach((sp, i) => {
    const b = document.createElement("button");
    b.textContent = sp.label;
    if (i === spawnSel) b.classList.add("sel");
    b.addEventListener("click", () => { spawnSel = i; resetCar(sp.x); buildSpawn(); });
    box.appendChild(b);
  });
}

function openMenu() {
  paused = true;
  clearInput();
  showStats(); buildPaint(); buildSpawn();
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
const holds = { left: new Set(), right: new Set(), fly: new Set(), boost: new Set(), spin: new Set() };
const kb = { left: false, right: false, fly: false, boost: false };
function syncInput() {
  inp.left = holds.left.size > 0 || kb.left;
  inp.right = holds.right.size > 0 || kb.right;
  inp.fly = holds.fly.size > 0 || kb.fly;
  inp.boost = holds.boost.size > 0 || kb.boost;
  document.querySelectorAll(".btn").forEach((b) => {
    const a = b.dataset.act;
    const on = (a === "left" && inp.left) || (a === "right" && inp.right) || (a === "fly" && inp.fly) || (a === "boost" && inp.boost) || (a === "spin" && holds.spin.size > 0);
    b.classList.toggle("on", on);
  });
}
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
    if (act === "spin") inp.spinQ = true;
    syncInput();
  });
  const up = (e) => { holds[act].delete(e.pointerId); syncInput(); };
  b.addEventListener("pointerup", up);
  b.addEventListener("pointercancel", up);
  b.addEventListener("lostpointercapture", up);
  b.addEventListener("contextmenu", (e) => e.preventDefault());
});
document.addEventListener("touchmove", (e) => { if (!e.target.closest("#menu")) e.preventDefault(); }, { passive: false });
document.addEventListener("gesturestart", (e) => e.preventDefault());
let lastTap = 0;
document.addEventListener("touchend", (e) => { const n = Date.now(); if (n - lastTap < 350 && !e.target.closest("#menu")) e.preventDefault(); lastTap = n; }, { passive: false });

const KEYMAP = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowUp: "fly", w: "fly", W: "fly", " ": "fly", Shift: "boost" };
const isSpinKey = (k) => k === "e" || k === "E" || k === "x" || k === "X" || k === "ArrowDown" || k === "s" || k === "S";
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.key === "Escape" || e.key === "p" || e.key === "P") { paused ? (started && closeMenu()) : openMenu(); return; }
  if (paused) { if (e.key === "Enter") closeMenu(); return; }
  if (isSpinKey(e.key)) { inp.spinQ = true; holds.spin.add(-2); syncInput(); return; }
  const k = KEYMAP[e.key];
  if (k) { kb[k] = true; e.preventDefault(); syncInput(); }
});
window.addEventListener("keyup", (e) => {
  if (isSpinKey(e.key)) { holds.spin.delete(-2); syncInput(); return; }
  const k = KEYMAP[e.key];
  if (k) { kb[k] = false; syncInput(); }
});
window.addEventListener("blur", () => { clearInput(); if (started && !paused) openMenu(); });
document.addEventListener("visibilitychange", () => { if (document.hidden) { clearInput(); if (started && !paused) openMenu(); } else if (actx && actx.state === "suspended" && !paused) actx.resume(); });
window.addEventListener("pagehide", store);

/* =====================================================================
   OFFLINE (service worker + status i menyn)
   ===================================================================== */
const offlineEl = $("#offline");
const standalone = !!(window.navigator.standalone || (window.matchMedia && matchMedia("(display-mode: standalone)").matches));
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function setOffline(state) {
  if (!offlineEl) return;
  let txt = "", cls = "offline";
  if (state === "ready") {
    cls += " ok";
    txt = standalone ? "✓ Klar för offline - spelet startar utan nät"
      : "✓ Nedladdat för offline" + (isIOS ? " - tryck Dela och Lägg till på hemskärmen för att spela som app" : "");
  } else if (state === "loading") { cls += " wait"; txt = "Laddar ned för offline..."; }
  else if (state === "unsupported") {
    cls += " hint"; txt = "Offline stöds inte i den här webbläsaren";
  }
  offlineEl.className = cls; offlineEl.textContent = txt; offlineEl.hidden = !txt;
}
async function checkOffline() {
  try {
    const need = ["game.js", "index.html", "style.css"];
    const hits = await Promise.all(need.map((n) => caches.match(n, { ignoreSearch: true })));
    return hits.every(Boolean);
  } catch (e) { return false; }
}
if ("serviceWorker" in navigator && "caches" in window && location.protocol !== "file:") {
  setOffline("loading");
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("message", (e) => { if (e.data && e.data.type === "offline-ready") checkOffline().then((ok) => ok && setOffline("ready")); });
  // ny version av appen har tagit över: ladda om medan man fortfarande står i menyn
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && !started) location.reload(); });
  navigator.serviceWorker.register("sw.js").then(() => navigator.serviceWorker.ready)
    .then(() => checkOffline()).then((ok) => setOffline(ok ? "ready" : "loading"))
    .catch(() => setOffline("unsupported"));
  let tries = 0;
  const t = setInterval(() => { checkOffline().then((ok) => { if (ok) { setOffline("ready"); clearInterval(t); } }); if (++tries > 20) clearInterval(t); }, 1500);
}

/* =====================================================================
   LOOP
   ===================================================================== */
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; Hs = window.innerHeight;
  canvas.width = Math.round(W * DPR); canvas.height = Math.round(Hs * DPR);
  baseSc = Hs / VIEW_H;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", () => setTimeout(resize, 200));

let last = performance.now();
let saveT = 0;
function frame(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  if (!paused) {
    update(dt / 2); update(dt / 2);
    updateHud();
    saveT += dt; if (saveT > 6) { saveT = 0; store(); }
  } else {
    time += dt;
    if (!started) { camX += 40 * dt; if (camX > END_X - 600) camX = START_X + 300; }   // menybakgrunden rullar långsamt
  }
  render();
  requestAnimationFrame(frame);
}

resize();
setMuted(!!save.muted);
resetCar(0);
openMenu();
requestAnimationFrame(frame);

// för test
window.__delta = { setStarted(v) { started = v; }, car, inp, parts, floorY, update, resetCar, VEH, WALL, RAMP, START_X, END_X, get paused() { return paused; }, get air() { return air; }, get result() { return lastResult; } };
})();
