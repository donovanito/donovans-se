// Headless-kontroll av Epsilon Raceway: banornas geometri och en "perfekt" respektive en datorstyrd bil.
//   node games-src/epsilon/sim.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(here, "..", "..", "sites", "epsilon");
const ctx = vm.createContext({ console, Math, Float64Array, Date });
for (const f of ["track.js", "engine.js"]) vm.runInContext(readFileSync(path.join(site, f), "utf8"), ctx, { filename: f });
const { Tracks, Engine } = vm.runInContext("({Tracks, Engine})", ctx);

const fmt = (x) => x.toFixed(2);
let bad = 0;
for (const def of Tracks.DEFS) {
  const t = Tracks.get(def.id);
  const clear = Tracks.minClearance(t);
  const ok = t.closeError < 1 && Math.abs(t.headingError) < 0.01 && clear > Tracks.TW + 2 * Tracks.CURB + 12;
  if (!ok) bad++;
  console.log(`${def.id.padEnd(8)} längd ${t.length.toFixed(0)} filer ${t.lanes.map((l) => l.L.toFixed(0)).join("/")} slutfel ${t.closeError.toFixed(3)} fri yta ${clear.toFixed(0)} ${ok ? "OK" : "FEL"}`);
}

// En "bot" på spelarens fil kör samma profil som datorn, med given fartmarginal
function run(def, playerLane, botMean, aiMean, aiSd) {
  const tr = Tracks.get(def.id);
  const race = Engine.createRace(tr, playerLane, { mean: aiMean, sd: aiSd });
  const botAI = Engine.makeAI(race.player.lane, { mean: botMean, sd: 0 });
  botAI.reaction = 0;
  const evs = { pd: 0, ad: 0 };
  while (race.t < 200) {
    const inp = Engine.aiInput(botAI, race.player, race.t);
    Engine.stepRace(race, inp, 1 / 60, (e, car) => { if (e === "derail") { if (car === race.player) evs.pd++; else evs.ad++; } });
    if (race.player.finished && race.ai.finished) break;
    if (race.player.finished && race.t > race.player.finishT + 30) break;
  }
  return { p: race.player, a: race.ai, evs, race };
}

for (const def of Tracks.DEFS) {
  const res = [];
  for (const lane of [0, 1]) {
    const r = run(def, lane, 0.97, 0.92, 0.0);
    res.push(`fil${lane}: bot ${fmt(r.p.finishT)}s (${r.evs.pd} urspårn) varv ${r.p.lapTimes.map(fmt).join("/")} | AI ${r.a.finished ? fmt(r.a.finishT) : "-"}s (${r.evs.ad})`);
  }
  console.log(def.id.padEnd(8), res.join("  ||  "));
}
for (const def of Tracks.DEFS) {
  let der = 0, n = 40; const times = [];
  for (let i = 0; i < n; i++) { const r = run(def, 0, 0.84, 0.925, 0.05); der += r.evs.ad; if (r.a.finished) times.push(r.a.finishT); }
  times.sort((a, b) => a - b);
  console.log(def.id.padEnd(8), `AI median ${fmt(times[times.length >> 1])}s min ${fmt(times[0])} max ${fmt(times[times.length - 1])}  urspårningar/lopp ${(der / n).toFixed(2)}`);
}
process.exit(bad ? 1 : 0);
