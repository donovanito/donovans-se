"use strict";
/* Galoppen - spelmotor: meny, ridbana, stall, butik och rekord. Sparas i localStorage. */
(() => {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const { clamp, lerp } = Art;
  const TAU = Math.PI * 2;
  const HORSE_NAME = "Stjärna";

  /* =====================================================================
     SPARAD DATA
     ===================================================================== */
  const KEY = "galoppen.v1";

  function defaults() {
    const owned = {};
    Object.values(Items.DEFAULT_EQUIP).forEach((id) => { owned[id] = true; });
    return {
      v: 1,
      coins: 40,
      owned,
      equip: Object.assign({}, Items.DEFAULT_EQUIP),
      look: { skin: Items.SKINS[1], hair: Items.HAIRS[3].c, style: "ponytail" },
      food: { carrot: 2, apple: 1, oats: 0 },
      horse: { energy: 82, shine: 55, ts: Date.now() },
      unlocked: 1,
      rosettes: { blue: 0, red: 0, yellow: 0, green: 0 },
      records: {},
      settings: { mute: false, guides: true },
      stats: { rides: 0 },
    };
  }

  function load() {
    const d = defaults();
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY)); } catch (e) { raw = null; }
    if (!raw || typeof raw !== "object") return d;
    const s = Object.assign(d, raw);
    s.owned = Object.assign(d.owned, raw.owned || {});
    s.equip = Object.assign(Object.assign({}, Items.DEFAULT_EQUIP), raw.equip || {});
    s.look = Object.assign(defaults().look, raw.look || {});
    s.food = Object.assign({ carrot: 0, apple: 0, oats: 0 }, raw.food || {});
    s.horse = Object.assign({ energy: 80, shine: 50, ts: Date.now() }, raw.horse || {});
    s.rosettes = Object.assign({ blue: 0, red: 0, yellow: 0, green: 0 }, raw.rosettes || {});
    s.settings = Object.assign({ mute: false, guides: true }, raw.settings || {});
    s.stats = Object.assign({ rides: 0 }, raw.stats || {});
    s.records = raw.records && typeof raw.records === "object" ? raw.records : {};
    Object.keys(s.equip).forEach((k) => { if (!Items.byId[s.equip[k]] || !s.owned[s.equip[k]]) s.equip[k] = Items.DEFAULT_EQUIP[k]; });
    s.coins = Math.max(0, Math.floor(+s.coins || 0));
    return s;
  }

  let S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privat läge */ } }

  function decay() {
    const now = Date.now();
    const mins = Math.min(120, (now - (S.horse.ts || now)) / 60000);
    if (mins > 0.05) {
      S.horse.energy = Math.max(Math.min(S.horse.energy, 18), S.horse.energy - mins * 0.25);
      S.horse.shine = Math.max(Math.min(S.horse.shine, 10), S.horse.shine - mins / 6);
      S.horse.ts = now;
    }
  }
  decay();
  const form = () => clamp((0.6 * S.horse.energy + 0.4 * S.horse.shine) / 100, 0, 1);
  const jumpBoost = () => 0.9 + 0.22 * form();
  const coinBonus = () => (S.horse.shine >= 80 ? 0.2 : S.horse.shine >= 50 ? 0.1 : 0);

  /* =====================================================================
     VY / CANVAS
     ===================================================================== */
  const canvas = $("#c");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1;
  let scene = "menu";
  const DW = 860, DH = 500;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    while (W * H * dpr * dpr > 3.0e6 && dpr > 1) dpr -= 0.25;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    updateRotate();
  }

  function rideView() {
    const s = Math.min(W / DW, H / DH);
    return { s, vW: W / s, vH: H / s };
  }

  const isPhonePortrait = () => H > W * 1.05 && Math.min(W, H) < 700;
  function updateRotate() {
    document.body.classList.toggle("need-rotate", scene === "ride" && isPhonePortrait());
  }

  /* =====================================================================
     UI-HJÄLP
     ===================================================================== */
  const screens = { menu: $("#menu"), classes: $("#classes"), stable: $("#stable"), shop: $("#shop"), records: $("#records") };
  let toastTimer = 0;
  function toast(msg, ms) {
    const el = $("#toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, ms || 2200);
  }

  function updateCoins() {
    $$(".cv").forEach((e) => { e.textContent = S.coins; });
    $("#mCoins").textContent = S.coins;
  }

  function showScreen(name) {
    Object.keys(screens).forEach((k) => { screens[k].hidden = k !== name; });
    scene = name;
    $("#hud").hidden = true; $("#touch").hidden = true; $("#track").hidden = true; $("#gaitChip").hidden = true; $("#banner").hidden = true;
    updateRotate();
  }

  function go(name) {
    Sfx.init();
    Sfx.play("click");
    if (ride) { endRideSilently(); }
    showScreen(name);
    updateCoins();
    if (name === "classes") renderClasses();
    if (name === "stable") { stableTab = "care"; setTabs("#stableTabs", "care"); renderStable(); }
    if (name === "shop") { shopTab = "horse"; shopSlot = "saddle"; shopSel = null; setTabs("#shopTabs", "horse"); renderShop(); }
    if (name === "records") { recTab = "all"; renderRecords(); }
    if (name === "menu") renderMenu();
  }

  function setTabs(sel, tab) { $$(sel + " button").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab)); }

  function renderMenu() {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    $("#iosHint").hidden = !(ios && !standalone);
    $("#installBtn").hidden = !deferredInstall || standalone;
    $("#mMute").textContent = Sfx.muted ? "🔇" : "🔊";
  }

  /* =====================================================================
     UTRUSTNING -> RITDATA
     ===================================================================== */
  function riderData(prev) {
    const e = Object.assign({}, S.equip, prev || {});
    const it = (id) => Items.byId[id] || Items.byId[Items.DEFAULT_EQUIP[Object.keys(S.equip).find((k) => S.equip[k] === id)]];
    return {
      skin: S.look.skin, hair: S.look.hair, hairStyle: S.look.style,
      cloth: { helmet: it(e.helmet), jacket: it(e.jacket), breeches: it(e.breeches), boots: it(e.boots) },
    };
  }
  function tackData(prev) {
    const e = Object.assign({}, S.equip, prev || {});
    const n = (id) => { const i = Items.byId[id]; return i && !i.none ? i : null; };
    return { saddle: n(e.saddle), pad: n(e.pad), bridle: n(e.bridle), wraps: n(e.wraps), rosette: n(e.rosette), mane: n(e.mane) };
  }

  /* =====================================================================
     PARTIKLAR
     ===================================================================== */
  let parts = [];
  function spawn(p) { p.max = p.life; parts.push(p); }
  function stepParts(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= dt;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      p.x += (p.vx || 0) * dt; p.y += (p.vy || 0) * dt;
      if (p.g) p.vy += p.g * dt;
      if (p.rot != null) p.rot += (p.vr || 0) * dt;
    }
    if (parts.length > 260) parts.splice(0, parts.length - 260);
  }

  /* =====================================================================
     GEMENSAM HÄSTANIMATION (meny / stall / butik)
     ===================================================================== */
  const idle = { t: 0, blinkT: 2, blink: 0, earT: 1, ear: 0, headDown: 0, eat: null, toss: 0, brushT: 0 };
  function stepIdle(dt) {
    idle.t += dt;
    idle.blinkT -= dt;
    if (idle.blinkT < 0) { idle.blink = 0.14; idle.blinkT = 1.8 + Math.random() * 3; }
    if (idle.blink > 0) idle.blink -= dt;
    idle.earT -= dt;
    if (idle.earT < 0) { idle.ear = 0.7; idle.earT = 2 + Math.random() * 4; }
    if (idle.ear > 0) idle.ear -= dt * 2.4;
    if (idle.brushT > 0) idle.brushT -= dt;
    // ät
    if (idle.eat) {
      idle.eat.t += dt;
      const e = idle.eat;
      idle.headDown = clamp(Math.min(e.t / 0.5, (e.dur - e.t) / 0.5), 0, 1);
      e.munchT -= dt;
      if (e.munchT <= 0 && e.t > 0.5 && e.t < e.dur - 0.3) { e.munchT = 0.34; Sfx.play("munch"); }
      if (e.t >= e.dur) { idle.eat = null; idle.headDown = 0; refreshStable(); }
    } else idle.headDown = lerp(idle.headDown, 0, Math.min(1, dt * 6));
  }

  /* =====================================================================
     MENYSCEN
     ===================================================================== */
  let menuCam = 0;
  function drawMenu(dt) {
    const { s, vW, vH } = rideView();
    menuCam += 150 * dt;
    ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
    const gy = vH - 86;
    Scene.drawBackdrop(ctx, { vW, vH, gy, cam: menuCam, t: idle.t });
    const v = 330;
    const mode = "canter";
    const g = Art.GAITS[mode];
    const phase = (idle.t * v * g.stance) / (2 * g.A);
    const hx = vW * (vW > vH ? 0.2 : 0.5);
    Art.drawHorse(ctx, { x: hx, y: gy + 6, scale: 1.1, t: idle.t, mode, phase, flow: 0.7, tack: tackData(), rider: riderData(), shine: S.horse.shine / 100, blink: idle.blink > 0 });
    Scene.drawForeground(ctx, vW, vH, gy, menuCam, idle.t);
  }

  /* =====================================================================
     STAGE (stall och butik): ritrektangel bredvid panelen
     ===================================================================== */
  function stageRect(screenEl) {
    const panel = $(".panel", screenEl);
    if (!panel) return { x: 0, y: 0, w: W, h: H };
    const r = panel.getBoundingClientRect();
    const top = 56;
    if (r.top > H * 0.3) return { x: 0, y: top, w: W, h: Math.max(80, r.top - top) };
    return { x: 0, y: top, w: Math.max(120, r.left), h: H - top };
  }

  let stageZoom = 0, stageZoomTarget = 0;
  let stageXf = null; // {px, py, sc, lx, ly} för att kunna mappa pekare -> hästens lokala koordinater

  function drawStageHorse(rect, opts) {
    const hs = Math.min((rect.w * 0.84) / 236, (rect.h * 0.74) / 226, 3.6);
    stageZoom = lerp(stageZoom, stageZoomTarget, 0.12);
    const zt = stageZoom;
    const sc = hs * lerp(1, 2.25, zt);
    const cx = rect.x + rect.w * 0.5;
    const normalPy = rect.y + rect.h * 0.9 - 92 * hs;
    const zoomPy = rect.y + rect.h * 0.5;
    const px = cx, py = lerp(normalPy, zoomPy, zt);
    const lx = lerp(14, -4, zt), ly = lerp(-92, -128, zt);
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.beginPath(); ctx.rect(rect.x, rect.y, rect.w, rect.h); ctx.clip();
    ctx.translate(px, py);
    ctx.scale(sc, sc);
    ctx.translate(-lx, -ly);
    const care = opts.care;
    Art.drawHorse(ctx, {
      x: 0, y: 0, scale: 1, t: idle.t, mode: "stand", phase: 0, flow: 0.15 + Math.sin(idle.t * 0.8) * 0.1,
      tack: care ? {} : tackData(opts.prev), rider: care ? null : riderData(opts.prev), stableMode: care,
      shine: S.horse.shine / 100, headDown: idle.headDown, blink: idle.blink > 0, ear: Math.max(0, idle.ear) * 0.5, mouth: idle.eat ? Math.abs(Math.sin(idle.t * 9)) : 0,
      toss: 0, lookUp: care ? 0 : 0.2, noShadow: false, shadowAlpha: 0.3,
    });
    if (idle.eat) drawFoodItem(idle.eat.id, idle.eat.t);
    ctx.restore();
    stageXf = { px, py, sc, lx, ly };
  }

  /** Foder på golvet framför hästen (ritas i hästens lokala koordinater). */
  function drawFoodItem(id, t) {
    const x = 100, y = 0;
    const fade = Math.max(0.15, 1 - Math.max(0, t - 1.4) * 0.9);
    ctx.save();
    ctx.globalAlpha = fade;
    if (id === "hay") {
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * TAU;
        ctx.strokeStyle = i % 3 ? "#e8c85a" : "#c9a43a"; ctx.lineWidth = 2.2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 6, y - 2); ctx.lineTo(x + Math.cos(a * 1.7) * 22, y - 8 - Math.abs(Math.sin(a * 2.3)) * 12); ctx.stroke();
      }
    } else if (id === "carrot") {
      for (let k = 0; k < 2; k++) {
        ctx.save(); ctx.translate(x - 8 + k * 18, y - 6); ctx.rotate(-0.5 + k * 0.9);
        Art.poly(ctx, [[-4, -8], [4, -8], [0, 14]], "#ff8a1f");
        ctx.strokeStyle = "#35a84a"; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(-3, -16); ctx.moveTo(0, -8); ctx.lineTo(3, -16); ctx.stroke();
        ctx.restore();
      }
    } else if (id === "apple") {
      Art.ell(ctx, x, y - 8, 8, 8, 0, "#e53b3b"); Art.ell(ctx, x - 2.4, y - 11, 2.4, 3, 0, "rgba(255,255,255,.55)");
      ctx.strokeStyle = "#5a3a1a"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y - 15); ctx.lineTo(x + 1.5, y - 19); ctx.stroke();
      Art.ell(ctx, x + 5, y - 17, 3.6, 1.8, -0.5, "#35a84a");
    } else {
      Art.poly(ctx, [[x - 18, y - 16], [x + 18, y - 16], [x + 13, y], [x - 13, y]], "#4b8de0");
      Art.ell(ctx, x, y - 16, 18, 3.6, 0, "#e8c27a");
      for (let i = 0; i < 8; i++) Art.ell(ctx, x - 12 + i * 3.4, y - 18 - (i % 3), 1.8, 1.2, 0.4, "#f4dc9a");
    }
    ctx.restore();
  }

  function stageToLocal(x, y) {
    if (!stageXf) return [0, 0];
    return [(x - stageXf.px) / stageXf.sc + stageXf.lx, (y - stageXf.py) / stageXf.sc + stageXf.ly];
  }
  function localToStage(x, y) {
    return [(x - stageXf.lx) * stageXf.sc + stageXf.px, (y - stageXf.ly) * stageXf.sc + stageXf.py];
  }

  /* =====================================================================
     STALLET
     ===================================================================== */
  let stableTab = "care";
  let stableSlot = { tack: "saddle", rider: "helmet" };
  const brush = { x: 0, y: 0, on: false, last: null, snd: 0, glow: false };

  function drawStable(dt) {
    stepIdle(dt);
    const cs = Math.max(W / DW, H / DH);
    ctx.setTransform(dpr * cs, 0, 0, dpr * cs, 0, dpr * (H - DH * cs) / 2);
    Scene.drawStable(ctx, DW, DH, idle.t, { rosettes: S.rosettes, horseName: HORSE_NAME.toUpperCase() });
    const rect = stageRect(screens.stable);
    stageZoomTarget = stableTab === "rider" ? 1 : 0;
    drawStageHorse(rect, { care: stableTab === "care" });
    // partiklar i skärmrymd
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawScreenParts();
    // borste
    if (stableTab === "care" && brush.on) drawBrush();
  }

  function drawScreenParts() {
    Scene.drawParticles(ctx, parts);
  }

  function drawBrush() {
    ctx.save();
    ctx.translate(brush.x, brush.y - 10);
    ctx.rotate(-0.35 + Math.sin(idle.t * 18) * 0.06);
    ctx.fillStyle = "#c08a52"; Art.poly(ctx, [[-22, -10], [22, -10], [20, 4], [-20, 4]], "#c08a52");
    ctx.fillStyle = "#8f5d2e"; ctx.fillRect(-22, -10, 44, 4);
    for (let i = -18; i <= 18; i += 4) { ctx.strokeStyle = "#f2e0b0"; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(i, 4); ctx.lineTo(i + 0.5, 12); ctx.stroke(); }
    ctx.restore();
  }

  function brushMove(x, y, dt) {
    if (stableTab !== "care" || idle.eat) { brush.last = [x, y]; return; }
    const [lx, ly] = stageToLocal(x, y);
    // träffyta: kropp + hals
    const inBody = ((lx - 0) / 96) ** 2 + ((ly + 86) / 56) ** 2 < 1 || ((lx - 62) / 40) ** 2 + ((ly + 130) / 54) ** 2 < 1;
    if (brush.last && inBody) {
      const d = Math.hypot(x - brush.last[0], y - brush.last[1]);
      if (d > 0.5 && stageXf) {
        const before = S.horse.shine;
        S.horse.shine = clamp(S.horse.shine + (d / stageXf.sc) * 0.045, 0, 100);
        S.horse.ts = Date.now();
        if (Math.random() < 0.5) spawn({ kind: "spark", x, y, vx: (Math.random() - 0.5) * 30, vy: -20 - Math.random() * 20, life: 0.6, r: 3 + Math.random() * 3, c: "255,240,190" });
        if (Math.random() < 0.22) spawn({ kind: "dust", x, y, vx: (Math.random() - 0.5) * 40, vy: -10, life: 0.5, r: 3 + Math.random() * 3 });
        const now = performance.now();
        if (now - brush.snd > 120) { brush.snd = now; Sfx.play("brush"); }
        idle.brushT = 0.3;
        if (before < 100 && S.horse.shine >= 100) {
          toast(HORSE_NAME + " glänser som en spegel! ✨");
          for (let i = 0; i < 12; i++) spawn({ kind: "spark", x: x + (Math.random() - 0.5) * 80, y: y + (Math.random() - 0.5) * 80, vx: (Math.random() - 0.5) * 60, vy: -40 - Math.random() * 40, life: 1, r: 5 + Math.random() * 4, c: "255,230,120" });
          Sfx.play("perfect");
        }
        refreshMeters();
      }
    }
    brush.last = [x, y];
  }

  function feed(id) {
    const f = Items.FOOD.find((q) => q.id === id);
    if (!f || idle.eat) return;
    if (f.price > 0 && !(S.food[id] > 0)) { toast("Du har slut på " + f.name.toLowerCase() + ". Köp mer i Horse and Hound."); Sfx.play("nope"); return; }
    if (S.horse.energy >= 100) { toast(HORSE_NAME + " är proppmätt!"); return; }
    if (f.cap && S.horse.energy >= f.cap) { toast(HORSE_NAME + " vill ha något godare än hö nu."); Sfx.play("nope"); return; }
    if (f.price > 0) S.food[id]--;
    const gain = f.cap ? Math.min(f.energy, f.cap - S.horse.energy) : f.energy;
    S.horse.energy = clamp(S.horse.energy + gain, 0, 100);
    S.horse.shine = clamp(S.horse.shine + f.shine, 0, 100);
    S.horse.ts = Date.now();
    idle.eat = { id, t: 0, dur: id === "hay" ? 2.6 : 2.0, munchT: 0 };
    for (let i = 0; i < 3; i++) setTimeout(() => {
      if (scene !== "stable") return;
      const r = stageRect(screens.stable);
      spawn({ kind: "heart", x: r.x + r.w * 0.55 + (Math.random() - 0.5) * 60, y: r.y + r.h * 0.4, vx: 0, vy: -50, life: 1.2, r: 8 + Math.random() * 4 });
    }, 500 + i * 350);
    save();
    refreshStable();
  }

  const FOOD_ICON = { hay: "🌾", carrot: "🥕", apple: "🍎", oats: "🥣" };

  function formText() {
    const f = form();
    const hi = Math.round((jumpBoost() - 1) * 100);
    const cb = Math.round(coinBonus() * 100);
    const parts2 = [];
    parts2.push(hi >= 0 ? `hoppar ${hi}% högre` : `hoppar ${-hi}% lägre`);
    if (cb) parts2.push(`+${cb}% mynt`);
    return `Form ${Math.round(f * 100)}%: ${HORSE_NAME} ${parts2.join(", ")}.`;
  }

  function refreshMeters() {
    const en = $("#mEn"), sh = $("#mSh");
    if (!en) return;
    en.style.width = S.horse.energy + "%"; sh.style.width = S.horse.shine + "%";
    $("#vEn").textContent = Math.round(S.horse.energy); $("#vSh").textContent = Math.round(S.horse.shine);
    $("#formNote").textContent = formText();
  }

  function refreshStable() {
    if (scene === "stable" && stableTab === "care") renderStable();
  }

  function slotItems(slot) { return Items.ITEMS.filter((i) => i.slot === slot); }

  function swatch(it) {
    if (it.none) return '<div class="sw none"></div>';
    let bg = it.c;
    if (it.rainbow || it.c2 && it.slot === "wraps") bg = it.rainbow ? "linear-gradient(90deg,#ff6b8b,#ffa94d,#ffe066,#7bd88f,#5ccfee,#8a7dff)" : `repeating-linear-gradient(45deg, ${it.c} 0 8px, ${it.c2} 8px 16px)`;
    else if (it.gold) bg = "linear-gradient(135deg,#fff3b0,#f4b720,#b97a07)";
    else if (it.glitter) bg = `radial-gradient(circle at 30% 30%, #fff 0 8%, transparent 9%), radial-gradient(circle at 70% 60%, #fff 0 7%, transparent 8%), ${it.c}`;
    else if (it.stars) bg = `radial-gradient(circle at 30% 35%, ${it.c2} 0 10%, transparent 11%), radial-gradient(circle at 70% 65%, ${it.c2} 0 10%, transparent 11%), ${it.c}`;
    else if (it.stripe) bg = `linear-gradient(90deg, ${it.c} 0 40%, ${it.stripe} 40% 60%, ${it.c} 60%)`;
    else if (it.style === "braided" || it.style === "ribbons") bg = `radial-gradient(circle at 50% 50%, ${it.c} 0 30%, #24160f 32%)`;
    else if (it.style === "loose") bg = "#24160f";
    else if (it.slot === "pad" || it.slot === "rosette") bg = `radial-gradient(circle, ${it.c2 || "#fff"} 0 25%, ${it.c} 27%)`;
    else if (it.slot === "helmet") bg = `linear-gradient(160deg, ${Art.shade(it.c, 0.3)}, ${it.c} 50%, ${Art.shade(it.c, -0.2)})`;
    return `<div class="sw" style="background:${bg}"></div>`;
  }

  function renderStable() {
    const body = $("#stableBody");
    if (stableTab === "care") {
      body.innerHTML = `
        <div class="mrow"><span>Energi</span><div class="meter energy"><i id="mEn" style="width:${S.horse.energy}%"></i></div><em id="vEn">${Math.round(S.horse.energy)}</em></div>
        <div class="mrow"><span>Glans</span><div class="meter shine"><i id="mSh" style="width:${S.horse.shine}%"></i></div><em id="vSh">${Math.round(S.horse.shine)}</em></div>
        <p class="note" id="formNote">${formText()}</p>
        <h4>Borsta</h4>
        <p class="note">Dra borsten fram och tillbaka över ${HORSE_NAME}. Ju mer hon glänser, desto fler mynt får du i tävling.</p>
        <h4>Mata</h4>
        <div class="food">${Items.FOOD.map((f) => {
          const n = f.price ? S.food[f.id] || 0 : null;
          return `<button class="foodbtn" data-food="${f.id}" ${idle.eat ? "disabled" : ""}><span class="fi">${FOOD_ICON[f.id]}</span><span>${f.name}<small>${f.price ? "+" + f.energy + " energi" : "Gratis"}</small></span>${n !== null ? `<span class="n">${n}</span>` : ""}</button>`;
        }).join("")}</div>
        <p class="note">Foder köper du i Horse and Hound. Hö är gratis men räcker bara upp till 70 i energi.</p>`;
    } else {
      const group = stableTab === "tack" ? "horse" : "rider";
      const slots = Items.SLOTS[group].slice();
      if (group === "rider") slots.push({ id: "look", label: "Utseende" });
      const key = stableTab;
      if (!slots.find((s) => s.id === stableSlot[key])) stableSlot[key] = slots[0].id;
      const cur = stableSlot[key];
      let html = `<div class="chips">${slots.map((s) => `<button data-slot="${s.id}" class="${s.id === cur ? "on" : ""}">${s.label}</button>`).join("")}</div>`;
      if (cur === "look") {
        html += `<h4>Hudton</h4><div class="dots">${Items.SKINS.map((c) => `<button data-skin="${c}" class="${S.look.skin === c ? "on" : ""}" style="background:${c}" aria-label="Hudton"></button>`).join("")}</div>
          <h4>Hårfärg</h4><div class="dots">${Items.HAIRS.map((h) => `<button data-hair="${h.c}" class="${S.look.hair === h.c ? "on" : ""}" style="background:${h.c}" aria-label="${h.n}"></button>`).join("")}</div>
          <h4>Frisyr</h4><div class="chips">${Items.HAIR_STYLES.map((h) => `<button data-style="${h.id}" class="${S.look.style === h.id ? "on" : ""}">${h.n}</button>`).join("")}</div>
          <p class="note">Utseendet är gratis att ändra. Kläder och hjälm köper du i Horse and Hound.</p>`;
      } else {
        const own = slotItems(cur).filter((i) => S.owned[i.id]);
        html += `<div class="grid">${own.map((i) => `<button class="item ${S.equip[cur] === i.id ? "eq sel" : ""} ${i.rare ? "rare" : ""}" data-equip="${i.id}">${swatch(i)}<span>${i.name}</span></button>`).join("")}</div>
          <p class="note">Fler saker finns i butiken Horse and Hound.</p>
          <button class="big buy" data-go="shop">Till butiken</button>`;
      }
      body.innerHTML = html;
    }
  }

  /* =====================================================================
     BUTIKEN HORSE AND HOUND
     ===================================================================== */
  let shopTab = "horse", shopSlot = "saddle", shopSel = null;

  function drawShop(dt) {
    stepIdle(dt);
    const cs = Math.max(W / DW, H / DH);
    const rect = stageRect(screens.shop);
    ctx.setTransform(dpr * cs, 0, 0, dpr * cs, 0, dpr * (H - DH * cs) / 2);
    Scene.drawShop(ctx, DW, DH, idle.t, { sw: rect.w / cs });
    stageZoomTarget = shopTab === "rider" ? 1 : 0;
    const prev = shopSel ? { [shopSel.slot]: shopSel.id } : null;
    drawStageHorse(rect, { care: false, prev });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawScreenParts();
  }

  function renderShop() {
    const body = $("#shopBody");
    const od = $("#shopDetail");
    if (od) od.remove();
    if (shopTab === "food") {
      body.innerHTML = `<p class="note">Fodret ger ${HORSE_NAME} energi. Mata i stallet.</p><div class="food">${Items.FOOD.filter((f) => f.price > 0).map((f) => `
        <div class="foodbtn" style="flex-direction:column;align-items:stretch;cursor:default">
          <div style="display:flex;gap:10px;align-items:center"><span class="fi">${FOOD_ICON[f.id]}</span><span>${f.name}<small>+${f.energy} energi</small></span><span class="n">${S.food[f.id] || 0}</span></div>
          <button class="big buy" data-buyfood="${f.id}" ${S.coins < f.price ? "disabled" : ""} style="padding:8px 10px;margin-top:6px">Köp för <i class="coin"></i> ${f.price}</button>
        </div>`).join("")}</div>`;
      return;
    }
    const group = shopTab === "horse" ? "horse" : "rider";
    const slots = Items.SLOTS[group];
    if (!slots.find((s) => s.id === shopSlot)) shopSlot = slots[0].id;
    const items = slotItems(shopSlot);
    const sel = shopSel && shopSel.slot === shopSlot ? Items.byId[shopSel.id] : null;
    let html = `<div class="chips">${slots.map((s) => `<button data-slot="${s.id}" class="${s.id === shopSlot ? "on" : ""}">${s.label}</button>`).join("")}</div>`;
    html += `<div class="grid">${items.map((i) => `<button class="item ${sel && sel.id === i.id ? "sel" : ""} ${S.equip[i.slot] === i.id ? "eq" : ""} ${i.rare ? "rare" : ""}" data-item="${i.id}">${swatch(i)}<span>${i.name}</span>${S.owned[i.id] ? '<div class="price own">Ägs</div>' : `<div class="price"><i class="coin"></i>${i.price}</div>`}</button>`).join("")}</div>`;
    body.innerHTML = html;
    renderShopDetail();
  }

  function renderShopDetail() {
    const old = $("#shopDetail");
    if (old) old.remove();
    const sel = shopSel && shopSel.slot === shopSlot ? Items.byId[shopSel.id] : null;
    if (!sel) return;
    const own = !!S.owned[sel.id];
    const eq = S.equip[sel.slot] === sel.id;
    const d = document.createElement("div");
    d.className = "detail"; d.id = "shopDetail";
    let btn;
    if (own) btn = `<button class="big go" data-use="${sel.id}" ${eq ? "disabled" : ""}>${eq ? "Används" : "Använd"}</button>`;
    else btn = `<button class="big buy" data-buy="${sel.id}" ${S.coins < sel.price ? "disabled" : ""}>Köp <i class="coin"></i> ${sel.price}</button>`;
    d.innerHTML = `<div class="nm">${sel.name}<small>${own ? "Du äger den här" : S.coins < sel.price ? `Du behöver ${sel.price - S.coins} mynt till` : "Prova den på bilden"}</small></div>${btn}`;
    $("#shop .panel").appendChild(d);
  }

  function buyItem(id) {
    const it = Items.byId[id];
    if (!it || S.owned[id]) return;
    if (S.coins < it.price) { toast("Du har inte tillräckligt med mynt."); Sfx.play("nope"); return; }
    S.coins -= it.price; S.owned[id] = true; S.equip[it.slot] = id;
    save(); updateCoins(); Sfx.play("buy");
    const r = stageRect(screens.shop);
    for (let i = 0; i < 16; i++) spawn({ kind: "spark", x: r.x + r.w * 0.5 + (Math.random() - 0.5) * 140, y: r.y + r.h * 0.4 + (Math.random() - 0.5) * 120, vx: (Math.random() - 0.5) * 120, vy: -30 - Math.random() * 60, life: 1, r: 5 + Math.random() * 4, c: "255,225,100" });
    shopSel = null;
    toast(it.name + " är din och på! ✨");
    renderShop();
  }

  /* =====================================================================
     KLASSER OCH BANOR
     ===================================================================== */
  const CLASSES = [
    { id: "nyb", name: "Nybörjarklass", cm: 80, n: 8, types: ["kryss", "plank"], mult: 1, doubles: 0, water: 0, gap: [800, 940], vref: 285, seed: 11, P: 122, col: "#52c66a", guide: true, desc: "Låga hinder och gott om tid att tänka." },
    { id: "latt", name: "Lätt klass", cm: 95, n: 10, types: ["kryss", "plank", "oxer"], mult: 1.4, doubles: 0, water: 0, gap: [800, 940], vref: 300, seed: 23, P: 136, col: "#3aa8ff", guide: true, desc: "Bredare hinder (oxer) och fler på banan." },
    { id: "medel", name: "Medelsvår klass", cm: 110, n: 11, types: ["plank", "oxer", "mur", "kryss"], mult: 2, doubles: 1, water: 1, gap: [780, 900], vref: 315, seed: 37, P: 152, col: "#ffb800", guide: false, desc: "Mur, vattengrav och en dubbel kombination." },
    { id: "svar", name: "Svår klass", cm: 130, n: 12, types: ["plank", "oxer", "mur"], mult: 3, doubles: 2, water: 2, gap: [760, 880], vref: 330, seed: 51, P: 170, col: "#ff5d8f", guide: false, desc: "Höga hinder, två kombinationer och två vattengravar." },
  ];

  const CM_PX = 0.8;
  const GV = [250, 360, 470];
  const GN = ["TRAV", "GALOPP", "FULL FART"];
  const JT = 0.9;
    const HFX = 40, HRX = -46;
  const RIVALS = ["Elsa & Fiona", "Noah & Mirakel", "Maja & Pärla", "Liam & Storm", "Alma & Bella", "Oscar & Tornado", "Ebba & Solstråle", "Hugo & Ben"];

  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  function makeFence(id, num, label, type, x, h, pal) {
    const f = { id, num, label, type, x, h, pal, w: 0, sets: [], rails: [], done: false, fault: false, refused: false, uMid: null, q: 0, splashed: false, gy: 0 };
    const add = (set) => { f.sets.push(set); set.rails.forEach((r) => f.rails.push(r)); };
    if (type === "plank") add({ dx: 0, hp: h + 24, fillLo: h * 0.36, fillHi: h - 12, rails: [{ x, y: h, fall: null }], flowers: true });
    else if (type === "kryss") add({ dx: 0, hp: h + 24, hTop: h, fillLo: 0, fillHi: h - 18, rails: [{ x, y: h - 4, fall: null }], flowers: true });
    else if (type === "oxer") {
      f.w = 52;
      add({ dx: 0, hp: h + 20, fillLo: h * 0.34, fillHi: h - 18, rails: [{ x, y: h - 6, fall: null }], flowers: true });
      add({ dx: 52, hp: h + 28, fillLo: h * 0.36, fillHi: h - 10, rails: [{ x: x + 52, y: h + 3, fall: null }], flowers: false });
    } else if (type === "mur") { f.w = 22; add({ dx: 0, rails: [{ x, y: h, fall: null }] }); }
    else if (type === "vatten") { f.w = 130; f.h = 0; }
    return f;
  }

  function buildCourse(cls) {
    const JPc = cls.P;
    const r = rng(cls.seed);
    const fences = [];
    const base = cls.cm * CM_PX;
    const slots = (k, exclude) => {
      const out = [];
      let guard = 0;
      while (out.length < k && guard++ < 60) {
        const i = 2 + Math.floor(r() * (cls.n - 3));
        if (out.includes(i) || exclude.includes(i) || out.some((o) => Math.abs(o - i) < 2) || exclude.some((o) => Math.abs(o - i) < 2)) continue;
        out.push(i);
      }
      return out;
    };
    const dbl = slots(cls.doubles, []);
    const wat = slots(cls.water, dbl);
    let x = 700, id = 0, lastType = "";
    for (let i = 0; i < cls.n; i++) {
      const num = i + 1;
      const pal = Math.floor(r() * 7);
      const hv = (k) => Math.round(base * (0.93 + r() * 0.14) * (k || 1));
      if (wat.includes(i)) {
        const f = makeFence(id++, num, "" + num, "vatten", x, 0, pal);
        fences.push(f); x += f.w + lerp(cls.gap[0], cls.gap[1], r()); lastType = "vatten"; continue;
      }
      if (dbl.includes(i)) {
        const t1 = r() < 0.5 ? "oxer" : "plank";
        const t2 = cls.types.includes("kryss") && r() < 0.5 ? "kryss" : "oxer";
        const a = makeFence(id++, num, num + "A", t1, x, hv(0.97), pal);
        const b = makeFence(id++, num, num + "B", t2, x + 400, hv(1.02), pal);
        fences.push(a, b); x = b.x + b.w + lerp(cls.gap[0], cls.gap[1], r()); lastType = t2; continue;
      }
      let t;
      let guard = 0;
      do { t = cls.types[Math.floor(r() * cls.types.length)]; } while (t === lastType && guard++ < 6);
      const f = makeFence(id++, num, "" + num, t, x, hv(t === "oxer" ? 0.96 : 1), pal);
      fences.push(f); x += f.w + lerp(cls.gap[0], cls.gap[1], r()); lastType = t;
    }
    const finishX = x - lerp(cls.gap[0], cls.gap[1], 0.5) + 760;
    // mynt
    const coins = [];
    const COIN_X = JT * 360 / 2; // 162: halva hoppsträckan i galopp
    fences.forEach((f, i) => {
      const mid = f.x + f.w / 2;
      if (f.type === "vatten") {
        for (let k = -2; k <= 2; k++) {
          const dx = k * 0.5 * COIN_X * 0.9;
          const s = dx / COIN_X;
          coins.push({ x: mid + dx, h: 82 + (JPc - 40) * (1 - s * s), ph: k, got: false, v: 1 });
        }
      } else {
        for (let k = -2; k <= 2; k++) {
          const dx = k * 0.5 * COIN_X * 0.85;
          const s = dx / COIN_X;
          coins.push({ x: mid + dx, h: 64 + JPc * 0.98 * (1 - s * s), ph: k + i, got: false, v: 1 });
        }
        if (i % 3 === 1) coins.push({ x: mid, h: 64 + JPc * 0.98 + 34, ph: i, got: false, v: 5, shoe: true });
      }
      // myntrad mellan hinder
      const nx = fences[i + 1];
      const start = f.x + f.w + 250;
      const end = (nx ? nx.x : finishX) - 330;
      if (end - start > 160 && !(fences[i + 1] && fences[i + 1].x - (f.x + f.w) < 500)) {
        const n = Math.min(7, Math.floor((end - start) / 64));
        for (let k = 0; k < n; k++) coins.push({ x: start + k * 64, h: 70, ph: k * 0.7, got: false, v: 1 });
      }
    });
    const allowed = Math.ceil(finishX / cls.vref + 3);
    return { fences, coins, finishX, allowed, n: cls.n, elements: fences.length };
  }

  /* ---------- hoppfönster (samma fysik som i spelet) ---------- */
  function jumpWindow(f, v, P) {
    // returnerar {lo, hi} för hästens mittpunkt vid avhopp där båda hovpar klarar alla stänger
    const T = JT;
    let lo = Infinity, hi = -Infinity;
    const x0 = f.x - v * T * 0.9, x1 = f.x + f.w + 60;
    const pts = [HFX, HRX];
    for (let cx = x0; cx <= x1; cx += 3) {
      let ok = true;
      if (f.type === "vatten") {
        // hovarna måste vara i luften över hela vattnet
        const frontLeave = cx + HFX <= f.x + 4 && cx + HFX >= f.x - 400;
        const rearLand = cx + v * T + HRX >= f.x + f.w - 4;
        ok = frontLeave && rearLand;
      } else {
        for (const r of f.rails) {
          for (const po of pts) {
            const tau = (r.x - po - cx) / v;
            if (tau < 0 || tau > T) { ok = false; break; }
            const u = (2 * tau) / T - 1;
            if (P * (1 - u * u) < r.y + 2) { ok = false; break; }
          }
          if (!ok) break;
        }
      }
      if (ok) { if (cx < lo) lo = cx; if (cx > hi) hi = cx; }
    }
    return hi >= lo ? { lo, hi } : null;
  }

  /* =====================================================================
     RIDBANAN: START
     ===================================================================== */
  let ride = null;
  let rideView0 = null;

  function renderClasses() {
    decay();
    $("#formCard").innerHTML = `<div class="fm"><h3>${HORSE_NAME} - dagsform</h3>
        <div class="mrow"><span>Energi</span><div class="meter energy"><i style="width:${S.horse.energy}%"></i></div><em>${Math.round(S.horse.energy)}</em></div>
        <div class="mrow"><span>Glans</span><div class="meter shine"><i style="width:${S.horse.shine}%"></i></div><em>${Math.round(S.horse.shine)}</em></div>
        <p>${formText()}</p></div>
        ${form() < 0.6 ? '<button class="big go" data-go="stable">Till stallet</button>' : ""}`;
    const best = (id) => (S.records[id] && S.records[id].best) || 0;
    $("#classCards").innerHTML = CLASSES.map((c, i) => {
      const locked = i >= S.unlocked;
      const b = best(c.id);
      const ro = ["", "🥇", "🥈", "🥉"][b] || "";
      return `<button class="cls ${locked ? "locked" : ""}" data-class="${i}" style="--cc:${c.col}">
        <span class="cm">${c.cm} cm</span><h3>${c.name}</h3><p>${c.desc}</p>
        <div class="meta"><span>${c.n} hinder${c.doubles ? " + kombination" : ""}</span><span>${locked ? "Kom 1-3 i " + CLASSES[i - 1].name.toLowerCase() : b ? "Bäst: plats " + b + " " + ro : "Ej ridit"}</span></div></button>`;
    }).join("");
    $("#guideToggle").checked = !!S.settings.guides;
  }

  function startRide(ci) {
    if (ci >= S.unlocked) { toast("Den klassen är låst. Placera dig 1-3 i klassen före."); Sfx.play("nope"); return; }
    Sfx.init();
    decay();
    const cls = CLASSES[ci];
    const course = buildCourse(cls);
    showScreen("ride");
    ride = {
      cls, ci, course, x: -300, v: 0, gait: 0, y: 0, air: false, airT: 0, jumpV: 0, cool: 0, jumpBuf: 0,
      state: "ready", stateT: 0, t: 0, timing: false, startClock: 0, endClock: 0, time: 0,
      faults: 0, knocks: 0, refusals: 0, waters: 0, score: 0, coins: 0, coinPts: 0, streak: 0, bestStreak: 0, perfects: 0, clean: 0,
      done: 0, cam: -300 - 260, phase: 0, prevX: [0, 0], popups: [], paused: false, out: false, P: cls.P * jumpBoost(),
      backFrom: 0, backTo: 0, hoofT: 0, dustT: 0, lastBeat: 0, hint: S.stats.rides < 3, shineAtStart: S.horse.shine,
      gaitFlash: 0, resultShown: false,
    };
    parts = [];
    $("#hud").hidden = false; $("#track").hidden = false; $("#gaitChip").hidden = false;
    $("#touch").hidden = !(("ontouchstart" in window) || navigator.maxTouchPoints > 0);
    buildTrack();
    updateHud(true);
    $("#hMute").textContent = Sfx.muted ? "🔇" : "🔊";
    $("#pause").hidden = true; $("#result").hidden = true;
    Sfx.play("bell");
    banner(cls.name, "Redo?");
    updateRotate();
  }

  function buildTrack() {
    const t = $("#track");
    $$(".dot", t).forEach((e) => e.remove());
    const bar = $("#trackBar");
    const fc = ride.course.fences;
    bar.innerHTML = fc.map((f) => `<i style="left:${(f.x / ride.course.finishX) * 100}%"></i>`).join("") + "<b></b>";
    const dot = document.createElement("div"); dot.className = "dot"; t.appendChild(dot);
  }

  function banner(big, small) {
    const b = $("#banner");
    b.innerHTML = big + (small ? `<small>${small}</small>` : "");
    b.hidden = false;
    b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
    clearTimeout(banner.t);
    banner.t = setTimeout(() => { b.hidden = true; }, 1300);
  }

  function endRideSilently() {
    if (ride && !ride.resultShown) { S.coins += ride.coins; save(); }
    ride = null;
    $("#pause").hidden = true; $("#result").hidden = true;
    parts = [];
  }

  /* =====================================================================
     RIDBANAN: SPELLOGIK
     ===================================================================== */
  function popup(text, color, big) { ride.popups.push({ text, color: color || "#fff", life: 1.3, max: 1.3, big: !!big, y: 0 }); }

  function nextFence() {
    for (const f of ride.course.fences) if (!f.done) return f;
    return null;
  }

  function takeoff() {
    const R = ride;
    R.air = true; R.airT = 0; R.jumpV = Math.max(R.v, 60); R.v = R.jumpV; R.cool = 0;
    Sfx.play("jump");
    // kvalitet: hur nära fönstrets mitt?
    const f = nextFence();
    R.curQ = 0;
    if (f) {
      const w = jumpWindow(f, R.jumpV, R.P);
      if (w) {
        const mid = (w.lo + w.hi) / 2, half = Math.max(1, (w.hi - w.lo) / 2);
        if (R.x >= w.lo - 2 && R.x <= w.hi + 2) { R.curQ = 1 - Math.abs(R.x - mid) / half; R.curF = f; }
      }
    }
  }

  function land() {
    const R = ride;
    R.air = false; R.y = 0; R.cool = 0.1;
    Sfx.play("land");
    for (let i = 0; i < 7; i++) spawn({ kind: "dust", x: R.x + HRX + Math.random() * 60, y: 0, h: 4 + Math.random() * 6, vx: -40 - Math.random() * 80, vy: -10 - Math.random() * 25, life: 0.6 + Math.random() * 0.3, r: 5 + Math.random() * 5, world: true });
    // fönstret passeras via 'curQ' sparat per fence (se passFences)
  }

  function knock(f, py) {
    const R = ride;
    let any = false;
    f.rails.forEach((r) => {
      if (!r.fall && r.y > py - 2) {
        r.fall = { h: r.y, vh: 120 + Math.random() * 80, tilt: 0, vt: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3), du: 0, vu: (Math.random() - 0.5) * 60, bounced: false };
        any = true;
      }
    });
    if (any && !f.fault) {
      f.fault = true; R.knocks++; R.faults += 4; R.streak = 0;
      Sfx.play("knock");
      popup("Rivning! +4 fel", "#ffb0b0");
      R.v *= 0.9; R.jumpV = R.v;
      R.shake = 0.25;
    }
  }

  function refuse(f) {
    const R = ride;
    R.state = "refuse"; R.stateT = 0; R.refusals++; R.faults += 4; R.streak = 0;
    f.refused = true; R.refF = f;
    R.air = false; R.y = 0;
    Sfx.play("refuse");
    if (R.refusals >= 3) {
      R.out = true; R.state = "finish"; R.stateT = 0; R.endClock = R.t;
      popup("Utesluten!", "#ffb0b0", true);
      banner("Utesluten", "3 vägringar");
      Sfx.play("sad");
      return;
    }
    popup("Vägran! +4 fel", "#ffb0b0", true);
    banner("Vägran!", R.refusals === 2 ? "Nästa vägran = utesluten" : "Ta nytt tag");
    R.backFrom = R.x; R.backTo = Math.max(-200, f.x - 340);
  }

  function collide(dt) {
    const R = ride;
    const px = [R.x + HFX, R.x + HRX];
    const py = R.air ? R.y : 0;
    const prev = R.prevX;
    for (const f of R.course.fences) {
      if (f.x - 120 > R.x + 120 || f.x + f.w + 140 < R.x - 120) continue;
      if (f.type === "vatten") {
        if (!f.splashed && py < 5 && ((px[0] > f.x && px[0] < f.x + f.w) || (px[1] > f.x && px[1] < f.x + f.w))) {
          f.splashed = true; f.fault = true; R.waters++; R.faults += 4; R.streak = 0;
          Sfx.play("splash"); popup("Vattenfel! +4 fel", "#b8e6ff");
          for (let i = 0; i < 14; i++) spawn({ kind: "splash", x: Math.max(f.x, Math.min(f.x + f.w, px[1])) + (Math.random() - 0.5) * 40, y: 0, h: 6, vx: (Math.random() - 0.3) * 150, vy: -120 - Math.random() * 140, g: 520, life: 0.7, r: 3 + Math.random() * 3, world: true });
        }
        continue;
      }
      for (const r of f.rails) {
        if (r.fall) continue;
        for (let i = 0; i < 2; i++) {
          const a = Math.min(prev[i], px[i]), b = Math.max(prev[i], px[i]);
          if (a > r.x + 5 || b < r.x - 5) continue;
          if (py >= r.y - 1) continue;
          if (!R.air && R.state === "run") {
            // bakbenen i marken efter ett hopp = rivning, annars vägran
            if (i === 1 && px[0] > r.x + 5) knock(f, 0); else { refuse(f); return; }
          } else if (R.air) knock(f, py);
        }
      }
    }
    prev[0] = px[0]; prev[1] = px[1];
  }

  function passFences() {
    const R = ride;
    for (const f of R.course.fences) {
      if (f.done) continue;
      const mid = f.x + f.w / 2;
      if (f.uMid == null && R.x >= mid) {
        f.uMid = R.air ? (R.airT / JT) * 2 - 1 : null;
        f.q = R.air && R.curF === f ? R.curQ : 0;
      }
      if (R.x + HRX > f.x + f.w + 10) {
        f.done = true; R.done++;
        let pts = 0;
        const m = R.cls.mult;
        if (!f.fault) {
          const perfect = f.q > 0.55 && !f.refused;
          pts = Math.round((f.refused ? 60 : 100) * m);
          R.clean++;
          if (perfect) {
            R.perfects++;
            pts += Math.round(50 * m);
            R.streak++; R.bestStreak = Math.max(R.bestStreak, R.streak);
            const sb = Math.min(5, R.streak - 1) * 10 * m;
            if (sb) pts += Math.round(sb);
            popup(R.streak > 2 ? "Perfekt! x" + R.streak : "Perfekt!", "#fff3a0", true);
            Sfx.play("perfect");
            sparkBurst(R.x, 150);
          } else if (!f.refused) {
            R.streak = Math.max(0, R.streak);
            popup("Bra!", "#ffffff");
            Sfx.play("good");
          }
        } else if (f.type !== "vatten") pts = Math.round(20 * m);
        R.score += pts;
        updateHud(true);
      }
    }
  }

  function sparkBurst(x, h) {
    for (let i = 0; i < 12; i++) spawn({ kind: "spark", x: x + (Math.random() - 0.5) * 60, y: 0, h: h + (Math.random() - 0.5) * 120, vx: (Math.random() - 0.5) * 120, vy: -(20 + Math.random() * 80), life: 0.8, r: 5 + Math.random() * 5, c: "255,235,120", world: true });
  }

  function collectCoins() {
    const R = ride;
    const bodyH = (R.air ? R.y : 0) + 62;
    const cx = R.x + 8;
    for (const c of R.course.coins) {
      if (c.got) continue;
      if (c.x < cx - 60 || c.x > cx + 60) continue;
      if (Math.hypot(c.x - cx, c.h - bodyH) < (c.shoe ? 46 : 38)) {
        c.got = true;
        R.coins += c.v; R.coinPts += c.v * 10; R.score += c.v * 10;
        Sfx.play(c.shoe ? "horseshoe" : "coin");
        for (let i = 0; i < 5; i++) spawn({ kind: "spark", x: c.x, y: 0, h: c.h, vx: (Math.random() - 0.5) * 140, vy: 40 + Math.random() * 80, life: 0.5, r: 4 + Math.random() * 3, c: "255,225,90", world: true });
        if (c.shoe) popup("Hästsko! +5 mynt", "#ffe680");
        updateHud(true);
      }
    }
  }

  function modeOf(v) { return v < 25 ? "stand" : v < 150 ? "walk" : v < 305 ? "trot" : v < 415 ? "canter" : "gallop"; }
  const BEATS = { trot: [0, 0.5], canter: [0, 0.14, 0.3], gallop: [0, 0.1, 0.3, 0.42], walk: [0, 0.25, 0.5, 0.75] };

  function updateRide(dt) {
    const R = ride;
    if (!R || R.paused || R.resultShown) return;
    if (document.body.classList.contains("need-rotate")) return; // telefonen står upp: vänta på liggande läge
    R.t += dt; R.stateT += dt;
    if (R.shake > 0) R.shake -= dt;

    // nedräkning
    if (R.state === "ready") {
      if (!R.rung && R.stateT > 1.4) { R.rung = true; Sfx.play("beep"); banner("Rid!", R.hint ? "Passera startlinjen - då startar tiden" : ""); Sfx.play("go"); }
      if (R.stateT > 1.5) { R.state = "run"; R.stateT = 0; R.v = 0; }
    }

    // fart
    if (R.state === "run" || R.state === "ready") {
      if (R.state === "run" && !R.air) {
        const tv = GV[R.gait];
        const acc = 320;
        R.v += clamp(tv - R.v, -acc * 1.3 * dt, acc * dt);
      }
    } else if (R.state === "finish") R.v *= Math.pow(R.out ? 0.0004 : 0.1, dt);
    else if (R.state === "refuse") R.v *= Math.pow(0.0004, dt);

    // hopp
    R.cool = Math.max(0, R.cool - dt);
    R.jumpBuf = Math.max(0, R.jumpBuf - dt);
    if (R.state === "run" && R.jumpBuf > 0 && !R.air && R.cool <= 0 && R.v > 90) { R.jumpBuf = 0; takeoff(); }

    // förflyttning
    if (R.state === "refuse") {
      if (R.stateT > 0.9) {
        const k = clamp((R.stateT - 0.9) / 0.9, 0, 1);
        const e = k * k * (3 - 2 * k);
        R.x = lerp(R.backFrom, R.backTo, e);
        R.prevX[0] = R.x + HFX; R.prevX[1] = R.x + HRX;
        if (k >= 1) { R.state = "run"; R.stateT = 0; R.v = 0; R.cool = 0; }
      }
    } else if (R.air) {
      R.airT += dt;
      const u = (R.airT / JT) * 2 - 1;
      R.y = R.P * Math.max(0, 1 - u * u);
      R.x += R.jumpV * dt;
      if (R.airT >= JT) land();
    } else if (R.state !== "ready") {
      R.x += R.v * dt;
    }

    // tidtagning
    if (!R.timing && R.x >= 0 && R.state === "run") { R.timing = true; R.startClock = R.t; Sfx.play("beep"); }
    if (R.timing && R.state !== "finish") R.time = R.t - R.startClock;

    if (R.state === "run") { collide(dt); if (ride !== R) return; }
    if (R.state === "run" || R.state === "finish") { passFences(); collectCoins(); }

    // mål
    if (R.state === "run" && R.x >= R.course.finishX) {
      R.state = "finish"; R.stateT = 0; R.endClock = R.t; R.time = R.endClock - R.startClock;
      Sfx.play("fanfare"); Sfx.play("cheer");
      banner("Mål!", "Bra ridit!");
      for (let i = 0; i < 40; i++) spawn({ kind: "conf", x: R.x + 100 + Math.random() * 300, y: 0, h: 260 + Math.random() * 160, vx: -40 + Math.random() * 80, vy: 20 + Math.random() * 60, g: 90, rot: Math.random() * TAU, vr: (Math.random() - 0.5) * 8, col: ["#ff5d8f", "#ffd23f", "#4da3ff", "#7be07b", "#b07cff"][i % 5], life: 2 + Math.random(), world: true });
    }
    if (R.state === "finish" && R.stateT > (R.out ? 1.5 : 2.0) && !R.resultShown) finishRide();

    // animation
    R.mode = R.air ? (R.v > 410 ? "gallop" : "canter") : modeOf(R.v);
    const g = Art.GAITS[R.mode === "stand" ? "stand" : R.mode];
    if (R.mode !== "stand" && !R.air) {
      const freq = clamp((R.v * g.stance) / (2 * g.A), 0.4, 3.4);
      const before = R.phase;
      R.phase += dt * freq;
      const beats = BEATS[R.mode];
      if (beats && R.state === "run") {
        const a = ((before % 1) + 1) % 1, b = ((R.phase % 1) + 1) % 1;
        beats.forEach((th) => { if ((a < th && b >= th) || (a > b && (th >= a || th <= b))) Sfx.hoofBeat(R.mode === "gallop" ? 1 : 0.85); });
      }
    } else if (R.air) R.phase += dt * 1.2;

    // damm
    if (!R.air && R.v > 160 && R.state !== "ready") {
      R.dustT -= dt;
      if (R.dustT <= 0) { R.dustT = 0.09; spawn({ kind: "dust", x: R.x + HRX - 6, y: 0, h: 5, vx: -30 - R.v * 0.1, vy: -12 - Math.random() * 14, life: 0.5, r: 3.5 + Math.random() * 3, world: true }); }
    }

    // popups
    for (let i = R.popups.length - 1; i >= 0; i--) { R.popups[i].life -= dt; R.popups[i].y -= 34 * dt; if (R.popups[i].life <= 0) R.popups.splice(i, 1); }
    // partiklar (världsrymd)
    stepWorldParts(dt);

    // kamera
    const targetCam = R.x - rideViewVW() * 0.3 - (R.v / 470) * 40;
    R.cam += (targetCam - R.cam) * Math.min(1, dt * 7);

    updateHud(false);
  }

  function rideViewVW() { return rideView().vW; }

  function stepWorldParts(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= dt;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      if (p.world) {
        p.x += (p.vx || 0) * dt;
        p.h = (p.h || 0) - (p.vy || 0) * dt; // vy uppåt = negativt i skärmrymd
        if (p.g) p.vy += p.g * dt;
        if (p.rot != null) p.rot += (p.vr || 0) * dt;
      } else {
        p.x += (p.vx || 0) * dt; p.y += (p.vy || 0) * dt;
        if (p.g) p.vy += p.g * dt;
      }
    }
    if (parts.length > 300) parts.splice(0, parts.length - 300);
  }

  /* ---------- fallande stänger ---------- */
  function stepRails(dt) {
    if (!ride) return;
    for (const f of ride.course.fences) {
      if (Math.abs(f.x - ride.x) > 700) continue;
      for (const r of f.rails) {
        const q = r.fall;
        if (!q || q.rest) continue;
        q.vh -= 1500 * dt;
        q.h += q.vh * dt;
        q.du += q.vu * dt;
        q.tilt += q.vt * dt;
        if (q.h <= 5) {
          q.h = 5;
          if (!q.bounced) { q.bounced = true; q.vh = -q.vh * 0.28; q.vt *= 0.4; q.vu *= 0.4; Sfx.play("knock", 0.5); }
          else { q.rest = true; q.vh = 0; q.tilt = clamp(q.tilt, -0.5, 0.5); }
        }
      }
    }
  }

  /* =====================================================================
     RIDBANAN: HUD
     ===================================================================== */
  const hudCache = {};
  function setText(id, v) { if (hudCache[id] !== v) { hudCache[id] = v; $("#" + id).textContent = v; } }
  function updateHud(force) {
    const R = ride;
    if (!R) return;
    const tf = R.timing ? Math.max(0, Math.ceil(R.time - R.course.allowed)) : 0;
    setText("hCoins", R.coins);
    setText("hFence", Math.min(R.done + 1, R.course.fences.length) + "/" + R.course.fences.length);
    setText("hFaults", R.faults + tf);
    $("#hFaultChip").classList.toggle("warn", R.faults + tf > 0);
    setText("hTime", R.time.toFixed(1));
    setText("hScore", R.score);
    setText("gaitName", GN[R.gait]);
    $$("#gaitChip .pips i").forEach((e, i) => e.classList.toggle("on", i <= R.gait));
    const dot = $("#track .dot");
    const fill = $("#trackBar b");
    const prog = clamp((R.x + 0) / R.course.finishX, 0, 1);
    if (dot) dot.style.left = prog * 100 + "%";
    if (fill) fill.style.width = prog * 100 + "%";
  }

  /* =====================================================================
     RIDBANAN: MÅL, POÄNG, PLACERING OCH REKORD
     ===================================================================== */
  function finishRide() {
    const R = ride;
    R.resultShown = true;
    const cls = R.cls, m = cls.mult;
    const out = R.out;
    const timeFaults = out ? 0 : Math.max(0, Math.ceil(R.time - R.course.allowed));
    const faults = R.faults + timeFaults;
    const clear = !out && faults === 0;
    let score = R.score;
    let timeBonus = 0, clearBonus = 0;
    if (!out) {
      timeBonus = Math.round(Math.max(0, R.course.allowed - R.time) * 8 * m);
      clearBonus = clear ? 300 * m : 0;
      score += timeBonus + clearBonus - timeFaults * 25 * m;
    }
    score = Math.max(0, Math.round(score));

    // placering mot ryttarfältet
    const smax = (cls.n * 130 + 300 + R.course.allowed * 5) * m + 300;
    const rr = rng(cls.seed * 131 + S.stats.rides * 7 + 5);
    const field = RIVALS.map((n, i) => ({ n, s: Math.round(smax * (0.3 + 0.64 * Math.pow(i / (RIVALS.length - 1), 0.9)) * (0.95 + rr() * 0.1)) }));
    let place = 0;
    if (!out) place = 1 + field.filter((r) => r.s > score).length;
    const list = field.slice();
    list.push({ n: "Du & " + HORSE_NAME, s: out ? 0 : score, me: true });
    list.sort((a, b) => b.s - a.s);

    const prizeBase = [0, 120, 80, 50, 25, 15][place] || 0;
    const prize = Math.round(prizeBase * m);
    const bonusPct = coinBonus();
    const glans = Math.round(R.coins * bonusPct);
    const earned = R.coins + glans + prize;
    S.coins += earned;
    S.stats.rides++;

    const kind = ["", "blue", "red", "yellow", "green"][place > 4 ? 0 : place];
    if (kind) S.rosettes[kind]++;
    // stall och form
    S.horse.energy = clamp(S.horse.energy - 14, 0, 100);
    S.horse.shine = clamp(S.horse.shine - 9, 0, 100);
    S.horse.ts = Date.now();

    // upplåsning
    let unlocked = false;
    if (!out && place > 0 && place <= 3 && S.unlocked === R.ci + 1 && R.ci + 1 < CLASSES.length) { S.unlocked = R.ci + 2; unlocked = true; }

    // rekord
    const newRecs = [];
    if (!out) {
      const date = new Date().toISOString();
      const ms = Math.round(R.time * 1000);
      [cls.id, "all"].forEach((key) => {
        const b = S.records[key] || (S.records[key] = { points: [], time: [], best: 0 });
        const e = { v: score, d: date, c: cls.id };
        b.points.push(e); b.points.sort((a, c2) => c2.v - a.v); b.points = b.points.slice(0, 3);
        if (b.points[0] === e && key === cls.id) newRecs.push("Nytt poängrekord i " + cls.name.toLowerCase());
        else if (b.points.includes(e) && key === cls.id) newRecs.push("Topp 3 på poäng i " + cls.name.toLowerCase());
        if (clear) {
          const t = { v: ms, d: date, c: cls.id };
          b.time.push(t); b.time.sort((a, c2) => a.v - c2.v); b.time = b.time.slice(0, 3);
          if (b.time[0] === t && key === cls.id) newRecs.push("Nytt tidsrekord: " + fmtTime(ms));
          else if (b.time.includes(t) && key === cls.id) newRecs.push("Topp 3 på tid i " + cls.name.toLowerCase());
        }
      });
      const cb = S.records[cls.id];
      if (place > 0 && (!cb.best || place < cb.best)) cb.best = place;
    }
    save();
    updateCoins();
    showResult({ cls, out, score, faults, timeFaults, clear, timeBonus, clearBonus, place, prize, glans, coins: R.coins, earned, list, kind, unlocked, newRecs, time: R.time, perfects: R.perfects, clean: R.clean, total: R.course.fences.length, bestStreak: R.bestStreak, allowed: R.course.allowed });
  }

  function fmtTime(ms) {
    const s = ms / 1000;
    const m = Math.floor(s / 60);
    return (m ? m + ":" + ("0" + (s % 60).toFixed(1)).slice(-4) : s.toFixed(1)) + (m ? "" : " s");
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString("sv-SE", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return iso.slice(0, 10); }
  }

  const ROS = { blue: ["#2a6fdc", "#9ec3ff", "Blå rosett"], red: ["#e03a4a", "#ffb0b8", "Röd rosett"], yellow: ["#f2c230", "#fff0a0", "Gul rosett"], green: ["#2fae6a", "#a0e8c0", "Grön rosett"] };

  function showResult(r) {
    $("#hud").hidden = true; $("#touch").hidden = true; $("#track").hidden = true; $("#gaitChip").hidden = true; $("#banner").hidden = true;
    const el = $("#result");
    const title = r.out ? "Utesluten" : r.clear ? "Felfri runda!" : r.place === 1 ? "Seger!" : "Banan avklarad";
    const sub = r.out ? "Tre vägringar, men mynten du samlade får du behålla." : r.place ? `Du kom på plats ${r.place} av ${r.list.length} i ${r.cls.name.toLowerCase()}.` : `Du kom utanför placeringarna i ${r.cls.name.toLowerCase()}.`;
    const rivals = r.list.slice(0, 5).map((x, i) => `<div class="${x.me ? "me" : ""}"><span>${i + 1}</span><span>${x.n}</span><span>${x.s}</span></div>`).join("") + (r.list.findIndex((x) => x.me) > 4 ? `<div class="me"><span>${r.list.findIndex((x) => x.me) + 1}</span><span>Du & ${HORSE_NAME}</span><span>${r.score}</span></div>` : "");
    const nextOk = !r.out && r.place > 0 && r.place <= 3 && CLASSES[ride ? ride.ci + 1 : 0];
    el.innerHTML = `<div class="card">
      <div class="res-head"><canvas class="rosbig" id="rosCv" width="176" height="224"></canvas><div><h2>${title}</h2><p>${sub}</p></div></div>
      <div class="stats">
        <div class="stat"><small>POÄNG</small><b>${r.score}</b></div>
        <div class="stat ${r.faults ? "bad" : "good"}"><small>FEL</small><b>${r.faults}</b></div>
        <div class="stat"><small>TID</small><b>${r.time.toFixed(1)} s</b></div>
        <div class="stat"><small>TILLÅTEN TID</small><b>${r.allowed} s</b></div>
        <div class="stat"><small>PERFEKTA HOPP</small><b>${r.perfects}/${r.total}</b></div>
        <div class="stat good"><small>MYNT</small><b>+${r.earned}</b></div>
      </div>
      <p class="note" style="text-align:left">${r.prize ? `Prispengar +${r.prize}. ` : ""}${r.coins} insamlade${r.glans ? ` + ${r.glans} glansbonus` : ""}${r.clearBonus ? `. Felfri bonus +${r.clearBonus} poäng` : ""}${r.timeBonus ? `, tidsbonus +${r.timeBonus}` : ""}${r.timeFaults ? `. Tidsfel ${r.timeFaults}` : ""}.</p>
      ${r.newRecs.map((n) => `<div class="newrec">🏆 ${n}</div>`).join("")}
      ${r.unlocked ? `<div class="newrec">🔓 Ny klass upplåst: ${CLASSES[ride.ci + 1].name}</div>` : ""}
      <div class="rivals">${rivals}</div>
      <div class="btnrow">
        <button class="big" id="rAgain">Rid igen</button>
        ${nextOk ? '<button class="big go" id="rNext">Nästa klass</button>' : ""}
        <button class="big alt" id="rStable">Till stallet</button>
        <button class="big alt" id="rMenu">Meny</button>
      </div></div>`;
    el.hidden = false;
    const cv = $("#rosCv"), c2 = cv.getContext("2d");
    c2.scale(2, 2);
    if (r.kind) { const [a, b] = ROS[r.kind]; Art.drawRosette(c2, 44, 46, 34, a, b, 0.2, true); }
    else { c2.fillStyle = "#d9e2ef"; c2.beginPath(); c2.arc(44, 46, 30, 0, TAU); c2.fill(); c2.fillStyle = "#8895b0"; c2.font = "900 30px system-ui"; c2.textAlign = "center"; c2.textBaseline = "middle"; c2.fillText(r.out ? "×" : "-", 44, 47); }
    const ci = ride.ci;
    $("#rAgain").onclick = () => { Sfx.play("click"); startRide(ci); };
    if ($("#rNext")) $("#rNext").onclick = () => { Sfx.play("click"); startRide(ci + 1); };
    $("#rStable").onclick = () => go("stable");
    $("#rMenu").onclick = () => go("menu");
    if (r.out) Sfx.play("sad"); else if (r.place && r.place <= 3) Sfx.play("unlock");
  }

  /* =====================================================================
     REKORD
     ===================================================================== */
  let recTab = "all";
  function renderRecords() {
    const tabs = [{ id: "all", n: "Alla klasser", c: "#1f2f5c" }].concat(CLASSES.map((c) => ({ id: c.id, n: c.name, c: c.col })));
    $("#recTabs").innerHTML = tabs.map((t) => `<button data-rec="${t.id}" class="${t.id === recTab ? "on" : ""}">${t.n}</button>`).join("");
    const b = S.records[recTab] || { points: [], time: [] };
    const col = (list, kind) => {
      const rows = [];
      for (let i = 0; i < 3; i++) {
        const e = list[i];
        if (!e) { rows.push(`<div class="rec empty"><div class="medal m${i + 1}">${i + 1}</div><div><div class="v">-</div><div class="d">Inget rekord än</div></div></div>`); continue; }
        const c = CLASSES.find((x) => x.id === e.c);
        rows.push(`<div class="rec"><div class="medal m${i + 1}">${i + 1}</div><div><div class="v">${kind === "points" ? e.v + " p" : fmtTime(e.v)}</div><div class="d">${fmtDate(e.d)}</div></div>${recTab === "all" && c ? `<span class="c" style="background:${c.col}">${c.name.replace(" klass", "")}</span>` : ""}</div>`);
      }
      return rows.join("");
    };
    $("#recBody").innerHTML = `<div class="reccol"><h3>Mest poäng</h3>${col(b.points, "points")}</div><div class="reccol"><h3>Snabbast tid</h3>${col(b.time, "time")}</div>`;
  }

  /* =====================================================================
     RIDBANAN: RITNING
     ===================================================================== */
  function drawRide(dt) {
    const R = ride;
    const { s, vW, vH } = rideView();
    ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
    const gy = vH - 92;
    const cam = R.cam;
    const t = R.t;
    Scene.drawBackdrop(ctx, { vW, vH, gy, cam, t });

    // allt i världsrymd: x - cam
    ctx.save();
    ctx.translate(-cam, 0);
    const vis0 = cam - 200, vis1 = cam + vW + 200;

    // hoppzoner
    if (S.settings.guides && R.cls.guide && R.state !== "ready") drawGuides(R, gy);

    // start och mål
    const start = Scene.drawGate(ctx, 0, gy, "START", "#2f9a4a", t, false);
    const fin = Scene.drawGate(ctx, R.course.finishX, gy, "MÅL", "#e8384f", t, true);
    start.back(); fin.back();

    // hinder (bakre del)
    const fc = R.course.fences;
    for (const f of fc) { if (f.x + f.w < vis0 || f.x > vis1) continue; f.gy = gy; Scene.drawFenceBack(ctx, f, t); }
    // mynt
    for (const c of R.course.coins) {
      if (c.got || c.x < vis0 || c.x > vis1) continue;
      if (c.shoe) Scene.drawHorseshoe(ctx, c.x, gy - c.h, t, c.ph); else Scene.drawCoin(ctx, c.x, gy - c.h, t, c.ph);
    }
    // partiklar bakom
    drawWorldParts(gy, false);

    // häst
    const sc = 1.12;
    const u = R.air ? (R.airT / JT) * 2 - 1 : 0;
    const shk = R.shake > 0 ? Math.sin(R.t * 60) * 2 : 0;
    const toss = R.state === "refuse" ? Math.max(0, Math.sin(R.stateT * 9)) * (R.stateT < 1.4 ? 1 : 0) : 0;
    Art.drawHorse(ctx, {
      x: R.x, y: gy - R.y + shk, scale: sc, t, mode: R.state === "refuse" ? "stand" : R.mode, phase: R.phase, air: R.air ? 1 : 0, u, lift: R.y,
      flow: clamp(R.v / 470, 0, 1) * 0.9 + 0.1, tack: tackData(), rider: riderData(), shine: S.horse.shine / 100, blink: Math.sin(t * 1.3) > 0.985, toss,
      ear: R.v > 250 ? 0.3 : 0,
    });

    // hinder (främre del)
    for (const f of fc) { if (f.x + f.w < vis0 || f.x > vis1) continue; Scene.drawFenceFront(ctx, f, t); Scene.drawFenceNumber(ctx, f); }
    start.front(); fin.front();
    drawWorldParts(gy, true);
    ctx.restore();

    // popup-texter nära hästen
    ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
    const hx = R.x - cam;
    R.popups.forEach((p, i) => {
      const a = clamp(p.life / 0.5, 0, 1) * clamp((p.max - p.life) / 0.1 + 0.2, 0, 1);
      ctx.globalAlpha = a;
      ctx.font = `900 ${p.big ? 30 : 22}px ui-rounded, system-ui, sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = 6; ctx.strokeStyle = "rgba(31,47,92,.6)"; ctx.lineJoin = "round";
      const y = Math.max(112, gy - Math.max(R.y, 0) - 330) + p.y;
      ctx.strokeText(p.text, hx + 40, y); ctx.fillStyle = p.color; ctx.fillText(p.text, hx + 40, y);
      ctx.globalAlpha = 1;
    });
    // hjälptext första ritterna
    if (R.hint && R.state === "run" && R.t < 14) {
      ctx.font = "800 17px ui-rounded, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,.95)";
      ctx.lineWidth = 5; ctx.strokeStyle = "rgba(31,47,92,.55)";
      const m = "Hoppa när hovarna är i det gröna fältet. ← → ändrar tempot.";
      ctx.strokeText(m, vW / 2, vH - 78); ctx.fillText(m, vW / 2, vH - 78);
    }
    Scene.drawForeground(ctx, vW, vH, gy, cam, t);
  }

  function drawWorldParts(gy, front) {
    const list = parts.filter((p) => p.world && (p.kind === "dust" ? !front : front));
    if (!list.length) return;
    const mapped = list.map((p) => Object.assign({}, p, { y: gy - (p.h || 0) }));
    Scene.drawParticles(ctx, mapped);
  }

  function drawGuides(R, gy) {
    let shown = 0;
    for (const f of R.course.fences) {
      if (f.done) continue;
      if (f.x - R.x > 640) break;
      if (shown >= 2) break;
      shown++;
      const v = R.air ? R.jumpV : Math.max(R.v, GV[R.gait] * 0.9);
      const w = jumpWindow(f, Math.max(v, 150), R.P);
      if (!w) continue;
      const a = w.lo + HFX, b = w.hi + HFX;
      const y0 = Scene.proj(0, gy, -46, 0), y1 = Scene.proj(0, gy, 46, 0);
      const pulse = 0.5 + 0.5 * Math.sin(R.t * 5);
      ctx.save();
      const pa = [a + (y0[0]), y0[1]], pb = [b + (y0[0]), y0[1]], pc = [b + (y1[0]), y1[1]], pd = [a + (y1[0]), y1[1]];
      ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.lineTo(pc[0], pc[1]); ctx.lineTo(pd[0], pd[1]); ctx.closePath();
      const gg = ctx.createLinearGradient(a, 0, b, 0);
      gg.addColorStop(0, "rgba(90,220,120,0)"); gg.addColorStop(0.2, `rgba(90,230,120,${0.45 + pulse * 0.2})`); gg.addColorStop(0.8, `rgba(90,230,120,${0.45 + pulse * 0.2})`); gg.addColorStop(1, "rgba(90,220,120,0)");
      ctx.fillStyle = gg; ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.5 + pulse * 0.3})`; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.moveTo((pa[0] + pb[0]) / 2, y0[1]); ctx.lineTo((pc[0] + pd[0]) / 2, y1[1]); ctx.stroke();
      ctx.restore();
    }
  }

  /* =====================================================================
     INMATNING
     ===================================================================== */
  function act(name) {
    const R = ride;
    if (!R || R.resultShown) return;
    if (R.paused) return;
    if (name === "jump") { R.jumpBuf = 0.12; }
    else if (name === "fast" && !R.air && R.state !== "refuse") { if (R.gait < 2) { R.gait++; Sfx.play("click"); } }
    else if (name === "slow" && !R.air && R.state !== "refuse") { if (R.gait > 0) { R.gait--; Sfx.play("click"); } }
  }

  function setPaused(p) {
    if (!ride || ride.resultShown) return;
    ride.paused = p;
    $("#pause").hidden = !p;
  }

  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    Sfx.init();
    const k = e.key;
    if (scene === "ride" && ride) {
      if (k === " " || k === "ArrowUp" || k === "w" || k === "W") { act("jump"); e.preventDefault(); }
      else if (k === "ArrowRight" || k === "d" || k === "D") { act("fast"); e.preventDefault(); }
      else if (k === "ArrowLeft" || k === "a" || k === "A") { act("slow"); e.preventDefault(); }
      else if (k === "Escape" || k === "p" || k === "P") setPaused(!ride.paused);
    }
    if (k === "m" || k === "M") toggleMute();
  });

  function bindHold(el) {
    const name = el.dataset.act;
    el.addEventListener("pointerdown", (e) => { e.preventDefault(); Sfx.init(); el.classList.add("hold"); act(name); });
    const up = () => el.classList.remove("hold");
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up); el.addEventListener("pointerleave", up);
  }
  $$("#touch .btn").forEach(bindHold);

  canvas.addEventListener("pointerdown", (e) => {
    Sfx.init();
    if (scene === "ride" && ride && !ride.paused) { if (e.clientX > W * 0.5) act("jump"); }
    if (scene === "stable") {
      brush.on = true; brush.x = e.clientX; brush.y = e.clientY; brush.last = [e.clientX, e.clientY];
      try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* */ }
    }
  });
  canvas.addEventListener("pointermove", (e) => {
    if (scene === "stable") {
      brush.x = e.clientX; brush.y = e.clientY;
      if (brush.on) brushMove(e.clientX, e.clientY);
    }
  });
  const brushOff = () => { brush.on = false; brush.last = null; };
  canvas.addEventListener("pointerup", brushOff);
  canvas.addEventListener("pointercancel", brushOff);

  function toggleMute() {
    Sfx.setMuted(!Sfx.muted);
    S.settings.mute = Sfx.muted; save();
    $("#mMute").textContent = Sfx.muted ? "🔇" : "🔊";
    $("#hMute").textContent = Sfx.muted ? "🔇" : "🔊";
  }
  $("#mMute").onclick = () => { Sfx.init(); toggleMute(); };
  $("#hMute").onclick = () => { Sfx.init(); toggleMute(); };
  $("#hPause").onclick = () => setPaused(true);
  $("#pResume").onclick = () => { Sfx.play("click"); setPaused(false); };
  $("#pRetry").onclick = () => { Sfx.play("click"); const ci = ride.ci; endRideSilently(); startRide(ci); };
  $("#pQuit").onclick = () => go("menu");

  // delegerade klick
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, .item, .cls, .foodbtn");
    if (!t) return;
    Sfx.init();
    if (t.dataset.go) { go(t.dataset.go); return; }
    if (t.dataset.class != null) { startRide(+t.dataset.class); return; }
    if (t.dataset.tab) {
      const inStable = !!t.closest("#stableTabs"), inShop = !!t.closest("#shopTabs");
      Sfx.play("click");
      if (inStable) { stableTab = t.dataset.tab; setTabs("#stableTabs", stableTab); renderStable(); }
      if (inShop) { shopTab = t.dataset.tab; shopSlot = shopTab === "horse" ? "saddle" : "helmet"; shopSel = null; setTabs("#shopTabs", shopTab); renderShop(); }
      return;
    }
    if (t.dataset.rec) { recTab = t.dataset.rec; Sfx.play("click"); renderRecords(); return; }
    if (t.dataset.slot) {
      Sfx.play("click");
      if (scene === "stable") { stableSlot[stableTab] = t.dataset.slot; renderStable(); }
      if (scene === "shop") { shopSlot = t.dataset.slot; shopSel = null; renderShop(); }
      return;
    }
    if (t.dataset.equip) {
      const it = Items.byId[t.dataset.equip];
      S.equip[it.slot] = it.id; save(); Sfx.play("equip"); renderStable(); return;
    }
    if (t.dataset.skin) { S.look.skin = t.dataset.skin; save(); Sfx.play("equip"); renderStable(); return; }
    if (t.dataset.hair) { S.look.hair = t.dataset.hair; save(); Sfx.play("equip"); renderStable(); return; }
    if (t.dataset.style) { S.look.style = t.dataset.style; save(); Sfx.play("equip"); renderStable(); return; }
    if (t.dataset.food) { feed(t.dataset.food); return; }
    if (t.dataset.item) {
      const it = Items.byId[t.dataset.item];
      shopSel = { slot: it.slot, id: it.id };
      Sfx.play("equip");
      $$("#shopBody .item").forEach((b) => b.classList.toggle("sel", b.dataset.item === it.id));
      renderShopDetail();
      return;
    }
    if (t.dataset.buy) { buyItem(t.dataset.buy); return; }
    if (t.dataset.use) { const it = Items.byId[t.dataset.use]; S.equip[it.slot] = it.id; save(); Sfx.play("equip"); shopSel = null; renderShop(); return; }
    if (t.dataset.buyfood) {
      const f = Items.FOOD.find((q) => q.id === t.dataset.buyfood);
      if (S.coins < f.price) { toast("Du har inte tillräckligt med mynt."); Sfx.play("nope"); return; }
      S.coins -= f.price; S.food[f.id] = (S.food[f.id] || 0) + 1; save(); updateCoins(); Sfx.play("buy"); renderShop(); return;
    }
    if (t.id === "installBtn") { installApp(); }
  });
  $("#guideToggle").addEventListener("change", (e) => { S.settings.guides = e.target.checked; save(); });

  // håll kolla på glidande skift av tabbar (stall)
  document.addEventListener("visibilitychange", () => { if (document.hidden && ride && !ride.resultShown) setPaused(true); });
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", () => setTimeout(resize, 120));
  // blockera pinch-zoom / dubbeltryck
  ["gesturestart", "gesturechange", "gestureend"].forEach((n) => document.addEventListener(n, (e) => e.preventDefault()));
  let lastTouch = 0;
  document.addEventListener("touchend", (e) => { const now = Date.now(); if (now - lastTouch < 350) e.preventDefault(); lastTouch = now; }, { passive: false });
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  /* =====================================================================
     PWA: installera + offline
     ===================================================================== */
  let deferredInstall = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; if (scene === "menu") renderMenu(); });
  window.addEventListener("appinstalled", () => { deferredInstall = null; toast("Spelet är installerat!"); renderMenu(); });
  function installApp() { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; renderMenu(); }); }

  if ("serviceWorker" in navigator && "caches" in window && location.protocol !== "file:") {
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "offline-ready") { const h = $("#offlineHint"); h.textContent = "Klart: spelet fungerar nu utan nät."; h.hidden = false; setTimeout(() => { h.hidden = true; }, 5000); }
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && scene === "menu") location.reload(); });
    navigator.serviceWorker.register("sw.js").catch(() => { /* ignoreras */ });
  }

  /* =====================================================================
     HUVUDLOOP
     ===================================================================== */
  let last = performance.now();
  let decayT = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    decayT += dt;
    if (decayT > 30) { decayT = 0; if (scene !== "ride") { decay(); if (scene === "stable") refreshMeters(); } }
    try {
      if (scene === "ride" && ride) { updateRide(dt); stepRails(dt); drawRide(dt); }
      else if (scene === "stable") { stepParts(dt); drawStable(dt); }
      else if (scene === "shop") { stepParts(dt); drawShop(dt); }
      else { stepIdle(dt); drawMenu(dt); }
    } catch (err) {
      console.error(err);
    }
    requestAnimationFrame(frame);
  }

  // debug-/testkrok (läser bara)
  window.__galoppen = { get state() { return S; }, get ride() { return ride; }, CLASSES, startRide, act, jumpWindow, GV };

  Sfx.setMuted(!!S.settings.mute);
  resize();
  showScreen("menu");
  renderMenu();
  updateCoins();
  requestAnimationFrame(frame);
})();
