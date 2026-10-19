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
    // själva kroppen som en sluten figur, ändarna som egna cirklar (annars kan fyllningen få hål)
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(L[0][0], L[0][1]);
    for (let i = 1; i < L.length; i++) ctx.lineTo(L[i][0], L[i][1]);
    for (let i = R.length - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
    ctx.closePath();
    ctx.fill();
    const e = c[c.length - 1], we = ws[ws.length - 1] / 2;
    ctx.beginPath(); ctx.arc(e[0], e[1], we, 0, TAU); ctx.fill();
    const s0 = c[0], ws0 = ws[0] / 2;
    ctx.beginPath(); ctx.arc(s0[0], s0[1], ws0, 0, TAU); ctx.fill();
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

  /** Ellips med mjuk kant (smälter in i underlaget). col = "#hex" eller "rgba(r,g,b,a)". */
  function softEll(ctx, x, y, rx, ry, rot, col) {
    let c0, c1, c2;
    if (col[0] === "#") { c0 = rgba(col, 0.95); c1 = rgba(col, 0.8); c2 = rgba(col, 0); }
    else {
      const m = col.match(/[\d.]+/g);
      const a = m[3] !== undefined ? +m[3] : 1;
      c0 = `rgba(${m[0]},${m[1]},${m[2]},${a})`; c1 = `rgba(${m[0]},${m[1]},${m[2]},${a * 0.85})`; c2 = `rgba(${m[0]},${m[1]},${m[2]},0)`;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.scale(rx, ry);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, c0);
    g.addColorStop(0.55, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  /** Sluten, mjuk kurva genom punkter (Catmull-Rom -> bezier). */
  function closedPath(ctx, pts) {
    const n = pts.length;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      if (i === 0) ctx.moveTo(p1[0], p1[1]);
      ctx.bezierCurveTo(
        p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
        p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6,
        p2[0], p2[1]);
    }
    ctx.closePath();
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
  /* Pälsfärger: base/hi/lo = kroppens ljus och skugga, legLow = mörka "points" nedanför knä och hasled. */
  const COATS = {
    bay: { name: "Brun", base: "#9a5429", hi: "#cf9158", lo: "#5a2e15", legLow: "#3a2012", mane: "#24160f", maneHi: "#4a3022", hoof: "#2b2019", muzzle: "#4a3328", blaze: true, sock: true, eye: "#1a100a" },
    chestnut: { name: "Fux", base: "#b8652b", hi: "#e8a468", lo: "#74381a", legLow: "#a05a2a", mane: "#e0b070", maneHi: "#f4d9a0", hoof: "#6b4a32", muzzle: "#7a5640", blaze: true, sock: true, eye: "#1a100a" },
    grey: { name: "Skimmel", base: "#cfd4da", hi: "#f6f8fa", lo: "#8a919c", legLow: "#a5acb6", mane: "#b4bac4", maneHi: "#e3e7ec", hoof: "#4d4d52", muzzle: "#7f858e", blaze: false, sock: false, dapple: true, eye: "#1a100a" },
    black: { name: "Svart", base: "#35302f", hi: "#5a5352", lo: "#141011", legLow: "#1a1516", mane: "#0d0a0a", maneHi: "#2a2322", hoof: "#1a1515", muzzle: "#3b3335", blaze: true, sock: false, eye: "#0c0806" },
    palomino: { name: "Isabell", base: "#e2b261", hi: "#f8dc9c", lo: "#a67a2c", legLow: "#d6a24f", mane: "#f6eed8", maneHi: "#fffaf0", hoof: "#6b5a46", muzzle: "#a88a6c", blaze: true, sock: true, eye: "#2a160c" },
  };
  const COAT = Object.assign({ white: "#fbf6ee" }, COATS.bay);

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
    const back = [-dir[1], dir[0]]; // skenbenets baksida (senorna)
    const ws = front ? [17, 11.5, 7.4, 8] : [24, 14, 7.8, 8];
    limb(ctx, [hip, j, e, tip], ws, col, 7);
    // muskel överst på benet (underarm / lår)
    const m = lerp2(hip, j, front ? 0.4 : 0.34);
    const ma = Math.atan2(j[1] - hip[1], j[0] - hip[0]) - Math.PI / 2;
    softEll(ctx, m[0], m[1], front ? 9.5 : 14, front ? 13 : 19, ma, o.mus || col);
    softEll(ctx, m[0] + back[0] * 3, m[1] + back[1] * 3, front ? 5 : 8, front ? 10 : 14, ma, "rgba(40,16,4,.16)");
    // mörka points nedanför knä/hasled
    if (o.low) {
      const a = lerp2(j, e, 0.03);
      limb(ctx, [a, e, tip], [front ? 7.8 : 8.4, 7.2, 7.8], o.low, 6);
      softEll(ctx, a[0], a[1], 6.5, 5, 0, o.low);
    }
    // led (knä/hasled) med lätt kant
    ell(ctx, j[0], j[1], front ? 4.4 : 5, front ? 4.4 : 5, 0, "rgba(50,20,5,.12)");
    ell(ctx, j[0] - back[0] * 1.2, j[1] - back[1] * 1.2, front ? 2.4 : 2.8, front ? 3 : 3.4, 0, "rgba(255,240,220,.16)");
    // senor på baksidan av skenbenet
    const t0 = lerp2(j, e, 0.16), t1 = lerp2(j, e, 0.86);
    ctx.strokeStyle = "rgba(0,0,0,.2)"; ctx.lineWidth = 1.1; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(t0[0] + back[0] * 2.4, t0[1] + back[1] * 2.4); ctx.lineTo(t1[0] + back[0] * 2.6, t1[1] + back[1] * 2.6); ctx.stroke();
    if (o.sock) {
      const a = [lerp(j[0], e[0], 0.45), lerp(j[1], e[1], 0.45)];
      limb(ctx, [a, e, tip], [6.8, 6.8, 7.6], COAT.white, 5);
      softEll(ctx, a[0], a[1], 4.2, 3.6, 0, COAT.white);
    }
    if (o.wrap) {
      const a = [lerp(j[0], e[0], 0.12), lerp(j[1], e[1], 0.12)];
      const b = [lerp(j[0], e[0], 0.92), lerp(j[1], e[1], 0.92)];
      limb(ctx, [a, b], [8.8, 9.2], o.wrap.c, 3);
      if (o.wrap.c2) {
        const mm = [lerp(a[0], b[0], 0.5), lerp(a[1], b[1], 0.5)];
        limb(ctx, [lerp2(a, mm, 0.2), lerp2(mm, b, 0.3)], [9.4, 9.4], o.wrap.c2, 2);
      }
      limb(ctx, [a, lerp2(a, b, 0.14)], [10, 10], shade(o.wrap.c, -0.25), 2);
      ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(a[0] - back[0] * 2.4, a[1] - back[1] * 2.4); ctx.lineTo(b[0] - back[0] * 2.4, b[1] - back[1] * 2.4); ctx.stroke();
    }
    // koronarand, hov med glans
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
    poly(ctx, [
      [h0[0] - side[0] * hw * 0.55, h0[1] - side[1] * hw * 0.55],
      [h1[0] - side[0] * hw * 0.7, h1[1] - side[1] * hw * 0.7],
      [h1[0] - side[0] * hw * 0.2, h1[1] - side[1] * hw * 0.2],
      [h0[0] - side[0] * hw * 0.1, h0[1] - side[1] * hw * 0.1],
    ], "rgba(255,255,255,.18)");
    limb(ctx, [[e[0] - side[0] * 3.6, e[1] - side[1] * 3.6], [e[0] + side[0] * 3.6, e[1] + side[1] * 3.6]], [2.6, 2.6], "rgba(30,20,12,.35)", 2);
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


  const HEAD_PTS = [[-7, -5], [4, -9.5], [20, -7], [35, -1], [45, 3], [52, 8.5], [52.5, 13], [49, 17], [43, 19.5], [38, 18], [28, 16.5], [17, 22], [6, 26.5], [-3, 22], [-8, 10]];

  function drawHead(ctx, p, ang, o) {
    ctx.save();
    ctx.translate(p[0], p[1]);
    ctx.rotate(ang);
    ctx.scale(1.08, 1.08);
    const c = o.coat;
    // huvudform
    closedPath(ctx, HEAD_PTS);
    const g = ctx.createLinearGradient(0, -9, 0, 26);
    g.addColorStop(0, c.hi); g.addColorStop(0.3, c.base); g.addColorStop(1, shade(c.lo, 0.05));
    ctx.fillStyle = g;
    ctx.fill();
    ctx.save();
    closedPath(ctx, HEAD_PTS);
    ctx.clip();
    // kindben, käke, panna och nosrygg
    softEll(ctx, 13, 16, 13, 9, 0.35, rgba(c.lo, 0.5));
    softEll(ctx, 10, 22, 11, 6, 0.2, rgba(c.lo, 0.4));
    softEll(ctx, 9, -4.5, 9, 3.4, 0.1, rgba(shade(c.hi, 0.18), 0.55));
    ctx.strokeStyle = rgba(shade(c.hi, 0.35), 0.5); ctx.lineWidth = 1.6; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(22, -5.6); ctx.quadraticCurveTo(34, -2.6, 43, 1.6); ctx.stroke();
    if (c.dapple) for (let i = 0; i < 7; i++) ell(ctx, 4 + i * 6.3, 2 + ((i * 7) % 11), 2.2, 1.7, 0, rgba(c.lo, 0.12));
    // bläs
    if (o.blaze) {
      closedPath(ctx, [[6, -9.5], [20, -7.8], [36, -1.6], [46, 2.8], [45, 7.2], [36, 4.8], [22, -0.4], [10, -4.2]]);
      ctx.fillStyle = "rgba(251,246,238,.97)";
      ctx.fill();
    }
    // mule
    closedPath(ctx, [[41, 0.5], [47, 3.4], [52.6, 8.5], [52.8, 13], [49, 17.4], [43, 19.8], [39.6, 14.6], [39.4, 6]]);
    ctx.fillStyle = c.muzzle;
    ctx.fill();
    softEll(ctx, 49, 9.6, 4.6, 6, 0.2, rgba(shade(c.muzzle, 0.22), 0.7));
    softEll(ctx, 44.5, 17.6, 5, 2.4, 0.1, rgba(shade(c.muzzle, 0.18), 0.6));
    ctx.restore();
    // näsborre
    ctx.save(); ctx.translate(46.2, 6.4); ctx.rotate(0.65);
    ctx.fillStyle = "#150b07"; ctx.beginPath(); ctx.ellipse(0, 0, 1.1, 2.6, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.arc(0, 0, 3.2, 3.6, 5.6); ctx.stroke();
    ctx.restore();
    // mun
    ctx.strokeStyle = "#2a1810"; ctx.lineWidth = 1.1; ctx.lineCap = "round";
    const open = o.mouth || 0;
    ctx.beginPath(); ctx.moveTo(52.2, 14.2); ctx.quadraticCurveTo(46, 16.6 + open * 2.5, 40.6, 15.6 + open * 3); ctx.stroke();
    // öga
    const ex = 15.8, ey = 1.6;
    softEll(ctx, ex, ey, 7.2, 5.8, 0.1, rgba(c.lo, 0.55));
    softEll(ctx, ex + 1, ey - 5.2, 6, 2.4, 0.1, rgba(shade(c.hi, 0.12), 0.5));
    if (!o.blink) {
      ell(ctx, ex, ey, 4.2, 3.4, 0.15, "#2b170c");
      ell(ctx, ex + 0.3, ey + 0.5, 2.7, 2.1, 0.15, "#7a4a22");
      ell(ctx, ex + 0.3, ey + 0.3, 1.6, 1.6, 0, "#0f0805");
      ell(ctx, ex - 1.1, ey - 1.1, 1.1, 0.9, 0, "#ffffff");
      ell(ctx, ex + 1.5, ey + 1.2, 0.6, 0.5, 0, "rgba(255,255,255,.55)");
      ctx.strokeStyle = "#1c0f08"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(ex, ey, 4.5, 3.7, 0.15, Math.PI * 1.06, Math.PI * 1.96); ctx.stroke();
      ctx.strokeStyle = "rgba(20,10,6,.35)"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(ex, ey, 4.4, 3.6, 0.15, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke();
    } else {
      ctx.strokeStyle = "#1c0f08"; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(ex - 4.4, ey + 0.4); ctx.quadraticCurveTo(ex, ey + 2.6, ex + 4.4, ey + 0.2); ctx.stroke();
    }
    // öron
    const ea = o.ear || 0;
    for (let i = 0; i < 2; i++) {
      ctx.save();
      ctx.translate(-1 - i * 2.5, -7 + i * 0.4);
      ctx.rotate(-0.55 + ea + i * 0.18);
      ctx.beginPath();
      ctx.moveTo(-3.6, 1);
      ctx.quadraticCurveTo(-2.8, -12, 0.6, -18);
      ctx.quadraticCurveTo(5, -10, 4.4, 1);
      ctx.closePath();
      ctx.fillStyle = i ? shade(c.base, -0.35) : c.base;
      ctx.fill();
      if (!i) {
        ctx.beginPath(); ctx.moveTo(-1.8, 0); ctx.quadraticCurveTo(-1.4, -9, 0.7, -13.5); ctx.quadraticCurveTo(3, -8, 2.6, 0); ctx.closePath();
        ctx.fillStyle = rgba(shade(c.lo, -0.15), 0.8); ctx.fill();
        ctx.strokeStyle = rgba(shade(c.maneHi, 0.1), 0.7); ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(-0.8, -1); ctx.lineTo(0.3, -9); ctx.moveTo(1.2, -1); ctx.lineTo(1.4, -8); ctx.stroke();
      }
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
    line([[26, 16.2], [27, 0.6], [28.4, -0.9]], 2.4, col);
    line([[39, 17.6], [39, 4], [40, 2]], 2.2, col);
    // kindrem + hjässrem
    line([[-1, -6.5], [6, 8], [13, 22]], 1.9, col);
    line([[-1, -6.5], [-4, 8], [-1, 20]], 1.8, col);
    line([[-6, 21], [13, 23]], 1.8, col);
    // pannband
    line([[3.6, -7.6], [16, -9.6]], 2, c2);
    if (b.gem) {
      ell(ctx, 6, -8.6, 2.4, 2.4, 0, b.gem);
      ell(ctx, 11, -9.2, 2.2, 2.2, 0, b.gem);
      ell(ctx, 6.6, -9.2, 0.8, 0.8, 0, "#fff");
    }
    if (!halter) {
      // bett
      ell(ctx, 40.6, 15.8, 3, 3, 0, "#d9dde2");
      ell(ctx, 40.6, 15.8, 1.4, 1.4, 0, "#8f98a3");
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


  function drawBoot(ctx, top, ankle, c, glitter) {
    const d = norm([ankle[0] - top[0], ankle[1] - top[1]]);
    const n = [-d[1], d[0]];
    tube(ctx, top, ankle, 11.6, 8.4, c);
    // skugga baktill, blänk framtill, mörk överkant
    tube(ctx, [top[0] + n[0] * 3.6, top[1] + n[1] * 3.6], [ankle[0] + n[0] * 2.6, ankle[1] + n[1] * 2.6], 3.2, 2.4, shade(c, -0.28));
    tube(ctx, [top[0] - n[0] * 2.8 + d[0] * 5, top[1] - n[1] * 2.8 + d[1] * 5], [ankle[0] - n[0] * 2.2 - d[0] * 4, ankle[1] - n[1] * 2.2 - d[1] * 4], 1.9, 1.4, "rgba(255,255,255,.34)");
    tube(ctx, top, [top[0] + d[0] * 2.6, top[1] + d[1] * 2.6], 12.2, 12, shade(c, -0.4));
    // fot: instegsvängd tå, sula och klack
    ctx.beginPath();
    ctx.moveTo(ankle[0] - 4.6, ankle[1] - 3.6);
    ctx.lineTo(ankle[0] + 3.4, ankle[1] - 6.6);
    ctx.quadraticCurveTo(ankle[0] + 11, ankle[1] - 5, ankle[0] + 14.8, ankle[1] + 0.6);
    ctx.lineTo(ankle[0] + 14.4, ankle[1] + 3);
    ctx.lineTo(ankle[0] - 4.8, ankle[1] + 3);
    ctx.closePath();
    ctx.fillStyle = c; ctx.fill();
    poly(ctx, [[ankle[0] - 4.8, ankle[1] + 2.6], [ankle[0] + 14.4, ankle[1] + 2.6], [ankle[0] + 14.2, ankle[1] + 4.2], [ankle[0] - 4.8, ankle[1] + 4.2]], "#171310");
    poly(ctx, [[ankle[0] - 5.2, ankle[1] + 3], [ankle[0] + 0.8, ankle[1] + 3], [ankle[0] + 0.8, ankle[1] + 5.4], [ankle[0] - 5.2, ankle[1] + 5.4]], "#171310");
    softEll(ctx, ankle[0] + 7, ankle[1] - 2.4, 5, 1.6, -0.15, "rgba(255,255,255,.3)");
    if (glitter) {
      for (let i = 0; i < 7; i++) {
        const q = [top[0] + (ankle[0] - top[0]) * (0.1 + i * 0.12) + ((i % 2) ? 2.4 : -2), top[1] + (ankle[1] - top[1]) * (0.1 + i * 0.12)];
        ell(ctx, q[0], q[1], 1, 1, 0, "rgba(255,255,255,.9)");
      }
    }
  }

  const FACE_PTS = [[6, -5], [8, -2.4], [8.6, 0], [11, 3.6], [9.2, 4.9], [9.4, 6.3], [8.6, 7.3], [9, 8.5], [7.8, 11.2], [3, 12.4], [-3.8, 8.6], [-8, 2], [-8.8, -5], [-4, -11], [2, -10.4]];

  function drawRiderHead(ctx, r, C, headA, st) {
    const skin = r.skin, skinSh = shade(skin, -0.2);
    ctx.save();
    ctx.translate(C[0], C[1]);
    ctx.rotate(headA * 0.5);
    drawRiderHair(ctx, r, st, true);
    // ansikte
    closedPath(ctx, FACE_PTS);
    const g = ctx.createLinearGradient(-8, -6, 10, 10);
    g.addColorStop(0, shade(skin, -0.1)); g.addColorStop(0.55, skin); g.addColorStop(1, shade(skin, 0.06));
    ctx.fillStyle = g; ctx.fill();
    ctx.save(); closedPath(ctx, FACE_PTS); ctx.clip();
    softEll(ctx, 0, 11, 9, 4, 0, "rgba(60,20,10,.22)");
    softEll(ctx, 4, 5, 3.4, 2.6, 0, "rgba(255,110,110,.32)");
    softEll(ctx, 6.5, -3, 4, 2, 0.2, rgba(shade(skin, 0.2), 0.45));
    ctx.restore();
    // öra
    ell(ctx, -2.8, 2.6, 2.3, 3.5, 0.15, skinSh);
    ell(ctx, -2.6, 2.6, 1.2, 2, 0.15, shade(skin, -0.32));
    // ögonbryn, öga, näsa, mun
    ctx.lineCap = "round";
    ctx.strokeStyle = shade(r.hair, -0.1); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(3, -3.1); ctx.quadraticCurveTo(5.4, -4.2, 7.6, -3); ctx.stroke();
    ell(ctx, 5.4, -0.6, 2, 1.5, 0, "#fbfbfb");
    ell(ctx, 6, -0.5, 1.25, 1.25, 0, "#3a2210");
    ell(ctx, 6.1, -0.5, 0.65, 0.65, 0, "#0d0705");
    ell(ctx, 5.7, -1, 0.4, 0.4, 0, "#fff");
    ctx.strokeStyle = "#2a1a10"; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(3.2, -1.2); ctx.quadraticCurveTo(5.6, -2.6, 7.7, -1.2); ctx.stroke();
    ctx.strokeStyle = rgba(shade(skin, -0.38), 0.7); ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(8.8, 4.8); ctx.quadraticCurveTo(7.6, 5.4, 8.4, 4); ctx.stroke();
    ell(ctx, 8.8, 4.3, 0.7, 0.5, 0, rgba(shade(skin, -0.5), 0.8));
    ctx.strokeStyle = "#a8473f"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(8.1, 7.6); ctx.quadraticCurveTo(9.6, 8.4, 9.2, 7.4); ctx.stroke();
    drawRiderHair(ctx, r, st, false);
    drawHelmet(ctx, r.cloth.helmet, st);
    // hakrem
    ctx.strokeStyle = "#1f1f1f"; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(-0.6, -3.2); ctx.quadraticCurveTo(-1.8, 5, 3.6, 11.2); ctx.stroke();
    ell(ctx, 3.8, 11.2, 1.5, 1.1, 0, "#c9ced6");
    ctx.restore();
  }

  function drawRider(ctx, r, st) {
    // st: {lean, lift, hand:[x,y], t, flow}
    const sc = 0.98;
    const cl = r.cloth;
    const skin = r.skin, skinSh = shade(skin, -0.2);
    const L = st.lean;
    const H = [-8, -112 - st.lift];
    const tl = 37 * sc;
    const U = [Math.sin(L), -Math.cos(L)], F = [Math.cos(L), Math.sin(L)];
    const P = (a, b) => [H[0] + U[0] * a + F[0] * b, H[1] + U[1] * a + F[1] * b];
    const S = P(tl, 0);
    const headA = L * 0.4;
    const C = [S[0] + Math.sin(headA) * 11 + 2.4, S[1] - Math.cos(headA) * 11 - 2.5];
    const stir = [9 + st.lift * 0.2 - L * 3, -61 + st.lift * 0.3];
    const knee = ik(H, stir, 29 * sc, 31 * sc, 1);
    const hand = st.hand;
    const shoulderJ = P(tl - 3, 0.5);
    const arm = ik(shoulderJ, hand, 17 * sc, 18 * sc, -1);

    drawStirrupLeather(ctx, stir);

    // lår (ridbyxa) med form, söm och knälapp
    const br = cl.breeches.c;
    const hip = [H[0] - 1, H[1] + 3];
    const td = norm([knee.j[0] - hip[0], knee.j[1] - hip[1]]);
    const tn = [-td[1], td[0]];
    limb(ctx, [hip, knee.j], [23 * sc, 14.6 * sc], shade(br, -0.2), 6);
    limb(ctx, [hip, knee.j], [21.6 * sc, 13.2 * sc], br, 6);
    limb(ctx, [[hip[0] + tn[0] * 3.6, hip[1] + tn[1] * 3.6], [knee.j[0] + tn[0] * 2.8, knee.j[1] + tn[1] * 2.8]], [6, 3.6], shade(br, -0.07), 4);
    limb(ctx, [[hip[0] - tn[0] * 3.8, hip[1] - tn[1] * 3.8], [knee.j[0] - tn[0] * 2.8, knee.j[1] - tn[1] * 2.8]], [4.4, 2.8], shade(br, 0.25), 4);
    softEll(ctx, knee.j[0] - td[0] * 1.5, knee.j[1] - td[1] * 1.5, 5.6, 5, Math.atan2(td[1], td[0]), rgba(shade(br, -0.18), 0.5));
    // stövel
    const bt = [lerp(knee.j[0], stir[0], 0.2), lerp(knee.j[1], stir[1], 0.2)];
    drawBoot(ctx, bt, [stir[0], stir[1] - 3], cl.boots.c, cl.boots.glitter);
    // stigbygel
    ctx.strokeStyle = "#cfd5dc"; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(stir[0] + 3, stir[1] + 2.6); ctx.lineTo(stir[0] + 12, stir[1] + 3); ctx.stroke();

    // jackan
    const jc = cl.jacket.c;
    poly(ctx, [P(4, -9.4), P(-9, -14.5), P(-11, -4), P(0, 3)], shade(jc, -0.16));
    const back = [P(-2, -9.8), P(13, -8.6), P(26, -10), P(tl - 3, -8.8)];
    const front = [P(tl - 2, 6.4), P(26, 11), P(14, 8.4), P(1, 10.2)];
    const jp = back.concat([P(tl + 1, -3), P(tl + 1.5, 2.6)], front);
    closedPath(ctx, jp);
    const jg = ctx.createLinearGradient(H[0] - F[0] * 10, H[1] - F[1] * 10, H[0] + F[0] * 11, H[1] + F[1] * 11);
    jg.addColorStop(0, shade(jc, -0.3)); jg.addColorStop(0.5, jc); jg.addColorStop(1, shade(jc, 0.14));
    ctx.fillStyle = jg; ctx.fill();
    ctx.save(); closedPath(ctx, jp); ctx.clip();
    const m1 = P(18, 5), m2 = P(30, 6), m3 = P(8, -2);
    softEll(ctx, m1[0], m1[1], 6, 12, L, "rgba(0,0,0,.14)");
    softEll(ctx, m2[0], m2[1], 5, 9, L, "rgba(255,255,255,.14)");
    softEll(ctx, m3[0], m3[1], 5, 7, L, "rgba(0,0,0,.1)");
    if (cl.jacket.stripe) limb(ctx, [P(2, 3), P(tl - 4, 3)], [3, 3], cl.jacket.stripe, 3);
    if (cl.jacket.tweed) for (let i = 0; i < 16; i++) { const q = P(3 + (i % 8) * 4.2, -6 + Math.floor(i / 8) * 11); ell(ctx, q[0], q[1], 1.1, 1.1, 0, shade(jc, -0.3)); }
    ctx.restore();
    ctx.strokeStyle = shade(jc, -0.4); ctx.lineWidth = 1.1; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(front[0][0], front[0][1]); ctx.lineTo(front[1][0], front[1][1]); ctx.lineTo(front[2][0], front[2][1]); ctx.lineTo(front[3][0], front[3][1]); ctx.stroke();
    [P(8, 10), P(16, 10.6), P(24, 11)].forEach((q) => { ell(ctx, q[0], q[1], 1.5, 1.5, 0, "#f4d36b"); ell(ctx, q[0] - 0.4, q[1] - 0.4, 0.5, 0.5, 0, "#fff"); });
    // vit krage + kravatt
    const nk = P(tl - 0.5, 3.4);
    ell(ctx, nk[0], nk[1], 6.2, 3.8, L, "#fbfbff");
    ell(ctx, nk[0] + F[0] * 2.4, nk[1] + F[1] * 2.4, 2.8, 2.2, L, shade("#fbfbff", -0.12));

    // hals och huvud
    const nb = [C[0] - 1.5, C[1] + 9];
    limb(ctx, [P(tl - 2, 1), nb], [9, 7], shade(skin, -0.12), 4);
    limb(ctx, [P(tl - 2, 1.4), [nb[0] + 0.6, nb[1]]], [7.4, 5.6], skin, 4);
    drawRiderHead(ctx, r, C, headA, st);

    // arm: ärm, manschett, handske
    const sl = cl.jacket.sleeve || jc;
    limb(ctx, [shoulderJ, arm.j, arm.e], [12.2, 10, 8.4], sl, 6);
    limb(ctx, [[shoulderJ[0], shoulderJ[1] + 3], [arm.j[0], arm.j[1] + 2.6]], [4, 3], rgba(shade(sl, -0.3), 0.45), 4);
    const ad = norm([arm.e[0] - arm.j[0], arm.e[1] - arm.j[1]]);
    tube(ctx, [arm.e[0] - ad[0] * 3.2, arm.e[1] - ad[1] * 3.2], [arm.e[0] - ad[0] * 0.2, arm.e[1] - ad[1] * 0.2], 7.4, 7, "#fbfbff");
    const gcol = cl.gloves || "#f6f6f6";
    const ga = Math.atan2(ad[1], ad[0]);
    ell(ctx, arm.e[0] + ad[0] * 2.2, arm.e[1] + ad[1] * 2.2, 4.8, 3.9, ga, gcol);
    ell(ctx, arm.e[0] + ad[0] * 1.2 - ad[1] * 2.6, arm.e[1] + ad[1] * 1.2 + ad[0] * 2.6, 2.4, 1.6, ga - 0.4, shade(gcol, -0.06));
    ctx.strokeStyle = shade(gcol, -0.25); ctx.lineWidth = 0.8;
    for (let k = 0; k < 3; k++) { const o = (k - 1) * 1.6; ctx.beginPath(); ctx.moveTo(arm.e[0] + ad[0] * 3 - ad[1] * o, arm.e[1] + ad[1] * 3 + ad[0] * o); ctx.lineTo(arm.e[0] + ad[0] * 5.2 - ad[1] * o, arm.e[1] + ad[1] * 5.2 + ad[0] * o); ctx.stroke(); }
    return { hand: arm.e, S, H, C, knee: knee.j, stir };
  }


  function drawRiderHair(ctx, r, st, back) {
    // ritas i huvudets lokala koordinater (origo = huvudets mitt)
    const hc = r.hair, hs = shade(hc, -0.3), hh = shade(hc, 0.28);
    const style = r.hairStyle;
    const t = st.t || 0;
    if (back) {
      const wob = Math.sin(t * 8) * 3 + (st.flow || 0) * 8;
      if (style === "ponytail" || style === "braid") {
        const a = [-8, -4];
        for (let k = 0; k < 2; k++) {
          const o = k * 2.2;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1] - 3 + o);
          ctx.bezierCurveTo(a[0] - 16 - wob, a[1] - 6 + o, a[0] - 22 - wob, a[1] + 10 + wob * 0.3 + o, a[0] - 17 - wob * 1.4 - o, a[1] + 21);
          ctx.bezierCurveTo(a[0] - 11, a[1] + 11, a[0] - 8, a[1] + 6, a[0] + 1, a[1] + 3 + o);
          ctx.closePath();
          ctx.fillStyle = k ? hs : hc;
          ctx.fill();
        }
        ctx.strokeStyle = hh; ctx.lineWidth = 1; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(a[0] - 4, a[1] - 1); ctx.quadraticCurveTo(a[0] - 14 - wob * 0.8, a[1] + 4, a[0] - 14 - wob, a[1] + 14); ctx.stroke();
        if (style === "braid") {
          for (let i = 0; i < 4; i++) ell(ctx, a[0] - 9 - wob * 0.4 - i * 2, a[1] + 4 + i * 4.5, 2.6, 2.1, 0.6, i % 2 ? hs : hc);
        }
        ell(ctx, a[0] - 0.5, a[1], 2.4, 2.4, 0, "#ff6b9d");
      } else if (style === "long") {
        const w2 = Math.sin(t * 7) * 2 + (st.flow || 0) * 8;
        ctx.beginPath();
        ctx.moveTo(-2, -11);
        ctx.bezierCurveTo(-14, -12, -20 - w2, 4, -18 - w2 * 1.5, 22);
        ctx.bezierCurveTo(-8, 18, -4, 14, 0, 8);
        ctx.closePath();
        ctx.fillStyle = hc; ctx.fill();
        ctx.strokeStyle = hh; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-6, -8); ctx.quadraticCurveTo(-15 - w2, 4, -14 - w2, 16); ctx.stroke();
      } else if (style === "short") {
        ell(ctx, -8.4, 1.5, 3.4, 5.2, 0, hc);
      }
    } else {
      // hårfäste och lugg under hjälmen
      closedPath(ctx, [[-9.4, -5.5], [-5, -12], [3, -11.6], [6.6, -6.2], [3.4, -4.4], [-1.4, -3.2], [-5.6, -1], [-8.6, 1.2]]);
      ctx.fillStyle = hc; ctx.fill();
      ctx.strokeStyle = hh; ctx.lineWidth = 0.9; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-5, -8); ctx.quadraticCurveTo(0, -9.4, 4.6, -6.4); ctx.stroke();
      ell(ctx, -5.2, -1.2, 1.9, 3.4, 0.2, hc);
    }
  }


  function drawHelmet(ctx, h, st) {
    // ritas i huvudets lokala koordinater, upphöjd så att ansiktet syns under kanten
    ctx.save();
    ctx.translate(-1.2, -6.2);
    ctx.scale(1.02, 0.68);
    const c = h.c;
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
    ctx.lineTo(11.6, 3.4);
    ctx.lineTo(-10.6, 4.4);
    ctx.closePath();
    ctx.fillStyle = h.c2 || shade(c, -0.35);
    ctx.fill();
    // skärm
    ctx.beginPath();
    ctx.moveTo(8, 1.2);
    ctx.quadraticCurveTo(17, 0.4, 17.4, 4.4);
    ctx.quadraticCurveTo(12, 4.4, 8, 3.4);
    ctx.closePath();
    ctx.fillStyle = shade(c, -0.32);
    ctx.fill();
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
      ctx.beginPath();
      ctx.ellipse(-2.4, -8.8, 5, 2, -0.5, 0, TAU);
      ctx.fillStyle = "rgba(255,255,255,.38)";
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
    const farW = wrapSet && { c: shade(wrapSet.c, -0.25), c2: wrapSet.c2 && shade(wrapSet.c2, -0.25) };
    const farLow = coat.legLow && shade(coat.legLow, -0.3);
    drawLeg(ctx, hp, htF, false, { col: shade(coat.base, -0.32), lo: shade(coat.lo, -0.3), low: farLow, hoof: shade(coat.hoof, -0.2), wrap: farW });
    drawLeg(ctx, sh, ftF, true, { col: shade(coat.base, -0.32), lo: shade(coat.lo, -0.3), low: farLow, hoof: shade(coat.hoof, -0.2), wrap: farW });

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
    // anatomi: bogblad, revben, höftknöl, flank
    softEll(ctx, 36, -90, 13, 24, -0.12, rgba(shade(coat.hi, 0.1), 0.35));
    ctx.lineCap = "round";
    ctx.strokeStyle = rgba(coat.lo, 0.26); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(26, -108); ctx.bezierCurveTo(31, -92, 35, -76, 30, -58); ctx.stroke();
    for (let k = 0; k < 5; k++) {
      const x = -4 - k * 9;
      ctx.strokeStyle = rgba(coat.lo, 0.07); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x + 8, -98); ctx.quadraticCurveTo(x + 15, -80, x + 6, -58); ctx.stroke();
    }
    softEll(ctx, -52, -101, 17, 10, 0.5, rgba(shade(coat.hi, 0.15), 0.4));
    softEll(ctx, -52, -72, 19, 20, 0.2, rgba(coat.lo, 0.2));
    ctx.strokeStyle = rgba(coat.lo, 0.26); ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-30, -64); ctx.quadraticCurveTo(-44, -60, -58, -69); ctx.stroke();
    if (coat.dapple) {
      for (let i = 0; i < 46; i++) {
        const x = -74 + ((i * 37.7) % 140), y = -114 + ((i * 53.3) % 62);
        const r = 4 + (i * 7) % 3;
        ctx.strokeStyle = rgba(coat.lo, 0.11); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.ellipse(x, y, r * 1.2, r, 0.3, 0, TAU); ctx.stroke();
        ell(ctx, x, y, r * 0.9, r * 0.7, 0.3, rgba(coat.hi, 0.18));
      }
    }
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
    softEll(ctx, 56, -136, 16, 5, -0.9, `rgba(255,236,210,${0.1 + shine * 0.4})`);
    // kam, halsmuskel och halsven
    softEll(ctx, 48, -128, 22, 7, -0.95, rgba(shade(coat.hi, 0.1), 0.35));
    ctx.strokeStyle = rgba(coat.lo, 0.3); ctx.lineWidth = 1.5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(poll[0] + 8, poll[1] + 16); ctx.bezierCurveTo(poll[0] - 2, poll[1] + 34, 70, -118, 60, -98); ctx.stroke();
    if (coat.dapple) for (let i = 0; i < 14; i++) {
      const x = 30 + (i * 11.3) % 56, y = -150 + (i * 17.9) % 60;
      ell(ctx, x, y, 3.6, 3, 0.4, rgba(coat.hi, 0.22));
      ctx.strokeStyle = rgba(coat.lo, 0.14); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(x, y, 4.2, 3.4, 0.4, 0, TAU); ctx.stroke();
    }
    ctx.restore();

    // 5. hovar/ben (nära) ritas före sadel
    const wrapN = wrapSet ? { c: wrapSet.c, c2: wrapSet.c2 } : null;
    drawLeg(ctx, hp, htN, false, { col: coat.base, lo: coat.lo, low: coat.legLow, hoof: coat.hoof, wrap: wrapN });
    drawLeg(ctx, sh, ftN, true, { col: coat.base, lo: coat.lo, low: coat.legLow, hoof: coat.hoof, wrap: wrapN, sock: !wrapSet && coat.sock !== false && o.sock !== false });

    // 6. man
    drawMane(ctx, poll, t, { coat, mane: tack.mane }, flow);

    // 7. huvud (bakom ryttare)
    const showSaddle = !stand && !o.bare;
    drawHead(ctx, poll, headAng, {
      coat, blaze: coat.blaze !== false && o.blaze !== false, blink: o.blink, ear: o.ear, mouth: o.mouth,
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
      const bit = [poll[0] + (Math.cos(headAng) * 40.6 - Math.sin(headAng) * 15.8) * 1.08,
        poll[1] + (Math.sin(headAng) * 40.6 + Math.cos(headAng) * 15.8) * 1.08];
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

  return { COATS, closedPath, tube, softEll, drawHorse, drawStandingRider, drawRosette, drawBow, drawRider, GAITS, COAT, clamp, lerp, smooth, mix, shade, ell, poly, limb, star, TAU, spline, rot, norm };
})();
