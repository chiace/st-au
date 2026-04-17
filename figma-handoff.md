# Figma ↔ code handoff

Short mapping between **Figma deliverables** and **this codebase** so reviewers can trace design decisions to implementation.

## Typography

| Figma style | Implementation |
|-------------|----------------|
| Display / hero | `Space Grotesk` — hero `text-5xl`–`text-7xl`, `tracking-[-0.06em]` |
| Section title | `Space Grotesk` — `text-4xl`–`text-5xl`, `-0.05em` |
| Body | `Plus Jakarta Sans` — `text-base` / `text-[15px]` with relaxed leading |
| Label / eyebrow | Uppercase, `tracking-[0.2em]`–`0.24em`, small size — `SectionEyebrow`, `.field-card > span` |
| Mono | `JetBrains Mono` — stats, code-like labels |

**Token reference:** `src/design-system/tokens.ts` → `typography`.

## Colours

| Intent | Figma | Code |
|--------|-------|------|
| Deep background | Ink | `--color-brand-ink`, body gradient in `theme.css` |
| Primary action | Green | `--color-brand-green`, `--au-green` |
| Accent | Gold | `--color-brand-gold`, `.gradient-word` |
| Atmosphere | Azure / violet (sparse) | `--au-azure-rgb`, `--au-violet-rgb` in mesh layers |
| Light surfaces (forms) | Off-white | `--surface-light`, `surface-light` in `@theme` |

**Mirror JSON:** `figma-make-mirror/design-tokens.json` + `src/design-system/tokens.json` should stay aligned on colour keys.

## Components

| Figma component | React | File |
|-----------------|-------|------|
| Nav bar | `Header` | `site-shell.tsx` |
| Footer | `Footer` | `site-shell.tsx` |
| Member tile | `MemberCard` | `site-shell.tsx` |
| Event card | Inline in `EventsSection` | `HomePage.tsx` |
| Stat / metric | `StatCard` | `HomePage.tsx` |
| Modal form | `OnboardingModal` | `site-shell.tsx` |
| FAQ | `FAQSection` | `HomePage.tsx` |
| X block | `SimulatedTweetFeed` | `HomePage.tsx` (data: `simulatedTweets`) |

Full list: `component-inventory.md`, `src/design-system/component-map.ts`.

## Layout

| Figma frame | Code |
|-------------|------|
| Desktop max width ~1320 | `max-w-site` (`--width-site` = 82.5rem) |
| Narrow copy column | `max-w-[920px]` hero text |
| Two-column editorial | `max-w-[980px]` grids with `lg:grid-cols-*` |

## Desktop / mobile

- **Desktop:** Asymmetric splits, larger display type, multi-column grids where noted in `HomePage`.
- **Mobile:** Same DOM order as desktop; stacks; no horizontal-only critical paths.

## Interaction

- **Hover:** Subtle lift / border / opacity — no large bounces.
- **Modal:** Focus trap implied by sequential form; Escape closes (`OnboardingModal`).
- **Accordion:** One item expansion pattern in FAQ; keyboard via Radix primitives.
- **Reduced motion:** Global CSS + component-level Motion flags.

## Naming

- **Sections:** Use the same names in Figma pages as in `HomePage` function names or `content-map.json` (`Mission`, `Support`, `Events`, etc.).
- **Featured vs default:** “Featured” = one dominant card with media; “default” = list/dense.

## Companion folder

| File | Role |
|------|------|
| `figma-make-mirror/content-map.json` | IA, titles, CTAs |
| `figma-make-mirror/design-tokens.json` | Snapshot for design tools |
| `figma-make-mirror/section-blueprint.md` | Section-by-section layout notes |
| `figma-make-mirror/README.md` | How to use the mirror |

**Implementation truth:** `src/design-system/tokens.ts` and `src/styles/tailwind.css` supersede mirror JSON if they diverge; update mirror on intentional token changes.
