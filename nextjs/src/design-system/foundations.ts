/**
 * Foundations bridge design tokens, CSS variables (`src/styles/theme.css`),
 * and Tailwind `@theme` (`src/styles/tailwind.css`).
 * Use for handoff docs, codegen, or future design tooling — not required at runtime.
 */

import { designTokens } from "./tokens";

/** CSS custom properties in `:root` / `.site-shell` that mirror brand usage */
export const cssVariables = {
  brand: {
    green: "--au-green",
    greenSoft: "--au-green-soft",
    gold: "--au-gold",
    goldSoft: "--au-gold-soft",
    azure: "--au-azure",
    violet: "--au-violet",
  },
  semantic: {
    surfaceLight: "--surface-light",
    surfaceLightWarm: "--surface-light-warm",
    textPrimary: "--text-primary",
    textSecondary: "--text-secondary",
    radiusCard: "--radius-card",
    radiusPanel: "--radius-panel",
    shadowCard: "--shadow-card",
    shadowPanel: "--shadow-panel",
    shadowModal: "--shadow-modal",
  },
  layout: {
    containerMax: "--container-max",
    contentNarrow: "--content-narrow",
    contentSplit: "--content-split",
  },
} as const;

/**
 * Tailwind v4 theme keys from `tailwind.css` → typical utility prefixes.
 * Example: `--color-brand-green` → `text-brand-green`, `bg-brand-green`, `border-brand-green`.
 */
export const tailwindThemeKeys = {
  colors: [
    "brand-ink",
    "brand-green",
    "brand-green-soft",
    "brand-gold",
    "brand-gold-soft",
    "brand-azure",
    "brand-violet",
    "surface-light",
    "surface-warm",
  ],
  radii: ["pill", "card", "panel", "hero"],
  shadows: ["card", "panel", "modal"],
  fonts: ["display", "body", "mono"],
  maxWidth: ["site", "content-narrow", "content-split"],
} as const;

/** Canonical layout widths used in `HomePage`, `MembersPage`, `site-shell` */
export const layoutWidthsPx = {
  container: 1320,
  contentNarrow: 920,
  contentSplit: 980,
  heroVisual: 980,
} as const;

export { designTokens };
