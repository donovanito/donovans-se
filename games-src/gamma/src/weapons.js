// Vapendata, förstapersonsmodeller och eld-/omladdningslogik.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { flashTexture } from './textures.js';
import { clamp, damp, lerp } from './util.js';

const hdr = (r, g, b) => new THREE.Color(r, g, b);

export const DEFS = [
  { id: 'rifle', name: 'PULSGEVÄR', rate: 0.095, dmg: 15, pellets: 1, mag: 30, reserveMax: 300, reserveStart: 120, reload: 1.45, spread: 0.004, bloom: 0.012, maxBloom: 0.035, kick: 0.5, shake: 0.05, color: hdr(0.5, 2.6, 3.4), kind: 'hit' },
  { id: 'shotgun', name: 'HAGELKANON', rate: 0.82, dmg: 11, pellets: 10, mag: 6, reserveMax: 54, reserveStart: 18, reload: 2.1, spread: 0.055, bloom: 0, maxBloom: 0, kick: 1.5, shake: 0.22, color: hdr(3.2, 1.6, 0.4), kind: 'hit' },
  { id: 'plasma', name: 'PLASMAKANON', rate: 0.85, dmg: 120, radius: 4.6, pellets: 1, mag: 5, reserveMax: 30, reserveStart: 10, reload: 2.0, spread: 0.002, bloom: 0, maxBloom: 0, kick: 1.1, shake: 0.2, color: hdr(3.4, 1.2, 0.3), kind: 'proj' },
];

function box(w, h, d, mat, x, y, z, parent) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(w, h, d) * 0.25), mat);
  m.position.set(x, y, z); parent.add(m); return m;
}
function cyl(r1, r2, len, mat, x, y, z, parent, seg = 14) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), mat);
  m.rotation.x = Math.PI / 2; m.position.set(x, y, z); parent.add(m); return m;
}

export class Weapons {
  constructor(envMap) {
    this.scene = new THREE.Scene();
    this.scene.environment = envMap;
    this.scene.environmentIntensity = 0.9;
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.02, 10);
    this.scene.add(this.camera);
    this.scene.add(new THREE.HemisphereLight(0x9fb4d8, 0x2a2430, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(-1.5, 2, 1.2); this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x35c8ff, 1.3); rim.position.set(2, 0.5, -1); this.scene.add(rim);
    this.muzzleLight = new THREE.PointLight(0xffa850, 0, 3, 2);
    this.scene.add(this.muzzleLight);

    this.metal = new THREE.MeshStandardMaterial({ color: 0x8b95a5, metalness: 0.75, roughness: 0.3 });
    this.dark = new THREE.MeshStandardMaterial({ color: 0x2a2f38, metalness: 0.7, roughness: 0.45 });
    this.glove = new THREE.MeshStandardMaterial({ color: 0x1b1e24, metalness: 0.2, roughness: 0.8 });
    this.cyan = new THREE.MeshBasicMaterial({ color: hdr(0.4, 2.4, 3.2), toneMapped: false });
    this.orange = new THREE.MeshBasicMaterial({ color: hdr(3.2, 1.2, 0.25), toneMapped: false });

    this.root = new THREE.Group();
    this.camera.add(this.root);
    this.models = [this.buildRifle(), this.buildShotgun(), this.buildPlasma()];
    this.models.forEach((m) => { m.visible = false; m.scale.setScalar(0.82); this.root.add(m); });

    this.flashMat = new THREE.SpriteMaterial({ map: flashTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0 });
    this.flash = new THREE.Sprite(this.flashMat);
    this.flash.scale.set(0.35, 0.35, 1);
    this.root.add(this.flash);

    // ammo-tillstånd
    this.ammo = DEFS.map((d) => ({ mag: d.mag, reserve: d.reserveStart }));
    this.cur = 0;
    this.cooldown = 0; this.reloadT = 0; this.swapT = 0; this.swapTo = -1;
    this.kick = 0; this.heat = 0; this.flashT = 0;
    this.sway = { x: 0, y: 0 }; this.bob = 0; this.pump = 0; this.pumpAnim = 0;
    this.dryT = 0; this.xScale = 1;
    this.show(0);
  }

