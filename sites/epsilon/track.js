"use strict";
/* Epsilon Raceway - banor. Varje bana byggs av riktiga "banbitar" (raka bitar och kurvor) med en
   sköldpaddsbeskrivning. Banan har två filer (slots) och räknas ut en gång; spelet och
   den headless-testen (games-src/epsilon/sim.mjs) använder samma geometri.
   Enhet: 1 enhet ~ 0,45 cm i verkligheten (bilen är 24 enheter lång, banan 40 bred). */
const Tracks = (() => {
  const TW = 40;        // körbanans bredd mellan kantstöden
  const LANE = 9;       // filernas avstånd från banans mittlinje
  const CURB = 4.5;     // kantstödets bredd
  const DS = 1.5;       // samplingsavstånd längs mittlinjen
  const STRAIGHT_PIECE = 80;

  /* ["s", längd] = rak bit, ["a", grader, radie] = kurva (+ = åt höger sett uppifrån, - = åt vänster).
     rep = antal upprepningar av mönstret (delar av 360 grader), startMid = starta mitt på första raka. */
  const DEFS = [
    {
      id: "oval", name: "Ovalen", level: 1, blurb: "Två långa raksträckor och två breda kurvor. Perfekt uppvärmning.",
      seq: [["s", 300], ["a", 180, 106]], rep: 2,
    },
    {
      id: "rund", name: "Rundan", level: 2, blurb: "Fyra raka hörn. Bromsa i tid inför varje kurva.",
      seq: [["s", 300], ["a", 90, 80], ["s", 180], ["a", 90, 80]], rep: 2,
    },
    {
      id: "trekant", name: "Triangeln", level: 3, blurb: "Tre skarpa hörn och korta raka bitar. Turbon räcker inte långt.",
      seq: [["s", 240], ["a", 120, 86]], rep: 3,
    },
    {
      id: "chikan", name: "Chikanen", level: 4, blurb: "Slingor på raksträckorna. Rytm är allt.",
      seq: [["s", 230], ["a", 45, 110], ["a", -45, 110], ["s", 90], ["a", 90, 76], ["s", 130], ["a", 90, 76]], rep: 2,
    },
    {
      id: "harnal", name: "Hårnålen", level: 5, blurb: "Två hårnålskurvor och en snabb knyck. Svårast, och roligast.",
      seq: [["s", 210], ["a", 55, 95], ["a", -55, 95], ["s", 70], ["a", 180, 48]], rep: 2,
    },
  ];

  const wrapAngle = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };

  function expand(def) {
    const base = def.seq.map((e) => e.slice());
    let seq = [];
    for (let r = 0; r < (def.rep || 1); r++) base.forEach((e) => seq.push(e.slice()));
    // starta mitt på första raka biten så att start/mål ligger mitt på en raksträcka
    const first = seq[0];
    if (first[0] === "s") {
      const h = first[1] / 2;
      seq[0] = ["s", h];
      seq.push(["s", h]);
    }
    return seq;
  }

  function build(def) {
    const seq = expand(def);
    const P = []; // {x, y, th}
    const joints = []; // index i punktlistan där en banbit börjar
    let x = 0, y = 0, th = 0;
    for (const el of seq) {
      if (el[0] === "s") {
        const pieces = Math.max(1, Math.round(el[1] / STRAIGHT_PIECE));
        const pl = el[1] / pieces;
        for (let p = 0; p < pieces; p++) {
          joints.push(P.length);
          const n = Math.max(1, Math.ceil(pl / DS)), st = pl / n;
          for (let i = 0; i < n; i++) { P.push({ x, y, th }); x += Math.cos(th) * st; y += Math.sin(th) * st; }
        }
      } else {
        const A = el[1] * Math.PI / 180, R = el[2], rho = R * Math.sign(A);
        // centrum = pos + rho * vänster, vänster = (-sin, cos)
        const ccx = x + rho * -Math.sin(th), ccy = y + rho * Math.cos(th);
        const deg = Math.abs(el[1]);
        const pdeg = deg % 30 === 0 ? 30 : deg % 45 === 0 ? 45 : deg;
        const pieces = Math.max(1, Math.round(deg / pdeg));
        const pa = A / pieces;
        for (let p = 0; p < pieces; p++) {
          joints.push(P.length);
          const n = Math.max(1, Math.ceil(Math.abs(pa) * R / DS)), dth = pa / n;
          for (let i = 0; i < n; i++) {
            P.push({ x, y, th });
            th += dth;
            x = ccx + rho * Math.sin(th); y = ccy + rho * -Math.cos(th);
          }
        }
      }
    }
    // stäng loopen exakt: fördela slutfelet linjärt (felet är normalt under en halv enhet)
    const N = P.length, ex = x, ey = y, eTh = th;
    for (let i = 0; i < N; i++) { P[i].x -= ex * i / N; P[i].y -= ey * i / N; }
    const xs = new Float64Array(N), ys = new Float64Array(N);
    for (let i = 0; i < N; i++) { xs[i] = P[i].x; ys[i] = P[i].y; }
    const ths = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      ths[i] = Math.atan2(ys[j] - ys[i], xs[j] - xs[i]);
    }
    // gör vinklarna kontinuerliga (unwrap)
    for (let i = 1; i < N; i++) ths[i] = ths[i - 1] + wrapAngle(ths[i] - ths[i - 1]);

    const lanes = [LANE, -LANE].map((d) => makeLane(xs, ys, ths, d));
    // yttre kant för kameran
    let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    const half = TW / 2 + CURB + 6;
    for (let i = 0; i < N; i += 2) {
      for (const sg of [-1, 1]) {
        const px = xs[i] - Math.sin(ths[i]) * half * sg, py = ys[i] + Math.cos(ths[i]) * half * sg;
        if (px < minX) minX = px; if (px > maxX) maxX = px; if (py < minY) minY = py; if (py > maxY) maxY = py;
      }
    }
    // omkrets (mittlinje)
    let L = 0;
    for (let i = 0; i < N; i++) { const j = (i + 1) % N; L += Math.hypot(xs[j] - xs[i], ys[j] - ys[i]); }
    // kurvintervall på mittlinjen (för kantstöd): |kappa| > tröskel
    return {
      def, N, xs, ys, ths, lanes, joints, length: L, closeError: Math.hypot(ex, ey), headingError: eTh - 2 * Math.PI * Math.round(eTh / (2 * Math.PI)),
      bbox: { minX, minY, maxX, maxY }, TW, LANE, CURB,
    };
  }

  function makeLane(xs, ys, ths, d) {
    const N = xs.length;
    const x = new Float64Array(N), y = new Float64Array(N), th = new Float64Array(N), k = new Float64Array(N), s = new Float64Array(N + 1);
    for (let i = 0; i < N; i++) { x[i] = xs[i] - Math.sin(ths[i]) * d; y[i] = ys[i] + Math.cos(ths[i]) * d; }
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      s[i + 1] = s[i] + Math.hypot(x[j] - x[i], y[j] - y[i]);
      th[i] = ths[i];
    }
    const L = s[N];
    // krökning (rå) = vinkelförändring / båglängd, sedan utjämnad
    const raw = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N, i0 = (i + N - 1) % N;
      const dth = wrapAngle(th[j] - th[i0]);
      raw[i] = dth / (2 * (L / N));
    }
    const W = 5;
    for (let i = 0; i < N; i++) {
      let a = 0;
      for (let j = -W; j <= W; j++) a += raw[(i + j + N) % N];
      k[i] = a / (2 * W + 1);
    }
    return { d, x, y, th, k, s, L, N };
  }

  /* Position/riktning/krökning på fil `lane` vid båglängd s (cirkulärt). Skriver i `out`. */
  function sample(lane, s, out) {
    const L = lane.L, N = lane.N;
    s = ((s % L) + L) % L;
    let lo = 0, hi = N; // hitta i så att s[i] <= s < s[i+1]
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (lane.s[m] <= s) lo = m; else hi = m; }
    const i = lo, j = (i + 1) % N;
    const seg = lane.s[i + 1] - lane.s[i], f = seg > 0 ? (s - lane.s[i]) / seg : 0;
    out.x = lane.x[i] + (lane.x[j] - lane.x[i]) * f;
    out.y = lane.y[i] + (lane.y[j] - lane.y[i]) * f;
    out.th = lane.th[i] + wrapAngle(lane.th[j] - lane.th[i]) * f;
    out.k = lane.k[i] + (lane.k[j] - lane.k[i]) * f;
    out.i = i;
    return out;
  }

  /* Kontroll: ingen del av banan får komma närmare en annan del än `gap` (annars skär banan sig själv). */
  function minClearance(tr) {
    let best = 1e9;
    const N = tr.N, step = 3, L = tr.length;
    for (let i = 0; i < N; i += step) {
      for (let j = i + step; j < N; j += step) {
        const arc = Math.min(j - i, N - (j - i)) * (L / N);
        if (arc < 150) continue;
        const dd = Math.hypot(tr.xs[i] - tr.xs[j], tr.ys[i] - tr.ys[j]);
        if (dd < best) best = dd;
      }
    }
    return best;
  }

  const cache = {};
  function get(id) { return cache[id] || (cache[id] = build(DEFS.find((d) => d.id === id))); }

  const api = { TW, LANE, CURB, DEFS, build, get, sample, minClearance };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  return api;
})();
