"use strict";
/* Galoppen - miljöer, hinder, mynt och effekter (canvas). Allt ritas med kod. */
const Scene = (() => {
  const { clamp, lerp, mix, shade, ell, poly, TAU } = Art;

  const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  // projektion för "tvärs banan" (u): u>0 = bort från kameran
  const KX = 0.52, KY = 0.2, HALF = 54;

  /* ============================== BAKGRUND ============================== */

  function cloud(ctx, x, y, s, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#ffffff";
    const puffs = [[0, 0, 26], [28, -10, 32], [62, -2, 28], [88, 6, 20], [-24, 8, 18]];
    puffs.forEach(([px, py, r]) => { ctx.beginPath(); ctx.arc(x + px * s, y + py * s, r * s, 0, TAU); ctx.fill(); });
    ctx.fillStyle = "rgba(160,200,235,.35)";
    ctx.beginPath(); ctx.ellipse(x + 34 * s, y + 20 * s, 66 * s, 8 * s, 0, 0, TAU); ctx.fill();
    ctx.restore();
  }

  function tree(ctx, x, base, h, kind, r, t) {
    const sway = Math.sin(t * 0.8 + x * 0.01) * 1.5;
    if (kind === 2) {
      // poppel
      ctx.fillStyle = "#6b4a2b"; ctx.fillRect(x - 2, base - 10, 4, 10);
      ell(ctx, x + sway * 0.3, base - h * 0.55, h * 0.16, h * 0.55, 0, "#3fae5a");
      ell(ctx, x - h * 0.03 + sway * 0.3, base - h * 0.6, h * 0.1, h * 0.42, 0, "#58c874");
      return;
    }
    ctx.fillStyle = "#7a5230"; ctx.fillRect(x - h * 0.05, base - h * 0.5, h * 0.1, h * 0.5);
    const pink = kind === 1;
    const c1 = pink ? "#ff8fbd" : "#46b865", c2 = pink ? "#ffb3d2" : "#66d281", c3 = pink ? "#e8689d" : "#3aa356";
    ell(ctx, x + sway, base - h * 0.68, h * 0.34, h * 0.3, 0, c3);
    ell(ctx, x - h * 0.15 + sway, base - h * 0.78, h * 0.22, h * 0.2, 0, c1);
    ell(ctx, x + h * 0.14 + sway, base - h * 0.8, h * 0.22, h * 0.2, 0, c1);
    ell(ctx, x - h * 0.05 + sway, base - h * 0.9, h * 0.2, h * 0.17, 0, c2);
  }

  function drawSky(ctx, vW, vH, gy, t, cam, theme) {
    const g = ctx.createLinearGradient(0, 0, 0, gy);
    if (theme === "dusk") { g.addColorStop(0, "#5b6fd6"); g.addColorStop(0.6, "#ffa3b8"); g.addColorStop(1, "#ffe1a8"); }
    else { g.addColorStop(0, "#32a4ff"); g.addColorStop(0.55, "#8ad7ff"); g.addColorStop(1, "#eafaff"); }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, vW, vH);
    // sol
    const sx = vW * 0.82, sy = 78;
    const sg = ctx.createRadialGradient(sx, sy, 6, sx, sy, 150);
    sg.addColorStop(0, "rgba(255,248,200,.95)"); sg.addColorStop(0.25, "rgba(255,240,170,.55)"); sg.addColorStop(1, "rgba(255,240,170,0)");
    ctx.fillStyle = sg; ctx.fillRect(sx - 160, sy - 160, 320, 320);
    ell(ctx, sx, sy, 28, 28, 0, "#fff6c2");
    // moln
    const period = 1500;
    for (let i = -1; i < 3; i++) {
      for (let k = 0; k < 4; k++) {
        const seed = k * 17 + 3;
        const px = ((hash(seed) * period + i * period) - cam * (0.03 + hash(seed + 1) * 0.03) + t * (4 + k * 2)) % (period * 3);
        const x = ((px % (period + 400)) + (period + 400)) % (period + 400) - 200;
        cloud(ctx, x, 40 + hash(seed + 2) * 130, 0.7 + hash(seed + 3) * 0.6, 0.9);
      }
    }
  }

  function hillLayer(ctx, vW, gy, cam, p, base, amp, f1, f2, c1, c2, ph) {
    const g = ctx.createLinearGradient(0, gy - base - amp, 0, gy);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, gy);
    for (let x = 0; x <= vW + 20; x += 20) {
      const w = x + cam * p + ph;
      const y = gy - base - Math.sin(w * f1) * amp - Math.sin(w * f2 + 1.7) * amp * 0.45;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(vW + 20, gy);
    ctx.closePath();
    ctx.fill();
  }

  function drawFarLayers(ctx, vW, vH, gy, cam, t) {
    hillLayer(ctx, vW, gy, cam, 0.08, 150, 38, 0.0042, 0.011, "#b7ecb0", "#8fdc9a", 0);
    hillLayer(ctx, vW, gy, cam, 0.16, 100, 26, 0.0061, 0.015, "#8fdc8f", "#62c778", 400);
    // träd
    const p = 0.3, per = 86;
    const i0 = Math.floor((cam * p) / per) - 1, i1 = Math.ceil((cam * p + vW) / per) + 1;
    for (let i = i0; i <= i1; i++) {
      if (hash(i * 3.3) < 0.72) {
        const x = i * per + hash(i + 7) * 50 - cam * p;
        const kind = hash(i + 3) < 0.18 ? 1 : hash(i + 5) < 0.28 ? 2 : 0;
        tree(ctx, x, gy - 58, 70 + hash(i + 11) * 52, kind, 1, t);
      }
    }
    // gräsmatta bakom arenan
    const gg = ctx.createLinearGradient(0, gy - 70, 0, gy - 30);
    gg.addColorStop(0, "#5fcb6e"); gg.addColorStop(1, "#4bb862");
    ctx.fillStyle = gg;
    ctx.fillRect(0, gy - 62, vW, 40);
  }

  function spectatorStand(ctx, x, base, w, t, seed) {
    // tribun med publik
    const rows = 3, hgt = 24;
    ctx.fillStyle = "#d8dde6";
    poly(ctx, [[x, base], [x + w, base], [x + w - 10, base - rows * hgt - 6], [x + 10, base - rows * hgt - 6]], "#e8ecf2");
    ctx.fillStyle = "#c2cad6";
    for (let r = 0; r < rows; r++) ctx.fillRect(x + 4 + r * 3, base - (r + 1) * hgt, w - 8 - r * 6, 3);
    const cols = ["#ff5d8f", "#ffc93c", "#4da3ff", "#7be07b", "#b07cff", "#ff8a3d", "#ffffff", "#2ec4b6"];
    const skins = ["#fde0c8", "#f5cba7", "#e0ac80", "#c68a5c", "#9a6a44"];
    for (let r = 0; r < rows; r++) {
      const n = Math.floor((w - 24 - r * 6) / 19);
      for (let k = 0; k < n; k++) {
        const id = seed * 37 + r * 13 + k;
        const px = x + 14 + r * 3 + k * 19 + (r % 2) * 9;
        const py = base - (r + 1) * hgt + 2;
        const wave = hash(id) < 0.2 ? Math.sin(t * 7 + id) * 3 : 0;
        ctx.fillStyle = cols[Math.floor(hash(id + 1) * cols.length)];
        ctx.beginPath(); ctx.ellipse(px, py - 4, 7, 8.5, 0, Math.PI, 0); ctx.fill();
        ctx.fillRect(px - 7, py - 4, 14, 6);
        ell(ctx, px, py - 14 + wave * 0.2, 5.4, 5.8, 0, skins[Math.floor(hash(id + 2) * skins.length)]);
        if (hash(id + 3) < 0.45) ell(ctx, px, py - 17.5 + wave * 0.2, 5.8, 3.4, 0, ["#4a2c1a", "#f2c14e", "#2b1d14", "#c2552a"][Math.floor(hash(id + 4) * 4)]);
        if (wave) { ctx.strokeStyle = cols[Math.floor(hash(id + 1) * cols.length)]; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(px + 6, py - 4); ctx.lineTo(px + 10, py - 13 - wave); ctx.stroke(); }
      }
    }
  }

  function tent(ctx, x, base, w, h, c1, c2) {
    // randigt tält
    const n = 8, sw = w / n;
    ctx.fillStyle = "#cfd6e2"; ctx.fillRect(x, base - h * 0.55, w, h * 0.55);
    for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? c1 : c2; ctx.fillRect(x + i * sw, base - h * 0.55, sw, h * 0.55 - 2); }
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = i % 2 ? c1 : c2;
      ctx.beginPath(); ctx.moveTo(x + i * sw, base - h * 0.55); ctx.lineTo(x + w / 2, base - h); ctx.lineTo(x + (i + 1) * sw, base - h * 0.55); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = "rgba(0,0,0,.12)"; ctx.fillRect(x + w * 0.35, base - h * 0.4, w * 0.3, h * 0.4);
    ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.moveTo(x + w / 2, base - h); ctx.lineTo(x + w / 2 + 14, base - h - 7); ctx.lineTo(x + w / 2, base - h - 14); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#6b6f7a"; ctx.fillRect(x + w / 2 - 1, base - h - 14, 2, 14);
  }

  function drawShowground(ctx, vW, gy, cam, t) {
    const p = 0.52, per = 1050;
    const i0 = Math.floor((cam * p) / per) - 1, i1 = Math.ceil((cam * p + vW) / per) + 1;
    const base = gy - 28;
    for (let i = i0; i <= i1; i++) {
      const ox = i * per - cam * p;
      const k = Math.floor(hash(i * 5.1) * 3);
      tent(ctx, ox + 60, base, 210, 120, k === 0 ? "#ff5d8f" : k === 1 ? "#4da3ff" : "#ffc93c", "#ffffff");
      spectatorStand(ctx, ox + 330, base, 330, t, i);
      tent(ctx, ox + 720, base, 190, 105, k === 2 ? "#ff5d8f" : "#7be07b", "#ffffff");
      // flaggor
      for (let f = 0; f < 3; f++) {
        const fx = ox + 300 + f * 330;
        ctx.fillStyle = "#b9c0cc"; ctx.fillRect(fx, base - 118, 2.4, 118);
        const fc = ["#ff5d8f", "#ffd23f", "#4da3ff"][f];
        const w = Math.sin(t * 4 + f + i) * 3;
        ctx.fillStyle = fc;
        ctx.beginPath(); ctx.moveTo(fx + 2.4, base - 116); ctx.quadraticCurveTo(fx + 16, base - 112 + w, fx + 28, base - 108 + w * 1.3); ctx.quadraticCurveTo(fx + 16, base - 102 + w, fx + 2.4, base - 98); ctx.closePath(); ctx.fill();
      }
    }
  }

  function drawBunting(ctx, vW, gy, cam, t) {
    // vimplar mellan stolpar i arenans bakkant
    const per = 360, p = 1;
    const i0 = Math.floor(cam / per) - 1, i1 = Math.ceil((cam + vW) / per) + 1;
    const top = gy - 168;
    for (let i = i0; i <= i1; i++) {
      const x0 = i * per - cam, x1 = x0 + per;
      // stolpar
      ctx.fillStyle = "#ffffff"; ctx.fillRect(x0 - 2, top - 8, 4, 150);
      ell(ctx, x0, top - 8, 4.5, 4.5, 0, "#ffd23f");
      const cols = ["#ff5d8f", "#ffd23f", "#4da3ff", "#7be07b", "#b07cff", "#ff8a3d"];
      ctx.strokeStyle = "rgba(60,70,90,.55)"; ctx.lineWidth = 1.4;
      ctx.beginPath();
      const sag = 22;
      for (let s = 0; s <= 24; s++) { const f = s / 24; const x = lerp(x0, x1, f), y = top + Math.sin(f * Math.PI) * sag; if (s) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      const n = 12;
      for (let k = 0; k < n; k++) {
        const f = (k + 0.5) / n;
        const x = lerp(x0, x1, f), y = top + Math.sin(f * Math.PI) * sag;
        const sw = Math.sin(t * 3 + k + i * 2) * 1.6;
        ctx.fillStyle = cols[(k + i * 3 + 60) % cols.length];
        ctx.beginPath(); ctx.moveTo(x - 7, y); ctx.lineTo(x + 7, y); ctx.lineTo(x + sw, y + 17); ctx.closePath(); ctx.fill();
      }
    }
  }

  const BANNERS = [
    { t: "HORSE & HOUND", c: "#0f8b8d", tc: "#ffe9a3" },
    { t: "GALOPPEN", c: "#ff5d8f", tc: "#ffffff" },
    { t: "STALLET", c: "#3a6fe0", tc: "#ffffff" },
    { t: "HOPPCUPEN", c: "#ffb800", tc: "#2a3a66" },
  ];

  function drawArenaFence(ctx, vW, gy, cam) {
    const per = 120;
    const i0 = Math.floor(cam / per) - 1, i1 = Math.ceil((cam + vW) / per) + 1;
    const base = gy - 12, top = gy - 62;
    // brädor
    ctx.fillStyle = "#fbfbfd";
    ctx.fillRect(0, base - 44, vW, 6);
    ctx.fillRect(0, base - 14, vW, 6);
    ctx.fillStyle = "rgba(60,80,120,.16)";
    ctx.fillRect(0, base - 38, vW, 2); ctx.fillRect(0, base - 8, vW, 2);
    for (let i = i0; i <= i1; i++) {
      const x = i * per - cam;
      // banderoll
      if (i % 2 === 0) {
        const b = BANNERS[((i / 2) % BANNERS.length + BANNERS.length) % BANNERS.length];
        ctx.fillStyle = b.c; ctx.fillRect(x + 6, base - 38, per * 2 - 12, 30);
        ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(x + 6, base - 38, per * 2 - 12, 8);
        ctx.fillStyle = b.tc; ctx.font = "800 17px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(b.t, x + per, base - 22);
      }
    }
    for (let i = i0; i <= i1; i++) {
      const x = i * per - cam;
      ctx.fillStyle = "#ffffff"; ctx.fillRect(x - 4, top, 8, 50);
      ctx.fillStyle = "rgba(60,80,120,.2)"; ctx.fillRect(x + 1, top, 3, 50);
      ell(ctx, x, top, 5, 5, 0, "#ffffff");
      // blomkruka
      if (i % 2) {
        ctx.fillStyle = "#c2553a"; poly(ctx, [[x - 12, base + 2], [x + 12, base + 2], [x + 9, base + 14], [x - 9, base + 14]], "#c2553a");
        for (let k = 0; k < 5; k++) ell(ctx, x - 10 + k * 5, base - 2 + (k % 2) * 2, 4.5, 4.5, 0, ["#ff5d8f", "#ffd23f", "#ff8a3d", "#b07cff", "#ff5d8f"][k]);
      }
    }
  }

  function drawGround(ctx, vW, vH, gy, cam) {
    const g = ctx.createLinearGradient(0, gy - 14, 0, vH);
    g.addColorStop(0, "#f2dca5"); g.addColorStop(0.5, "#e6c88a"); g.addColorStop(1, "#d6b274");
    ctx.fillStyle = g;
    ctx.fillRect(0, gy - 14, vW, vH - gy + 14);
    // harvade ränder
    ctx.strokeStyle = "rgba(150,110,50,.12)";
    ctx.lineWidth = 2;
    for (let k = 0; k < 7; k++) {
      const y = gy + 8 + k * ((vH - gy) / 7);
      ctx.beginPath();
      for (let x = 0; x <= vW + 30; x += 30) {
        const w = x + cam;
        ctx.lineTo(x, y + Math.sin(w * 0.02 + k) * 1.2);
      }
      ctx.stroke();
    }
    // småsten / hovavtryck
    const per = 140;
    const i0 = Math.floor(cam / per) - 1, i1 = Math.ceil((cam + vW) / per) + 1;
    ctx.fillStyle = "rgba(140,100,50,.18)";
    for (let i = i0; i <= i1; i++) {
      const x = i * per - cam + hash(i) * 80;
      ell(ctx, x, gy + 18 + hash(i + 2) * (vH - gy - 30), 3 + hash(i + 3) * 3, 1.4, 0, "rgba(140,100,50,.2)");
    }
    // skarp kant mot staketet
    ctx.fillStyle = "rgba(120,90,40,.15)";
    ctx.fillRect(0, gy - 14, vW, 3);
  }

  function drawForeground(ctx, vW, vH, gy, cam, t) {
    // grönt gräs längst ner med blommor
    const top = Math.max(gy + 62, vH - 40);
    if (top >= vH) return;
    const g = ctx.createLinearGradient(0, top, 0, vH);
    g.addColorStop(0, "#58c76a"); g.addColorStop(1, "#3ba654");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, vH);
    for (let x = 0; x <= vW + 16; x += 16) ctx.lineTo(x, top + Math.sin((x + cam * 1.15) * 0.05) * 3);
    ctx.lineTo(vW + 16, vH);
    ctx.closePath();
    ctx.fill();
    const per = 54, p = 1.15;
    const i0 = Math.floor((cam * p) / per) - 1, i1 = Math.ceil((cam * p + vW) / per) + 1;
    for (let i = i0; i <= i1; i++) {
      if (hash(i * 2.2) > 0.55) {
        const x = i * per - cam * p + hash(i) * 30;
        const y = top + 8 + hash(i + 1) * (vH - top - 12);
        const c = ["#ff5d8f", "#ffd23f", "#ffffff", "#b07cff"][Math.floor(hash(i + 4) * 4)];
        ctx.strokeStyle = "#2f8f44"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y + 8); ctx.lineTo(x, y); ctx.stroke();
        for (let k = 0; k < 5; k++) ell(ctx, x + Math.cos(k * 1.256) * 3.4, y + Math.sin(k * 1.256) * 3.4, 2.4, 2.4, 0, c);
        ell(ctx, x, y, 1.6, 1.6, 0, "#ffb800");
      }
    }
  }

  function drawBackdrop(ctx, o) {
    const { vW, vH, gy, cam, t } = o;
    drawSky(ctx, vW, vH, gy, t, cam, o.theme);
    drawFarLayers(ctx, vW, vH, gy, cam, t);
    drawShowground(ctx, vW, gy, cam, t);
    drawBunting(ctx, vW, gy, cam, t);
    drawArenaFence(ctx, vW, gy, cam);
    drawGround(ctx, vW, vH, gy, cam);
  }

  /* ============================== HINDER ============================== */

  const PALETTES = [
    ["#e8384f", "#ffffff"], ["#2f7bff", "#ffffff"], ["#ffb800", "#ffffff"], ["#2fbf71", "#ffffff"],
    ["#ff7a1a", "#ffffff"], ["#9b5de5", "#ffffff"], ["#ff5d8f", "#ffffff"],
  ];

  function proj(fx, gy, u, h) { return [fx + KX * u, gy - KY * u - h]; }

  function elevation(ctx, fx, gy, fn) {
    ctx.save();
    ctx.transform(KX, -KY, 0, -1, fx, gy);
    fn();
    ctx.restore();
  }

  function rail(ctx, y, c1, c2, len, th, rot) {
    // stång i elevation (u, h): stripad
    const L = 22;
    ctx.save();
    if (rot) { ctx.translate(0, y); ctx.rotate(rot); ctx.translate(0, -y); }
    const n = Math.ceil((HALF * 2 - 4) / L);
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? c2 : c1;
      ctx.fillRect(-HALF + 2 + k * L, y - th / 2, Math.min(L, HALF - 2 - (-HALF + 2 + k * L)), th);
    }
    ctx.fillStyle = "rgba(255,255,255,.28)";
    ctx.fillRect(-HALF + 2, y + th * 0.1, HALF * 2 - 4, th * 0.22);
    ctx.fillStyle = "rgba(0,0,0,.16)";
    ctx.fillRect(-HALF + 2, y - th / 2, HALF * 2 - 4, th * 0.2);
    ctx.restore();
  }

  function post(ctx, x, yBase, h, c, wide) {
    const w = wide ? 11 : 8.5;
    ctx.fillStyle = "#ffffff"; ctx.fillRect(x - w / 2, yBase - h, w, h);
    ctx.fillStyle = "rgba(60,80,120,.22)"; ctx.fillRect(x + w / 2 - 2.5, yBase - h, 2.5, h);
    ctx.fillStyle = c; ctx.fillRect(x - w / 2, yBase - h + 5, w, 6);
    ctx.fillRect(x - w / 2, yBase - 14, w, 6);
    ell(ctx, x, yBase - h - 2, 4.4, 4.4, 0, "#ffd23f");
    ell(ctx, x - 1, yBase - h - 3, 1.5, 1.5, 0, "#fff8d0");
  }

  function planter(ctx, x, y, w, t, seed) {
    // blomlåda vid foten
    ctx.fillStyle = "#b8643a"; poly(ctx, [[x - w / 2, y - 12], [x + w / 2, y - 12], [x + w / 2 - 3, y], [x - w / 2 + 3, y]], "#b8643a");
    ctx.fillStyle = "rgba(255,255,255,.14)"; ctx.fillRect(x - w / 2, y - 12, w, 3);
    const n = Math.floor(w / 8);
    for (let k = 0; k < n; k++) {
      const c = ["#ff5d8f", "#ffd23f", "#ffffff", "#b07cff", "#ff8a3d"][Math.floor(hash(seed + k) * 5)];
      ell(ctx, x - w / 2 + 6 + k * 8, y - 15 - hash(seed + k + 9) * 4, 3.6, 3.6, 0, c);
      ell(ctx, x - w / 2 + 6 + k * 8, y - 15 - hash(seed + k + 9) * 4, 1.2, 1.2, 0, "#ffb800");
      ell(ctx, x - w / 2 + 3 + k * 8, y - 11, 3, 2.4, 0.5, "#38a653");
    }
  }

  function fenceColors(f) { return PALETTES[f.pal % PALETTES.length]; }

  /** Ritar en uppsättning (framför/bakom) av ett hinder. part = 'far' | 'near' */
  function drawFenceSet(ctx, f, set, part, t) {
    const fx = f.x + set.dx;
    const gy = f.gy;
    const [c1, c2] = fenceColors(f);
    const far = part === "far";
    // stolpar i skärmrymd
    const uP = far ? HALF + 2 : -HALF - 2;
    const pp = proj(fx, gy, uP, 0);
    const hp = set.hp;
    // plank/mur-fyllnad i elevation, klippt per del
    if (f.type !== "vatten") {
      post(ctx, pp[0], pp[1], hp, c1, true);
      if (set.flowers) planter(ctx, pp[0] + (far ? 12 : -12), pp[1] + 1, 28, t, f.id * 9 + (far ? 1 : 0));
    }
    elevation(ctx, fx, gy, () => {
      ctx.save();
      ctx.beginPath();
      if (far) ctx.rect(0, -400, HALF + 8, 800); else ctx.rect(-HALF - 8, -400, HALF + 8, 800);
      ctx.clip();
      if (f.type === "plank" || f.type === "oxer") {
        // fyllnad: brädor
        const y0 = set.fillLo, y1 = set.fillHi;
        if (y1 > y0) {
          const n = 3, bh = (y1 - y0) / n;
          for (let k = 0; k < n; k++) {
            ctx.fillStyle = k % 2 ? c2 : c1;
            ctx.fillRect(-HALF + 4, y0 + k * bh + 0.5, HALF * 2 - 8, bh - 1);
          }
          ctx.fillStyle = "rgba(0,0,0,.14)"; ctx.fillRect(-HALF + 4, y0, HALF * 2 - 8, 2);
        }
      } else if (f.type === "kryss") {
        // underrail + kors
        rail(ctx, set.fillHi - 2, c2, c1, 0, 6.5);
        [-1, 1].forEach((sg) => {
          ctx.save();
          const yl = set.hTop - 22, yh = set.hTop - 3;
          const ang = Math.atan2(yh - yl, HALF * 2 - 10) * sg;
          const mid = (yl + yh) / 2;
          ctx.translate(0, mid); ctx.rotate(-ang * 0.9 * 1.0);
          if (!(set.rails && set.rails[0] && set.rails[0].fall)) {
            ctx.fillStyle = c1; ctx.fillRect(-HALF - 4, -3.2, HALF * 2 + 8, 6.4);
            ctx.fillStyle = c2; for (let k = 0; k < 5; k++) ctx.fillRect(-HALF - 4 + k * 24 + 12, -3.2, 12, 6.4);
            ctx.fillStyle = "rgba(255,255,255,.28)"; ctx.fillRect(-HALF - 4, 0.4, HALF * 2 + 8, 1.4);
          }
          ctx.restore();
        });
      }
      // fallna kryss-stänger
      if (f.type === "kryss" && set.rails[0] && set.rails[0].fall) {
        const q = set.rails[0].fall;
        [1, -0.7].forEach((k) => {
          ctx.save();
          ctx.translate(q.du * k, q.h - set.rails[0].y);
          rail(ctx, set.rails[0].y, c1, c2, 0, 6.5, q.tilt * k);
          ctx.restore();
        });
      }
      // knockbara överstänger
      set.rails.forEach((r) => {
        if (f.type === "kryss") return;
        if (f.type === "mur") return;
        ctx.save();
        if (r.fall) {
          ctx.translate(r.fall.du, r.fall.h - r.y);
          rail(ctx, r.y, c1, c2, 0, 7, r.fall.tilt);
        } else rail(ctx, r.y, c1, c2, 0, 7);
        ctx.restore();
      });
      ctx.restore();
    });
  }

  function drawWall(ctx, f, t) {
    const gy = f.gy, fx = f.x;
    const h = f.h, topH = 14;
    const colA = "#d9633d", colB = "#c4512f", mort = "#f0d7b8";
    // sida (tjocklek) - ritas till höger
    const faceW = HALF * 2;
    ctx.save();
    ctx.transform(KX, -KY, 0, -1, fx, gy);
    // sidan
    ctx.save();
    ctx.translate(11, 0);
    ctx.fillStyle = "#a8452a";
    ctx.fillRect(-HALF, 0, faceW, h - topH);
    ctx.restore();
    // framsida med tegel
    ctx.fillStyle = colA; ctx.fillRect(-HALF, 0, faceW, h - topH);
    const rows = Math.max(3, Math.round((h - topH) / 10));
    const rh = (h - topH) / rows;
    for (let r = 0; r < rows; r++) {
      ctx.fillStyle = mort; ctx.fillRect(-HALF, r * rh, faceW, 1.2);
      const off = (r % 2) * 14;
      for (let x = -HALF + off; x < HALF; x += 28) {
        ctx.fillStyle = mort; ctx.fillRect(x, r * rh, 1.2, rh);
        if ((Math.floor(x / 28) + r) % 3 === 0) { ctx.fillStyle = colB; ctx.fillRect(x + 1.2, r * rh + 1.2, 26.8, rh - 1.2); }
      }
    }
    // löstagbara toppblock
    const topRail = f.sets[0].rails[0];
    ctx.save();
    if (topRail.fall) ctx.translate(topRail.fall.du, topRail.fall.h - topRail.y);
    const rot = topRail.fall ? topRail.fall.tilt : 0;
    ctx.translate(0, h - topH / 2); ctx.rotate(rot); ctx.translate(0, -(h - topH / 2));
    ctx.fillStyle = "#c2cad8"; ctx.fillRect(-HALF - 3, h - topH, faceW + 6, topH);
    const [c1] = fenceColors(f);
    for (let k = 0; k < 4; k++) { ctx.fillStyle = k % 2 ? "#e9edf5" : c1; ctx.fillRect(-HALF - 3 + k * (faceW + 6) / 4 + 1, h - topH + 1, (faceW + 6) / 4 - 2, topH - 2); }
    ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.fillRect(-HALF - 3, h - 4, faceW + 6, 2);
    ctx.restore();
    ctx.restore();
    // stolpar i sidan
    const pa = proj(fx, gy, HALF + 4, 0), pb = proj(fx, gy, -HALF - 4, 0);
    return [pa, pb];
  }

  function drawWater(ctx, f, t) {
    const gy = f.gy, x0 = f.x, x1 = f.x + f.w;
    const a = proj(x0, gy, -HALF - 8, 0), b = proj(x1, gy, -HALF - 8, 0), c = proj(x1, gy, HALF + 8, 0), d = proj(x0, gy, HALF + 8, 0);
    // kant
    ctx.fillStyle = "#c9a56a"; poly(ctx, [[a[0] - 5, a[1] + 3], [b[0] + 5, b[1] + 3], [c[0] + 5, c[1] - 3], [d[0] - 5, d[1] - 3]], "#c9a56a");
    const g = ctx.createLinearGradient(0, d[1], 0, a[1]);
    g.addColorStop(0, "#6fd8ff"); g.addColorStop(1, "#1d8fe0");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill();
    ctx.save();
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.clip();
    ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.6;
    for (let k = 0; k < 6; k++) {
      const y = lerp(d[1] + 4, a[1] - 3, k / 5);
      ctx.beginPath();
      for (let x = a[0]; x <= c[0] + b[0] - a[0]; x += 6) ctx.lineTo(x, y + Math.sin(x * 0.12 + t * 3 + k * 1.3) * 1.6);
      ctx.stroke();
    }
    ctx.restore();
    // låg kantstång framtill (siktlinje)
    const l0 = proj(x0, gy, -HALF, 14), l1 = proj(x0, gy, HALF, 14);
    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(l0[0], l0[1]); ctx.lineTo(l1[0], l1[1]); ctx.stroke();
    ctx.strokeStyle = "#e8384f"; ctx.setLineDash([12, 12]); ctx.beginPath(); ctx.moveTo(l0[0], l0[1]); ctx.lineTo(l1[0], l1[1]); ctx.stroke(); ctx.setLineDash([]);
    // vass
    const rp = [[0.15, 1], [0.5, 1], [0.85, 1]];
    rp.forEach(([fr], i) => {
      const bp = proj(lerp(x0, x1, fr), gy, HALF + 4, 0);
      for (let k = 0; k < 4; k++) {
        ctx.strokeStyle = "#3aa356"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bp[0] + k * 3 - 5, bp[1] + 2);
        ctx.quadraticCurveTo(bp[0] + k * 3 - 5 + Math.sin(t * 2 + k + i) * 2, bp[1] - 10, bp[0] + k * 3 - 6 + Math.sin(t * 2 + k) * 3, bp[1] - 18 - k * 2); ctx.stroke();
      }
    });
  }

  /** Bakre del (bakom hästen): längst bort stolpar + bakre halvan av stängerna */
  function drawFenceBack(ctx, f, t) {
    if (f.type === "vatten") { drawWater(ctx, f, t); return; }
    if (f.type === "mur") { drawWallBack(ctx, f, t); return; }
    f.sets.forEach((s) => drawFenceSet(ctx, f, s, "far", t));
  }
  function drawFenceFront(ctx, f, t) {
    if (f.type === "vatten") return;
    if (f.type === "mur") { drawWallFront(ctx, f, t); return; }
    f.sets.forEach((s) => drawFenceSet(ctx, f, s, "near", t));
  }

  // mur: hela väggen ritas bakom hästen, främre pelare ritas framför
  function drawWallBack(ctx, f, t) {
    const [pa] = drawWall(ctx, f, t);
    post(ctx, pa[0], pa[1], f.h + 14, fenceColors(f)[0], true);
    planter(ctx, pa[0] + 14, pa[1] + 1, 26, t, f.id * 9);
  }
  function drawWallFront(ctx, f, t) {
    const pb = proj(f.x, f.gy, -HALF - 4, 0);
    post(ctx, pb[0], pb[1], f.h + 14, fenceColors(f)[0], true);
    planter(ctx, pb[0] - 14, pb[1] + 1, 26, t, f.id * 9 + 1);
  }

  /** Nummerskylt (hindernummer) */
  function drawFenceNumber(ctx, f) {
    if (f.type === "vatten") { /* skylt vid sidan */ }
    const p = proj(f.x, f.gy, -HALF - 12, 0);
    const x = p[0] - 20, y = p[1] - 6;
    ctx.fillStyle = "#1f2a4a"; ctx.fillRect(x - 11, y - 28, 22, 22);
    ctx.fillStyle = "#ffffff"; ctx.fillRect(x - 9.5, y - 26.5, 19, 19);
    ctx.fillStyle = "#1f2a4a"; ctx.font = "800 15px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(f.num), x, y - 16.5);
    ctx.fillStyle = "#1f2a4a"; ctx.fillRect(x - 1.4, y - 6, 2.8, 8);
  }

  /* ============================== START / MÅL ============================== */

  function drawGate(ctx, x, gy, label, c, t, finish) {
    const hgt = 176;
    const pa = proj(x, gy, HALF + 40, 0), pb = proj(x, gy, -HALF - 40, 0);
    // bakre stolpe + banderoll bakom hästen; främre stolpe framför
    return {
      back() {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(pa[0] - 4, pa[1] - hgt, 8, hgt);
        ctx.fillStyle = "rgba(60,80,120,.2)"; ctx.fillRect(pa[0] + 1, pa[1] - hgt, 3, hgt);
        ctx.fillStyle = "#ffffff"; ctx.fillRect(pb[0] - 5, pb[1] - hgt - 4, 10, hgt + 4);
        ctx.fillStyle = c; ctx.beginPath();
        ctx.moveTo(pa[0] - 4, pa[1] - hgt + 4);
        ctx.lineTo(pb[0] + 5, pb[1] - hgt);
        ctx.lineTo(pb[0] + 5, pb[1] - hgt + 38);
        ctx.lineTo(pa[0] - 4, pa[1] - hgt + 42);
        ctx.closePath(); ctx.fill();
        ctx.save();
        ctx.translate((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2 - hgt + 22);
        ctx.rotate(Math.atan2(pa[1] - pb[1], pa[0] - pb[0])); // följer banderollens lutning (stiger åt höger)
        ctx.fillStyle = "#fff"; ctx.font = "900 22px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(label, 0, 1);
        ctx.restore();
        // flaggor
        [pa, pb].forEach((p, i) => { ell(ctx, p[0], p[1] - hgt - 6, 6, 6, 0, "#ffd23f"); });
        // mållinje på marken
        const g0 = proj(x, gy, -HALF - 14, 0), g1 = proj(x, gy, HALF + 14, 0);
        const n = 8;
        for (let k = 0; k < n; k++) {
          const a = proj(x, gy, lerp(-HALF - 14, HALF + 14, k / n), 0), b = proj(x, gy, lerp(-HALF - 14, HALF + 14, (k + 1) / n), 0);
          ctx.fillStyle = (k % 2) ? (finish ? "#222" : "#ffffff") : (finish ? "#ffffff" : c);
          poly(ctx, [[a[0] - 6, a[1]], [a[0] + 6, a[1]], [b[0] + 6, b[1]], [b[0] - 6, b[1]]], ctx.fillStyle);
        }
      },
      front() {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(pb[0] - 5, pb[1] - hgt, 10, hgt);
        ctx.fillStyle = "rgba(60,80,120,.2)"; ctx.fillRect(pb[0] + 2, pb[1] - hgt, 3, hgt);
        ell(ctx, pb[0], pb[1] - hgt - 6, 6, 6, 0, "#ffd23f");
        ctx.fillStyle = c; ctx.fillRect(pb[0] - 5, pb[1] - 28, 10, 8);
      },
    };
  }

  /* ============================== MYNT & EFFEKTER ============================== */

  function drawCoin(ctx, x, y, t, ph, r) {
    r = r || 11;
    const w = Math.abs(Math.cos(t * 3.2 + ph));
    const rx = Math.max(2.2, r * w);
    ctx.save();
    ctx.translate(x, y + Math.sin(t * 3 + ph) * 2);
    ell(ctx, 0, 0, rx + 1.6, r + 1.6, 0, "#c98700");
    ell(ctx, 0, 0, rx, r, 0, "#ffd23f");
    ell(ctx, 0, 0, rx * 0.72, r * 0.72, 0, "#ffe680");
    if (w > 0.45) {
      ctx.fillStyle = "#d99a00";
      ctx.font = `800 ${Math.round(r * 1.1)}px system-ui, sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.save(); ctx.scale(w, 1); ctx.fillText("G", 0, 1); ctx.restore();
    }
    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.beginPath(); ctx.ellipse(-rx * 0.34, -r * 0.4, Math.max(1, rx * 0.22), r * 0.2, -0.5, 0, TAU); ctx.fill();
    ctx.restore();
  }

  function drawHorseshoe(ctx, x, y, t, ph) {
    ctx.save();
    ctx.translate(x, y + Math.sin(t * 3 + ph) * 3);
    ctx.rotate(Math.sin(t * 2 + ph) * 0.15);
    const g = ctx.createLinearGradient(-14, -14, 14, 14);
    g.addColorStop(0, "#f4f7fb"); g.addColorStop(0.5, "#b8c2d0"); g.addColorStop(1, "#7f8a9c");
    ctx.strokeStyle = "#5f6a7c"; ctx.lineWidth = 11; ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(0, 2, 11, Math.PI * 0.85, Math.PI * 2.15 + 0.0, false); ctx.stroke();
    ctx.strokeStyle = g; ctx.lineWidth = 8.4;
    ctx.beginPath(); ctx.arc(0, 2, 11, Math.PI * 0.85, Math.PI * 2.15, false); ctx.stroke();
    ctx.fillStyle = "#4a5365";
    for (let k = 0; k < 5; k++) { const a = Math.PI * (1.05 + k * 0.225); ell(ctx, Math.cos(a) * 11, 2 + Math.sin(a) * 11, 1.4, 1.4, 0, "#4a5365"); }
    // gnistor
    const s = 0.5 + 0.5 * Math.sin(t * 6 + ph);
    ctx.fillStyle = `rgba(255,255,200,${0.4 + s * 0.6})`;
    Art.star(ctx, 14, -12, 3 + s * 2);
    ctx.restore();
  }

  function drawParticles(ctx, list) {
    list.forEach((p) => {
      const a = clamp(p.life / p.max, 0, 1);
      if (p.kind === "dust") { ell(ctx, p.x, p.y, p.r * (1.6 - a * 0.6), p.r * (1.2 - a * 0.4), 0, `rgba(214,180,120,${a * 0.55})`); }
      else if (p.kind === "spark") { ctx.fillStyle = `rgba(${p.c},${a})`; Art.star(ctx, p.x, p.y, p.r * (0.6 + a * 0.6)); }
      else if (p.kind === "heart") {
        ctx.save(); ctx.translate(p.x, p.y); ctx.fillStyle = `rgba(255,90,140,${a})`;
        ctx.beginPath(); ctx.moveTo(0, p.r * 0.35); ctx.bezierCurveTo(-p.r, -p.r * 0.3, -p.r * 0.5, -p.r * 0.95, 0, -p.r * 0.4); ctx.bezierCurveTo(p.r * 0.5, -p.r * 0.95, p.r, -p.r * 0.3, 0, p.r * 0.35); ctx.fill(); ctx.restore();
      } else if (p.kind === "splash") { ell(ctx, p.x, p.y, p.r, p.r, 0, `rgba(120,210,255,${a * 0.9})`); }
      else if (p.kind === "straw") { ctx.strokeStyle = `rgba(230,190,90,${a})`; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 0.05, p.y + p.vy * 0.05); ctx.stroke(); }
      else if (p.kind === "conf") { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot || 0); ctx.fillStyle = p.col; ctx.globalAlpha = a; ctx.fillRect(-3, -1.6, 6, 3.2); ctx.restore(); }
    });
  }

  /* ============================== STALL ============================== */

  /** Ritar stallboxen i virtuell yta 860x500. */
  function drawStable(ctx, W, H, t, o) {
    const floorY = H - 120;
    // vägg: planka
    const wg = ctx.createLinearGradient(0, 0, 0, floorY);
    wg.addColorStop(0, "#d9a066"); wg.addColorStop(1, "#c98a55");
    ctx.fillStyle = wg; ctx.fillRect(0, 0, W, floorY);
    for (let x = 0; x < W; x += 46) {
      ctx.fillStyle = "rgba(90,50,20,.22)"; ctx.fillRect(x, 0, 2, floorY);
      ctx.fillStyle = "rgba(255,230,190,.14)"; ctx.fillRect(x + 3, 0, 6, floorY);
      for (let k = 0; k < 3; k++) { ctx.fillStyle = "rgba(90,50,20,.1)"; ctx.fillRect(x + 12 + hash(x + k) * 24, 20 + hash(x + k * 2) * (floorY - 60), 1.6, 18 + hash(x + k) * 24); }
    }
    // takbjälke
    ctx.fillStyle = "#7a4a26"; ctx.fillRect(0, 0, W, 26);
    ctx.fillStyle = "rgba(255,220,170,.18)"; ctx.fillRect(0, 0, W, 5);
    // fönster med ljusstrålar
    const wx = 16, wy = 50, ww = 118, wh = 124;
    ctx.fillStyle = "#6e4020"; ctx.fillRect(wx - 10, wy - 10, ww + 20, wh + 20);
    const sg = ctx.createLinearGradient(0, wy, 0, wy + wh);
    sg.addColorStop(0, "#7cd4ff"); sg.addColorStop(1, "#d8f4ff");
    ctx.fillStyle = sg; ctx.fillRect(wx, wy, ww, wh);
    cloud(ctx, wx + 10 + (t * 3) % 40, wy + 36, 0.4, 0.95);
    ell(ctx, wx + ww - 28, wy + 30, 13, 13, 0, "#fff6c2");
    ctx.fillStyle = "#6e4020"; ctx.fillRect(wx + ww / 2 - 3, wy, 6, wh); ctx.fillRect(wx, wy + wh / 2 - 3, ww, 6);
    ctx.fillStyle = "#7d4f2a"; ctx.fillRect(wx - 14, wy + wh + 6, ww + 28, 8);
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#fff3b5";
    ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + ww, wy); ctx.lineTo(wx + ww + 170, floorY + 20); ctx.lineTo(wx + 40, floorY + 20); ctx.closePath(); ctx.fill();
    ctx.restore();
    // golv: halm
    const fg = ctx.createLinearGradient(0, floorY, 0, H);
    fg.addColorStop(0, "#e8c870"); fg.addColorStop(1, "#d6a94e");
    ctx.fillStyle = fg; ctx.fillRect(0, floorY, W, H - floorY);
    ctx.fillStyle = "rgba(120,80,20,.3)"; ctx.fillRect(0, floorY, W, 4);
    for (let i = 0; i < 160; i++) {
      const x = hash(i * 1.7) * W, y = floorY + 6 + hash(i * 3.1) * (H - floorY - 8);
      ctx.strokeStyle = hash(i) < 0.5 ? "rgba(255,230,140,.8)" : "rgba(190,140,50,.7)";
      ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10 + hash(i + 4) * 14, y + (hash(i + 2) - 0.5) * 6); ctx.stroke();
    }
    // spann
    const bx = 470, by = floorY + 56;
    poly(ctx, [[bx - 24, by - 38], [bx + 24, by - 38], [bx + 20, by], [bx - 20, by]], "#4b8de0");
    ctx.fillStyle = "#e8eef8"; ctx.fillRect(bx - 24, by - 40, 48, 5);
    ctx.strokeStyle = "#2e6fc0"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by - 38, 22, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    // hönät
    const hx = 520, hy = 70;
    ctx.strokeStyle = "#5b3a1f"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx, 26); ctx.lineTo(hx, hy); ctx.stroke();
    ell(ctx, hx, hy + 38, 34, 42, 0, "#7bbf6a");
    ctx.strokeStyle = "rgba(40,90,30,.5)"; ctx.lineWidth = 1.2;
    for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(hx + k * 9, hy + 6); ctx.lineTo(hx + k * 9 + 4, hy + 74); ctx.stroke(); }
    for (let k = 0; k < 9; k++) { ctx.strokeStyle = "#e7c453"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - 28 + k * 7, hy + 12 + (k % 3) * 18); ctx.lineTo(hx - 22 + k * 7, hy + 26 + (k % 3) * 18); ctx.stroke(); }
    // rosettbräda
    const rx = 150, ry = 44;
    ctx.fillStyle = "#4a2c18"; ctx.fillRect(rx, ry, 232, 70);
    ctx.fillStyle = "#6a4326"; ctx.fillRect(rx + 4, ry + 4, 224, 62);
    ctx.fillStyle = "#ffd23f"; ctx.font = "800 11px system-ui, sans-serif"; ctx.textAlign = "left"; ctx.textBaseline = "top";
    ctx.fillText("MINA ROSETTER", rx + 8, ry + 6);
    const kinds = [["blue", "#2a6fdc", "#9ec3ff"], ["red", "#e03a4a", "#ffb0b8"], ["yellow", "#f2c230", "#fff0a0"], ["green", "#2fae6a", "#a0e8c0"]];
    kinds.forEach(([k, c1, c2], i) => {
      const cx = rx + 30 + i * 56, cy = ry + 40;
      const n = (o.rosettes && o.rosettes[k]) || 0;
      if (n > 0) { Art.drawRosette(ctx, cx, cy, 14, c1, c2, Math.sin(t * 1.4 + i) * 0.3, true); }
      else { ell(ctx, cx, cy, 11, 11, 0, "rgba(0,0,0,.25)"); }
      ctx.fillStyle = "#fff"; ctx.font = "800 13px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(String(n), cx, ry + 54);
    });
    // namnskylt
    const nx = 150 - 6, ny = 126;
    ctx.fillStyle = "#4a2c18"; ctx.fillRect(nx + 50, ny, 130, 28);
    ctx.fillStyle = "#f6e4b8"; ctx.fillRect(nx + 53, ny + 3, 124, 22);
    ctx.fillStyle = "#4a2c18"; ctx.font = "800 15px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(o.horseName || "STJÄRNA", nx + 115, ny + 14.5);
  }

  /** Butiken Horse and Hound (bakgrund) */
  function drawShop(ctx, W, H, t, o) {
    const sw = Math.max(380, (o && o.sw) || W);
    const floorY = H - 110;
    const wg = ctx.createLinearGradient(0, 0, 0, floorY);
    wg.addColorStop(0, "#2aa6a3"); wg.addColorStop(1, "#1f8f93");
    ctx.fillStyle = wg; ctx.fillRect(0, 0, W, floorY);
    // paneler
    ctx.fillStyle = "rgba(255,255,255,.07)";
    for (let x = 0; x < W; x += 120) ctx.fillRect(x + 6, 150, 108, floorY - 170);
    // hyllor
    const shelfC = "#7a4a26";
    (sw > 560 ? [[14, 64], [sw - 234, 64]] : [[14, 64]]).forEach(([sx, sy], idx) => {
      for (let r = 0; r < 3; r++) {
        const y = sy + r * 110;
        ctx.fillStyle = shelfC; ctx.fillRect(sx, y + 74, 220, 9);
        ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(sx, y + 83, 220, 5);
        for (let k = 0; k < 5; k++) {
          const c = ["#e03a4a", "#2f7be0", "#ffb800", "#2fae6a", "#ec6fa4", "#8a63d2", "#1d3a78"][(k + r * 2 + idx * 3) % 7];
          const x = sx + 12 + k * 41;
          if ((r + idx) % 3 === 0) { // hjälmar
            ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + 14, y + 66, 17, Math.PI, 0); ctx.fill();
            ctx.fillStyle = shade(c, -0.3); ctx.fillRect(x - 5, y + 64, 40, 5);
          } else if ((r + idx) % 3 === 1) { // stövlar
            ctx.fillStyle = c; ctx.fillRect(x + 4, y + 30, 11, 44); poly(ctx, [[x + 4, y + 74], [x + 15, y + 74], [x + 32, y + 74], [x + 32, y + 64], [x + 15, y + 62]], c);
            ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.fillRect(x + 6, y + 34, 3, 36);
          } else { // träns / hästskor
            ctx.strokeStyle = c; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x + 14, y + 52, 15, 0, TAU); ctx.stroke();
            ctx.strokeStyle = shade(c, -0.25); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 14, y + 67); ctx.lineTo(x + 14, y + 74); ctx.stroke();
          }
        }
      }
    });
    // golv
    const fg = ctx.createLinearGradient(0, floorY, 0, H);
    fg.addColorStop(0, "#c78f5b"); fg.addColorStop(1, "#a8723f");
    ctx.fillStyle = fg; ctx.fillRect(0, floorY, W, H - floorY);
    ctx.fillStyle = "rgba(60,30,10,.22)";
    for (let y = floorY; y < H; y += 26) ctx.fillRect(0, y, W, 2);
    for (let x = 0; x < W; x += 90) for (let y = floorY, r = 0; y < H; y += 26, r++) ctx.fillRect(x + (r % 2) * 45, y, 2, 26);
    // matta
    ctx.fillStyle = "#e8505b"; poly(ctx, [[sw * 0.1, floorY + 50], [sw * 0.9, floorY + 50], [sw * 0.96, H - 8], [sw * 0.04, H - 8]], "#e8505b");
    ctx.strokeStyle = "#ffd23f"; ctx.lineWidth = 3; ctx.strokeRect(sw * 0.13, floorY + 62, sw * 0.74, H - floorY - 86);
    // skylt
    const sx = sw / 2 - 150, sy = 8;
    ctx.strokeStyle = "#3a2312"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx + 40, 0); ctx.lineTo(sx + 40, sy + 4); ctx.moveTo(sx + 260, 0); ctx.lineTo(sx + 260, sy + 4); ctx.stroke();
    ctx.fillStyle = "#3a2312"; ctx.fillRect(sx, sy, 300, 58);
    ctx.fillStyle = "#12696f"; ctx.fillRect(sx + 5, sy + 5, 290, 48);
    ctx.fillStyle = "#ffd96b"; ctx.font = "800 26px Georgia, 'Times New Roman', serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("HORSE & HOUND", sx + 150, sy + 31);
    // hästsko på skylten
    ctx.strokeStyle = "#ffd96b"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sx + 24, sy + 33, 9, Math.PI * 0.85, Math.PI * 2.15); ctx.stroke();
    ctx.beginPath(); ctx.arc(sx + 276, sy + 33, 9, Math.PI * 0.85, Math.PI * 2.15); ctx.stroke();
    drawHound(ctx, sw - 62, H - 40, t, 1);
  }

  function drawHound(ctx, x, y, t, s) {
    ctx.save();
    ctx.translate(x, y); ctx.scale(s, s);
    const body = "#d9a86a", ear = "#8a5a2e";
    // svans
    ctx.strokeStyle = body; ctx.lineWidth = 7; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-26, -10); ctx.quadraticCurveTo(-48, -24 + Math.sin(t * 9) * 5, -50, -44 + Math.sin(t * 9) * 8); ctx.stroke();
    // kropp (sittande)
    ell(ctx, -4, -26, 26, 30, -0.1, body);
    ell(ctx, 4, -14, 17, 15, 0, "#f4e2c4");
    ell(ctx, -14, -6, 16, 9, 0, "#c99455");
    ell(ctx, 18, -6, 9, 12, 0, "#c99455");
    // huvud
    ell(ctx, 14, -62, 18, 17, 0, body);
    ell(ctx, 26, -56, 12, 9, 0, "#f4e2c4");
    ell(ctx, 36, -58, 4.4, 3.4, 0, "#2a1a10");
    ell(ctx, 18, -66, 2.4, 2.8, 0, "#2a1a10");
    ell(ctx, 18.6, -67, 0.8, 0.8, 0, "#fff");
    // öron
    ell(ctx, 0, -62, 8, 17, 0.2 + Math.sin(t * 3) * 0.04, ear);
    // tunga
    if (Math.sin(t * 2.2) > 0.3) ell(ctx, 30, -48, 3, 5, 0, "#ff7a8a");
    ctx.restore();
  }

  return {
    hash, KX, KY, HALF, proj, PALETTES,
    drawBackdrop, drawForeground, drawFenceBack, drawFenceFront, drawFenceNumber, drawGate, drawCoin, drawHorseshoe,
    drawParticles, drawStable, drawShop, drawHound, drawSky, cloud,
  };
})();
