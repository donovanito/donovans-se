// Fiender: drönare, soldater och bruter - modeller byggda av enkla former + AI.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { angleDiff, clamp, rand, damp } from './util.js';

const hdr = (r, g, b) => new THREE.Color(r, g, b);
const GEO = {};
const geo = (key, make) => GEO[key] || (GEO[key] = make());
const MAT = {};
function mats() {
  if (MAT.dark) return MAT;
  MAT.dark = new THREE.MeshStandardMaterial({ color: 0x3b4250, metalness: 0.6, roughness: 0.5 });
  MAT.mid = new THREE.MeshStandardMaterial({ color: 0xa4acba, metalness: 0.5, roughness: 0.38 });
  MAT.red = new THREE.MeshBasicMaterial({ color: hdr(2.4, 0.1, 0.06), toneMapped: false });
  MAT.orange = new THREE.MeshBasicMaterial({ color: hdr(2.6, 0.9, 0.1), toneMapped: false });
  MAT.cyan = new THREE.MeshBasicMaterial({ color: hdr(0.4, 2.4, 3.2), toneMapped: false });
  return MAT;
}

function box(w, h, d, mat, x = 0, y = 0, z = 0, parent = null) {
  const m = new THREE.Mesh(geo(`b${w},${h},${d}`, () => new RoundedBoxGeometry(w, h, d, 2, Math.min(w, h, d) * 0.22)), mat);
  m.position.set(x, y, z);
  if (parent) parent.add(m);
  return m;
}

export const TYPES = {
  drone: { name: 'Drönare', hp: 38, speed: 6.4, radius: 0.5, score: 100, cost: 1, height: 1.9, spheres: [[0, 0, 0, 0.55, 1]] },
  trooper: { name: 'Soldat', hp: 90, speed: 3.5, radius: 0.5, score: 200, cost: 2, height: 2.0, spheres: [[0, 1.85, 0, 0.27, 2.2], [0, 1.3, 0, 0.44, 1], [0, 0.55, 0, 0.42, 0.8]] },
  brute: { name: 'Bruten', hp: 460, speed: 2.7, radius: 1.0, score: 600, cost: 6, height: 3.0, spheres: [[0, 2.6, 0.15, 0.4, 2], [0, 1.8, 0, 0.9, 1], [0, 0.8, 0, 0.75, 0.8]] },
};

export class Enemy {
  constructor(type, portal, c, wave) {
    this.type = type;
    const T = TYPES[type];
    this.T = T;
    const scale = 1 + (wave - 1) * 0.07;
    this.maxHp = Math.round(T.hp * scale);
    this.hp = this.maxHp;
    this.radius = T.radius;
    this.pos = new THREE.Vector3(portal.pos.x, 0, portal.pos.z);
    this.yaw = Math.atan2(-portal.pos.x, -portal.pos.z);
    this.vel = new THREE.Vector3();
    this.dead = false;
    this.flash = 0;
    this.spawnT = type === 'brute' ? 1.3 : 0.9;
    this.walk = rand(0, 6);
    this.cd = rand(2.0, 3.6);
    this.burst = 0; this.burstT = 0;
    this.telegraph = 0;
    this.strafe = Math.random() < 0.5 ? 1 : -1; this.strafeT = rand(1.5, 3.5);
    this.detour = Math.random() < 0.5 ? 1 : -1;
    this.pref = rand(8.5, 13);
    this.state = 'walk'; this.stateT = 0; this.chargeCd = rand(2, 5);
    this.dmgScale = 1 + (wave - 1) * 0.045;
    this.hover = rand(1.4, 2.4); this.hoverPh = rand(0, 6);
    this.stuck = 0;
    this.hitSpheres = T.spheres;
    this.group = new THREE.Group();
    this.parts = {};
    this.build(c.castShadow);
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
    this.group.scale.setScalar(0.3);
    c.scene.add(this.group);
    this.pos.y = type === 'drone' ? 1.0 : 0;
  }

