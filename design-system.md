# Design System — Superteam Australia

## Overview

This document is the single reference for **foundations**, **components**, and **design ↔ code mapping** for the Superteam Australia site. It supports Figma handoff, engineering review, and submission QA without duplicating long prose elsewhere.

**Canonical sources**

| Layer | Location |
|--------|----------|
| TypeScript tokens | `src/design-system/tokens.ts` |
| JSON mirror (tooling / plugins) | `src/design-system/tokens.json` |
| Foundations bridge (CSS vars, layout, Tailwind keys) | `src/design-system/foundations.ts` |
| Component inventory (machine + human) | `src/design-system/component-map.ts`, `component-inventory.md` |
| Tailwind v4 `@theme` | `src/styles/tailwind.css` |
| Global CSS variables & utilities | `src/styles/theme.css` |
| Content | `src/app/data.ts` |

## Principles

- **Product clarity first** — Each section states what it is, why it matters, and what to do next.
- **Selective emphasis** — Gradients and glow are reserved for hero, primary CTAs, and a few brand moments.
- **Readable density** — Typography carries hierarchy; surfaces support reading, not decoration.
- **System over one-offs** — Prefer tokens (`max-w-site`, `brand-green`, `shadow-card`) over arbitrary values unless there is a documented exception.
- **Motion with consent** — Respect `prefers-reduced-motion` (see `theme.css`, `HomePage`, `site-shell`).

## Foundations

### Colour system

| Token (TS) | Tailwind (`@theme`) | Typical use |
|------------|----------------------|-------------|
| `colors.ink` | `brand-ink` | Deep anchors, hero ink |
| `colors.inkSoft` | `brand-ink-soft` | Secondary dark surfaces |
| `colors.green` | `brand-green` | Primary actions, ecosystem |
| `colors.greenSoft` | `brand-green-soft` | Hover / secondary green |
| `colors.gold` | `brand-gold` | Accent, highlights |
| `colors.goldSoft` | `brand-gold-soft` | Soft gold highlights |
| `colors.azure` | `brand-azure` | Rare atmospheric accent |
| `colors.violet` | `brand-violet` | Rare atmospheric accent |
| `colors.textPrimary` | `text-primary` | Body on light surfaces (forms) |
| `colors.textSecondary` | `text-secondary` | Muted body |
| `colors.surfaceLight` | `surface-light` | Form / modal fields |
| `colors.surfaceLightWarm` | `surface-warm` | Warm light panels |

**CSS variables** (`:root` in `theme.css`): `--au-green`, `--au-gold`, `--au-azure`, `--au-violet`, RGB companions for gradients. Dark theme text overrides live under `.site-shell.dark-theme`.

**Rules**

- Green = primary action colour.
- Gold = accent, not a second full brand.
- Light text on dark uses slate overrides in dark theme; hero uses explicit `text-white` / gradient text utilities (`.gradient-word`, `.prism-word`) where needed.

### Typography

| Role | Font | Code |
|------|------|------|
| Display / headlines | Space Grotesk | `--font-display`, Tailwind `font-[family-name:var(--font-display)]` patterns in pages |
| Body / UI | Plus Jakarta Sans | `--font-body` |
| Mono / meta | JetBrains Mono | `--font-mono` |

**Heading structure**

- **One** page-level hero title (`Hero`) — largest display size, tight tracking.
- **Section titles** — `SectionHeader` + `h2` pattern (`text-4xl`–`text-5xl` range, `-0.05em` tracking).
- **Subheads / cards** — `h3` with `max-w-[12ch]`–`16ch` constraints for line length on desktop.

Avoid decorative font mixing; micro-labels use uppercase + letterspacing (`SectionEyebrow`, `field-card` labels).

### Spacing

| Concept | Token / value | Notes |
|---------|----------------|-------|
| Section vertical rhythm | `spacing.sectionYMobile` / `sectionYDesktop` | Implemented via `SectionFrame` + Tailwind `py-*` |
| Container horizontal padding | `containerXMobile` / `containerXDesktop` | `px-*` on sections |
| Card gaps | `cardGap` (~20px) | Grids in events, members |
| Form gaps | `formGap` | `OnboardingModal`, `.field-card` |
| 4px scale | `spacing.scale` | Use when aligning to a strict grid |

### Layout / grid

| Width | Token | Tailwind | Where |
|-------|--------|----------|--------|
| Main column | `layout.containerMax` (1320px) | `max-w-site` | `SectionFrame`, header/footer shells, members, design system page |
| Narrow hero copy | `contentNarrow` | often `max-w-[920px]` | Hero title block |
| Split sections | `contentSplit` | often `max-w-[980px]` | Hero grid, CTAs |
| Modal content | `modalWide` | `max-w-[900px]` class in shell | Wide modal layout |

Horizontal padding: typically `px-4` sm+ `px-6` or similar; keep consistent within a page.

