// Syntetiskt ljud med WebAudio - inga ljudfiler.
import { store, rand } from './util.js';

let ctx = null, master, sfxBus, musicBus, comp, noiseBuf;
let muted = !!store('muted');
let musicOn = store('music') !== false;
let intensity = 0; // 0 meny/paus, 1 strid
let musicTimer = null, nextNote = 0, step = 0;
const listener = { x: 0, z: 0, yaw: 0 };

export function setListener(x, z, yaw) { listener.x = x; listener.z = z; listener.yaw = yaw; }

export function initAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  try {
    if (navigator.audioSession) navigator.audioSession.type = 'playback'; // iOS: ljud även i tyst-läge
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) { return; }
  comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14; comp.ratio.value = 6; comp.attack.value = 0.003; comp.release.value = 0.2;
  master = ctx.createGain(); master.gain.value = muted ? 0 : 0.9;
  sfxBus = ctx.createGain(); sfxBus.gain.value = 0.9;
  musicBus = ctx.createGain(); musicBus.gain.value = 0.0;
  sfxBus.connect(comp); musicBus.connect(comp); comp.connect(master); master.connect(ctx.destination);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  startAmbient();
  startMusic();
}
export function isMuted() { return muted; }
export function setMuted(m) {
  muted = m; store('muted', m);
  if (master) master.gain.setTargetAtTime(m ? 0 : 0.9, ctx.currentTime, 0.05);
}
export function isMusicOn() { return musicOn; }
export function setMusic(on) { musicOn = on; store('music', on); updateMusicGain(); }
export function setIntensity(v) { intensity = v; updateMusicGain(); }
function updateMusicGain() {
  if (musicBus) musicBus.gain.setTargetAtTime(musicOn ? 0.1 + 0.32 * intensity : 0, ctx.currentTime, 0.4);
}
export function suspendAudio() { if (ctx && ctx.state === 'running') ctx.suspend(); }
export function resumeAudio() { if (ctx && ctx.state === 'suspended') ctx.resume(); }

function spatial(x, z, base = 1) {
  if (x === undefined) return { pan: 0, vol: base };
  const dx = x - listener.x, dz = z - listener.z;
  const d = Math.hypot(dx, dz);
  // vinkel relativt blickriktning (kamera tittar mot -Z vid yaw 0)
  const fx = -Math.sin(listener.yaw), fz = -Math.cos(listener.yaw);
  const rxv = Math.cos(listener.yaw), rzv = -Math.sin(listener.yaw);
  const pan = d > 0.01 ? Math.max(-1, Math.min(1, (dx * rxv + dz * rzv) / d)) * 0.8 : 0;
  void fx; void fz;
  return { pan, vol: base / (1 + d * 0.12) };
}

function out(pan, vol) {
  const g = ctx.createGain();
  g.gain.value = vol;
  if (ctx.createStereoPanner) {
    const p = ctx.createStereoPanner(); p.pan.value = pan;
    g.connect(p); p.connect(sfxBus);
  } else g.connect(sfxBus);
  return g;
}
function noise(dur, type, f0, f1, q, g, t0 = 0) {
  const s = ctx.createBufferSource(); s.buffer = noiseBuf;
  s.loop = true;
  const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q;
  const t = ctx.currentTime + t0;
  f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const e = ctx.createGain();
  e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(1, t + 0.004); e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(e); e.connect(g);
  s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.05);
}
function tone(type, f0, f1, dur, g, vol = 1, t0 = 0, attack = 0.004) {
  const o = ctx.createOscillator(); o.type = type;
  const t = ctx.currentTime + t0;
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const e = ctx.createGain();
  e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(vol, t + attack); e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(e); e.connect(g);
  o.start(t); o.stop(t + dur + 0.05);
}

const ok = () => ctx && ctx.state === 'running' && !muted;

