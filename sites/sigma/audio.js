"use strict";
/* Sigma - ljud (syntetiserat med Web Audio, inga ljudfiler). */
const Sfx = (() => {
  let ctx = null, master = null, muted = false;

  function init() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.7;
      master.connect(ctx.destination);
    } catch (e) { ctx = null; }
  }
  function setMuted(m) { muted = m; if (master) master.gain.value = m ? 0 : 0.7; }

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
  const N = { C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784, C6: 1046.5 };

  return {
    init, setMuted,
    tap() { tone(520, 0.06, "triangle", 0.12); },
    select() { tone(660, 0.07, "triangle", 0.14); tone(880, 0.07, "triangle", 0.1, 0.05); },
    decide() { tone(220, 0.14, "sine", 0.3, 0, 140); tone(330, 0.1, "triangle", 0.12, 0.06); },
    good() { [N.C5, N.E5, N.G5].forEach((f, i) => tone(f, 0.22, "triangle", 0.18, i * 0.09)); },
    bad() { tone(220, 0.3, "sawtooth", 0.14, 0, 110); tone(165, 0.35, "triangle", 0.18, 0.12, 82); },
    up() { [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => tone(f, 0.32, "triangle", 0.2, i * 0.12)); tone(N.C6, 0.7, "sine", 0.12, 0.5); },
    up2() { [N.C5, N.E5, N.G5, N.C6, N.E5 * 2, N.G5 * 2].forEach((f, i) => tone(f, 0.3, "triangle", 0.18, i * 0.1)); },
    stay() { tone(N.G4, 0.2, "triangle", 0.16); tone(N.G4, 0.3, "triangle", 0.14, 0.22); },
    down() { [N.G4, N.E4, N.C4].forEach((f, i) => tone(f, 0.35, "triangle", 0.2, i * 0.18)); tone(110, 0.8, "sine", 0.18, 0.55, 80); },
    crisis() { for (let i = 0; i < 3; i++) { tone(880, 0.14, "square", 0.1, i * 0.22); tone(660, 0.14, "square", 0.1, i * 0.22 + 0.11); } },
    lift() { tone(110, 1.3, "sawtooth", 0.05, 0, 190); },
    win() { [N.C5, N.E5, N.G5, N.C6, N.G5, N.C6, N.E5 * 2].forEach((f, i) => tone(f, 0.4, "triangle", 0.2, i * 0.15)); tone(N.C6 * 1.5, 1.2, "sine", 0.14, 1.1); },
  };
})();
