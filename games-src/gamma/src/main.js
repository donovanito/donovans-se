// GAMMA STATION - vågbaserad förstapersonsskjutare. Three.js, procedurell grafik, WebAudio.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { clamp, rand, pick, damp, store, TAU } from './util.js';
import { World, ARENA_R } from './physics.js';
import { buildWorld } from './world.js';
import { FX } from './fx.js';
import { Weapons, DEFS } from './weapons.js';
import { Enemy, TYPES } from './enemies.js';
import { glowTexture } from './textures.js';
import { input, initInput, requestLock, releaseLock, pollKeyboard, consumeLook, consumeEdges, resetInput, isTouchDevice } from './input.js';
import * as audio from './audio.js';
import { sfx } from './audio.js';

const $ = (id) => document.getElementById(id);
const hdr = (r, g, b) => new THREE.Color(r, g, b);

// ---------------------------------------------------------------- enhet och kvalitet
const touchDev = isTouchDevice();
document.body.classList.toggle('touch', touchDev);
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = window.navigator.standalone === true || matchMedia('(display-mode: fullscreen)').matches || matchMedia('(display-mode: standalone)').matches;
const lowCpu = (navigator.hardwareConcurrency || 8) <= 4;

const TIERS = [
  { name: 'Låg', bloom: false, shadows: false, shadowSize: 0, samples: 0, prCap: touchDev ? 1.0 : 1.25 },
  { name: 'Medel', bloom: true, shadows: true, shadowSize: 1024, samples: touchDev ? 0 : 2, prCap: touchDev ? 1.5 : 1.75 },
  { name: 'Hög', bloom: true, shadows: true, shadowSize: 2048, samples: 4, prCap: 2 },
];
const settings = {
  quality: store('quality') ?? 'auto',
  sens: store('sens') ?? 1,
  autoFire: store('autoFire') ?? true,
  assist: store('assist') ?? true,
};
let tier = settings.quality === 'auto' ? (touchDev || lowCpu ? 1 : 2) : clamp(+settings.quality, 0, 2);
let renderScale = 1;

// ---------------------------------------------------------------- renderer
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.autoClear = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, 1, 0.08, 2600);
camera.rotation.order = 'YXZ';
scene.add(camera);

const Q = { mobile: touchDev, aniso: Math.min(touchDev ? 4 : 8, renderer.capabilities.getMaxAnisotropy()), texSize: touchDev ? 512 : 1024 };
const phys = new World();
const world = buildWorld(scene, renderer, phys, Q);
const fx = new FX(scene, Q);
const weapons = new Weapons(scene.environment);
let composer = null, bloomPass = null;

function buildComposer() {
  if (composer) { composer.dispose(); composer = null; }
  const cfg = TIERS[tier];
  if (!cfg.bloom) return;
  const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: cfg.samples });
  composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const wp = new RenderPass(weapons.scene, weapons.camera);
  wp.clear = false; wp.clearDepth = true;
  composer.addPass(wp);
  bloomPass = new UnrealBloomPass(new THREE.Vector2(256, 256), touchDev ? 0.28 : 0.34, 0.4, 1.0);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  sizeComposer();
}
function sizeComposer() {
  if (!composer) return;
  composer.setPixelRatio(curPR);
  composer.setSize(innerWidth, innerHeight);
}

let curPR = 1;
function resize() {
  const w = innerWidth, h = innerHeight;
  curPR = Math.max(0.5, Math.min(devicePixelRatio || 1, TIERS[tier].prCap) * renderScale);
  renderer.setPixelRatio(curPR);
  renderer.setSize(w, h, false);
  const aspect = w / h;
  const vfov = clamp(2 * Math.atan(Math.tan((100 * Math.PI / 360)) / aspect) * 180 / Math.PI, 62, 98);
  camera.fov = vfov; camera.aspect = aspect; camera.updateProjectionMatrix();
  weapons.camera.aspect = aspect;
  weapons.camera.fov = clamp(2 * Math.atan(Math.tan(31 * Math.PI / 180) / aspect) * 180 / Math.PI, 46, 78);
  weapons.camera.updateProjectionMatrix();
  weapons.xScale = clamp(aspect / 1.7, 0.5, 1);
  fx.setScale(h * curPR, vfov);
  sizeComposer();
  const portrait = touchDev && w < 640 && h > w * 1.1;
  $('rotate').classList.toggle('show', portrait && mode !== 'loading');
  if (portrait && mode === 'playing') pauseGame(true);
}
function applyTier() {
  const cfg = TIERS[tier];
  world.setShadows(cfg.shadows, cfg.shadowSize);
  buildComposer();
  resize();
}

// ---------------------------------------------------------------- tillstånd
let mode = 'loading';
const player = {
  pos: new THREE.Vector3(0, 0, 11), vx: 0, vz: 0, vy: 0, yaw: 0, pitch: 0, eye: 1.7,
  hp: 100, maxHp: 100, shield: 50, maxShield: 50, lastHurt: -99, onGround: true, alive: true,
  bobT: 0, stepD: 0, recoilVis: 0, deadT: 0, lowFired: false,
};
const game = { score: 0, kills: 0, headshots: 0, shots: 0, hits: 0, wave: 0, combo: 0, comboT: 0, best: store('best') || { score: 0, wave: 0 }, time: 0, started: 0 };
const waveState = { phase: 'idle', timer: 0, queue: [], spawnT: 0, alive: 0 };
const enemies = [];
let shakeAmt = 0, shakeT = 0, boomT = 0, hitmarkT = 0, flashDmg = 0;
const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), tmpC = new THREE.Vector3(), tmpD = new THREE.Vector3();
const dirV = new THREE.Vector3(), rightV = new THREE.Vector3(), upV = new THREE.Vector3();
const COL_TRACER = hdr(0.6, 2.6, 3.2);

const ctx = {
  scene, world: phys, fx, sfx, player, enemies, wave: 1, time: 0, tmpA, tmpB,
  castShadow: TIERS[tier].shadows,
  spawnBolt: (o, d, sp, dmg, col, size) => spawnBolt(o, d, sp, dmg, col, size, 0),
  hurtPlayer: (a, from, knock) => hurtPlayer(a, from, knock),
  shake: (a) => { shakeAmt = Math.max(shakeAmt, a); },
  fireWeapon: (def, spread, muzzle) => fireWeapon(def, spread, muzzle),
  onAmmo: () => updateAmmoHud(true), onSwap: () => updateAmmoHud(true),
};