export const sfx = {
  rifle() { if (!ok()) return; const g = out(0, 0.55); noise(0.11, 'bandpass', 2600, 500, 0.8, g); tone('square', 220, 60, 0.09, g, 0.5); tone('sine', 140, 45, 0.12, g, 0.9); },
  shotgun() { if (!ok()) return; const g = out(0, 0.9); noise(0.35, 'lowpass', 3200, 160, 0.7, g); tone('sine', 120, 35, 0.3, g, 1.2); noise(0.08, 'highpass', 4000, 3000, 1, g); },
  plasma() { if (!ok()) return; const g = out(0, 0.6); tone('sawtooth', 1100, 140, 0.35, g, 0.5); tone('sine', 90, 40, 0.3, g, 1.1); noise(0.2, 'bandpass', 3000, 400, 1.2, g, 0); },
  dry() { if (!ok()) return; const g = out(0, 0.3); tone('square', 900, 700, 0.04, g, 0.4); },
  reload(d = 1.5) {
    if (!ok()) return; const g = out(0, 0.5);
    tone('square', 500, 300, 0.05, g, 0.5, 0.15); noise(0.08, 'highpass', 2500, 2000, 1, g, 0.15);
    tone('square', 380, 560, 0.06, g, 0.5, d * 0.6); noise(0.1, 'highpass', 2000, 1500, 1, g, d * 0.6);
    tone('square', 700, 260, 0.07, g, 0.6, d * 0.92);
  },
  swap() { if (!ok()) return; const g = out(0, 0.35); noise(0.07, 'bandpass', 1800, 900, 2, g); tone('square', 300, 200, 0.05, g, 0.4); },
  hit(head) { if (!ok()) return; const g = out(0, 0.45); tone('sine', head ? 1900 : 1200, head ? 1500 : 900, 0.07, g, 0.8); if (head) tone('sine', 2600, 2200, 0.09, g, 0.5, 0.03); },
  kill() { if (!ok()) return; const g = out(0, 0.5); tone('triangle', 700, 1500, 0.15, g, 0.8); tone('sine', 1400, 2100, 0.2, g, 0.5, 0.06); },
  enemyShot(x, z, heavy) { if (!ok()) return; const s = spatial(x, z, 0.5); const g = out(s.pan, s.vol); tone('sawtooth', heavy ? 500 : 800, 180, 0.18, g, 0.6); noise(0.1, 'bandpass', 2000, 600, 1, g); },
  enemyDie(x, z, big) { if (!ok()) return; const s = spatial(x, z, big ? 1 : 0.7); const g = out(s.pan, s.vol); noise(big ? 0.7 : 0.4, 'lowpass', 2400, 90, 0.8, g); tone('sine', big ? 90 : 160, 30, big ? 0.6 : 0.3, g, 1); tone('square', 600, 100, 0.25, g, 0.3); },
  explosion(x, z, vol = 1) { if (!ok()) return; const s = spatial(x, z, vol); const g = out(s.pan, s.vol); noise(1.0, 'lowpass', 1800, 50, 0.7, g); tone('sine', 80, 24, 0.9, g, 1.5); noise(0.2, 'highpass', 3500, 1500, 1, g); },
  hurt() { if (!ok()) return; const g = out(0, 0.7); tone('sawtooth', 220, 70, 0.25, g, 0.7); noise(0.2, 'lowpass', 900, 150, 1, g); },
  shieldBreak() { if (!ok()) return; const g = out(0, 0.6); tone('sawtooth', 900, 120, 0.45, g, 0.6); tone('square', 1500, 300, 0.3, g, 0.3); },
  shieldUp() { if (!ok()) return; const g = out(0, 0.3); tone('sine', 300, 900, 0.5, g, 0.6); },
  pickup(kind) { if (!ok()) return; const g = out(0, 0.5); const b = kind === 'health' ? 520 : 760; tone('triangle', b, b * 1.5, 0.12, g, 0.7); tone('triangle', b * 1.5, b * 2, 0.16, g, 0.7, 0.08); },
  step(sprint) { if (!ok()) return; const g = out(rand(-0.1, 0.1), sprint ? 0.2 : 0.14); noise(0.06, 'lowpass', 600, 200, 1, g); tone('sine', 90, 50, 0.07, g, 0.6); },
  jump() { if (!ok()) return; const g = out(0, 0.2); noise(0.12, 'lowpass', 500, 200, 1, g); },
  land() { if (!ok()) return; const g = out(0, 0.3); noise(0.1, 'lowpass', 500, 120, 1, g); tone('sine', 100, 40, 0.12, g, 0.8); },
  waveStart() { if (!ok()) return; const g = out(0, 0.5); for (let i = 0; i < 3; i++) { tone('sawtooth', 320, 520, 0.28, g, 0.4, i * 0.34); tone('square', 160, 260, 0.28, g, 0.3, i * 0.34); } },
  waveClear() { if (!ok()) return; const g = out(0, 0.5); [523, 659, 784, 1047].forEach((f, i) => tone('triangle', f, f, 0.35, g, 0.6, i * 0.1)); },
  spawn(x, z) { if (!ok()) return; const s = spatial(x, z, 0.6); const g = out(s.pan, s.vol); tone('sawtooth', 120, 500, 0.5, g, 0.35); noise(0.4, 'bandpass', 400, 2000, 2, g); },
  slam(x, z) { if (!ok()) return; const s = spatial(x, z, 1); const g = out(s.pan, s.vol); tone('sine', 70, 24, 0.5, g, 1.4); noise(0.4, 'lowpass', 900, 80, 1, g); },
  roar(x, z) { if (!ok()) return; const s = spatial(x, z, 0.9); const g = out(s.pan, s.vol); tone('sawtooth', 90, 55, 0.6, g, 0.7); tone('square', 70, 45, 0.6, g, 0.4); },
  ui() { if (!ok()) return; const g = out(0, 0.4); tone('triangle', 660, 990, 0.09, g, 0.6); },
  death() { if (!ok()) return; const g = out(0, 0.8); tone('sawtooth', 300, 30, 1.6, g, 0.8); noise(1.4, 'lowpass', 1200, 40, 1, g); },
};

