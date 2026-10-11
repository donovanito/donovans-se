// Enkla kollisioner: cirkel (x,z) mot roterade lådor och cylindrar + 3D-strålar.
import { clamp } from './util.js';

export const ARENA_R = 24;
export const ARENA_H = 9;

export class World {
  constructor() {
    this.boxes = [];
    this.cyls = [];
    this.hit = { nx: 0, ny: 1, nz: 0, kind: 'floor' };
  }
  addBox(cx, cz, hx, hz, yaw, h) {
    this.boxes.push({ cx, cz, hx, hz, c: Math.cos(yaw), s: Math.sin(yaw), h, yaw });
  }
  addCyl(cx, cz, r, h) {
    this.cyls.push({ cx, cz, r, h });
  }

  /** Skjut ut en cirkel (pos.x,pos.z) ur hinder + håll inom arenan. y = fotens höjd. */
  resolve(pos, radius, y = 0) {
    for (const b of this.boxes) {
      if (y > b.h) continue;
      const dx = pos.x - b.cx, dz = pos.z - b.cz;
      const lx = dx * b.c - dz * b.s, lz = dx * b.s + dz * b.c;
      const qx = clamp(lx, -b.hx, b.hx), qz = clamp(lz, -b.hz, b.hz);
      let ox = lx - qx, oz = lz - qz;
      const d2 = ox * ox + oz * oz;
      if (d2 >= radius * radius) continue;
      let px, pz;
      if (d2 > 1e-8) {
        const d = Math.sqrt(d2), k = (radius - d) / d;
        px = ox * k; pz = oz * k;
      } else {
        const ex = b.hx - Math.abs(lx), ez = b.hz - Math.abs(lz);
        if (ex < ez) { px = (lx >= 0 ? ex + radius : -(ex + radius)); pz = 0; }
        else { pz = (lz >= 0 ? ez + radius : -(ez + radius)); px = 0; }
      }
      pos.x += px * b.c + pz * b.s;
      pos.z += -px * b.s + pz * b.c;
    }
    for (const c of this.cyls) {
      if (y > c.h) continue;
      const dx = pos.x - c.cx, dz = pos.z - c.cz;
      const d2 = dx * dx + dz * dz, rr = c.r + radius;
      if (d2 >= rr * rr) continue;
      const d = Math.sqrt(d2) || 0.0001, k = (rr - d) / d;
      pos.x += dx * k; pos.z += dz * k;
    }
    const d = Math.hypot(pos.x, pos.z), lim = ARENA_R - radius - 0.05;
    if (d > lim) { pos.x *= lim / d; pos.z *= lim / d; }
  }

  /** Stråle mot hinder (+ skal om shell). Returnerar t eller -1. Normal i this.hit. */
  ray(ox, oy, oz, dx, dy, dz, maxT, shell = true) {
    let best = maxT, found = false;
    const H = this.hit;
    for (const b of this.boxes) {
      // till lokalt rum
      const rx = ox - b.cx, rz = oz - b.cz;
      const lox = rx * b.c - rz * b.s, loz = rx * b.s + rz * b.c;
      const ldx = dx * b.c - dz * b.s, ldz = dx * b.s + dz * b.c;
      let t0 = 0, t1 = best, axis = -1, sign = 0;
      // x-slab
      const mins = [-b.hx, 0, -b.hz], maxs = [b.hx, b.h, b.hz];
      const o = [lox, oy, loz], d = [ldx, dy, ldz];
      let ok = true;
      for (let a = 0; a < 3; a++) {
        if (Math.abs(d[a]) < 1e-9) { if (o[a] < mins[a] || o[a] > maxs[a]) { ok = false; break; } continue; }
        let ta = (mins[a] - o[a]) / d[a], tb = (maxs[a] - o[a]) / d[a], sg = -1;
        if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; sg = 1; }
        if (ta > t0) { t0 = ta; axis = a; sign = sg; }
        if (tb < t1) t1 = tb;
        if (t0 > t1) { ok = false; break; }
      }
      if (!ok || axis < 0 || t0 >= best) continue;
      best = t0; found = true;
      if (axis === 0) { H.nx = sign * b.c; H.nz = -sign * b.s; H.ny = 0; }
      else if (axis === 2) { H.nx = sign * b.s; H.nz = sign * b.c; H.ny = 0; }
      else { H.nx = 0; H.ny = sign; H.nz = 0; }
      H.kind = 'crate';
    }
    for (const c of this.cyls) {
      const rx = ox - c.cx, rz = oz - c.cz;
      const a = dx * dx + dz * dz;
      if (a > 1e-9) {
        const bq = rx * dx + rz * dz, cq = rx * rx + rz * rz - c.r * c.r;
        const disc = bq * bq - a * cq;
        if (disc >= 0) {
          const t = (-bq - Math.sqrt(disc)) / a;
          if (t > 0 && t < best) {
            const y = oy + dy * t;
            if (y >= 0 && y <= c.h) {
              best = t; found = true;
              const hx = rx + dx * t, hz = rz + dz * t, l = Math.hypot(hx, hz) || 1;
              H.nx = hx / l; H.nz = hz / l; H.ny = 0; H.kind = 'pillar';
              continue;
            }
          }
        }
      }
      if (Math.abs(dy) > 1e-9) {
        const t = (c.h - oy) / dy;
        if (t > 0 && t < best) {
          const hx = rx + dx * t, hz = rz + dz * t;
          if (hx * hx + hz * hz <= c.r * c.r) { best = t; found = true; H.nx = 0; H.ny = 1; H.nz = 0; H.kind = 'crate'; }
        }
      }
    }
    if (shell) {
      if (dy < -1e-9) {
        const t = -oy / dy;
        if (t > 0 && t < best) { best = t; found = true; H.nx = 0; H.ny = 1; H.nz = 0; H.kind = 'floor'; }
      } else if (dy > 1e-9) {
        const t = (ARENA_H - oy) / dy;
        if (t > 0 && t < best) { best = t; found = true; H.nx = 0; H.ny = -1; H.nz = 0; H.kind = 'ceil'; }
      }
      const a = dx * dx + dz * dz;
      if (a > 1e-9) {
        const bq = ox * dx + oz * dz, cq = ox * ox + oz * oz - ARENA_R * ARENA_R;
        const disc = bq * bq - a * cq;
        if (disc >= 0) {
          const t = (-bq + Math.sqrt(disc)) / a;
          if (t > 0 && t < best) {
            best = t; found = true;
            const hx = ox + dx * t, hz = oz + dz * t, l = Math.hypot(hx, hz) || 1;
            H.nx = -hx / l; H.nz = -hz / l; H.ny = 0; H.kind = 'wall';
          }
        }
      }
    }
    return found ? best : -1;
  }

  /** Fri sikt mellan två punkter (endast hinder)? */
  clear(ax, ay, az, bx, by, bz) {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    if (len < 0.001) return true;
    return this.ray(ax, ay, az, dx / len, dy / len, dz / len, len, false) < 0;
  }
}
