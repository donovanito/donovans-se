// Genererar ikoner och delningsbild till sites/epsilon (icon-192/512, icon-maskable-512,
// apple-touch-icon, og.png) med spelets egen ritkod (art.js), så att de alltid matchar spelet.
//   npm i --no-save playwright && node games-src/epsilon/make-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(here, "..", "..", "sites", "epsilon");
const read = (f) => readFile(path.join(site, f), "utf8");
const [track, art] = await Promise.all([read("track.js"), read("art.js")]);

const page = await (await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] } : {})).newPage();
await page.setContent("<canvas id=c></canvas>");
await page.addScriptTag({ content: track });
await page.addScriptTag({ content: art });

const png = async (w, h, opts) => {
  const data = await page.evaluate(([w, h, opts]) => {
    const cv = document.getElementById("c");
    cv.width = w; cv.height = h;
    const ctx = cv.getContext("2d");
    const tr = Tracks.get("oval");
    const u = Math.min(w, h);
    Art.drawFloor(ctx, w, h, u / (opts.wide ? 9 : 7));
    // zoom på banans högra kurva, lutad
    const cx = opts.wide ? w * 0.72 : w / 2, cy = h / 2;
    const sc = u / (opts.zoom || 230);
    const ang = opts.wide ? -0.25 : 0.55;
    const c = Math.cos(ang), s = Math.sin(ang);
    // världspunkt (225, 92) ska hamna i (cx, cy)
    const wx = 225, wy = 92;
    const tx = cx - sc * (c * wx - s * wy), ty = cy - sc * (s * wx + c * wy);
    ctx.setTransform(sc * c, sc * s, -sc * s, sc * c, tx, ty);
    Art.drawTrack(ctx, tr, { scale: sc, dpr: 1, sdx: 1, sdy: 1.4 });
    const sdx = 1.6 * (c + s * 1.4), sdy = 1.6 * (-s + c * 1.4);
    // en röd och en blå bil i kurvan
    const out = {}, back = {};
    const place = (lane, sPos, color, scale) => {
      Tracks.sample(lane, sPos, out); Tracks.sample(lane, sPos - 15, back);
      Art.drawCar(ctx, color, (out.x + back.x) / 2, (out.y + back.y) / 2, Math.atan2(out.y - back.y, out.x - back.x), { scale, sdx, sdy });
    };
    const L = tr.lanes;
    const sOff = L[0].s[Math.round(tr.N * 0.25)];
    place(L[1], sOff + 70, "#2f6fe4", 2.1);
    place(L[0], sOff + 105, "#e5322d", 2.1);
    if (opts.title) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "rgba(10,8,6,.55)"; ctx.fillRect(0, 0, w * 0.56, h);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.lineJoin = "round";
      ctx.font = "italic 900 110px ui-rounded, 'Arial Rounded MT Bold', 'Trebuchet MS', system-ui, sans-serif";
      ctx.fillStyle = "#fff"; ctx.fillText("EPSILON", 54, 270);
      ctx.fillStyle = "#e5322d"; ctx.fillText("RACEWAY", 54, 385);
      for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? "#fff" : "#e5322d"; ctx.fillRect(54 + i * 30, 410, 30, 10); }
      ctx.font = "800 34px ui-rounded, 'Trebuchet MS', system-ui, sans-serif";
      ctx.fillStyle = "#d6dae0"; ctx.fillText("Slotbil ovanifrån - gas, turbo, tre varv", 56, 480);
    }
    return cv.toDataURL("image/png").split(",")[1];
  }, [w, h, opts]);
  return Buffer.from(data, "base64");
};

await writeFile(path.join(site, "icon-512.png"), await png(512, 512, { zoom: 230 }));
await writeFile(path.join(site, "icon-192.png"), await png(192, 192, { zoom: 230 }));
await writeFile(path.join(site, "icon-maskable-512.png"), await png(512, 512, { zoom: 300 }));
await writeFile(path.join(site, "apple-touch-icon.png"), await png(180, 180, { zoom: 230 }));
await writeFile(path.join(site, "og.png"), await png(1200, 630, { wide: true, title: true, zoom: 300 }));
await page.context().browser().close();
console.log("klart");