  build(shadow) {
    const M = mats();
    this.armor = M.mid.clone();
    this.armor.emissive = new THREE.Color(0, 0, 0);
    const A = this.armor, D = M.dark, g = this.group, p = this.parts;
    if (this.type === 'drone') {
      const core = box(0.36, 0.36, 0.36, M.dark, 0, 0, 0, g);
      core.geometry = geo('dsph', () => new THREE.SphereGeometry(0.34, 20, 14)); core.material = A;
      const eye = new THREE.Mesh(geo('deye', () => new THREE.SphereGeometry(0.17, 14, 10)), M.red);
      eye.position.set(0, 0, 0.26); g.add(eye); p.eye = eye;
      const ring = new THREE.Mesh(geo('dring', () => new THREE.TorusGeometry(0.5, 0.05, 8, 28)), A);
      ring.rotation.x = Math.PI / 2; g.add(ring); p.ring = ring;
      const ringG = new THREE.Mesh(geo('dringg', () => new THREE.TorusGeometry(0.5, 0.015, 6, 28)), M.red);
      ring.add(ringG);
      for (const s of [-1, 1]) {
        const w = box(0.07, 0.34, 0.5, D, s * 0.42, 0, -0.05, g); w.rotation.z = s * 0.25;
        const t = box(0.1, 0.1, 0.1, M.cyan, s * 0.42, -0.22, -0.2, g);
        void t;
      }
      p.muzzle = new THREE.Object3D(); p.muzzle.position.set(0, -0.05, 0.4); g.add(p.muzzle);
    } else if (this.type === 'trooper') {
      p.legL = new THREE.Group(); p.legR = new THREE.Group();
      p.legL.position.set(-0.2, 0.95, 0); p.legR.position.set(0.2, 0.95, 0);
      for (const l of [p.legL, p.legR]) {
        box(0.2, 0.5, 0.22, A, 0, -0.25, 0, l);
        const shin = new THREE.Group(); shin.position.set(0, -0.5, 0); l.add(shin);
        box(0.17, 0.5, 0.2, D, 0, -0.22, 0.03, shin);
        box(0.22, 0.12, 0.34, A, 0, -0.47, 0.06, shin);
        g.add(l);
      }
      p.torso = new THREE.Group(); p.torso.position.y = 0.95; g.add(p.torso);
      box(0.62, 0.62, 0.36, A, 0, 0.42, 0, p.torso);
      box(0.5, 0.24, 0.3, D, 0, 0.0, 0, p.torso);
      box(0.2, 0.2, 0.05, M.orange, 0, 0.5, 0.2, p.torso);
      box(0.84, 0.18, 0.4, A, 0, 0.7, 0, p.torso);
      const head = new THREE.Group(); head.position.set(0, 0.97, 0.02); p.torso.add(head);
      box(0.3, 0.28, 0.3, A, 0, 0, 0, head);
      box(0.24, 0.07, 0.06, M.red, 0, 0.02, 0.16, head);
      box(0.04, 0.2, 0.04, D, 0.1, 0.22, -0.05, head);
      box(0.12, 0.2, 0.12, D, -0.46, 0.55, 0, p.torso);
      p.arm = new THREE.Group(); p.arm.position.set(0.46, 0.62, 0); p.torso.add(p.arm);
      box(0.14, 0.14, 0.4, A, 0, -0.1, 0.18, p.arm);
      box(0.12, 0.16, 0.7, D, 0, -0.1, 0.55, p.arm);
      box(0.06, 0.06, 0.12, M.orange, 0, -0.1, 0.92, p.arm);
      p.muzzle = new THREE.Object3D(); p.muzzle.position.set(0, -0.1, 1.0); p.arm.add(p.muzzle);
      const armL = new THREE.Group(); armL.position.set(-0.46, 0.62, 0); p.torso.add(armL);
      box(0.13, 0.5, 0.15, D, 0, -0.25, 0.05, armL); armL.rotation.x = -0.3;
      p.armL = armL;
    } else {
      p.legL = new THREE.Group(); p.legR = new THREE.Group();
      p.legL.position.set(-0.45, 1.25, 0); p.legR.position.set(0.45, 1.25, 0);
      for (const l of [p.legL, p.legR]) {
        box(0.5, 0.8, 0.5, A, 0, -0.4, 0, l);
        box(0.42, 0.7, 0.42, D, 0, -0.95, 0.04, l);
        box(0.6, 0.2, 0.8, A, 0, -1.2, 0.12, l);
        g.add(l);
      }
      p.torso = new THREE.Group(); p.torso.position.y = 1.2; g.add(p.torso);
      box(1.5, 0.9, 0.95, A, 0, 0.65, 0, p.torso);
      box(1.1, 0.5, 0.8, D, 0, 0.0, 0, p.torso);
      box(0.52, 0.52, 0.12, M.orange, 0, 0.7, 0.5, p.torso);
      box(0.3, 0.3, 0.1, M.red, 0, 0.7, 0.57, p.torso);
      box(2.3, 0.45, 1.05, A, 0, 1.2, 0, p.torso);
      for (const s of [-1, 1]) {
        box(0.5, 0.4, 0.9, D, s * 1.2, 1.38, 0, p.torso);
        box(0.08, 0.08, 0.7, M.red, s * 1.2, 1.62, 0, p.torso);
      }
      const head = new THREE.Group(); head.position.set(0, 1.7, 0.2); p.torso.add(head);
      box(0.45, 0.38, 0.42, D, 0, 0, 0, head);
      box(0.36, 0.08, 0.06, M.red, 0, 0.03, 0.22, head);
      p.armL = new THREE.Group(); p.armL.position.set(-1.25, 1.1, 0); p.torso.add(p.armL);
      p.armR = new THREE.Group(); p.armR.position.set(1.25, 1.1, 0); p.torso.add(p.armR);
      for (const a of [p.armL, p.armR]) {
        box(0.42, 0.9, 0.42, A, 0, -0.45, 0, a);
        box(0.62, 0.6, 0.62, D, 0, -1.1, 0.05, a);
        box(0.5, 0.1, 0.5, M.red, 0, -1.35, 0.05, a);
      }
    }
    g.traverse((o) => { if (o.isMesh) { o.castShadow = shadow; o.receiveShadow = false; } });
  }