  reset() {
    this.ammo = DEFS.map((d) => ({ mag: d.mag, reserve: d.reserveStart }));
    this.cur = 0; this.cooldown = 0; this.reloadT = 0; this.swapT = 0; this.swapTo = -1; this.kick = 0; this.heat = 0;
    this.show(0);
  }

  show(i) {
    this.models.forEach((m, k) => { m.visible = k === i; });
    this.muzzle = this.models[i].userData.muzzle;
  }

  hands(g, zFront = -0.2) {
    box(0.075, 0.075, 0.15, this.glove, 0.0, -0.095, 0.1, g);
    box(0.08, 0.07, 0.4, this.glove, 0.03, -0.17, 0.32, g).rotation.x = -0.35;
    box(0.085, 0.075, 0.13, this.glove, -0.0, -0.065, zFront, g);
    box(0.09, 0.07, 0.42, this.glove, -0.07, -0.16, zFront + 0.28, g).rotation.set(-0.3, -0.3, 0);
  }

  buildRifle() {
    const g = new THREE.Group();
    box(0.075, 0.1, 0.5, this.metal, 0, 0, -0.1, g);
    box(0.05, 0.035, 0.42, this.dark, 0, 0.07, -0.1, g);
    box(0.06, 0.07, 0.26, this.dark, 0, 0.0, -0.45, g);
    cyl(0.017, 0.017, 0.32, this.metal, 0, 0.005, -0.7, g);
    cyl(0.026, 0.02, 0.06, this.dark, 0, 0.005, -0.87, g);
    box(0.012, 0.012, 0.34, this.cyan, 0.039, 0.015, -0.1, g);
    box(0.012, 0.012, 0.34, this.cyan, -0.039, 0.015, -0.1, g);
    box(0.052, 0.15, 0.075, this.dark, 0, -0.11, -0.02, g).rotation.x = 0.12;
    box(0.045, 0.12, 0.06, this.metal, 0, -0.1, 0.12, g).rotation.x = 0.35;
    box(0.06, 0.09, 0.2, this.metal, 0, -0.01, 0.28, g);
    box(0.03, 0.045, 0.07, this.dark, 0, 0.1, -0.26, g);
    box(0.012, 0.012, 0.012, this.orange, 0, 0.128, -0.29, g);
    this.hands(g);
    g.userData.muzzle = new THREE.Vector3(0, 0.005, -0.9);
    g.userData.base = new THREE.Vector3(0.19, -0.19, -0.42);
    return g;
  }

  buildShotgun() {
    const g = new THREE.Group();
    box(0.085, 0.11, 0.38, this.metal, 0, 0, -0.02, g);
    cyl(0.03, 0.03, 0.72, this.metal, 0, 0.025, -0.58, g);
    cyl(0.024, 0.024, 0.55, this.dark, 0, -0.03, -0.5, g);
    cyl(0.036, 0.03, 0.05, this.dark, 0, 0.025, -0.94, g);
    this.pumpMesh = box(0.07, 0.07, 0.2, this.dark, 0, -0.045, -0.5, g);
    box(0.014, 0.014, 0.28, this.orange, 0.045, 0.01, -0.02, g);
    box(0.014, 0.014, 0.28, this.orange, -0.045, 0.01, -0.02, g);
    box(0.05, 0.12, 0.07, this.dark, 0, -0.105, 0.06, g).rotation.x = 0.3;
    box(0.07, 0.1, 0.28, this.metal, 0, -0.025, 0.28, g).rotation.x = 0.05;
    box(0.02, 0.02, 0.1, this.orange, 0, 0.065, -0.2, g);
    this.hands(g, -0.42);
    g.userData.muzzle = new THREE.Vector3(0, 0.025, -0.98);
    g.userData.base = new THREE.Vector3(0.19, -0.19, -0.4);
    return g;
  }

