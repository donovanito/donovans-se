// Regenerates the icons and the share image in public/ (favicon.ico, icon.svg,
// apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og.png).
// The unicorns in og.png are drawn with the game's own drawing code, so they always
// match the game. Needs Chromium via Playwright:
//   npm i --no-save playwright && node tools/make-assets.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
await mkdir(pub, { recursive: true });

const RAINBOW = ["#ff6b8b", "#ffa94d", "#ffe066", "#7bd88f", "#5ccfee", "#8a7dff", "#d98cff"];

/* ---------- icon (unicorn head on a sky with a rainbow) ---------- */

function star(cx, cy, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
}

function iconSvg({ rx = 0, scale = 1 }) {
  const arcs = RAINBOW.map((c, i) => {
    const r = 236 - i * 17;
    return `<path d="M ${256 - r} 470 A ${r} ${r} 0 0 1 ${256 + r} 470" fill="none" stroke="${c}" stroke-width="17"/>`;
  }).join("");
  const mane = [
    [205, 175], [172, 222], [152, 276], [146, 332], [155, 388], [178, 436], [212, 466],
  ]
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="40" fill="${RAINBOW[i]}"/>`)
    .join("");
  const stripes = [0.25, 0.5, 0.75]
    .map((t) => {
      const x1 = 316 + (372 - 316) * t * 0.9;
      const y1 = 205 - (205 - 50) * t;
      return `<line x1="${x1 - 14}" y1="${y1 + 6}" x2="${x1 + 14}" y2="${y1 - 4}" stroke="#f0b429" stroke-width="7" stroke-linecap="round"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#ffe3f0"/></linearGradient></defs>
<rect width="512" height="512" rx="${rx}" fill="url(#sky)"/>
<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
${arcs}
${star(86, 96, 26, "#ffd23f")}${star(438, 150, 20, "#ffd23f")}${star(110, 190, 12, "#fff")}
${mane}
<ellipse cx="290" cy="300" rx="132" ry="106" transform="rotate(-12 290 300)" fill="#ffc2dd"/>
<ellipse cx="382" cy="338" rx="62" ry="48" transform="rotate(-12 382 338)" fill="#ffd9ea"/>
<circle cx="402" cy="345" r="7" fill="#e07aa5"/>
<path d="M 232 218 L 214 128 L 292 196 Z" fill="#ffc2dd"/><path d="M 238 206 L 226 150 L 274 194 Z" fill="#ff9ec4"/>
<path d="M 310 205 L 372 48 L 354 216 Z" fill="#ffd84d"/>${stripes}
<circle cx="318" cy="284" r="17" fill="#3b2d5c"/><circle cx="325" cy="277" r="5.5" fill="#fff"/>
<circle cx="338" cy="326" r="19" fill="#ff8fb8" opacity="0.5"/>
<path d="M 380 366 Q 396 376 412 364" fill="none" stroke="#c2576f" stroke-width="6" stroke-linecap="round"/>
</g></svg>`;
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

async function png(svg, size) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const b64 = Buffer.from(svg).toString("base64");
  await page.setContent(`<body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${b64}" width="${size}" height="${size}" style="display:block"></body>`);
  const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  return buf;
}

const rounded = iconSvg({ rx: 104 });
const square = iconSvg({ rx: 0 });
await writeFile(path.join(pub, "icon.svg"), rounded);
await writeFile(path.join(pub, "apple-touch-icon.png"), await png(square, 180)); // iOS adds its own rounded corners
await writeFile(path.join(pub, "icon-192.png"), await png(rounded, 192));
await writeFile(path.join(pub, "icon-512.png"), await png(rounded, 512));
await writeFile(path.join(pub, "icon-maskable-512.png"), await png(iconSvg({ rx: 0, scale: 0.78 }), 512));

