"use strict";
/* Sigma - grafik: avatar (byter outfit per nivå), karriärtorn, logotyp och stadssiluett. Allt som inline-SVG/DOM. */
const Art = (() => {
  // Utseenden man kan välja i början av karriären
  const LOOKS = [
    { skin: "#f2c9a5", hair: "#3a2a1e", style: "short" },
    { skin: "#e3ad82", hair: "#1c1612", style: "long" },
    { skin: "#c58b5e", hair: "#14100d", style: "curly" },
    { skin: "#8d5a3b", hair: "#0e0b09", style: "short" },
    { skin: "#f2c9a5", hair: "#c9822e", style: "long" },
    { skin: "#e3ad82", hair: "#8a8f98", style: "short" },
  ];

  // Outfit per nivå: kostym, slips, extra
  const OUTFIT = [
    { suit: "#3f8f6b", shirt: false, cap: "#d9473f", strap: true },                  // 1 Springpojke
    { suit: "#3b86c4", shirt: false, headset: true, tag: true },                      // 2 Kundtjänst
    { suit: "#53627f", shirt: true, tie: "#2f6fd0", lanyard: true },                  // 3 Rådgivare
    { suit: "#8b6f47", shirt: true, tie: null, glasses: "round" },                    // 4 Kreditanalytiker
    { suit: "#3b4f77", shirt: true, tie: "#d94a4a", lapel: true, mug: true },         // 5 Gruppchef
    { suit: "#2c3e60", shirt: true, tie: "#1aa59a", lapel: true, pocket: "#e2b25c" }, // 6 Avdelningschef
    { suit: "#1f2c47", shirt: true, tie: "#24407a", lapel: true, pin: "#cfd6e3" },    // 7 AO-chef
    { suit: "#18233b", shirt: true, tie: "#e2b25c", lapel: true, glasses: "rect" },   // 8 Divisionschef
    { suit: "#121b2e", shirt: true, tie: "#e2b25c", lapel: true, pin: "#f6d891", star: true }, // 9 Vice VD
    { suit: "#0c1322", shirt: true, tie: "#e2b25c", lapel: true, pin: "#f6d891", crown: true }, // 10 VD
  ];

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + amt)));
    return "#" + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  function avatar(level, mood, lookIdx) {
    const L = LOOKS[lookIdx || 0] || LOOKS[0], o = OUTFIT[Math.max(1, Math.min(10, level)) - 1];
    const skin = L.skin, skinD = shade(skin, -26), hair = L.hair;
    const dark = shade(o.suit, -22);
    let s = `<svg class="av" viewBox="0 0 64 64" aria-hidden="true">`;
    // långt hår bakom huvudet
    if (L.style === "long") s += `<path d="M17 24 C15 46 18 52 22 52 L42 52 C46 52 49 46 47 24 Z" fill="${hair}"/>`;
    // kropp
    s += `<path d="M5 65 C5 47 17 41 32 41 C47 41 59 47 59 65 Z" fill="${o.suit}"/>`;
    if (o.shirt) s += `<path d="M23.5 41.5 L32 56 L40.5 41.5 Z" fill="#f4f6fa"/>`;
    if (o.lapel) s += `<path d="M20 42 L31 58 L22 65 L8 65 Z" fill="${dark}"/><path d="M44 42 L33 58 L42 65 L56 65 Z" fill="${dark}"/>`;
    if (o.tie) s += `<path d="M30.3 46 H33.7 L35.2 60 L32 63.5 L28.8 60 Z" fill="${o.tie}"/><path d="M30 44.5 H34 L33.4 47 H30.6 Z" fill="${shade(o.tie, -25)}"/>`;
    if (o.lanyard) s += `<path d="M24 41.5 L30 60 M40 41.5 L34 60" stroke="#c9d3e6" stroke-width="1.6" fill="none"/><rect x="29.5" y="58" width="5" height="6" rx="1" fill="#fff"/>`;
    if (o.strap) s += `<path d="M14 45 L50 65" stroke="#8a5a2b" stroke-width="5"/><rect x="38" y="52" width="16" height="12" rx="2" fill="#a9712f"/>`;
    if (o.tag) s += `<rect x="38" y="50" width="10" height="6" rx="1.2" fill="#fff"/><rect x="39.5" y="52" width="7" height="1.2" fill="#3b86c4"/>`;
    if (o.pocket) s += `<path d="M42 51 L48 49.5 L48.5 54 L42 54 Z" fill="${o.pocket}"/>`;
    if (o.pin) s += `<circle cx="${o.star ? 17 : 46}" cy="${o.star ? 50 : 50}" r="2.2" fill="${o.pin}"/>`;
    if (o.mug) s += `<rect x="47" y="55" width="9" height="9" rx="2" fill="#fff"/><path d="M56 57.5 q4 1 0 4.5" stroke="#fff" stroke-width="1.6" fill="none"/>`;
    // hals och huvud
    s += `<rect x="27" y="33" width="10" height="11" rx="3" fill="${skinD}"/>`;
    s += `<circle cx="19.6" cy="26" r="2.8" fill="${skin}"/><circle cx="44.4" cy="26" r="2.8" fill="${skin}"/>`;
    s += `<ellipse cx="32" cy="24" rx="12.5" ry="13.6" fill="${skin}"/>`;
    // hår
    if (L.style === "curly") {
      s += `<g fill="${hair}"><circle cx="21" cy="17" r="5.5"/><circle cx="27" cy="12" r="6"/><circle cx="34" cy="11" r="6"/><circle cx="41" cy="14" r="6"/><circle cx="44" cy="21" r="4.5"/><circle cx="19" cy="23" r="3.8"/></g>`;
    } else {
      s += `<path d="M19.2 25 C17 8 47 6 44.8 25 C43 18 38 15.5 32 15.5 C26 15.5 21 18 19.2 25 Z" fill="${hair}"/>`;
    }
    if (o.cap) s += `<path d="M18.5 19 C20 6 44 6 45.5 19 Z" fill="${o.cap}"/><path d="M33 18 H52 C52 21 47 21.5 33 21 Z" fill="${shade(o.cap, -30)}"/>`;
    // ansikte
    const sad = mood === "sad", worried = mood === "worried", happy = mood === "happy";
    s += `<circle cx="27" cy="25.5" r="1.7" fill="#17202e"/><circle cx="37" cy="25.5" r="1.7" fill="#17202e"/>`;
    s += sad || worried
      ? `<path d="M23.5 21.2 L29.5 22.6 M40.5 21.2 L34.5 22.6" stroke="${hair}" stroke-width="1.4" stroke-linecap="round"/>`
      : `<path d="M23.8 22 Q27 20.4 30 22 M34 22 Q37 20.4 40.2 22" stroke="${hair}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    if (happy) s += `<path d="M26.5 30.5 Q32 36.5 37.5 30.5 Z" fill="#fff" stroke="#8a3d3d" stroke-width="1" stroke-linejoin="round"/>`;
    else if (sad) s += `<path d="M27 34.5 Q32 30 37 34.5" stroke="#8a3d3d" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
    else if (worried) s += `<path d="M28 33.5 H36" stroke="#8a3d3d" stroke-width="1.5" stroke-linecap="round"/><path d="M42.5 22 q1.5 3 0 4" stroke="#7ac3ff" stroke-width="1.4" fill="none"/>`;
    else s += `<path d="M27.5 32.5 Q32 35 36.5 32.5" stroke="#8a3d3d" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
    // glasögon, headset, krona
    if (o.glasses === "round") s += `<g fill="none" stroke="#2a2f3a" stroke-width="1.5"><circle cx="27" cy="25.5" r="4.4"/><circle cx="37" cy="25.5" r="4.4"/><path d="M31.4 25.5 H32.6"/></g>`;
    if (o.glasses === "rect") s += `<g fill="none" stroke="#2a2f3a" stroke-width="1.5"><rect x="22.2" y="22.2" width="9" height="6.8" rx="1.8"/><rect x="32.8" y="22.2" width="9" height="6.8" rx="1.8"/><path d="M31.2 25 H32.8"/></g>`;
    if (o.headset) s += `<path d="M19 26 C18 8 46 8 45 26" stroke="#2a2f3a" stroke-width="2.4" fill="none"/><rect x="16.5" y="24" width="5" height="8" rx="2" fill="#2a2f3a"/><path d="M19 32 Q21 37 28 36.5" stroke="#2a2f3a" stroke-width="1.6" fill="none"/><circle cx="29" cy="36.5" r="1.8" fill="#2a2f3a"/>`;
    if (o.crown) s += `<path d="M20 12 L22 2 L27 8 L32 0 L37 8 L42 2 L44 12 Z" fill="#e2b25c" stroke="#b8862c" stroke-width="1" stroke-linejoin="round"/><circle cx="32" cy="3.5" r="1.4" fill="#c9433c"/>`;
    s += `</svg>`;
    return s;
  }

  /* Karriärtornet: tio våningar, hissen med avataren åker upp och ner. */
  function tower(levels) {
    const el = document.createElement("div");
    el.className = "tower";
    let rows = "";
    for (let l = 10; l >= 1; l--) {
      const lv = levels[l - 1];
      rows += `<div class="floor" data-l="${l}"><i class="fl-n">${l}</i><span class="fl-t"><b>${lv.n}</b><small>${lv.unit} · ${Math.round(lv.sal / 1000)} tkr</small></span><span class="fl-w"></span></div>`;
    }
    el.innerHTML = `<div class="roof"><span>Σ</span></div><div class="floors">${rows}<div class="lift"><div class="car"></div></div></div><div class="base"></div>`;
    return el;
  }
  function towerSet(el, level, mood, look, animate) {
    if (!el) return;
    const f = el.querySelector(".floors");
    f.classList.toggle("noanim", !animate);
    el.style.setProperty("--lv", level);
    el.querySelectorAll(".floor").forEach((fl) => {
      const l = +fl.dataset.l;
      fl.classList.toggle("on", l === level);
      fl.classList.toggle("passed", l < level);
    });
    el.querySelector(".car").innerHTML = avatar(level, mood, look);
  }

  const LOGO = `<svg viewBox="0 0 128 128" class="logo-svg" aria-hidden="true"><defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d891"/><stop offset="1" stop-color="#d79e3f"/></linearGradient></defs><rect x="4" y="4" width="120" height="120" rx="28" fill="#0f2347" stroke="url(#lg1)" stroke-width="4"/><path d="M84 34 H44 L68 64 L44 94 H84" fill="none" stroke="url(#lg1)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 100 H36 V88 H50 V76" fill="none" stroke="#5aa7ff" stroke-opacity=".55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function skyline() {
    // enkel stadssiluett med upplysta fönster, ritas lågmält längst ned på menyn
    const b = [[0, 70, 38], [40, 110, 30], [74, 60, 26], [104, 150, 34], [142, 90, 28], [174, 130, 36], [214, 78, 30], [248, 170, 40], [292, 100, 28], [324, 140, 34], [362, 84, 30], [396, 118, 36]];
    let g = "";
    b.forEach(([x, h, w], i) => {
      const y = 200 - h;
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c1b38"/>`;
      for (let yy = y + 8; yy < 190; yy += 12) for (let xx = x + 5; xx < x + w - 4; xx += 9) if ((xx * 7 + yy * 13 + i) % 5 < 2) g += `<rect x="${xx}" y="${yy}" width="4" height="5" fill="#e2b25c" opacity=".55"/>`;
    });
    return `<svg viewBox="0 0 430 200" preserveAspectRatio="xMidYMax slice" class="sky" aria-hidden="true">${g}</svg>`;
  }

  return { LOOKS, avatar, tower, towerSet, LOGO, skyline };
})();
