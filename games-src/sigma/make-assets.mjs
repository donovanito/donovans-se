// Genererar ikoner och delningsbild till sites/sigma (icon-192/512, icon-maskable-512, apple-touch-icon, og.png)
// från icon.svg, så att de alltid matchar spelets logotyp.
//   npm i --no-save playwright && node games-src/sigma/make-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pw = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const chromium = pw.chromium || pw.default.chromium;
const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(here, "..", "..", "sites", "sigma");
const svg = await readFile(path.join(site, "icon.svg"), "utf8");
const svgUri = "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] } : {});
const page = await browser.newPage();

async function shot(w, h, html) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<style>*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden}</style>${html}`);
  await page.waitForTimeout(150);
  return page.screenshot({ type: "png" });
}

// vanlig ikon: SVG:n fyller hela ytan
const icon = (s) => shot(s, s, `<img src="${svgUri}" style="width:${s}px;height:${s}px;display:block">`);
// maskerbar ikon: mörk bakgrund hela vägen, logotypen i säkra 62 % i mitten
const maskable = (s) => shot(s, s, `<div style="width:${s}px;height:${s}px;background:linear-gradient(180deg,#17336b,#061022);display:grid;place-items:center"><img src="${svgUri}" style="width:${s * 0.66}px;height:${s * 0.66}px;display:block;border-radius:22%"></div>`);

await writeFile(path.join(site, "icon-512.png"), await icon(512));
await writeFile(path.join(site, "icon-192.png"), await icon(192));
await writeFile(path.join(site, "apple-touch-icon.png"), await icon(180));
await writeFile(path.join(site, "icon-maskable-512.png"), await maskable(512));

// delningsbild 1200x630
const floors = ["VD", "Vice VD", "Divisionschef", "Affärsområdeschef", "Avdelningschef", "Gruppchef", "Kreditanalytiker", "Privatrådgivare", "Kundtjänst", "Springpojke"];
const tower = floors.map((f, i) => `<div style="height:48px;display:flex;align-items:center;padding:0 16px;border-bottom:1px solid #16315f;color:${i === 0 ? "#f6d891" : i === 9 ? "#b9c9e6" : "#6f86b0"};font:600 22px 'Segoe UI',system-ui,sans-serif;${i === 0 ? "background:linear-gradient(90deg,rgba(226,178,92,.3),transparent)" : ""}"><span style="width:44px;font-family:Georgia,serif;font-weight:800">${10 - i}</span>${f}</div>`).join("");
const og = `<div style="width:1200px;height:630px;background:radial-gradient(120% 90% at 20% 0%,#1d3d7e,#0d2045 45%,#061022);color:#eef3fb;font-family:'Segoe UI',system-ui,sans-serif;display:flex;align-items:center;padding:0 70px;gap:60px">
  <div style="flex:1">
    <img src="${svgUri}" style="width:150px;height:150px;display:block;margin-bottom:26px">
    <div style="font:700 112px Georgia,'Palatino Linotype',serif;letter-spacing:.2em;color:#f6d891;text-shadow:0 4px 0 #b8862c;line-height:1">SIGMA</div>
    <div style="font-size:42px;color:#a3b6d8;margin-top:18px">Från springpojke till VD</div>
    <div style="font-size:26px;color:#7f97c0;margin-top:22px">Tio nivåer. Fem steg. Tre beslut per steg.</div>
  </div>
  <div style="width:400px;border:3px solid #2b4b82;border-radius:10px;background:#0a1832;overflow:hidden">${tower}</div>
</div>`;
await writeFile(path.join(site, "og.png"), await shot(1200, 630, og));

await browser.close();
console.log("klart");
