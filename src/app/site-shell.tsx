import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronUp,
  ChevronRight,
  Github,
  MapPinned,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  defaultFormState,
  externalLinks,
  navItems,
  panelClass,
  privacyPolicyHref,
  type FormState,
  type Member,
  type Route,
} from "./data";
import siteMark from "../../favicon.png";
import siteLogo from "../../logo_sta.png";

export function getRouteFromHash(): Route {
  if (typeof window === "undefined") {
    return "home";
  }

  const hash = window.location.hash.toLowerCase();
  if (hash.includes("/design-system")) {
    return "design-system";
  }

  if (hash.includes("/privacy")) {
    return "privacy";
  }

  return hash.includes("/members") || hash === "#members" ? "members" : "home";
}

export function AnimatedMetric({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, value]);

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Reveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function SectionEyebrow({
  icon: Icon,
  label,
}: {
  icon?: LucideIcon;
  label: string;
}) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/78 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md">
      {Icon ? <Icon className="h-3.5 w-3.5 text-[#FECE00]" /> : null}
      {label}
    </div>
  );
}

export function Header({
  route,
  onNavigateHome,
  onNavigateMembers,
  onOpenForm,
}: {
  route: Route;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMembers: () => void;
  onOpenForm: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const compact = scrolled;

  const links =
    route === "home"
      ? [...navItems]
      : route === "design-system" || route === "privacy"
        ? [
            { label: "Home", id: "home" },
            { label: "Members", id: "members-page" },
          ]
        : [{ label: "Home", id: "home" }];

  const handleClick = (id: string) => {
    setMobileOpen(false);

    if (id === "members-page") {
      onNavigateMembers();
      return;
    }

    if (id === "home") {
      onNavigateHome();
      return;
    }

    if (id === "global") {
      window.open(externalLinks.global, "_blank", "noopener,noreferrer");
      return;
    }

    onNavigateHome(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto rounded-full border transition-[background-color,backdrop-filter,border-color,box-shadow,transform,padding,max-width] duration-300 ${
          compact
            ? "max-w-[420px] px-2 py-1"
            : "max-w-[900px] px-2.5 py-1.5 sm:px-3.5"
        } ${
          compact
            ? "border-white/8 bg-[rgba(7,12,20,0.54)] shadow-[0_6px_18px_rgba(2,6,18,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(7,12,20,0.42)]"
            : "border-white/7 bg-[rgba(7,12,20,0.2)] shadow-[0_4px_14px_rgba(2,6,18,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(7,12,20,0.16)]"
        }`}
      >
        {compact ? (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigateHome()}
              className="group flex items-center rounded-full px-1 py-0.5"
              aria-label="Go to homepage"
            >
              <img
                src={siteMark}
                alt="Superteam Australia favicon"
                className="h-5.5 w-5.5 rounded-full"
              />
            </button>

            <a
              href={externalLinks.x}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-1.5 px-1.5 py-0.5 text-[12px] font-semibold text-white transition hover:text-white"
            >
              <span className="relative prism-word">
                Follow us on X
                <span className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-white/90 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#FECE00] transition group-hover:text-[#FFE066]" />
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 lg:grid-cols-[auto_1fr_auto] lg:gap-3">
              <button
                type="button"
                onClick={() => onNavigateHome()}
                className="group flex shrink-0 items-center rounded-full px-1 py-0.5 text-left"
                aria-label="Go to homepage"
              >
                <img src={siteMark} alt="Superteam Australia" className="h-6 w-6 rounded-full" />
              </button>

              <nav className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex">
                {links.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleClick(item.id)}
                    className="group relative whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.01em] text-white/72 transition hover:text-white"
                  >
                    <span>{item.label}</span>
                    <span className="absolute inset-x-2.5 bottom-0.5 h-px origin-center scale-x-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.22)] transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                ))}
              </nav>

              <div className="hidden shrink-0 items-center lg:flex">
                <a
                  href={externalLinks.x}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-2 whitespace-nowrap px-2 py-1 text-[12px] font-semibold text-white transition hover:text-white"
                >
                  <span className="relative prism-word">
                    Follow us on X
                    <span className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.22)] transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#FECE00] transition group-hover:text-[#FFE066]" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 text-white transition hover:border-white/16 hover:bg-white/5 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="mt-2 border-t border-white/8 pt-2.5">
                    <div className="overflow-hidden rounded-[20px] border border-white/7 bg-[rgba(7,12,20,0.72)] p-1.5 shadow-[0_10px_24px_rgba(2,6,18,0.16)] backdrop-blur-lg">
                      <div className="flex flex-col gap-1">
                    {links.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleClick(item.id)}
                        className="group relative overflow-hidden rounded-[16px] border border-transparent px-4 py-2.5 text-left text-sm font-medium text-white/82 transition hover:bg-white/7 hover:text-white"
                      >
                        <span className="absolute inset-y-2 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.9),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
                        {item.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        onOpenForm();
                      }}
                      className="mt-1 rounded-[16px] px-4 py-2.5 text-left text-sm font-semibold text-white/88 transition hover:bg-white/7 hover:text-white"
                    >
                      Get Involved
                    </button>
                    <a
                      href={externalLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-[16px] px-4 py-2.5 text-[15px] font-semibold text-white transition hover:bg-white/7 hover:text-white"
                    >
                      <span className="prism-word">Follow us on X</span>
                      <ArrowUpRight className="h-4.5 w-4.5 text-[#FECE00]" />
                    </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </header>
  );
}

export function Footer({
  onNavigateHome,
  onNavigateMembers,
}: {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMembers: () => void;
}) {
  return (
    <footer className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-site border-t border-white/10 px-0 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr_0.7fr]">
          <div>
            <div className="inline-flex">
              <img
                src={siteLogo}
                alt="Superteam Australia"
                className="h-9 w-auto sm:h-10"
              />
            </div>
            <div className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/55">
              Superteam Australia
            </div>
            <div className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-white">
              Australia’s Solana builder home.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">
              Navigation
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/78">
              <button type="button" onClick={() => onNavigateHome("mission")} className="text-left">
                About
              </button>
              <button type="button" onClick={() => onNavigateHome("services")} className="text-left">
                Support
              </button>
              <button type="button" onClick={() => onNavigateHome("events")} className="text-left">
                Events
              </button>
              <button type="button" onClick={onNavigateMembers} className="text-left">
                Members
              </button>
              <button type="button" onClick={() => onNavigateHome("ecosystem")} className="text-left">
                Ecosystem
              </button>
              <button type="button" onClick={() => onNavigateHome("community")} className="text-left">
                Community
              </button>
              <button type="button" onClick={() => onNavigateHome("faq")} className="text-left">
                FAQ
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">
              Links
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/78">
              <a href={externalLinks.global} target="_blank" rel="noreferrer">
                Global Superteam
              </a>
              <a href={externalLinks.x} target="_blank" rel="noreferrer">
                @SuperteamAU
              </a>
              <a href={externalLinks.lumaHub} target="_blank" rel="noreferrer">
                Luma
              </a>
              <a href={externalLinks.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a href={externalLinks.discord} target="_blank" rel="noreferrer">
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
            <p className="m-0 text-xs leading-relaxed text-white/55 sm:text-sm">
              © 2026 Superteam Australia. All rights reserved.
            </p>
            <a
              href={privacyPolicyHref}
              className="text-sm font-medium text-white/78 underline-offset-[0.22em] transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FECE00]/80"
            >
              Privacy Policy
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/82 transition hover:border-white/22 hover:bg-white/6 hover:text-white sm:self-auto"
          >
            Back to top
            <ChevronUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export function MemberCard({
  member,
  compact = false,
  variant = "card",
}: {
  member: Member;
  compact?: boolean;
  variant?: "card" | "editorial" | "editorial-dark";
}) {
  const badgeStyles =
    member.badge === "Core Team"
      ? "border-[#56b2ff]/30 bg-[#56b2ff]/12 text-[#a8dcff]"
      : member.badge === "Hackathon Winner"
        ? "border-[#ffcf73]/28 bg-[#ffcf73]/10 text-[#ffe7a8]"
        : member.badge === "Capital Connector"
          ? "border-[#a89bff]/28 bg-[#a89bff]/10 text-[#d4ccff]"
          : "border-white/14 bg-white/8 text-white/72";

  if (variant === "editorial-dark") {
    return (
      <article
        className={`group border-b border-white/10 ${compact ? "py-6" : "py-8 sm:py-10"}`}
      >
        <div
          className={`grid min-w-0 gap-6 ${
            compact
              ? "lg:grid-cols-[0.9fr_1.1fr]"
              : "lg:grid-cols-[0.82fr_1.08fr_0.84fr] lg:items-start"
          }`}
        >
          <div className="flex min-w-0 items-start gap-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/8 shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                  {member.initials}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="break-words text-2xl font-semibold tracking-[-0.03em] text-white">
                  {member.name}
                </h3>
                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeStyles}`}
                >
                  {member.badge}
                </div>
              </div>
              <div className="mt-2 text-sm leading-7 text-white/64">
                {member.role} / {member.company}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
                <MapPinned className="h-3.5 w-3.5 text-[#FECE00]" />
                {member.location}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/44">
              Focus
            </div>
            <p className="mt-3 break-words text-base leading-8 text-white/82">{member.highlight}</p>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/44">
              Contribution
            </div>
            <p className="mt-2 break-words text-sm leading-7 text-white/66">{member.contribution}</p>
          </div>

          <div className={`min-w-0 ${compact ? "lg:col-span-2" : ""}`}>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/66"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
              <a
                href={member.xUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${member.name} on X`}
                className="inline-flex items-center gap-2 text-white transition hover:text-[#FECE00]"
              >
                X Profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              {member.githubUrl && (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${member.name} on GitHub`}
                  className="inline-flex items-center gap-2 text-white/46 transition hover:text-white/82"
                >
                  GitHub
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "editorial") {
    return (
      <article
        className={`group border-b border-white/10 ${compact ? "py-6" : "py-8 sm:py-10"}`}
      >
        <div
          className={`grid gap-6 ${
            compact
              ? "lg:grid-cols-[0.9fr_1.1fr]"
              : "lg:grid-cols-[0.85fr_1.05fr_0.85fr] lg:items-start"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-950 shadow-[0_12px_24px_rgba(7,18,45,0.12)]">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                  {member.initials}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  {member.name}
                </h3>
                <div
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeStyles}`}
                >
                  {member.badge}
                </div>
              </div>
              <div className="mt-2 text-sm leading-7 text-white/65">
                {member.role} / {member.company}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                <MapPinned className="h-3.5 w-3.5 text-[#FECE00]" />
                {member.location}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
              Focus
            </div>
            <p className="mt-3 text-base leading-8 text-white/82">{member.highlight}</p>
            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
              Contribution
            </div>
            <p className="mt-2 text-sm leading-7 text-white/70">{member.contribution}</p>
          </div>

          <div className={`${compact ? "lg:col-span-2" : ""}`}>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/72"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
              <a
                href={member.xUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white transition hover:text-[#FECE00]"
              >
                X Profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              {member.githubUrl && (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/55 transition hover:text-white/88"
                >
                  GitHub
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      className={`${panelClass} relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(7,18,45,0.08)]`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(254,206,0,0.18),transparent_70%)] blur-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-950 shadow-[0_12px_24px_rgba(7,18,45,0.14)]">
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                {member.initials}
              </div>
            )}
          </div>
          <div>
            <div className="text-lg font-semibold text-white">{member.name}</div>
            <div className="text-sm text-white/65">
              {member.role} - {member.company}
            </div>
          </div>
        </div>
        <div
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${badgeStyles}`}
        >
          {member.badge}
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/52">
        <MapPinned className="h-3.5 w-3.5" />
        {member.location}
      </div>

      <p className={`mt-4 text-sm leading-7 text-white/75 ${compact ? "min-h-[84px]" : ""}`}>
        {member.highlight}
      </p>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
          Ecosystem contribution
        </div>
        <div className="mt-2 text-sm leading-7 text-white/78">{member.contribution}</div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/72"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <a
          href={member.xUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-[#FECE00]"
        >
          X Profile
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition hover:text-white/88"
          >
            GitHub
            <Github className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function OnboardingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [stepError, setStepError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setSubmitted(false);
      setForm(defaultFormState);
      setStepError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const updateField = (key: keyof FormState, value: string) => {
    setStepError(null);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const stepTitles = ["Profile", "Links", "Intent"];
  const stepMeta = [
    {
      eyebrow: "Step 1",
      title: "Tell us who you are.",
      copy: "Location and how you want to contribute.",
    },
    {
      eyebrow: "Step 2",
      title: "Share your links.",
      copy: "Skills and links that show your work.",
    },
    {
      eyebrow: "Step 3",
      title: "Tell us what you need.",
      copy: "Opportunities, collaborators, or intros.",
    },
  ] as const;

  const isStepValid = () => {
    if (step === 0) {
      return Boolean(
        form.name.trim() &&
          form.location.trim() &&
          form.role.trim() &&
          form.experience.trim(),
      );
    }

    if (step === 1) {
      return Boolean(
        form.skills.trim() &&
          (form.xLink.trim() || form.github.trim() || form.portfolio.trim()),
      );
    }

    return form.lookingFor.trim().length >= 12;
  };

  const handleAdvance = () => {
    if (!isStepValid()) {
      setStepError(
        step === 0
          ? "Add your basic details before continuing."
          : step === 1
            ? "Add your skills and at least one link before continuing."
            : "Tell us what you are looking for so we can route you well.",
      );
      return;
    }

    setStepError(null);

    if (step === stepTitles.length - 1) {
      setSubmitted(true);
      return;
    }

    setStep((current) => current + 1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(15,23,42,0.42)] p-4"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(10,16,30,0.97),rgba(6,10,20,0.96))] shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-involved-title"
          >
            <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-5 sm:px-7 sm:pt-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Get involved
                </div>
                <div
                  id="get-involved-title"
                  className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white"
                >
                  Join Superteam Australia
                </div>
                <div className="mt-2 max-w-lg text-sm leading-6 text-white/72">
                  Short intake for builders, founders, and operators.
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-white/55 transition hover:text-white"
                aria-label="Close onboarding modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="px-5 pb-6 pt-2 sm:px-7 sm:pb-8">
              {!submitted ? (
                <div className="mb-6 flex flex-wrap items-baseline gap-x-1 gap-y-1 text-[13px] font-semibold">
                  {stepTitles.map((item, index) => {
                    const active = index === step;
                    const complete = index < step;

                    return (
                      <span key={item} className="inline-flex items-center">
                        {index > 0 ? <span className="px-2 text-white/22">·</span> : null}
                        <span
                          className={
                            complete
                              ? "text-emerald-300/90"
                              : active
                                ? "text-white"
                                : "text-white/32"
                          }
                        >
                          <span className="tabular-nums font-medium text-white/40">{index + 1}</span>{" "}
                          {item}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ) : null}

              {submitted ? (
                <div className="text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Confirmation
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Thanks, you're in.
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
                    We will use these details to route the best next step.
                  </p>
                  <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-6 text-sm">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Name</div>
                      <div className="mt-1 text-base font-semibold text-white">{form.name || "New member"}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Role</div>
                      <div className="mt-1 text-base font-semibold text-white">{form.role}</div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={externalLinks.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-emerald-300/95 underline decoration-white/15 underline-offset-4 transition hover:text-emerald-200"
                    >
                      Join Telegram
                    </a>
                    <span className="text-white/25">·</span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm font-semibold text-white/88 underline decoration-white/15 underline-offset-4 transition hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                          {stepMeta[step].eyebrow}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white sm:text-[1.65rem]">
                          {stepMeta[step].title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/72">
                          {stepMeta[step].copy}
                        </p>
                      </div>
                      <span className="text-[12px] font-medium tabular-nums text-white/40">
                        {step + 1}/{stepTitles.length}
                      </span>
                    </div>
                  </div>

                  <div>
                    {step === 0 && (
                      <div className="grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                        <label className="join-field">
                          <span>Name</span>
                          <input
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            placeholder="Your full name"
                            className="join-input"
                          />
                        </label>
                        <label className="join-field">
                          <span>Location</span>
                          <input
                            value={form.location}
                            onChange={(event) => updateField("location", event.target.value)}
                            placeholder="Sydney, Melbourne, Perth..."
                            className="join-input"
                          />
                        </label>
                        <label className="join-field">
                          <span>Role / Area</span>
                          <select
                            value={form.role}
                            onChange={(event) => updateField("role", event.target.value)}
                            className="join-input"
                          >
                            {[
                              "Builder",
                              "Designer",
                              "Founder",
                              "Creative",
                              "Operator",
                              "Institution",
                            ].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="join-field">
                          <span>Experience level</span>
                          <select
                            value={form.experience}
                            onChange={(event) => updateField("experience", event.target.value)}
                            className="join-input"
                          >
                            {["Early", "Mid", "Advanced", "Institutional exploration"].map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="grid gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                        <label className="join-field md:col-span-2">
                          <span>Skills</span>
                          <textarea
                            value={form.skills}
                            onChange={(event) => updateField("skills", event.target.value)}
                            placeholder="Rust, frontend, product, content, community..."
                            rows={4}
                            className="join-input min-h-[120px] resize-y"
                          />
                        </label>
                        <label className="join-field">
                          <span>Twitter / X</span>
                          <input
                            value={form.xLink}
                            onChange={(event) => updateField("xLink", event.target.value)}
                            placeholder="https://x.com/..."
                            className="join-input"
                          />
                        </label>
                        <label className="join-field">
                          <span>GitHub</span>
                          <input
                            value={form.github}
                            onChange={(event) => updateField("github", event.target.value)}
                            placeholder="https://github.com/..."
                            className="join-input"
                          />
                        </label>
                        <label className="join-field md:col-span-2">
                          <span>Portfolio or project link</span>
                          <input
                            value={form.portfolio}
                            onChange={(event) => updateField("portfolio", event.target.value)}
                            placeholder="Project, deck, Notion, Dribbble, or website"
                            className="join-input"
                          />
                        </label>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid gap-3">
                        <label className="join-field">
                          <span>What are you looking for?</span>
                          <textarea
                            value={form.lookingFor}
                            onChange={(event) => updateField("lookingFor", event.target.value)}
                            placeholder="Co-founders, collaborators, bounties, distribution, institutional intros..."
                            rows={6}
                            className="join-input min-h-[180px] resize-y"
                          />
                        </label>
                        <p className="text-sm leading-6 text-white/52">
                          Be specific — it helps us route you faster.
                        </p>
                      </div>
                    )}

                    {stepError ? (
                      <p className="mt-4 border-l-2 border-amber-400/80 pl-3 text-sm text-amber-100/95">
                        {stepError}
                      </p>
                    ) : null}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          step === 0 ? onClose() : setStep((current) => current - 1)
                        }
                        className="text-left text-sm font-semibold text-white/72 underline decoration-white/12 underline-offset-4 transition hover:text-white"
                      >
                        {step === 0 ? "Cancel" : "Back"}
                      </button>
                      <button
                        type="button"
                        onClick={handleAdvance}
                        className="rounded-full bg-[linear-gradient(135deg,#0f7d43_0%,#00833E_44%,#22a35a_72%,#FECE00_100%)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                      >
                        {step === stepTitles.length - 1 ? "Submit details" : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
