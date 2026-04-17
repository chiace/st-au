# Architecture

Lightweight map of how the Superteam Australia site is structured for **review**, **handoff**, and **future CMS work**.

## App structure

| Concern | Location |
|---------|----------|
| Entry | `index.html`, `src/main` (per Vite setup) |
| Root layout & routing | `src/app/App.tsx` — hash routes `#/`, `#/members`, `#/design-system` |
| Landing | `src/app/HomePage.tsx` — composes sections |
| Members directory | `src/app/MembersPage.tsx` |
| Design system atlas | `src/app/DesignSystemPage.tsx` |
| Shared chrome + modal + cards | `src/app/site-shell.tsx` |
| Typed content | `src/app/data.ts` |

**Routing:** Hash-based SPA — static hosts need no rewrite rules for these routes.

## Design system layering

1. **Docs** — `design-system.md`, `component-inventory.md`, `figma-handoff.md`, this file.
2. **Tokens** — `src/design-system/tokens.ts` (canonical TS), `src/design-system/tokens.json` (JSON for tools/Figma).
3. **Bridge** — `src/design-system/foundations.ts` (CSS variable names, layout px, Tailwind theme key lists).
4. **Barrel** — `src/design-system/index.ts` exports tokens, component map, foundations.
5. **Theme** — `src/styles/tailwind.css` (`@theme`), `src/styles/theme.css` (global vars, dark theme, utilities).
6. **UI** — Page and shell components under `src/app/`.

## Data / content model

All section content is typed in **`src/app/data.ts`**: navigation, links, mission tracks, metrics, events, members, partners, testimonials, FAQs, onboarding defaults.

**CMS readiness:** Replace `data.ts` with fetch layers (Supabase, JSON, MDX) while keeping presentational components stable. Suggested split: one module per domain (`members`, `events`, `settings`).

## Content flow

| Domain | Source today | Consumers |
|--------|----------------|-----------|
| Events | `data.events` | `EventsSection` |
| Members | `data.members` | `MembersSection`, `MembersPage` |
| Partners | `data.ecosystemPartners` | `EcosystemSection` |
| Metrics | `data.impactMetrics` | `StatCard` row |
| Social / FAQ | `data.testimonials`, `data.faqs` | `XFeedSection`, `FAQSection` |

## UI kit note

`src/app/components/ui/` contains **vendored shadcn-style** components. The Superteam **Home**, **Members**, and **Design system** flows **do not import** these paths today; implementation is Tailwind + `site-shell` + `HomePage` components. The folder remains for scalability and optional future admin UI.

## Maintainability

- Prefer **`max-w-site`** and **`brand-*`** tokens over raw hex/`max-w-[1320px]` for new work.
- New shared primitives → consider `src/app/components/` (domain) or extend `site-shell.tsx` until split is warranted.
- Large homepage growth → optional split into `src/app/home/sections/*.tsx` with `HomePage` as an index.

## Figma companion

`figma-make-mirror/` holds a content map, JSON tokens snapshot, and section blueprint for Figma Make / design review. **Source of truth for implementation** remains this repo; mirror files are for alignment and submission context.
