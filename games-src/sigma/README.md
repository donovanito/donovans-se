# Sigma

Strategispel: ta dig från springpojke till VD för en bank. Statisk sajt utan build i `sites/sigma`, driftsatt till
https://sigma.donovans.se (`webroots/10920ad6/`, se `sites.json`).

## Spelet

- **10 nivåer** (Springpojke, Kundtjänstmedarbetare, Privatrådgivare, Kreditanalytiker, Gruppchef, Avdelningschef,
  Affärsområdeschef, Divisionschef, Vice VD, VD). Varje nivå är ett karriärår med **5 steg**; i varje steg ett scenario med
  **3 strategiska beslut**.
- **4 parametrar** (start 50): Ekonomi, Företagskultur, Löneutveckling, Tjänsteutveckling. **Σ-index** = snittet.
- Varje steg har en **påverkansfaktor** (extern: inflation, strejk, klimathot, räntechock, cyberattack, bankoro ...; intern:
  omorganisation, systemhaveri, release train, visselblåsare ...). Faktorn belönar/straffar **beslutstyper** (Tillväxt,
  Kostnad, Människor, Digitalt, Kund, Regelverk, Hållbart, Internpolitik) och kan höja risken. Det syns i spelet som
  "Gynnar/Straffar".
- Varje beslut har risk (låg/medel/hög). Vid bakslag uteblir nyttan, kostnaden ×1,5 och en bakslagsskatt tillkommer.
- **Vardagsfriktion**: alla parametrar tappar lite i varje steg (växer med nivån).
- **Utvärdering efter steg 5**: Σ >= krav och ingen parameter under 30 = befordran; Σ >= krav + 12 och ingen under 40 =
  snabbspår (två nivåer); strax under = förlängt uppdrag; klart under = nedflyttning. Parameter <= 10 = kris direkt (ned en nivå).
  Som VD (nivå 10) räcker en lyckad utvärdering för att vinna.
- Sparas i `localStorage` (`sigma.v1`): pågående karriär, namn/utseende, topp-5 karriärer. Ingen backend.

## Kod

| Fil | Innehåll |
|---|---|
| `data.js` | Nivåer, parametrar, beslutstyper, faktorer och **70 scenarier** (7 per nivå, 5 dras per år) |
| `engine.js` | Ren logik utan DOM: dragning, risk, utfall, friktion, utvärdering. Delas med simuleringen |
| `art.js` | Avatar (byter outfit per nivå), karriärtornet, logotyp, stadssiluett (inline-SVG) |
| `audio.js` | Web Audio-ljud |
| `game.js` | Meny, beslut/resultat/utvärdering, torn-animation, rekord, PWA |

## Balans och kontroll

Siffrorna (`need` per nivå i `data.js`, `DRAG_*`/`BAD_TAX`/`RISK_BASE` i `engine.js`) är kalibrerade med simuleringen:

    node games-src/sigma/sim.mjs 3000 --lvl

Mål: en spelare som läser faktorerna blir VD på ca 60 beslut, en "mänsklig" (30 % slump) på ca 100, en slumpspelare
sällan. Kör om efter varje ändring av scenarier eller konstanter. Ikoner och `og.png`:

    npm i --no-save playwright && node games-src/sigma/make-assets.mjs

## Offline / installera

`sw.js` cachar hela spelet (nät först, cache som reserv). Höj `VERSION` vid större ändringar. Android/Chrome visar en
installationsknapp, iPhone/iPad: Dela - Lägg till på hemskärmen.
