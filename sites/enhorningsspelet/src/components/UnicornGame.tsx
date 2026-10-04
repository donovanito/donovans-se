"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const W = 960;
const H = 540;
const GROUND = 440;
const UX = 240; // unicorn's fixed screen x
const TRACK_LEN = 12000; // about 35 s at normal speed
const BUNNY_X = TRACK_LEN + 730; // where the happy bunny waits, past the finish line
const BRIDGES = [
  { x0: 3600, len: 1000, peak: 130 },
  { x0: 8000, len: 1000, peak: 130 },
];
const GRAVITY = 1700; // lower gravity = floatier, longer jumps
const JUMP_V = 900;
const BASE_SPEED = 340;
const TURBO_SPEED = 540;
const MAX_HEARTS = 3;

const RAINBOW = ["#ff6b8b", "#ffa94d", "#ffe066", "#7bd88f", "#5ccfee", "#8a7dff", "#d98cff"];

type Char = {
  name: string;
  body: string;
  hair: string;
  shirt: string;
  pigtails: boolean;
};

const CHARS: Char[] = [
  { name: "Hedvig", body: "#ffc2dd", hair: "#f6d365", shirt: "#b07cff", pigtails: true },
  { name: "Amanda", body: "#dcc6ff", hair: "#8a5a3c", shirt: "#4cb5f5", pigtails: false },
  { name: "Edith", body: "#bff0d4", hair: "#e8743b", shirt: "#ffd23f", pigtails: true },
  { name: "Alex", body: "#c6e6ff", hair: "#4a3a32", shirt: "#ff8f5a", pigtails: false },
];

/* ---------- drawing helpers ---------- */

function heartPath(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x - s, y - s * 0.3, x - s * 0.5, y - s * 0.95, x, y - s * 0.4);
  ctx.bezierCurveTo(x + s * 0.5, y - s * 0.95, x + s, y - s * 0.3, x, y + s * 0.35);
  ctx.closePath();
}

function starPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
}

