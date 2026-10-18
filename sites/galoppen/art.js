"use strict";
/* Galoppen - ritkod för häst och ryttare (ren canvas, inga bilder).
   Hästen vetter åt höger. Lokala koordinater: origo = marken under hästens mage,
   negativ y = uppåt. Benen är leddrivna (IK) så att gångarten ser naturlig ut. */
const Art = (() => {
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  /* ---------- färghjälp ---------- */
  function rgb(h) {
    if (h[0] === "#") h = h.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function hex(r, g, b) {
    const f = (v) => ("0" + clamp(Math.round(v), 0, 255).toString(16)).slice(-2);
    return "#" + f(r) + f(g) + f(b);
  }
  function mix(a, b, t) {
    const x = rgb(a), y = rgb(b);
    return hex(lerp(x[0], y[0], t), lerp(x[1], y[1], t), lerp(x[2], y[2], t));
  }
  /** amt -1..1: mot svart / mot vitt */
  function shade(c, amt) { return amt < 0 ? mix(c, "#000000", -amt) : mix(c, "#ffffff", amt); }

  /* ---------- geometri ---------- */
  function ik(p0, p2, l1, l2, bend) {
    let dx = p2[0] - p0[0], dy = p2[1] - p0[1];
    let d = Math.hypot(dx, dy);
    const maxd = l1 + l2 - 0.4;
    if (d > maxd) { const k = maxd / d; dx *= k; dy *= k; d = maxd; }
    if (d < 0.01) d = 0.01;
    const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
    const ux = dx / d, uy = dy / d;
    return {
      j: [p0[0] + ux * a + uy * bend * h, p0[1] + uy * a - ux * bend * h],
      e: [p0[0] + dx, p0[1] + dy],
    };
  }

  function spline(pts, n) {
    // Catmull-Rom genom pts, n sampel per segment; returnerar [[x,y,t]]
    const out = [];
    const P = (i) => pts[clamp(i, 0, pts.length - 1)];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
        out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1]), i + t]);
      }
    }
    const l = pts[pts.length - 1];
    out.push([l[0], l[1], pts.length - 1]);
    return out;
  }

  /** Avsmalnande kropp längs en kurva (ben, hals, svans). ws = bredd per ledpunkt. */
  function limb(ctx, pts, ws, fill, n = 6) {
    const c = spline(pts, n);
    const L = [], R = [];
    for (let i = 0; i < c.length; i++) {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1];
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl; ty /= tl;
      const seg = Math.min(Math.floor(c[i][2]), ws.length - 2);
      const w = lerp(ws[seg], ws[seg + 1], c[i][2] - seg) / 2;
      L.push([c[i][0] - ty * w, c[i][1] + tx * w]);
      R.push([c[i][0] + ty * w, c[i][1] - tx * w]);
    }
    ctx.beginPath();
    ctx.moveTo(L[0][0], L[0][1]);
    for (let i = 1; i < L.length; i++) ctx.lineTo(L[i][0], L[i][1]);
    const e = c[c.length - 1], we = ws[ws.length - 1] / 2;
    ctx.arc(e[0], e[1], we, 0, TAU);
    ctx.moveTo(R[R.length - 1][0], R[R.length - 1][1]);
    for (let i = R.length - 2; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
    const s = c[0], ws0 = ws[0] / 2;
    ctx.arc(s[0], s[1], ws0, 0, TAU);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  /** Rör utan rundade ändar (stövelskaft). */
  function tube(ctx, a, b, wa, wb, fill) {
    const d = norm([b[0] - a[0], b[1] - a[1]]);
    const n = [-d[1], d[0]];
    poly(ctx, [
      [a[0] + n[0] * wa / 2, a[1] + n[1] * wa / 2], [b[0] + n[0] * wb / 2, b[1] + n[1] * wb / 2],
      [b[0] - n[0] * wb / 2, b[1] - n[1] * wb / 2], [a[0] - n[0] * wa / 2, a[1] - n[1] * wa / 2],
    ], fill);
  }

  function rgba(c, a) { const q = rgb(c); return `rgba(${q[0]},${q[1]},${q[2]},${a})`; }

  /** Ellips med mjuk kant (smälter in i underlaget). */
  function softEll(ctx, x, y, rx, ry, rot, col) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.scale(rx, ry);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, rgba(col, 0.95));
    g.addColorStop(0.55, rgba(col, 0.8));
    g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function ell(ctx, x, y, rx, ry, rot, fill) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot || 0, 0, TAU);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function poly(ctx, pts, fill) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function rot(v, a) { return [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)]; }
  function norm(v) { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; }

  /* ---------- färger ---------- */
  const COAT = {
    base: "#9a5429", hi: "#cf9158", lo: "#5a2e15", belly: "#b87445",
    mane: "#24160f", maneHi: "#4a3022", hoof: "#2b2019", muzzle: "#4a3328",
    white: "#fbf6ee", eye: "#1a100a",
  };

  /* ---------- gångarter ---------- */
  // fas-förskjutning per ben: far hind, near hind, far fore, near fore
  const GAITS = {
    stand: { stance: 1, A: 0, lift: 0, off: [0, 0, 0, 0] },
    walk: { stance: 0.62, A: 16, lift: 14, off: [0.0, 0.5, 0.25, 0.75] },
    trot: { stance: 0.5, A: 26, lift: 24, off: [0.5, 0, 0, 0.5] },
    canter: { stance: 0.4, A: 32, lift: 32, off: [0, 0.14, 0.14, 0.3] },
    gallop: { stance: 0.34, A: 38, lift: 38, off: [0, 0.1, 0.3, 0.42] },
  };

  const FET_Y = -8;
  const SHOULDER = [40, -74];
  const HIP = [-50, -78];

  function legPath(g, phase, hipX) {
    const ph = ((phase % 1) + 1) % 1;
    let x, y;
    if (ph < g.stance) {
      const q = ph / g.stance;
      x = hipX + g.A * (1 - 2 * q);
      y = FET_Y;
    } else {
      const q = (ph - g.stance) / (1 - g.stance);
      const e = q * q * (3 - 2 * q);
      x = hipX + g.A * (-1 + 2 * e);
      y = FET_Y - g.lift * Math.sin(Math.PI * q);
    }
    return [x, y];
  }

  /* ---------- ben ---------- */
  function drawLeg(ctx, hip, fet, front, o) {
    const l1 = front ? 34 : 40, l2 = front ? 34 : 38;
    const bend = front ? 1 : -1;
    const { j, e } = ik(hip, fet, l1, l2, bend);
    const dir = norm([e[0] - j[0], e[1] - j[1]]);
    const hd = rot(dir, -0.42);
    const tip = [e[0] + hd[0] * 9, e[1] + hd[1] * 9];
    const col = o.col;
    const ws = front ? [17, 11.5, 7.4, 8] : [24, 14, 7.8, 8];
    limb(ctx, [hip, j, e, tip], ws, col, 7);
    // muskel överst på benet (underarm / lår) och lätt skuggning vid leden
    const m = lerp2(hip, j, front ? 0.4 : 0.34);
    softEll(ctx, m[0], m[1], front ? 9.5 : 14, front ? 13 : 19, Math.atan2(j[1] - hip[1], j[0] - hip[0]) - Math.PI / 2, o.mus || col);
    ell(ctx, j[0], j[1], front ? 4.2 : 4.8, front ? 4.2 : 4.8, 0, "rgba(50,20,5,.14)");
    if (o.sock) {
      const a = [lerp(j[0], e[0], 0.45), lerp(j[1], e[1], 0.45)];
      limb(ctx, [a, e, tip], [6.8, 6.8, 7.6], COAT.white, 5);
    }
    if (o.wrap) {
      const a = [lerp(j[0], e[0], 0.12), lerp(j[1], e[1], 0.12)];
      const b = [lerp(j[0], e[0], 0.92), lerp(j[1], e[1], 0.92)];
      limb(ctx, [a, b], [8.8, 9.2], o.wrap.c, 3);
      if (o.wrap.c2) {
        const m = [lerp(a[0], b[0], 0.5), lerp(a[1], b[1], 0.5)];
        limb(ctx, [lerp2(a, m, 0.2), lerp2(m, b, 0.3)], [9.4, 9.4], o.wrap.c2, 2);
      }
      limb(ctx, [a, lerp2(a, b, 0.14)], [10, 10], shade(o.wrap.c, -0.25), 2);
    }
    // hov
    const hw = 5.2, hl = 9.5;
    const side = [-dir[1], dir[0]];
    const h0 = [e[0] + hd[0] * 3, e[1] + hd[1] * 3];
    const h1 = [e[0] + hd[0] * hl, e[1] + hd[1] * hl];
    poly(ctx, [
      [h0[0] - side[0] * hw * 0.8, h0[1] - side[1] * hw * 0.8],
      [h1[0] - side[0] * hw * 1.1, h1[1] - side[1] * hw * 1.1],
      [h1[0] + side[0] * hw * 1.1, h1[1] + side[1] * hw * 1.1],
      [h0[0] + side[0] * hw * 0.8, h0[1] + side[1] * hw * 0.8],
    ], o.hoof);
    return { j, e };
  }

  function lerp2(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]; }

  /* ---------- hästen ---------- */

  function bodyPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(36, -113);
    ctx.bezierCurveTo(20, -108, 2, -104, -14, -107);
    ctx.bezierCurveTo(-30, -111, -44, -116, -58, -110);
    ctx.bezierCurveTo(-74, -104, -80, -88, -72, -72);
    ctx.bezierCurveTo(-66, -60, -50, -54, -32, -53);
    ctx.bezierCurveTo(-12, -50, 14, -49, 32, -53);
    ctx.bezierCurveTo(48, -56, 62, -64, 63, -82);
    ctx.bezierCurveTo(64, -96, 56, -108, 46, -116);
    ctx.closePath();
  }

  function neckPath(ctx, p) {
    // p = poll (nacke)
    ctx.beginPath();
    ctx.moveTo(26, -108);
    ctx.bezierCurveTo(44, -126, 62, -150, p[0] - 2, p[1] - 4);
    ctx.lineTo(p[0] + 15, p[1] + 10);
    ctx.bezierCurveTo(p[0] + 4, p[1] + 36, 74, -122, 66, -92);
    ctx.lineTo(40, -90);
    ctx.closePath();
  }

  function drawHead(ctx, p, ang, o) {
    ctx.save();
    ctx.translate(p[0], p[1]);
    ctx.rotate(ang);
    ctx.scale(1.08, 1.08);
    const c = COAT;
    // huvud (lokalt: +x längs nosryggen)
    ctx.beginPath();
    ctx.moveTo(-3, -7);
    ctx.bezierCurveTo(8, -9, 26, -7, 41, 0);
    ctx.bezierCurveTo(48, 3, 53, 7, 52, 12);
    ctx.bezierCurveTo(51, 18, 44, 19, 38, 17);
    ctx.bezierCurveTo(28, 15, 20, 17, 13, 23);
    ctx.bezierCurveTo(7, 27, -2, 26, -6, 19);
    ctx.bezierCurveTo(-9, 12, -8, 0, -3, -7);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, -8, 0, 26);
    g.addColorStop(0, o.coat.hi); g.addColorStop(0.35, o.coat.base); g.addColorStop(1, o.coat.lo);
    ctx.fillStyle = g;
    ctx.fill();
    // bläs
    if (o.blaze) {
      ctx.beginPath();
      ctx.moveTo(8, -8);
      ctx.bezierCurveTo(22, -8, 34, -4, 44, 1);
      ctx.bezierCurveTo(41, 5, 33, 4, 26, 3);
      ctx.bezierCurveTo(18, 1, 11, -2, 8, -8);
      ctx.fillStyle = c.white;
      ctx.fill();
    }
    // mule
    ctx.beginPath();
    ctx.moveTo(41, 0);
    ctx.bezierCurveTo(48, 3, 53, 7, 52, 12);
    ctx.bezierCurveTo(51, 18, 44, 19, 38, 17);
    ctx.bezierCurveTo(37, 11, 38, 5, 41, 0);
    ctx.fillStyle = c.muzzle;
    ctx.fill();
    // mulens mjuka kant
    ell(ctx, 47, 8, 4.5, 6.5, 0.2, shade(c.muzzle, 0.12));
    // näsborre
    ell(ctx, 48.5, 4.6, 1.9, 2.6, 0.6, "#1b100b");
    // mun
    ctx.strokeStyle = "#2a1810";
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    const open = o.mouth || 0;
    ctx.moveTo(51, 14.4);
    ctx.quadraticCurveTo(44, 16 + open * 2.5, 38, 14.5 + open * 3);
    ctx.stroke();
    // kind
    ell(ctx, 14, 17, 9, 5.5, 0.12, shade(o.coat.base, -0.18));
    // öga
    const bl = o.blink ? 0.12 : 1;
    ell(ctx, 15, 3.6, 4.6, 4.1 * bl, 0, "#2a1810");
    if (bl > 0.5) {
      ell(ctx, 15, 3.6, 3.6, 3.2, 0, c.eye);
      ell(ctx, 14, 2.4, 1.3, 1.3, 0, "#ffffff");
      ell(ctx, 16.4, 4.6, 0.7, 0.7, 0, "rgba(255,255,255,.7)");
    }
    ctx.strokeStyle = "#1a100a";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(15, 3.6, 4.7, Math.PI * 1.1, Math.PI * 1.95);
    ctx.stroke();
    // öron
    const ea = o.ear || 0;
    for (let i = 0; i < 2; i++) {
      ctx.save();
      ctx.translate(-1 - i * 2.5, -7 + i * 0.4);
      ctx.rotate(-0.55 + ea + i * 0.18);
      ctx.beginPath();
      ctx.moveTo(-3.4, 1);
      ctx.quadraticCurveTo(-2.4, -12, 0.5, -17);
      ctx.quadraticCurveTo(4.5, -10, 4.2, 1);
      ctx.closePath();
      ctx.fillStyle = i ? shade(o.coat.base, -0.35) : o.coat.base;
      ctx.fill();
      if (!i) { ell(ctx, 0.5, -6.8, 1.4, 5.2, 0.05, shade(o.coat.lo, -0.1)); }
      ctx.restore();
    }
    // träns / grimma
    if (o.bridle) drawBridle(ctx, o.bridle, o.halter);
    ctx.restore();
  }

  function drawBridle(ctx, b, halter) {
    const col = b.c, c2 = b.c2 || shade(b.c, -0.3);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const line = (pts, w, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    };
    if (halter) {
      line([[30, 16], [31, 1.5]], 2.6, col);
      line([[-2, -6], [6, 8], [14, 19]], 2, col);
      line([[-2, -6], [-5, 8], [-2, 19]], 2, col);
      line([[-5, 20], [14, 20.5]], 2, col);
      line([[14, 19], [30, 16]], 2, col);
      ell(ctx, 30.5, 15.5, 1.8, 1.8, 0, "#d9dde2");
      return;
    }
    // nosgrimma
    line([[26, 15.5], [27, 1], [28.4, -0.5]], 3.4, col);
    line([[38, 16.4], [38, 3], [39.2, 1.2]], 3.2, col);
    // kindrem + hjässrem
    line([[-1, -6.5], [6, 8], [13, 21]], 2.6, col);
    line([[-1, -6.5], [-4, 8], [-1, 19]], 2.4, col);
    line([[-6, 20], [13, 22]], 2.4, col);
    // pannband
    line([[3.6, -7.6], [16, -9.6]], 2.4, c2);
    if (b.gem) {
      ell(ctx, 6, -8.6, 2.4, 2.4, 0, b.gem);
      ell(ctx, 11, -9.2, 2.2, 2.2, 0, b.gem);
      ell(ctx, 6.6, -9.2, 0.8, 0.8, 0, "#fff");
    }
    if (!halter) {
      // bett
      ell(ctx, 37.5, 14.8, 3, 3, 0, "#d9dde2");
      ell(ctx, 37.5, 14.8, 1.4, 1.4, 0, "#8f98a3");
    } else {
      line([[38, 17], [34, 24]], 2.6, col);
    }
  }

  function drawRosetteOnHead(ctx, r) {
    if (!r) return;
    ctx.save();
    ctx.translate(11, 11);
    drawRosette(ctx, 0, 0, 7.5, r.c, r.c2 || shade(r.c, 0.45), 0.55, true);
    ctx.restore();
  }

  /** Rosett: rosett med kantad rund skiva och två band. */
  function drawRosette(ctx, x, y, r, c1, c2, sway, tails) {
    ctx.save();
    ctx.translate(x, y);
    if (tails !== false) {
      for (let i = 0; i < 2; i++) {
        const s = i ? 1 : -1;
        const a = Math.PI / 2 + s * 0.28 + (sway || 0) * 0.15 * s;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a - 0.2) * r * 2.5, Math.sin(a - 0.2) * r * 2.5);
        ctx.lineTo(Math.cos(a) * r * 2.2, Math.sin(a) * r * 2.2 - r * 0.2);
        ctx.lineTo(Math.cos(a + 0.2) * r * 2.5, Math.sin(a + 0.2) * r * 2.5);
        ctx.closePath();
        ctx.fillStyle = i ? c1 : c2;
        ctx.fill();
      }
    }
    const n = 14;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * TAU;
      ctx.beginPath();
      ctx.ellipse(Math.cos(a) * r * 0.75, Math.sin(a) * r * 0.75, r * 0.34, r * 0.24, a, 0, TAU);
      ctx.fillStyle = k % 2 ? c1 : shade(c1, -0.12);
      ctx.fill();
    }
    ell(ctx, 0, 0, r * 0.72, r * 0.72, 0, c1);
    ell(ctx, 0, 0, r * 0.5, r * 0.5, 0, c2);
    ell(ctx, 0, 0, r * 0.26, r * 0.26, 0, c1);
    ctx.restore();
  }

  /* ---------- man, svans ---------- */

  function drawMane(ctx, p, t, o, flow) {
    const col = o.coat.mane, hi = o.coat.maneHi;
    const style = o.mane ? o.mane.style : "loose";
    // manen följer nackens översida från manke till nacke
    const crest = [[28, -111], [44, -128], [60, -148], [p[0] - 4, p[1] - 3]];
    const sway = flow * 7 + Math.sin(t * 5) * 1.2;
    if (style === "braided") {
      const n = 9;
      const c = spline(crest, 10);
      for (let i = 0; i < n; i++) {
        const f = (i + 0.5) / n;
        const idx = Math.floor(f * (c.length - 1));
        const pt = c[idx];
        ell(ctx, pt[0] - 3, pt[1] + 2.5, 3.9, 4.4, 0, col);
        ell(ctx, pt[0] - 3.5, pt[1] + 2, 1.6, 2, 0, hi);
        ell(ctx, pt[0] - 3, pt[1] + 6.5, 2.2, 2.2, 0, o.mane.c || "#ff5d8f");
      }
      limb(ctx, crest.map((q) => [q[0] - 1, q[1] + 0.5]), [3, 3, 3, 3], col, 6);
      return;
    }
    const strands = 9;
    for (let s = 0; s < strands; s++) {
      const f = s / (strands - 1);
      const base = spline(crest, 10);
      const pt = base[Math.floor(f * (base.length - 1))];
      const len = 17 + (1 - Math.abs(f - 0.5)) * 6;
      const wob = Math.sin(t * 6 + s * 0.8) * 2 + sway * (0.5 + f * 0.5);
      ctx.beginPath();
      ctx.moveTo(pt[0] + 3, pt[1] - 1);
      ctx.bezierCurveTo(pt[0] - 6 + wob * 0.4, pt[1] + 4, pt[0] - 12 + wob, pt[1] + len * 0.6, pt[0] - 8 + wob * 1.3, pt[1] + len);
      ctx.bezierCurveTo(pt[0] - 3 + wob, pt[1] + len * 0.6, pt[0] + 2, pt[1] + 8, pt[0] + 6, pt[1] + 1);
      ctx.closePath();
      ctx.fillStyle = s % 3 === 0 ? hi : col;
      ctx.fill();
    }
    if (style === "ribbons") {
      const base = spline(crest, 10);
      for (let k = 0; k < 4; k++) {
        const pt = base[Math.floor((0.12 + k * 0.25) * (base.length - 1))];
        drawBow(ctx, pt[0] - 2, pt[1] + 2, o.mane.c || "#ff5d8f", 4.8);
      }
    }
  }

  function drawBow(ctx, x, y, c, s) {
    ctx.save();
    ctx.translate(x, y);
    ell(ctx, -s * 0.8, 0, s, s * 0.62, -0.5, c);
    ell(ctx, s * 0.8, 0, s, s * 0.62, 0.5, c);
    ell(ctx, 0, 0, s * 0.34, s * 0.34, 0, shade(c, -0.25));
    ctx.restore();
  }

  function drawForelock(ctx, p, ang, t, o) {
    ctx.save();
    ctx.translate(p[0], p[1]);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.bezierCurveTo(6, -11 + Math.sin(t * 5) * 0.6, 11, -8, 12, -2 + Math.sin(t * 5.5) * 0.8);
    ctx.bezierCurveTo(8, -3, 3, -4, 0, -3);
    ctx.closePath();
    ctx.fillStyle = o.coat.mane;
    ctx.fill();
    ctx.restore();
  }

  function drawTail(ctx, t, o, flow, lift) {
    const col = o.coat.mane, hi = o.coat.maneHi;
    const d = [-72, -99];
    const sw = Math.sin(t * 4.2) * 3 + flow * 12;
    for (let s = 0; s < 6; s++) {
      const off = s - 2.5;
      const wob = Math.sin(t * 6 + s * 0.9) * 3 + sw * (0.6 + s * 0.08);
      const droop = 38 - lift * 18 + Math.abs(off) * 3;
      ctx.beginPath();
      ctx.moveTo(d[0] + 2, d[1] + off * 0.9);
      ctx.bezierCurveTo(d[0] - 14, d[1] + off * 2 - 4 + lift * -6, d[0] - 22 + wob * 0.5 - flow * 10, d[1] + droop * 0.5 + off * 2, d[0] - 20 + wob - flow * 18, d[1] + droop + off * 2);
      ctx.bezierCurveTo(d[0] - 12 + wob * 0.6, d[1] + droop * 0.62, d[0] - 4, d[1] + 8, d[0] + 3, d[1] + 3 + off);
      ctx.closePath();
      ctx.fillStyle = s % 2 ? hi : col;
      ctx.fill();
    }
  }

  /* ---------- sadel & schabrak ---------- */

  function drawPad(ctx, pad) {
    if (!pad) return;
    ctx.beginPath();
    ctx.moveTo(-26, -108);
    ctx.lineTo(24, -108);
    ctx.quadraticCurveTo(31, -80, 24, -64);
    ctx.quadraticCurveTo(0, -60, -26, -64);
    ctx.quadraticCurveTo(-33, -86, -26, -108);
    ctx.closePath();
    if (pad.rainbow) {
      const g = ctx.createLinearGradient(-30, 0, 28, 0);
      ["#ff6b8b", "#ffa94d", "#ffe066", "#7bd88f", "#5ccfee", "#8a7dff"].forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c));
      ctx.fillStyle = g;
    } else ctx.fillStyle = pad.c;
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = pad.c2 || shade(pad.c, -0.25);
    ctx.stroke();
    if (pad.stars) {
      ctx.fillStyle = pad.c2 || "#ffe066";
      [[-14, -88], [4, -77], [15, -96], [-4, -99], [-18, -72]].forEach(([x, y]) => star(ctx, x, y, 3.2));
    }
  }

  function star(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? r : r * 0.45;
      ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawSaddle(ctx, s) {
    if (!s) return;
    const c = s.c, d = s.c2 || shade(s.c, -0.3);
    // sadelblad
    ctx.beginPath();
    ctx.moveTo(-20, -108);
    ctx.quadraticCurveTo(-26, -92, -20, -76);
    ctx.quadraticCurveTo(-4, -70, 14, -72);
    ctx.quadraticCurveTo(22, -88, 18, -108);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, -108, 0, -70);
    g.addColorStop(0, shade(c, 0.18)); g.addColorStop(1, shade(c, -0.12));
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = d;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    // knäkudde
    ctx.beginPath();
    ctx.moveTo(4, -100);
    ctx.quadraticCurveTo(9, -88, 4, -76);
    ctx.strokeStyle = shade(c, -0.25);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    // sits
    ctx.beginPath();
    ctx.moveTo(-26, -108);
    ctx.quadraticCurveTo(-12, -101, 0, -105);
    ctx.quadraticCurveTo(12, -112, 22, -110);
    ctx.lineTo(24, -113);
    ctx.quadraticCurveTo(10, -117, 0, -110);
    ctx.quadraticCurveTo(-14, -106, -28, -113);
    ctx.closePath();
    ctx.fillStyle = shade(c, 0.1);
    ctx.fill();
    ctx.strokeStyle = d;
    ctx.stroke();
    if (s.gold) { ell(ctx, -2, -96, 2.2, 2.2, 0, "#ffe066"); ell(ctx, 10, -92, 1.6, 1.6, 0, "#ffe066"); }
    // sadelgjord
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 4.4;
    ctx.beginPath();
    ctx.moveTo(-2, -72);
    ctx.lineTo(0, -52);
    ctx.stroke();
  }

  function drawStirrupLeather(ctx, foot) {
    ctx.strokeStyle = "#3b2a1c";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-3, -104);
    ctx.lineTo(foot[0] + 1, foot[1] - 3);
    ctx.stroke();
  }

  /* ---------- ryttaren ---------- */

  function drawRider(ctx, r, st) {
    // st: {lean, lift, hand:[x,y], t, flow}
    const sc = 0.96;
    const cl = r.cloth;
    const skin = r.skin, skinSh = shade(skin, -0.18);
    const L = st.lean;
    const H = [-8, -112 - st.lift];
    const torso = 36 * sc;
    const S = [H[0] + Math.sin(L) * torso, H[1] - Math.cos(L) * torso];
    const headA = L * 0.45;
    const C = [S[0] + Math.sin(headA) * 17 + 2, S[1] - Math.cos(headA) * 17 - 1];
    const stir = [9 + st.lift * 0.2 - L * 3, -61 + st.lift * 0.3];
    const knee = ik(H, stir, 29 * sc, 31 * sc, 1);
    const hand = st.hand;
    const arm = ik(S, hand, 17 * sc, 17 * sc, -1);

    // stigbygel
    drawStirrupLeather(ctx, stir);

    // lår (ridbyxa)
    const br = cl.breeches.c;
    limb(ctx, [[H[0] - 1, H[1] + 3], knee.j], [20.4 * sc, 13.4 * sc], shade(br, -0.17), 6);
    limb(ctx, [[H[0] - 1, H[1] + 3], knee.j], [19 * sc, 12 * sc], br, 6);
    limb(ctx, [[H[0] + 1, H[1] + 6], knee.j], [8, 4], shade(br, -0.1), 4);
    // stövel
    const bc = cl.boots.c;
    const bt = [lerp(knee.j[0], stir[0], 0.2), lerp(knee.j[1], stir[1], 0.2)];
    const ba = [stir[0], stir[1] - 3];
    tube(ctx, bt, ba, 10.8 * sc, 8 * sc, bc);
    // skaftkant
    tube(ctx, bt, [bt[0] + (ba[0] - bt[0]) * 0.1, bt[1] + (ba[1] - bt[1]) * 0.1], 10.8 * sc, 10.4 * sc, shade(bc, -0.3));
    // blänk
    limb(ctx, [[bt[0] - 1.5, bt[1] + 5], [stir[0] - 1.5, stir[1] - 6]], [1.8, 1.4], "rgba(255,255,255,.28)", 3);
    // fot
    poly(ctx, [
      [stir[0] - 4, stir[1] - 7], [stir[0] + 2, stir[1] - 8.5], [stir[0] + 12.5, stir[1] - 2],
      [stir[0] + 13, stir[1] + 1.5], [stir[0] - 3, stir[1] + 1.6],
    ], bc);
    if (cl.boots.glitter) {
      ctx.fillStyle = "#fff";
      [[stir[0] + 6, stir[1] - 3, 1.2], [stir[0] - 1, bt[1] + 12, 1.2], [stir[0] + 1, stir[1] - 10, 1]].forEach(([x, y, q]) => ell(ctx, x, y, q, q, 0, "#fff"));
    }
    // stigbygeln
    ctx.strokeStyle = "#cfd5dc";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(stir[0] + 3, stir[1] + 2);
    ctx.lineTo(stir[0] + 12, stir[1] + 2.3);
    ctx.stroke();

    // bål (jacka)
    const jc = cl.jacket.c;
    const mid = [(H[0] + S[0]) / 2 + Math.cos(L) * 0.5, (H[1] + S[1]) / 2];
    limb(ctx, [H, mid, S], [17 * sc, 18.5 * sc, 16 * sc], jc, 6);
    // jackskört
    poly(ctx, [[H[0] - 9, H[1] - 5], [H[0] + 9, H[1] - 4], [H[0] + 12, H[1] + 6], [H[0] - 12, H[1] + 7]], shade(jc, -0.06));
    // revär/skuggning på bålen
    limb(ctx, [[H[0] - 4, H[1] - 4], [mid[0] - 4, mid[1]], [S[0] - 3, S[1] + 2]], [4, 5, 4], shade(jc, -0.16), 4);
    if (cl.jacket.stripe) limb(ctx, [[H[0], H[1] - 3], [mid[0], mid[1]], [S[0], S[1] + 3]], [3, 3, 3], cl.jacket.stripe, 4);
    if (cl.jacket.tweed) {
      ctx.fillStyle = shade(jc, -0.22);
      for (let i = 0; i < 9; i++) ell(ctx, mid[0] - 4 + (i % 3) * 4, mid[1] - 8 + Math.floor(i / 3) * 7, 1.1, 1.1, 0, shade(jc, -0.25));
    }
    // knappar
    for (let i = 0; i < 3; i++) {
      const f = 0.25 + i * 0.25;
      ell(ctx, lerp(H[0], S[0], f) + 4, lerp(H[1], S[1], f), 1.2, 1.2, 0, "#f4d36b");
    }
    // vit kravatt
    const nk = [S[0] + 1.5, S[1] - 1.5];
    ell(ctx, nk[0], nk[1], 5.8, 4.8, 0, "#fbfbff");
    ell(ctx, nk[0] + 1, nk[1] + 3.5, 2.6, 2.1, 0, shade("#fbfbff", -0.12));

    // huvud
    ell(ctx, C[0] - 0.5, C[1] + 6, 4, 4.6, 0, skinSh);
    // hår bakom (hästsvans etc.)
    drawRiderHair(ctx, r, C, headA, st, true);
    ell(ctx, C[0], C[1], 9.2, 9.8, 0, skin);
    // ansikte
    ell(ctx, C[0] + 6.4, C[1] + 1.2, 1.5, 2, 0, skinSh);
    ell(ctx, C[0] + 5.2, C[1] - 1.4, 1.55, 1.9, 0, "#1d1410");
    ell(ctx, C[0] + 5.7, C[1] - 2, 0.6, 0.6, 0, "#fff");
    ell(ctx, C[0] + 3.8, C[1] + 3.2, 2.6, 1.6, 0, "rgba(255,120,120,.35)");
    ctx.strokeStyle = "#8a3a30";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(C[0] + 5.2, C[1] + 4, 2, 0.15, 1.15);
    ctx.stroke();
    drawRiderHair(ctx, r, C, headA, st, false);
    drawHelmet(ctx, r.cloth.helmet, C, headA, st);

    // arm
    const sl = cl.jacket.sleeve || jc;
    limb(ctx, [S, arm.j, arm.e], [10.5, 8.6, 7.4], sl, 6);
    limb(ctx, [S, arm.j], [4, 3], shade(sl, -0.18), 4);
    ell(ctx, arm.e[0] + 0.5, arm.e[1] + 0.5, 4.2, 3.8, 0.3, cl.gloves ? cl.gloves : "#fafafa");
    return { hand: arm.e, S, H, C, knee: knee.j, stir };
  }

  function drawRiderHair(ctx, r, C, headA, st, back) {
    const hc = r.hair, hs = shade(hc, -0.3);
    const style = r.hairStyle;
    const t = st.t || 0;
    if (back) {
      if (style === "ponytail" || style === "braid") {
        const wob = Math.sin(t * 8) * 3 + (st.flow || 0) * 8;
        const a = [C[0] - 7, C[1] - 2];
        ctx.beginPath();
        ctx.moveTo(a[0], a[1] - 3);
        ctx.bezierCurveTo(a[0] - 16 - wob, a[1] - 6, a[0] - 22 - wob, a[1] + 10 + wob * 0.3, a[0] - 17 - wob * 1.4, a[1] + 20);
        ctx.bezierCurveTo(a[0] - 11, a[1] + 11, a[0] - 8, a[1] + 6, a[0] + 1, a[1] + 3);
        ctx.closePath();
        ctx.fillStyle = hc;
        ctx.fill();
        if (style === "braid") {
          for (let i = 0; i < 4; i++) ell(ctx, a[0] - 9 - wob * 0.4 - i * 2, a[1] + 4 + i * 4.5, 2.6, 2.1, 0.6, i % 2 ? hs : hc);
        }
        ell(ctx, a[0] - 1, a[1], 2.4, 2.4, 0, "#ff6b9d");
      } else if (style === "long") {
        const wob = Math.sin(t * 7) * 2 + (st.flow || 0) * 8;
        ctx.beginPath();
        ctx.moveTo(C[0] + 2, C[1] - 6);
        ctx.bezierCurveTo(C[0] - 14, C[1] - 8, C[0] - 20 - wob, C[1] + 8, C[0] - 18 - wob * 1.5, C[1] + 24);
        ctx.bezierCurveTo(C[0] - 8, C[1] + 18, C[0] - 4, C[1] + 14, C[0] + 2, C[1] + 8);
        ctx.closePath();
        ctx.fillStyle = hc;
        ctx.fill();
      }
    } else {
      // lugg under hjälmen
      ctx.beginPath();
      ctx.moveTo(C[0] - 8, C[1] - 1);
      ctx.quadraticCurveTo(C[0] - 1, C[1] - 7, C[0] + 6.5, C[1] - 5);
      ctx.quadraticCurveTo(C[0] + 1, C[1] - 2, C[0] - 8, C[1] + 3);
      ctx.closePath();
      ctx.fillStyle = hc;
      ctx.fill();
      if (style === "short") ell(ctx, C[0] - 6.5, C[1] + 2.5, 3.2, 4, 0, hc);
    }
  }

  function drawHelmet(ctx, h, C, headA, st) {
    ctx.save();
    ctx.translate(C[0], C[1] - 1.2);
    ctx.rotate(headA * 0.6);
    const c = h.c;
    // kalott
    ctx.beginPath();
    ctx.moveTo(-10.4, 2.4);
    ctx.bezierCurveTo(-11.4, -10, -2, -13.8, 3.8, -13.4);
    ctx.bezierCurveTo(10, -12.6, 11.8, -6, 11.4, 1.4);
    ctx.lineTo(-10.4, 2.4);
    ctx.closePath();
    let fill = c;
    if (h.gold) {
      const g = ctx.createLinearGradient(-10, -13, 10, 3);
      g.addColorStop(0, "#fff3b0"); g.addColorStop(0.5, "#f4b720"); g.addColorStop(1, "#b97a07");
      fill = g;
    } else {
      const g = ctx.createLinearGradient(-8, -14, 8, 3);
      g.addColorStop(0, shade(c, 0.28)); g.addColorStop(0.45, c); g.addColorStop(1, shade(c, -0.25));
      fill = g;
    }
    ctx.fillStyle = fill;
    ctx.fill();
    // kant
    ctx.beginPath();
    ctx.moveTo(-10.8, 1.8);
    ctx.lineTo(11.8, 0.8);
    ctx.lineTo(11.6, 3.2);
    ctx.lineTo(-10.6, 4.2);
    ctx.closePath();
    ctx.fillStyle = h.c2 || shade(c, -0.35);
    ctx.fill();
    // skärm
    ctx.beginPath();
    ctx.moveTo(8, 1.2);
    ctx.quadraticCurveTo(16.5, 0.6, 16.8, 3.8);
    ctx.quadraticCurveTo(12, 3.8, 8, 3.2);
    ctx.closePath();
    ctx.fillStyle = shade(c, -0.3);
    ctx.fill();
    // ränder / sammet
    if (h.stripe) {
      ctx.beginPath();
      ctx.moveTo(-3.2, -13.4);
      ctx.bezierCurveTo(-3, -6, -2.6, -2, -2.8, 1.6);
      ctx.lineTo(1.2, 1.6);
      ctx.bezierCurveTo(1.4, -3, 1.4, -8, 1.4, -13.4);
      ctx.closePath();
      ctx.fillStyle = h.stripe;
      ctx.fill();
    }
    if (h.velvet) {
      ctx.strokeStyle = "rgba(255,255,255,.14)";
      ctx.lineWidth = 1;
      for (let i = -8; i < 11; i += 3.4) { ctx.beginPath(); ctx.moveTo(i, 1); ctx.quadraticCurveTo(i * 0.9, -7, i * 0.6 + 3, -12); ctx.stroke(); }
    } else {
      // blänk
      ctx.beginPath();
      ctx.ellipse(-2.4, -8.8, 5, 2, -0.5, 0, TAU);
      ctx.fillStyle = "rgba(255,255,255,.35)";
      ctx.fill();
    }
    if (h.glitter) {
      const t = st.t || 0;
      [[-6, -4], [-1, -9], [5, -6], [1, -2], [8, -1], [-8, 0]].forEach(([x, y], i) => {
        const a = 0.5 + 0.5 * Math.sin(t * 6 + i * 1.7);
        ctx.fillStyle = `rgba(255,255,255,${0.4 + a * 0.6})`;
        star(ctx, x, y, 1.4 + a * 0.8);
      });
    }
    // hakrem
    ctx.strokeStyle = "#2b2b2b";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(5, 3.6);
    ctx.quadraticCurveTo(5.4, 9, 0.5, 11.5);
    ctx.stroke();
    ctx.restore();
  }

  /* ---------- hela hästen ---------- */

  /**
   * o: { x, y (mark), scale, t, mode: 'stand'|'walk'|'trot'|'canter'|'gallop', phase, dir (1/-1),
   *      air (0..1), u (-1..1 genom hoppet), headDown (0..1), lookUp, blink, ear, mouth,
   *      tack: { saddle, pad, bridle, wraps, rosette, mane }, rider: {..} eller null,
   *      halter, coat, stableMode, flow, tossHead }
   */
  function drawHorse(ctx, o) {
    const coat = o.coat || COAT;
    const t = o.t || 0;
    const mode = o.mode || "stand";
    const g = GAITS[mode] || GAITS.stand;
    const tack = o.tack || {};
    const air = o.air || 0;
    const u = o.u || 0;
    const phase = o.phase || 0;
    const flow = o.flow || 0; // 0..1 hur mycket manen/svansen flyter bakåt (fart)
    const moving = mode !== "stand";

    ctx.save();
    ctx.translate(o.x, o.y);
    if (o.dir === -1) ctx.scale(-1, 1);
    ctx.scale(o.scale || 1, o.scale || 1);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // kroppsrörelse
    const cyc = phase * TAU;
    let bob = 0, pitch = 0;
    if (moving && !air) {
      const k = mode === "gallop" ? 4.2 : mode === "canter" ? 3.6 : mode === "trot" ? 2.4 : 1.2;
      bob = -Math.abs(Math.sin(cyc * (mode === "trot" ? 1 : 0.5) + 0.4)) * k;
      pitch = Math.sin(cyc + 0.5) * (mode === "gallop" ? 0.035 : mode === "canter" ? 0.03 : 0.012);
    }
    if (air) pitch = clamp(u * 0.34, -0.32, 0.32) * Math.min(1, air * 1.5);
    const breathe = !moving ? Math.sin(t * 1.6) * 0.8 : 0;

    // skugga (utan rotation)
    if (!o.noShadow) {
      const sh = o.shadowAlpha == null ? 0.22 : o.shadowAlpha;
      const lifted = o.lift || 0;
      ctx.save();
      ctx.translate(0, lifted);
      ctx.scale(1, 0.14);
      const sr = 82 * (1 - clamp(lifted / 220, 0, 0.5));
      ctx.beginPath();
      ctx.arc(2, 0, sr, 0, TAU);
      ctx.fillStyle = `rgba(30,50,20,${sh * (1 - clamp(lifted / 300, 0, 0.6))})`;
      ctx.fill();
      ctx.restore();
    }

    ctx.translate(0, bob);
    if (air) ctx.translate(0, 38 * (1 - smooth(0.78, 1, Math.abs(u))));
    // pivot för pitch ungefär vid tyngdpunkten
    ctx.translate(0, -80);
    ctx.rotate(pitch);
    ctx.translate(0, 80);

    // benpositioner
    const tuckK = air ? 1 - smooth(0.78, 1, Math.abs(u)) : 0;
    const hindCx = HIP[0] + (g.A ? 8 : 0);
    const farHindT = legPath(g, phase + g.off[0], hindCx);
    const nearHindT = legPath(g, phase + g.off[1], hindCx);
    const farForeT = legPath(g, phase + g.off[2], SHOULDER[0]);
    const nearForeT = legPath(g, phase + g.off[3], SHOULDER[0]);
    const place = (base, tuck, hip, fore) => {
      const k = tuckK;
      if (!k) return base;
      return [lerp(base[0], hip[0] + tuck[0], k), lerp(base[1], hip[1] + tuck[1], k)];
    };
    const sh = SHOULDER, hp = HIP;
    const stretchX = u < 0 ? 0 : 0;
    const ftN = place(nearForeT, [18 + stretchX, 26], sh, true);
    const ftF = place(farForeT, [26, 20], sh, true);
    const htN = place(nearHindT, [-24 - u * 14, 32 - u * 6], hp, false);
    const htF = place(farHindT, [-34 - u * 14, 26 - u * 6], hp, false);

    const darker = shade(coat.base, -0.2);
    const legCol = (far) => (far ? shade(coat.lo, -0.05) : coat.lo);
    const wrapSet = tack.wraps || null;
    const stand = o.stableMode;
    const sockOn = (idx) => (idx === 3 || idx === 0) && !wrapSet;

    // 1. bortre ben
    drawLeg(ctx, hp, htF, false, { col: shade(coat.base, -0.32), lo: shade(coat.lo, -0.3), hoof: shade(coat.hoof, -0.2), wrap: wrapSet && { c: shade(wrapSet.c, -0.25), c2: wrapSet.c2 && shade(wrapSet.c2, -0.25) } });
    drawLeg(ctx, sh, ftF, true, { col: shade(coat.base, -0.32), lo: shade(coat.lo, -0.3), hoof: shade(coat.hoof, -0.2), wrap: wrapSet && { c: shade(wrapSet.c, -0.25), c2: wrapSet.c2 && shade(wrapSet.c2, -0.25) } });

    // 2. svans
    drawTail(ctx, t, o.coat ? { coat } : { coat }, flow, air ? 1 : 0);

    // 3. kropp
    bodyPath(ctx);
    const bg = ctx.createLinearGradient(0, -118, 0, -48);
    bg.addColorStop(0, coat.hi);
    bg.addColorStop(0.28, coat.base);
    bg.addColorStop(0.8, shade(coat.base, -0.18));
    bg.addColorStop(1, coat.lo);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.save();
    bodyPath(ctx);
    ctx.clip();
    // buk
    ell(ctx, -4, -48, 50, 11, 0, "rgba(40,18,6,.28)");
    // bakdelsmuskel & bog
    ell(ctx, -44, -80, 24, 28, 0.2, "rgba(255,200,150,.10)");
    ell(ctx, -40, -66, 20, 12, 0.5, "rgba(40,18,6,.14)");
    ell(ctx, 46, -78, 17, 22, -0.1, "rgba(40,18,6,.12)");
    // glans
    const shine = clamp(o.shine == null ? 0.4 : o.shine, 0, 1);
    const sa = 0.12 + shine * 0.5;
    const hg = ctx.createLinearGradient(-60, -112, 40, -92);
    hg.addColorStop(0, `rgba(255,236,210,${sa})`);
    hg.addColorStop(0.5, `rgba(255,236,210,${sa * 0.2})`);
    hg.addColorStop(1, `rgba(255,236,210,${sa * 0.7})`);
    ell(ctx, -26, -104, 52, 5, -0.04, hg);
    ell(ctx, -46, -95, 17, 8, 0.7, `rgba(255,240,220,${sa * 0.9})`);
    ell(ctx, 26, -104, 14, 4, -0.1, `rgba(255,240,220,${sa * 0.8})`);
    if (shine > 0.75) {
      ctx.fillStyle = `rgba(255,255,255,${(shine - 0.75) * 1.6})`;
      ell(ctx, -48, -99, 5, 2, 0.6, ctx.fillStyle);
    }
    // bukdetalj
    ctx.restore();

    // 4. hals
    const pollBase = [84, -168];
    const headDown = o.headDown || 0;
    const stretch = air ? 0.6 + 0.4 * Math.sin(Math.PI * (u + 1) / 2) : 0;
    const gal = mode === "gallop" ? 1 : mode === "canter" ? 0.7 : 0;
    let poll = [pollBase[0] + stretch * 8 + gal * 4 + Math.sin(cyc + 1.2) * (moving ? 2.2 : 0),
      pollBase[1] + stretch * 12 + headDown * 92 + gal * 4 + breathe * 0.3 + Math.cos(cyc + 1.2) * (moving ? 1.6 : 0) - (o.lookUp || 0) * 8];
    poll[0] += headDown * 12;
    const toss = o.toss || 0;
    poll[1] -= toss * 10;
    const headAng = 0.95 + stretch * 0.25 - gal * 0.12 + headDown * 0.55 - toss * 0.45 - (o.lookUp || 0) * 0.15;

    neckPath(ctx, poll);
    const ng = ctx.createLinearGradient(0, -170, 0, -90);
    ng.addColorStop(0, coat.hi); ng.addColorStop(0.35, coat.base); ng.addColorStop(1, shade(coat.base, -0.18));
    ctx.fillStyle = ng;
    ctx.fill();
    ctx.save();
    neckPath(ctx, poll);
    ctx.clip();
    ell(ctx, 66, -112, 22, 16, 0.8, "rgba(40,18,6,.15)");
    ell(ctx, 56, -136, 16, 5, -0.9, `rgba(255,236,210,${0.1 + shine * 0.4})`);
    ctx.restore();

    // 5. hovar/ben (nära) ritas före sadel
    const wrapN = wrapSet ? { c: wrapSet.c, c2: wrapSet.c2 } : null;
    drawLeg(ctx, hp, htN, false, { col: coat.base, lo: coat.lo, hoof: coat.hoof, wrap: wrapN });
    drawLeg(ctx, sh, ftN, true, { col: coat.base, lo: coat.lo, hoof: coat.hoof, wrap: wrapN, sock: !wrapSet && o.sock !== false });

    // 6. man
    drawMane(ctx, poll, t, { coat, mane: tack.mane }, flow);

    // 7. huvud (bakom ryttare)
    const showSaddle = !stand && !o.bare;
    drawHead(ctx, poll, headAng, {
      coat, blaze: o.blaze !== false, blink: o.blink, ear: o.ear, mouth: o.mouth,
      bridle: showSaddle ? tack.bridle : (stand ? { c: o.halterColor || "#2f8fe0" } : null),
      halter: stand ? true : null,
    });
    if (stand) { /* grimma ritad via drawHead.bridle */ }
    drawForelock(ctx, poll, headAng, t, { coat });

    // 8. schabrak & sadel
    let riderInfo = null;
    if (showSaddle) {
      drawPad(ctx, tack.pad);
      drawSaddle(ctx, tack.saddle);
    }

    // 9. rosett på träns
    if (showSaddle && tack.rosette) {
      ctx.save();
      ctx.translate(poll[0], poll[1]);
      ctx.rotate(headAng);
      drawRosetteOnHead(ctx, tack.rosette);
      ctx.restore();
    }

    // 10. ryttare och tyglar
    if (o.rider && showSaddle) {
      const lean = o.riderLean != null ? o.riderLean : (air ? 0.18 + 0.7 * Math.sin(Math.PI * (u + 1) / 2) : mode === "gallop" ? 0.34 : mode === "canter" ? 0.24 : 0.1);
      const lift = air ? 7 * Math.sin(Math.PI * (u + 1) / 2) : (mode === "gallop" ? 4 : mode === "canter" ? 2 : 0) * (0.6 + 0.4 * Math.sin(cyc));
      const handBase = [56 + headDown * 8 + stretch * 6, -139 + headDown * 24 + stretch * 8 + toss * -4];
      const hand = [lerp(handBase[0], 52, 0), handBase[1]];
      const sway = Math.sin(cyc * (mode === "trot" ? 1 : 0.5)) * (moving ? 1.8 : 0);
      riderInfo = drawRider(ctx, o.rider, { lean, lift: lift + sway * 0.4, hand: [hand[0] - 14 + lean * 14, hand[1] + 24 + lean * 4], t, flow });
      // tyglar till bettet
      const bit = [poll[0] + Math.cos(headAng) * 37.5 - Math.sin(headAng) * 14.8,
        poll[1] + Math.sin(headAng) * 37.5 + Math.cos(headAng) * 14.8];
      ctx.strokeStyle = tack.bridle ? shade(tack.bridle.c, -0.15) : "#3b2a1c";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(riderInfo.hand[0], riderInfo.hand[1]);
      ctx.quadraticCurveTo((riderInfo.hand[0] + bit[0]) / 2, (riderInfo.hand[1] + bit[1]) / 2 + 8, bit[0], bit[1]);
      ctx.stroke();
    }
    ctx.restore();
    return riderInfo;
  }

  /* ---------- fristående ryttare (omklädningsrummet) ---------- */
  function drawStandingRider(ctx, o) {
    // enkel stående ryttare, används på ikoner/förhandsvisning
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.scale(o.scale || 1, o.scale || 1);
    const r = o.rider, cl = r.cloth, skin = r.skin;
    const sc = 1.1;
    // ben
    const legC = cl.breeches.c;
    limb(ctx, [[-6, -52 * sc], [-7, -28 * sc], [-7, -8]], [12, 10, 9], cl.boots.c, 5);
    limb(ctx, [[-4, -64 * sc], [-6, -40 * sc]], [14, 11], legC, 4);
    limb(ctx, [[6, -52 * sc], [7, -28 * sc], [7, -8]], [12, 10, 9], cl.boots.c, 5);
    limb(ctx, [[5, -64 * sc], [6, -40 * sc]], [14, 11], legC, 4);
    poly(ctx, [[-12, -3], [-6, -8], [-2, -3], [-2, 1], [-12, 1]], cl.boots.c);
    poly(ctx, [[1, -3], [7, -8], [11, -3], [11, 1], [1, 1]], cl.boots.c);
    // bål
    limb(ctx, [[0, -66 * sc], [0, -82 * sc], [0, -94 * sc]], [24, 26, 22], cl.jacket.c, 5);
    limb(ctx, [[-10, -92 * sc], [-14, -76 * sc], [-12, -62 * sc]], [8, 7, 7], cl.jacket.sleeve || cl.jacket.c, 4);
    limb(ctx, [[10, -92 * sc], [14, -76 * sc], [12, -62 * sc]], [8, 7, 7], cl.jacket.sleeve || cl.jacket.c, 4);
    ell(ctx, -12, -60 * sc, 3.6, 3.6, 0, "#fafafa");
    ell(ctx, 12, -60 * sc, 3.6, 3.6, 0, "#fafafa");
    ell(ctx, 0, -95 * sc, 6, 5, 0, "#fbfbff");
    // huvud
    ell(ctx, 0, -106 * sc, 9.2, 9.8, 0, skin);
    ell(ctx, 3.4, -106 * sc, 1.5, 1.9, 0, "#1d1410");
    ell(ctx, -3.4, -106 * sc, 1.5, 1.9, 0, "#1d1410");
    ctx.restore();
  }

  return { tube, softEll, drawHorse, drawStandingRider, drawRosette, drawBow, drawRider, GAITS, COAT, clamp, lerp, smooth, mix, shade, ell, poly, limb, star, TAU, spline, rot, norm };
})();
