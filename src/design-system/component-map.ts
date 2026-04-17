/**
 * Inventory of UI the Superteam Australia app actually ships.
 * `src/app/components/ui/*` is vendored shadcn-style primitives (not imported by Home/Members shell).
 */

export type ComponentMapEntry = {
  name: string;
  file: string;
  purpose: string;
  variants?: string;
  states?: string;
  responsive?: string;
};

export const componentMap: readonly ComponentMapEntry[] = [
  {
    name: "App",
    file: "src/app/App.tsx",
    purpose: "Hash routes, scroll-to-section, global form modal orchestration",
    states: "route: home | members | design-system",
  },
  {
    name: "Header",
    file: "src/app/site-shell.tsx",
    purpose: "Centered nav, compact scroll bar, favicon, Follow on X, mobile sheet",
    variants: "default | compact (scrolled)",
    states: "mobile menu open/closed",
    responsive: "nav collapses to hamburger; CTAs stack",
  },
  {
    name: "Footer",
    file: "src/app/site-shell.tsx",
    purpose: "Site links, channel links, legal/utility row",
    states: "hover on text links",
  },
  {
    name: "OnboardingModal",
    file: "src/app/site-shell.tsx",
    purpose: "Get Involved multi-step form (profile, links, intent)",
    variants: "steps 1–3 + confirmation",
    states: "open, validation, submitting, success",
    responsive: "stacked fields; full-width actions",
  },
  {
    name: "MemberCard",
    file: "src/app/site-shell.tsx",
    purpose: "Member portrait, role, skills, external actions",
    variants: "card | editorial | editorial-dark",
    states: "hover lift, link focus",
    responsive: "editorial grids collapse to single column",
  },
  {
    name: "AnimatedMetric",
    file: "src/app/site-shell.tsx",
    purpose: "Numeric emphasis with optional motion",
    states: "respects reduced motion",
  },
  {
    name: "Reveal",
    file: "src/app/site-shell.tsx",
    purpose: "Scroll-in wrapper for section content",
    states: "reduced-motion instant reveal",
  },
  {
    name: "SectionEyebrow",
    file: "src/app/site-shell.tsx",
    purpose: "Uppercase micro-label above section titles",
  },
  {
    name: "SectionFrame",
    file: "src/app/HomePage.tsx",
    purpose: "Vertical section rhythm + `max-w-site` container",
    responsive: "section padding tightens on small screens",
  },
  {
    name: "SectionHeader",
    file: "src/app/HomePage.tsx",
    purpose: "Eyebrow + title + optional right column for actions",
  },
  {
    name: "StatCard",
    file: "src/app/HomePage.tsx",
    purpose: "Impact metric with animated counter",
    states: "entry animation; reduced motion = static",
  },
  {
    name: "Hero + HeroVisual",
    file: "src/app/HomePage.tsx",
    purpose: "Immersive hero, rotating signal, CTAs, centerpiece visual",
    states: "reduced motion simplifies globe/pills",
  },
  {
    name: "SignalStrip",
    file: "src/app/HomePage.tsx",
    purpose: "Marquee-style ecosystem keywords",
    states: "paused when reduced motion",
  },
  {
    name: "MissionSection",
    file: "src/app/HomePage.tsx",
    purpose: "Mission copy + main verticals from `data.ts`",
  },
  {
    name: "SupportSection",
    file: "src/app/HomePage.tsx",
    purpose: "We are here to help — gradient panel + pillars",
  },
  {
    name: "EventsSection",
    file: "src/app/HomePage.tsx",
    purpose: "Featured + list events, Luma links",
    variants: "featured hero card | compact cards",
    states: "hover lift / image scale",
  },
  {
    name: "MeetupStorySection",
    file: "src/app/HomePage.tsx",
    purpose: "Storytelling photography + tags",
  },
  {
    name: "MembersSection",
    file: "src/app/HomePage.tsx",
    purpose: "Featured members + directory CTA",
  },
  {
    name: "EcosystemSection",
    file: "src/app/HomePage.tsx",
    purpose: "Partner / ecosystem logo tiles",
    states: "hover border + lift",
  },
  {
    name: "XFeedSection",
    file: "src/app/HomePage.tsx",
    purpose: "Public layer: inline links, simulated X thread, testimonial quotes (minimal chrome)",
  },
  {
    name: "SimulatedTweetFeed",
    file: "src/app/HomePage.tsx",
    purpose: "Illustrative tweet stack from `data.simulatedTweets` (not live X API)",
  },
  {
    name: "FAQSection",
    file: "src/app/HomePage.tsx",
    purpose: "Radix-style accordion FAQ from `data.faqs`",
    states: "expand/collapse",
  },
  {
    name: "FinalCtaSection",
    file: "src/app/HomePage.tsx",
    purpose: "Join the network — Telegram, Discord, X channel CTAs",
  },
  {
    name: "HomePage",
    file: "src/app/HomePage.tsx",
    purpose: "Composes all landing sections in order",
  },
  {
    name: "MembersPage",
    file: "src/app/MembersPage.tsx",
    purpose: "Search + skill filters + `MemberCard` grid",
    states: "empty search, filtered",
    responsive: "filters wrap; cards stack",
  },
  {
    name: "DesignSystemPage",
    file: "src/app/DesignSystemPage.tsx",
    purpose: "In-app atlas: tokens, type, buttons, surfaces",
  },
  {
    name: "ImageWithFallback",
    file: "src/app/components/figma/ImageWithFallback.tsx",
    purpose: "Defensive image for Figma-sourced assets",
    states: "error → placeholder",
  },
];

export type ComponentMap = typeof componentMap;