// ---------------------------------------------------------------- projektiler
const glowTex = glowTexture();
const bolts = [];
for (let i = 0; i < 48; i++) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false }));
  s.visible = false; scene.add(s);
  bolts.push({ s, active: false, pos: new THREE.Vector3(), vel: new THREE.Vector3(), dmg: 0, life: 0, kind: 0, size: 0.5, def: null });
}
function spawnBolt(o, d, speed, dmg, color, size, kind, def) {
  const b = bolts.find((x) => !x.active);
  if (!b) return;
  b.active = true; b.kind = kind; b.dmg = dmg; b.life = kind ? 3 : 4; b.size = size; b.def = def || null;
  b.pos.copy(o); b.vel.copy(d).multiplyScalar(speed);
  b.s.material.color.copy(color); b.s.scale.setScalar(size * 3.2);
  b.s.position.copy(o); b.s.visible = true;
}
function segSphere(a, b, cx, cy, cz, r) {
  const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
  const l2 = dx * dx + dy * dy + dz * dz;
  let t = l2 > 0 ? ((cx - a.x) * dx + (cy - a.y) * dy + (cz - a.z) * dz) / l2 : 0;
  t = clamp(t, 0, 1);
  const px = a.x + dx * t - cx, py = a.y + dy * t - cy, pz = a.z + dz * t - cz;
  return px * px + py * py + pz * pz <= r * r ? t : -1;
}
function updateBolts(dt) {
  for (const b of bolts) {
    if (!b.active) continue;
    b.life -= dt;
    tmpC.copy(b.pos);
    tmpD.copy(b.pos).addScaledVector(b.vel, dt);
    const len = b.vel.length() * dt;
    let hit = false;
    const nx = b.vel.x / (len / dt), ny = b.vel.y / (len / dt), nz = b.vel.z / (len / dt);
    const tw = phys.ray(tmpC.x, tmpC.y, tmpC.z, nx, ny, nz, len, true);
    if (b.kind === 0) {
      if (tw >= 0) {
        tmpD.copy(tmpC).addScaledVector(b.vel, dt * (tw / len));
        hit = true;
        tmpA.set(phys.hit.nx, phys.hit.ny, phys.hit.nz);
        fx.sparks(tmpD, tmpA, 6, true);
      } else {
        // spelaren som cylinder
        const P = player.pos;
        const t = segSphere(tmpC, tmpD, P.x, P.y + 1.2, P.z, 0.55);
        const t2 = segSphere(tmpC, tmpD, P.x, P.y + 0.6, P.z, 0.5);
        const t3 = segSphere(tmpC, tmpD, P.x, P.y + 1.5, P.z, 0.35);
        if ((t >= 0 || t2 >= 0 || t3 >= 0) && player.alive) {
          hurtPlayer(b.dmg, b.pos, 2.5); hit = true;
          fx.sparks(tmpD, tmpA.set(0, 0.4, 0), 8, true);
        }
      }
    } else {
      let bestT = tw >= 0 ? tw / len : 2, hitE = null;
      for (const e of enemies) {
        if (e.dead) continue;
        for (const s of e.hitSpheres) {
          const cx = e.pos.x + s[0], cy = e.pos.y + s[1], cz = e.pos.z + s[2];
          const t = segSphere(tmpC, tmpD, cx, cy, cz, s[3] + 0.2);
          if (t >= 0 && t < bestT) { bestT = t; hitE = e; }
        }
      }
      if (hitE || tw >= 0) {
        tmpD.copy(tmpC).addScaledVector(b.vel, dt * Math.min(1, bestT));
        hit = true;
        explodePlasma(tmpD, b.def);
      }
      fx.add.emit(b.pos.x, b.pos.y, b.pos.z, rand(-0.4, 0.4), rand(-0.4, 0.4), rand(-0.4, 0.4), 0.28, 0.35, 0.05, [2.4, 1.0, 0.25, 0.8], [1, 0.2, 0.05, 0], 0, 2);
      fx.add.emit(b.pos.x, b.pos.y, b.pos.z, 0, 0, 0, 0.08, 0.8, 0.5, [3.4, 1.8, 0.7, 0.9], [2, 0.6, 0.1, 0], 0, 0);
    }
    if (hit || b.life <= 0) { b.active = false; b.s.visible = false; continue; }
    b.pos.copy(tmpD);
    b.s.position.copy(b.pos);
    if (b.kind === 0 && Math.random() < 0.5) fx.add.emit(b.pos.x, b.pos.y, b.pos.z, 0, 0, 0, 0.15, 0.2, 0.02, [2.5, 0.5, 0.3, 0.6], [1, 0.1, 0.05, 0], 0, 3);
  }
}

// ---------------------------------------------------------------- stridslogik
function cameraBasis() {
  const cp = Math.cos(player.pitch), sp = Math.sin(player.pitch);
  dirV.set(-Math.sin(player.yaw) * cp, sp, -Math.cos(player.yaw) * cp);
  rightV.set(Math.cos(player.yaw), 0, -Math.sin(player.yaw));
  upV.crossVectors(rightV, dirV);
}

function findAssist(o, d, cone) {
  let best = null, bestA = cone;
  for (const e of enemies) {
    if (e.dead || e.spawnT > 0) continue;
    e.center(tmpA);
    tmpB.copy(tmpA).sub(o);
    const dist = tmpB.length();
    if (dist > 45) continue;
    tmpB.divideScalar(dist);
    const ang = Math.acos(clamp(tmpB.dot(d), -1, 1));
    const eff = ang - Math.atan2(e.T.radius * 0.8, dist);
    if (eff < bestA && phys.clear(o.x, o.y, o.z, tmpA.x, tmpA.y, tmpA.z)) { bestA = eff; best = e; }
  }
  return best;
}

