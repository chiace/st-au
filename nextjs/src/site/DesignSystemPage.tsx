"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  LayoutGrid,
  Palette,
  PanelsTopLeft,
  Rows3,
  SwatchBook,
  Type,
} from "lucide-react";
import { designTokens } from "@/design-system/tokens";
import { events, externalLinks, impactMetrics, members, navItems, panelClass } from "./data";
import { AnimatedMetric, MemberCard, SectionEyebrow } from "./site-shell";

const siteLogo = "/logo_sta.png";
const siteMark = "/favicon.png";

/** Swatches mirror `designTokens.colors` + Tailwind `@theme` utilities */
const colorTokens = [
  {
    name: "Ink",
    value: designTokens.colors.ink,
    use: "Primary type, dense dark surfaces, strong anchors",
    swatch: "bg-brand-ink",
  },
  {
    name: "Builder Green",
    value: designTokens.colors.green,
    use: "Primary actions, conversion moments, active signal",
    swatch: "bg-brand-green",
  },
  {
    name: "Builder Green Soft",
    value: designTokens.colors.greenSoft,
    use: "Secondary glow, soft emphasis, layered gradients",
    swatch: "bg-brand-green-soft",
  },
  {
    name: "Horizon Gold",
    value: designTokens.colors.gold,
    use: "Highlights, directional light, premium accents",
    swatch: "bg-brand-gold",
  },
  {
    name: "Horizon Gold Soft",
    value: designTokens.colors.goldSoft,
    use: "Warm transitions, elevated tags, lighter emphasis",
    swatch: "bg-brand-gold-soft",
  },
  {
    name: "Surface light",
    value: designTokens.colors.surfaceLight,
    use: "Light backgrounds, interior form surfaces, transition wash",
    swatch: "bg-surface-light",
  },
  {
    name: "Azure Accent",
    value: designTokens.colors.azure,
    use: "Rare cool contrast for system light and motion punctuation",
    swatch: "bg-brand-azure",
  },
  {
    name: "Violet Accent",
    value: designTokens.colors.violet,
    use: "Sparse atmospheric contrast in gradients and hero noise",
    swatch: "bg-brand-violet",
  },
];

const gradientRecipes = [
  {
    name: "Brand Aurora",
    recipe: "#07101F -> #112216 -> #00833E -> #FECE00",
    use: "Hero frames, premium section shells, closing surfaces",
  },
  {
    name: "Launch Horizon",
    recipe: "#07101F -> #0D2015 -> #00833E -> #FECE00",
    use: "Event moments, directional light, section transitions",
  },
  {
    name: "Signal Wordmark",
    recipe: "#FFF1A8 -> #FECE00 -> #FFE066 -> #7CC95B -> #00833E",
    use: "Single-word emphasis, never long headlines",
  },
];

const typeSamples = [
  {
    label: "Display / Space Grotesk",
    className: "display-copy text-5xl font-bold tracking-[-0.05em] text-white",
    sample: "Built for Australian Solana talent.",
  },
  {
    label: "Headline / Space Grotesk",
    className: "display-copy text-3xl font-semibold tracking-[-0.04em] text-white",
    sample: "Clarity, speed, and brand confidence.",
  },
  {
    label: "Body / Plus Jakarta Sans",
    className: "text-lg leading-8 text-white/75",
    sample:
      "Body copy should read like product writing: precise, calm, useful, and never over-explained.",
  },
  {
    label: "Meta / JetBrains Mono",
    className: "mono-copy text-sm uppercase tracking-[0.24em] text-white/60",
    sample: "token.surface.glass / route.hidden.design-system / motion.entry.soft",
  },
];

const principles = [
  {
    title: "Product clarity",
    copy: "The system should feel closer to infrastructure than campaign design. Hierarchy must always stay obvious.",
  },
  {
    title: "Selective intensity",
    copy: "Use the strongest gradients only on hero, CTA, and high-value brand moments so they keep perceived value.",
  },
  {
    title: "Editorial spacing",
    copy: "Favor fewer sections, broader canvases, and cleaner grouping over grids full of repeated boxes.",
  },
  {
    title: "Australian atmosphere",
    copy: "Bring identity through light, horizon color, and openness rather than novelty symbols or clichés.",
  },
];

const interactionRules = [
  "Hover should feel thin, precise, and quiet.",
  "Buttons need clear hierarchy: one primary, one support, one text action at most.",
  "Cards should move slightly, not jump.",
  "Underlines and subtle borders beat heavy fills for navigation states (use white underline on dark).",
];

const layoutRules = [
  {
    label: "Section frame",
    copy: "Primary pages use one centered container (`max-w-site`, 1320px) with generous vertical rhythm.",
  },
  {
    label: "Density rule",
    copy: "Each section should introduce one main idea and one supporting pattern, not five competing ones.",
  },
  {
    label: "Responsive rule",
    copy: "Desktop can show editorial asymmetry; mobile must collapse back to obvious single-column reading order.",
  },
];

