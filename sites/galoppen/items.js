"use strict";
/* Galoppen - varukatalog för Horse and Hound (utrustning, ryttarkläder, foder) och fasta val. */
const Items = (() => {
  const SLOTS = {
    horse: [
      { id: "saddle", label: "Sadel" },
      { id: "pad", label: "Schabrak" },
      { id: "bridle", label: "Träns" },
      { id: "wraps", label: "Benskydd" },
      { id: "rosette", label: "Rosett" },
      { id: "mane", label: "Man" },
    ],
    rider: [
      { id: "helmet", label: "Ridhjälm" },
      { id: "jacket", label: "Jacka" },
      { id: "breeches", label: "Ridbyxor" },
      { id: "boots", label: "Stövlar" },
    ],
  };

  const C = [];
  const add = (slot, id, name, price, props) => C.push(Object.assign({ slot, id, name, price }, props));

  // sadlar
  add("saddle", "sad_brun", "Brun läder", 0, { c: "#9b5a2e" });
  add("saddle", "sad_svart", "Svart läder", 40, { c: "#2a2a2e" });
  add("saddle", "sad_ljus", "Ljus läder", 50, { c: "#c99a62" });
  add("saddle", "sad_rod", "Röd sadel", 70, { c: "#c0283d" });
  add("saddle", "sad_bla", "Blå sadel", 70, { c: "#2a62c9" });
  add("saddle", "sad_rosa", "Rosa sadel", 90, { c: "#ec6fa4" });
  add("saddle", "sad_guld", "Guldsadel", 300, { c: "#d9a521", gold: true, rare: true });

  // schabrak
  add("pad", "pad_vit", "Vitt schabrak", 0, { c: "#f6f6f6", c2: "#c9d1dc" });
  add("pad", "pad_marin", "Marinblått", 25, { c: "#1f3a73", c2: "#8fb0ee" });
  add("pad", "pad_rod", "Rött", 25, { c: "#c0283d", c2: "#ffb3bd" });
  add("pad", "pad_gron", "Grönt", 25, { c: "#2e9b5e", c2: "#a6e8c3" });
  add("pad", "pad_himmel", "Himmelsblått", 25, { c: "#7fd0f5", c2: "#2a5db0" });
  add("pad", "pad_rosa", "Rosa", 30, { c: "#f08ab4", c2: "#ffd0e3" });
  add("pad", "pad_lila", "Lila", 30, { c: "#8a63d2", c2: "#d9c8ff" });
  add("pad", "pad_regn", "Regnbåge", 120, { c: "#ff6b8b", c2: "#ffffff", rainbow: true });
  add("pad", "pad_stjarna", "Stjärnschabrak", 160, { c: "#2a2f6b", c2: "#ffe066", stars: true, rare: true });

  // träns
  add("bridle", "bri_svart", "Svart träns", 0, { c: "#1f1712" });
  add("bridle", "bri_brun", "Brunt träns", 25, { c: "#6b3d1c" });
  add("bridle", "bri_rod", "Rött träns", 50, { c: "#c0283d" });
  add("bridle", "bri_bla", "Blått träns", 50, { c: "#2a62c9" });
  add("bridle", "bri_gron", "Grönt träns", 50, { c: "#2e9b5e" });
  add("bridle", "bri_rosa", "Rosa träns", 50, { c: "#ec6fa4" });
  add("bridle", "bri_guld", "Guldträns", 220, { c: "#d9a521", gem: "#7ee0ff", rare: true });

  // benskydd
  add("wraps", "wrap_none", "Inga benskydd", 0, { none: true });
  add("wraps", "wrap_vit", "Vita", 20, { c: "#f4f4f4" });
  add("wraps", "wrap_svart", "Svarta", 20, { c: "#2a2a2e" });
  add("wraps", "wrap_bla", "Blå", 30, { c: "#2a62c9" });
  add("wraps", "wrap_rod", "Röda", 30, { c: "#c0283d" });
  add("wraps", "wrap_gron", "Gröna", 30, { c: "#2e9b5e" });
  add("wraps", "wrap_rosa", "Rosa", 35, { c: "#f08ab4" });
  add("wraps", "wrap_randig", "Randiga", 90, { c: "#ff6b8b", c2: "#5ccfee", rare: true });

  // rosetter
  add("rosette", "ros_none", "Ingen rosett", 0, { none: true });
  add("rosette", "ros_bla", "Blå rosett", 30, { c: "#2a6fdc" });
  add("rosette", "ros_rod", "Röd rosett", 30, { c: "#e03a4a" });
  add("rosette", "ros_gul", "Gul rosett", 30, { c: "#f2c230" });
  add("rosette", "ros_gron", "Grön rosett", 30, { c: "#2fae6a" });
  add("rosette", "ros_rosa", "Rosa rosett", 40, { c: "#f06aa5" });
  add("rosette", "ros_guld", "Guldrosett", 150, { c: "#e0a812", c2: "#fff2b0", rare: true });

  // man
  add("mane", "man_vanlig", "Fri man", 0, { style: "loose" });
  add("mane", "man_flat", "Flätad man", 45, { style: "braided", c: "#e03a4a" });
  add("mane", "man_flat_bla", "Flätor, blå gummiband", 50, { style: "braided", c: "#3a8dff" });
  add("mane", "man_band", "Rosa rosetter", 70, { style: "ribbons", c: "#ff5d8f" });
  add("mane", "man_band_bla", "Blå rosetter", 70, { style: "ribbons", c: "#4da3ff" });

  // ridhjälmar
  add("helmet", "hlm_svart", "Svart hjälm", 0, { c: "#1c2733", c2: "#0e1520", velvet: true });
  add("helmet", "hlm_marin", "Marinblå hjälm", 30, { c: "#1d3a78", c2: "#122552", velvet: true });
  add("helmet", "hlm_rod", "Röd hjälm", 45, { c: "#b3243a", c2: "#7d1424" });
  add("helmet", "hlm_vit", "Vit hjälm", 45, { c: "#f1f1f1", c2: "#c5ccd6" });
  add("helmet", "hlm_rosa", "Rosa hjälm", 55, { c: "#f08ab4", c2: "#c4608a" });
  add("helmet", "hlm_bla", "Blå hjälm", 55, { c: "#2f7be0", c2: "#1d56a8", stripe: "#ffffff" });
  add("helmet", "hlm_glitter", "Glitterhjälm", 140, { c: "#2b2b5a", c2: "#1a1a3c", glitter: true, rare: true });
  add("helmet", "hlm_guld", "Guldhjälm", 240, { c: "#e0a812", c2: "#a87305", gold: true, rare: true });

  // jackor
  add("jacket", "jak_marin", "Marinblå tävlingsjacka", 0, { c: "#1e3a7a" });
  add("jacket", "jak_svart", "Svart tävlingsjacka", 45, { c: "#22252b" });
  add("jacket", "jak_rod", "Röd jacka", 70, { c: "#b3243a" });
  add("jacket", "jak_gron", "Grön jacka", 70, { c: "#1f7a4a" });
  add("jacket", "jak_lila", "Lila jacka", 75, { c: "#6a45b8" });
  add("jacket", "jak_rosa", "Rosa jacka", 75, { c: "#ec6fa4" });
  add("jacket", "jak_gul", "Solgul jacka", 80, { c: "#f2b823" });
  add("jacket", "jak_turkos", "Turkos jacka", 80, { c: "#1fb0b0" });
  add("jacket", "jak_tweed", "Tweedjacka", 90, { c: "#8a7552", tweed: true });

  // ridbyxor
  add("breeches", "byx_vit", "Vita ridbyxor", 0, { c: "#f2efe6" });
  add("breeches", "byx_beige", "Beige ridbyxor", 20, { c: "#d9c39a" });
  add("breeches", "byx_svart", "Svarta ridbyxor", 20, { c: "#25272c" });
  add("breeches", "byx_gra", "Gråa ridbyxor", 20, { c: "#8b9099" });
  add("breeches", "byx_marin", "Marinblå ridbyxor", 30, { c: "#26365f" });
  add("breeches", "byx_rosa", "Rosa ridbyxor", 35, { c: "#f3b3cf" });

  // stövlar
  add("boots", "bot_svart", "Svarta ridstövlar", 0, { c: "#1a1a1a" });
  add("boots", "bot_brun", "Bruna ridstövlar", 40, { c: "#5a3217" });
  add("boots", "bot_rod", "Röda ridstövlar", 80, { c: "#b3243a" });
  add("boots", "bot_bla", "Blå ridstövlar", 80, { c: "#2457b8" });
  add("boots", "bot_rosa", "Rosa ridstövlar", 80, { c: "#ec6fa4" });
  add("boots", "bot_glitter", "Glitterstövlar", 160, { c: "#34346a", glitter: true, rare: true });

  const byId = {};
  C.forEach((i) => { byId[i.id] = i; });

  const DEFAULT_EQUIP = {
    saddle: "sad_brun", pad: "pad_vit", bridle: "bri_svart", wraps: "wrap_none", rosette: "ros_none", mane: "man_vanlig",
    helmet: "hlm_svart", jacket: "jak_marin", breeches: "byx_vit", boots: "bot_svart",
  };

  const FOOD = [
    { id: "hay", name: "Hö", price: 0, energy: 8, shine: 0, note: "Gratis. Fyller upp till 70 i energi.", cap: 70, color: "#d9b84e" },
    { id: "carrot", name: "Morot", price: 5, energy: 12, shine: 2, note: "Klassikern.", color: "#ff8a1f" },
    { id: "apple", name: "Äpple", price: 8, energy: 18, shine: 3, note: "Saftigt och gott.", color: "#e53b3b" },
    { id: "oats", name: "Havre", price: 15, energy: 34, shine: 4, note: "Riktig kraftmat.", color: "#d8c27a" },
  ];

  const SKINS = ["#fde0c8", "#f5cba7", "#e0ac80", "#c68a5c", "#9a6a44", "#6e4630"];
  const HAIRS = [
    { c: "#f6d365", n: "Blond" }, { c: "#c9822b", n: "Ljusbrun" }, { c: "#d9541e", n: "Rödhårig" },
    { c: "#6b3d1c", n: "Brun" }, { c: "#2b1d14", n: "Svart" }, { c: "#c9ced8", n: "Silver" },
    { c: "#ff6fae", n: "Rosa" }, { c: "#4aa3ff", n: "Blå" },
  ];
  const HAIR_STYLES = [
    { id: "ponytail", n: "Hästsvans" }, { id: "braid", n: "Fläta" }, { id: "long", n: "Långt" }, { id: "short", n: "Kort" },
  ];

  return { SLOTS, ITEMS: C, byId, DEFAULT_EQUIP, FOOD, SKINS, HAIRS, HAIR_STYLES };
})();
