# Component inventory

Reusable UI for **Superteam Australia** as implemented in this repo. Authoritative structured list: `src/design-system/component-map.ts`.

## App shell

| Component | File | Purpose | Variants / states | Responsive |
|-----------|------|---------|-------------------|------------|
| `App` | `App.tsx` | Hash routing, deep links, modal state | `home` / `members` / `design-system` | — |
| `Header` | `site-shell.tsx` | Nav, scroll compaction, Follow X | default / compact; mobile drawer | Hamburger + stacked links |
| `Footer` | `site-shell.tsx` | Links, channels | link hover | Full width `max-w-site` |
| `OnboardingModal` | `site-shell.tsx` | Get Involved 3-step + confirm | steps, validation, success | Stacked fields |
| `MemberCard` | `site-shell.tsx` | Profile tiles | `card`, `editorial`, `editorial-dark` | Grid → column |
| `AnimatedMetric` | `site-shell.tsx` | Metric emphasis | reduced motion | — |
| `Reveal` | `site-shell.tsx` | Scroll animation wrapper | reduced motion | — |
| `SectionEyebrow` | `site-shell.tsx` | Micro-label | — | — |

## Homepage sections (`HomePage.tsx`)

| Component | Purpose | Notes |
|-----------|---------|--------|
| `SectionFrame` | Vertical spacing + `max-w-site` | Wraps most sections |
| `SectionHeader` | Eyebrow, title, optional actions | Editorial split on large screens |
| `StatCard` | Impact metrics + counter | `id="impact"` block |
| `Hero` + `HeroVisual` | Value prop, CTAs, centerpiece | Cinematic entrance; reduced motion |
| `SignalStrip` | Keyword marquee | `signal-track` animation |
| `MissionSection` | Mission + verticals | Data: `missionTracks` |
| `SupportSection` | “We are here to help” | Gradient panel |
| `EventsSection` | Luma events | Featured + list |
| `MeetupStorySection` | Photo story | `id="story"` |
| `MembersSection` | Featured members | Highlights + CTA to directory |
| `EcosystemSection` | Partners | Logo tiles |
| `XFeedSection` | Community + proof | Inline links, simulated tweets, quote list |
| `SimulatedTweetFeed` | Illustrative X-style posts | From `simulatedTweets` in `data.ts` |
| `FAQSection` | FAQ accordion | `data.faqs` |
| `FinalCtaSection` | Join / channels | `id="join"` |

## Other pages

| Component | File | Purpose |
|-----------|------|---------|
| `MembersPage` | `MembersPage.tsx` | Search, filters, grid of `MemberCard` |
| `DesignSystemPage` | `DesignSystemPage.tsx` | In-app design system atlas |

## Primitives & patterns

| Pattern | Where | Variants / states |
|---------|--------|-------------------|
| **Primary CTA** | Hero, Final CTA, modal | Gradient or solid dark |
| **Secondary CTA** | Hero, sections | Border / neutral |
| **Text link** | Footer, events | Underline on hover |
| **Chips / badges** | Hero pills, story tags | Rounded, subtle border |
| **Event cards** | `EventsSection` | Featured vs compact; hover |
| **Stat cards** | Impact row | Counter animation |
| **Partner tiles** | `EcosystemSection` | Hover lift |
| **Social / utility blocks** | `XFeedSection` | Single tweet stack + border-left quotes |
| **Form fields** | `OnboardingModal` + `theme.css` | `.field-card`, `.field-input`; input, `textarea`, `select` |
| **Step navigation** | `OnboardingModal` | Active / inactive steps |
| **FAQ accordion** | `FAQSection` | Radix accordion patterns |
| **Gradient text** | Header “Follow”, hero | `.gradient-word`, `.prism-word` |

## Utility

| Component | File | Purpose |
|-----------|------|---------|
| `ImageWithFallback` | `components/figma/ImageWithFallback.tsx` | Broken image fallback |

## Out of scope (present but unused by main IA)

`src/app/components/ui/*` — shadcn-style primitives (button, card, dialog, …). The shipped Superteam experience uses Tailwind + custom components above. Safe to keep for future admin or secondary tools.

## Usage quick reference

- **One primary CTA** per logical group when possible.
- **Featured cards** only for a single hero object (event, member spotlight).
- **Default cards** for lists, metrics, and dense reading.
- **Forms:** label → control → error; no reliance on placeholder-only labels.
