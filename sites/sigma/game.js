"use strict";
/* Sigma - UI och spelflöde. Logiken finns i engine.js, innehållet i data.js. */
(() => {
  const E = SigmaEngine, D = SigmaData, P = D.PARAMS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sg = (n) => (n > 0 ? "+" + n : n < 0 ? "-" + Math.abs(n) : "0");
  const kr = (n) => Math.round(n).toLocaleString("sv-SE").replace(/−/g, "-") + " kr";
  const LV = (l) => D.LEVELS[l - 1];

  /* =====================================================================
     SPARAT TILLSTÅND
     ===================================================================== */
  const KEY = "sigma.v1";
  const defaults = () => ({ run: null, mute: false, name: "", look: 0, records: [], stats: { started: 0, completed: 0, best: 1 }, seenHelp: false });
  let S = defaults();
  try { const j = JSON.parse(localStorage.getItem(KEY)); if (j && typeof j === "object") S = Object.assign(defaults(), j); } catch (e) { /* ignoreras */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignoreras */ } }
  if (S.run && S.run.done) { S.run = null; save(); }

  /* =====================================================================
     VISNING: SKÄRMAR OCH ÖVERLÄGG
     ===================================================================== */
  let scene = "menu";
  function showScene(name) {
    scene = name;
    $("#menu").hidden = name !== "menu";
    $("#game").hidden = name !== "game";
  }
  const overlays = ["ovTower", "ovHelp", "ovRecords", "ovNew", "ovMenu", "ovWin"];
  const openOv = (id) => { $("#" + id).hidden = false; };
  const closeOv = (id) => { $("#" + id).hidden = true; };
  const anyOverlay = () => overlays.some((id) => !$("#" + id).hidden);
  let toastT = 0;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2600); }

  function updateMuteIcons() { $$("#mMute, #gMute").forEach((b) => { b.textContent = S.mute ? "🔇" : "🔊"; }); }
  function toggleMute() { S.mute = !S.mute; Sfx.setMuted(S.mute); updateMuteIcons(); save(); if (!S.mute) { Sfx.init(); Sfx.tap(); } }

  /* =====================================================================
     MENY
     ===================================================================== */
  function updateMenu() {
    const run = S.run;
    $("#bContinue").hidden = !run;
    const r = $("#resume");
    r.hidden = !run;
    if (run) {
      $("#bContinueSub").textContent = `${LV(run.level).n}, nivå ${run.level} av 10 - steg ${Math.min(run.step + (run.cur && !run.cur.res ? 1 : 0), 5) || 1} av 5`;
      r.innerHTML = `${Art.avatar(run.level, "happy", run.look)}<span><b>${esc(run.name || "Du")}</b> - ${LV(run.level).n}, år ${run.year}</span>`;
    }
  }
  function showMenu() {
    showScene("menu");
    updateMenu();
  }

  /* ---------- Ny karriär ---------- */
  let newLook = 0;
  function openNew() {
    Sfx.init(); Sfx.tap();
    $("#nName").value = S.name || "";
    newLook = S.look || 0;
    $("#nLooks").innerHTML = Art.LOOKS.map((l, i) => `<button class="look${i === newLook ? " sel" : ""}" data-i="${i}" aria-label="Utseende ${i + 1}">${Art.avatar(3, "happy", i)}</button>`).join("");
    const old = $("#newWarn");
    if (old) old.remove();
    if (S.run) $("#nName").closest(".fld").insertAdjacentHTML("beforebegin", `<p class="hint" id="newWarn" style="margin:0 0 12px;color:var(--warn)">Din pågående karriär (${LV(S.run.level).n}) ersätts.</p>`);
    openOv("ovNew");
  }
  $("#nLooks").addEventListener("click", (e) => {
    const b = e.target.closest(".look"); if (!b) return;
    newLook = +b.dataset.i; Sfx.tap();
    $$("#nLooks .look").forEach((x) => x.classList.toggle("sel", x === b));
  });
  $("#nCancel").addEventListener("click", () => { Sfx.tap(); closeOv("ovNew"); });
  $("#nStart").addEventListener("click", () => {
    Sfx.init();
    const name = $("#nName").value.trim().slice(0, 16);
    S.name = name; S.look = newLook;
    S.run = E.newRun(name); S.run.look = newLook;
    S.stats.started++;
    save();
    closeOv("ovNew");
    startGame(true);
    if (!S.seenHelp) { S.seenHelp = true; save(); openOv("ovHelp"); }
  });

  /* =====================================================================
     SPELET: STATUSFÄLT
     ===================================================================== */
  let gaugesBuilt = false, sideTower = null;
  function buildStatus() {
    $("#gGauges").innerHTML = P.map((p, i) => `<div class="g" data-i="${i}"><div class="gr"><span class="gi">${p.icon}</span><span class="gv">50</span></div><div class="gl">${p.short}</div><div class="gb"><i style="width:50%"></i><u></u></div><span class="gd"></span></div>`).join("");
    $("#gSigma").innerHTML = `<span class="sg">Σ</span><span class="sv">50</span><div class="sm"><div class="sbar"><i></i><u></u></div><div class="sl"><span>Σ-index</span><span id="sNeed">krav <b>55</b></span></div></div><div class="pips" id="gPips">${"<i></i>".repeat(5)}</div>`;
    sideTower = Art.tower(D.LEVELS);
    $("#gSide").innerHTML = "";
    $("#gSide").appendChild(sideTower);
    gaugesBuilt = true;
  }
  const zone = (v) => (v <= 20 ? "lo" : v < 40 ? "mid" : v >= 75 ? "hi" : "ok");
  const sigPos = (v) => Math.max(0, Math.min(100, ((v - 30) / 50) * 100));
  let lastShownLevel = 0;

  function moodNow(run) { const s = E.sigma(run.p), n = E.need(run.level); return s >= n ? "happy" : s >= n - 5 ? "neutral" : "worried"; }

  /* Uppdatera allt i statusfältet. deltas = parameterförändringar som ska flyta upp. */
  function updateStatus(deltas, animTower) {
    const run = S.run;
    if (!gaugesBuilt) buildStatus();
    const lv = LV(run.level), s = E.sigma(run.p), n = E.need(run.level);
    $("#gLvlNo").textContent = `NIVÅ ${run.level} AV 10`;
    $("#gLvlName").textContent = lv.n;
    $("#gSal").textContent = kr(E.salary(run.level, run.p[2]));
    const mood = moodNow(run);
    $("#gAvatar").innerHTML = Art.avatar(run.level, mood, run.look);
    $$("#gGauges .g").forEach((g, i) => {
      const v = run.p[i];
      g.className = "g " + zone(v);
      $(".gv", g).textContent = v;
      $(".gb i", g).style.width = v + "%";
      const d = $(".gd", g);
      if (deltas && deltas[i]) {
        d.textContent = sg(deltas[i]); d.className = "gd " + (deltas[i] > 0 ? "up" : "dn");
        void d.offsetWidth; d.classList.add("show");
      }
    });
    $("#gSigma .sv").textContent = Math.round(s);
    $("#gSigma .sbar i").style.width = sigPos(s) + "%";
    $("#gSigma .sbar u").style.left = `calc(${sigPos(n)}% - 1px)`;
    $("#sNeed").innerHTML = `krav <b>${n}</b>`;
    // steg
    const pips = $$("#gPips i");
    const choosing = run.cur && !run.cur.res;
    pips.forEach((p, i) => {
      const h = run.round.hist[i];
      p.className = h ? (h.bad ? "done badstep" : "done") : (i === run.step && choosing ? "now" : "");
    });
    Art.towerSet(sideTower, run.level, mood, run.look, !!animTower && lastShownLevel !== run.level);
    lastShownLevel = run.level;
  }

  /* =====================================================================
     SPELET: START OCH FLÖDE
     ===================================================================== */
  function startGame(fresh) {
    showScene("game");
    lastShownLevel = 0;
    if (!gaugesBuilt) buildStatus();
    updateStatus(null, false);
    route();
  }
  function route() {
    const run = S.run;
    if (run.cur && run.cur.res) renderResult(false);
    else {
      if (!run.cur) { E.startStep(run); save(); }
      renderChoose();
    }
  }

  /* ---------- Beslutsvyn ---------- */
  let sel = null;
  function factorChips(f) {
    const out = [];
    const up = [], dn = [];
    Object.keys(f.tag).forEach((t) => { const v = f.tag[t].reduce((a, b) => a + b, 0); if (v >= 2) up.push(t); else if (v <= -2) dn.push(t); });
    if (up.length) out.push(`<span class="fc up">Gynnar ${up.map((t) => D.TAGS[t].icon + " " + D.TAGS[t].name).join(", ")}</span>`);
    if (dn.length) out.push(`<span class="fc dn">Straffar ${dn.map((t) => D.TAGS[t].icon + " " + D.TAGS[t].name).join(", ")}</span>`);
    f.flat.forEach((v, i) => { if (Math.abs(v) >= 2) out.push(`<span class="fc ${v > 0 ? "up" : "dn"}">${P[i].icon} ${sg(v)} på alla beslut</span>`); });
    if ((f.riskAdd || 0) >= 0.08) out.push(`<span class="fc rk">⚠️ Högre risk</span>`);
    return out.join("");
  }
  const RISK = [["Låg risk", "●○○"], ["Medel risk", "●●○"], ["Hög risk", "●●●"]];

  function renderChoose() {
    const run = S.run, sc = E.scenario(run), f = E.factor(run);
    sel = null;
    const kind = f.ext === null ? "calm" : f.ext ? "ext" : "int";
    const kindTx = f.ext === null ? "LUGNT LÄGE" : f.ext ? "EXTERN FAKTOR" : "INTERN FAKTOR";
    const opts = [0, 1, 2].map((slot) => {
      const o = E.option(run, slot);
      const imp = o[4].map((v, i) => (Math.abs(v) >= 3 ? `<em class="${v > 0 ? "u" : "d"}">${P[i].icon}${v > 0 ? "▲" : "▼"}</em>` : "")).join("");
      const tg = D.TAGS[o[2]];
      return `<button class="opt" data-slot="${slot}"><span class="ab">${"ABC"[slot]}</span><span class="ot"><b>${o[0]}</b><span class="od">${o[1]}</span><span class="meta"><span class="mc">${tg.icon} ${tg.name}</span><span class="mc r${o[3]}">${RISK[o[3]][1]} ${RISK[o[3]][0]}</span><span class="imp">${imp}</span></span></span></button>`;
    }).join("");
    $("#gMain").innerHTML = `<div class="view">
      <div class="factor ${kind === "int" ? "int" : kind === "calm" ? "calm" : ""}"><div class="fi">${f.icon}</div><div class="ft"><small>${kindTx}</small><b>${f.name}</b><p>${f.txt}</p><div class="fchips">${factorChips(f)}</div></div></div>
      <article class="scard"><small>NIVÅ ${run.level} - STEG ${run.step + 1} AV 5</small><h2>${sc.t}</h2><p>${sc.s}</p></article>
      <div class="opts">${opts}</div></div>`;
    $("#gMain").scrollTop = 0;
    $("#gFoot").innerHTML = `<button class="btn" id="bDecide" disabled>Välj ett beslut</button>`;
    updateStatus(null, false);
  }

  function selectOpt(slot) {
    if (S.run.cur.res) return;
    sel = slot; Sfx.init(); Sfx.select();
    $$(".opt").forEach((b) => b.classList.toggle("sel", +b.dataset.slot === slot));
    const d = $("#bDecide");
    if (d) { d.disabled = false; d.textContent = `Fatta beslut ${"ABC"[slot]}`; }
  }
  function decide() {
    const run = S.run;
    if (sel === null || run.cur.res) return;
    Sfx.init(); Sfx.decide();
    const res = E.resolve(run, sel);
    save();
    renderResult(true);
    setTimeout(() => { if (run.crisis >= 0) Sfx.crisis(); else res.bad ? Sfx.bad() : Sfx.good(); }, 150);
  }

  /* ---------- Resultatvyn ---------- */
  function renderResult(animate) {
    const run = S.run, res = run.cur.res, opt = E.option(run, run.cur.choice), f = E.factor(run), sc = E.scenario(run);
    const mood = res.bad ? "sad" : "happy";
    const lonBefore = run.p[2] - res.delta[2];
    const dl = P.map((p, i) => `<div class="dl ${res.delta[i] > 0 ? "up" : res.delta[i] < 0 ? "dn" : ""}"><span>${p.icon}</span><b>${sg(res.delta[i])}</b><small>${p.short}</small></div>`).join("");
    // faktorns bidrag
    const parts = [];
    res.fd.forEach((v, i) => { if (v) parts.push(`${P[i].short} ${sg(v)}`); });
    const factorNote = f.ext === null || !parts.length ? "" : `<div class="rnote">${f.icon} <b>${f.name}</b> påverkade utfallet: ${parts.join(", ")}.</div>`;
    const frict = res.dr.every((v) => v === res.dr[0]) ? sg(res.dr[0]) + " på alla" : res.dr.map(sg).join(" / ");
    const wage = E.salary(run.level, run.p[2]) - E.salary(run.level, lonBefore);
    const end = run.crisis >= 0 || run.step >= E.STEPS;
    $("#gMain").innerHTML = `<div class="view">
      <div class="rhead ${res.bad ? "bad" : ""}"><span class="lav">${Art.avatar(run.level, mood, run.look)}</span><div><small>UTFALL</small><h2>${res.bad ? "Bakslag" : "Lyckat beslut"}</h2></div></div>
      <p class="rtext">${res.text}</p>
      <p class="rdec">Ditt beslut i <b>${sc.t}</b>: <b>${opt[0]}</b></p>
      <div class="deltas">${dl}</div>
      ${factorNote}
      <div class="rnote">🧱 Vardagsfriktion: ${frict}. ${wage ? `Månadslönen ${wage > 0 ? "steg" : "sjönk"} med ${kr(Math.abs(wage))}.` : ""}</div>
      ${run.crisis >= 0 ? `<div class="rnote" style="color:var(--bad)">🚨 <b>${P[run.crisis].name}</b> har fallit under ${E.consts.CRISIS_AT + 1}. Det blir kris.</div>` : ""}
    </div>`;
    $("#gMain").scrollTop = 0;
    $("#gFoot").innerHTML = `<button class="btn" id="bNext">${end ? "Till utvärderingen" : "Nästa steg"}</button>`;
    updateStatus(animate ? res.delta : null, false);
  }
  function next() {
    const run = S.run;
    Sfx.tap();
    if (run.crisis >= 0 || run.step >= E.STEPS) return renderReview();
    E.startStep(run); save();
    renderChoose();
  }

  /* ---------- Utvärdering ---------- */
  const VTITLE = { up: "Befordran!", up2: "Snabbspår!", stay: "Förlängt uppdrag", down: "Nedflyttning", crisis: "Kris!" };
  const VICON = { up: "🎉", up2: "🚀", stay: "🤔", down: "📉", crisis: "🚨" };
  let evalCur = null;
  function renderReview() {
    const run = S.run, ev = E.evaluate(run);
    evalCur = ev;
    const lv = LV(run.level);
    let vt = ev.win ? "up2" : ev.v, text;
    if (ev.win) text = D.VERDICT.win[0];
    else if (ev.v === "crisis") text = D.VERDICT.crisis[run.crisis];
    else if (ev.floor) text = D.VERDICT.floor[0];
    else text = E.pick(D.VERDICT[ev.v]);
    if (ev.v === "stay" && !ev.balanced && ev.sigma >= ev.need) text = `Siffrorna räcker men balansen brister: <b>${P[ev.weakest].name}</b> ligger under 30. Ledningen vill se en jämnare profil innan nästa steg.`;
    const title = ev.win ? "Årets bankchef!" : VTITLE[vt];
    const tx = text;
    const sRel = sigPos(ev.sigma), nRel = sigPos(ev.need);
    const bal = P.map((p, i) => `<div class="${run.p[i] >= E.consts.BALANCE_PROMO ? "ok" : "no"}"><b>${run.p[i]}</b>${p.icon} ${p.short}</div>`).join("");
    const hist = run.round.hist.map((h) => `<li>${h.bad ? "⚠️" : "✅"} <span><b>${E.byId[h.sid].t}</b> - ${h.label}</span></li>`).join("");
    let newrole = "";
    if (ev.to !== ev.from) newrole = `<p class="newrole">${ev.to > ev.from ? "Ny titel" : "Ny roll"}: <b>${LV(ev.to).n}</b> - ${LV(ev.to).unit}. Lön ca <b>${kr(E.salary(ev.to, E.rebase(run.p)[2]))}</b>/mån.</p>`;
    const crisisHead = ev.v === "crisis";
    $("#gMain").innerHTML = `<div class="view">
      <div class="verdict ${vt}"><span class="vi">${VICON[vt]}</span><div><h2>${title}</h2><p>${tx}</p></div></div>
      ${newrole}
      <div class="review"><h2>${crisisHead ? "Läget när det small" : "Utvärdering - " + lv.n}</h2>
        <div class="rvbar"><i style="width:${sRel}%"></i><u style="left:${nRel}%"></u><em style="left:${nRel}%">krav ${ev.need}</em></div>
        <div class="rvnum"><span>Σ-index <b>${Math.round(ev.sigma)}</b></span><span>${ev.sigma >= ev.need ? "över kravet" : "under kravet"}</span></div>
        <div class="bal">${bal}</div>
        <p class="hint" style="text-align:left;margin:0">Ingen parameter får vara under ${E.consts.BALANCE_PROMO} för befordran.</p>
        <ul class="hist">${hist}</ul>
      </div></div>`;
    $("#gMain").scrollTop = 0;
    $("#gFoot").innerHTML = `<button class="btn" id="bReviewGo">${ev.win ? "Ta emot utmärkelsen" : ev.to > ev.from ? "Gå upp i tornet" : ev.to < ev.from ? "Se vart du hamnar" : "Fortsätt"}</button>`;
    const sound = ev.win ? "up2" : vt;
    setTimeout(() => Sfx[sound === "up2" ? "up2" : sound](), 200);
    if (vt === "up" || vt === "up2") setTimeout(() => confetti(vt === "up2" ? 160 : 70), 250);
  }
  function afterReview() {
    const run = S.run, ev = evalCur || E.evaluate(run);
    Sfx.tap();
    const from = ev.from;
    let sc = 0;
    if (ev.win) sc = E.score(run, ev);
    E.applyEval(run, ev);
    S.stats.best = Math.max(S.stats.best, run.best);
    if (ev.win) {
      S.stats.completed++;
      const rec = { name: run.name || "Du", score: sc, steps: run.totalSteps, years: run.year - 1, sal: E.salary(10, run.p[2]), date: new Date().toISOString().slice(0, 10) };
      S.records.push(rec);
      S.records.sort((a, b) => b.score - a.score);
      S.records = S.records.slice(0, 5);
      save();
      return showWin(rec, S.records.indexOf(rec) + 1);
    }
    save();
    if (ev.to !== from) {
      const up = ev.to > from;
      showTower({ from, to: ev.to, title: up ? (ev.to - from > 1 ? "Snabbspår!" : "Hissen går upp") : "Hissen går ned", sub: ev.to === 10 ? "Du är VD! Nu gäller det att hålla i den. Styrelsen utvärderar dig efter fem beslut." : up ? `Välkommen till ${LV(ev.to).n}.` : `Du är nu ${LV(ev.to).n}.`, close: "Fortsätt", cb: () => { updateStatus(null, true); E.startStep(run); save(); renderChoose(); }, sound: up ? "lift" : "lift" });
    } else {
      updateStatus(null, false);
      E.startStep(run); save();
      renderChoose();
    }
  }

  /* ---------- Tornöverlägg ---------- */
  let towerCb = null, towerTimer = 0;
  function showTower(o) {
    clearTimeout(towerTimer);
    const run = S.run;
    $("#ovTowerTitle").textContent = o.title || "Karriärtornet";
    $("#ovTowerSub").textContent = o.sub || "";
    $("#ovTowerClose").textContent = o.close || "Stäng";
    const body = $("#ovTowerBody");
    body.innerHTML = "";
    const t = Art.tower(D.LEVELS);
    body.appendChild(t);
    const look = run ? run.look : S.look;
    const from = o.from || (run ? run.level : 1);
    Art.towerSet(t, from, "neutral", look, false);
    towerCb = o.cb || null;
    openOv("ovTower");
    if (o.to && o.to !== from) {
      towerTimer = setTimeout(() => {
        Sfx.init(); Sfx.lift();
        void t.offsetWidth;
        Art.towerSet(t, o.to, o.to > from ? "happy" : "sad", look, true);
        towerTimer = setTimeout(() => { o.to > from ? Sfx.up() : Sfx.down(); if (o.to > from) confetti(60); }, 1500);
      }, 500);
    }
  }
  function closeTower() {
    clearTimeout(towerTimer);
    closeOv("ovTower");
    const cb = towerCb; towerCb = null;
    if (cb) cb();
  }

  /* ---------- Seger ---------- */
  function showWin(rec, rank) {
    const run = S.run;
    $("#ovWin").innerHTML = `<div class="wrap">
      <div class="crownav">${Art.avatar(10, "happy", run.look)}</div>
      <h2>VD ${esc(rec.name)}!</h2>
      <p>Från springpojke till VD på ${rec.steps} beslut och ${rec.years} karriärår. Styrelsen reser sig och applåderar.</p>
      <div class="statrow"><div class="stat"><b>${rec.score}</b><small>Karriärpoäng</small></div><div class="stat"><b>${rec.steps}</b><small>Beslut</small></div><div class="stat"><b>${Math.round(rec.sal / 1000)} tkr</b><small>Månadslön</small></div></div>
      <p class="hint">${rank ? `Plats ${rank} på rekordlistan.` : ""} Färre beslut ger högre poäng.</p>
      <button class="btn" id="wNew">Ny karriär</button>
      <button class="btn alt" id="wMenu">Till menyn</button>
    </div>`;
    openOv("ovWin");
    Sfx.init(); Sfx.win();
    confetti(240);
    setTimeout(() => confetti(160), 900);
  }

  /* ---------- Rekord ---------- */
  function showRecords() {
    const st = S.stats;
    const list = S.records.length
      ? S.records.map((r, i) => `<div class="rec"><span class="rk">${i + 1}</span><span class="rm"><b>VD ${esc(r.name)}</b><small>${r.steps} beslut - ${r.years} år - ${Math.round(r.sal / 1000)} tkr/mån - ${r.date}</small></span><span class="rs">${r.score}</span></div>`).join("")
      : `<p class="hint">Inga genomförda karriärer än. Bli VD för att komma med på listan.</p>`;
    $("#recBody").innerHTML = `<div class="recsec"><div class="statrow"><div class="stat"><b>${st.started}</b><small>Påbörjade</small></div><div class="stat"><b>${st.completed}</b><small>Blev VD</small></div><div class="stat"><b>${st.best}</b><small>Högsta nivå</small></div></div></div><div class="recsec"><h3>Bästa karriärerna</h3>${list}</div>`;
    openOv("ovRecords");
  }

  /* ---------- Konfetti ---------- */
  let parts = [], raf = 0;
  function confetti(n) {
    const cv = $("#confetti"), ctx = cv.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    const cols = ["#f6d891", "#e2b25c", "#5aa7ff", "#35d0a0", "#ff6b6b", "#ffffff"];
    for (let i = 0; i < n; i++) parts.push({ x: innerWidth * (0.15 + Math.random() * 0.7), y: -10 - Math.random() * innerHeight * 0.4, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 4, w: 5 + Math.random() * 6, h: 3 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: cols[i % cols.length] });
    if (raf) return;
    const tick = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.scale(dpr, dpr);
      parts.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); });
      parts = parts.filter((p) => p.y < innerHeight + 20);
      if (parts.length) raf = requestAnimationFrame(tick);
      else { raf = 0; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); }
    };
    raf = requestAnimationFrame(tick);
  }

  /* =====================================================================
     HÄNDELSER
     ===================================================================== */
  $("#bContinue").addEventListener("click", () => { Sfx.init(); Sfx.tap(); startGame(false); });
  $("#bNew").addEventListener("click", openNew);
  $("#bTower").addEventListener("click", () => { Sfx.init(); Sfx.tap(); showTower({ title: "Karriärtornet", sub: "Tio nivåer från postrummet till penthouse.", from: S.run ? S.run.level : 1 }); });
  $("#bRecords").addEventListener("click", () => { Sfx.init(); Sfx.tap(); showRecords(); });
  $("#bHelp").addEventListener("click", () => { Sfx.init(); Sfx.tap(); openOv("ovHelp"); });
  $("#mMute").addEventListener("click", toggleMute);
  $("#gMute").addEventListener("click", toggleMute);
  $("#gMenu").addEventListener("click", () => { Sfx.tap(); openOv("ovMenu"); });
  $("#gLevel").addEventListener("click", () => {
    Sfx.tap();
    const r = S.run, n = r.level < 10 ? `Nästa nivå: ${LV(r.level + 1).n}.` : "Du är på toppen.";
    showTower({ title: "Karriärtornet", sub: `Du är ${LV(r.level).n}. ${n} Krav för befordran: Σ ${E.need(r.level)}.`, from: r.level });
  });
  $("#ovTowerClose").addEventListener("click", () => { Sfx.tap(); closeTower(); });
  $("#ovHelpClose").addEventListener("click", () => { Sfx.tap(); closeOv("ovHelp"); });
  $("#ovRecClose").addEventListener("click", () => { Sfx.tap(); closeOv("ovRecords"); });
  $("#pResume").addEventListener("click", () => { Sfx.tap(); closeOv("ovMenu"); });
  $("#pTower").addEventListener("click", () => { Sfx.tap(); closeOv("ovMenu"); $("#gLevel").click(); });
  $("#pHelp").addEventListener("click", () => { Sfx.tap(); closeOv("ovMenu"); openOv("ovHelp"); });
  $("#pQuit").addEventListener("click", () => { Sfx.tap(); closeOv("ovMenu"); showMenu(); });
  $("#ovWin").addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "wNew") { S.run = null; save(); closeOv("ovWin"); showMenu(); openNew(); }
    if (id === "wMenu") { S.run = null; save(); closeOv("ovWin"); showMenu(); }
  });
  // delegerade klick i spelvyn
  $("#gMain").addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (b) selectOpt(+b.dataset.slot); });
  $("#gFoot").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || b.disabled) return;
    if (b.id === "bDecide") decide();
    else if (b.id === "bNext") next();
    else if (b.id === "bReviewGo") afterReview();
  });
  document.addEventListener("keydown", (e) => {
    if (e.target && e.target.tagName === "INPUT") { if (e.key === "Enter") $("#nStart").click(); return; }
    if (scene !== "game") return;
    if (anyOverlay()) {
      if (e.key === "Escape") { if (!$("#ovTower").hidden) closeTower(); overlays.forEach((id) => { if (id !== "ovWin" && id !== "ovTower") closeOv(id); }); }
      return;
    }
    const k = e.key.toLowerCase();
    if (["1", "2", "3", "a", "b", "c"].includes(k)) { const i = "123".includes(k) ? +k - 1 : "abc".indexOf(k); if ($(".opt")) selectOpt(i); }
    else if (k === "enter" || k === " ") { const b = $("#gFoot button"); if (b && !b.disabled) { e.preventDefault(); b.click(); } }
    else if (k === "escape") openOv("ovMenu");
    else if (k === "m") toggleMute();
  });

  /* =====================================================================
     PWA, ZOOMSPÄRR OCH START
     ===================================================================== */
  ["gesturestart", "gesturechange", "gestureend"].forEach((n) => document.addEventListener(n, (e) => e.preventDefault()));
  document.addEventListener("dblclick", (e) => e.preventDefault());
  document.addEventListener("touchmove", (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  // iOS ignorerar user-scalable=no: stoppa dubbeltryck-zoom på knappar
  let lastTouch = 0;
  document.addEventListener("touchend", (e) => { const t = Date.now(); if (t - lastTouch < 300 && e.target.closest("button")) e.preventDefault(); lastTouch = t; }, { passive: false });

  let deferredInstall = null;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  function installUi() {
    $("#installBtn").hidden = !deferredInstall;
    $("#iosHint").hidden = !(isIOS && !standalone);
  }
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; installUi(); });
  window.addEventListener("appinstalled", () => { deferredInstall = null; installUi(); toast("Sigma är installerat!"); });
  $("#installBtn").addEventListener("click", () => { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; installUi(); }); });

  if ("serviceWorker" in navigator && "caches" in window && location.protocol !== "file:") {
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "offline-ready") { const h = $("#offlineHint"); h.textContent = "Klart: spelet fungerar nu utan nät."; h.hidden = false; setTimeout(() => { h.hidden = true; }, 5000); }
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && scene === "menu") location.reload(); });
    navigator.serviceWorker.register("sw.js").catch(() => { /* ignoreras */ });
  }

  // test-/felsökningskrok
  window.__sigma = { get S() { return S; }, E, startGame, showMenu, renderReview, save };

  $("#logo").innerHTML = Art.LOGO;
  $("#skyline").innerHTML = Art.skyline();
  Sfx.setMuted(!!S.mute);
  updateMuteIcons();
  installUi();
  showMenu();
})();
