"use strict";
/* Galoppen - ljud (syntetiserat med Web Audio, inga ljudfiler). */
const Sfx = (() => {
  let ctx = null, master = null, noiseBuf = null, muted = false;
  let lastHoof = 0;

  function init() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.8;
      master.connect(ctx.destination);
      const len = ctx.sampleRate * 1.5;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ctx = null; }
  }

  function setMuted(m) { muted = m; if (master) master.gain.value = m ? 0 : 0.8; }

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
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    s.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type || "lowpass";
    f.Q.value = q || 0.7;
    f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }

  const PENT = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];

  const sounds = {
    click() { tone(660, 0.07, "triangle", 0.12); },
    coin() { tone(988, 0.07, "square", 0.07); tone(1318, 0.16, "square", 0.07, 0.06); },
    horseshoe() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.16, "triangle", 0.12, i * 0.06)); },
    hoof(v) { noise(0.07, 0.16 * (v || 1), 520, 160, "lowpass", 0, 1.2); tone(95, 0.06, "sine", 0.1 * (v || 1)); },
    jump() { noise(0.28, 0.1, 400, 1400, "bandpass", 0, 0.8); tone(240, 0.18, "sine", 0.06, 0, 420); },
    land() { noise(0.14, 0.26, 700, 120, "lowpass"); tone(70, 0.14, "sine", 0.2); },
    perfect() { [PENT[2], PENT[3], PENT[5]].forEach((f, i) => tone(f, 0.18, "triangle", 0.12, i * 0.07)); },
    good() { tone(PENT[2], 0.12, "triangle", 0.1); tone(PENT[3], 0.14, "triangle", 0.1, 0.06); },
    knock() { noise(0.1, 0.3, 2400, 900, "bandpass", 0, 3); tone(300, 0.1, "square", 0.08, 0, 160); noise(0.1, 0.2, 2000, 700, "bandpass", 0.12, 3); noise(0.08, 0.12, 1800, 600, "bandpass", 0.26, 3); },
    refuse() { tone(520, 0.42, "sawtooth", 0.07, 0, 300); noise(0.3, 0.12, 600, 300, "lowpass"); tone(200, 0.3, "sine", 0.12, 0, 120); },
    whinny() { tone(700, 0.5, "sawtooth", 0.05, 0, 1100); tone(900, 0.5, "triangle", 0.05, 0.05, 520); },
    splash() { noise(0.5, 0.26, 3000, 800, "bandpass", 0, 0.6); },
    bell() { [880, 1320].forEach((f) => tone(f, 1.1, "sine", 0.14)); tone(1760, 0.8, "sine", 0.05); },
    beep() { tone(660, 0.12, "square", 0.08); },
    go() { tone(990, 0.4, "square", 0.1); },
    cheer() { noise(1.3, 0.16, 1400, 700, "bandpass", 0, 0.4); noise(1.1, 0.12, 2200, 1000, "bandpass", 0.1, 0.5); },
    fanfare() { [[PENT[0], 0], [PENT[2], 0.12], [PENT[3], 0.24], [PENT[5], 0.38], [PENT[3], 0.56], [PENT[5], 0.68]].forEach(([f, t]) => tone(f, 0.32, "triangle", 0.14, t)); },
    sad() { [440, 392, 330].forEach((f, i) => tone(f, 0.3, "triangle", 0.1, i * 0.22)); },
    buy() { tone(784, 0.1, "triangle", 0.14); tone(1046, 0.1, "triangle", 0.14, 0.09); tone(1568, 0.25, "triangle", 0.14, 0.18); },
    nope() { tone(220, 0.18, "square", 0.08); tone(180, 0.22, "square", 0.08, 0.14); },
    munch() { noise(0.07, 0.2, 1800, 700, "bandpass", 0, 2); noise(0.06, 0.16, 1500, 600, "bandpass", 0.12, 2); },
    brush() { noise(0.12, 0.07, 3800, 2500, "bandpass", 0, 0.8); },
    equip() { tone(520, 0.06, "triangle", 0.1); tone(780, 0.09, "triangle", 0.1, 0.05); },
    unlock() { [PENT[1], PENT[3], PENT[4], PENT[5]].forEach((f, i) => tone(f, 0.22, "triangle", 0.12, i * 0.1)); },
  };

  function play(name, v) {
    if (!ctx || muted) return;
    const f = sounds[name];
    if (f) { try { f(v); } catch (e) { /* ignore */ } }
  }

  function hoofBeat(v) {
    const now = performance.now();
    if (now - lastHoof < 70) return;
    lastHoof = now;
    play("hoof", v);
  }

  return { init, play, hoofBeat, setMuted, get muted() { return muted; } };
})();
