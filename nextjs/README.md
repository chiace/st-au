# Superteam Australia — Next.js

Full **Next.js 16** (App Router) port of the marketing site: `/`, `/members`, `/design-system`.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Layout

- `src/app/` — routes and `layout.tsx` (wraps UI in `SiteChrome`: header, footer, join modal, cursor shell).
- `src/site/` — page sections (`HomePage`, `MembersPage`, `DesignSystemPage`), `data.ts`, `site-shell.tsx`.
- `src/assets/` — images used by the site.
- `src/design-system/` — design tokens (used by the design system page).
- `src/styles/` — Tailwind v4 theme + global CSS (`globals.css` imports fonts + theme).

## Vercel

Create/import the GitHub repo and set **Root Directory** to `nextjs`. Framework detection should pick **Next.js** automatically.