function fireWeapon(def, spread, muzzleLocal) {
  cameraBasis();
  const o = tmpC.set(player.pos.x, player.pos.y + player.eye, player.pos.z);
  const origin = new THREE.Vector3().copy(o);
  const mz = new THREE.Vector3().copy(origin).addScaledVector(dirV, 0.9).addScaledVector(rightV, 0.24 * weapons.xScale).addScaledVector(upV, -0.17);
  game.shots++;
  const baseDir = new THREE.Vector3().copy(dirV);
  let assistT = null;
  if (input.isTouch && settings.assist) {
    assistT = findAssist(origin, baseDir, 0.085);
  }
  // ljud och rekyl
  if (def.id === 'rifle') sfx.rifle(); else if (def.id === 'shotgun') sfx.shotgun(); else sfx.plasma();
  player.pitch = clamp(player.pitch + def.kick * 0.0085 * (0.6 + Math.random() * 0.8), -1.5, 1.5);
  player.yaw += rand(-1, 1) * def.kick * 0.0028;
  player.recoilVis += def.kick * 0.012;
  shakeAmt = Math.max(shakeAmt, def.shake);
  fx.flash(mz, def.color, def.id === 'rifle' ? 0.7 : 1.4, 0.07);
  world.lights.muzzle.position.copy(mz);
  world.lights.muzzle.color.setRGB(def.color.r / 3, def.color.g / 3, def.color.b / 3).addScalar(0.35);
  world.lights.muzzle.intensity = def.id === 'rifle' ? 14 : 30;
  boomT = Math.max(boomT, 0); muzzleT = 0.06;

  for (let p = 0; p < def.pellets; p++) {
    const d = new THREE.Vector3().copy(baseDir);
    if (assistT) {
      assistT.center(tmpA); tmpB.copy(tmpA).sub(origin).normalize();
      d.lerp(tmpB, 0.6).normalize();
    }
    const ang = Math.random() * TAU, r = Math.sqrt(Math.random()) * spread;
    d.addScaledVector(rightV, Math.cos(ang) * r).addScaledVector(upV, Math.sin(ang) * r).normalize();
    if (def.kind === 'proj') {
      spawnBolt(mz, d, 42, def.dmg, def.color, 0.55, 1, def);
      continue;
    }
    hitscan(origin, mz, d, def, p);
  }
}

function hitscan(origin, muzzle, d, def, idx) {
  let tw = phys.ray(origin.x, origin.y, origin.z, d.x, d.y, d.z, 160, true);
  if (tw < 0) tw = 160;
  const nrm = tmpA.set(phys.hit.nx, phys.hit.ny, phys.hit.nz).clone();
  const kind = phys.hit.kind;
  let bestE = null, bestT = tw, mult = 1;
  for (const e of enemies) {
    if (e.dead) continue;
    const r = e.rayHit(origin.x, origin.y, origin.z, d.x, d.y, d.z, bestT);
    if (r && r[0] < bestT) { bestT = r[0]; bestE = e; mult = r[1]; }
  }
  const end = new THREE.Vector3().copy(origin).addScaledVector(d, bestT);
  if (def.pellets === 1 || idx < 4) fx.tracer(muzzle, end, COL_TRACER.clone().multiplyScalar(def.id === 'shotgun' ? 0.7 : 1), def.id === 'shotgun' ? 0.018 : 0.026, def.id === 'shotgun' ? 0.07 : 0.09);
  if (bestE) {
    let dmg = def.dmg * mult;
    if (def.id === 'shotgun') dmg *= 1 - clamp((bestT - 5) / 22, 0, 0.65);
    const head = mult >= 2;
    game.hits++;
    fx.sparks(end, tmpB.copy(d).negate(), head ? 10 : 5, true);
    damageEnemy(bestE, dmg, head, end);
  } else {
    const fac = kind === 'floor' || kind === 'wall' || kind === 'ceil' ? 1 : 1;
    fx.sparks(end, nrm, 4 * fac, false);
    if (idx < 5) { fx.decal(end, nrm, def.id === 'shotgun' ? 0.2 : 0.26); fx.puff(end, nrm, 1); }
  }
}

let muzzleT = 0;

function damageEnemy(e, dmg, head, p) {
  const was = e.hp;
  e.damage(dmg);
  showHit(e.dead ? 'kill' : head ? 'head' : '');
  if (!e.dead) sfx.hit(head);
  if (e.dead) killEnemy(e, head, was);
}

function explodePlasma(p, def) {
  fx.explosion(p, 1.15, [0.9, 0.55, 0.18]);
  world.lights.boom.position.copy(p).y = Math.max(1, p.y);
  world.lights.boom.intensity = 160; boomT = 0.28;
  sfx.explosion(p.x, p.z, 1);
  const dp = Math.hypot(p.x - player.pos.x, p.z - player.pos.z);
  shakeAmt = Math.max(shakeAmt, clamp(0.5 - dp * 0.03, 0.05, 0.5));
  const R = def.radius;
  for (const e of enemies) {
    if (e.dead) continue;
    e.center(tmpB);
    const d = tmpB.distanceTo(p) - e.T.radius * 0.6;
    if (d < R) {
      const dmg = def.dmg * (1 - 0.65 * clamp(d / R, 0, 1));
      game.hits++;
      damageEnemy(e, dmg, false, p);
    }
  }
}

function showHit(kind) {
  const h = $('hitmark');
  h.className = 'on' + (kind ? ' ' + kind : '');
  hitmarkT = kind === 'kill' ? 0.35 : 0.14;
}

// ---------------------------------------------------------------- dödande, poäng, drops
const feedEl = $('feed');
function feed(text, cls = '') {
  const d = document.createElement('div'); d.textContent = text; if (cls) d.className = cls;
  feedEl.appendChild(d);
  while (feedEl.children.length > 4) feedEl.removeChild(feedEl.firstChild);
  setTimeout(() => d.remove(), 2500);
}

function killEnemy(e, head, hpBefore) {
  e.dead = true;
  game.kills++;
  if (head) game.headshots++;
  game.combo++; game.comboT = 4.2;
  const mult = 1 + Math.min(game.combo - 1, 12) * 0.1;
  let pts = Math.round(e.T.score * mult * (head ? 1.5 : 1));
  game.score += pts;
  feed(`+${pts}  ${e.T.name.toUpperCase()}${head ? '  HUVUDSKOTT' : ''}`, head ? 'head' : e.type === 'brute' ? 'big' : '');
  e.center(tmpA);
  const big = e.type === 'brute' ? 1.9 : e.type === 'trooper' ? 0.95 : 0.7;
  fx.explosion(tmpA, big, e.type === 'drone' ? [1, 0.35, 0.2] : [1, 0.55, 0.2]);
  fx.gibs(tmpA, e.type === 'brute' ? 16 : e.type === 'trooper' ? 9 : 5, e.type === 'brute' ? 0.35 : 0.2);
  sfx.enemyDie(e.pos.x, e.pos.z, e.type === 'brute');
  sfx.kill();
  if (e.type === 'brute') { shakeAmt = Math.max(shakeAmt, 0.3); world.lights.boom.position.copy(tmpA); world.lights.boom.intensity = 90; boomT = 0.3; }
  // drops
  const needHp = player.hp < 70 ? 1.8 : 1;
  const lowAmmo = weapons.lowAmmo() ? 2.2 : 1;
  const base = e.type === 'brute' ? 1 : e.type === 'trooper' ? 0.3 : 0.14;
  if (Math.random() < base * needHp * 0.8) spawnPickup('health', e.pos.x, e.pos.z);
  if (Math.random() < base * lowAmmo * 1.1) spawnPickup('ammo', e.pos.x + rand(-1, 1), e.pos.z + rand(-1, 1));
  if (e.type === 'brute') spawnPickup('ammo', e.pos.x + 1, e.pos.z + 1);
}

