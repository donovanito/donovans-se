"use strict";
/* Sigma - spelmotor (ren logik, ingen DOM). Används av game.js och av games-src/sigma/sim.mjs. */
(function (root) {
  const D = (typeof require !== "undefined" && typeof module !== "undefined") ? require("./data.js") : root.SigmaData;

  const STEPS = 5;             // beslut per nivå
  const RISK_BASE = [0.08, 0.2, 0.36];
  const BAD_TAX = [-2, -1, -1, -3]; // bakslagsskatt
  const CALM_CHANCE = 0.14;
  const CRISIS_AT = 10;  // en parameter på denna nivå eller lägre utlöser kris
  const REBASE_TO = 52, REBASE_K = 0.4;   // vid nivåbyte dras parametrarna mot mitten
  const DRAG_BASE = 0.6, DRAG_PER_LEVEL = 0.05; // vardagsfriktion per steg och parameter, växer med nivån
  const BALANCE_PROMO = 30, BALANCE_FAST = 40, FAST_MARGIN = 12, STAY_MARGIN = 8;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rnd = Math.random;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  const byId = {};
  D.SCENARIOS.forEach((s) => { byId[s.id] = s; });
  const factorById = {};
  D.FACTORS.concat([D.CALM]).forEach((f) => { factorById[f.id] = f; });

  function newRun(name) {
    return {
      v: 1, name: name || "", level: 1, p: [50, 50, 50, 50], step: 0, year: 1, totalSteps: 0, started: Date.now(),
      round: { sc: [], fa: [], hist: [] }, cur: null, seen: {}, promotions: 0, demotions: 0, best: 1, done: false, pendingEval: null, log: [],
    };
  }

  const sigma = (p) => p.reduce((a, b) => a + b, 0) / p.length;
  const need = (level) => D.LEVELS[level - 1].need;
  const salary = (level, lon) => Math.round(D.LEVELS[level - 1].sal * (0.88 + 0.24 * (lon / 100)) / 100) * 100;

  /* Dra scenario + faktor för nästa steg. */
  function startStep(run) {
    const pool = D.SCENARIOS.filter((s) => s.lvl === run.level && run.round.sc.indexOf(s.id) < 0);
    const minSeen = Math.min.apply(null, pool.map((s) => run.seen[s.id] || 0));
    const fresh = pool.filter((s) => (run.seen[s.id] || 0) === minSeen);
    const sc = pick(fresh);
    let f;
    if (rnd() < CALM_CHANCE) f = D.CALM;
    else {
      const ok = D.FACTORS.filter((x) => run.round.fa.indexOf(x.id) < 0);
      f = pick(ok);
    }
    run.cur = { sid: sc.id, fid: f.id, order: shuffle([0, 1, 2]), choice: null, res: null };
    return run.cur;
  }

  const scenario = (run) => byId[run.cur.sid];
  const factor = (run) => factorById[run.cur.fid];
  const option = (run, slot) => scenario(run).o[run.cur.order[slot]];

  /* Vardagsfriktion: slumpavrundad så att den blir ett heltal per parameter. */
  function drag(level) {
    const v = DRAG_BASE + DRAG_PER_LEVEL * (level - 1);
    return [0, 1, 2, 3].map(() => -(Math.floor(v) + (rnd() < v - Math.floor(v) ? 1 : 0)));
  }

  /* Faktorns tillägg för ett alternativ. */
  function factorDelta(f, opt) {
    const d = f.flat.slice();
    const t = f.tag[opt[2]];
    if (t) for (let i = 0; i < 4; i++) d[i] += t[i];
    return d;
  }
  function failChance(run, f, opt) {
    const risk = opt[3];
    let c = RISK_BASE[risk] + (f.riskAdd || 0) * (risk / 2);
    if (run.p[1] < 35) c += 0.05; else if (run.p[1] > 70) c -= 0.05;
    return clamp(c, 0.03, 0.7);
  }

  /* Lös beslutet på plats `slot` (0-2). `force` = true/false för att tvinga bakslag eller lyckat (test). */
  function resolve(run, slot, force) {
    const cur = run.cur, sc = scenario(run), f = factor(run), opt = option(run, slot);
    const chance = failChance(run, f, opt);
    const bad = force === undefined || force === null ? rnd() < chance : !!force;
    let base = opt[4].slice();
    if (bad) base = base.map((v, i) => (v > 0 ? Math.round(v * 0.25) : Math.round(v * 1.5)) + BAD_TAX[i]);
    const fd = factorDelta(f, opt);
    const dr = drag(run.level);
    const before = run.p.slice();
    for (let i = 0; i < 4; i++) run.p[i] = clamp(run.p[i] + base[i] + fd[i] + dr[i], 0, 100);
    const delta = run.p.map((v, i) => v - before[i]);
    const text = bad ? pick(D.BAD[opt[2]]) : opt[5];
    cur.choice = slot;
    cur.res = { bad, base, fd, dr, delta, text, chance };
    run.step++; run.totalSteps++;
    run.seen[sc.id] = (run.seen[sc.id] || 0) + 1;
    run.round.sc.push(sc.id);
    if (f !== D.CALM) run.round.fa.push(f.id);
    run.round.hist.push({ sid: sc.id, fid: f.id, label: opt[0], bad, delta: delta.slice(), tag: opt[2] });
    const mn = Math.min.apply(null, run.p);
    run.crisis = mn <= CRISIS_AT ? run.p.indexOf(mn) : -1;
    return cur.res;
  }

  /* Utvärdering efter fem steg (eller kris). Muterar inte. */
  function evaluate(run) {
    const s = sigma(run.p), n = need(run.level), mn = Math.min.apply(null, run.p);
    let v;
    if (run.crisis >= 0) v = "crisis";
    else if (s >= n + FAST_MARGIN && mn >= BALANCE_FAST) v = "up2";
    else if (s >= n && mn >= BALANCE_PROMO) v = "up";
    else if (s >= n - STAY_MARGIN) v = "stay";
    else v = "down";
    let to = run.level;
    if (v === "up") to = run.level + 1;
    else if (v === "up2") to = run.level + 2;
    else if (v === "down" || v === "crisis") to = run.level - 1;
    const win = run.level === 10 && (v === "up" || v === "up2");
    to = clamp(to, 1, 10);
    return { v, sigma: s, need: n, min: mn, weakest: run.p.indexOf(mn), from: run.level, to, win, floor: (v === "down" || v === "crisis") && run.level === 1, balanced: mn >= BALANCE_PROMO };
  }

  const rebase = (p) => p.map((v) => Math.round(v + (REBASE_TO - v) * REBASE_K));

  /* Tillämpa utvärderingen: byt nivå, nollställ rundan. */
  function applyEval(run, ev) {
    run.level = ev.to;
    run.best = Math.max(run.best, run.level);
    if (ev.to > ev.from) run.promotions++;
    if (ev.to < ev.from) run.demotions++;
    run.log.push({ year: run.year, from: ev.from, to: ev.to, v: ev.v, sigma: Math.round(ev.sigma) });
    run.p = rebase(run.p);
    run.step = 0; run.year++; run.crisis = -1;
    run.round = { sc: [], fa: [], hist: [] };
    run.cur = null;
    if (ev.win) run.done = true;
    return run;
  }

  /* Karriärpoäng vid målgång. */
  function score(run, ev) {
    const eff = Math.max(0, 1600 - run.totalSteps * 12);
    return Math.round(1000 + sigma(run.p) * 8 + (ev ? ev.sigma * 4 : 0) + eff);
  }

  const E = { STEPS, D, newRun, startStep, scenario, factor, option, factorDelta, failChance, resolve, evaluate, applyEval, score, sigma, need, salary, rebase, clamp, factorById, byId, shuffle, pick,
    drag, consts: { CRISIS_AT, DRAG_BASE, DRAG_PER_LEVEL, RISK_BASE, BAD_TAX, BALANCE_PROMO, BALANCE_FAST, FAST_MARGIN, STAY_MARGIN, REBASE_TO, REBASE_K } };
  root.SigmaEngine = E;
  if (typeof module !== "undefined" && module.exports) module.exports = E;
})(typeof window !== "undefined" ? window : globalThis);
