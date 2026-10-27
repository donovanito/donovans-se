"use strict";
/* Epsilon Raceway - ljud (syntetiserat med Web Audio, inga ljudfiler): elmotorer som följer farten,
   turbo, däckskrik, urspårning, startljus och målgång. */
const Sfx = (() => {
  let ctx = null, master = null, noiseBuf = null, muted = false, silent = true;
  const voices = {}; // "p" (spelaren) och "a" (datorn)
  let turboV = null, squealV = null;

  function init() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.75;
      master.connect(ctx.destination);
      const len = ctx.sampleRate * 1.5;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      voices.p = motor(0); voices.a = motor(0.5);
      turboV = loopNoise("bandpass", 900, 0.9);
      squealV = loopNoise("bandpass", 2600, 7);
    } catch (e) { ctx = null; }
  }

  function motor(detune) {
    const out = ctx.createGain(); out.gain.value = 0;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2200; lp.Q.value = 0.8;
    const o1 = ctx.createOscillator(); o1.type = "sawtooth";
    const o2 = ctx.createOscillator(); o2.type = "square";
    const g1 = ctx.createGain(), g2 = ctx.createGain(); g1.gain.value = 0.55; g2.gain.value = 0.22;
    o1.connect(g1); o2.connect(g2); g1.connect(lp); g2.connect(lp);
    let pan = null;
    if (ctx.createStereoPanner) { pan = ctx.createStereoPanner(); lp.connect(pan); pan.connect(out); } else lp.connect(out);
    out.connect(master);
    o1.start(); o2.start();
    return { out, o1, o2, lp, pan, detune };
  }

  function loopNoise(type, f, q) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
    const g = ctx.createGain(); g.gain.value = 0;
    s.connect(fl); fl.connect(g); g.connect(master); s.start();
    return { g, fl };
  }

  function setMuted(m) { muted = m; if (master) master.gain.value = m ? 0 : 0.75; }

  /* Per bildruta. who = "p"|"a", v = fart (0-300), thr = gas, pan = -1..1, on = bilen kör (inte urspårad) */
  function motorUpdate(who, v, thr, pan, on) {
    const m = voices[who];
    if (!ctx || !m) return;
    const t = ctx.currentTime, k = v / 280;
    const f = (62 + v * 1.55 + (thr ? 14 : 0)) * (1 + m.detune * 0.04);
    m.o1.frequency.setTargetAtTime(f, t, 0.05);
    m.o2.frequency.setTargetAtTime(f * 2.01, t, 0.05);
    m.lp.frequency.setTargetAtTime(900 + k * 2600, t, 0.08);
    const vol = (who === "p" ? 0.17 : 0.09) * (on && !silent ? 0.35 + 0.65 * Math.min(1, k + (thr ? 0.25 : 0)) : 0);
    m.out.gain.setTargetAtTime(vol, t, 0.06);
    if (m.pan) m.pan.pan.setTargetAtTime(Math.max(-0.8, Math.min(0.8, pan || 0)), t, 0.1);
  }

  function turboUpdate(on) {
    if (!ctx || !turboV) return;
    turboV.g.gain.setTargetAtTime(on && !silent ? 0.14 : 0, ctx.currentTime, 0.05);
    turboV.fl.frequency.setTargetAtTime(on ? 1700 : 700, ctx.currentTime, 0.15);
  }
  function squealUpdate(level) {
    if (!ctx || !squealV) return;
    squealV.g.gain.setTargetAtTime(silent ? 0 : Math.min(0.2, level * 0.22), ctx.currentTime, 0.04);
    squealV.fl.frequency.setTargetAtTime(2300 + level * 900, ctx.currentTime, 0.1);
  }

  function setSilent(s) {
    silent = s;
    if (s) { motorUpdate("p", 0, false, 0, false); motorUpdate("a", 0, false, 0, false); turboUpdate(false); squealUpdate(0); }
  }

  function tone(freq, dur, type, vol, when, slide) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, vol, f0, f1, type, when, q) {
    if (!ctx) return;
    const t = ctx.currentTime + (when || 0);
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type || "lowpass"; f.Q.value = q || 0.7;
    f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t); s.stop(t + dur + 0.05);
  }

  const fx = {
    beep() { tone(520, 0.2, "sine", 0.3); },
    go() { tone(1040, 0.5, "sine", 0.34); tone(1560, 0.5, "triangle", 0.12); },
    lap() { tone(880, 0.12, "triangle", 0.2); tone(1320, 0.16, "triangle", 0.2, 0.1); },
    best() { tone(880, 0.1, "triangle", 0.2); tone(1100, 0.1, "triangle", 0.2, 0.09); tone(1480, 0.2, "triangle", 0.22, 0.18); },
    derail() { noise(0.5, 0.5, 2400, 300, "lowpass"); tone(150, 0.4, "sawtooth", 0.2, 0, 45); tone(90, 0.3, "square", 0.15, 0.05, 40); },
    place() { tone(420, 0.1, "triangle", 0.18); tone(630, 0.14, "triangle", 0.18, 0.08); },
    finish() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.3, "triangle", 0.22, i * 0.12)); tone(1047, 0.7, "sine", 0.14, 0.5); },
    turbo() { noise(0.35, 0.22, 500, 3200, "bandpass", 0, 1.2); tone(180, 0.3, "sawtooth", 0.07, 0, 520); },
    click() { tone(660, 0.05, "square", 0.08); },
    record() { [659, 784, 988, 1319].forEach((f, i) => tone(f, 0.2, "triangle", 0.2, i * 0.1)); },
  };
  function play(n) { if (ctx && !muted && fx[n]) fx[n](); }

  return { init, setMuted, play, motorUpdate, turboUpdate, squealUpdate, setSilent, get ready() { return !!ctx; } };
})();