const pickups = [];
function makePickup(kind) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.36), new THREE.MeshStandardMaterial({ color: 0x2c333d, metalness: 0.8, roughness: 0.4 }));
  g.add(body);
  const col = kind === 'health' ? hdr(0.4, 3.2, 1.2) : hdr(3.2, 1.8, 0.3);
  const mat = new THREE.MeshBasicMaterial({ color: col, toneMapped: false });
  if (kind === 'health') {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.38), mat), b = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.38), mat);
    g.add(a, b);
  } else {
    for (let i = -1; i <= 1; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.26, 0.38), mat); m.position.x = i * 0.13; g.add(m); }
  }
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: col, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6, toneMapped: false }));
  s.scale.setScalar(1.8); g.add(s);
  g.visible = false; scene.add(g);
  return { g, kind, active: false, life: 0, ph: 0, x: 0, z: 0 };
}
for (let i = 0; i < 8; i++) pickups.push(makePickup('health'));
for (let i = 0; i < 8; i++) pickups.push(makePickup('ammo'));
function spawnPickup(kind, x, z) {
  const p = pickups.find((q) => !q.active && q.kind === kind);
  if (!p) return;
  const pos = { x, z }; phys.resolve(pos, 0.5, 0);
  p.active = true; p.life = 28; p.ph = rand(0, 6); p.x = pos.x; p.z = pos.z; p.g.visible = true;
  p.g.position.set(pos.x, 0.6, pos.z);
  fx.flash(tmpA.set(pos.x, 0.7, pos.z), p.kind === 'health' ? hdr(0.4, 2.5, 1) : hdr(2.5, 1.6, 0.3), 2.4, 0.4);
}
let emergT = 0;
function updatePickups(dt) {
  // nödförsörjning: är allt tomt dyker det upp ammunition nära spelaren
  if (player.alive && weapons.totalAmmo() === 0) {
    emergT += dt;
    if (emergT > 4 && !pickups.some((p) => p.active && p.kind === 'ammo')) {
      const a = Math.random() * TAU, r = rand(3, 6);
      spawnPickup('ammo', player.pos.x + Math.cos(a) * r, player.pos.z + Math.sin(a) * r); emergT = 0;
      feed('NÖDLEVERANS - AMMUNITION', 'good');
    }
  } else emergT = 0;
  for (const p of pickups) {
    if (!p.active) continue;
    p.life -= dt; p.ph += dt;
    p.g.rotation.y += dt * 1.8;
    p.g.position.y = 0.65 + Math.sin(p.ph * 2.4) * 0.12;
    p.g.visible = p.life > 5 || Math.floor(p.life * 6) % 2 === 0;
    if (p.life <= 0) { p.active = false; p.g.visible = false; continue; }
    const dx = player.pos.x - p.x, dz = player.pos.z - p.z;
    if (player.alive && dx * dx + dz * dz < 1.9 * 1.9) {
      if (p.kind === 'health') {
        if (player.hp >= player.maxHp && player.shield >= player.maxShield) continue;
        player.hp = Math.min(player.maxHp, player.hp + 30); player.shield = Math.min(player.maxShield, player.shield + 15);
        feed('+30 HULL', 'good');
      } else {
        weapons.addAmmo(); feed('+AMMUNITION', 'good'); updateAmmoHud(true);
      }
      sfx.pickup(p.kind); p.active = false; p.g.visible = false;
    }
  }
}

// ---------------------------------------------------------------- spelaren
function hurtPlayer(amount, from, knock = 0) {
  if (!player.alive || mode !== 'playing') return;
  let rem = amount;
  const hadShield = player.shield > 0;
  if (player.shield > 0) { const a = Math.min(player.shield, rem); player.shield -= a; rem -= a; if (player.shield <= 0 && hadShield) sfx.shieldBreak(); }
  player.hp -= rem;
  player.lastHurt = game.time;
  flashDmg = Math.min(1, flashDmg + amount / 30);
  shakeAmt = Math.max(shakeAmt, clamp(amount / 40, 0.1, 0.6));
  sfx.hurt();
  if (from) {
    const dx = from.x - player.pos.x, dz = from.z - player.pos.z, d = Math.hypot(dx, dz) || 1;
    // riktning relativt blicken
    const ang = Math.atan2(dx, -dz) + player.yaw; // 0 = rakt fram
    const el = document.createElement('div'); el.className = 'dd';
    el.style.transform = `rotate(${(-ang * 180 / Math.PI + 0).toFixed(1)}deg)`;
    $('dmgDirs').appendChild(el); setTimeout(() => el.remove(), 1000);
    if (knock) { player.vx -= (dx / d) * knock; player.vz -= (dz / d) * knock; }
  }
  if (player.hp <= 0) { player.hp = 0; die(); }
}

function die() {
  player.alive = false; player.deadT = 0;
  sfx.death();
  audio.setIntensity(0);
  setTimeout(showGameOver, 1700);
}