  /** Stråle mot träffsfärer. Returnerar [t, mult] eller null. */
  rayHit(ox, oy, oz, dx, dy, dz, maxT) {
    let best = -1, mult = 1;
    const base = this.type === 'drone' ? this.pos.y : this.pos.y;
    for (const s of this.hitSpheres) {
      const cx = this.pos.x + s[0], cy = base + s[1], cz = this.pos.z + s[2];
      const lx = cx - ox, ly = cy - oy, lz = cz - oz;
      const tca = lx * dx + ly * dy + lz * dz;
      if (tca < 0) continue;
      const d2 = lx * lx + ly * ly + lz * lz - tca * tca;
      const r = s[3] * (this.type === 'drone' ? 1 : 1);
      if (d2 > r * r) continue;
      const t = tca - Math.sqrt(r * r - d2);
      if (t < 0 || t > maxT) continue;
      if (best < 0 || t < best) { best = t; mult = s[4]; }
    }
    return best < 0 ? null : [best, mult];
  }

  center(out) {
    const s = this.hitSpheres[Math.min(1, this.hitSpheres.length - 1)];
    return out.set(this.pos.x + s[0], this.pos.y + s[1], this.pos.z + s[2]);
  }

  damage(amount) {
    this.hp -= amount;
    this.flash = 0.12;
    if (this.hp <= 0) this.dead = true;
  }

