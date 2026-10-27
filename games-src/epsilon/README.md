# Epsilon Raceway

Slotbilsspel (Carrera-känsla) ovanifrån. Statisk sajt utan build i `sites/epsilon`, driftsatt till
https://epsilon.donovans.se (`webroots/aa2a281c/`, se `sites.json`).

## Spelet

- Fem banor (Ovalen, Rundan, Triangeln, Chikanen, Hårnålen), sex bilfärger, alltid **3 varv** mot en datorbil i fil 2.
- Styrning: **GAS** (vänster halva av skärmen / mellanslag, ↑) och **TURBO** (höger halva / Shift, T, ↓). Esc/P = paus, M = ljud.
- Man släpper gasen före kurvorna. För hög fart i en kurva (särskilt med turbo) ger glidning och till sist **urspårning**; bilen
  ställs upp på samma ställe efter 2,6 s. Turbomätaren laddas upp under körning.
- Topp-3 per bana (total tid i sekunder, namn, datum) sparas i `localStorage` (nyckel `epsilon.v1`), ingen backend.
  Namnet kan ändras i menyn och på resultatskärmen.
- Startljus (3 röda, släcks till grönt). Ingen tjuvstart är möjlig, tidtagningen startar vid grönt.

## Kod

| Fil | Innehåll |
|---|---|
| `track.js` | Banor som sköldpaddsbeskrivning (raka bitar + kurvor), två filer, krökning, kontroll av att loopen sluter sig |
| `engine.js` | Motor/grepp/urspårning, datorförare (hastighetsprofil per fil + slumpad marginal per kurva), loppet (varv, mål) |
| `art.js` | Canvas-grafik: trägolv, bana med kantstöd, bil-sprite, målportal, ikoner |
| `audio.js` | Web Audio: motorljud, turbo, däckskrik, urspårning, startljus |
| `game.js` | Meny, HUD, indata (touch/tangentbord), resultat, topplista, PWA |

Fysiken stegas i delsteg om max 1/120 s, så tiderna är oberoende av bildfrekvensen. Greppet `G` och farterna står överst i `engine.js`.
Datorns styrka sätts i `aiOpts` i `game.js` (marginal mot greppgränsen, höjs med bansvårighet).
Spelaren kör alltid i fil 0 (inre filen) så att topplistans tider är jämförbara.

## Kontroll och ikoner

    node games-src/epsilon/sim.mjs                                          # banornas geometri + simulerade lopp
    npm i --no-save playwright && node games-src/epsilon/make-assets.mjs    # ikoner och og.png

## Offline / installera

`sw.js` cachar hela spelet (nät först, cache som reserv). Höj `VERSION` i `sw.js` vid större ändringar.
Android/Chrome visar en installationsknapp, iPhone/iPad: Dela - Lägg till på hemskärmen.