function drawUnicorn(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  c: Char,
  airborne: boolean,
  scale = 1,
  pace = 1,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const run = t * 14 * pace;
  const bob = airborne ? 0 : Math.abs(Math.sin(run)) * -4;

  const leg = (lx: number, phase: number, front: boolean, color: string) => {
    const swing = airborne ? (front ? -0.9 : 0.9) : Math.sin(run + phase) * 0.75;
    const hx = lx;
    const hy = -70 + bob;
    const fx = hx + Math.sin(swing) * 52;
    const fy = hy + Math.cos(swing) * 66;
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(fx, fy);
    ctx.stroke();
    ctx.fillStyle = "#fff4c2";
    ctx.beginPath();
    ctx.arc(fx, fy, 8.5, 0, Math.PI * 2);
    ctx.fill();
  };

  const shade = "#c9b5e8";
  // tail
  for (let i = 0; i < 7; i++) {
    const w = Math.sin(t * 9 + i * 0.5) * 12;
    ctx.strokeStyle = RAINBOW[i];
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-58, -92 + bob);
    ctx.bezierCurveTo(-90, -100 + i * 4 + w, -105, -60 + i * 4 - w, -125 - i * 2, -35 + i * 9 + w);
    ctx.stroke();
  }
  leg(-38, Math.PI, false, shade);
  leg(40, 0, true, shade);

  // body
  ctx.fillStyle = c.body;
  ctx.beginPath();
  ctx.ellipse(0, -88 + bob, 64, 35, 0, 0, Math.PI * 2);
  ctx.fill();
  // neck
  ctx.strokeStyle = c.body;
  ctx.lineWidth = 38;
  ctx.beginPath();
  ctx.moveTo(40, -96 + bob);
  ctx.lineTo(74, -142 + bob);
  ctx.stroke();
  // head
  ctx.save();
  ctx.translate(92, -150 + bob);
  ctx.rotate(0.35);
  ctx.fillStyle = c.body;
  ctx.beginPath();
  ctx.ellipse(0, 0, 33, 21, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffb3c9";
  ctx.beginPath();
  ctx.ellipse(24, 6, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // horn
  ctx.fillStyle = "#ffd84d";
  ctx.beginPath();
  ctx.moveTo(86, -166 + bob);
  ctx.lineTo(116, -208 + bob);
  ctx.lineTo(102, -160 + bob);
  ctx.closePath();
  ctx.fill();
  // ear
  ctx.fillStyle = c.body;
  ctx.beginPath();
  ctx.moveTo(72, -165 + bob);
  ctx.lineTo(66, -188 + bob);
  ctx.lineTo(84, -171 + bob);
  ctx.closePath();
  ctx.fill();
  // eye + cheek
  ctx.fillStyle = "#3b2d5c";
  ctx.beginPath();
  ctx.arc(98, -154 + bob, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(99.5, -155.5 + bob, 1.4, 0, Math.PI * 2);
  ctx.fill();
  // mane
  for (let i = 0; i < 7; i++) {
    const k = i / 6;
    const mx = 70 - k * 38 - 8 + Math.sin(t * 8 + i) * 4;
    const my = -172 + k * 62 + bob;
    ctx.fillStyle = RAINBOW[i];
    ctx.beginPath();
    ctx.arc(mx, my, 13, 0, Math.PI * 2);
    ctx.fill();
  }

  // rider
  const rb = bob * 0.6;
  ctx.fillStyle = c.shirt;
  ctx.strokeStyle = "#7a6aa8";
  ctx.lineWidth = 10;
  ctx.beginPath(); // leg
  ctx.moveTo(-4, -110 + rb);
  ctx.lineTo(10, -78 + rb);
  ctx.stroke();
  ctx.fillStyle = "#ff8fb8";
  ctx.beginPath();
  ctx.ellipse(0, -118 + rb, 22, 8, 0, 0, Math.PI * 2); // saddle
  ctx.fill();
  ctx.fillStyle = c.shirt;
  ctx.beginPath();
  ctx.roundRect(-13, -170 + rb, 28, 50, 11);
  ctx.fill();
  ctx.strokeStyle = c.shirt; // arm to neck
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(8, -156 + rb);
  ctx.lineTo(48, -134 + rb);
  ctx.stroke();
  // hair behind
  ctx.fillStyle = c.hair;
  if (c.pigtails) {
    const sw = Math.sin(t * 10) * 3;
    ctx.beginPath();
    ctx.arc(-20 - sw, -184 + rb, 8, 0, Math.PI * 2);
    ctx.arc(-26 - sw, -170 + rb, 7, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.ellipse(-12, -182 + rb, 14, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // head
  ctx.fillStyle = "#ffdcc0";
  ctx.beginPath();
  ctx.arc(2, -188 + rb, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c.hair;
  ctx.beginPath();
  ctx.arc(2, -192 + rb, 19, Math.PI * 1.02, Math.PI * 1.98);
  ctx.fill();
  // face
  ctx.fillStyle = "#3b2d5c";
  ctx.beginPath();
  ctx.arc(9, -188 + rb, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#c2576f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(8, -183 + rb, 5, 0.2, Math.PI - 0.5);
  ctx.stroke();
  // near legs
  leg(-38, 0, false, c.body);
  leg(40, Math.PI, true, c.body);
  ctx.restore();
}

/* ---------- game ---------- */

type Obstacle = { x: number; kind: "hurdle" | "bush" | "candy"; w: number; h: number; hit: boolean; passed: boolean };
type Item = { x: number; h: number; kind: "star" | "heart"; got: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; shape: "dot" | "star" };

/** Height of the rainbow bridge under the given world x (0 on flat ground). */
function bridgeH(x: number) {
  for (const b of BRIDGES) if (x > b.x0 && x < b.x0 + b.len) return b.peak * Math.sin((Math.PI * (x - b.x0)) / b.len);
  return 0;
}
function bridgeSlope(x: number) {
  for (const b of BRIDGES)
    if (x > b.x0 && x < b.x0 + b.len) return ((b.peak * Math.PI) / b.len) * Math.cos((Math.PI * (x - b.x0)) / b.len);
  return 0;
}

function makeWorld() {
  const obstacles: Obstacle[] = [];
  const items: Item[] = [];
  let x = 900;
  let n = 0;
  while (x < TRACK_LEN - 700) {
    const zone = BRIDGES.find((b) => x > b.x0 - 350 && x < b.x0 + b.len + 250);
    if (zone) {
      x = zone.x0 + zone.len + 250;
      continue;
    }
    const kind = (["hurdle", "bush", "candy"] as const)[n % 3];
    const dims = kind === "hurdle" ? { w: 76, h: 76 } : kind === "bush" ? { w: 88, h: 58 } : { w: 70, h: 54 };
    obstacles.push({ x, kind, ...dims, hit: false, passed: false });
    // star arc over the obstacle, as a hint of where to jump
    for (const dx of [-120, -60, 0, 60, 120]) {
      const t = (dx + 180) / BASE_SPEED;
      const arc = JUMP_V * t - 0.5 * GRAVITY * t * t; // unicorn's height above ground at that point of the jump
      items.push({ x: x + dx, h: arc + 60, kind: "star", got: false });
    }
    if (n % 4 === 3) items.push({ x: x + 260, h: 70, kind: "heart", got: false });
    else items.push({ x: x + 280, h: 60, kind: "star", got: false });
    x += 640 + ((n * 97) % 5) * 50;
    n++;
  }
  // stars along each rainbow bridge, and a heart at the top of the last one
  BRIDGES.forEach((b, bi) => {
    for (let k = 1; k < 9; k++) {
      const bx = b.x0 + (k * b.len) / 9;
      const isHeart = bi === BRIDGES.length - 1 && k === 5;
      items.push({ x: bx, h: bridgeH(bx) + 80, kind: isHeart ? "heart" : "star", got: false });
    }
  });
  return { obstacles, items };
}

function initState() {
  return {
    ...makeWorld(),
    dist: 0,
    speed: 0,
    uy: 0,
    vy: 0,
    t: 0,
    hearts: MAX_HEARTS,
    score: 0,
    stars: 0,
    invul: 0,
    slow: 0,
    jumpBuf: 0,
    finished: false,
    finishT: 0,
    msg: { text: "", t: 0 },
    particles: [] as Particle[],
    reported: false,
    half: false,
    onBridge: false,
    bunnyHappy: false,
  };
}
type State = ReturnType<typeof initState>;

function drawBackground(ctx: CanvasRenderingContext2D, s: State) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND);
  sky.addColorStop(0, "#bfe6ff");
  sky.addColorStop(0.7, "#e9dcff");
  sky.addColorStop(1, "#ffe3f0");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // big rainbow arc, slow parallax
  const rx = 560 - ((s.dist * 0.04) % 1400) + 700;
  ctx.lineWidth = 22;
  ctx.globalAlpha = 0.75;
  for (let i = 0; i < RAINBOW.length; i++) {
    ctx.strokeStyle = RAINBOW[i];
    ctx.beginPath();
    ctx.arc(rx % 1700 - 300, 560, 470 - i * 21, Math.PI, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // clouds
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  for (let i = 0; i < 6; i++) {
    const cx = ((i * 330 - s.dist * 0.15) % 1980 + 1980) % 1980 - 200;
    const cy = 70 + (i % 3) * 55;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.arc(cx + 30, cy - 12, 32, 0, Math.PI * 2);
    ctx.arc(cx + 66, cy, 26, 0, Math.PI * 2);
    ctx.fill();
  }

  // hills
  const hills = ["#c9f0d6", "#aee7c3"];
  for (let layer = 0; layer < 2; layer++) {
    ctx.fillStyle = hills[layer];
    const par = layer === 0 ? 0.25 : 0.45;
    const off = (s.dist * par) % 640;
    for (let i = -1; i < 4; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 640 - off + 320, GROUND + 10, 340, 110 - layer * 30 + (i % 2) * 20, 0, Math.PI, Math.PI * 2);
      ctx.fill();
    }
  }

  // ground
  const g = ctx.createLinearGradient(0, GROUND, 0, H);
  g.addColorStop(0, "#9fe3a9");
  g.addColorStop(1, "#7bd08c");
  ctx.fillStyle = g;
  ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  const sw = 140;
  const so = s.dist % (sw * 2);
  for (let x = -sw * 2; x < W + sw; x += sw * 2) ctx.fillRect(x - so, GROUND, sw, H - GROUND);
  // flowers
  const fcol = ["#ff8fb8", "#ffe066", "#ffffff", "#b99bff"];
  for (let i = 0; i < 14; i++) {
    const fx = ((i * 97 - s.dist) % 1360 + 1360) % 1360 - 200;
    ctx.fillStyle = fcol[i % 4];
    ctx.beginPath();
    ctx.arc(fx, GROUND + 26 + (i % 3) * 22, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  // rainbow track edge
  for (let i = 0; i < RAINBOW.length; i++) {
    ctx.fillStyle = RAINBOW[i];
    ctx.fillRect(0, GROUND - 4 + i * 1.5, W, 2);
  }
}

function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle, sx: number) {
  ctx.save();
  ctx.translate(sx, GROUND);
  if (o.kind === "hurdle") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(-o.w / 2, -o.h, 10, o.h);
    ctx.fillRect(o.w / 2 - 10, -o.h, 10, o.h);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = RAINBOW[(i * 2) % 7];
      ctx.fillRect(-o.w / 2 - 4, -o.h + 4 + i * 15, o.w + 8, 12);
    }
  } else if (o.kind === "bush") {
    ctx.fillStyle = "#4fbf7a";
    ctx.beginPath();
    ctx.arc(-24, -24, 26, 0, Math.PI * 2);
    ctx.arc(8, -32, 30, 0, Math.PI * 2);
    ctx.arc(32, -20, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff8fb8";
    for (const [bx, by] of [[-20, -30], [8, -40], [30, -22], [-4, -18]]) {
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = "#ffb3d1";
    ctx.beginPath();
    ctx.roundRect(-o.w / 2, -o.h, o.w, o.h, 14);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(-o.w / 2 + 6, -o.h + 12, o.w - 12, 8);
    ctx.fillStyle = "#8fd9ff";
    ctx.fillRect(-o.w / 2 + 6, -o.h + 30, o.w - 12, 8);
  }
  ctx.restore();
}

function drawBridge(ctx: CanvasRenderingContext2D, b: (typeof BRIDGES)[number], sx0: number) {
  ctx.lineCap = "butt";
  ctx.lineWidth = 11;
  for (let i = 0; i < RAINBOW.length; i++) {
    ctx.strokeStyle = RAINBOW[i];
    ctx.beginPath();
    for (let k = 0; k <= 40; k++) {
      const wx = b.x0 + (k * b.len) / 40;
      const px = sx0 + (k * b.len) / 40;
      const py = GROUND - bridgeH(wx) + 5 + i * 10;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  // little clouds where the bridge starts and ends
  ctx.fillStyle = "#fff";
  for (const cx of [sx0, sx0 + b.len]) {
    ctx.beginPath();
    ctx.arc(cx - 20, GROUND - 4, 20, 0, Math.PI * 2);
    ctx.arc(cx + 8, GROUND - 14, 26, 0, Math.PI * 2);
    ctx.arc(cx + 36, GROUND - 4, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBunny(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, joy: boolean) {
  const hop = joy ? Math.abs(Math.sin(t * 6)) * 34 : Math.abs(Math.sin(t * 2)) * 4;
  const wig = Math.sin(t * (joy ? 10 : 3)) * 0.1;
  ctx.save();
  ctx.translate(x, y - hop);
  ctx.lineCap = "round";
  // flag with a unicorn, held in the right hand
  const fx = 62;
  const fy = -208;
  const fw = 104;
  const fh = 66;
  const wv = (k: number) => Math.sin(t * (joy ? 9 : 3) + k * 0.07) * (joy ? 4 : 2);
  ctx.strokeStyle = "#c9a66b";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(fx, -2);
  ctx.lineTo(fx, fy - 6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(fx, fy);
  for (let k = 0; k <= fw; k += 8) ctx.lineTo(fx + k, fy + wv(k));
  for (let k = fw; k >= 0; k -= 8) ctx.lineTo(fx + k, fy + fh + wv(k));
  ctx.closePath();
  ctx.fillStyle = "#ffe9f4";
  ctx.fill();
  ctx.strokeStyle = "#b99bff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.save();
  ctx.translate(fx + fw / 2, fy + fh / 2 + wv(fw / 2));
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = RAINBOW[i + 1];
    ctx.beginPath();
    ctx.arc(-12 - i * 1.5, -14 + i * 8, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#e9dcff";
  ctx.beginPath();
  ctx.ellipse(2, 4, 19, 15, -0.2, 0, Math.PI * 2);
  ctx.ellipse(16, 10, 11, 8, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffd84d";
  ctx.beginPath();
  ctx.moveTo(4, -8);
  ctx.lineTo(12, -28);
  ctx.lineTo(13, -6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#3b2d5c";
  ctx.beginPath();
  ctx.arc(8, 2, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // ears
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 16, -118);
    ctx.rotate(side * 0.18 + wig * side);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(0, -28, 12, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffb3c9";
    ctx.beginPath();
    ctx.ellipse(0, -26, 5.5, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // feet + body
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(-20, -4, 18, 9, 0, 0, Math.PI * 2);
  ctx.ellipse(20, -4, 18, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, -42, 36, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffe3ef";
  ctx.beginPath();
  ctx.ellipse(0, -34, 20, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  // arms (waving when happy)
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 12;
  const wave = joy ? Math.sin(t * 12) * 14 : 0;
  ctx.beginPath();
  ctx.moveTo(-30, -56);
  ctx.lineTo(joy ? -52 : -44, joy ? -92 - wave : -40);
  ctx.moveTo(30, -56);
  ctx.lineTo(fx - 2, -70 + (joy ? wave * 0.4 : 0));
  ctx.stroke();
  // head
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, -96, 31, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,143,184,0.55)";
  ctx.beginPath();
  ctx.arc(-20, -86, 7, 0, Math.PI * 2);
  ctx.arc(20, -86, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3b2d5c";
  ctx.beginPath();
  ctx.arc(-11, -100, 4.5, 0, Math.PI * 2);
  ctx.arc(11, -100, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-9.5, -101.5, 1.6, 0, Math.PI * 2);
  ctx.arc(12.5, -101.5, 1.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff7fa8";
  ctx.beginPath();
  ctx.ellipse(0, -92, 5, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  // big smile
  ctx.fillStyle = "#c2576f";
  ctx.beginPath();
  ctx.arc(0, -90, 12, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFinish(ctx: CanvasRenderingContext2D, sx: number) {
  ctx.save();
  ctx.translate(sx, GROUND);
  ctx.fillStyle = "#fff";
  ctx.fillRect(-120, -260, 16, 260);
  ctx.fillRect(104, -260, 16, 260);
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = RAINBOW[i];
    ctx.fillRect(-120, -260 + i * 12, 240, 12);
  }
  ctx.fillStyle = "#fff";
  ctx.font = "bold 46px 'Trebuchet MS', ui-rounded, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MÅL", 0, -196);
  ctx.restore();
}

function drawHud(ctx: CanvasRenderingContext2D, s: State) {
  // hearts
  for (let i = 0; i < MAX_HEARTS; i++) {
    heartPath(ctx, 52 + i * 54, 58, 24);
    ctx.fillStyle = i < s.hearts ? "#ff5c8a" : "rgba(255,255,255,0.65)";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }
  // score
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.roundRect(W - 230, 24, 206, 60, 30);
  ctx.fill();
  starPath(ctx, W - 198, 54, 20);
  ctx.fillStyle = "#ffc933";
  ctx.fill();
  ctx.fillStyle = "#5a4a8a";
  ctx.font = "bold 36px 'Trebuchet MS', ui-rounded, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(String(s.score), W - 40, 67);
  // progress
  const px = 250;
  const pw = W - 500;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.roundRect(px, 46, pw, 16, 8);
  ctx.fill();
  const frac = Math.min(1, s.dist / TRACK_LEN);
  const grad = ctx.createLinearGradient(px, 0, px + pw, 0);
  RAINBOW.forEach((c, i) => grad.addColorStop(i / 6, c));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(px, 46, Math.max(16, pw * frac), 16, 8);
  ctx.fill();
  starPath(ctx, px + pw, 54, 16);
  ctx.fillStyle = "#ffc933";
  ctx.fill();
  // message
  if (s.msg.t > 0) {
    ctx.globalAlpha = Math.min(1, s.msg.t * 2);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#8a7dff";
    ctx.lineWidth = 8;
    ctx.font = "bold 56px 'Trebuchet MS', ui-rounded, sans-serif";
    ctx.textAlign = "center";
    ctx.strokeText(s.msg.text, W / 2, 190);
    ctx.fillText(s.msg.text, W / 2, 190);
    ctx.globalAlpha = 1;
  }
}

/* ---------- sound ---------- */

function useSound(muted: boolean) {
  const ac = useRef<AudioContext | null>(null);
  const mutedRef = useRef(muted);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);
  const tone = useCallback((f: number, d: number, to = f, vol = 0.06, type: OscillatorType = "sine", delay = 0) => {
    if (mutedRef.current) return;
    try {
      if (!ac.current) ac.current = new AudioContext();
      const a = ac.current;
      if (a.state === "suspended") void a.resume();
      const o = a.createOscillator();
      const g = a.createGain();
      const t0 = a.currentTime + delay;
      o.type = type;
      o.frequency.setValueAtTime(f, t0);
      o.frequency.exponentialRampToValueAtTime(to, t0 + d);
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(g).connect(a.destination);
      o.start(t0);
      o.stop(t0 + d);
    } catch {
      /* audio unavailable - ignore */
    }
  }, []);
  return {
    jump: () => tone(380, 0.25, 760),
    star: () => {
      tone(880, 0.12, 880, 0.05);
      tone(1320, 0.18, 1320, 0.04, "sine", 0.07);
    },
    heart: () => [523, 659, 784].forEach((f, i) => tone(f, 0.2, f, 0.05, "sine", i * 0.09)),
    bump: () => tone(220, 0.25, 140, 0.07, "triangle"),
    turbo: () => tone(300, 0.3, 600, 0.03, "sawtooth"),
    win: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.35, f, 0.05, "sine", i * 0.12)),
    unlock: () => tone(1, 0.01, 1, 0.0001),
  };
}

/* ---------- components ---------- */

function CharPreview({ c }: { c: Char }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 300, 200);
    drawUnicorn(ctx, 135, 185, 0.4, c, false, 0.78);
  }, [c]);
  return <canvas ref={ref} width={300} height={200} className="w-full h-auto max-h-[28dvh] landscape:max-h-[34dvh] object-contain" aria-hidden />;
}

function HoldButton(props: {
  label: string;
  icon: string;
  gradient: string;
  onDown: () => void;
  onUp?: () => void;
}) {
  const { label, icon, gradient, onDown, onUp } = props;
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onDown();
      }}
      onPointerUp={() => onUp?.()}
      onPointerCancel={() => onUp?.()}
      onLostPointerCapture={() => onUp?.()}
      onContextMenu={(e) => e.preventDefault()}
      style={{ background: gradient, touchAction: "none", WebkitTouchCallout: "none" }}
      className="flex-1 h-full rounded-[2rem] border-4 border-white/90 shadow-[0_8px_0_rgba(90,74,138,0.25)] active:translate-y-1 active:shadow-[0_3px_0_rgba(90,74,138,0.25)] transition-transform select-none flex items-center justify-center gap-3 text-white font-extrabold text-3xl sm:text-4xl [text-shadow:0_2px_0_rgba(90,74,138,0.35)]"
    >
      <span className="text-4xl sm:text-5xl" aria-hidden>
        {icon}
      </span>
      {label}
    </button>
  );
}

function Game({ char, onExit }: { char: Char; onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const input = useRef({ turbo: false, jump: false });
  const [muted, setMuted] = useState(false);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState<{ score: number; stars: number } | null>(null);
  const snd = useSound(muted);
  const sndRef = useRef(snd);
  useEffect(() => {
    sndRef.current = snd;
  });

  const press = useCallback(() => {
    input.current.jump = true;
  }, []);
  const setTurbo = useCallback((v: boolean) => {
    if (v && !input.current.turbo) sndRef.current.turbo();
    input.current.turbo = v;
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (!e.repeat) press();
      } else if (e.code.startsWith("Shift") || e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        setTurbo(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code.startsWith("Shift") || e.code === "ArrowRight" || e.code === "KeyD") setTurbo(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [press, setTurbo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const s = initState();
    input.current = { turbo: false, jump: false };
    let raf = 0;
    let last = performance.now();

    const say = (text: string) => {
      s.msg = { text, t: 1.4 };
    };
    const burst = (x: number, y: number, n: number, shape: Particle["shape"]) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 80 + Math.random() * 220;
        s.particles.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80,
          life: 0.8 + Math.random() * 0.6,
          color: RAINBOW[Math.floor(Math.random() * 7)],
          size: 5 + Math.random() * 6,
          shape,
        });
      }
    };

    const update = (dt: number) => {
      s.t += dt;
      s.msg.t = Math.max(0, s.msg.t - dt);
      s.invul = Math.max(0, s.invul - dt);
      s.slow = Math.max(0, s.slow - dt);
      s.jumpBuf = Math.max(0, s.jumpBuf - dt);
      if (input.current.jump) {
        s.jumpBuf = 0.15;
        input.current.jump = false;
      }

      let target = input.current.turbo ? TURBO_SPEED : BASE_SPEED;
      if (s.slow > 0) target *= 0.5;
      if (s.finished) target = s.dist > TRACK_LEN + 350 ? 0 : 160;
      s.speed += (target - s.speed) * Math.min(1, dt * 4);
      s.dist += s.speed * dt;

      if (s.jumpBuf > 0 && s.uy === 0 && !s.finished) {
        s.vy = JUMP_V;
        s.jumpBuf = 0;
        sndRef.current.jump();
      }
      s.vy -= GRAVITY * dt;
      s.uy += s.vy * dt;
      if (s.uy <= 0) {
        s.uy = 0;
        s.vy = 0;
      }

      const elev = bridgeH(s.dist);
      if (!s.finished) {
        if (!s.onBridge && elev > 0) {
          s.onBridge = true;
          say("Regnbågsbro!");
        } else if (s.onBridge && elev === 0) s.onBridge = false;
        for (const o of s.obstacles) {
          if (o.hit || o.passed) continue;
          if (s.invul === 0 && Math.abs(o.x - s.dist) < o.w / 2 + 20 && s.uy < o.h - 12) {
            o.hit = true;
            s.hearts -= 1;
            s.invul = 1.5;
            s.slow = 0.5;
            sndRef.current.bump();
            if (s.hearts <= 0) {
              s.hearts = MAX_HEARTS;
              say("Nya hjärtan!");
            } else say("Hoppsan!");
          } else if (o.x < s.dist - 70) {
            o.passed = true;
            if (!o.hit) {
              s.score += 25;
              burst(UX, GROUND - 60, 8, "dot");
            }
          }
        }
        for (const it of s.items) {
          if (it.got) continue;
          if (Math.abs(it.x - s.dist) < 50 && Math.abs(s.uy + elev + 70 - it.h) < 70) {
            it.got = true;
            if (it.kind === "star") {
              s.stars += 1;
              s.score += 10;
              sndRef.current.star();
              burst(UX, GROUND - it.h, 10, "star");
            } else {
              s.hearts = Math.min(MAX_HEARTS, s.hearts + 1);
              sndRef.current.heart();
              say("Ett hjärta!");
              burst(UX, GROUND - it.h, 12, "star");
            }
          }
        }
        if (input.current.turbo && Math.random() < 0.7) {
          s.particles.push({
            x: UX - 80, y: GROUND - s.uy - bridgeH(s.dist) - 80 + Math.random() * 40,
            vx: -120 - Math.random() * 120, vy: (Math.random() - 0.5) * 60,
            life: 0.6, color: RAINBOW[Math.floor(Math.random() * 7)], size: 5, shape: "star",
          });
        }
        if (!s.half && s.dist >= TRACK_LEN / 2) {
          s.half = true;
          say("Halvvägs!");
        }
        if (s.dist >= TRACK_LEN) {
          s.finished = true;
          s.score += 100;
          sndRef.current.win();
        }
      } else {
        s.finishT += dt;
        if (!s.bunnyHappy && s.dist > TRACK_LEN + 330) {
          s.bunnyHappy = true;
          say("Kaninen hurrar!");
          burst(BUNNY_X - s.dist + UX, GROUND - 100, 18, "star");
        }
        if (Math.random() < 0.5) {
          s.particles.push({
            x: Math.random() * W, y: -10, vx: (Math.random() - 0.5) * 60, vy: 120 + Math.random() * 160,
            life: 3, color: RAINBOW[Math.floor(Math.random() * 7)], size: 7 + Math.random() * 6, shape: Math.random() < 0.4 ? "star" : "dot",
          });
        }
        if (s.finishT > 1.6 && !s.reported) {
          s.reported = true;
          setResult({ score: s.score, stars: s.stars });
        }
      }

      for (const p of s.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 260 * dt;
        p.life -= dt;
      }
      s.particles = s.particles.filter((p) => p.life > 0);
    };

    const draw = () => {
      drawBackground(ctx, s);
      const sx = (wx: number) => wx - s.dist + UX;
      drawFinish(ctx, sx(TRACK_LEN));
      for (const b of BRIDGES) {
        const bx = sx(b.x0);
        if (bx < W + 60 && bx + b.len > -60) drawBridge(ctx, b, bx);
      }
      drawBunny(ctx, sx(BUNNY_X), GROUND + 4, s.t, s.bunnyHappy);
      for (const o of s.obstacles) {
        const x = sx(o.x);
        if (x > -120 && x < W + 120) drawObstacle(ctx, o, x);
      }
      for (const it of s.items) {
        const x = sx(it.x);
        if (it.got || x < -40 || x > W + 40) continue;
        const y = GROUND - it.h + Math.sin(s.t * 4 + it.x) * 5;
        if (it.kind === "star") {
          starPath(ctx, x, y, 22);
          ctx.fillStyle = "#ffd23f";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          heartPath(ctx, x, y, 26);
          ctx.fillStyle = "#ff5c8a";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
      // shadow
      ctx.fillStyle = "rgba(60,90,70,0.18)";
      ctx.beginPath();
      ctx.ellipse(UX, GROUND + 8, Math.max(30, 70 - (s.uy + bridgeH(s.dist)) * 0.12), 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // unicorn (flashes softly after a bump)
      const blink = s.invul > 0 && Math.floor(s.invul * 10) % 2 === 0;
      ctx.globalAlpha = blink ? 0.45 : 1;
      ctx.save();
      ctx.translate(UX, GROUND - s.uy - bridgeH(s.dist));
      ctx.rotate(-Math.atan(bridgeSlope(s.dist)) * 0.8);
      drawUnicorn(ctx, 0, 0, s.t, char, s.uy > 0, 1, 0.6 + s.speed / 500);
      ctx.restore();
      ctx.globalAlpha = 1;
      for (const p of s.particles) {
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.fillStyle = p.color;
        if (p.shape === "star") {
          starPath(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      drawHud(ctx, s);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [char, round]);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#e9dcff] select-none" style={{ touchAction: "none" }}>
      <div className="relative flex-1 min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />
        <div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
          <button
            type="button"
            aria-label="Byt enhörning"
            onClick={onExit}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 text-2xl shadow"
          >
            🏠
          </button>
          <button
            type="button"
            aria-label={muted ? "Ljud på" : "Ljud av"}
            onClick={() => {
              sndRef.current.unlock();
              setMuted((m) => !m);
            }}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 text-2xl shadow"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
        {result && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm p-4">
            <div className="rounded-[2rem] bg-white shadow-2xl p-4 sm:p-8 [@media(max-height:500px)]:p-3 text-center max-w-md w-full border-8 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#ff6b8b,#ffa94d,#ffe066,#7bd88f,#5ccfee,#8a7dff,#d98cff)_border-box]">
              <div className="text-5xl sm:text-8xl [@media(max-height:500px)]:text-5xl" aria-hidden>🏅</div>
              <h2 className="text-3xl sm:text-4xl [@media(max-height:500px)]:text-2xl font-extrabold text-[#5a4a8a] mt-2">Grattis {char.name}!</h2>
              <p className="text-lg text-[#7a6aa8] mt-1">🐰 Kaninen är jätteglad!</p>
              <p className="text-xl sm:text-2xl [@media(max-height:500px)]:text-lg text-[#7a6aa8] mt-1">
                ⭐ {result.stars} stjärnor · {result.score} poäng
              </p>
              <div className="mt-3 sm:mt-5 [@media(max-height:500px)]:mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setRound((r) => r + 1);
                  }}
                  className="flex-1 rounded-full py-3 [@media(max-height:500px)]:py-2 text-xl font-extrabold text-white bg-gradient-to-r from-[#ff6b8b] to-[#ffa94d] shadow"
                >
                  ▶ Igen
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="flex-1 rounded-full py-3 [@media(max-height:500px)]:py-2 text-xl font-extrabold text-white bg-gradient-to-r from-[#8a7dff] to-[#5ccfee] shadow"
                >
                  🦄 Byt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-4 p-3 sm:p-4" style={{ height: "clamp(96px, 22dvh, 170px)", paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <HoldButton
          label="Hoppa"
          icon="⬆️"
          gradient="linear-gradient(135deg,#ff8fb8,#ffa94d)"
          onDown={() => {
            snd.unlock();
            press();
          }}
        />
        <HoldButton
          label="Turbo"
          icon="🌈"
          gradient="linear-gradient(135deg,#8a7dff,#5ccfee)"
          onDown={() => {
            snd.unlock();
            setTurbo(true);
          }}
          onUp={() => setTurbo(false)}
        />
      </div>
    </div>
  );
}

export default function UnicornGame() {
  const [char, setChar] = useState<Char | null>(null);
  if (char) return <Game char={char} onExit={() => setChar(null)} />;
  return (
    <main
      className="fixed inset-0 overflow-auto flex flex-col items-center p-4 text-center [&>:first-child]:mt-auto [&>:last-child]:mb-auto"
      style={{ background: "linear-gradient(180deg,#bfe6ff,#e9dcff 55%,#ffe3f0)" }}
    >
      <div className="flex h-3 w-48 rounded-full overflow-hidden mb-3">
        {RAINBOW.map((c) => (
          <span key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#5a4a8a]">Enhörningsloppet</h1>
      <p className="text-lg sm:text-xl text-[#7a6aa8] mt-1 mb-3">Vem vill du rida med?</p>
      <div className="grid grid-cols-2 landscape:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
        {CHARS.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setChar(c)}
            className="rounded-[2rem] bg-white/85 border-4 border-white shadow-lg p-3 active:scale-95 transition-transform"
          >
            <CharPreview c={c} />
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#5a4a8a]">{c.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
