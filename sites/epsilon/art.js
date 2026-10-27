"use strict";
/* Epsilon Raceway - grafik. Allt ritas med canvas 2D, ovanifrån: trägolv, plastbana med kantstöd och
   spår (slot), målgång, bilar med skuggor. Banan och golvet ritas en gång till ett eget lager. */
const Art = (() => {
  const TAU = Math.PI * 2;
  const CAR_LEN = 24, CAR_W = 11;
  const SPR = 7; // pixlar per enhet i bil-spriten

  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function shade(h, f) {
    const [r, g, b] = hexToRgb(h), t = f < 0 ? 0 : 255, p = Math.abs(f);
    const m = (c) => Math.round(c + (t - c) * p);
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }

  /* ---------------------------------------------------------------- golv */
  function drawFloor(ctx, W, H, ps) {
    const rnd = rng(11);
    const woods = ["#b98d5c", "#c29a68", "#b08455", "#bb9060", "#c59d6b", "#ae8352"];
    ctx.fillStyle = "#6e4b2a"; ctx.fillRect(0, 0, W, H);
    const rows = Math.ceil(H / ps) + 1;
    for (let r = 0; r < rows; r++) {
      const y = r * ps;
      let x = -rnd() * ps * 7;
      while (x < W) {
        const len = ps * (8 + rnd() * 8);
        const base = woods[Math.floor(rnd() * woods.length)];
        const g = ctx.createLinearGradient(x, y, x, y + ps);
        g.addColorStop(0, shade(base, 0.05)); g.addColorStop(0.5, base); g.addColorStop(1, shade(base, -0.07));
        ctx.fillStyle = g; ctx.fillRect(x, y, len, ps);
        // ådring
        const nl = 7 + Math.floor(rnd() * 6);
        for (let k = 0; k < nl; k++) {
          const yy = y + 2 + rnd() * (ps - 4), amp = (rnd() - 0.5) * ps * 0.22;
          ctx.strokeStyle = `rgba(70,42,14,${0.05 + rnd() * 0.07})`; ctx.lineWidth = 0.6 + rnd() * 1.0;
          ctx.beginPath(); ctx.moveTo(x, yy);
          ctx.bezierCurveTo(x + len * 0.3, yy + amp, x + len * 0.65, yy - amp, x + len, yy + amp * 0.3); ctx.stroke();
        }
        if (rnd() < 0.2) { // kvist
          const kx = x + len * (0.15 + rnd() * 0.7), ky = y + ps * (0.25 + rnd() * 0.5);
          ctx.strokeStyle = "rgba(70,40,12,.16)"; ctx.lineWidth = 1;
          for (let q = 1; q <= 3; q++) { ctx.beginPath(); ctx.ellipse(kx, ky, ps * 0.07 * q, ps * 0.04 * q, 0, 0, TAU); ctx.stroke(); }
        }
        // skarvar
        ctx.fillStyle = "rgba(35,20,6,.55)"; ctx.fillRect(x, y, 1.4, ps);
        ctx.fillStyle = "rgba(255,238,205,.16)"; ctx.fillRect(x + 1.4, y, 1, ps);
        x += len;
      }
      ctx.fillStyle = "rgba(35,20,6,.5)"; ctx.fillRect(0, y, W, 1.4);
      ctx.fillStyle = "rgba(255,238,205,.15)"; ctx.fillRect(0, y + 1.4, W, 1);
    }
    // ljus från taket + vinjett
    const rg = ctx.createRadialGradient(W * 0.45, H * 0.4, Math.min(W, H) * 0.1, W * 0.5, H * 0.5, Math.max(W, H) * 0.78);
    rg.addColorStop(0, "rgba(255,246,225,.14)"); rg.addColorStop(0.55, "rgba(0,0,0,0)"); rg.addColorStop(1, "rgba(15,8,0,.52)");
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  }

  let noiseTile = null;
  function noisePattern(ctx) {
    if (!noiseTile) {
      noiseTile = document.createElement("canvas"); noiseTile.width = noiseTile.height = 128;
      const c = noiseTile.getContext("2d"), r = rng(3);
      c.fillStyle = "#30343a"; c.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 1100; i++) {
        const v = r() < 0.5 ? 255 : 0;
        c.fillStyle = `rgba(${v},${v},${v},${0.03 + r() * 0.05})`;
        c.fillRect(r() * 128, r() * 128, 0.6 + r() * 1.2, 0.6 + r() * 1.2);
      }
    }
    return ctx.createPattern(noiseTile, "repeat");
  }

  /* ---------------------------------------------------------------- bana */
  function offsetPath(ctx, tr, e, i0, i1) {
    const N = tr.N;
    ctx.beginPath();
    if (i0 === undefined) {
      for (let i = 0; i < N; i++) {
        const x = tr.xs[i] - Math.sin(tr.ths[i]) * e, y = tr.ys[i] + Math.cos(tr.ths[i]) * e;
        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.closePath();
    } else {
      for (let n = i0; n <= i1; n++) {
        const i = ((n % N) + N) % N;
        const x = tr.xs[i] - Math.sin(tr.ths[i]) * e, y = tr.ys[i] + Math.cos(tr.ths[i]) * e;
        if (n === i0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    }
  }

  function curveFlags(tr) {
    const N = tr.N, f = new Uint8Array(N);
    const ds = tr.length / N;
    for (let i = 0; i < N; i++) {
      const a = tr.ths[(i + 1) % N] - tr.ths[(i + N - 1) % N];
      const k = Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) / (2 * ds);
      f[i] = k > 0.0016 ? 1 : 0;
    }
    return f;
  }

  /* ctx har världstransformen. view: {scale, dpr, sdx, sdy} (skuggans riktning i bildskärmspixlar). */
  function drawTrack(ctx, tr, view) {
    const { TW, CURB, N } = tr;
    const flags = curveFlags(tr);
    const ds = view.scale * view.dpr;

    // skugga på golvet
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 11 * ds; ctx.shadowOffsetX = view.sdx * 3.4 * ds; ctx.shadowOffsetY = view.sdy * 3.4 * ds;
    ctx.strokeStyle = "#000"; ctx.lineWidth = TW + CURB * 2; ctx.lineJoin = "round";
    offsetPath(ctx, tr, 0); ctx.stroke();
    ctx.restore();

    // kantstöd: grå bas, raka bitar grå, kurvor röd/vit
    ctx.lineJoin = "round"; ctx.lineCap = "butt";
    ctx.strokeStyle = "#c6cbd2"; ctx.lineWidth = TW + CURB * 2; offsetPath(ctx, tr, 0); ctx.stroke();
    // sammanhängande kurvgrupper
    let start = flags.indexOf(0);
    const groups = [];
    if (start < 0) start = 0;
    let cur = null;
    for (let n = 0; n <= N; n++) {
      const i = (start + n) % N, c = flags[i] === 1 && n < N;
      if (c && !cur) cur = { i0: start + n, i1: start + n };
      else if (c) cur.i1 = start + n;
      else if (cur) { groups.push(cur); cur = null; }
    }
    ctx.setLineDash([]);
    for (const sg of [-1, 1]) {
      const e = sg * (TW / 2 + CURB / 2);
      for (const g of groups) {
        const a = g.i0 - 2, b = g.i1 + 2;
        ctx.lineWidth = CURB; ctx.strokeStyle = "#f4f4f4"; offsetPath(ctx, tr, e, a, b); ctx.stroke();
        ctx.setLineDash([7, 7]); ctx.lineDashOffset = 0; ctx.strokeStyle = "#d8262c";
        offsetPath(ctx, tr, e, a, b); ctx.stroke(); ctx.setLineDash([]);
      }
    }
    // yttre kontur på kantstöd
    ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 0.7;
    offsetPath(ctx, tr, TW / 2 + CURB); ctx.stroke(); offsetPath(ctx, tr, -(TW / 2 + CURB)); ctx.stroke();

    // vägbana
    ctx.strokeStyle = "#262a2f"; ctx.lineWidth = TW; offsetPath(ctx, tr, 0); ctx.stroke();
    ctx.strokeStyle = noisePattern(ctx); ctx.lineWidth = TW - 2.4; offsetPath(ctx, tr, 0); ctx.stroke();
    // vita sidolinjer
    ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 0.9;
    offsetPath(ctx, tr, TW / 2 - 2.6); ctx.stroke(); offsetPath(ctx, tr, -(TW / 2 - 2.6)); ctx.stroke();
    // streckad mittlinje
    ctx.setLineDash([7, 9]); ctx.strokeStyle = "rgba(255,255,255,.28)"; ctx.lineWidth = 0.9; offsetPath(ctx, tr, 0); ctx.stroke(); ctx.setLineDash([]);

    // skarvar mellan banbitar
    for (const j of tr.joints) {
      const x = tr.xs[j], y = tr.ys[j], th = tr.ths[j], nx = -Math.sin(th), ny = Math.cos(th), h = TW / 2 + CURB;
      ctx.strokeStyle = "rgba(0,0,0,.5)"; ctx.lineWidth = 0.85;
      ctx.beginPath(); ctx.moveTo(x + nx * h, y + ny * h); ctx.lineTo(x - nx * h, y - ny * h); ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 0.6;
      const cx = Math.cos(th) * 0.85, cy = Math.sin(th) * 0.85;
      ctx.beginPath(); ctx.moveTo(x + cx + nx * h, y + cy + ny * h); ctx.lineTo(x + cx - nx * h, y + cy - ny * h); ctx.stroke();
    }

    // spår (slot) med strömskenor
    for (const lane of tr.lanes) {
      ctx.beginPath();
      for (let i = 0; i < N; i++) { if (i) ctx.lineTo(lane.x[i], lane.y[i]); else ctx.moveTo(lane.x[i], lane.y[i]); }
      ctx.closePath();
      ctx.strokeStyle = "#8d949b"; ctx.lineWidth = 4.4; ctx.stroke();
      ctx.strokeStyle = "#050607"; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.strokeStyle = "rgba(255,200,120,.35)"; ctx.lineWidth = 0.35;
      for (const o of [-1.5, 1.5]) {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const x = lane.x[i] - Math.sin(lane.th[i]) * o, y = lane.y[i] + Math.cos(lane.th[i]) * o;
          if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      }
    }

    // start/mål
    {
      const x = tr.xs[0], y = tr.ys[0], th = tr.ths[0];
      ctx.save(); ctx.translate(x, y); ctx.rotate(th);
      const cols = 8, rows = 2, cw = TW / cols, rh = 5;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        ctx.fillStyle = (r + c) % 2 ? "#f6f6f6" : "#111";
        ctx.fillRect(-rh + r * rh, -TW / 2 + c * cw, rh, cw);
      }
      ctx.restore();
    }
  }

  /* ---------------------------------------------------------------- bil */
  function bodyPath(c, grow) {
    const g = grow || 0;
    c.beginPath();
    c.moveTo(12 + g, 0);
    c.bezierCurveTo(12 + g, -2.2, 10.5 + g, -4.2, 7.5, -4.7 - g);
    c.bezierCurveTo(4, -5.0 - g, 1, -5.6 - g, -3, -5.7 - g);
    c.bezierCurveTo(-7, -5.8 - g, -10.5, -5.4 - g, -11.8 - g, -4.2 - g);
    c.lineTo(-11.8 - g, 4.2 + g);
    c.bezierCurveTo(-10.5, 5.4 + g, -7, 5.8 + g, -3, 5.7 + g);
    c.bezierCurveTo(1, 5.6 + g, 4, 5.0 + g, 7.5, 4.7 + g);
    c.bezierCurveTo(10.5 + g, 4.2, 12 + g, 2.2, 12 + g, 0);
    c.closePath();
  }
  function rrect(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }

  const spriteCache = {};
  function carSprite(color) {
    if (spriteCache[color]) return spriteCache[color];
    const pad = 4, w = Math.ceil((CAR_LEN + pad * 2) * SPR), h = Math.ceil((CAR_W + 2 + pad * 2) * SPR);
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    const c = cv.getContext("2d");
    c.translate(w / 2, h / 2); c.scale(SPR, SPR);
    const dark = shade(color, -0.42), mid = color, light = shade(color, 0.38);
    // hjul
    c.fillStyle = "#101010";
    for (const [x, wl, ww] of [[7.4, 5.2, 2.5], [-7.6, 6.0, 3.0]]) for (const sg of [-1, 1]) {
      rrect(c, x - wl / 2, sg * 5.4 - ww / 2 + (sg > 0 ? 0.4 : -0.4), wl, ww, 0.9); c.fill();
    }
    c.strokeStyle = "rgba(255,255,255,.18)"; c.lineWidth = 0.18;
    for (const [x, wl] of [[7.4, 5.2], [-7.6, 6.0]]) for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(x - wl / 2 + 0.8, sg * 6.5); c.lineTo(x + wl / 2 - 0.8, sg * 6.5); c.stroke(); }
    // kaross
    bodyPath(c);
    const g = c.createLinearGradient(0, -6, 0, 6);
    g.addColorStop(0, dark); g.addColorStop(0.28, mid); g.addColorStop(0.5, light); g.addColorStop(0.72, mid); g.addColorStop(1, dark);
    c.fillStyle = g; c.fill();
    c.save(); bodyPath(c); c.clip();
    // racingränder
    c.fillStyle = "rgba(255,255,255,.92)";
    c.fillRect(-12, -1.9, 24, 1.15); c.fillRect(-12, 0.75, 24, 1.15);
    // huv-lufthål
    c.fillStyle = "rgba(0,0,0,.35)"; rrect(c, 5.2, -2.1, 3.2, 4.2, 0.6); c.fill();
    c.fillStyle = "rgba(255,255,255,.14)"; c.fillRect(5.2, -2.1, 3.2, 0.6);
    // skuggning bak
    const gr = c.createLinearGradient(-12, 0, 12, 0);
    gr.addColorStop(0, "rgba(0,0,0,.28)"); gr.addColorStop(0.35, "rgba(0,0,0,0)"); gr.addColorStop(0.8, "rgba(255,255,255,.08)"); gr.addColorStop(1, "rgba(255,255,255,.16)");
    c.fillStyle = gr; c.fillRect(-12, -6, 24, 12);
    c.restore();
    // sidospeglar
    c.fillStyle = dark; for (const sg of [-1, 1]) { c.beginPath(); c.ellipse(3.3, sg * 5.8, 0.9, 0.55, 0, 0, TAU); c.fill(); }
    // vindruta/cockpit
    c.beginPath(); c.moveTo(5.4, -2.9); c.lineTo(2.2, -4.1); c.lineTo(-3.8, -3.9); c.lineTo(-5.9, -2.9); c.lineTo(-5.9, 2.9); c.lineTo(-3.8, 3.9); c.lineTo(2.2, 4.1); c.lineTo(5.4, 2.9); c.closePath();
    const gl = c.createLinearGradient(0, -4, 0, 4); gl.addColorStop(0, "#26384f"); gl.addColorStop(1, "#0b121c");
    c.fillStyle = gl; c.fill();
    // tak
    c.beginPath(); c.moveTo(1.4, -2.8); c.lineTo(-3.6, -3.1); c.lineTo(-3.6, 3.1); c.lineTo(1.4, 2.8); c.closePath();
    const rg = c.createLinearGradient(0, -3, 0, 3); rg.addColorStop(0, mid); rg.addColorStop(0.5, light); rg.addColorStop(1, mid);
    c.fillStyle = rg; c.fill();
    c.fillStyle = "rgba(255,255,255,.9)"; c.fillRect(-3.6, -0.55, 5, 1.1);
    // reflex i rutan
    c.fillStyle = "rgba(255,255,255,.2)"; c.beginPath(); c.moveTo(5.2, -2.6); c.lineTo(3.6, -2.6); c.lineTo(2.2, 1.6); c.lineTo(4.4, 2.2); c.closePath(); c.fill();
    // strålkastare + baklyktor
    c.fillStyle = "#fff6c4"; for (const sg of [-1, 1]) { c.beginPath(); c.ellipse(10.3, sg * 2.7, 1.1, 0.8, sg * 0.3, 0, TAU); c.fill(); }
    c.fillStyle = "#ff2a2a"; for (const sg of [-1, 1]) rrect(c, -11.9, sg * 3.7 - 0.7, 0.9, 1.4, 0.3), c.fill();
    // bakvinge
    c.fillStyle = dark; rrect(c, -13.2, -6.1, 2.4, 12.2, 0.5); c.fill();
    c.fillStyle = light; rrect(c, -13.0, -5.6, 1.5, 11.2, 0.4); c.fill();
    c.fillStyle = "#101010"; for (const sg of [-1, 1]) c.fillRect(-13.2, sg * 6.1 - (sg > 0 ? 0.2 : 0.4), 2.4, 0.6);
    // kontur
    bodyPath(c); c.strokeStyle = "rgba(0,0,0,.5)"; c.lineWidth = 0.28; c.stroke();
    spriteCache[color] = cv;
    return cv;
  }

  let shadowSpr = null;
  function shadowSprite() {
    if (shadowSpr) return shadowSpr;
    const pad = 8, w = Math.ceil((CAR_LEN + pad * 2) * SPR), h = Math.ceil((CAR_W + 2 + pad * 2) * SPR);
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    const c = cv.getContext("2d");
    c.shadowColor = "rgba(0,0,0,.65)"; c.shadowBlur = 2.2 * SPR; c.shadowOffsetX = w; // skuggan hamnar i bilden, formen utanför
    c.translate(w / 2 - w / SPR, h / 2); c.scale(SPR, SPR);
    c.shadowOffsetX = w; c.fillStyle = "#000";
    bodyPath(c, 0.2); c.fill();
    for (const [x, wl, ww] of [[7.4, 5.2, 2.5], [-7.6, 6.0, 3.0]]) for (const sg of [-1, 1]) { rrect(c, x - wl / 2, sg * 5.4 - ww / 2, wl, ww, 0.9); c.fill(); }
    shadowSpr = cv;
    return cv;
  }

  /* Ritar en bil (sprite) vid världsposition. lift 0..1 höjer bilen (flyger) och flyttar skuggan. */
  function drawCar(ctx, color, x, y, ang, opt) {
    opt = opt || {};
    const sp = carSprite(color), sh = shadowSprite();
    const lift = opt.lift || 0, sc = (opt.scale || 1) * (1 + lift * 0.18), a = opt.alpha === undefined ? 1 : opt.alpha;
    const sdx = opt.sdx || 1.6, sdy = opt.sdy || 2.2, k = 1 + lift * 3.2;
    ctx.save();
    ctx.globalAlpha = a * (0.85 - lift * 0.25);
    ctx.translate(x + sdx * k, y + sdy * k); ctx.rotate(ang); ctx.scale(sc / SPR, sc / SPR);
    ctx.drawImage(sh, -sh.width / 2, -sh.height / 2);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc / SPR, sc / SPR);
    ctx.drawImage(sp, -sp.width / 2, -sp.height / 2);
    ctx.restore();
  }

  /* Målportal (över bilarna). lights: antal tända röda (0-3), green: bool */
  function drawGantry(ctx, tr, lights, green) {
    const x = tr.xs[0], y = tr.ys[0], th = tr.ths[0];
    const half = tr.TW / 2 + tr.CURB + 2.5, off = 26;
    ctx.save(); ctx.translate(x, y); ctx.rotate(th);
    // skuggan av portalen (förskjuten mot golvet)
    ctx.fillStyle = "rgba(0,0,0,.22)";
    ctx.fillRect(off - 1 + 5, -half + 3, 9, half * 2);
    // stolpar
    for (const sg of [-1, 1]) {
      ctx.fillStyle = "#3b4048"; ctx.beginPath(); ctx.arc(off + 3.5, sg * half, 3.3, 0, TAU); ctx.fill();
      ctx.fillStyle = "#5a616b"; ctx.beginPath(); ctx.arc(off + 3.5 - 0.5, sg * half - 0.5, 1.8, 0, TAU); ctx.fill();
    }
    // tvärbalk
    const g = ctx.createLinearGradient(off - 1, 0, off + 8, 0);
    g.addColorStop(0, "#2a2f36"); g.addColorStop(0.5, "#4a515b"); g.addColorStop(1, "#2a2f36");
    ctx.fillStyle = g; ctx.fillRect(off - 1, -half, 9, half * 2);
    ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.lineWidth = 0.4; ctx.strokeRect(off - 1, -half, 9, half * 2);
    // skylt "START"
    ctx.fillStyle = "#e8eaee"; ctx.fillRect(off + 0.5, -half + 3, 6, half * 2 - 6);
    ctx.fillStyle = "#c8232c"; ctx.fillRect(off + 0.5, -half + 3, 1.6, half * 2 - 6);
    // lampor
    for (let i = 0; i < 3; i++) {
      const ly = (i - 1) * 11;
      const on = green ? false : i < lights;
      ctx.fillStyle = "#14161a"; ctx.beginPath(); ctx.arc(off + 4, ly, 3.4, 0, TAU); ctx.fill();
      if (on) {
        ctx.save(); ctx.globalCompositeOperation = "lighter";
        const rg = ctx.createRadialGradient(off + 4, ly, 0, off + 4, ly, 11); rg.addColorStop(0, "rgba(255,60,50,.8)"); rg.addColorStop(1, "rgba(255,60,50,0)");
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(off + 4, ly, 11, 0, TAU); ctx.fill(); ctx.restore();
        ctx.fillStyle = "#ff3a2e";
      } else if (green) {
        ctx.fillStyle = "#38e070";
      } else ctx.fillStyle = "#4a1512";
      ctx.beginPath(); ctx.arc(off + 4, ly, 2.5, 0, TAU); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.arc(off + 3.2, ly - 0.9, 0.8, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  /* Liten banförhandsvisning (meny). */
  function drawThumb(cv, tr, opts) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth || 300, h = cv.clientHeight || 160;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const c = cv.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    const b = tr.bbox, bw = b.maxX - b.minX, bh = b.maxY - b.minY, pad = 14;
    const sc = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    c.translate(w / 2 - (b.minX + bw / 2) * sc, h / 2 - (b.minY + bh / 2) * sc);
    c.scale(sc, sc);
    const path = (e, off) => {
      c.beginPath();
      for (let i = 0; i < tr.N; i++) {
        const x = tr.xs[i] - Math.sin(tr.ths[i]) * e, y = tr.ys[i] + Math.cos(tr.ths[i]) * e;
        if (i) c.lineTo(x, y); else c.moveTo(x, y);
      }
      c.closePath();
    };
    c.lineJoin = "round";
    c.shadowColor = "rgba(0,0,0,.5)"; c.shadowBlur = 8; c.shadowOffsetY = 3;
    c.strokeStyle = "#d3d7dd"; c.lineWidth = tr.TW + tr.CURB * 2; path(0); c.stroke();
    c.shadowColor = "transparent";
    c.strokeStyle = "#2b2f35"; c.lineWidth = tr.TW; path(0); c.stroke();
    c.setLineDash([8, 9]); c.strokeStyle = "rgba(255,255,255,.35)"; c.lineWidth = 1.2; path(0); c.stroke(); c.setLineDash([]);
    // start/mål
    c.save(); c.translate(tr.xs[0], tr.ys[0]); c.rotate(tr.ths[0]);
    for (let r = 0; r < 2; r++) for (let q = 0; q < 8; q++) { c.fillStyle = (r + q) % 2 ? "#f6f6f6" : "#111"; c.fillRect(-5 + r * 5, -tr.TW / 2 + q * 5, 5, 5); }
    c.restore();
    if (opts && opts.color) {
      const a = Math.round(tr.N * 0.9);
      drawCar(c, opts.color, tr.lanes[0].x[a], tr.lanes[0].y[a], tr.lanes[0].th[a], { scale: 1.5, sdx: 1.5, sdy: 2 });
    }
  }

  function drawCarSwatch(cv, color) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth || 64, h = cv.clientHeight || 36;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const c = cv.getContext("2d"); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
    const sc = Math.min(w / (CAR_LEN + 6), h / (CAR_W + 5));
    drawCar(c, color, w / 2, h / 2, 0, { scale: sc, sdx: 0.8, sdy: 1.2 });
  }

  /* Passar in banan i rektangeln pad = {l, t, r, b}. Roterar 90 grader om det ger större bana. */
  function fitView(tr, W, H, pad) {
    const aw = W - pad.l - pad.r, ah = H - pad.t - pad.b;
    let best = null;
    for (const phi of [0, Math.PI / 2]) {
      const c = Math.cos(phi), s = Math.sin(phi);
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      const half = tr.TW / 2 + tr.CURB + 5;
      for (let i = 0; i < tr.N; i += 3) for (const sg of [-1, 1]) {
        const px = tr.xs[i] - Math.sin(tr.ths[i]) * half * sg, py = tr.ys[i] + Math.cos(tr.ths[i]) * half * sg;
        const X = c * px - s * py, Y = s * px + c * py;
        if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y;
      }
      const sc = Math.min(aw / (x1 - x0), ah / (y1 - y0));
      if (!best || sc > best.scale * 1.02) best = { phi, scale: sc, x0, y0, x1, y1 };
    }
    const tx = pad.l + (aw - best.scale * (best.x1 - best.x0)) / 2 - best.scale * best.x0;
    const ty = pad.t + (ah - best.scale * (best.y1 - best.y0)) / 2 - best.scale * best.y0;
    return { phi: best.phi, scale: best.scale, tx, ty };
  }

  const api = { TAU, fitView, CAR_LEN, CAR_W, drawFloor, drawTrack, drawCar, drawGantry, drawThumb, drawCarSwatch, shade, rng, carSprite };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  return api;
})();