function updatePlayer(dt) {
  const look = consumeLook();
  const sens = (input.isTouch ? 0.0042 : 0.0022) * settings.sens;
  let lookDX = look.x, lookDY = look.y;
  if (player.alive) {
    let k = sens;
    if (input.isTouch && settings.assist) { // friktion när siktet är nära en fiende
      cameraBasis();
      tmpD.set(player.pos.x, player.pos.y + player.eye, player.pos.z);
      if (findAssist(tmpD, dirV, 0.05)) k *= 0.6;
    }
    player.yaw -= lookDX * k;
    player.pitch = clamp(player.pitch - lookDY * k, -1.45, 1.45);
  }
  pollKeyboard();
  const edges = consumeEdges();

  let moveSpeed = 0;
  if (player.alive) {
    const sprint = input.sprint && input.my > 0.2 && player.shield >= 0;
    const top = sprint ? 7.6 : 5.4;
    const fx_ = -Math.sin(player.yaw), fz_ = -Math.cos(player.yaw), rx_ = Math.cos(player.yaw), rz_ = -Math.sin(player.yaw);
    const wx = fx_ * input.my + rx_ * input.mx, wz = fz_ * input.my + rz_ * input.mx;
    const acc = player.onGround ? 14 : 3.5;
    player.vx = damp(player.vx, wx * top, acc, dt);
    player.vz = damp(player.vz, wz * top, acc, dt);
    if (edges.jump && player.onGround) { player.vy = 6.4; player.onGround = false; sfx.jump(); }
    player.vy -= 17 * dt;
    player.pos.y += player.vy * dt;
    if (player.pos.y <= 0) {
      if (!player.onGround && player.vy < -4) { sfx.land(); shakeAmt = Math.max(shakeAmt, 0.06); }
      player.pos.y = 0; player.vy = 0; player.onGround = true;
    }
    player.pos.x += player.vx * dt; player.pos.z += player.vz * dt;
    phys.resolve(player.pos, 0.42, player.pos.y);
    moveSpeed = Math.hypot(player.vx, player.vz);
    if (player.onGround && moveSpeed > 1) {
      player.stepD += moveSpeed * dt;
      if (player.stepD > (sprint ? 2.3 : 1.9)) { player.stepD = 0; sfx.step(sprint); }
    }
    player.bobT += dt * moveSpeed * 1.6;
    // sköld återhämtas
    if (game.time - player.lastHurt > 4.5 && player.shield < player.maxShield) {
      if (player.shield <= 0) sfx.shieldUp();
      player.shield = Math.min(player.maxShield, player.shield + dt * 16);
    }
  } else {
    player.deadT += dt;
  }

  // vapen
  let wantFire = input.fire && player.alive;
  if (input.isTouch && settings.autoFire && player.alive) {
    cameraBasis();
    tmpD.set(player.pos.x, player.pos.y + player.eye, player.pos.z);
    if (aimedEnemy(tmpD, dirV, 0.04)) wantFire = true;
  }
  weapons.update(dt, ctx, wantFire && mode === 'playing', player.alive ? edges : { select: -1, swapDir: 0, reload: false }, moveSpeed, { x: lookDX, y: lookDY }, player.onGround);
  return moveSpeed;
}

function aimedEnemy(o, d, slack) {
  // true om en fiende ligger nära siktlinjen och ingenting skymmer
  for (const e of enemies) {
    if (e.dead || e.spawnT > 0) continue;
    e.center(tmpA);
    tmpB.copy(tmpA).sub(o);
    const dist = tmpB.length(); if (dist > 40) continue;
    tmpB.divideScalar(dist);
    const ang = Math.acos(clamp(tmpB.dot(d), -1, 1)) - Math.atan2(e.T.radius * 0.7, dist);
    if (ang < slack && phys.clear(o.x, o.y, o.z, tmpA.x, tmpA.y, tmpA.z)) return true;
  }
  return false;
}

function updateCamera(dt, moveSpeed) {
  const bob = player.alive && player.onGround ? Math.sin(player.bobT) * 0.03 * clamp(moveSpeed / 5, 0, 1.4) : 0;
  let y = player.pos.y + player.eye + bob;
  let roll = 0;
  if (!player.alive) { y = Math.max(0.35, player.eye - player.deadT * 2.2) + player.pos.y; roll = Math.min(0.9, player.deadT * 1.2); }
  shakeAmt = Math.max(0, shakeAmt - dt * 1.8);
  const sh = shakeAmt * shakeAmt;
  player.recoilVis = Math.max(0, player.recoilVis - dt * 0.35);
  camera.position.set(player.pos.x + rand(-1, 1) * sh * 0.05, y + rand(-1, 1) * sh * 0.05, player.pos.z + rand(-1, 1) * sh * 0.05);
  camera.rotation.set(player.pitch + rand(-1, 1) * sh * 0.03, player.yaw + rand(-1, 1) * sh * 0.03, roll + rand(-1, 1) * sh * 0.02);
  weapons.camera.position.set(0, 0, 0);
}

// ---------------------------------------------------------------- vågor
function composeWave(w) {
  let budget = Math.floor(6 + w * 3.4);
  const list = [];
  let brutes = 0;
  const maxBrutes = Math.min(5, Math.floor((w - 1) / 2));
  while (budget > 0) {
    const r = Math.random();
    let t = 'drone';
    if (w >= 3 && brutes < maxBrutes && budget >= 6 && r < 0.18) { t = 'brute'; brutes++; }
    else if (r < 0.52 + Math.min(0.1, w * 0.01) && budget >= 2) t = 'trooper';
    else t = 'drone';
    budget -= TYPES[t].cost;
    list.push(t);
  }
  // bruten kommer sist och blandas inte i första sekunden
  list.sort((a, b) => (a === 'brute') - (b === 'brute') + (Math.random() - 0.5) * 0.4);
  return list;
}
function startWave() {
  game.wave++;
  ctx.wave = game.wave;
  waveState.queue = composeWave(game.wave);
  waveState.phase = 'fight'; waveState.spawnT = 1.2; waveState.total = waveState.queue.length;
  banner(`VÅG ${game.wave}`, game.wave === 1 ? 'FÖRSVARA REAKTORN' : `${waveState.queue.length} FIENDER INKOMMANDE`);
  sfx.waveStart();
  audio.setIntensity(1);
}
function banner(t, s) {
  $('bannerT').textContent = t; $('bannerS').textContent = s;
  const b = $('banner'); b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}