  buildPlasma() {
    const g = new THREE.Group();
    box(0.14, 0.15, 0.46, this.metal, 0, 0, -0.1, g);
    box(0.1, 0.05, 0.4, this.dark, 0, 0.1, -0.1, g);
    this.core = cyl(0.045, 0.045, 0.36, new THREE.MeshBasicMaterial({ color: hdr(3.2, 1.3, 0.3), toneMapped: false }), 0, 0.045, -0.12, g, 12);
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.38, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0x223, metalness: 0.5, roughness: 0.05, transparent: true, opacity: 0.35 }));
    shell.rotation.x = Math.PI / 2; shell.position.set(0, 0.045, -0.12); g.add(shell);
    cyl(0.065, 0.09, 0.28, this.dark, 0, 0, -0.52, g, 16);
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.085 + i * 0.006, 0.012, 6, 20), this.orange);
      r.position.set(0, 0, -0.44 - i * 0.07); g.add(r);
    }
    for (let i = 0; i < 4; i++) box(0.17, 0.012, 0.03, this.dark, 0, 0.04 - i * 0.03, 0.14 + (i % 2) * 0.01, g);
    box(0.05, 0.13, 0.07, this.dark, 0, -0.12, 0.06, g).rotation.x = 0.3;
    box(0.075, 0.1, 0.24, this.metal, 0, -0.02, 0.3, g);
    this.hands(g, -0.3);
    g.userData.muzzle = new THREE.Vector3(0, 0, -0.7);
    g.userData.base = new THREE.Vector3(0.21, -0.2, -0.44);
    return g;
  }

  def() { return DEFS[this.cur]; }
  state() { return this.ammo[this.cur]; }

  switchTo(i) {
    if (i === this.cur || i < 0 || i >= DEFS.length || this.swapT > 0) return false;
    this.swapTo = i; this.swapT = 0.36; this.reloadT = 0;
    return true;
  }
  cycle(dir) { this.switchTo((this.cur + dir + DEFS.length) % DEFS.length); }

  startReload(sfx) {
    const d = this.def(), s = this.state();
    if (this.reloadT > 0 || this.swapT > 0 || s.mag >= d.mag || s.reserve <= 0) return false;
    this.reloadT = d.reload; sfx.reload(d.reload);
    return true;
  }

  addAmmo(kind) {
    // kind: 'ammo' ger lite till alla vapen
    const give = [50, 6, 3];
    DEFS.forEach((d, i) => { this.ammo[i].reserve = Math.min(d.reserveMax, this.ammo[i].reserve + give[i]); });
  }
  totalAmmo() { return this.ammo.reduce((s, a) => s + a.mag + a.reserve, 0); }
  lowAmmo() {
    return DEFS.every((d, i) => this.ammo[i].reserve + this.ammo[i].mag < d.mag * 1.2);
  }

  /** moveSpeed: aktuell hastighet för spridning och gungning. */
  update(dt, c, wantFire, edges, moveSpeed, look, onGround) {
    const d = this.def(), s = this.state();
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.heat = Math.max(0, this.heat - dt * 0.55);
    this.kick = Math.max(0, this.kick - dt * 7);
    this.flashT = Math.max(0, this.flashT - dt);
    this.dryT = Math.max(0, this.dryT - dt);

    if (edges.select >= 0) this.switchTo(edges.select);
    if (edges.swapDir) this.cycle(edges.swapDir);
    if (edges.reload) this.startReload(c.sfx);

    if (this.swapT > 0) {
      const before = this.swapT;
      this.swapT -= dt;
      if (before > 0.18 && this.swapT <= 0.18) { this.cur = this.swapTo; this.show(this.cur); c.sfx.swap(); c.onSwap && c.onSwap(); }
      if (this.swapT <= 0) { this.swapT = 0; }
    }
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) {
        this.reloadT = 0;
        const need = d.mag - s.mag, take = Math.min(need, s.reserve);
        s.mag += take; s.reserve -= take;
        c.onAmmo && c.onAmmo();
      }
    }

    if (wantFire && this.cooldown <= 0 && this.swapT <= 0 && this.reloadT <= 0) {
      if (s.mag <= 0) {
        if (s.reserve > 0) this.startReload(c.sfx);
        else if (this.dryT <= 0) { c.sfx.dry(); this.dryT = 0.35; }
      } else {
        s.mag--;
        this.cooldown = d.rate;
        const moveSpread = clamp(moveSpeed / 6, 0, 1) * 0.012 + (onGround ? 0 : 0.015);
        const spread = d.spread + this.heat * d.maxBloom + moveSpread * (d.id === 'plasma' ? 0.3 : 1);
        this.heat = Math.min(1, this.heat + d.bloom / Math.max(0.001, d.maxBloom || 1));
        this.kick = Math.min(1.3, this.kick + d.kick);
        this.flashT = d.id === 'rifle' ? 0.05 : 0.09;
        this.flash.material.rotation = Math.random() * 6.28;
        this.pumpAnim = d.id === 'shotgun' ? 0.5 : 0;
        c.fireWeapon(d, spread, this.muzzle);
        if (s.mag === 0 && s.reserve > 0) this.cooldown = Math.max(this.cooldown, 0.18);
      }
    }
    if (this.pumpAnim > 0) this.pumpAnim -= dt;

    // viewmodel-animation
    this.bob += dt * (onGround ? clamp(moveSpeed, 0, 8) * 1.5 : 0.5);
    this.sway.x = damp(this.sway.x, clamp(-look.x * 0.0012, -0.05, 0.05), 8, dt);
    this.sway.y = damp(this.sway.y, clamp(look.y * 0.0012, -0.05, 0.05), 8, dt);
    const m = this.models[this.cur];
    const base = m.userData.base;
    const moveK = clamp(moveSpeed / 5, 0, 1.3);
    let px = base.x * this.xScale + this.sway.x + Math.sin(this.bob) * 0.008 * moveK;
    let py = base.y + this.sway.y - Math.abs(Math.cos(this.bob)) * 0.012 * moveK;
    let pz = base.z + this.kick * 0.035;
    let rx = this.kick * 0.045, rz = 0, ry = 0;
    if (this.reloadT > 0) {
      const p = 1 - this.reloadT / d.reload, dip = Math.sin(p * Math.PI);
      py -= dip * 0.13; rz += dip * 0.55; rx -= dip * 0.45; ry += dip * 0.2;
    }
    if (this.swapT > 0) {
      const k = this.swapT / 0.36, e = 1 - Math.abs(k - 0.5) * 2; // 0 -> 1 -> 0
      py -= e * 0.32; rx -= e * 0.5;
    }
    if (this.models[1].visible && this.pumpMesh) this.pumpMesh.position.z = -0.5 + Math.sin(clamp(this.pumpAnim / 0.5, 0, 1) * Math.PI) * 0.13;
    m.position.set(px, py, pz);
    m.rotation.set(rx, ry, rz);
    if (this.core && this.models[2].visible) this.core.scale.setScalar(1 + Math.sin(c.time * 9) * 0.12 + this.kick * 0.2);

    const mp = this.muzzle;
    this.flash.position.set(m.position.x + mp.x, m.position.y + mp.y, m.position.z + mp.z - 0.05);
    this.flashMat.opacity = this.flashT > 0 ? 1 : 0;
    this.flash.scale.setScalar(this.flashT > 0 ? lerp(0.3, 0.55, Math.random()) * (d.id === 'rifle' ? 0.8 : 1.4) : 0.01);
    this.muzzleLight.position.copy(this.flash.position).z -= 0.1;
    this.muzzleLight.intensity = this.flashT > 0 ? 6 : 0;
  }
}
