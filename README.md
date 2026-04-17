# Superteam Australia — Website

## Overview

Production-quality marketing and community site for **Superteam Australia**: a clear digital home for Australian builders on Solana—events, members, ecosystem context, and a **Get Involved** onboarding path. The repo is structured for **submission review**, **design handoff**, and **future CMS integration**.

## Live preview

- **Production**: https://st-au.vercel.app/
- **Preview deployments**: enabled automatically by Vercel for each commit/PR once the repo is connected.

## Challenge context

The build targets a **real ecosystem product** feel: not a one-off landing page, but a site that could ship—structured content, documented design system, hash-based SPA suitable for static hosting, and a path from `data.ts` to a real backend.

## Key features

| Area | What ships |
|------|------------|
| Landing | Hero, mission, impact metrics, support panel, events (Luma), meetup story, featured members, partners, community (simulated X thread + links), testimonials, FAQ, join CTA |
| Members | Search, skill filters, responsive `MemberCard` grid |
| Onboarding | Multi-step modal with validation and confirmation |
| Design system | In-app `DesignSystemPage` + repo docs + tokens |
| Figma support | `figma-make-mirror/` companion package |

## Tech stack

- **Vite (root)**: React 18 · Vite 6 · TypeScript · hash routing (`#/`, `#/members`, …)
- **Next.js (`nextjs/`)**: Next.js 16 App Router · React 19 · path routes (`/`, `/members`, `/design-system`) — full production build included
- Tailwind CSS v4 (`@theme` in `src/styles/tailwind.css` or `nextjs/src/styles/tailwind-theme.css`)
- Motion (`motion/react`)
- Lucide React

### Next.js (full app)

```bash
cd nextjs
npm install
npm run dev
```

Production: `cd nextjs && npm run build && npm start`. On **Vercel**, set the project **Root Directory** to `nextjs` (Framework: Next.js). The root Vite app can stay on the default `npm run build` → `dist` as a separate project if you want both.

## Project structure

```text
README.md
design-system.md
component-inventory.md
architecture.md
figma-handoff.md
.env.example
public/
figma-make-mirror/
src/
  app/
    App.tsx
    HomePage.tsx
    MembersPage.tsx
    DesignSystemPage.tsx
    data.ts
    site-shell.tsx
    components/
      figma/          # e.g. ImageWithFallback
      ui/             # shadcn-style primitives (optional / future use)
  design-system/
    tokens.ts
    tokens.json
    foundations.ts
    component-map.ts
    index.ts
  styles/
    index.css
    tailwind.css
    theme.css
    fonts.css
```

## Setup

Install dependencies (project was verified with):

```bash
npm install --legacy-peer-deps
```

## Run locally

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Environment variables

The app runs **without** env vars for static content.

For future integrations, see **`.env.example`** (Supabase, Luma collection URL, X handle).

## Deployment

- Output: static files in `dist/` after `npm run build`.
- **Hash routing** (`#/`, `#/members`, `#/design-system`) — no server rewrite required for primary navigation.
- Suitable for **Vercel**, **Netlify**, **Cloudflare Pages**, or any static host.

### Vercel (recommended)

1. On Vercel, click **New Project** → import the GitHub repo `chiace/st-au`.
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy — then paste the URL above under **Live preview**.

## Design system (documentation)

| Asset | Purpose |
|-------|---------|
| `design-system.md` | Foundations, motion, a11y, design ↔ code |
| `component-inventory.md` | Components, variants, usage |
| `architecture.md` | App layers, data model, CMS path |
| `figma-handoff.md` | Figma naming ↔ code |
| `src/design-system/tokens.ts` | Canonical TS tokens |
| `src/design-system/tokens.json` | JSON for tools / plugins |
| `src/design-system/foundations.ts` | CSS var names, layout widths, Tailwind key lists |
| `src/design-system/component-map.ts` | Machine-readable component inventory |

Import barrel: `src/design-system/index.ts`.

## CMS / data notes

- Current source: **`src/app/data.ts`** (typed).
- Migration: swap for API/Supabase loaders; keep `HomePage` / `MembersPage` mostly presentational.

## Figma Make mirror

**`figma-make-mirror/`** — content map, token snapshot, section blueprint, README. Use for Figma reconstruction and reviewer context; **implementation truth** is `src/` and `src/design-system/`.

## Future improvements

- Live Luma API for events  
- Persist onboarding to Supabase  
- Admin / CMS for members & copy  
- Optional migration from hash routes to path-based SPA + host rewrites if SEO requirements grow  

## Notes

- Some listings remain **illustrative** for the challenge; replace with live data when available.  
- Social channel URLs may be placeholders until launch.  
- `npm install --legacy-peer-deps` reflects the project’s dependency tree from the original Figma-based scaffold.
