// Bygger stationens arena: golv, väggar, fönster mot rymden, reaktor, hinder och ljus.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ARENA_R, ARENA_H } from './physics.js';
import { makePanelSet, panelMaterialTextures, hazardTexture, ceilingTextures, skyTexture, planetTexture, beamTexture, glowTexture } from './textures.js';

const hdr = (r, g, b) => new THREE.Color(r, g, b);
const CYAN = hdr(0.35, 2.4, 3.2);
const ORANGE = hdr(3.2, 1.2, 0.25);

function emissiveBasic(color) {
  return new THREE.MeshBasicMaterial({ color, toneMapped: false });
}

function buildEnvironment(renderer) {
  const env = new THREE.Scene();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(30, 24, 16), new THREE.MeshBasicMaterial({ color: 0x0b1626, side: THREE.BackSide }));
  env.add(dome);
  const strip = (w, h, d, c, x, y, z, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: c }));
    m.position.set(x, y, z); m.rotation.y = ry; env.add(m);
  };
  strip(14, 0.4, 2, hdr(10, 10, 11), 0, 14, 0);
  strip(2, 0.4, 14, hdr(10, 10, 11), 6, 14, 0);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    strip(5, 0.5, 0.5, i % 2 ? hdr(0.8, 5, 7) : hdr(7, 2.5, 0.6), Math.cos(a) * 22, 6 + (i % 3), Math.sin(a) * 22, -a);
  }
  strip(10, 6, 0.3, hdr(1.2, 1.8, 3), 0, 4, -24);
  strip(0.3, 6, 10, hdr(3, 1.4, 0.5), 24, 4, 0);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.02);
  pm.dispose();
  return rt.texture;
}

