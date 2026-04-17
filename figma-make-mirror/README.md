# Figma Make Mirror

This folder is a companion package for the live Superteam Australia website.

It does not replace the production code in `src/`. Instead, it mirrors the final live experience in a cleaner, design-translation-friendly format so the site can be reconstructed more easily in Figma Make.

## What it includes

- `content-map.json`: key copy, section order, and CTA structure
- `design-tokens.json`: color, type, spacing, radius, and motion guidance
- `section-blueprint.md`: layout notes for each major section

## How to use it

1. Start with `content-map.json` to understand the information architecture.
2. Use `section-blueprint.md` to map layout, hierarchy, and interaction behavior.
3. Use `design-tokens.json` to recreate the same visual language in Figma Make.

## Mirrors included

- Home hero
- Mission / what Superteam Australia is
- Stats / impact
- Support pillars
- Events
- Members showcase
- Ecosystem / partners
- Community / live X area / testimonials
- FAQ
- Final join CTA
- Footer
- Members page structure
- Get involved form flow

## Source of truth

The coded experience still lives in:

- `src/app/HomePage.tsx`
- `src/app/MembersPage.tsx`
- `src/app/site-shell.tsx`
- `src/app/data.ts`

**Tokens:** Canonical definitions are `src/design-system/tokens.ts` (build) and `src/design-system/tokens.json` (tooling). This folder’s `design-tokens.json` should stay visually aligned with those; if in doubt, prefer the `src/design-system/` files.

Keep this folder aligned with those files if the live site changes again.