  fire(c, dmg, speed, color, size, heavy) {
    const P = c.player;
    this.parts.muzzle.getWorldPosition(c.tmpA);
    const o = c.tmpA;
    const tx = P.pos.x, ty = P.pos.y + P.eye - 0.35, tz = P.pos.z;
    const dist = Math.hypot(tx - o.x, tz - o.z);
    const lead = clamp(dist / speed, 0, 1.2) * 0.5;
    const dir = c.tmpB.set(tx + P.vx * lead - o.x, ty - o.y, tz + P.vz * lead - o.z).normalize();
    const err = (heavy ? 0.03 : 0.07) * (1 - Math.min(0.5, c.wave * 0.035));
    dir.x += rand(-err, err); dir.y += rand(-err, err) * 0.6; dir.z += rand(-err, err);
    dir.normalize();
    c.spawnBolt(o, dir, speed, dmg * this.dmgScale, color, size);
    c.fx.flash(o, color, 1.6, 0.1);
    c.sfx.enemyShot(this.pos.x, this.pos.z, heavy);
    if (this.parts.arm) this.recoil = 0.12;
  }

  update(dt, c) {
    const P = c.player;
    const ex = this.pos.x, ez = this.pos.z;
    const dx = P.pos.x - ex, dz = P.pos.z - ez;
    const dist = Math.hypot(dx, dz) || 0.001;
    const want = Math.atan2(dx, dz);
    const turn = this.type === 'brute' ? 2.4 : this.type === 'drone' ? 7 : 5;
    const charging = this.state === 'charge';
    this.yaw += clamp(angleDiff(this.yaw, want), -turn * dt * (charging ? 0.35 : 1), turn * dt * (charging ? 0.35 : 1));
    this.flash = Math.max(0, this.flash - dt);
    this.recoil = Math.max(0, (this.recoil || 0) - dt);
    this.armor.emissive.setRGB(this.flash * 9, this.flash * 4.5, this.flash * 3.5);

    // spawn: glid ut ur dörren, ingen aktion
    if (this.spawnT > 0) {
      this.spawnT -= dt;
      const k = 1 - Math.max(0, this.spawnT) / (this.type === 'brute' ? 1.3 : 0.9);
      this.group.scale.setScalar(0.3 + 0.7 * Math.min(1, k * 1.5));
      const sp = this.T.speed * 0.45;
      this.pos.x += Math.sin(this.yaw) * sp * dt; this.pos.z += Math.cos(this.yaw) * sp * dt;
      if (this.type === 'drone') this.pos.y = damp(this.pos.y, this.hover, 3, dt);
      this.sync(dt, c, 0.6);
      return;
    }
    this.group.scale.setScalar(1);

    const eyeY = this.type === 'drone' ? this.pos.y : this.pos.y + 1.5;
    const los = c.world.clear(ex, eyeY, ez, P.pos.x, P.pos.y + P.eye, P.pos.z);
    const fx = dx / dist, fz = dz / dist;       // mot spelaren
    const sx = -fz * this.strafe, sz = fx * this.strafe; // åt sidan
    let mx = 0, mz = 0, speed = this.T.speed * (1 + c.wave * 0.012);

    this.strafeT -= dt;
    if (this.strafeT <= 0) { this.strafe *= -1; this.strafeT = rand(1.5, 3.5); }

    if (this.type === 'trooper') {
      if (!los || dist > this.pref + 2.5) { mx = fx; mz = fz; }
      else if (dist < this.pref - 3) { mx = -fx * 0.8 + sx * 0.5; mz = -fz * 0.8 + sz * 0.5; }
      else { mx = sx * 0.7; mz = sz * 0.7; speed *= 0.75; }
      this.attack(dt, c, los && dist < 26, (c) => { this.burst = 3; this.burstT = 0; this.cd = rand(2.4, 4.0) / (1 + c.wave * 0.035); },
        () => { this.fire(c, 7, 22 + c.wave * 0.5, hdr(3.2, 1.0, 0.25), 0.16, false); });
    } else if (this.type === 'drone') {
      this.hoverPh += dt;
      const ty = this.hover + Math.sin(this.hoverPh * 1.7) * 0.35;
      this.pos.y = damp(this.pos.y, ty, 3, dt);
      if (!los || dist > this.pref - 1.5) { mx = fx + sx * 0.4; mz = fz + sz * 0.4; }
      else if (dist < this.pref - 4.5) { mx = -fx * 0.6 + sx; mz = -fz * 0.6 + sz; }
      else { mx = sx; mz = sz; speed *= 0.8; }
      this.attack(dt, c, los && dist < 24, (c) => { this.burst = 2; this.burstT = 0; this.cd = rand(2.6, 4.2) / (1 + c.wave * 0.035); },
        () => { this.fire(c, 5, 20 + c.wave * 0.5, hdr(3.4, 0.35, 0.3), 0.13, false); });
    } else {
      // bruten
      this.stateT -= dt; this.chargeCd -= dt;
      if (this.state === 'walk') {
        mx = fx; mz = fz;
        if (dist < 4.0) { this.state = 'slamWind'; this.stateT = 0.75; c.sfx.roar(ex, ez); }
        else if (this.chargeCd <= 0 && los && dist > 7 && dist < 22) { this.state = 'chargeWind'; this.stateT = 0.8; c.sfx.roar(ex, ez); }
      } else if (this.state === 'chargeWind') {
        speed = 0; this.flash = Math.max(this.flash, 0.03 + 0.03 * Math.sin(c.time * 40));
        if (this.stateT <= 0) { this.state = 'charge'; this.stateT = 1.25; this.cdx = fx; this.cdz = fz; }
      } else if (this.state === 'charge') {
        const k = clamp(1 - 2.2 * dt, 0, 1);
        this.cdx = this.cdx * k + fx * (1 - k); this.cdz = this.cdz * k + fz * (1 - k);
        const l = Math.hypot(this.cdx, this.cdz) || 1;
        mx = this.cdx / l; mz = this.cdz / l; speed = 11.5;
        if (dist < this.radius + 0.9) {
          c.hurtPlayer(26 * this.dmgScale, this.pos, 8);
          c.sfx.slam(ex, ez); this.state = 'recover'; this.stateT = 1.5; this.chargeCd = rand(6, 9);
        } else if (this.stateT <= 0 || this.stuck > 0.25) { this.state = 'recover'; this.stateT = 0.9; this.chargeCd = rand(5, 8); }
      } else if (this.state === 'slamWind') {
        speed = 0;
        if (this.stateT <= 0) {
          this.state = 'recover'; this.stateT = 1.2;
          c.sfx.slam(ex, ez);
          const sp = c.tmpA.set(ex + Math.sin(this.yaw) * 1.5, 0.1, ez + Math.cos(this.yaw) * 1.5);
          c.fx.ring(sp, hdr(3, 1.0, 0.3), 9, 0.5);
          c.fx.explosion(sp, 0.45, [1, 0.5, 0.2]);
          c.shake(0.35);
          if (Math.hypot(P.pos.x - ex, P.pos.z - ez) < 5.2 && P.pos.y < 1.2) c.hurtPlayer(20 * this.dmgScale, this.pos, 10);
        }
      } else if (this.state === 'recover') {
        speed = 0.5; mx = fx; mz = fz;
        if (this.stateT <= 0) this.state = 'walk';
      }
    }

    // separation
    for (const o of c.enemies) {
      if (o === this || o.dead) continue;
      const ox = ex - o.pos.x, oz = ez - o.pos.z, dd = Math.hypot(ox, oz), rr = this.radius + o.radius + 0.2;
      if (dd < rr && dd > 0.001) { const k = (rr - dd) / rr; mx += (ox / dd) * k * 1.6; mz += (oz / dd) * k * 1.6; }
    }
    // runt hinder: välj ett håll och fortsätt
    if (!los && this.type !== 'drone' && this.stuck > 0.15) { mx += -fz * this.detour * 1.4; mz += fx * this.detour * 1.4; }

    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    const accel = this.type === 'drone' ? 7 : 10;
    this.vel.x = damp(this.vel.x, mx * speed, accel, dt);
    this.vel.z = damp(this.vel.z, mz * speed, accel, dt);
    const px = this.pos.x, pz = this.pos.z;
    this.pos.x += this.vel.x * dt; this.pos.z += this.vel.z * dt;
    const footY = this.type === 'drone' ? this.pos.y - 0.55 : 0;
    c.world.resolve(this.pos, this.radius, footY);
    // player-kollision (skjuts bort lite)
    const pdx = this.pos.x - P.pos.x, pdz = this.pos.z - P.pos.z, pd = Math.hypot(pdx, pdz), pr = this.radius + 0.4;
    if (pd < pr && pd > 0.001 && !(this.type === 'drone' && this.pos.y > 2.6)) { this.pos.x = P.pos.x + (pdx / pd) * pr; this.pos.z = P.pos.z + (pdz / pd) * pr; }
    const moved = Math.hypot(this.pos.x - px, this.pos.z - pz);
    const intended = Math.hypot(this.vel.x, this.vel.z) * dt;
    if (intended > 0.001 && moved < intended * 0.4) this.stuck += dt; else this.stuck = Math.max(0, this.stuck - dt * 2);
    if (this.stuck > 1.2) { this.detour *= -1; this.stuck = 0.4; }
    this.sync(dt, c, Math.hypot(this.vel.x, this.vel.z));
  }

