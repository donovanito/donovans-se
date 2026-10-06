# Enhörningsspelet

Calm unicorn obstacle-course game for kids (Hedvig, Amanda, Edith, Alex). Canvas game in `src/components/UnicornGame.tsx`.

    npm install
    npm run dev      # http://localhost:3000

## Ikoner och delningsbild

`public/` innehåller favicon, hemskärmsikon (iPhone/iPad), manifest och `og.png` (bilden som visas när länken delas, t.ex. i iMessage). Metadata ligger i `src/app/layout.tsx`. Filerna genereras av `tools/make-assets.mjs` (kräver Playwright), och enhörningarna i `og.png` ritas med spelets egen kod. Kör om skriptet om figurer eller färger ändras:

    npm i --no-save playwright && node tools/make-assets.mjs
