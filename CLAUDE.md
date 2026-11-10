# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run lint` — ESLint with `--fix` (auto-modifies files)

There is no test framework configured.

Vite 8 requires Node `^20.19.0 || >=22.12.0`. The GitHub Actions workflow (`.github/workflows/vite.yml`) uses Node 22 for this reason; keep them in sync. On Windows PowerShell, `npm` may be blocked by execution policy — use `npm.cmd` or Git Bash.

## Architecture

Vue 3 + Vite + Tailwind CSS 3 (+ Sass) shopping-cart demo, deployed as static files to GitHub Pages on every push to `main`.

- **Options API, not `<script setup>`**: views use `export default { data, methods }`. Follow that style.
- **Cart state lives in `localStorage` (key `cart`), not Pinia.** Pinia is registered in `src/main.js`, but `src/stores/counter.js` is only the unused scaffold example. Views read/write the `cart` JSON array directly (e.g. `addCart` in `ShoppingList.vue` merges by `product.id` and sums `quantity`). The flow is list → cart → checkout → success; data must be consistent across all four views via that localStorage key.
- **Products come from a static JSON file** (`src/assets/Json/MOCK_DATA.json`), imported directly into `ShoppingList.vue`. There is no backend.
- **Routing** (`src/router/index.js`) uses `createWebHashHistory`, which is required for GitHub Pages (no server-side fallback). Route paths are mixed case (`/Shoppingcar`, `/Shoppingcheck`, `/buysuccess`); `/` and `/shopping` both render `ShoppingList.vue`.
- `vite.config.js` sets `base: './'` (relative assets for Pages) and alias `@` → `src/`.
- `CountButton.vue` is the only shared component; the rest are page-level views in `src/views/`.

## Repo quirks

- `dist/` and a root `404.html` (a stale copy of a built `index.html` with hashed asset names) exist in the repo; don't treat `404.html` as source.