  attack(dt, c, canShoot, startBurst, shoot) {
    this.cd -= dt;
    if (this.burst <= 0) {
      if (canShoot && this.cd <= 0) { this.telegraph = 0.45; this.cd = 99; }
      if (this.telegraph > 0) {
        this.telegraph -= dt;
        if (this.telegraph <= 0) startBurst(c);
      }
    } else {
      this.burstT -= dt;
      if (this.burstT <= 0) { shoot(); this.burst--; this.burstT = 0.2; }
    }
  }

  sync(dt, c, moveSpeed) {
    const g = this.group, p = this.parts;
    g.position.copy(this.pos);
    g.rotation.y = this.yaw;
    this.walk += dt * moveSpeed * (this.type === 'brute' ? 1.5 : 2.4);
    const sw = Math.sin(this.walk);
    if (this.type === 'drone') {
      p.ring.rotation.z += dt * 8;
      g.rotation.x = clamp(this.vel.z * 0.03, -0.3, 0.3) * 0 + Math.sin(this.hoverPh * 2) * 0.05;
      g.rotation.z = Math.sin(this.hoverPh * 1.3) * 0.08;
      const glow = this.telegraph > 0 ? 1 + 3 * Math.abs(Math.sin(c.time * 30)) : 1;
      p.eye.scale.setScalar(glow);
    } else if (this.type === 'trooper') {
      const amp = clamp(moveSpeed / 3.5, 0, 1) * 0.8;
      p.legL.rotation.x = sw * amp; p.legR.rotation.x = -sw * amp;
      p.torso.position.y = 0.95 + Math.abs(Math.cos(this.walk)) * 0.03 * amp;
      p.torso.rotation.y = Math.sin(this.walk * 0.5) * 0.05 * amp;
      const aim = this.telegraph > 0 || this.burst > 0;
      p.arm.rotation.x = damp(p.arm.rotation.x, aim ? -0.05 - (this.recoil ? 0.18 : 0) : 0.5, 10, dt);
      p.armL.rotation.x = -0.3 - sw * 0.3 * amp;
    } else {
      const amp = clamp(moveSpeed / 3, 0, 1) * 0.55;
      p.legL.rotation.x = sw * amp; p.legR.rotation.x = -sw * amp;
      p.torso.position.y = 1.2 + Math.abs(Math.cos(this.walk)) * 0.07 * amp;
      p.torso.rotation.z = sw * 0.05 * amp;
      let up = 0;
      if (this.state === 'slamWind') up = -2.4 * (1 - Math.max(0, this.stateT) / 0.75);
      else if (this.state === 'chargeWind') up = -0.8;
      else if (this.state === 'charge') up = -1.2;
      else if (this.state === 'recover' && this.stateT > 0) up = 0.2;
      p.armL.rotation.x = damp(p.armL.rotation.x, up + sw * 0.4 * amp, 12, dt);
      p.armR.rotation.x = damp(p.armR.rotation.x, up - sw * 0.4 * amp, 12, dt);
    }
  }

  dispose(scene) {
    scene.remove(this.group);
    this.armor.dispose();
  }
}
