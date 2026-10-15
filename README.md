# VELTRION — Website

Engineered for What's Next. · `index.html` / `about.html` / `download.html`

The pages are driven by **TSX without React** — a tiny `h()` JSX runtime compiles
`src/` to ES modules in `assets/js/compiled/`, and each HTML file is a thin shell
that mounts its page into `#app`.

## Run

```bash
npm install
npm run build   # tsc → assets/js/compiled/
npm run dev     # serve locally
```

Then open the served site. `npm run check` typechecks the TSX.

## How it fits together

```
index.html about.html download.html     ← thin shells: head/meta + #app + fallback + module script
assets/css/style.css                     ← design system (27 tokens, no framework)
src/runtime/jsx.ts                       ← h()/render() — plain DOM, no React
src/runtime/behaviors.ts                 ← nav, reveal, accordion, rail, downloads wiring
src/runtime/boot.ts                      ← render + fail-safe (never a blank screen)
src/data/site.ts                         ← all copy/content (single source of truth)
src/components/Layout.tsx  Icons.tsx     ← header, footer, effects, rail, SVG icons
src/pages/home.tsx  about.tsx  download.tsx
```

### Editing content

- **Copy/sections** → `src/data/site.ts` (services, FAQ, team, downloads…)
- **Page markup** → `src/pages/*.tsx`
- **Behavior** → `src/runtime/behaviors.ts`
- **Styles** → `assets/css/style.css`

After any `src/` change run `npm run build` (or `npm run check` to only typecheck).

### Degradation

Each shell has an inline watchdog + `.boot-fallback`: if the module never renders
(JS disabled or an error), `html.js` is dropped and a branded fallback with nav
links appears — the site can degrade, but it never stays blank.

## Deploy notes

- `vercel-build` runs `tsc`, so `assets/js/compiled/` is generated on every deploy.
- All responses ship `Cache-Control: public, max-age=0, must-revalidate`, so a new
  deploy is picked up immediately (no more stale-cache blank pages).