### Radii, borders, shadows

| Token | CSS / Tailwind | Use |
|-------|----------------|-----|
| `radii.pill` | `--radius-pill` | Pills, chips |
| `radii.large` | `--radius-card` | Cards |
| `radii.xl` | `--radius-panel` | Large panels |
| `radii.hero` | `--radius-hero` | Hero shell |
| `shadows.subtle` | `--shadow-subtle` | Light elevation |
| `shadows.card` | `--shadow-card` | Cards |
| `shadows.panel` | `--shadow-panel` | Support / CTA panels |
| `shadows.modal` | `--shadow-modal` | Modal shell |

### Motion

| Duration | Token | Use |
|----------|--------|-----|
| Fast | `180ms` | Focus rings, small UI |
| Base | `240ms` | Hovers, transitions |
| Slow | `700ms` | Section reveals |

**Easing:** `standardCss` in tokens = `cubic-bezier(0.22, 1, 0.36, 1)`; Framer uses `standardBezier` array.

**Principles:** Short directional entry; hover clarifies affordance; continuous animation only in hero/metrics; `prefers-reduced-motion` disables or short-circuits (see `.pulse-aura`, `.signal-track`, Motion hooks).

## Component library overview

Authoritative list: **`src/design-system/component-map.ts`** and **`component-inventory.md`**.

**Clusters**

- **Shell:** `Header`, `Footer`, `OnboardingModal`, `MemberCard`, `Reveal`, `SectionEyebrow`, `AnimatedMetric`
- **Home:** `SectionFrame`, `SectionHeader`, `StatCard`, `Hero`, `HeroVisual`, `MissionSection`, `SupportSection`, `EventsSection`, `MeetupStorySection`, `MembersSection`, `EcosystemSection`, `XFeedSection`, `SimulatedTweetFeed`, `FAQSection`, `FinalCtaSection`
- **Pages:** `MembersPage`, `DesignSystemPage`
- **Utility:** `ImageWithFallback`

**Not on the critical path:** `src/app/components/ui/*` (shadcn-style primitives) — available for future use, not imported by the main Superteam pages today.

## Interaction states

| Pattern | Behaviour |
|---------|-----------|
| Primary button | Highest contrast; one primary per visual group when possible |
| Secondary | Outline or neutral fill (`slate-*`), beside primary |
| Text / nav link | Underline or opacity shift; header uses thin white underline on hover |
| Cards | Light translate or border brighten; no aggressive bounce |
| Accordion | Height transition; focus visible on trigger |
| Form | `.field-input` focus ring; labels in `.field-card` |
| Modal | Escape closes; `role="dialog"`, labelled |

## Responsive rules

- **&lt;640px:** Single column; section headers stack; filters wrap; no side-by-side form dependence.
- **≥1024px:** Editorial splits (hero, section headers) allowed.
- **Touch:** Minimum tap targets for nav and CTAs; mobile menu full-width links.

## Accessibility

- Contrast: dark theme forces light text via `.site-shell.dark-theme` overrides for slate classes.
- Focus: visible rings on inputs and interactive elements.
- Headings: semantic order per section.
- Motion: `prefers-reduced-motion` in `theme.css` + component-level checks.
- Colour: never the only signal for state (pair with weight, icon, or copy).

## Mapping: design ↔ code

| Design concept | Code |
|----------------|------|
| Brand colours | `tokens.ts` → `@theme` in `tailwind.css` → utilities `bg-brand-*`, `text-brand-*` |
| Semantic light text | `--text-primary` / `--text-secondary` + slate scale in JSX |
| Page width | Design “1320” = `max-w-site` = `--width-site` |
| Shadows / radius | Shared CSS vars in `:root` and `@theme` |
| Section order | `HomePage` compose order = scroll / IA order |
| Content edits | `data.ts` (future: CMS) |

## Usage guidance (designers & developers)

**Buttons**

- **Primary:** Main conversion (“Get involved”, submit) — green gradient or `slate-900` solid where specified in modal.
- **Secondary:** Alternate path (View members, Cancel) — neutral border or `slate-700`.

**Cards**

- **Featured:** One per row when highlighting a single event or story (large image, one clear CTA).
- **Default:** Metrics, lists, testimonials — calmer surfaces, `shadow-card`.

**Spacing**

- Use section wrappers first; then consistent `gap-*` within grids (`gap-4`–`gap-6` common).
- Prefer `max-w-site` for alignment across header, body, footer.

**Forms**

- One question per visual row on mobile; labels always visible; selects use native styling via `.field-input` (clean, readable).

**Responsive**

- Shrink type scales with `sm:` / `xl:` breakpoints; preserve reading order over symmetry.

**Motion**

- If it does not aid hierarchy or feedback, remove it. No autoplay beyond existing hero/strip patterns without user value.

---

*See also: `figma-handoff.md`, `architecture.md`, `README.md`.*
