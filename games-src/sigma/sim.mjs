// Balanskontroll för Sigma: spelar tusentals karriärer headless med olika strategier.
//   node games-src/sigma/sim.mjs            (standard 3000 karriärer per strategi)
//   node games-src/sigma/sim.mjs 500 --lvl  (visar befordringsfrekvens per nivå)
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const E = require(path.join(here, "..", "..", "sites", "sigma", "engine.js"));
const D = E.D;

const N = parseInt(process.argv[2], 10) || 3000;
const SHOW_LVL = process.argv.includes("--lvl");
const CAP = 600; // max antal beslut per karriär

// ---- val av alternativ ----
const slots = [0, 1, 2];
const sumFx = (v) => v.reduce((a, b) => a + b, 0);
function evOf(run, slot, informed) {
  const opt = E.option(run, slot), f = E.factor(run);
  const ok = opt[4], bad = ok.map((v, i) => (v > 0 ? Math.round(v * 0.25) : Math.round(v * 1.5)) + E.consts.BAD_TAX[i]);
  const fd = informed ? E.factorDelta(f, opt) : [0, 0, 0, 0];
  const pf = informed ? E.failChance(run, f, opt) : E.consts.RISK_BASE[opt[3]];
  const exp = ok.map((v, i) => (1 - pf) * (v + fd[i]) + pf * (bad[i] + fd[i]));
  // balansstraff: ju lägre en parameter, desto mer värt att höja den
  let score = 0;
  for (let i = 0; i < 4; i++) score += exp[i] * (run.p[i] < 42 ? 1.6 : 1) * (run.p[i] < 25 ? 1.5 : 1);
  return score - (informed ? 0 : 0);
}
const strategies = {
  slumpad: (run) => E.pick(slots),
  naiv: (run) => slots.map((s) => [s, evOf(run, s, false)]).sort((a, b) => b[1] - a[1])[0][0],
  informerad: (run) => slots.map((s) => [s, evOf(run, s, true)]).sort((a, b) => b[1] - a[1])[0][0],
  mänsklig: (run) => (Math.random() < 0.3 ? E.pick(slots) : strategies.informerad(run)),
};

function play(strategy) {
  const run = E.newRun("sim");
  const perLevel = {}; // nivå -> [rundor, befordringar]
  let steps = 0, crises = 0;
  while (!run.done && steps < CAP) {
    E.startStep(run);
    const slot = strategy(run);
    E.resolve(run, slot);
    steps++;
    if (run.crisis >= 0 || run.step >= E.STEPS) {
      const ev = E.evaluate(run);
      const l = ev.from;
      perLevel[l] = perLevel[l] || [0, 0, 0, 0];
      perLevel[l][0]++;
      if (ev.to > ev.from) perLevel[l][1]++;
      if (ev.v === "crisis") { perLevel[l][2]++; crises++; }
      if (ev.to < ev.from || ev.floor) perLevel[l][3]++;
      E.applyEval(run, ev);
    }
  }
  return { done: run.done, steps: run.totalSteps, best: run.best, years: run.year - 1, perLevel, crises, run };
}

for (const [name, fn] of Object.entries(strategies)) {
  const rs = [];
  for (let i = 0; i < N; i++) rs.push(play(fn));
  const wins = rs.filter((r) => r.done);
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const sorted = wins.map((r) => r.steps).sort((a, b) => a - b);
  const med = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const bestAvg = avg(rs.map((r) => r.best));
  console.log(`${name.padEnd(11)} VD-andel ${(wins.length / N * 100).toFixed(0).padStart(3)} %  |  median ${String(med).padStart(3)} beslut  min ${sorted[0] || "-"}  p10 ${sorted[Math.floor(sorted.length * 0.1)] || "-"}  |  högsta nivå (snitt) ${bestAvg.toFixed(1)}  |  kriser/karriär ${(avg(rs.map((r) => r.crises))).toFixed(2)}`);
  if (SHOW_LVL) {
    const agg = {};
    for (const r of rs) for (const [l, v] of Object.entries(r.perLevel)) { agg[l] = agg[l] || [0, 0, 0, 0]; for (let k = 0; k < 4; k++) agg[l][k] += v[k]; }
    const row = Object.keys(agg).map(Number).sort((a, b) => a - b).map((l) => `${l}: upp ${(agg[l][1] / agg[l][0] * 100).toFixed(0)}% ner ${(agg[l][3] / agg[l][0] * 100).toFixed(0)}% kris ${(agg[l][2] / agg[l][0] * 100).toFixed(0)}%`);
    console.log("   " + row.join("\n   "));
  }
}

// ---- datakontroll: summor per alternativ ----
const byRisk = [[], [], []];
let dom = 0;
for (const s of D.SCENARIOS) {
  s.o.forEach((o) => byRisk[o[3]].push(sumFx(o[4])));
  const sums = s.o.map((o) => sumFx(o[4]));
  if (sums.length !== 3) console.log("fel antal alternativ:", s.id);
}
for (let r = 0; r < 3; r++) {
  const a = byRisk[r];
  console.log(`risk ${r}: ${a.length} alt, medelsumma ${(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1)}, min ${Math.min(...a)}, max ${Math.max(...a)}`);
}
const perLvl = {};
D.SCENARIOS.forEach((s) => { perLvl[s.lvl] = (perLvl[s.lvl] || 0) + 1; });
console.log("scenarier per nivå:", JSON.stringify(perLvl));
