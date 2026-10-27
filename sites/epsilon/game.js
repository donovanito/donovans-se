"use strict";
/* Epsilon Raceway - spelet: meny, lopp (3 varv mot datorn), resultat och topplista.
   Fysik/AI ligger i engine.js, banor i track.js, grafik i art.js. Rekord sparas i localStorage. */
(() => {
  const $ = (s) => document.querySelector(s);
  const KEY = "epsilon.v1";
  const CARS = [
    { id: "red", name: "Röd", c: "#e5322d" },
    { id: "blue", name: "Blå", c: "#2f6fe4" },
    { id: "yellow", name: "Gul", c: "#ffc928" },
    { id: "green", name: "Grön", c: "#1fae55" },
    { id: "orange", name: "Orange", c: "#ff7b1c" },
    { id: "black", name: "Svart", c: "#2c2e34" },
  ];
  const LAPS = Engine.P.LAPS;
  const VIS = 1.25; // bilarna ritas något större än banans verkliga mått så att de syns på telefon
  const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

  /* =====================================================================
     SPARAT
     ===================================================================== */
  let S = { name: "", car: 0, track: "oval", mute: false, rec: {} };
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && typeof raw === "object") S = Object.assign(S, raw);
  } catch (e) { /* ingen lagring */ }
  if (!S.rec || typeof S.rec !== "object") S.rec = {};
  if (!Tracks.DEFS.some((d) => d.id === S.track)) S.track = Tracks.DEFS[0].id;
  if (!(S.car >= 0 && S.car < CARS.length)) S.car = 0;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privat läge */ } }

  const fmt = (t) => t.toFixed(2);
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  function fmtDate(iso) { const d = new Date(iso); return isNaN(d) ? "" : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
  const recs = (id) => (S.rec[id] || []).slice(0, 3);
  const displayName = () => (S.name || "").trim() || "Förare";

  function addRecord(id, sec) {
    const list = S.rec[id] || (S.rec[id] = []);
    const entry = { n: displayName(), t: Math.round(sec * 1000), d: new Date().toISOString(), c: CARS[S.car].id };
    list.push(entry);
    list.sort((a, b) => a.t - b.t || (a.d < b.d ? -1 : 1));
    const rank = list.indexOf(entry);
    if (list.length > 3) list.length = 3;
    save();
    return rank < 3 ? { entry, rank } : null;
  }

  /* =====================================================================
     CANVAS OCH LAYOUT
     ===================================================================== */
  const canvas = $("#c"), ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1, scene = "menu", view = null, staticCv = null, dirty = true;
  const safeEl = $("#safe");

  function safeInsets() {
    const cs = getComputedStyle(safeEl);
    return { t: parseFloat(cs.paddingTop) || 0, r: parseFloat(cs.paddingRight) || 0, b: parseFloat(cs.paddingBottom) || 0, l: parseFloat(cs.paddingLeft) || 0 };
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    while (W * H * dpr * dpr > 3.6e6 && dpr > 1) dpr -= 0.25;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    rebuildStatic();
    if (scene === "menu") drawThumbs();
  }

  function rebuildStatic() {
    staticCv = document.createElement("canvas");
    staticCv.width = canvas.width; staticCv.height = canvas.height;
    const c = staticCv.getContext("2d");
    if (scene === "race" && race) {
      const sf = safeInsets();
      const hudEl = $("#hud"), hb = hudEl.hidden ? 0 : hudEl.getBoundingClientRect().bottom;
      const portrait = H > W;
      const padSize = Math.min(124, Math.max(78, 0.24 * Math.min(W, H)));
      const pad = {
        l: Math.max(8, sf.l), r: Math.max(8, sf.r),
        t: Math.max(sf.t + 46, hb + 8),
        b: portrait ? padSize + Math.max(10, sf.b) + 20 : Math.max(10, sf.b) + 8,
      };
      view = Art.fitView(race.track, W, H, pad);
      Art.drawFloor(c, canvas.width, canvas.height, 34 * view.scale * dpr);
      const cs = Math.cos(view.phi), sn = Math.sin(view.phi);
      view.cs = cs; view.sn = sn;
      c.setTransform(dpr * view.scale * cs, dpr * view.scale * sn, -dpr * view.scale * sn, dpr * view.scale * cs, dpr * view.tx, dpr * view.ty);
      // skuggornas riktning: ned åt höger på skärmen
      view.sdx = cs * 1 + sn * 1.4; view.sdy = -sn * 1 + cs * 1.4;
      Art.drawTrack(c, race.track, { scale: view.scale, dpr, sdx: 1, sdy: 1.4 });
    } else {
      Art.drawFloor(c, canvas.width, canvas.height, 50 * dpr);
    }
    dirty = true;
  }

  function setWorld(c) {
    c.setTransform(dpr * view.scale * view.cs, dpr * view.scale * view.sn, -dpr * view.scale * view.sn, dpr * view.scale * view.cs, dpr * view.tx, dpr * view.ty);
  }
  const toScreenX = (x, y) => view.scale * (view.cs * x - view.sn * y) + view.tx;

  /* =====================================================================
     MENY
     ===================================================================== */
  const trackIdx = () => Tracks.DEFS.findIndex((d) => d.id === S.track);

  function renderMenu() {
    const def = Tracks.DEFS[trackIdx()];
    $("#tName").textContent = def.name;
    $("#tLvl").textContent = "SVÅRIGHET " + "I".repeat(def.level);
    $("#tBlurb").textContent = def.blurb;
    $("#lbTrack").textContent = "- " + def.name;
    $("#dots").innerHTML = Tracks.DEFS.map((d, i) => `<i class="${i === trackIdx() ? "on" : ""}"></i>`).join("");
    $("#lb").innerHTML = lbHtml(def.id, null);
    $("#name").value = S.name || "";
    $("#go").textContent = `KÖR ${LAPS} VARV`;
    document.querySelectorAll("#cars button").forEach((b, i) => b.classList.toggle("on", i === S.car));
    drawThumbs();
  }

  function lbHtml(id, mine) {
    const list = recs(id);
    let h = "";
    for (let i = 0; i < 3; i++) {
      const e = list[i];
      if (e) h += `<li class="${mine === e ? "me" : ""}"><span class="rk">${i + 1}</span><span class="nm">${esc(e.n)}</span><span class="tm2">${fmt(e.t / 1000)} s</span><span class="dt">${fmtDate(e.d)}</span></li>`;
      else h += `<li class="empty"><span class="rk">${i + 1}</span><span class="nm">-</span><span class="tm2"></span><span class="dt"></span></li>`;
    }
    return h;
  }

  function drawThumbs() {
    requestAnimationFrame(() => {
      const def = Tracks.DEFS[trackIdx()];
      Art.drawThumb($("#thumb"), Tracks.get(def.id), { color: CARS[S.car].c });
      document.querySelectorAll("#cars canvas").forEach((cv, i) => Art.drawCarSwatch(cv, CARS[i].c));
    });
  }

  function buildCarButtons() {
    const box = $("#cars");
    box.innerHTML = "";
    CARS.forEach((car, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", car.name);
      b.innerHTML = "<canvas></canvas>";
      b.addEventListener("click", () => { S.car = i; save(); Sfx.init(); Sfx.play("click"); renderMenu(); });
      box.appendChild(b);
    });
  }

  function selectTrack(d) {
    const n = Tracks.DEFS.length;
    S.track = Tracks.DEFS[(trackIdx() + d + n) % n].id;
    save(); Sfx.play("click"); renderMenu();
  }
  $("#prevTrack").addEventListener("click", () => { Sfx.init(); selectTrack(-1); });
  $("#nextTrack").addEventListener("click", () => { Sfx.init(); selectTrack(1); });
  $("#dots").addEventListener("click", (e) => {
    const r = $("#dots").getBoundingClientRect(), n = Tracks.DEFS.length;
    const i = Math.min(n - 1, Math.max(0, Math.floor((e.clientX - r.left) / (r.width / n))));
    S.track = Tracks.DEFS[i].id; save(); renderMenu();
  });
  $("#name").addEventListener("input", (e) => { S.name = e.target.value.slice(0, 14); save(); });
  $("#name").addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") e.target.blur(); });
  $("#go").addEventListener("click", () => { Sfx.init(); startRace(S.track); });

  // svep i banvalet
  (() => {
    let x0 = null;
    const el = $(".thumbwrap");
    el.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    el.addEventListener("pointerup", (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) selectTrack(dx < 0 ? 1 : -1); });
  })();

  function showMenu() {
    scene = "menu"; race = null;
    $("#menu").hidden = false;
    $("#hud").hidden = true; $("#touch").hidden = true; $("#lights").hidden = true; $("#banner").hidden = true; $("#hint").hidden = true;
    $("#result").hidden = true; $("#pause").hidden = true;
    Sfx.setSilent(true);
    releaseWake();
    rebuildStatic();
    renderMenu();
  }

  /* =====================================================================
     LOPPET
     ===================================================================== */
  let race = null, R = null, paused = false;
  const particles = [];
  let bannerTimer = 0, toastTimer = 0;

  function aiOpts(def) { return { mean: 0.97 + 0.002 * def.level, sd: 0.025 }; }

  function startRace(id) {
    const def = Tracks.DEFS.find((d) => d.id === id), tr = Tracks.get(id);
    race = Engine.createRace(tr, 0, aiOpts(def));
    race.aiColor = CARS[(S.car + 3) % CARS.length].c;
    race.playerColor = CARS[S.car].c;
    race.def = def;
    R = { phase: "grid", phaseT: 0, lights: 0, hold: 0.7 + Math.random() * 0.9, green: 0, bestLap: Infinity, finishRank: 0, rec: null, resultAt: 0, turboWas: false, lastBannerSec: -1, derailAt: 0 };
    particles.length = 0;
    paused = false;
    scene = "race";
    $("#menu").hidden = true; $("#result").hidden = true; $("#pause").hidden = true;
    $("#hud").hidden = false; $("#touch").hidden = false;
    $("#lights").hidden = false; $("#lights").className = ""; setLights(0);
    $("#hint").hidden = false;
    hideBanner();
    hudCache = {};
    updateHud();
    rebuildStatic();
    resetInput();
    Sfx.setSilent(false);
    requestWake();
  }

  function setLights(n, go) {
    const el = $("#lights");
    el.classList.toggle("go", !!go);
    el.querySelectorAll("i").forEach((i, k) => i.classList.toggle("on", !go && k < n));
  }

  function showBanner(html, cls, ms) {
    const b = $("#banner");
    b.hidden = false; b.className = cls || ""; b.innerHTML = html;
    b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
    clearTimeout(bannerTimer);
    if (ms) bannerTimer = setTimeout(hideBanner, ms);
  }
  function hideBanner() { $("#banner").hidden = true; clearTimeout(bannerTimer); }
  function toast(msg, ms) {
    const t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, ms || 2200);
  }

  function ev(e, car) {
    if (!race) return;
    const me = car === race.player;
    if (e === "derail") {
      spawnBurst(car.fly.x, car.fly.y, 26, car.fly.vx, car.fly.vy);
      if (me) {
        Sfx.play("derail");
        if (navigator.vibrate) { try { navigator.vibrate([60, 40, 90]); } catch (x) { /* ignoreras */ } }
        showBanner(`SPÅRADE UR!<small>Du ställs upp på banan igen om ett par sekunder</small>`, "bad", 2400);
        R.derailAt = race.t;
      } else toast("Motståndaren spårade ur!");
    } else if (e === "placing") {
      const p = poseOf(car, _pose);
      spawnPoof(p.x, p.y);
      if (me) Sfx.play("place");
    } else if (e === "lap" && me) {
      const lt = car.lapTimes[car.lapTimes.length - 1];
      const best = lt < R.bestLap;
      const prevBest = R.bestLap;
      R.bestLap = Math.min(R.bestLap, lt);
      Sfx.play(best ? "best" : "lap");
      const d = isFinite(prevBest) ? ` (${lt - prevBest >= 0 ? "+" : "-"}${Math.abs(lt - prevBest).toFixed(2)})` : "";
      showBanner(`VARV ${car.laps} AV ${LAPS}<small>${fmt(lt)} s${d}${best && isFinite(prevBest) ? " - bästa varvet" : ""}</small>`, best ? "good" : "", 1900);
      const el = $("#hBest").parentNode; el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    } else if (e === "finish") {
      if (me) onPlayerFinish();
      else if (!race.player.finished) toast("Motståndaren är i mål!");
    }
  }

  function onPlayerFinish() {
    const p = race.player, a = race.ai;
    R.phase = "finish"; R.phaseT = 0;
    R.finishRank = a.finished && a.finishT < p.finishT ? 2 : 1;
    R.rec = addRecord(race.def.id, p.finishT);
    R.resultAt = 1.9;
    Sfx.play(R.rec && R.rec.rank === 0 ? "record" : "finish");
    const lt = p.lapTimes[p.lapTimes.length - 1];
    showBanner(R.finishRank === 1 ? "MÅL - DU VANN!" : "MÅL!", R.finishRank === 1 ? "good" : "", 2200);
    void lt;
  }

  /* ---------- indata ---------- */
  const inp = { kGas: false, kTurbo: false, tGas: new Set(), tTurbo: new Set() };
  function resetInput() {
    inp.kGas = inp.kTurbo = false; inp.tGas.clear(); inp.tTurbo.clear();
    document.querySelectorAll(".zone").forEach((z) => z.classList.remove("down"));
  }
  function getInput() {
    const turbo = inp.kTurbo || inp.tTurbo.size > 0;
    return { gas: inp.kGas || inp.tGas.size > 0 || turbo, turbo };
  }
  document.querySelectorAll(".zone").forEach((z) => {
    const set = z.dataset.act === "gas" ? inp.tGas : inp.tTurbo;
    const down = (e) => { e.preventDefault(); Sfx.init(); try { z.setPointerCapture(e.pointerId); } catch (x) { /* ignoreras */ } set.add(e.pointerId); z.classList.add("down"); };
    const up = (e) => { set.delete(e.pointerId); if (!set.size) z.classList.remove("down"); };
    z.addEventListener("pointerdown", down);
    z.addEventListener("pointerup", up);
    z.addEventListener("pointercancel", up);
    z.addEventListener("lostpointercapture", up);
  });

  const KGAS = new Set(["Space", "ArrowUp", "ArrowRight", "KeyW", "KeyD"]);
  const KTURBO = new Set(["ShiftLeft", "ShiftRight", "KeyT", "ArrowDown", "KeyX", "KeyS"]);
  window.addEventListener("keydown", (e) => {
    if (e.target && e.target.tagName === "INPUT") return;
    if (KGAS.has(e.code)) { inp.kGas = true; e.preventDefault(); Sfx.init(); }
    else if (KTURBO.has(e.code)) { inp.kTurbo = true; e.preventDefault(); Sfx.init(); }
    if (e.repeat) return;
    if (scene === "menu") {
      if (e.code === "ArrowLeft") selectTrack(-1);
      else if (e.code === "ArrowRight") selectTrack(1);
      else if (e.code === "Enter") { Sfx.init(); startRace(S.track); }
    } else if (scene === "race") {
      if (e.code === "Escape" || e.code === "KeyP") setPaused(!paused);
      else if (e.code === "Enter" && !$("#result").hidden && !(e.target && e.target.tagName === "INPUT")) startRace(S.track);
    }
    if (e.code === "KeyM") toggleMute();
  });
  window.addEventListener("keyup", (e) => {
    if (KGAS.has(e.code)) inp.kGas = false;
    if (KTURBO.has(e.code)) inp.kTurbo = false;
  });
  window.addEventListener("blur", () => { resetInput(); });

  /* ---------- uppdatering ---------- */
  function updateRace(dt) {
    R.phaseT += dt;
    const ph = R.phase;
    if (ph === "grid") {
      if (R.phaseT > 0.9) { R.phase = "lights"; R.phaseT = 0; R.lights = 0; }
    } else if (ph === "lights") {
      const marks = [0.55, 1.35, 2.15];
      while (R.lights < 3 && R.phaseT >= marks[R.lights]) { R.lights++; setLights(R.lights); Sfx.play("beep"); }
      if (R.phaseT >= marks[2] + R.hold) {
        R.phase = "run"; R.phaseT = 0; race.t = 0; R.green = 1.1;
        setLights(3, true); Sfx.play("go");
        showBanner("KÖR!", "good", 800);
        $("#hint").hidden = true;
      }
    } else {
      if (R.green > 0) { R.green -= dt; if (R.green <= 0) $("#lights").hidden = true; }
      const input = race.player.finished ? { gas: false, turbo: false } : getInput();
      Engine.stepRace(race, input, dt, ev);
      if (ph === "finish" && R.resultAt && R.phaseT >= R.resultAt) { R.resultAt = 0; showResult(); }
      if (race.player.mode === "wait" && $("#banner").classList.contains("bad")) hideBanner();
    }
    // varv-/ursprungsbanner efter ursp. är hanterad i ev()
    stepParticles(dt);
    emitEffects(dt);
    audio();
    updateHud();
  }

  const _pose = { x: 0, y: 0, a: 0, lift: 0, fly: false, alpha: 1 }, _pose2 = { x: 0, y: 0, a: 0, lift: 0, fly: false, alpha: 1 };
  function poseOf(car, out) {
    out.alpha = 1; out.fly = false; out.lift = 0;
    if (car.mode === "fly") { const f = car.fly; out.x = f.x; out.y = f.y; out.a = f.a; out.lift = f.h; out.fly = true; return out; }
    Engine.pose(car, out, true);
    if (car.mode === "wait") {
      const since = race.t - car.placedAt;
      out.lift = Math.max(0, 1 - since / 0.28) * 0.5;
      out.alpha = 0.55 + 0.45 * Math.abs(Math.sin(since * 14));
    }
    return out;
  }

  /* ---------- partiklar ---------- */
  function spawnBurst(x, y, n, vx, vy) {
    for (let i = 0; i < n && particles.length < 160; i++) {
      const a = Math.random() * 6.283, sp = 20 + Math.random() * 120;
      particles.push({ t: "spark", x, y, vx: vx * 0.4 + Math.cos(a) * sp, vy: vy * 0.4 + Math.sin(a) * sp, life: 0, max: 0.35 + Math.random() * 0.4, r: 0.5 + Math.random() * 0.9 });
    }
  }
  function spawnPoof(x, y) {
    for (let i = 0; i < 9 && particles.length < 160; i++) {
      const a = Math.random() * 6.283, sp = 10 + Math.random() * 28;
      particles.push({ t: "poof", x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 0.55 + Math.random() * 0.2, r: 3 + Math.random() * 2 });
    }
  }
  function stepParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt;
      const f = Math.exp(-(p.t === "spark" ? 3 : 4.5) * dt); p.vx *= f; p.vy *= f;
      if (p.life >= p.max) particles.splice(i, 1);
    }
  }
  function emitEffects(dt) {
    for (const car of [race.player, race.ai]) {
      if (car.mode !== "run") continue;
      const hot = car.turboOn || car.drift > 0.5;
      if (!hot || particles.length > 130) continue;
      const p = poseOf(car, _pose2);
      if (Math.random() < Math.min(1, dt * 90)) {
        const a = p.a + Math.PI + (Math.random() - 0.5) * 1.6, sp = 25 + Math.random() * 70;
        const sx = car.turboOn ? p.rx : p.fx, sy = car.turboOn ? p.ry : p.fy;
        particles.push({ t: "spark", x: sx, y: sy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 0.18 + Math.random() * 0.25, r: 0.45 + Math.random() * 0.5, blue: car.turboOn });
      }
    }
  }

  /* ---------- ljud ---------- */
  function audio() {
    if (!Sfx.ready) return;
    const p = race.player, a = race.ai;
    const pp = poseOf(p, _pose2), px = toScreenX(pp.x, pp.y);
    Sfx.motorUpdate("p", p.mode === "run" ? p.v : 0, p.gas || p.turboOn, (px / W) * 2 - 1, p.mode === "run");
    const ap = poseOf(a, _pose2), ax = toScreenX(ap.x, ap.y);
    Sfx.motorUpdate("a", a.mode === "run" ? a.v : 0, a.v > 5, (ax / W) * 2 - 1, a.mode === "run");
    Sfx.turboUpdate(p.turboOn && p.mode === "run");
    Sfx.squealUpdate(p.mode === "run" ? Math.max(0, (p.drift - 0.3) / 0.7) : 0);
    if (p.turboOn && !R.turboWas) Sfx.play("turbo");
    R.turboWas = p.turboOn;
  }

  /* ---------- HUD ---------- */
  let hudCache = {};
  function setTxt(id, v) { if (hudCache[id] !== v) { hudCache[id] = v; $("#" + id).textContent = v; } }
  function updateHud() {
    const p = race.player, a = race.ai;
    const lap = Math.min(LAPS, p.laps + 1);
    setTxt("hLap", `${lap}/${LAPS}`);
    const t = R.phase === "run" || R.phase === "finish" ? (p.finished ? p.finishT : Math.max(0, race.t)) : 0;
    setTxt("hTime", fmt(t));
    setTxt("hBest", isFinite(R.bestLap) ? fmt(R.bestLap) : "-");
    const rec = recs(race.def.id)[0];
    setTxt("hRec", rec ? fmt(rec.t / 1000) : "-");
    let first;
    if (p.finished) first = R.finishRank === 1;
    else if (a.finished) first = false;
    else first = p.s / p.lane.L - a.s / a.lane.L > -0.004;
    setTxt("hPos", first ? "1:a" : "2:a");
    const tp = $("#turboPad");
    const tq = Math.round(p.turbo * 50) / 50;
    if (hudCache.t !== tq) {
      hudCache.t = tq; tp.style.setProperty("--t", tq);
      tp.classList.toggle("low", p.turbo < 0.18); tp.classList.toggle("full", p.turbo > 0.97);
    }
  }

  /* ---------- resultat ---------- */
  function showResult() {
    const p = race.player, def = race.def;
    const best = Math.min(...p.lapTimes);
    const laps = p.lapTimes.map((l, i) => `<div class="${l === best ? "best" : ""}">Varv ${i + 1}<b>${fmt(l)}</b></div>`).join("");
    const rank = R.finishRank, rc = R.rec;
    const title = rank === 1 ? "Du vann!" : "Andra plats";
    const rec = rc ? `<div class="recbox"><p>${rc.rank === 0 ? "NYTT BANREKORD!" : `PLATS ${rc.rank + 1} I TOPPLISTAN`}</p><label class="namerow" style="margin:0"><span>Namn</span><input id="resName" type="text" maxlength="14" autocomplete="off" autocapitalize="words" spellcheck="false" value="${esc(rc.entry.n)}"></label></div>` : "";
    $("#result").innerHTML = `<div class="card res">
      <div class="rl">
        <h2>${title}<small>${esc(def.name).toUpperCase()} - ${LAPS} VARV</small></h2>
        <div class="bigtime">${fmt(p.finishT)}<small>sek</small></div>
        <p class="sub">${p.derails ? `Spårade ur ${p.derails} ${p.derails === 1 ? "gång" : "gånger"}` : "Rent lopp, inga urspårningar!"}${race.ai.finished ? `<br>Motståndaren: ${fmt(race.ai.finishT)} s` : ""}</p>
        <div class="laps">${laps}</div>
      </div>
      <div class="rr">
        ${rec}
        <h3>Topp 3 - ${esc(def.name)}</h3>
        <ol class="lb" id="resLb">${lbHtml(def.id, rc ? rc.entry : null)}</ol>
        <div class="btnrow"><button class="big alt" id="rMenu">Meny</button><button class="big go" id="rAgain">Kör igen</button></div>
      </div>
    </div>`;
    $("#result").hidden = false;
    $("#rAgain").addEventListener("click", () => { Sfx.init(); startRace(def.id); });
    $("#rMenu").addEventListener("click", showMenu);
    const ni = $("#resName");
    if (ni) {
      ni.addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") ni.blur(); });
      ni.addEventListener("input", () => {
        const v = ni.value.slice(0, 14);
        S.name = v; rc.entry.n = v.trim() || "Förare"; save();
        $("#resLb").innerHTML = lbHtml(def.id, rc.entry);
      });
    }
  }

  /* ---------- paus ---------- */
  function setPaused(p) {
    if (scene !== "race" || !$("#result").hidden) return;
    paused = p;
    $("#pause").hidden = !p;
    resetInput();
    if (p) Sfx.setSilent(true); else { Sfx.setSilent(false); last = performance.now(); }
  }
  $("#hPause").addEventListener("click", () => setPaused(true));
  $("#pResume").addEventListener("click", () => setPaused(false));
  $("#pRetry").addEventListener("click", () => { startRace(race.def.id); });
  $("#pQuit").addEventListener("click", showMenu);
  document.addEventListener("visibilitychange", () => { if (document.hidden && scene === "race") setPaused(true); });
  window.addEventListener("pagehide", () => { if (scene === "race") setPaused(true); });

  /* ---------- ljud av/på ---------- */
  function updateMuteIcons() {
    const svg = S.mute
      ? '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
    $("#mMute").innerHTML = svg; $("#hMute").innerHTML = svg;
  }
  function toggleMute() { S.mute = !S.mute; save(); Sfx.setMuted(S.mute); updateMuteIcons(); Sfx.init(); }
  $("#mMute").addEventListener("click", toggleMute);
  $("#hMute").addEventListener("click", toggleMute);

  /* ---------- skärmen får inte somna under loppet ---------- */
  let wake = null;
  function requestWake() { try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then((w) => { wake = w; }).catch(() => {}); } catch (e) { /* ignoreras */ } }
  function releaseWake() { try { if (wake) wake.release(); } catch (e) { /* ignoreras */ } wake = null; }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && scene === "race") requestWake(); });

  /* =====================================================================
     RITNING
     ===================================================================== */
  function drawRace() {
    const c = ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(staticCv, 0, 0);
    setWorld(c);
    const o = { sdx: view.sdx * 1.6, sdy: view.sdy * 1.6, scale: VIS };
    // urspårad bil: nedräkningsring
    for (const car of [race.ai, race.player]) {
      if (car.mode === "fly" && car === race.player) {
        const f = car.fly, prog = Math.min(1, car.flyT / Engine.P.PLACE_AT);
        c.lineWidth = 2.4; c.strokeStyle = "rgba(0,0,0,.35)"; c.beginPath(); c.arc(f.x, f.y, 17, 0, Art.TAU); c.stroke();
        c.strokeStyle = prog > 0.75 ? "#8dffb4" : "#ffc928"; c.lineCap = "round";
        c.beginPath(); c.arc(f.x, f.y, 17, -Math.PI / 2, -Math.PI / 2 + prog * Art.TAU); c.stroke();
        c.lineCap = "butt";
      }
    }
    const order = race.player.mode === "fly" ? [race.player, race.ai] : [race.ai, race.player];
    for (const car of order) {
      const p = poseOf(car, _pose);
      const col = car === race.player ? race.playerColor : race.aiColor;
      if (car.turboOn && car.mode === "run") {
        c.save(); c.globalCompositeOperation = "lighter";
        const g = c.createRadialGradient(p.rx, p.ry, 0, p.rx, p.ry, 13);
        g.addColorStop(0, "rgba(120,190,255,.85)"); g.addColorStop(0.4, "rgba(255,160,60,.45)"); g.addColorStop(1, "rgba(255,120,40,0)");
        c.fillStyle = g; c.beginPath(); c.arc(p.rx, p.ry, 13, 0, Art.TAU); c.fill(); c.restore();
      }
      o.lift = p.lift; o.alpha = p.alpha;
      Art.drawCar(c, col, p.x, p.y, p.a, o);
    }
    // partiklar
    c.save(); c.globalCompositeOperation = "lighter";
    for (const p of particles) {
      if (p.t !== "spark") continue;
      const k = 1 - p.life / p.max;
      c.fillStyle = p.blue ? `rgba(150,210,255,${k})` : `rgba(255,${150 + 80 * k | 0},60,${k})`;
      c.beginPath(); c.arc(p.x, p.y, p.r * (0.6 + k * 0.6), 0, Art.TAU); c.fill();
    }
    c.restore();
    for (const p of particles) {
      if (p.t !== "poof") continue;
      const k = p.life / p.max;
      c.fillStyle = `rgba(235,235,235,${0.5 * (1 - k)})`;
      c.beginPath(); c.arc(p.x, p.y, p.r * (0.6 + k * 1.4), 0, Art.TAU); c.fill();
    }
    Art.drawGantry(c, race.track, R.phase === "lights" ? R.lights : 0, R.phase !== "grid" && R.phase !== "lights" && R.green > 0);
  }

  /* =====================================================================
     HUVUDLOOP
     ===================================================================== */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    try {
      if (scene === "race" && race) {
        if (!paused) updateRace(dt);
        drawRace();
      } else if (dirty) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(staticCv, 0, 0);
        dirty = false;
      }
    } catch (err) { console.error(err); }
    requestAnimationFrame(frame);
  }

  /* =====================================================================
     PWA, ZOOMSPÄRR OCH START
     ===================================================================== */
  window.addEventListener("resize", () => { resize(); });
  window.addEventListener("orientationchange", () => setTimeout(resize, 150));
  ["gesturestart", "gesturechange", "gestureend"].forEach((n) => document.addEventListener(n, (e) => e.preventDefault()));
  // dubbeltryck får aldrig zooma (iOS ignorerar user-scalable=no): spärra på reglagen under loppet, och touch-action: manipulation i css överallt
  ["touchstart", "touchend"].forEach((n) => $("#touch").addEventListener(n, (e) => e.preventDefault(), { passive: false }));
  document.addEventListener("dblclick", (e) => e.preventDefault());
  document.addEventListener("touchmove", (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  let deferredInstall = null;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  function installUi() {
    $("#installBtn").hidden = !deferredInstall;
    $("#iosHint").hidden = !(isIOS && !standalone);
  }
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; installUi(); });
  window.addEventListener("appinstalled", () => { deferredInstall = null; installUi(); toast("Spelet är installerat!"); });
  $("#installBtn").addEventListener("click", () => { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; installUi(); }); });

  if ("serviceWorker" in navigator && "caches" in window && location.protocol !== "file:") {
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "offline-ready") { const h = $("#offlineHint"); h.textContent = "Klart: spelet fungerar nu utan nät."; h.hidden = false; setTimeout(() => { h.hidden = true; }, 5000); }
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && scene === "menu") location.reload(); });
    navigator.serviceWorker.register("sw.js").catch(() => { /* ignoreras */ });
  }

  // test-/felsökningskrok
  window.__epsilon = { get S() { return S; }, get race() { return race; }, get R() { return R; }, startRace, getInput, inp, Tracks, Engine, setPaused, showMenu };

  Sfx.setMuted(!!S.mute);
  updateMuteIcons();
  buildCarButtons();
  installUi();
  resize();
  showMenu();
  requestAnimationFrame(frame);
})();
