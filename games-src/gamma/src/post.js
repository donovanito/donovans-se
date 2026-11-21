// Slutlig bildbehandling: vignett, kromatisk aberration, filmkorn och subtil färggradering.
// Körs efter OutputPass, d.v.s. i displayrymd (sRGB).
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { PerspectiveCamera } from 'three';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';

const FinishShader = {
  name: 'FinishShader',
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    aberr: { value: 0.0007 },   // grundstyrka (andel av skärmbredd)
    hurt: { value: 0 },          // 0..1, ökar aberration + vignett vid skada
    vignette: { value: 0.32 },
    grain: { value: 0.035 },
    aspect: { value: 1 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time, aberr, hurt, vignette, grain, aspect; varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    void main(){
      vec2 c = vUv - 0.5;
      float r2 = dot(c * vec2(aspect, 1.0), c * vec2(aspect, 1.0));
      // aberration växer mot kanterna, tydligare vid skada
      vec2 off = c * r2 * (aberr * 6.0 + hurt * 0.018);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      // gradering: lätt S-kurva, kall skugga / varm högdager
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, 1.08);
      col = col * col * (3.0 - 2.0 * col) * 0.35 + col * 0.65;
      col += vec3(-0.006, 0.0, 0.012) * (1.0 - l) + vec3(0.012, 0.004, -0.008) * l * 0.5;
      // vignett
      float v = smoothstep(0.18, 0.95, r2 * 1.6);
      col *= 1.0 - v * (vignette + hurt * 0.25);
      col.r += v * hurt * 0.10;
      // filmkorn (mest i skuggor)
      float g = hash(vUv * vec2(1920.0, 1080.0) + fract(time) * 71.0) - 0.5;
      col += g * grain * (1.0 - l * 0.7);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`,
};

export function makeFinishPass() {
  const p = new ShaderPass(FinishShader);
  return p;
}

// GTAO som bara tar med solid geometri: dolda balkar, glöd och andra additiva/ogenomskinliga-utan-djup meshes
// får inte skriva normal/djup, annars får de "AO-skuggor".
export function makeAOPass(scene, camera, w, h) {
  // Egen kamera med kort räckvidd: huvudkameran har far=2600 och ger för dålig djupprecision för AO.
  const aoCam = new PerspectiveCamera(camera.fov, camera.aspect, 0.1, 70);
  const ao = new GTAOPass(scene, aoCam, w, h);
  ao.syncCamera = () => {
    aoCam.fov = camera.fov; aoCam.aspect = camera.aspect; aoCam.updateProjectionMatrix();
    camera.updateMatrixWorld();
    aoCam.matrixWorld.copy(camera.matrixWorld); aoCam.matrixWorldInverse.copy(camera.matrixWorldInverse);
    aoCam.position.copy(camera.position); aoCam.quaternion.copy(camera.quaternion);
  };
  ao.output = GTAOPass.OUTPUT.Default;
  ao.blendIntensity = 0.75;
  ao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1.5, thickness: 1.0, scale: 1.0, samples: 12, distanceFallOff: 1.0, screenSpaceRadius: false });
  ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 5, rings: 2, samples: 12 });
  const baseOverride = ao.overrideVisibility.bind(ao);
  ao.overrideVisibility = function () {
    baseOverride();
    this.scene.traverse((o) => {
      if (o.isSprite) { o.visible = false; return; } // portalernas glöd-sprites (opacity 0) skulle annars bli svarta rektanglar
      if (!o.isMesh || !o.visible) return;
      const m = o.material;
      if (m && (m.depthWrite === false || (m.transparent && m.blending !== 1))) o.visible = false;
    });
  };
  return ao;
}
