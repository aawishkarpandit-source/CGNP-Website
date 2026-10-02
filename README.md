# Celta Group Digital (CG.NP Digital) — Website

Software & Digital Technology · `index.html` / `about.html` / `download.html`
TSX **without React** + vanilla HTML/CSS/JS.

## Run (no build needed)
Just open `index.html` in a browser. No dependencies.

## Develop with TSX (no React)
Sources in `src/` use a tiny `h()` JSX runtime (`src/runtime/jsx.ts`):

```tsx
/** @jsx h */
import { h } from "../runtime/jsx";
export function Card() { return <div class="card">Hello CG</div>; }
```

```bash
npm install
npm run check   # typecheck tsx
npm run build   # emit to assets/js/compiled
```

`assets/js/main.js` is the hand-compiled vanilla output already wired to all 3 HTML pages,
so the site works even without running `tsc`.

## Structure
```
index.html about.html download.html
assets/css/style.css  assets/js/main.js
src/runtime/jsx.ts
src/components/Layout.tsx  src/components/Services.tsx
src/pages/home.tsx  src/pages/about.tsx  src/pages/download.tsx
```

## Company data baked in
- Vision / Mission, 10 services, 5 leaders, 35/22/22/21 share chart, hierarchy, estimator + 5 instant downloads.