function startAmbient() {
  const g = ctx.createGain(); g.gain.value = 0.07; g.connect(master);
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220; lp.connect(g);
  for (const f of [55, 55.4, 82.5]) {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(lp); o.start();
  }
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
  const lg = ctx.createGain(); lg.gain.value = 90; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
  const n = ctx.createBufferSource(); n.buffer = noiseBuf; n.loop = true;
  const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = 900; nf.Q.value = 0.5;
  const ng = ctx.createGain(); ng.gain.value = 0.012;
  n.connect(nf); nf.connect(ng); ng.connect(master); n.start();
}

// Liten stegsekvenserare: bas + arpeggio + hi-hat (A-moll, 112 bpm).
const BASS = [45, 45, 45, 45, 41, 41, 43, 43];
const ARP = [57, 60, 64, 67, 64, 60, 69, 67, 57, 60, 64, 67, 65, 64, 62, 60];
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
function startMusic() {
  nextNote = ctx.currentTime + 0.1;
  const spb = 60 / 112 / 4;
  musicTimer = setInterval(() => {
    if (!ctx || ctx.state !== 'running') { nextNote = ctx ? ctx.currentTime + 0.1 : 0; return; }
    while (nextNote < ctx.currentTime + 0.25) {
      playStep(step, nextNote);
      nextNote += spb; step++;
    }
  }, 60);
}
function mNote(type, freq, t, dur, vol, cutoff) {
  const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq;
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(cutoff, t); f.frequency.exponentialRampToValueAtTime(Math.max(80, cutoff * 0.25), t + dur);
  const e = ctx.createGain(); e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(vol, t + 0.01); e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(e); e.connect(musicBus);
  o.start(t); o.stop(t + dur + 0.05);
}
function playStep(s, t) {
  const bar = (s >> 4) & 7, i = s & 15;
  if (i % 2 === 0) mNote('sawtooth', mtof(BASS[bar] - 12 + (i % 8 === 6 ? 12 : 0)), t, 0.22, 0.5, 600);
  if (intensity > 0.5 || i % 4 === 0) mNote('square', mtof(ARP[i] + (bar >= 4 ? -2 : 0)), t, 0.14, 0.16, 2400);
  if (i % 4 === 0) { // kick
    const o = ctx.createOscillator(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    const e = ctx.createGain(); e.gain.setValueAtTime(0.9, t); e.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(e); e.connect(musicBus); o.start(t); o.stop(t + 0.2);
  }
  if (i % 2 === 1) { // hat
    const n = ctx.createBufferSource(); n.buffer = noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000;
    const e = ctx.createGain(); e.gain.setValueAtTime(0.18, t); e.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    n.connect(f); f.connect(e); e.connect(musicBus); n.start(t, Math.random()); n.stop(t + 0.06);
  }
}
