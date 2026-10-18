// Genererar ikoner och delningsbild till sites/galoppen (icon-192/512, icon-maskable-512,
// apple-touch-icon, og.png). Hästen och ryttaren ritas med spelets egen kod (art.js), så
// bilderna matchar alltid spelet. Kräver Chromium via Playwright:
//   npm i --no-save playwright && node games-src/galoppen/make-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(here, "..", "..", "sites", "galoppen");
const read = (f) => readFile(path.join(site, f), "utf8");
const [art, items, scene] = await Promise.all([read("art.js"), read("items.js"), read("scene.js")]);

const page = await (await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] } : {})).newPage();
await page.setContent("<canvas id=c></canvas>");
await page.addScriptTag({ content: art });
await page.addScriptTag({ content: items });
await page.addScriptTag({ content: scene });

const png = async (w, h, opts) => {
  const data = await page.evaluate(([w, h, opts]) => {
    const cv = document.getElementById("c");
    cv.width = w; cv.height = h;
    const ctx = cv.getContext("2d");
    const { TAU } = Art;
    const pad = opts.pad || 1;
    const u = Math.min(w, h * (opts.wide ? 1 : 1)) / 512; // 1 enhet = 1/512 av kortsidan
    // himmel
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#32a4ff"); g.addColorStop(0.62, "#a8e4ff"); g.addColorStop(1, "#eafaff");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const sx = w * (opts.wide ? 0.82 : 0.8), sy = h * 0.2;
    const sg = ctx.createRadialGradient(sx, sy, 4, sx, sy, 150 * u);
    sg.addColorStop(0, "rgba(255,248,200,.95)"); sg.addColorStop(1, "rgba(255,240,170,0)");
    ctx.fillStyle = sg; ctx.fillRect(sx - 160 * u, sy - 160 * u, 320 * u, 320 * u);
    Scene.cloud(ctx, w * 0.06, h * 0.16, 1.5 * u, 0.95);
    Scene.cloud(ctx, w * 0.56, h * 0.1, 1.1 * u, 0.9);
    // kullar
    const gy = h * (opts.wide ? 0.8 : 0.78);
    ctx.fillStyle = "#8fdc9a";
    ctx.beginPath(); ctx.moveTo(0, gy);
    for (let x = 0; x <= w; x += 10) ctx.lineTo(x, gy - 70 * u - Math.sin(x / w * 5) * 26 * u);
    ctx.lineTo(w, gy); ctx.fill();
    ctx.fillStyle = "#62c778";
    ctx.beginPath(); ctx.moveTo(0, gy);
    for (let x = 0; x <= w; x += 10) ctx.lineTo(x, gy - 30 * u - Math.sin(x / w * 7 + 2) * 18 * u);
    ctx.lineTo(w, gy); ctx.fill();
    // sand
    const sg2 = ctx.createLinearGradient(0, gy, 0, h);
    sg2.addColorStop(0, "#f2dca5"); sg2.addColorStop(1, "#d6b274");
    ctx.fillStyle = sg2; ctx.fillRect(0, gy, w, h - gy);
    // gräs längst ner
    ctx.fillStyle = "#4bbf62"; ctx.fillRect(0, h - 24 * u, w, 24 * u);
    // hinder (korsade stänger)
    const fx = w * (opts.wide ? 0.76 : 0.5);
    const fs = u * 1.5;
    ctx.save(); ctx.translate(fx, gy + 26 * u); ctx.scale(fs, fs);
    const post = (x) => { ctx.fillStyle = "#fff"; ctx.fillRect(x - 5, -92, 10, 96); ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(x, -96, 6, 0, TAU); ctx.fill(); ctx.fillStyle = "#e8384f"; ctx.fillRect(x - 5, -80, 10, 8); };
    post(-70); post(70);
    ["#e8384f", "#2f7bff"].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(-72, -62 - i * 26, 144, 9); ctx.fillStyle = "#fff"; for (let k = 0; k < 6; k++) ctx.fillRect(-72 + k * 24 + 12, -62 - i * 26, 12, 9); });
    ctx.restore();
    // häst och ryttare i hopp
    const sc = (opts.hs || 1) * u * 2.35;
    const hx = w * (opts.wide ? 0.76 : 0.5) + 6 * u, hy = gy + 12 * u - 80 * u * (opts.hs || 1) * 1.6;
    Art.drawHorse(ctx, {
      x: hx, y: hy, scale: sc, t: 0.6, mode: "gallop", phase: 0.4, air: 1, u: 0.05, lift: 150, flow: 0.9, shine: 0.9,
      tack: { saddle: Items.byId.sad_rod, pad: Items.byId.pad_himmel, bridle: Items.byId.bri_svart, wraps: null, rosette: Items.byId.ros_bla, mane: Items.byId.man_vanlig },
      rider: { skin: "#f5cba7", hair: "#6b3d1c", hairStyle: "ponytail", cloth: { helmet: Items.byId.hlm_marin, jacket: Items.byId.jak_marin, breeches: Items.byId.byx_vit, boots: Items.byId.bot_svart } },
    });
    if (opts.title) {
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.font = "900 150px ui-rounded, 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif";
      ctx.lineJoin = "round";
      ctx.lineWidth = 22; ctx.strokeStyle = "#d93a6c"; ctx.strokeText("Galoppen", 56, 220);
      ctx.fillStyle = "#fff"; ctx.fillText("Galoppen", 56, 220);
      ctx.font = "800 38px ui-rounded, 'Trebuchet MS', system-ui, sans-serif";
      ctx.lineWidth = 8; ctx.strokeStyle = "rgba(31,47,92,.55)";
      ctx.strokeText("Rid hinderbanor, samla mynt och sköt din häst", 60, 280);
      ctx.fillStyle = "#fff"; ctx.fillText("Rid hinderbanor, samla mynt och sköt din häst", 60, 280);
    }
    return cv.toDataURL("image/png").split(",")[1];
  }, [w, h, opts]);
  return Buffer.from(data, "base64");
};

await writeFile(path.join(site, "icon-512.png"), await png(512, 512, { hs: 0.78 }));
await writeFile(path.join(site, "icon-192.png"), await png(192, 192, { hs: 0.78 }));
await writeFile(path.join(site, "icon-maskable-512.png"), await png(512, 512, { hs: 0.62 }));
await writeFile(path.join(site, "apple-touch-icon.png"), await png(180, 180, { hs: 0.78 }));
await writeFile(path.join(site, "og.png"), await png(1200, 630, { wide: true, title: true, hs: 0.66 }));
await page.context().browser().close();
console.log("klart");
