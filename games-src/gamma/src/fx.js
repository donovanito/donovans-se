// Partiklar, spårljus, skotthål, skrot och chockvågor.
import * as THREE from 'three';
import { decalTexture, glowTexture } from './textures.js';
import { rand } from './util.js';

const VERT = /* glsl */`
attribute float size; attribute vec4 pcolor;
uniform float uScale; varying vec4 vColor;
void main(){
  vColor = pcolor;
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = size * uScale / max(0.1,-mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = /* glsl */`
varying vec4 vColor;
void main(){
  vec2 p = gl_PointCoord - 0.5; float d = length(p)*2.0;
  float a = smoothstep(1.0, 0.0, d); a *= a;
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
  if (gl_FragColor.a < 0.003) discard;
}`;

class Particles {
  constructor(scene, max, additive) {
    this.max = max; this.i = 0;
    this.pos = new Float32Array(max * 3); this.col = new Float32Array(max * 4); this.size = new Float32Array(max);
    this.vel = new Float32Array(max * 3); this.life = new Float32Array(max); this.maxLife = new Float32Array(max);
    this.s0 = new Float32Array(max); this.s1 = new Float32Array(max);
    this.c0 = new Float32Array(max * 4); this.c1 = new Float32Array(max * 4);
    this.grav = new Float32Array(max); this.drag = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('pcolor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.uniforms = { uScale: { value: 800 } };
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: this.uniforms,
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 5 : 4;
    scene.add(this.points);
  }
  emit(x, y, z, vx, vy, vz, life, s0, s1, c0, c1, grav = 0, drag = 0) {
    const i = this.i; this.i = (this.i + 1) % this.max;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.life[i] = life; this.maxLife[i] = life; this.s0[i] = s0; this.s1[i] = s1;
    for (let k = 0; k < 4; k++) { this.c0[i * 4 + k] = c0[k]; this.c1[i * 4 + k] = c1[k]; }
    this.grav[i] = grav; this.drag[i] = drag;
  }
  update(dt) {
    const { pos, vel, life, maxLife, s0, s1, c0, c1, col, size, grav, drag } = this;
    for (let i = 0; i < this.max; i++) {
      if (life[i] <= 0) { size[i] = 0; continue; }
      life[i] -= dt;
      if (life[i] <= 0) { size[i] = 0; continue; }
      const t = 1 - life[i] / maxLife[i];
      const dr = Math.max(0, 1 - drag[i] * dt);
      vel[i * 3] *= dr; vel[i * 3 + 1] = vel[i * 3 + 1] * dr - grav[i] * dt; vel[i * 3 + 2] *= dr;
      pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      if (pos[i * 3 + 1] < 0.02 && grav[i] > 0) { pos[i * 3 + 1] = 0.02; vel[i * 3 + 1] *= -0.35; vel[i * 3] *= 0.7; vel[i * 3 + 2] *= 0.7; }
      size[i] = s0[i] + (s1[i] - s0[i]) * t;
      for (let k = 0; k < 4; k++) col[i * 4 + k] = c0[i * 4 + k] + (c1[i * 4 + k] - c0[i * 4 + k]) * t;
    }
    const g = this.points.geometry;
    g.attributes.position.needsUpdate = true; g.attributes.pcolor.needsUpdate = true; g.attributes.size.needsUpdate = true;
  }
}

export class FX {
  constructor(scene, quality) {
    this.scene = scene;
    const mobile = quality.mobile;
    this.add = new Particles(scene, mobile ? 500 : 900, true);
    this.smoke = new Particles(scene, mobile ? 120 : 220, false);

    // spårljus
    this.tracers = [];
    const tg = new THREE.BoxGeometry(1, 1, 1);
    for (let i = 0; i < 20; i++) {
      const m = new THREE.Mesh(tg, new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }));
      m.visible = false; m.frustumCulled = false; m.renderOrder = 6;
      scene.add(m); this.tracers.push({ m, life: 0, max: 0.1, w: 0.03 });
    }
    this.ti = 0;

    // skotthål
    const dtex = decalTexture();
    this.decalGeo = new THREE.PlaneGeometry(1, 1);
    this.decalMat = new THREE.MeshBasicMaterial({ map: dtex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, fog: true });
    this.decals = [];
    for (let i = 0; i < (mobile ? 28 : 56); i++) {
      const m = new THREE.Mesh(this.decalGeo, this.decalMat); m.visible = false; scene.add(m); this.decals.push(m);
    }
    this.di = 0;

    // skrot
    this.debris = [];
    const dg = new THREE.BoxGeometry(1, 1, 1);
    this.debrisMats = [
      new THREE.MeshStandardMaterial({ color: 0x2a2f38, metalness: 0.8, roughness: 0.4 }),
      new THREE.MeshStandardMaterial({ color: 0x5a6270, metalness: 0.7, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x222, emissive: 0xff5a2a, emissiveIntensity: 2.5 }),
    ];
    for (let i = 0; i < (mobile ? 28 : 56); i++) {
      const m = new THREE.Mesh(dg, this.debrisMats[i % 3]);
      m.visible = false; m.castShadow = !mobile; scene.add(m);
      this.debris.push({ m, v: new THREE.Vector3(), rv: new THREE.Vector3(), life: 0, max: 1 });
    }
    this.dbi = 0;

    // chockvågor och blixtar
    this.rings = [];
    const rg = new THREE.RingGeometry(0.8, 1, 40);
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
      m.rotation.x = -Math.PI / 2; m.visible = false; scene.add(m); this.rings.push({ m, life: 0, max: 0.5, size: 5 });
    }
    this.ri = 0;
    this.glowTex = glowTexture();
    this.flashes = [];
    for (let i = 0; i < 6; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false }));
      s.visible = false; scene.add(s); this.flashes.push({ s, life: 0, max: 0.3, size: 5 });
    }
    this.fi = 0;
  }

  setScale(height, fovDeg) {
    const v = height / (2 * Math.tan((fovDeg * Math.PI / 180) / 2));
    this.add.uniforms.uScale.value = v; this.smoke.uniforms.uScale.value = v;
  }

  tracer(from, to, color, width = 0.025, life = 0.09) {
    const t = this.tracers[this.ti]; this.ti = (this.ti + 1) % this.tracers.length;
    const len = from.distanceTo(to);
    t.m.position.copy(from).add(to).multiplyScalar(0.5);
    t.m.lookAt(to);
    t.m.scale.set(width, width, len);
    t.m.material.color.copy(color);
    t.m.material.opacity = 1;
    t.m.visible = true; t.life = life; t.max = life; t.w = width; t.len = len;
  }

  decal(p, n, size = 0.28) {
    const m = this.decals[this.di]; this.di = (this.di + 1) % this.decals.length;
    m.position.copy(p).addScaledVector(n, 0.012);
    m.lookAt(p.x + n.x, p.y + n.y, p.z + n.z);
    m.rotateZ(Math.random() * 6.28);
    const s = size * rand(0.8, 1.4); m.scale.set(s, s, s);
    m.visible = true;
  }

  sparks(p, n, count = 8, hot = true) {
    for (let i = 0; i < count; i++) {
      const sp = rand(2, 7);
      this.add.emit(p.x, p.y, p.z,
        n.x * sp + rand(-2.5, 2.5), n.y * sp + rand(0, 3), n.z * sp + rand(-2.5, 2.5),
        rand(0.2, 0.5), 0.07, 0.01, hot ? [3, 1.6, 0.5, 1] : [0.8, 2.2, 3, 1], [1, 0.2, 0.05, 0], 14, 1.2);
    }
    this.add.emit(p.x + n.x * 0.05, p.y + n.y * 0.05, p.z + n.z * 0.05, 0, 0, 0, 0.08, 0.5, 0.2, hot ? [3, 2.4, 1.2, 0.9] : [1, 2.5, 3, 0.9], [1, 1, 1, 0], 0, 0);
  }

  puff(p, n, count = 3) {
    for (let i = 0; i < count; i++) {
      this.smoke.emit(p.x, p.y, p.z, n.x * 0.8 + rand(-0.5, 0.5), n.y * 0.8 + rand(0, 0.8), n.z * 0.8 + rand(-0.5, 0.5), rand(0.5, 0.9), 0.25, 0.9, [0.25, 0.27, 0.3, 0.3], [0.1, 0.1, 0.12, 0], -0.4, 1.5);
    }
  }

  ring(p, color, size, life = 0.45) {
    const r = this.rings[this.ri]; this.ri = (this.ri + 1) % this.rings.length;
    r.m.position.set(p.x, Math.max(0.06, p.y), p.z); r.m.material.color.copy(color);
    r.size = size; r.life = life; r.max = life; r.m.visible = true;
  }

  flash(p, color, size, life = 0.25) {
    const f = this.flashes[this.fi]; this.fi = (this.fi + 1) % this.flashes.length;
    f.s.position.copy(p); f.s.material.color.copy(color); f.size = size; f.life = life; f.max = life; f.s.visible = true;
  }

  explosion(p, big = 1, color = [1, 0.5, 0.15]) {
    const n = Math.round(26 * big);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.28, e = rand(-0.3, 1), sp = rand(2, 9) * big;
      this.add.emit(p.x, p.y, p.z, Math.cos(a) * sp * (1 - e * 0.5), e * sp * 1.1, Math.sin(a) * sp * (1 - e * 0.5), rand(0.25, 0.7), rand(0.5, 1.1) * big, 0.1, [color[0] * 4, color[1] * 4, color[2] * 4, 1], [color[0], color[1] * 0.3, 0, 0], 3, 2.5);
    }
    for (let i = 0; i < n; i++) {
      const sp = rand(3, 12) * big;
      this.add.emit(p.x, p.y, p.z, rand(-1, 1) * sp, rand(0, 1) * sp, rand(-1, 1) * sp, rand(0.4, 0.9), 0.09, 0.02, [3, 2, 0.8, 1], [1, 0.3, 0.05, 0], 16, 0.6);
    }
    for (let i = 0; i < 8 * big; i++) {
      this.smoke.emit(p.x + rand(-0.4, 0.4), p.y + rand(-0.2, 0.4), p.z + rand(-0.4, 0.4), rand(-1.5, 1.5), rand(0.5, 2.5), rand(-1.5, 1.5), rand(1, 1.8), 0.8 * big, 2.4 * big, [0.2, 0.2, 0.22, 0.5], [0.05, 0.05, 0.06, 0], -0.3, 1.2);
    }
    this.flash(p, new THREE.Color(color[0] * 3, color[1] * 3, color[2] * 3), 7 * big, 0.3);
    this.ring(p, new THREE.Color(color[0] * 2, color[1] * 2, color[2] * 2), 4.5 * big, 0.45);
  }

  /** Skrot när en robot sprängs. */
  gibs(p, count, scale = 0.2) {
    for (let i = 0; i < count; i++) {
      const d = this.debris[this.dbi]; this.dbi = (this.dbi + 1) % this.debris.length;
      d.m.position.set(p.x + rand(-0.3, 0.3), p.y + rand(-0.3, 0.3), p.z + rand(-0.3, 0.3));
      d.m.scale.set(scale * rand(0.4, 1.4), scale * rand(0.3, 1), scale * rand(0.4, 1.4));
      d.v.set(rand(-5, 5), rand(2, 8), rand(-5, 5)); d.rv.set(rand(-9, 9), rand(-9, 9), rand(-9, 9));
      d.life = d.max = rand(1.6, 3); d.base = d.m.scale.clone(); d.m.visible = true;
    }
  }

  update(dt) {
    this.add.update(dt); this.smoke.update(dt);
    for (const t of this.tracers) {
      if (!t.m.visible) continue;
      t.life -= dt;
      if (t.life <= 0) { t.m.visible = false; continue; }
      const k = t.life / t.max;
      t.m.scale.set(t.w * k, t.w * k, t.len);
      t.m.material.opacity = k;
    }
    for (const d of this.debris) {
      if (!d.m.visible) continue;
      d.life -= dt;
      if (d.life <= 0) { d.m.visible = false; continue; }
      d.v.y -= 18 * dt;
      d.m.position.addScaledVector(d.v, dt);
      d.m.rotation.x += d.rv.x * dt; d.m.rotation.y += d.rv.y * dt; d.m.rotation.z += d.rv.z * dt;
      const r = Math.hypot(d.m.position.x, d.m.position.z);
      if (r > 23.3) { d.m.position.x *= 23.3 / r; d.m.position.z *= 23.3 / r; d.v.x *= -0.4; d.v.z *= -0.4; }
      if (d.m.position.y < 0.08) { d.m.position.y = 0.08; d.v.y *= -0.35; d.v.x *= 0.65; d.v.z *= 0.65; d.rv.multiplyScalar(0.6); }
      const s = Math.min(1, d.life / 0.5);
      d.m.scale.copy(d.base).multiplyScalar(s);
    }
    for (const r of this.rings) {
      if (!r.m.visible) continue;
      r.life -= dt;
      if (r.life <= 0) { r.m.visible = false; continue; }
      const t = 1 - r.life / r.max;
      r.m.scale.setScalar(0.5 + r.size * t);
      r.m.material.opacity = (1 - t) * 0.9;
    }
    for (const f of this.flashes) {
      if (!f.s.visible) continue;
      f.life -= dt;
      if (f.life <= 0) { f.s.visible = false; continue; }
      const t = f.life / f.max;
      f.s.scale.setScalar(f.size * (0.6 + (1 - t) * 0.6));
      f.s.material.opacity = t;
    }
  }
}
