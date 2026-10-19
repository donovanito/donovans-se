# Galoppen

Hästspel (hinderhoppning) för äldre barn. Statisk sajt utan build i `sites/galoppen`, driftsatt till
https://galoppen.donovans.se (`webroots/da9f248d/`, se `sites.json`).

## Spelet

| Meny | Innehåll |
|---|---|
| Ridbanan | Fyra klasser (80, 95, 110, 130 cm). Nästa klass låses upp när man kommer 1-3. |
| Stallet | Vård (borsta, mata), hästens utrustning och päls (brun, fux, skimmel, svart, isabell), ryttaren (hjälm, jacka, byxor, stövlar, utseende). |
| Horse and Hound | Butiken. Prova på hästen innan köp. Utrustning, kläder och foder. |
| Rekord | Topp-3 på poäng och på tid, per klass och totalt, med datum. Tid räknas bara för felfria rundor. |

**Styrning:** SAKTA / SKYNDA byter tempo (trav, galopp, full fart), HOPPA hoppar. Tangentbord: ← → och mellanslag.
Mynt sparas i `localStorage` (nyckel `galoppen.v1`), ingen backend.

### Fysiken (game.js)

Hoppet är en parabel (`JT` = 0,9 s, apex `cls.P`). Hästens fram- och bakhovar (`HFX`, `HRX`) kolliderar mot
varje stång:

- på marken in i hindret: **vägran** (+4 fel, tre vägringar = utesluten)
- i luften för lågt: **rivning** (+4 fel, stången faller)
- vattengrav: hovarna måste vara i luften över hela vattnet (+4 fel annars)

`jumpWindow()` räknar ut exakt var man får hoppa ifrån för samma fysik. Den styr både den gröna hjälpmarkeringen
och vad som räknas som "Perfekt!". Hästens form (energi 60 %, glans 40 %) höjer hoppet med upp till ca 12 %
(`jumpBoost()`), vilket gör fönstret större. Glans ger även extra mynt.

Banorna är fasta per klass (seed i `CLASSES`), så rekord är jämförbara.

## Ikoner och delningsbild

`icon-*.png`, `apple-touch-icon.png` och `og.png` genereras med spelets egen ritkod:

    npm i --no-save playwright && node games-src/galoppen/make-assets.mjs

## Offline / installera

`sw.js` cachar hela spelet (nät först, cache som reserv). Höj `VERSION` i `sw.js` vid större ändringar.
Android/Chrome visar en installationsknapp i menyn, iPhone/iPad: Dela - Lägg till på hemskärmen.