function spawnTick(dt) {
  const cap = Math.min(touchDev ? 11 : 15, Math.round(4 + game.wave * 1.5));
  const alive = enemies.filter((e) => !e.dead).length;
  waveState.alive = alive;
  if (waveState.phase === 'fight') {
    if (waveState.queue.length) {
      waveState.spawnT -= dt;
      if (waveState.spawnT <= 0 && alive < cap) {
        const t = waveState.queue.shift();
        // välj en port som inte är för nära spelaren, helst med blick mot spelaren
        const cands = world.portals.filter((p) => Math.hypot(p.pos.x - player.pos.x, p.pos.z - player.pos.z) > 15);
        const portal = pick(cands.length ? cands : world.portals);
        portal.glow = 1.3;
        const e = new Enemy(t, portal, ctx, game.wave);
        enemies.push(e);
        sfx.spawn(portal.pos.x, portal.pos.z);
        waveState.spawnT = Math.max(0.45, 1.5 - game.wave * 0.07);
      }
    } else if (alive === 0) {
      waveState.phase = 'clear'; waveState.timer = 6;
      const bonus = 250 * game.wave;
      game.score += bonus;
      banner('VÅG KLAR', `BONUS +${bonus}`);
      sfx.waveClear();
      audio.setIntensity(0.2);
      player.hp = Math.min(player.maxHp, player.hp + 25);
      spawnPickup('health', player.pos.x + 2, player.pos.z - 2);
      spawnPickup('ammo', player.pos.x - 2, player.pos.z - 2);
      if (game.wave % 2 === 0) spawnPickup('ammo', player.pos.x, player.pos.z - 3.5);
    }
  } else if (waveState.phase === 'clear') {
    waveState.timer -= dt;
    if (waveState.timer <= 0) startWave();
  } else if (waveState.phase === 'start') {
    waveState.timer -= dt;
    if (waveState.timer <= 0) startWave();
  }
}

// ---------------------------------------------------------------- HUD
const H = {
  hp: $('hpFill'), hpT: $('hpTxt'), sh: $('shFill'), shT: $('shTxt'), score: $('score'), combo: $('combo'),
  wave: $('waveLbl'), left: $('leftLbl'), name: $('wpnName'), mag: $('ammoMag'), res: $('ammoRes'), ammo: $('ammo'),
  reload: $('reloadBar'), reloadF: $('reloadFill'), cross: $('cross'), dmg: $('dmgFlash'), low: $('lowhp'), slots: [...document.querySelectorAll('#slots i')], swapLbl: $('swapLbl'),
  hpBar: document.querySelector('.bar.hp'), radar: $('radar'),
};
const hudCache = {};
function setText(el, key, v) { if (hudCache[key] !== v) { hudCache[key] = v; el.textContent = v; } }
function updateAmmoHud(force) {
  const d = weapons.def(), s = weapons.state();
  setText(H.name, 'wn', d.name); setText(H.mag, 'mag', String(s.mag)); setText(H.res, 'res', '/ ' + s.reserve);
  H.ammo.classList.toggle('low', s.mag <= Math.ceil(d.mag * 0.25));
  H.slots.forEach((el, i) => el.classList.toggle('on', i === weapons.cur));
  setText(H.swapLbl, 'sw', String(weapons.cur + 1));
}
let radarT = 0;
function updateHud(dt, moveSpeed) {
  const hpP = player.hp / player.maxHp;
  H.hp.style.transform = `scaleX(${hpP.toFixed(3)})`; setText(H.hpT, 'hpT', Math.ceil(player.hp));
  H.sh.style.transform = `scaleX(${(player.shield / player.maxShield).toFixed(3)})`; setText(H.shT, 'shT', Math.ceil(player.shield));
  H.hpBar.classList.toggle('low', hpP < 0.3);
  setText(H.score, 'score', game.score.toLocaleString('sv-SE'));
  const mult = 1 + Math.min(game.combo - 1, 12) * 0.1;
  setText(H.combo, 'combo', game.combo > 1 ? `KOMBO x${mult.toFixed(1)}` : '');
  setText(H.wave, 'wave', `VÅG ${game.wave || 1}`);
  const left = waveState.queue.length + enemies.filter((e) => !e.dead).length;
  setText(H.left, 'left', waveState.phase === 'clear' ? 'KLART' : waveState.phase === 'start' ? 'GÖR DIG REDO' : `${left} kvar`);
  updateAmmoHud();
  if (weapons.reloadT > 0) {
    H.reload.classList.add('on'); H.reloadF.style.transform = `scaleX(${(1 - weapons.reloadT / weapons.def().reload).toFixed(3)})`;
  } else H.reload.classList.remove('on');
  H.dmg.style.opacity = flashDmg.toFixed(2);
  flashDmg = Math.max(0, flashDmg - dt * 1.6);
  H.low.style.opacity = hpP < 0.3 && player.alive ? '1' : '0';
  // sikte
  const d = weapons.def();
  const spread = d.spread + weapons.heat * d.maxBloom + clamp(moveSpeed / 6, 0, 1) * 0.012;
  const px = 6 + spread * innerHeight * 0.9;
  H.cross.style.setProperty('--sp', px.toFixed(1) + 'px');
  hitmarkT -= dt;
  if (hitmarkT <= 0 && $('hitmark').classList.contains('on')) $('hitmark').className = 'off';
  radarT -= dt;
  if (radarT <= 0) { radarT = 0.07; drawRadar(); }
}
const radarCtx = H.radar.getContext('2d');
function drawRadar() {
  const c = radarCtx, W = H.radar.width, R = W / 2 - 4, sc = R / (ARENA_R + 2);
  c.clearRect(0, 0, W, W);
  c.save(); c.translate(W / 2, W / 2);
  c.strokeStyle = 'rgba(53,224,255,0.35)'; c.lineWidth = 1;
  c.beginPath(); c.arc(0, 0, R, 0, TAU); c.stroke();
  c.beginPath(); c.arc(0, 0, R * 0.5, 0, TAU); c.stroke();
  c.rotate(player.yaw);
  c.fillStyle = 'rgba(53,224,255,0.5)'; c.beginPath(); c.arc(-player.pos.x * sc, -player.pos.z * sc, 4 * sc * 1.2, 0, TAU); c.fill(); // reaktorn (relativt spelaren)
  for (const e of enemies) {
    if (e.dead) continue;
    const x = (e.pos.x - player.pos.x) * sc, z = (e.pos.z - player.pos.z) * sc;
    if (Math.hypot(x, z) > R) continue;
    c.fillStyle = e.type === 'brute' ? '#ff9a2a' : '#ff3b4e';
    const r = e.type === 'brute' ? 4 : e.type === 'drone' ? 2.6 : 3;
    c.beginPath(); c.arc(x, z, r, 0, TAU); c.fill();
  }
  for (const p of pickups) {
    if (!p.active) continue;
    const x = (p.x - player.pos.x) * sc, z = (p.z - player.pos.z) * sc;
    if (Math.hypot(x, z) > R) continue;
    c.fillStyle = p.kind === 'health' ? '#5dffa0' : '#ffd24a'; c.fillRect(x - 2, z - 2, 4, 4);
  }
  c.restore();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(W / 2, W / 2 - 7); c.lineTo(W / 2 + 5, W / 2 + 5); c.lineTo(W / 2 - 5, W / 2 + 5); c.fill();
}