export function buildWorld(scene, renderer, phys, Q) {
  const w = { portals: [], anim: [], lights: {} };
  const aniso = Q.aniso;
  const texSize = Q.texSize;

  scene.background = new THREE.Color(0x05070c);
  scene.fog = new THREE.FogExp2(0x0b1420, 0.016);
  scene.environment = buildEnvironment(renderer);
  scene.environmentIntensity = 0.7;

  // --- rymd utanför fönstren -------------------------------------------------
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(1500, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTexture(!Q.mobile), side: THREE.BackSide, depthWrite: false, fog: false })
  );
  sky.renderOrder = -10; sky.rotation.y = 0.6;
  scene.add(sky);

  const sunDir = new THREE.Vector3(-0.55, 0.35, 0.6).normalize();
  const planetMat = new THREE.ShaderMaterial({
    uniforms: { map: { value: planetTexture() }, sunDir: { value: sunDir } },
    vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 wp=modelMatrix*vec4(position,1.0); vV=normalize(cameraPosition-wp.xyz); gl_Position=projectionMatrix*viewMatrix*wp; }`,
    fragmentShader: `uniform sampler2D map; uniform vec3 sunDir; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){
        vec3 c = texture2D(map, vUv).rgb; c = pow(c, vec3(2.2));
        float l = clamp(dot(normalize(vN), sunDir)*1.1+0.08, 0.0, 1.0);
        float rim = pow(1.0 - max(dot(normalize(vN), vV), 0.0), 3.0);
        vec3 col = c * l * 1.7 + vec3(0.25,0.55,1.0) * rim * (0.25 + l * 1.2);
        gl_FragColor = vec4(col, 1.0);
      }`,
    fog: false, depthWrite: false,
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(340, 48, 32), planetMat);
  planet.position.set(-420, 190, -880); planet.rotation.y = 1.2; planet.rotation.z = 0.25;
  planet.renderOrder = -9;
  scene.add(planet);
  w.anim.push((t) => { planet.rotation.y = 1.2 + t * 0.004; });

  // --- ljus -----------------------------------------------------------------
  const hemi = new THREE.HemisphereLight(0x8fb0e0, 0x2a2434, 0.85);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xdfeaff, 1.7);
  sun.position.set(9, 30, 6); sun.target.position.set(0, 0, 0);
  sun.shadow.camera.left = -27; sun.shadow.camera.right = 27; sun.shadow.camera.top = 27; sun.shadow.camera.bottom = -27;
  sun.shadow.camera.near = 5; sun.shadow.camera.far = 70;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
  scene.add(sun, sun.target);
  w.lights.sun = sun;

  const reactorLight = new THREE.PointLight(0x35c8ff, 70, 34, 2); reactorLight.position.set(0, 3.2, 0);
  const warmLight = new THREE.PointLight(0xff7a2a, 40, 24, 2); warmLight.position.set(-13, 4.2, 10);
  const violetLight = new THREE.PointLight(0x9a5cff, 36, 24, 2); violetLight.position.set(13, 4.2, -11);
  scene.add(reactorLight, warmLight, violetLight);
  const muzzle = new THREE.PointLight(0xffb060, 0, 14, 2);
  const boom = new THREE.PointLight(0xff8a3a, 0, 26, 2);
  scene.add(muzzle, boom);
  Object.assign(w.lights, { reactorLight, warmLight, violetLight, muzzle, boom });

  // --- material --------------------------------------------------------------
  const floorSet = makePanelSet({ size: texSize, cols: 4, rows: 4, base: [82, 93, 110], seed: 3, glowSeams: { chance: 0.22, color: '#35e0ff' }, dirt: 1 });
  const wallSet = makePanelSet({ size: texSize, cols: 4, rows: 2, base: [104, 118, 140], seed: 8, glowSeams: null, dirt: 0.9, normalStrength: 4 });
  const crateSet = makePanelSet({ size: Math.min(texSize, 512), cols: 2, rows: 2, base: [128, 134, 146], seed: 21, accent: { color: 'rgba(227,178,28,0.9)' }, dirt: 1.2, normalStrength: 4 });
  const floorT = panelMaterialTextures(floorSet, [ARENA_R * 2 / 8, ARENA_R * 2 / 8], aniso);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorT.map, normalMap: floorT.normalMap, roughnessMap: floorT.roughnessMap, emissiveMap: floorT.emissiveMap,
    emissive: new THREE.Color(0.35, 1.0, 1.25), emissiveIntensity: 1, metalness: 0.4, roughness: 0.9, envMapIntensity: 1.0,
  });
  floorMat.normalScale.set(0.9, 0.9);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(ARENA_R + 0.2, 80), floorMat);
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
  scene.add(floor);

  const wallTex = (rep) => {
    const t = panelMaterialTextures(wallSet, rep, aniso);
    return new THREE.MeshStandardMaterial({ map: t.map, normalMap: t.normalMap, roughnessMap: t.roughnessMap, metalness: 0.35, roughness: 0.9, side: THREE.BackSide, envMapIntensity: 0.9 });
  };
  const lowerWall = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_R + 0.05, ARENA_R + 0.05, 2.2, 96, 1, true), wallTex([ARENA_R * 2 * Math.PI / 8, 0.55]));
  lowerWall.position.y = 1.1; lowerWall.receiveShadow = true;
  const upperWall = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_R + 0.05, ARENA_R + 0.05, 1.8, 96, 1, true), wallTex([ARENA_R * 2 * Math.PI / 8, 0.45]));
  upperWall.position.y = ARENA_H - 0.9;
  scene.add(lowerWall, upperWall);

  const ceilT = ceilingTextures();
  const ceil = new THREE.Mesh(new THREE.CircleGeometry(ARENA_R + 0.2, 64), new THREE.MeshStandardMaterial({
    map: ceilT.map, emissiveMap: ceilT.emissiveMap, emissive: new THREE.Color(1, 1, 1), emissiveIntensity: 1.4, metalness: 0.5, roughness: 0.6,
  }));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = ARENA_H;
  scene.add(ceil);

  // fönsterlister
  const trimGeo = new THREE.TorusGeometry(ARENA_R, 0.07, 6, 160);
  for (const y of [2.2, 7.2]) {
    const m = new THREE.Mesh(trimGeo, emissiveBasic(CYAN)); m.rotation.x = Math.PI / 2; m.position.y = y; scene.add(m);
  }

  // kolumner och spröjs
  const colT = panelMaterialTextures(wallSet, [1, 2.2], aniso);
  const colMat = new THREE.MeshStandardMaterial({ map: colT.map, normalMap: colT.normalMap, roughnessMap: colT.roughnessMap, metalness: 0.45, roughness: 0.8 });
  const stripCyan = emissiveBasic(CYAN), stripOrange = emissiveBasic(ORANGE);
  const colGeo = new THREE.BoxGeometry(1.7, ARENA_H, 1.1);
  const mullGeo = new THREE.BoxGeometry(0.22, 5.2, 0.3);
  const lightGeo = new THREE.BoxGeometry(0.14, 5.6, 0.06);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
    const c = new THREE.Mesh(colGeo, colMat);
    c.position.set(Math.cos(a) * (ARENA_R - 0.45), ARENA_H / 2, Math.sin(a) * (ARENA_R - 0.45));
    c.rotation.y = -a + Math.PI / 2;
    c.receiveShadow = true;
    scene.add(c);
    const l = new THREE.Mesh(lightGeo, i % 2 ? stripOrange : stripCyan);
    l.position.set(Math.cos(a) * (ARENA_R - 1.02), 4.5, Math.sin(a) * (ARENA_R - 1.02));
    l.rotation.y = -a + Math.PI / 2;
    scene.add(l);
    // spröjs mellan kolumnerna
    for (const k of [-0.33, 0.33]) {
      const am = a + (k * 2 * Math.PI) / 12 * 1.0;
      const mu = new THREE.Mesh(mullGeo, colMat);
      mu.position.set(Math.cos(am) * (ARENA_R - 0.1), 4.7, Math.sin(am) * (ARENA_R - 0.1));
      mu.rotation.y = -am + Math.PI / 2;
      scene.add(mu);
    }
  }

  // golvringar och reaktorns varningszon
  const hazard = hazardTexture(); hazard.wrapS = hazard.wrapT = THREE.RepeatWrapping; hazard.repeat.set(10, 1);
  const hazardRing = new THREE.Mesh(new THREE.RingGeometry(3.95, 5.0, 64), new THREE.MeshStandardMaterial({ map: hazard, metalness: 0.3, roughness: 0.7 }));
  hazardRing.rotation.x = -Math.PI / 2; hazardRing.position.y = 0.012; hazardRing.receiveShadow = true;
  scene.add(hazardRing);
  for (const [r, t] of [[10.5, 0.07], [16.8, 0.07], [22.8, 0.1]]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + t, 128), emissiveBasic(CYAN));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; scene.add(ring);
  }
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const sp = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 5.4), emissiveBasic(CYAN));
    sp.rotation.x = -Math.PI / 2; sp.rotation.z = -a + Math.PI / 2;
    sp.position.set(Math.cos(a) * 7.7, 0.022, Math.sin(a) * 7.7);
    scene.add(sp);
  }

  // --- reaktor ---------------------------------------------------------------
  const metalDark = new THREE.MeshStandardMaterial({ color: 0x20262e, metalness: 0.9, roughness: 0.35 });
  const metalMid = new THREE.MeshStandardMaterial({ color: 0x4a5462, metalness: 0.85, roughness: 0.4 });
  const reactor = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 4.0, 0.5, 48), metalMid); base.position.y = 0.25; base.castShadow = true; base.receiveShadow = true;
  const base2 = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.2, 0.5, 48), metalDark); base2.position.y = 0.72; base2.castShadow = true;
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(3.45, 0.06, 6, 64), emissiveBasic(CYAN)); baseRing.rotation.x = Math.PI / 2; baseRing.position.y = 0.52;
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x0a2430, emissive: new THREE.Color(0.15, 1.2, 1.9), emissiveIntensity: 0.9, roughness: 0.2, metalness: 0.2, transparent: true, opacity: 0.88 });
  const core = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, ARENA_H - 1.4, 32, 1, true), coreMat); core.position.y = 0.95 + (ARENA_H - 1.4) / 2;
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, ARENA_H - 0.9, 16), emissiveBasic(hdr(0.8, 2.6, 3.4))); inner.position.y = (ARENA_H - 0.9) / 2 + 0.5;
  reactor.add(base, base2, baseRing, core, inner);
  const rings = [];
  for (let i = 0; i < 4; i++) {
    const r = new THREE.Mesh(new THREE.TorusGeometry(1.55 + (i % 2) * 0.25, 0.1, 10, 40), i % 2 ? metalMid : metalDark);
    r.position.y = 1.8 + i * 1.7; r.castShadow = true; reactor.add(r); rings.push(r);
    const e = new THREE.Mesh(new THREE.TorusGeometry(1.55 + (i % 2) * 0.25, 0.035, 6, 40), emissiveBasic(i % 2 ? ORANGE : CYAN));
    r.add(e);
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.28, ARENA_H - 1.2, 0.28), metalDark);
    strut.position.set(Math.cos(a) * 2.4, (ARENA_H - 1.2) / 2 + 0.9, Math.sin(a) * 2.4); strut.castShadow = true;
    reactor.add(strut);
  }
  scene.add(reactor);
  phys.addCyl(0, 0, 3.95, ARENA_H);
  w.anim.push((t) => {
    rings.forEach((r, i) => { r.rotation.x = Math.sin(t * 0.6 + i) * 0.35; r.rotation.y = t * (0.5 + i * 0.2) * (i % 2 ? -1 : 1); });
    coreMat.emissiveIntensity = 0.85 + Math.sin(t * 3.1) * 0.15 + Math.sin(t * 7.3) * 0.06;
    reactorLight.intensity = 66 + Math.sin(t * 3.1) * 8;
  });

  // ljusstrålar från taket
  const beamT = beamTexture();
  const beamMat = new THREE.MeshBasicMaterial({ map: beamT, color: hdr(0.045, 0.13, 0.17), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false, toneMapped: false });
  const fixtureMat = emissiveBasic(hdr(4, 4.4, 5));
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6, r = 14;
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 2.4, ARENA_H - 0.2, 24, 1, true), beamMat);
    beam.position.set(Math.cos(a) * r, (ARENA_H - 0.2) / 2 + 0.1, Math.sin(a) * r);
    scene.add(beam);
    const fx = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 20), fixtureMat);
    fx.position.set(Math.cos(a) * r, ARENA_H - 0.06, Math.sin(a) * r);
    scene.add(fx);
  }
  const rbeam = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 4.3, ARENA_H, 32, 1, true), new THREE.MeshBasicMaterial({ map: beamT, color: hdr(0.03, 0.12, 0.17), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false, toneMapped: false }));
  rbeam.position.y = ARENA_H / 2; scene.add(rbeam);

  // --- hinder ------------------------------------------------------------------
  const crateT = panelMaterialTextures(crateSet, [1, 1], aniso);
  const crateMat = new THREE.MeshStandardMaterial({ map: crateT.map, normalMap: crateT.normalMap, roughnessMap: crateT.roughnessMap, metalness: 0.4, roughness: 0.85, envMapIntensity: 1 });
  const hazMat = new THREE.MeshStandardMaterial({ map: hazard.clone(), metalness: 0.3, roughness: 0.7 });
  hazMat.map.repeat.set(3, 0.3); hazMat.map.needsUpdate = true;
  const addBox = (cx, cz, sx, sy, sz, yaw, mat = crateMat) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(sx, sy, sz, 2, 0.06), mat);
    m.position.set(cx, sy / 2, cz); m.rotation.y = yaw; m.castShadow = true; m.receiveShadow = true;
    scene.add(m);
    phys.addBox(cx, cz, sx / 2, sz / 2, yaw, sy);
    return m;
  };
  // barrikader (tangentiellt) vid radie 11
  for (let i = 0; i < 6; i++) {
    const th = (i / 6) * Math.PI * 2 + Math.PI / 6 + 0.18;
    const cx = Math.cos(th) * 11.5, cz = Math.sin(th) * 11.5;
    const yaw = Math.atan2(-Math.cos(th), -Math.sin(th));
    addBox(cx, cz, 3.6, 1.35, 0.8, yaw);
    const top = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.08, 0.9), emissiveBasic(i % 2 ? ORANGE : CYAN));
    top.position.set(cx, 1.37, cz); top.rotation.y = yaw; scene.add(top);
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.3, 0.84), hazMat);
    base.position.set(cx, 0.15, cz); base.rotation.y = yaw; scene.add(base);
  }
  // containerstaplar vid radie 7.5
  for (let i = 0; i < 4; i++) {
    const th = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const cx = Math.cos(th) * 8.6, cz = Math.sin(th) * 8.6, yaw = th + 0.3;
    const ux = Math.cos(yaw), uz = -Math.sin(yaw);
    addBox(cx, cz, 1.7, 1.7, 1.7, yaw);
    addBox(cx + ux * 1.75, cz + uz * 1.75, 1.7, 1.7, 1.7, yaw + 0.15);
    addBox(cx + ux * 0.4, cz + uz * 0.4, 1.4, 1.4, 1.4, yaw - 0.2).position.y += 1.7;
    phys.boxes[phys.boxes.length - 1].h = 3.1; // översta lådan
    phys.boxes[phys.boxes.length - 1].cx = cx + ux * 0.4;
    phys.boxes[phys.boxes.length - 1].cz = cz + uz * 0.4;
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.06, 1.5), emissiveBasic(i % 2 ? CYAN : ORANGE));
    cap.position.set(cx + ux * 0.4, 3.13, cz + uz * 0.4); cap.rotation.y = yaw - 0.2; scene.add(cap);
  }
  // höga pelare vid radie 17
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5a6676, metalness: 0.6, roughness: 0.5 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6 - 0.2;
    const x = Math.cos(a) * 17, z = Math.sin(a) * 17;
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, ARENA_H, 20), pillarMat);
    p.position.set(x, ARENA_H / 2, z); p.castShadow = true; p.receiveShadow = true; scene.add(p);
    for (const y of [1.0, 2.6, 4.2, 5.8, 7.4]) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.035, 6, 24), emissiveBasic(i % 2 ? ORANGE : CYAN));
      r.rotation.x = Math.PI / 2; r.position.set(x, y, z); scene.add(r);
    }
    phys.addCyl(x, z, 0.8, ARENA_H);
  }

  // --- spawn-portar --------------------------------------------------------------
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x0a0c10, metalness: 0.8, roughness: 0.4 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a303a, metalness: 0.9, roughness: 0.4 });
  const glowTex = glowTexture();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const g = new THREE.Group();
    g.position.set(Math.cos(a) * (ARENA_R - 0.05), 0, Math.sin(a) * (ARENA_R - 0.05));
    g.rotation.y = -a - Math.PI / 2; // +Z lokalt pekar mot arenans mitt
    const door = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.6, 0.3), doorMat); door.position.set(0, 1.8, -0.05);
    const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.8, 0.5), frameMat); frameL.position.set(-1.9, 1.9, 0);
    const frameR = frameL.clone(); frameR.position.x = 1.9;
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 0.5), frameMat); lintel.position.set(0, 3.8, 0);
    const lampMat = emissiveBasic(hdr(2.8, 0.25, 0.15));
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.1), lampMat); lamp.position.set(0, 3.55, 0.28);
    const slitMat = new THREE.MeshBasicMaterial({ color: hdr(0.4, 0.05, 0.03), toneMapped: false });
    const slit = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.2), slitMat); slit.position.set(0, 1.8, 0.12);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: hdr(2.5, 0.35, 0.2), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, toneMapped: false }));
    glow.position.set(0, 1.8, 0.8); glow.scale.set(6, 5, 1);
    g.add(door, frameL, frameR, lintel, lamp, slit, glow);
    scene.add(g);
    const portal = {
      pos: new THREE.Vector3(Math.cos(a) * (ARENA_R - 2.6), 0, Math.sin(a) * (ARENA_R - 2.6)),
      angle: a, glow: 0, lampMat, slitMat, sprite: glow,
    };
    w.portals.push(portal);
  }
  w.anim.push((t, dt) => {
    for (const p of w.portals) {
      p.glow = Math.max(0, p.glow - dt * 0.8);
      const pulse = p.glow > 0 ? 0.5 + 0.5 * Math.sin(t * 22) : 0;
      p.sprite.material.opacity = Math.min(1, p.glow) * (0.55 + pulse * 0.45);
      const k = 0.4 + Math.min(1, p.glow) * 4 * (0.6 + 0.4 * pulse);
      p.slitMat.color.setRGB(0.4 * k * 0.2, 0.05 * k * 0.2, 0.03 * k * 0.2);
      p.lampMat.color.setRGB(2.8 * (0.35 + Math.min(1, p.glow)), 0.25, 0.15);
    }
  });

  w.update = (t, dt) => { for (const f of w.anim) f(t, dt); };
  w.setShadows = (on, size) => {
    renderer.shadowMap.enabled = on;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    sun.castShadow = on;
    if (on && sun.shadow.mapSize.x !== size) {
      sun.shadow.mapSize.set(size, size);
      if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
    }
    scene.traverse((o) => { if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach((m) => { m.needsUpdate = true; }); } });
  };
  return w;
}
