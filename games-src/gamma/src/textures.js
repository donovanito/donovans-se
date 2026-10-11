// Procedurella texturer (ritas på canvas vid start - inga bildfiler behövs).
import * as THREE from 'three';
import { mulberry32 } from './util.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function heightToNormal(hc, strength) {
  const w = hc.width, h = hc.height;
  const src = hc.getContext('2d').getImageData(0, 0, w, h).data;
  const out = canvas(w, h);
  const ctx = out.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const H = (x, y) => src[(((y + h) % h) * w + ((x + w) % w)) * 4] / 255;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (H(x + 1, y) - H(x - 1, y)) * strength;
      const dy = (H(x, y + 1) - H(x, y - 1)) * strength;
      const len = Math.sqrt(dx * dx + dy * dy + 1);
      const i = (y * w + x) * 4;
      d[i] = (-dx / len * 0.5 + 0.5) * 255;
      d[i + 1] = (dy / len * 0.5 + 0.5) * 255;
      d[i + 2] = (1 / len * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return out;
}

function tex(c, srgb, repeat = [1, 1], aniso = 4) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Metallic panel material set: color, normal, roughness (+ optional emissive).
 * opts: size, cols, rows, base, seed, bolts, glowSeams, accent, dirt
 */
export function makePanelSet(opts = {}) {
  const { size = 1024, cols = 4, rows = 4, base = [58, 68, 82], seed = 1, bolts = true, glowSeams = null, accent = null, dirt = 0.5, normalStrength = 3 } = opts;
  const W = size, H = Math.round(size * rows / cols);
  const rnd = mulberry32(seed);
  const col = canvas(W, H), hgt = canvas(W, H), rgh = canvas(W, H);
  const cx = col.getContext('2d'), hx = hgt.getContext('2d'), rx = rgh.getContext('2d');
  const emi = glowSeams ? canvas(W, H) : null;
  const ex = emi ? emi.getContext('2d') : null;
  if (ex) { ex.fillStyle = '#000'; ex.fillRect(0, 0, W, H); }
  hx.fillStyle = '#9a9a9a'; hx.fillRect(0, 0, W, H);
  rx.fillStyle = '#8a8a8a'; rx.fillRect(0, 0, W, H);
  const pw = W / cols, ph = H / rows;
  const g = Math.max(3, W / 200);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * pw, y = j * ph;
      const l = 0.88 + rnd() * 0.24;
      cx.fillStyle = `rgb(${base[0] * l | 0},${base[1] * l | 0},${base[2] * l | 0})`;
      cx.fillRect(x, y, pw, ph);
      // svag gradient per panel
      const gr = cx.createLinearGradient(x, y, x + pw, y + ph);
      gr.addColorStop(0, 'rgba(255,255,255,0.05)'); gr.addColorStop(1, 'rgba(0,0,0,0.12)');
      cx.fillStyle = gr; cx.fillRect(x, y, pw, ph);
      // inre insänkning
      const m = g * 3;
      cx.strokeStyle = 'rgba(0,0,0,0.35)'; cx.lineWidth = g * 0.8;
      cx.strokeRect(x + m, y + m, pw - m * 2, ph - m * 2);
      hx.strokeStyle = '#555'; hx.lineWidth = g * 0.8; hx.strokeRect(x + m, y + m, pw - m * 2, ph - m * 2);
      hx.fillStyle = '#a8a8a8'; hx.fillRect(x + m + g, y + m + g, pw - (m + g) * 2, ph - (m + g) * 2);
      // fog mellan paneler
      cx.fillStyle = 'rgba(0,0,0,0.75)'; hx.fillStyle = '#000'; rx.fillStyle = '#ddd';
      cx.fillRect(x, y, pw, g); cx.fillRect(x, y, g, ph);
      hx.fillRect(x, y, pw, g); hx.fillRect(x, y, g, ph);
      rx.fillRect(x, y, pw, g); rx.fillRect(x, y, g, ph);
      cx.fillStyle = 'rgba(255,255,255,0.08)';
      cx.fillRect(x + g, y + g, pw - g, 1); cx.fillRect(x + g, y + g, 1, ph - g);
      if (bolts) {
        const bm = g * 6, br = g * 1.5;
        for (const [bx, by] of [[x + bm, y + bm], [x + pw - bm, y + bm], [x + bm, y + ph - bm], [x + pw - bm, y + ph - bm]]) {
          cx.fillStyle = 'rgba(20,24,30,0.9)'; cx.beginPath(); cx.arc(bx, by, br, 0, 7); cx.fill();
          cx.fillStyle = 'rgba(190,200,215,0.55)'; cx.beginPath(); cx.arc(bx - 1, by - 1, br * 0.5, 0, 7); cx.fill();
          hx.fillStyle = '#fff'; hx.beginPath(); hx.arc(bx, by, br, 0, 7); hx.fill();
        }
      }
      if (ex && rnd() < glowSeams.chance) {
        ex.strokeStyle = glowSeams.color; ex.lineWidth = g * 0.9;
        ex.beginPath();
        if (rnd() < 0.5) { ex.moveTo(x + pw * 0.15, y + ph * 0.5); ex.lineTo(x + pw * 0.85, y + ph * 0.5); }
        else { ex.moveTo(x + m * 1.5, y + m * 1.5); ex.lineTo(x + pw - m * 1.5, y + m * 1.5); ex.lineTo(x + pw - m * 1.5, y + ph - m * 1.5); }
        ex.stroke();
      }
    }
  }
  if (accent) {
    cx.fillStyle = accent.color;
    for (let j = 0; j < rows; j++) cx.fillRect(0, j * ph + ph * 0.5 - g, W, g * 2);
  }
  // smuts, repor, fläckar
  for (let n = 0; n < 220 * dirt; n++) {
    const x = rnd() * W, y = rnd() * H, r = 6 + rnd() * 40;
    const gr = cx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(0,0,0,${0.05 + rnd() * 0.12})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    cx.fillStyle = gr; cx.fillRect(x - r, y - r, r * 2, r * 2);
    const rg = rx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(255,255,255,${0.15 + rnd() * 0.25})`); rg.addColorStop(1, 'rgba(255,255,255,0)');
    rx.fillStyle = rg; rx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  for (let n = 0; n < 160 * dirt; n++) {
    const x = rnd() * W, y = rnd() * H, len = 10 + rnd() * 70, a = rnd() * 6.28;
    cx.strokeStyle = `rgba(210,220,235,${0.04 + rnd() * 0.12})`; cx.lineWidth = 1;
    cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); cx.stroke();
    hx.strokeStyle = 'rgba(0,0,0,0.25)'; hx.lineWidth = 1;
    hx.beginPath(); hx.moveTo(x, y); hx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); hx.stroke();
  }
  // vertikala rinnmarkeringar
  for (let n = 0; n < 40 * dirt; n++) {
    const x = rnd() * W, y = rnd() * H, len = 40 + rnd() * 160;
    const gr = cx.createLinearGradient(x, y, x, y + len);
    gr.addColorStop(0, 'rgba(10,12,16,0.2)'); gr.addColorStop(1, 'rgba(10,12,16,0)');
    cx.fillStyle = gr; cx.fillRect(x, y, 2 + rnd() * 6, len);
  }
  // brus
  const id = cx.getImageData(0, 0, W, H);
  for (let i = 0; i < id.data.length; i += 4) {
    const n = (rnd() - 0.5) * 12;
    id.data[i] += n; id.data[i + 1] += n; id.data[i + 2] += n;
  }
  cx.putImageData(id, 0, 0);
  return { color: col, height: hgt, rough: rgh, emissive: emi, normal: heightToNormal(hgt, normalStrength) };
}

export function panelMaterialTextures(set, repeat, aniso) {
  return {
    map: tex(set.color, true, repeat, aniso),
    normalMap: tex(set.normal, false, repeat, aniso),
    roughnessMap: tex(set.rough, false, repeat, aniso),
    emissiveMap: set.emissive ? tex(set.emissive, true, repeat, aniso) : null,
  };
}

export function hazardTexture() {
  const c = canvas(256, 256), x = c.getContext('2d');
  x.fillStyle = '#e3b21c'; x.fillRect(0, 0, 256, 256);
  x.fillStyle = '#15181c';
  for (let i = -4; i < 8; i++) {
    x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64 + 32, 0); x.lineTo(i * 64 + 32 + 256, 256); x.lineTo(i * 64 + 256, 256); x.fill();
  }
  const id = x.getImageData(0, 0, 256, 256), r = mulberry32(5);
  for (let i = 0; i < id.data.length; i += 4) { const n = (r() - 0.5) * 24; id.data[i] += n; id.data[i + 1] += n; id.data[i + 2] += n; }
  x.putImageData(id, 0, 0);
  return tex(c, true, [1, 1]);
}

export function ceilingTextures() {
  const S = 1024, col = canvas(S, S), emi = canvas(S, S);
  const c = col.getContext('2d'), e = emi.getContext('2d');
  c.fillStyle = '#1b222b'; c.fillRect(0, 0, S, S);
  e.fillStyle = '#000'; e.fillRect(0, 0, S, S);
  const m = S / 2;
  for (let r = 60; r < 520; r += 62) {
    c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = 6; c.beginPath(); c.arc(m, m, r, 0, 7); c.stroke();
    c.strokeStyle = 'rgba(120,140,170,0.15)'; c.lineWidth = 2; c.beginPath(); c.arc(m, m, r + 4, 0, 7); c.stroke();
  }
  for (let a = 0; a < 24; a++) {
    const an = (a / 24) * 6.2832;
    c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = 4; c.beginPath();
    c.moveTo(m + Math.cos(an) * 60, m + Math.sin(an) * 60); c.lineTo(m + Math.cos(an) * 520, m + Math.sin(an) * 520); c.stroke();
  }
  for (const [r, col2, w] of [[210, '#35e0ff', 8], [330, '#ffffff', 6], [450, '#35e0ff', 8]]) {
    e.strokeStyle = col2; e.lineWidth = w; e.beginPath(); e.arc(m, m, r, 0, 7); e.stroke();
    c.strokeStyle = '#6a7683'; c.lineWidth = w + 6; c.beginPath(); c.arc(m, m, r, 0, 7); c.stroke();
    c.strokeStyle = col2; c.lineWidth = w; c.beginPath(); c.arc(m, m, r, 0, 7); c.stroke();
  }
  return { map: tex(col, true), emissiveMap: tex(emi, true) };
}

// --- Rymdbakgrund ---------------------------------------------------------
function hash3(x, y, z, s) {
  let h = (x * 374761393 + y * 668265263 + z * 1274126177 + s * 144665) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x, y, z, s) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  let r = 0;
  for (let k = 0; k < 8; k++) {
    const dx = k & 1, dy = (k >> 1) & 1, dz = (k >> 2) & 1;
    const wt = (dx ? u : 1 - u) * (dy ? v : 1 - v) * (dz ? w : 1 - w);
    r += wt * hash3(xi + dx, yi + dy, zi + dz, s);
  }
  return r;
}
function fbm(x, y, z, s, oct = 5) {
  let a = 0.5, f = 1, t = 0;
  for (let i = 0; i < oct; i++) { t += a * vnoise(x * f, y * f, z * f, s + i); a *= 0.5; f *= 2.03; }
  return t;
}

export function skyTexture(big = true) {
  const W = big ? 2048 : 1024, H = W / 2;
  const sw = 256, sh = 128;
  const small = canvas(sw, sh), sx = small.getContext('2d');
  const id = sx.createImageData(sw, sh);
  for (let y = 0; y < sh; y++) {
    const lat = (0.5 - (y + 0.5) / sh) * Math.PI;
    for (let x = 0; x < sw; x++) {
      const lon = ((x + 0.5) / sw) * Math.PI * 2;
      const dx = Math.cos(lat) * Math.cos(lon), dy = Math.sin(lat), dz = Math.cos(lat) * Math.sin(lon);
      const n = fbm(dx * 2.2 + 5, dy * 2.2 + 5, dz * 2.2 + 5, 11);
      const n2 = fbm(dx * 4.5 + 9, dy * 4.5 + 9, dz * 4.5 + 9, 23, 4);
      const band = Math.exp(-Math.pow(dy * 2.2 + 0.3, 2) * 2); // mjölkvägsband
      const k = Math.max(0, n - 0.38) * 2.4 * (0.35 + band);
      const k2 = Math.max(0, n2 - 0.45) * 1.8 * band;
      const i = (y * sw + x) * 4;
      id.data[i] = Math.min(255, 10 + k * 120 + k2 * 160);
      id.data[i + 1] = Math.min(255, 14 + k * 70 + k2 * 90);
      id.data[i + 2] = Math.min(255, 28 + k * 190 + k2 * 70);
      id.data[i + 3] = 255;
    }
  }
  sx.putImageData(id, 0, 0);
  const c = canvas(W, H), x = c.getContext('2d');
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
  x.drawImage(small, 0, 0, W, H);
  const r = mulberry32(77);
  for (let i = 0; i < W * 2.2; i++) {
    const px = r() * W, py = r() * H, b = Math.pow(r(), 6);
    const warm = r();
    x.fillStyle = `rgba(${warm < 0.2 ? 255 : 200 + (r() * 55 | 0)},${warm < 0.2 ? 210 : 220 + (r() * 35 | 0)},${warm > 0.8 ? 255 : 235},${0.25 + b * 0.75})`;
    const s = 0.6 + b * 2.4;
    x.fillRect(px, py, s, s);
  }
  for (let i = 0; i < 40; i++) {
    const px = r() * W, py = r() * H, rad = 5 + r() * 10;
    const gr = x.createRadialGradient(px, py, 0, px, py, rad);
    gr.addColorStop(0, 'rgba(255,255,255,0.95)'); gr.addColorStop(0.2, 'rgba(180,210,255,0.35)'); gr.addColorStop(1, 'rgba(180,210,255,0)');
    x.fillStyle = gr; x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.mapping = THREE.EquirectangularReflectionMapping;
  return t;
}

export function planetTexture() {
  const W = 1024, H = 512, c = canvas(W, H), x = c.getContext('2d');
  const id = x.createImageData(W, H);
  const pal = [[28, 52, 96], [60, 110, 160], [210, 200, 170], [150, 90, 70], [90, 60, 110]];
  for (let y = 0; y < H; y++) {
    const lat = (0.5 - y / H) * Math.PI;
    for (let xx = 0; xx < W; xx++) {
      const lon = (xx / W) * Math.PI * 2;
      const dx = Math.cos(lat) * Math.cos(lon), dy = Math.sin(lat), dz = Math.cos(lat) * Math.sin(lon);
      const warp = fbm(dx * 3, dy * 6, dz * 3, 3, 4) * 0.5;
      const band = (Math.sin((dy + warp * 0.4) * 11) * 0.5 + 0.5);
      const n = fbm(dx * 6, dy * 14, dz * 6, 9, 5);
      const t = Math.min(0.999, Math.max(0, band * 0.65 + n * 0.5));
      const p = t * (pal.length - 1), a = pal[Math.floor(p)], b = pal[Math.min(pal.length - 1, Math.floor(p) + 1)], f = p - Math.floor(p);
      const i = (y * W + xx) * 4;
      id.data[i] = a[0] + (b[0] - a[0]) * f; id.data[i + 1] = a[1] + (b[1] - a[1]) * f; id.data[i + 2] = a[2] + (b[2] - a[2]) * f; id.data[i + 3] = 255;
    }
  }
  x.putImageData(id, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function glowTexture(inner = 'rgba(255,255,255,1)', mid = 'rgba(255,255,255,0.35)', size = 128) {
  const c = canvas(size, size), x = c.getContext('2d');
  const gr = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gr.addColorStop(0, inner); gr.addColorStop(0.25, mid); gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr; x.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function flashTexture() {
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  const gr = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,240,1)'); gr.addColorStop(0.3, 'rgba(255,200,120,0.7)'); gr.addColorStop(1, 'rgba(255,120,40,0)');
  x.fillStyle = gr; x.fillRect(0, 0, S, S);
  x.translate(S / 2, S / 2);
  x.fillStyle = 'rgba(255,240,200,0.9)';
  for (let i = 0; i < 6; i++) {
    x.rotate(Math.PI / 3);
    x.beginPath(); x.moveTo(0, -3); x.lineTo(S * 0.48, 0); x.lineTo(0, 3); x.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function beamTexture() {
  const c = canvas(8, 256), x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.3)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 8, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function decalTexture() {
  const S = 64, c = canvas(S, S), x = c.getContext('2d');
  const gr = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(0,0,0,0.9)'); gr.addColorStop(0.35, 'rgba(10,10,10,0.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr; x.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(c);
  return t;
}