// ---------------------------------------------------------------- skärmar och flöde
function show(id, on = true) { $(id).classList.toggle('show', on); }
function hideAll() { ['start', 'pause', 'settings', 'over', 'loading'].forEach((s) => show(s, false)); }
let settingsReturn = 'start';

function bestLine() {
  const b = game.best;
  return b.score ? `REKORD ${b.score.toLocaleString('sv-SE')} POÄNG · VÅG ${b.wave}` : '';
}

function startGame() {
  audio.initAudio();
  audio.resumeAudio();
  sfx.ui();
  hideAll();
  for (const e of enemies) e.dispose(scene);
  enemies.length = 0;
  bolts.forEach((b) => { b.active = false; b.s.visible = false; });
  pickups.forEach((p) => { p.active = false; p.g.visible = false; });
  Object.assign(player, { hp: 100, shield: 50, vx: 0, vz: 0, vy: 0, yaw: 0, pitch: 0, alive: true, lastHurt: -99, onGround: true, deadT: 0, recoilVis: 0 });
  player.pos.set(0, 0, 11);
  Object.assign(game, { score: 0, kills: 0, headshots: 0, shots: 0, hits: 0, wave: 0, combo: 0, comboT: 0, time: 0, started: performance.now() });
  ctx.wave = 1;
  weapons.reset(); resetInput();
  waveState.phase = 'start'; waveState.timer = 3.2; waveState.queue = [];
  $('hud').hidden = false;
  $('touch').hidden = !touchDev;
  feedEl.innerHTML = '';
  mode = 'playing';
  banner('GAMMA STATION', 'REAKTORN MÅSTE HÅLLA');
  audio.setIntensity(0.3);
  updateAmmoHud(true);
  requestLock();
  const kh = $('kbdHint'); kh.style.animation = 'none'; void kh.offsetWidth; kh.style.animation = '';
}

function pauseGame(auto) {
  if (mode !== 'playing') return;
  mode = 'paused';
  releaseLock(); resetInput();
  show('pause', true);
  $('touch').hidden = true;
  audio.setIntensity(0);
}
function resumeGame() {
  if (mode !== 'paused') return;
  if ($('rotate').classList.contains('show')) return;
  hideAll();
  mode = 'playing';
  $('touch').hidden = !touchDev;
  audio.resumeAudio(); audio.setIntensity(waveState.phase === 'fight' ? 1 : 0.3);
  requestLock();
}
function quitToMenu() {
  mode = 'menu';
  releaseLock(); resetInput();
  $('hud').hidden = true; $('touch').hidden = true;
  hideAll(); show('start', true);
  $('bestLine').textContent = bestLine();
  audio.setIntensity(0);
  for (const e of enemies) e.dispose(scene);
  enemies.length = 0;
  bolts.forEach((b) => { b.active = false; b.s.visible = false; });
}
function showGameOver() {
  if (mode !== 'playing') return;
  mode = 'dead';
  releaseLock(); resetInput();
  $('touch').hidden = true;
  const newBest = game.score > (game.best.score || 0);
  if (newBest) { game.best = { score: game.score, wave: game.wave }; store('best', game.best); }
  const secs = Math.round((performance.now() - game.started) / 1000);
  const acc = game.shots ? Math.round((game.hits / game.shots) * 100) : 0;
  $('overT').textContent = game.wave >= 8 ? 'EN LEGEND FALLER' : 'STATIONEN FALLER';
  $('overStats').innerHTML = [
    ['POÄNG', game.score.toLocaleString('sv-SE')], ['VÅG', game.wave], ['FÄLLDA ROBOTAR', game.kills], ['HUVUDSKOTT', game.headshots],
    ['TRÄFFSÄKERHET', acc + '%'], ['TID', `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`],
  ].map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join('');
  $('overBest').textContent = newBest ? 'NY REKORD!' : bestLine();
  show('over', true);
}

function openSettings(from) {
  settingsReturn = from;
  show(from, false); show('settings', true);
  $('setQuality').value = String(settings.quality);
  $('setSens').value = settings.sens;
  $('setSound').checked = !audio.isMuted();
  $('setMusic').checked = audio.isMusicOn();
  $('setAuto').checked = settings.autoFire;
  $('setAssist').checked = settings.assist;
  updateQNote();
}
function updateQNote() { $('qNote').textContent = `Aktuell grafiknivå: ${TIERS[tier].name} · upplösning ${Math.round(renderScale * 100)}%. Auto sänker kvaliteten själv om spelet laggar.`; }

function wireUI() {
  $('btnPlay').onclick = startGame;
  $('btnAgain').onclick = startGame;
  $('btnMenu').onclick = quitToMenu;
  $('btnResume').onclick = resumeGame;
  $('btnQuit').onclick = quitToMenu;
  $('btnSettings').onclick = () => { audio.initAudio(); openSettings('start'); };
  $('btnSettings2').onclick = () => openSettings('pause');
  $('btnSetBack').onclick = () => { show('settings', false); show(settingsReturn, true); };
  $('btnPause').onclick = () => pauseGame();
  $('btnMute').onclick = () => { audio.setMuted(!audio.isMuted()); muteIcon(); };
  $('setQuality').onchange = (e) => {
    settings.quality = e.target.value; store('quality', settings.quality);
    tier = settings.quality === 'auto' ? (touchDev || lowCpu ? 1 : 2) : +settings.quality;
    renderScale = 1; ctx.castShadow = TIERS[tier].shadows; applyTier(); updateQNote();
  };
  $('setSens').oninput = (e) => { settings.sens = +e.target.value; store('sens', settings.sens); };
  $('setSound').onchange = (e) => { audio.setMuted(!e.target.checked); muteIcon(); };
  $('setMusic').onchange = (e) => audio.setMusic(e.target.checked);
  $('setAuto').onchange = (e) => { settings.autoFire = e.target.checked; store('autoFire', settings.autoFire); };
  $('setAssist').onchange = (e) => { settings.assist = e.target.checked; store('assist', settings.assist); };
  document.addEventListener('visibilitychange', () => { if (document.hidden) { pauseGame(true); audio.suspendAudio(); } else audio.resumeAudio(); });
  window.addEventListener('blur', () => { if (touchDev) pauseGame(true); });
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(() => { resize(); const r = $('rotate'); if (!r.classList.contains('show') && mode === 'paused' && $('pause').classList.contains('show')) { /* spelaren trycker Fortsätt */ } }, 300));
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && mode === 'playing' && !input.locked) pauseGame();
    if (e.code === 'Enter' && mode === 'menu') startGame();
    if (e.code === 'KeyM') { audio.setMuted(!audio.isMuted()); muteIcon(); }
  });
  $('ctlHelp').innerHTML = touchDev
    ? '<div><b>VÄNSTER TUMME</b> - gå (skjut spaken framåt för att springa)</div><div><b>HÖGER TUMME</b> - dra för att sikta, tryck <b>ELD</b> för att skjuta (dra från knappen för att sikta samtidigt)</div><div><b>SIKTET PÅ FIENDE</b> - skjuter automatiskt och hjälper till att sikta</div>'
    : '<div><b>WASD</b> gå · <b>MUS</b> sikta · <b>VÄNSTERKLICK</b> skjut · <b>R</b> ladda om</div><div><b>1 / 2 / 3</b> eller <b>MUSHJUL</b> byt vapen · <b>SHIFT</b> spring · <b>MELLANSLAG</b> hoppa · <b>ESC</b> paus</div>';
  $('installHint').hidden = !(isIOS && !standalone);
  muteIcon();
}
function muteIcon() {
  const m = audio.isMuted();
  $('btnMute').innerHTML = m
    ? '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
}