// favicon.ico: PNG payloads at 16, 32 and 48 px
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await png(rounded, s));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const o = 6 + i * 16;
  head.writeUInt8(s, o);
  head.writeUInt8(s, o + 1);
  head.writeUInt8(0, o + 2);
  head.writeUInt8(0, o + 3);
  head.writeUInt16LE(1, o + 4);
  head.writeUInt16LE(32, o + 6);
  head.writeUInt32LE(pngs[i].length, o + 8);
  head.writeUInt32LE(offset, o + 12);
  offset += pngs[i].length;
});
await writeFile(path.join(pub, "favicon.ico"), Buffer.concat([head, ...pngs]));

/* ---------- share image (1200x630) using the game's own unicorn drawing ---------- */

const src = await readFile(path.join(root, "src/components/UnicornGame.tsx"), "utf8");
const a = src.indexOf("const RAINBOW");
const b = src.indexOf("/* ---------- game ---------- */");
const js = ts.transpileModule(src.slice(a, b), { compilerOptions: { target: "ES2020" } }).outputText;

const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(`<body style="margin:0"><canvas id="c" width="1200" height="630"></canvas></body>`);
await page.evaluate(`(() => {
${js}
const ctx = document.getElementById("c").getContext("2d");
const W = 1200, H = 630, GROUND = 548;
const sky = ctx.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, "#bfe6ff"); sky.addColorStop(0.7, "#e9dcff"); sky.addColorStop(1, "#ffe3f0");
ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
ctx.lineWidth = 34; ctx.globalAlpha = 0.8;
RAINBOW.forEach((c, i) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(600, 760, 640 - i * 34, Math.PI, Math.PI * 2); ctx.stroke(); });
ctx.globalAlpha = 1;
ctx.fillStyle = "rgba(255,255,255,0.9)";
for (const [x, y] of [[120, 90], [1020, 70], [900, 300], [230, 330]]) {
  ctx.beginPath(); ctx.arc(x, y, 30, 0, 7); ctx.arc(x + 36, y - 14, 38, 0, 7); ctx.arc(x + 78, y, 30, 0, 7); ctx.fill();
}
ctx.fillStyle = "#c9f0d6"; ctx.beginPath(); ctx.ellipse(250, GROUND + 10, 420, 120, 0, Math.PI, Math.PI * 2); ctx.fill();
ctx.fillStyle = "#aee7c3"; ctx.beginPath(); ctx.ellipse(900, GROUND + 10, 460, 100, 0, Math.PI, Math.PI * 2); ctx.fill();
const g = ctx.createLinearGradient(0, GROUND, 0, H); g.addColorStop(0, "#9fe3a9"); g.addColorStop(1, "#7bd08c");
ctx.fillStyle = g; ctx.fillRect(0, GROUND, W, H - GROUND);
CHARS.forEach((c, i) => drawUnicorn(ctx, 125 + i * 136, GROUND + 4, 0.55 + i * 0.7, c, false, 0.6 * c.scale, 1));
ctx.textAlign = "center"; ctx.lineJoin = "round";
ctx.font = "bold 104px 'DejaVu Sans', 'Liberation Sans', sans-serif";
ctx.lineWidth = 16; ctx.strokeStyle = "#fff"; ctx.strokeText("Enhörningsspelet", 600, 150);
ctx.fillStyle = "#5a4a8a"; ctx.fillText("Enhörningsspelet", 600, 150);
ctx.font = "bold 34px 'DejaVu Sans', 'Liberation Sans', sans-serif";
ctx.lineWidth = 9; ctx.strokeStyle = "#fff"; ctx.strokeText("Ett lugnt hinderspel med enhörningar och regnbågar", 600, 218);
ctx.fillStyle = "#7a6aa8"; ctx.fillText("Ett lugnt hinderspel med enhörningar och regnbågar", 600, 218);
})()`);
await writeFile(path.join(pub, "og.png"), await page.screenshot({ type: "png" }));
await browser.close();
console.log("assets written to", pub);
