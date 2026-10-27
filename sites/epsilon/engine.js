"use strict";
/* Epsilon Raceway - fysik och datorförare (ingen DOM, kan köras headless).
   Bilen sitter i sin fil (slot) och rör sig bara längs banan. Hastigheten följer en enkel motormodell;
   sidokraften v^2 * krökning får inte överstiga greppet G, annars glider bakvagnen ut och bilen spårar ur. */
const Engine = (() => {
  const P = {
    G: 440,           // max sidoacceleration (enheter/s^2) innan bilen börjar glida
    VTOP: 205,        // topphastighet med bara gas
    VTURBO: 278,      // topphastighet med turbo
    K_ACC: 2.3,       // motorns "stighastighet" (1/s) utan turbo
    K_TURBO: 3.6,     // med turbo
    BRK0: 78, BRK1: 1.25, // motorbroms när man släpper gasen: dv/dt = -(BRK0 + BRK1 * v)
    DRIFT_FROM: 0.75, // under greppgränsen: från så här stor andel av G börjar bakvagnen släppa lite (breddställ, ofarligt)
    DRIFT_MAX: 0.45,  // största ofarliga breddställ (andel av full glidning)
    SLIP_BASE: 0.3,   // över greppgränsen: urspårningsmätaren fylls med BASE + RATE * (överbelastning) per sekund
    SLIP_RATE: 7,
    SLIP_RECOVER: 2.2,
    TURBO_DRAIN: 0.42, // per sekund (full mätare räcker ~2,4 s)
    TURBO_REGEN: 0.11, // per sekund (full laddning på ~9 s)
    TURBO_MIN: 0.06,   // måste ha minst så här mycket för att starta turbo
    FLY_FRICTION: 190,
    RESPAWN: 2.6,      // sekunder från urspårning till att bilen är uppställd och körbar
    PLACE_AT: 2.1,     // då "ställs bilen upp" (animering), körbar vid RESPAWN
    WHEELBASE: 15,
    LAPS: 3,
    CAR_LEN: 24,
  };

  function newCar(lane, startS) {
    return {
      lane, s: startS, v: 0, slip: 0, drift: 0, turbo: 1, mode: "run", // run | fly | wait | done
      gas: false, turboOn: false,
      laps: 0, lapStart: 0, lapTimes: [], derails: 0, finished: false, finishT: 0,
      fly: null, tDerail: 0, a: 0, sound: { sq: 0 },
    };
  }

  /* Ett simuleringssteg. t = tid sedan start (grön), input = {gas, turbo}.
     lapLen = filens längd. Returnerar events som en lista med strängar. */
  function step(car, input, dt, t, ev) {
    const lane = car.lane;
    const out = Tracks_sample(lane, car.s);
    if (car.mode === "fly") return stepFly(car, dt, t, ev);
    if (car.mode === "wait") {
      car.wait -= dt;
      if (car.wait <= 0) { car.mode = "run"; car.v = 0; car.slip = 0; car.drift = 0; ev && ev("placed", car); }
      return;
    }
    car.gas = !!input.gas; car.turboOn = false;
    let vt = P.VTOP, k = P.K_ACC;
    const finishing = car.finished;
    if (!finishing && input.turbo && car.turbo > (car.turboWasOn ? 0.0001 : P.TURBO_MIN)) {
      car.turboOn = true; car.turbo = Math.max(0, car.turbo - P.TURBO_DRAIN * dt);
      vt = P.VTURBO; k = P.K_TURBO;
    } else if (car.turbo < 1) {
      car.turbo = Math.min(1, car.turbo + P.TURBO_REGEN * dt);
    }
    car.turboWasOn = car.turboOn;
    const drive = !finishing && (input.gas || car.turboOn);
    if (drive) {
      car.v += (vt - car.v) * k * dt;
    } else {
      car.v -= ((finishing ? 150 : P.BRK0) + (finishing ? 1.2 : P.BRK1) * car.v) * dt;
    }
    if (car.v < 0) car.v = 0;
    // greppet: sidoacceleration mot grepp
    const aLat = car.v * car.v * Math.abs(out.k);
    car.a = aLat;
    const r = aLat / P.G;
    car.r = r;
    let target = 0;
    if (!finishing && r > 1) {
      // över greppgränsen: urspårningsmätaren fylls, snabbare ju mer man överskrider
      car.slip += (P.SLIP_BASE + P.SLIP_RATE * (r - 1)) * dt;
      if (car.slip >= 1) { derail(car, t, ev, out); return; }
    } else {
      car.slip = Math.max(0, car.slip - P.SLIP_RECOVER * dt);
    }
    if (!finishing && r > P.DRIFT_FROM) target = Math.min(P.DRIFT_MAX, P.DRIFT_MAX * (r - P.DRIFT_FROM) / (1 - P.DRIFT_FROM));
    target = Math.min(1, target + (1 - P.DRIFT_MAX) * car.slip);
    car.drift += (target - car.drift) * Math.min(1, dt * 14);
    car.s += car.v * dt;
  }

  function Tracks_sample(lane, s) { return Tracks.sample(lane, s, _tmp); }
  const _tmp = { x: 0, y: 0, th: 0, k: 0, i: 0 };
  const _tmp2 = { x: 0, y: 0, th: 0, k: 0, i: 0 };

  /* Bilens läge: mitten mellan framaxel (styrstiftet i spåret) och bakaxel. Vid glidning (drift) släpper bakvagnen
     utåt i kurvan, så bilen vinklas åt samma håll som kurvan svänger. Skriver x, y, a (vinkel) och fx, fy, rx, ry. */
  const _pa = { x: 0, y: 0, th: 0, k: 0, i: 0 }, _pb = { x: 0, y: 0, th: 0, k: 0, i: 0 };
  function pose(car, out, jitter) {
    Tracks.sample(car.lane, car.s, _pa);
    Tracks.sample(car.lane, car.s - P.WHEELBASE, _pb);
    let rx = _pb.x, ry = _pb.y;
    if (car.drift > 0.01) {
      const side = _pa.k > 0 ? -1 : 1, off = car.drift * 6.5 + (jitter && car.drift > 0.55 ? (Math.random() - 0.5) * 1.2 : 0);
      rx += side * -Math.sin(_pb.th) * off; ry += side * Math.cos(_pb.th) * off;
    }
    out.x = (_pa.x + rx) / 2; out.y = (_pa.y + ry) / 2; out.a = Math.atan2(_pa.y - ry, _pa.x - rx);
    out.fx = _pa.x; out.fy = _pa.y; out.rx = rx; out.ry = ry;
    return out;
  }
  const _pp = {};

  function derail(car, t, ev, o) {
    const sg = o.k >= 0 ? 1 : -1;
    pose(car, _pp, false);
    // bilen fortsätter rakt fram längs tangenten (alltså utåt ur kurvan) och snurrar åt samma håll som kurvan svängde
    const spin = sg * Math.max(1.5, Math.min(4.5, car.v * Math.abs(o.k) * 1.1));
    car.mode = "fly";
    car.derails++;
    car.tDerail = t;
    car.fly = { x: _pp.x, y: _pp.y, a: _pp.a, spin, t: 0, h: 0,
                vx: Math.cos(o.th - sg * 0.08) * car.v, vy: Math.sin(o.th - sg * 0.08) * car.v };
    car.fly.v0 = car.v;
    car.flyT = 0;
    car.v = 0;
    ev && ev("derail", car);
  }

  function stepFly(car, dt, t, ev) {
    const f = car.fly;
    car.flyT += dt;
    const sp = Math.hypot(f.vx, f.vy);
    if (sp > 3) {
      const ns = Math.max(0, sp - P.FLY_FRICTION * dt);
      f.vx *= ns / sp; f.vy *= ns / sp;
    } else { f.vx = f.vy = 0; }
    f.x += f.vx * dt; f.y += f.vy * dt;
    f.spin *= Math.exp(-2.2 * dt);
    f.a += f.spin * dt;
    // "lyft" - hopp över kanten: 0 -> 1 -> 0 första 0,55 s
    f.h = car.flyT < 0.55 ? Math.sin(car.flyT / 0.55 * Math.PI) : 0;
    if (car.flyT >= P.PLACE_AT) {
      car.mode = "wait"; car.wait = P.RESPAWN - P.PLACE_AT; car.placedAt = t; car.v = 0; car.slip = 0; car.drift = 0; car.fly = null;
      ev && ev("placing", car);
    }
  }

  /* Datorförare: bygger en hastighetsprofil per fil. */
  function makeProfile(lane, margins) {
    const N = lane.N, vl = new Float64Array(N), tgt = new Float64Array(N);
    const VCAP = P.VTURBO + 30;
    const kth = 0.0022;
    for (let i = 0; i < N; i++) {
      const ak = Math.abs(lane.k[i]);
      vl[i] = ak > kth * 0.4 ? Math.min(VCAP, Math.sqrt(P.G / ak) * (margins ? margins[i] : 0.93)) : VCAP;
    }
    // bakåtpass: får bromsa med B in till varje kurva (två varv runt för cirkulärt)
    const B = 270;
    for (let i = 0; i < N; i++) tgt[i] = vl[i];
    for (let pass = 0; pass < 2; pass++) {
      for (let n = 0; n < N; n++) {
        const i = (N - 1 - n), j = (i + 1) % N;
        const ds = lane.s[i + 1] - lane.s[i];
        const lim = Math.sqrt(tgt[j] * tgt[j] + 2 * B * ds);
        if (lim < tgt[i]) tgt[i] = lim;
      }
    }
    return tgt;
  }

  /* Kurvindelning på filen: [{i0, i1}] där krökningen är påtaglig. */
  function corners(lane) {
    const N = lane.N, th = 0.0022, out = [];
    let i = 0;
    // starta på en rak bit
    let st = 0; while (Math.abs(lane.k[st]) > th * 0.4 && st < N) st++;
    let cur = null;
    for (let n = 0; n < N; n++) {
      const idx = (st + n) % N, c = Math.abs(lane.k[idx]) > th * 0.4;
      if (c && !cur) cur = { i0: idx, i1: idx };
      else if (c) cur.i1 = idx;
      else if (!c && cur) { out.push(cur); cur = null; }
    }
    if (cur) out.push(cur);
    void i;
    return out;
  }

  /* Skapar en datorförare. mean = genomsnittligt fartmarginal (andel av greppgränsen), sd = slumpspridning. */
  function makeAI(lane, opts) {
    const ai = { lane, mean: opts.mean, sd: opts.sd, cs: corners(lane), tgt: null, reaction: 0.28 + Math.random() * 0.22, lastLapProfile: -1 };
    reprofile(ai, 0);
    return ai;
  }

  function gauss() { let u = 0; for (let i = 0; i < 6; i++) u += Math.random(); return (u - 3) / Math.sqrt(0.5); }

  function reprofile(ai, adj) {
    const N = ai.lane.N, m = new Float64Array(N).fill(ai.mean + adj);
    for (const c of ai.cs) {
      const mm = ai.mean + adj + gauss() * ai.sd;
      let i = c.i0;
      for (let n = 0; n < N; n++) {
        m[i] = mm;
        if (i === c.i1) break;
        i = (i + 1) % N;
      }
    }
    ai.tgt = makeProfile(ai.lane, m);
  }

  function aiInput(ai, car, t) {
    if (t < ai.reaction) return { gas: false, turbo: false };
    const lane = ai.lane;
    const s = ((car.s % lane.L) + lane.L) % lane.L;
    Tracks.sample(lane, s, _tmp2);
    const N = lane.N;
    const look = Math.min(N - 1, Math.round(car.v * 0.07 / 1.5));
    const i = (_tmp2.i + look) % N;
    const vt = ai.tgt[i];
    const gas = car.v < vt;
    // turbo om profilen tillåter betydligt mer fart en bit framåt
    let turbo = false;
    if (gas && car.turbo > 0.12) {
      let ok = true;
      const span = Math.round(70 / 1.5);
      for (let n = 0; n < span; n++) if (ai.tgt[(i + n) % N] < car.v + 30) { ok = false; break; }
      turbo = ok && ai.tgt[i] > P.VTOP + 16;
    }
    return { gas, turbo };
  }

  /* ---------------- Loppet: två bilar, varvräkning och mål ---------------- */
  const START_BEHIND = 14; // bilarna står så här långt före startlinjen

  function createRace(track, playerLane, aiOpts) {
    const pl = track.lanes[playerLane], al = track.lanes[1 - playerLane];
    const player = newCar(pl, -START_BEHIND), ai = newCar(al, -START_BEHIND);
    const race = { track, t: 0, laps: P.LAPS, player, ai, aiCtl: makeAI(al, aiOpts) };
    player.isPlayer = true;
    return race;
  }

  function stepCar(race, car, input, dt, evFn) {
    const prev = car.s;
    step(car, input, dt, race.t, evFn);
    if (car.mode === "run" || car.mode === "wait") {
      const L = car.lane.L;
      while (car.s >= (car.laps + 1) * L && !car.finished) {
        const frac = car.s > prev ? ((car.laps + 1) * L - prev) / (car.s - prev) : 1;
        const tc = race.t - dt + dt * Math.min(1, Math.max(0, frac));
        car.lapTimes.push(tc - car.lapStart);
        car.lapStart = tc;
        car.laps++;
        if (car.laps >= race.laps) {
          car.finished = true; car.finishT = tc;
          evFn && evFn("finish", car);
        } else evFn && evFn("lap", car);
        if (car === race.ai) reprofile(race.aiCtl, aiAdjust(race));
      }
    }
  }

  // lättare tryck på AI:n när den leder stort, tvärtom när den ligger efter
  function aiAdjust(race) {
    const gap = (race.ai.s / race.ai.lane.L - race.player.s / race.player.lane.L) * 8; // ungefär sekunder
    return Math.max(-0.03, Math.min(0.02, -gap * 0.012));
  }

  /* Stegar loppet dt sekunder (delas upp i små steg). */
  function stepRace(race, input, dt, evFn) {
    const n = Math.max(1, Math.ceil(dt / (1 / 120))), h = dt / n;
    for (let i = 0; i < n; i++) {
      race.t += h;
      stepCar(race, race.player, input, h, evFn);
      stepCar(race, race.ai, aiInput(race.aiCtl, race.ai, race.t), h, evFn);
    }
  }

  const api = { P, START_BEHIND, pose, newCar, step, makeAI, reprofile, aiInput, corners, makeProfile, createRace, stepRace };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  return api;
})();