// ---------------------------------------------------------------- huvudloop
let frames = 0;
let last = performance.now(), fpsAcc = 0, fpsN = 0, perfT = 0, goodT = 0, menuT = 0;
let onFrame = null;

function step(dt) {
  if (mode === 'playing' || mode === 'dead') {
    game.time += dt; ctx.time = game.time;
    const moveSpeed = updatePlayer(dt);
    if (mode === 'playing' || mode === 'dead') {
      if (player.alive) { game.comboT -= dt; if (game.comboT <= 0) game.combo = 0; }
      spawnTick(player.alive ? dt : 0);
      for (const e of enemies) e.update(dt, ctx);
      for (let i = enemies.length - 1; i >= 0; i--) if (enemies[i].dead) { enemies[i].dispose(scene); enemies.splice(i, 1); }
      updateBolts(dt);
      updatePickups(dt);
    }
    updateCamera(dt, moveSpeed);
    audio.setListener(player.pos.x, player.pos.z, player.yaw);
    updateHud(dt, moveSpeed);
  } else if (mode === 'menu' || mode === 'loading') {
    menuT += dt;
    const a = menuT * 0.08 + 0.6;
    camera.position.set(Math.cos(a) * 15, 2.6 + Math.sin(menuT * 0.3) * 0.4, Math.sin(a) * 15);
    camera.lookAt(Math.cos(a + 0.9) * 2, 2.8, Math.sin(a + 0.9) * 2);
  }
  if (mode !== 'paused') {
    world.update(performance.now() / 1000, dt);
    fx.update(dt);
    if (boomT > 0) { boomT -= dt; world.lights.boom.intensity *= Math.pow(0.001, dt / 0.28); if (boomT <= 0) world.lights.boom.intensity = 0; }
    if (muzzleT > 0) { muzzleT -= dt; if (muzzleT <= 0) world.lights.muzzle.intensity = 0; }
  }
}

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (dt <= 0) return;
  frames++;
  const rawDt = dt;
  step(dt);

  // rendera
  const showWeapon = mode === 'playing' || mode === 'dead' || mode === 'paused';
  if (composer) {
    composer.passes[1].enabled = showWeapon;
    composer.render(dt);
  } else {
    renderer.clear();
    renderer.render(scene, camera);
    if (showWeapon) { renderer.clearDepth(); renderer.render(weapons.scene, weapons.camera); }
  }

  // automatisk kvalitetsjustering
  fpsAcc += rawDt; fpsN++;
  perfT += rawDt;
  if (perfT > 1.5 && mode === 'playing') {
    const avg = fpsAcc / fpsN; fpsAcc = 0; fpsN = 0; perfT = 0;
    if (settings.quality === 'auto') {
      if (avg > 1 / 36) { goodT = 0; if (renderScale > 0.55) { renderScale = Math.max(0.55, renderScale - 0.15); resize(); } else if (tier > 0) { tier--; renderScale = 0.8; ctx.castShadow = TIERS[tier].shadows; applyTier(); } }
      else if (avg < 1 / 52) { goodT += 1; if (goodT > 5 && renderScale < 1) { renderScale = Math.min(1, renderScale + 0.1); goodT = 0; resize(); } }
      else goodT = 0;
    }
  } else if (mode !== 'playing') { fpsAcc = 0; fpsN = 0; perfT = 0; }
}

// ---------------------------------------------------------------- start
function boot() {
  initInput(canvas, $('touch'), (auto) => { if (mode === 'playing') pauseGame(auto); else if (mode === 'paused' && !auto) resumeGame(); });
  wireUI();
  applyTier();
  weapons.camera.add(new THREE.Object3D());
  renderer.compile(scene, camera);
  renderer.compile(weapons.scene, weapons.camera);
  updateAmmoHud(true);
  $('bestLine').textContent = bestLine();
  mode = 'menu';
  hideAll(); show('start', true);
  resize();
  requestAnimationFrame((t) => { last = t; frame(t); });
  const placeEnemy = (type, x, z, yaw = 0) => {
    const e = new Enemy(type, world.portals[0], ctx, game.wave || 1);
    e.spawnT = 0; e.pos.set(x, type === 'drone' ? 1.8 : 0, z); e.yaw = yaw; e.group.scale.setScalar(1); e.group.position.copy(e.pos); e.group.rotation.y = yaw; e.cd = 99;
    enemies.push(e); return e;
  };
  window.__gamma = { placeEnemy, input, world, phys, scene, camera, player, enemies, game, waveState, ctx, weapons, fx, renderer, get mode() { return mode; }, get frames() { return frames; }, sim: (secs, auto) => { for (let i = 0; i < secs * 30; i++) { if (auto) auto(); step(1 / 30); } }, startGame, setMode: (m) => { mode = m; }, pickups, spawnPickup, hurtPlayer, tier: () => tier, applyTier, setTier: (t) => { tier = t; applyTier(); } };
}
setTimeout(boot, 30);