const breakpoints = [
  { label: "Mobile", value: "< 640px", copy: "Single column, simplified hierarchy, tighter type." },
  { label: "Tablet", value: "640-1023px", copy: "Two-column support layouts, preserved reading flow." },
  { label: "Desktop", value: "1024px+", copy: "Editorial splits, large hero gestures, wider rhythm." },
];

const motionNotes = [
  {
    title: "Entry",
    copy: "Use soft upward motion with low distance and clean easing. Components should settle, not bounce.",
  },
  {
    title: "Focus",
    copy: "Motion should clarify what to read next: hover lift, progress bars, counters, and orbit details.",
  },
  {
    title: "Constraint",
    copy: "If an animation cannot justify attention or meaning, remove it. The default state should already feel premium.",
  },
];

const contentRules = [
  "Lead with the outcome before the explanation.",
  "Keep headlines dense and forward-driving.",
  "Use uppercase micro-labels only when they add rhythm.",
  "Write like product, not like hype.",
];

export function DesignSystemPage({
  onGoHome,
  onGoMembers,
  onOpenForm,
}: {
  onGoHome: () => void;
  onGoMembers: () => void;
  onOpenForm: () => void;
}) {
  const featuredMember = members.find((member) => member.featured) ?? members[0];
  const exampleEvent = events.find((event) => event.status === "Upcoming") ?? events[0];

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-site">
        <section className="relative overflow-hidden rounded-[38px] bg-[linear-gradient(135deg,#07101f_0%,#112216_34%,#00833E_78%,#FECE00_140%)] px-6 py-8 text-white shadow-[0_30px_90px_rgba(7,18,45,0.24)] sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(254,206,0,0.12),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Hidden route / internal atlas
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                The complete system behind the Superteam Australia site.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
                This page documents the real DNA of the project: brand principles, tokens,
                patterns, responsive rules, and the live components already powering the site.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={onGoHome}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/12 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/18"
                >
                  Back to home
                </button>
                <button
                  type="button"
                  onClick={onGoMembers}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Open members page
                </button>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/16"
                >
                  Test onboarding
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/12 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-5">
                <img src={siteLogo} alt="Superteam Australia" className="h-10 w-auto sm:h-12" />
                <img
                  src={siteMark}
                  alt="Superteam Australia mark"
                  className="h-14 w-14 rounded-[16px] object-cover shadow-[0_16px_35px_rgba(7,18,45,0.3)]"
                />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Tone", value: "Editorial / sharp / calm" },
                  { label: "Palette", value: "Gold / green / dark ink" },
                  { label: "Primary route set", value: `${navItems.length + 2} core nav items` },
                  { label: "System state", value: "Live with real pages and data" },
                ].map((item) => (
                  <div key={item.label} className="border-t border-white/12 pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/88">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <SectionEyebrow icon={SwatchBook} label="Brand foundation" />
            <h2 className="max-w-xl text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              The system should feel like product infrastructure, not merch.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              Superteam Australia works best when the brand feels useful, premium, and
              legible to builders, founders, creatives, capital, and institutions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {principles.map((item, index) => (
              <article key={item.title} className="border-t border-white/10 pt-5">
                <div className="mono-copy text-[11px] uppercase tracking-[0.24em] text-white/50">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/75">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div>
            <SectionEyebrow icon={Palette} label="Color and surfaces" />
            <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              A tight palette with disciplined emphasis.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              The site feels richer because it repeats fewer colors with more conviction.
              Warm light and green momentum are the core brand signal.
            </p>
            <div className="mt-8 space-y-4">
              {gradientRecipes.map((item) => (
                <div key={item.name} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <div className="mono-copy mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                    {item.recipe}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/75">{item.use}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${panelClass} p-8`}>
            <div className="space-y-5">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className="flex flex-col gap-4 border-b border-white/10 pb-5 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                >
                  <div className="max-w-md">
                    <div className="text-lg font-semibold text-white">{token.name}</div>
                    <div className="mt-2 text-sm leading-7 text-white/75">{token.use}</div>
                  </div>
                  <div className="flex min-w-[220px] items-center gap-4">
                    <div className={`h-3 flex-1 rounded-full border border-white/10 ${token.swatch}`} />
                    <div className="mono-copy text-xs uppercase tracking-[0.2em] text-white/60">
                      {token.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div>
            <SectionEyebrow icon={Type} label="Typography and content" />
            <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              Type does most of the heavy lifting.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              The voice of the product comes from density, rhythm, and useful copy before any decorative flourish.
            </p>
          </div>

          <div className={`${panelClass} p-8`}>
            <div className="space-y-8 border-b border-white/10 pb-8">
              {typeSamples.map((sample) => (
                <div key={sample.label}>
                  <div className="mono-copy text-[11px] uppercase tracking-[0.24em] text-white/50">
                    {sample.label}
                  </div>
                  <div className={`mt-4 ${sample.className}`}>{sample.sample}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {contentRules.map((item, index) => (
                <div key={item}>
                  <div className="mono-copy text-[11px] uppercase tracking-[0.24em] text-white/50">
                    Rule 0{index + 1}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/75">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <SectionEyebrow icon={Rows3} label="Layout and responsive" />
            <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              Editorial rhythm on desktop, obvious clarity on mobile.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              The layout system is not just about widths. It is about deciding what deserves room, asymmetry, and silence.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className={`${panelClass} p-8`}>
              <div className="space-y-5">
                {layoutRules.map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      {item.label}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-white/75">{item.copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${panelClass} p-8`}>
              <div className="grid gap-5 sm:grid-cols-3">
                {breakpoints.map((item) => (
                  <div key={item.label} className="border-t border-white/10 pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                    <div className="mt-3 text-sm leading-7 text-white/75">{item.copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionEyebrow icon={LayoutGrid} label="Navigation and actions" />
          <div className="rounded-[38px] bg-[linear-gradient(135deg,#07101f_0%,#112216_34%,#00833E_78%,#FECE00_140%)] px-6 py-8 text-white shadow-[0_28px_80px_rgba(7,18,45,0.22)] sm:px-8 sm:py-10">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">
                  Primary navigation
                </div>
                <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                  Navigation should feel thin, centered, and quietly premium.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/74">
                  The site relies on a short route set, subtle underline behavior (white on dark), and a single clear primary CTA.
                </p>

                <div className="mt-8 rounded-full border border-white/12 bg-white/8 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <img src={siteLogo} alt="Superteam Australia" className="mr-2 h-5 w-auto" />
                    {navItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white/78"
                      >
                        {item.label}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="rounded-full bg-[#00833E] px-4 py-1.5 text-[12px] font-semibold text-white"
                    >
                      Get Involved
                    </button>
                    <a
                      href={externalLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-semibold text-white"
                    >
                      Follow us on X
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/12 bg-white/8 p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                    Action hierarchy
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-white/18 bg-white/12 px-6 py-3 text-sm font-semibold text-white"
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
                    >
                      Secondary
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white"
                    >
                      Text action
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/12 bg-white/8 p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                    Interaction rules
                  </div>
                  <div className="mt-4 space-y-3">
                    {interactionRules.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionEyebrow icon={PanelsTopLeft} label="Live system previews" />
          <div className="grid gap-6 xl:grid-cols-[0.76fr_1.24fr]">
            <div className={`${panelClass} p-6`}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                Member card / live component
              </div>
              <div className="mt-5">
                <MemberCard member={featuredMember} compact />
              </div>
            </div>

            <div className="grid gap-6">
              <div className={`${panelClass} p-8`}>
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      Form language
                    </div>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
                        The join flow uses minimal fields: no input boxes, only label + underline.
                      </p>
                    <div className="mt-5 grid gap-4">
                        <label className="join-field">
                          <span>Name</span>
                          <input className="join-input" placeholder="Your full name" />
                        </label>
                        <label className="join-field">
                          <span>Role / Area</span>
                          <select className="join-input" defaultValue="Builder">
                            {["Builder", "Designer", "Founder", "Creative", "Operator"].map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <label className="join-field">
                          <span>Skills</span>
                          <textarea
                            className="join-input min-h-[140px]"
                            placeholder="Rust, frontend, motion, design systems, community..."
                          />
                        </label>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      Motion and behavior
                    </div>
                    <div className="mt-5 space-y-5">
                      {motionNotes.map((item) => (
                        <div
                          key={item.title}
                          className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                        >
                          <div className="text-xl font-semibold text-white">{item.title}</div>
                          <div className="mt-3 text-sm leading-7 text-white/75">{item.copy}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${panelClass} p-8`}>
                <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      Event preview
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                      {exampleEvent.title}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      <CalendarDays className="h-4 w-4 text-[#FECE00]" />
                      {exampleEvent.date} / {exampleEvent.city} / {exampleEvent.format}
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                      Cards should preserve one clear event headline, one metadata line, and one short explanation before the action.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    {impactMetrics.slice(0, 3).map((item) => (
                      <div key={item.label} className="border-t border-white/10 pt-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                          {item.label}
                        </div>
                        <div className="mt-3 text-3xl font-bold tracking-[-0.05em] text-white">
                          <AnimatedMetric value={item.value} suffix={item.suffix} />
                        </div>
                        <div className="mt-2 text-sm leading-6 text-white/75">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionEyebrow label="Usage note" />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
                The design system page should feel like a calm internal atlas, not a wall of components.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                That is the rule for this hidden route. It should help review the live product system, make decisions faster, and keep the brand coherent as the site grows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Use it for reviews",
                  copy: "Check whether new sections respect hierarchy, spacing, and token usage before shipping.",
                },
                {
                  title: "Use it for consistency",
                  copy: "Validate CTAs, cards, forms, and navigation against the real interaction language of the site.",
                },
                {
                  title: "Use it for scaling",
                  copy: "Add new CMS-driven blocks or partner modules without breaking the visual tone.",
                },
                {
                  title: "Use it for restraint",
                  copy: "When in doubt, remove a surface before adding a new one. The system gets stronger by subtraction.",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-white/10 pt-5">
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <div className="mt-3 text-sm leading-7 text-white/75">{item.copy}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
