import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Compass,
  Minus,
  Plus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import meetupAudience from "../assets/meetups/meetup-audience.jpg";
import meetupGroup from "../assets/meetups/meetup-group.jpg";
import meetupNetworking from "../assets/meetups/meetup-networking.jpg";
import meetupRoom from "../assets/meetups/meetup-room.jpg";
import meetupStage from "../assets/meetups/meetup-stage.jpg";
import auFlag from "../assets/au-flag.svg";
import {
  ecosystemPartners,
  events,
  externalLinks,
  faqs,
  impactMetrics,
  members,
  missionTracks,
  simulatedTweets,
  signalLoop,
  testimonials,
} from "./data";
import { AnimatedMetric, Reveal, SectionEyebrow } from "./site-shell";

const primaryButtonClass =
  "wow-primary inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f7d43_0%,#00833E_44%,#22a35a_72%,#FECE00_100%)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,131,62,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_72px_rgba(254,206,0,0.16)]";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5";
const textLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-white/74 transition hover:text-white";

const conciseAudience = [
  {
    title: "Builders",
    copy: "Ship faster with the right people beside you.",
    icon: Users,
  },
  {
    title: "Founders",
    copy: "Product, hiring, and reach — in one loop.",
    icon: Compass,
  },
  {
    title: "Capital",
    copy: "Spot credible teams early.",
    icon: Wallet,
  },
];

function SectionFrame({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Reveal id={id} className={`px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-site">{children}</div>
    </Reveal>
  );
}

function SectionHeader({
  icon: Icon,
  label,
  title,
  copy,
}: {
  icon?: LucideIcon;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow icon={Icon} label={label} />
      <h2 className="max-w-[16ch] text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{copy}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  description,
}: {
  label: string;
  value: number;
  suffix: string;
  description: string;
}) {
  return (
    <article className="border-t border-white/10 py-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
        {label}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-[-0.05em] text-white">
        <AnimatedMetric value={value} suffix={suffix} />
      </div>
      <p className="mt-3 text-sm leading-6 text-white/75">{description}</p>
    </article>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const featuredPeople = members.filter((member) => member.featured).slice(0, 3);
  const heroStats = impactMetrics.slice(0, 3);
  const nextEvent = events.find((event) => event.status === "Upcoming") ?? events[0];
  const rhythmDetails = [
    {
      id: "office-hours",
      label: "Office hours",
      copy: "Weekly feedback on product, eng, and founder questions.",
      position: "left-[-0.5rem] top-[22%] sm:left-[-2.5rem]",
      accent: "bg-[#FECE00]",
    },
    {
      id: "launches",
      label: "Launches",
      copy: `Next up: ${nextEvent.title} / ${nextEvent.date} / ${nextEvent.city}.`,
      position: "right-[-0.5rem] top-[22%] sm:right-[-2.5rem]",
      accent: "bg-[#22a35a]",
    },
    {
      id: "build-sessions",
      label: "Build sessions",
      copy: "Recurring rooms to ship and stay accountable.",
      position: "bottom-[-0.25rem] left-1/2 -translate-x-1/2 sm:bottom-[-1.25rem]",
      accent: "bg-[#00833E]",
    },
  ] as const;
  const [activeRhythm, setActiveRhythm] = useState<(typeof rhythmDetails)[number]["id"]>("launches");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const activeRhythmItem =
    rhythmDetails.find((item) => item.id === activeRhythm) ?? rhythmDetails[1];

  const handleCycleRhythm = () => {
    const currentIndex = rhythmDetails.findIndex((item) => item.id === activeRhythm);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % rhythmDetails.length : 0;
    setActiveRhythm(rhythmDetails[nextIndex].id);
  };

  const handleKeyControl = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      handleCycleRhythm();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const currentIndex = rhythmDetails.findIndex((item) => item.id === activeRhythm);
      const nextIndex =
        currentIndex >= 0 ? (currentIndex - 1 + rhythmDetails.length) % rhythmDetails.length : 0;
      setActiveRhythm(rhythmDetails[nextIndex].id);
    }
  };

  const handleSphereMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setTilt({
      rotateX: offsetY * -10,
      rotateY: offsetX * 12,
    });
  };

  const handleSphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) {
      return;
    }
    setIsDragging(true);
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({
      rotateX: offsetY * -14,
      rotateY: offsetX * 18,
    });
  };

  return (
    <div className="relative overflow-hidden px-2 pb-6 pt-6 sm:px-6 sm:pb-10">
      <div className="hero-grid absolute inset-x-[8%] top-0 h-[68%] opacity-24" />
      <div className="hero-noise absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_18%_26%,rgba(254,206,0,0.14),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(34,163,90,0.12),transparent_22%),radial-gradient(circle_at_50%_64%,rgba(254,206,0,0.1),transparent_26%),radial-gradient(circle_at_50%_82%,rgba(0,131,62,0.14),transparent_30%)]" />
      <div className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]" />
      <motion.div className="pulse-aura absolute left-1/2 top-[58%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(254,206,0,0.18),rgba(34,163,90,0.14)_42%,rgba(255,255,255,0.04)_64%,transparent_76%)] blur-3xl sm:h-[24rem] sm:w-[24rem]" />
      <motion.div
        animate={reduceMotion ? { opacity: 0.12, scale: 1 } : { opacity: [0.15, 0.38, 0.15], scale: [0.96, 1.02, 0.96] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[59%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FECE00]/6 sm:h-[26rem] sm:w-[26rem]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full max-w-[920px] text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60 backdrop-blur-md shadow-[0_10px_30px_rgba(2,6,18,0.14)]">
            <span className="text-white/42">Next room</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
            <span className="text-white">{nextEvent.title}</span>
            <span className="text-white/48">{nextEvent.date}</span>
            <CalendarDays className="h-3.5 w-3.5 text-[#FECE00]" />
          </div>
        </div>

        <div className="relative mt-8 flex min-h-[320px] w-full items-center justify-center sm:min-h-[500px]">
          <div className="absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0),rgba(255,255,255,0.08))]" />

          <motion.div
            animate={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              scale: activeRhythm === "launches" ? 1.015 : 1,
              y: reduceMotion ? 0 : [0, -5, 0],
            }}
            transition={{
              rotateX: { type: "spring", stiffness: 120, damping: 18 },
              rotateY: { type: "spring", stiffness: 120, damping: 18 },
              scale: { type: "spring", stiffness: 120, damping: 18 },
              y: reduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            onMouseMove={handleSphereMove}
            onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              handleSphereDrag(event);
            }}
            onPointerMove={(event) => {
              if (!isDragging) {
                return;
              }
              handleSphereDrag(event);
            }}
            onPointerUp={() => {
              setIsDragging(false);
              setTilt({ rotateX: 0, rotateY: 0 });
            }}
            onPointerCancel={() => {
              setIsDragging(false);
              setTilt({ rotateX: 0, rotateY: 0 });
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative flex h-[17rem] w-[17rem] touch-none items-center justify-center [perspective:1200px] sm:h-[21rem] sm:w-[21rem] lg:h-[25rem] lg:w-[25rem]"
          >
            <div className="absolute inset-[-2.2rem] rounded-full border border-white/6" />
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),rgba(21,30,20,0.7)_38%,rgba(4,7,15,0.98)_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_140px_rgba(254,206,0,0.12)]" />
            <div className="absolute inset-4 rounded-full border border-white/8" />
            <div className="absolute inset-9 rounded-full border border-[#22a35a]/22" />
            <div className="absolute inset-[4.7rem] rounded-full border border-[#FECE00]/16" />
            <div className="absolute inset-[7rem] rounded-full border border-[#FECE00]/10" />
            <motion.div
              aria-hidden
              animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-2rem] rounded-full"
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-[2px] bg-white/80 shadow-[0_0_22px_rgba(254,206,0,0.35)]" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? { opacity: 0.18 } : { opacity: [0.18, 0.34, 0.18] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[5.4rem] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.13),rgba(255,255,255,0.02)_48%,transparent_74%)]"
            />

            <motion.div
              animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-1.35rem] rounded-full border border-white/8"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#FECE00] shadow-[0_0_26px_rgba(254,206,0,0.9)]" />
              <span className="absolute bottom-10 left-8 h-2.5 w-2.5 rounded-full bg-[#22a35a] shadow-[0_0_24px_rgba(34,163,90,0.85)]" />
              <span className="absolute bottom-12 right-8 h-2.5 w-2.5 rounded-full bg-[#a3d56c] shadow-[0_0_24px_rgba(163,213,108,0.85)]" />
            </motion.div>

            <motion.div
              animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[1.6rem] rounded-full"
            >
              <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
              <span className="absolute left-[12%] top-[20%] h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.35)]" />
            </motion.div>

            {rhythmDetails.map((item) => {
              const active = item.id === activeRhythm;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveRhythm(item.id)}
                  onFocus={() => setActiveRhythm(item.id)}
                  onClick={() => setActiveRhythm(item.id)}
                  className={`absolute ${item.position} z-20 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition duration-300 ${
                    active
                      ? "border-white/20 bg-white/12 text-white shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
                      : "border-white/10 bg-white/[0.04] text-white/62 hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${item.accent}`} />
                    {item.label}
                  </span>
                </button>
              );
            })}

            <div className="absolute inset-x-12 top-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />
            <motion.div
              className="relative z-10 text-center"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: -tilt.rotateX, rotateY: -tilt.rotateY }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/44 sm:text-[11px]">
                Australia / Solana
              </div>
              <button
                type="button"
                onClick={handleCycleRhythm}
                onKeyDown={handleKeyControl}
                className="group mx-auto mt-5 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-white/14 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:border-white/24 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FECE00]/80 sm:h-24 sm:w-24"
                aria-label="Cycle the weekly rhythm highlight"
              >
                <span className="relative flex h-[3.6rem] w-[3.6rem] items-center justify-center overflow-hidden rounded-full ring-1 ring-white/20 sm:h-[84px] sm:w-[84px]">
                  <img
                    src={auFlag}
                    alt="Australia"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_52%)] opacity-70" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {!isDragging ? (
                  <motion.div
                    key={activeRhythm}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${activeRhythmItem.accent}`} />
                    {activeRhythmItem.label}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid w-full max-w-[980px] gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5 text-left backdrop-blur-md shadow-[0_16px_40px_rgba(2,6,18,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
                Weekly rhythm
              </div>
              <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34 sm:inline-flex">
                Current focus
                <span className={`h-1.5 w-1.5 rounded-full ${activeRhythmItem.accent}`} />
              </div>
            </div>
            <div className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
              {activeRhythmItem.label}
            </div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/66">{activeRhythmItem.copy}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {featuredPeople.slice(0, 2).map((person) => (
                <div
                  key={person.name}
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-[11px] font-bold text-white">
                    {person.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{person.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      {person.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {heroStats.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-center backdrop-blur-md shadow-[0_12px_30px_rgba(2,6,18,0.12)]"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/44">
                  {metric.label}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                  <AnimatedMetric value={metric.value} suffix={metric.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({
  onOpenForm,
  onViewMembers,
}: {
  onOpenForm: () => void;
  onViewMembers: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const topSignals = [
    events.find((event) => event.title === "Sydney Launch Night"),
    events.find((event) => event.title === "Melbourne Launch Night"),
    events.find((event) => event.title === "Outback Frontier Builder Office Hours"),
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(254,206,0,0.12),transparent_24%),radial-gradient(circle_at_80%_14%,rgba(34,163,90,0.12),transparent_22%),radial-gradient(circle_at_50%_56%,rgba(254,206,0,0.08),transparent_26%),linear-gradient(180deg,rgba(6,10,20,0),rgba(6,10,20,0.18)_42%,rgba(6,10,20,0))]" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />
      <motion.div
        initial={reduceMotion ? false : { scaleY: 1, opacity: 1 }}
        animate={reduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="pointer-events-none absolute inset-0 origin-top bg-[linear-gradient(180deg,rgba(7,12,20,0.96),rgba(7,12,20,0.78)_40%,rgba(7,12,20,0))]"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: "-20%" }}
        animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 0.38, 0], x: "120%" }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="pointer-events-none absolute top-[8%] h-[46%] w-[36%] skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-site">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <SectionEyebrow label="Australia on Solana" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[12ch] text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl xl:text-7xl"
          >
            The digital home for Superteam Australia.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl"
          >
            Events, earn, members, and support for anyone building on Solana in Australia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
          >
            <button type="button" onClick={onOpenForm} className={primaryButtonClass}>
              Get involved
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={externalLinks.opportunities}
              target="_blank"
              rel="noreferrer"
              className={secondaryButtonClass}
            >
              Explore opportunities
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onViewMembers}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/88 transition hover:text-emerald-300"
            >
              View members
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 grid max-w-[980px] gap-4 border-t border-white/10 pt-5 sm:grid-cols-3"
          >
            {[
              { label: "What it is", value: "Events, directory, and earn in one place" },
              { label: "Who it serves", value: "Builders, founders, creatives, operators, institutions" },
              { label: "Why it matters", value: "Local talent is easier to find and plug in" },
            ].map((item) => (
              <div key={item.label} className="py-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  {item.label}
                </div>
                <div className="mt-2 text-sm font-semibold leading-6 text-white">{item.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 grid max-w-[980px] gap-3 border-t border-white/10 pt-5 sm:grid-cols-3"
          >
            {topSignals.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4 text-left text-sm font-semibold !text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:!text-white"
              >
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] !text-white">
                    Event
                  </div>
                  <div className="mt-2 leading-6 !text-white">{item.title}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 !text-white transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.975, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function SignalStrip() {
  const signals = [...signalLoop, ...signalLoop];

  return (
    <div className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-site overflow-hidden border-y border-white/10">
        <div className="signal-track flex min-w-max items-center gap-4 px-0 py-3">
          {signals.map((item, index) => (
            <div key={`${item}-${index}`} className="inline-flex items-center gap-3 px-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/58">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionSection() {
  return (
    <SectionFrame id="mission">
      <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <SectionHeader
          icon={Compass}
          label="What Superteam Australia Is"
          title="A practical home for Australian builders on Solana."
          copy="Brings opportunities, collaborators, and ecosystem support into one surface."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {conciseAudience.map((item) => (
            <div key={item.title} className="border-t border-white/10 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/18 text-white">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                {item.title}
              </div>
              <p className="mt-3 text-base leading-7 text-white/86">{item.copy}</p>
            </div>
          ))}
          <div className="md:col-span-3 pt-2">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-white/60">
              Why it exists
            </div>
            <p className="mt-3 max-w-3xl text-xl leading-8 text-white/86 sm:text-2xl">
              To speed up Australian teams — and Australians building globally — on Solana and internet capital markets.
            </p>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function SupportSection() {
  return (
    <SectionFrame id="services">
      <div className="grid gap-8">
        <div className="grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            label="Support"
            title="How Superteam Australia helps."
            copy="From first touch to shipping — local traction with global reach."
          />

          <div className="max-w-3xl lg:justify-self-end">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Support areas
            </div>
            <p className="mt-3 text-base leading-8 text-white/75 sm:text-lg">
              Founder support, capital, hiring, distribution, community, and institutions — one system.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.66fr_1.34fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[linear-gradient(125deg,rgba(18,42,28,0.94)_0%,rgba(12,36,28,0.92)_32%,rgba(28,52,36,0.88)_64%,rgba(42,48,28,0.9)_100%)] p-7 text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_24%),radial-gradient(circle_at_left_center,rgba(0,131,62,0.18),transparent_32%),radial-gradient(circle_at_88%_82%,rgba(254,206,0,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_32%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)]" />

            <div className="relative z-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Superteam Australia
              </div>

              <div className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.35rem]">
                We are here to help people build, ship, and get seen.
              </div>

              <div className="mt-6 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">
                What that means
              </div>
              <p className="mt-4 max-w-[34ch] text-[15px] leading-7 text-white/90 sm:text-base sm:leading-8">
                Jobs, grants, product feedback, intros, and institutional conversations — so Australian talent can plug into Solana with confidence.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5 border-t border-white/15 pt-5">
                {[
                  "Talent and hiring",
                  "Founder support & Instagrants",
                  "Hackathons & Colosseum",
                  "Institutions & industry",
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/18 bg-white/8 px-3.5 py-2 text-[12px] font-semibold leading-5 text-white/92 backdrop-blur-sm sm:text-[13px]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {missionTracks.map((item, index) => (
              <article key={item.title} className="border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(254,206,0,0.32),transparent)]" />
                </div>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(254,206,0,0.16),rgba(0,131,62,0.12))] text-white">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-7 text-white/75">{item.summary}</p>
                <div className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <div key={point} className="flex gap-3 text-sm leading-6 text-white/86">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00833E]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function EventsSection() {
  const featuredEvent = useMemo(
    () => events.find((event) => event.title === "Melbourne Launch Night") ?? events[0],
    [],
  );
  const secondaryEvents = useMemo(
    () =>
      [
        "Outback Frontier Builder Office Hours",
        "Saturday Build Sessions - National",
        "Brisbane Developer Meetup",
      ]
        .map((title) => events.find((event) => event.title === title))
        .filter((event): event is (typeof events)[number] => Boolean(event)),
    [],
  );
  const compactEventCopy: Record<string, string> = {
    "Outback Frontier Builder Office Hours": "Weekly builder support.",
    "Saturday Build Sessions - National": "National shipping session.",
    "Brisbane Developer Meetup": "Local builder night.",
  };

  return (
    <SectionFrame id="events">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionHeader
          icon={CalendarDays}
          label="Events"
          title="What is happening now."
          copy="Luma hosts launches, office hours, demos, and build sessions nationwide."
        />

        <div className="grid gap-4">
          <a
            href={featuredEvent.link}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-[34px]"
          >
            {featuredEvent.imageUrl && (
              <img
                src={featuredEvent.imageUrl}
                alt={featuredEvent.title}
                className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[380px]"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,15,0.16),rgba(4,7,15,0.88)),radial-gradient(circle_at_top_right,rgba(123,109,255,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(254,206,0,0.16),transparent_28%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="inline-flex px-0 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">
                Featured event
              </div>
              <h3 className="mt-4 max-w-[12ch] text-4xl font-semibold tracking-[-0.05em] text-white">
                {featuredEvent.title}
              </h3>
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-white/56">
                {featuredEvent.date} / {featuredEvent.city} / {featuredEvent.format}
              </div>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/72">{featuredEvent.summary}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Open on Luma
                <ArrowUpRight className="h-4 w-4 text-[#FECE00]" />
              </div>
            </div>
          </a>

          <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-3">
            {secondaryEvents.map((event) => (
              <a
                key={event.title}
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden py-2 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex px-0 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {event.tag}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6fd3ff] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
                  {event.title}
                </div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                  {event.date} / {event.city}
                </div>
                <p className="mt-3 text-sm leading-5 text-white/75">
                  {compactEventCopy[event.title] ?? event.summary}
                </p>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  {event.format}
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-start border-t border-white/10 pt-5">
            <a
              href={externalLinks.lumaHub}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/88 transition hover:text-emerald-300"
            >
              View all events on Luma
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function MeetupStorySection() {
  const storyMoments = [
    {
      step: "01",
      label: "The room fills",
      title: "It starts with builders showing up.",
      copy: "Small room, full attention.",
      image: meetupRoom,
      imageAlt: "Superteam Australia meetup with builders seated during a presentation.",
      sideImage: meetupAudience,
      sideAlt: "Audience watching a Superteam Australia meetup talk.",
    },
    {
      step: "02",
      label: "The signal lands",
      title: "Then the ideas get sharper.",
      copy: "Founders and builders share what ships next.",
      image: meetupStage,
      imageAlt: "Speaker presenting at a Superteam Australia meetup event.",
      sideImage: meetupGroup,
      sideAlt: "Group photo from a Superteam Australia meetup under a Solana sign.",
    },
    {
      step: "03",
      label: "The network forms",
      title: "After the talk, the real momentum begins.",
      copy: "Intros become collaboration.",
      image: meetupNetworking,
      imageAlt: "Builders networking at a Superteam Australia meetup.",
      sideImage: meetupGroup,
      sideAlt: "Superteam Australia meetup community group photo.",
    },
  ];

  return (
    <SectionFrame id="story">
      <div className="grid gap-8">
        <SectionHeader
          label="Meetup Story"
          title="What local momentum feels like."
          copy="Real rooms, real people — not a photo wall."
        />

        <div className="grid gap-10">
          {storyMoments.map((moment, index) => (
            <article key={moment.step} className="border-t border-white/10 pt-8">
              <div
                className={`relative grid gap-5 lg:items-center ${
                  index % 2 === 0 ? "lg:grid-cols-[0.78fr_1.22fr]" : "lg:grid-cols-[1.22fr_0.78fr]"
                }`}
              >
                <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                  <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    <span className="text-[#FECE00]">{moment.step}</span>
                    {moment.label}
                  </div>
                  <h3 className="mt-5 max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                    {moment.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                    {moment.copy}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {index === 0
                      ? ["Builders", "Attention", "Signal"]
                      : index === 1
                        ? ["Talks", "Launches", "Momentum"]
                        : ["Intros", "Collaboration", "Community"]
                    .map((item) => (
                      <span
                        key={item}
                        className="px-0 py-1.5 text-xs font-semibold text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 0 ? "" : "lg:order-1"}>
                  <div className="grid gap-4 md:grid-cols-[1.18fr_0.82fr]">
                    <div className="overflow-hidden rounded-[26px]">
                      <img
                        src={moment.image}
                        alt={moment.imageAlt}
                        className="h-full min-h-[240px] w-full object-cover transition duration-700 hover:scale-[1.02] sm:min-h-[320px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="overflow-hidden rounded-[24px]">
                        <img
                          src={moment.sideImage}
                          alt={moment.sideAlt}
                          className="h-[150px] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[188px]"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-1">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                          Why it matters
                        </div>
                        <div className="mt-3 text-sm leading-6 text-white/75">
                          {index === 0
                            ? "Momentum starts when builders actually show up."
                            : index === 1
                              ? "Good meetups add clarity, not noise."
                              : "The best chats often start after the talk."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function MembersSection({ onViewMembers }: { onViewMembers: () => void }) {
  const featured = useMemo(() => members.filter((member) => member.featured).slice(0, 3), []);

  if (!featured.length) {
    return null;
  }

  return (
    <SectionFrame id="members-preview">
      <div className="grid gap-8">
        <SectionHeader
          icon={Users}
          label="Members"
          title="People you can actually build with."
          copy="Featured leads who make the ecosystem easier to navigate."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((member, index) => (
            <motion.a
              key={member.name}
              href={member.xUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,28,0.96),rgba(7,11,20,0.94))] p-6 shadow-[0_24px_70px_rgba(3,8,18,0.24)]"
            >
              <div
                className={`absolute inset-0 ${
                  index === 0
                    ? "bg-[radial-gradient(circle_at_top_left,rgba(254,206,0,0.16),transparent_28%)]"
                    : index === 1
                      ? "bg-[radial-gradient(circle_at_top_right,rgba(34,163,90,0.16),transparent_28%)]"
                      : "bg-[radial-gradient(circle_at_bottom_right,rgba(254,206,0,0.14),transparent_24%),radial-gradient(circle_at_top_left,rgba(34,163,90,0.12),transparent_24%)]"
                }`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/6 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
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
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/46">
                        {member.badge}
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                        {member.name}
                      </div>
                      <div className="mt-2 text-sm text-white/62">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
                    {member.location}
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-white/68">{member.highlight}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {member.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/66"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    Contribution
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/62">{member.contribution}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 text-sm font-semibold text-white/82">
                  <span>Open profile</span>
                  <ArrowRight className="h-5 w-5 transition duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-start">
          <button type="button" onClick={onViewMembers} className={secondaryButtonClass}>
            Explore all members
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionFrame>
  );
}

function EcosystemSection() {
  const getPartnerLogo = (href: string) => {
    try {
      const url = new URL(href);
      // Clearbit logos are full wordmarks for many brands.
      return `https://logo.clearbit.com/${url.hostname}?size=256&format=png`;
    } catch {
      return "";
    }
  };

  const getPartnerMark = (href: string) => {
    try {
      const url = new URL(href);
      return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(url.origin)}`;
    } catch {
      return "";
    }
  };

  return (
    <SectionFrame id="ecosystem">
      <div className="grid gap-8">
        <div className="grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <SectionHeader
            label="Ecosystem"
            title="Connected to the teams that matter."
            copy="Useful for local talent; clear to global partners and programs."
          />
          <p className="max-w-3xl text-base leading-8 text-white/75 lg:justify-self-end sm:text-lg">
            Where AU builders meet programs, infra, and industry — from traction to deployment.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ecosystemPartners.map((partner, index) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,24,0.96),rgba(7,11,20,0.92))] p-5 text-white shadow-[0_20px_60px_rgba(3,8,18,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/16"
              >
                <div
                  className={`absolute inset-0 ${
                    index % 3 === 0
                      ? "bg-[radial-gradient(circle_at_top_left,rgba(254,206,0,0.14),transparent_28%)]"
                      : index % 3 === 1
                        ? "bg-[radial-gradient(circle_at_top_right,rgba(0,131,62,0.14),transparent_30%)]"
                        : "bg-[radial-gradient(circle_at_bottom_right,rgba(254,206,0,0.12),transparent_26%)]"
                  }`}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                        {partner.kind}
                      </div>

                      <div className="mt-4 flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/6 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                          <img
                            src={getPartnerMark(partner.href)}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <img
                            src={getPartnerLogo(partner.href)}
                            alt={partner.name}
                            className="h-7 max-w-[12rem] object-contain object-left"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="mt-2 text-sm font-semibold tracking-[-0.02em] text-white/84">
                            {partner.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#FECE00] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,28,0.96),rgba(7,11,20,0.94))] p-6 text-white shadow-[0_22px_60px_rgba(3,8,18,0.18)]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
              For institutions
            </div>
            <h3 className="mt-4 max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] text-white">
              Engage local Solana talent with clarity.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Follow credible teams, join targeted events, see what ships locally, and meet people across capital, infra, and product.
            </p>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              {[
                "Events and roundtables",
                "Warm intros to builders and founders",
                "Local activity, global Superteam reach",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FECE00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionFrame id="faq">
      <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
        <SectionHeader
          label="FAQ"
          title="Questions people actually ask."
          copy="What this is, who it is for, and how to join."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(6,10,20,0.45)] backdrop-blur-md">
          <ul className="divide-y divide-white/[0.08]">
            {faqs.map((item, index) => {
              const active = openIndex === index;

              return (
                <li key={item.question} className="px-4 py-1.5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(active ? null : index)}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-white/60 transition group-hover:text-white">
                      <span className="relative block h-4 w-4">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition ${
                            active ? "opacity-0" : "opacity-100"
                          }`}
                        />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pr-10 text-sm leading-7 text-white/76 sm:text-[15px]">
                          {item.answer}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}

/** X-style stack: one outer frame, rows separated by hairlines (no card grid). */
function SimulatedTweetFeed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(6,10,20,0.55)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Simulated feed
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">@SuperteamAU</p>
        </div>
        <a
          href={externalLinks.x}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-medium text-white/55 transition hover:text-emerald-300"
        >
          View on X →
        </a>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        {simulatedTweets.map((tweet, index) => (
          <li key={index} className="px-4 py-3.5 sm:px-5">
            <div className="flex gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[10px] font-bold text-white/80"
                aria-hidden
              >
                AU
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-1.5 text-[13px] leading-tight">
                  <span className="font-semibold text-white">Superteam Australia</span>
                  <span className="text-white/40">@SuperteamAU</span>
                  <span className="text-white/30">· {tweet.time}</span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/78">{tweet.text}</p>
                <div className="mt-2.5 flex items-center gap-4 text-[11px] text-white/28">
                  <span className="tabular-nums">♡ 12</span>
                  <span className="tabular-nums">↗ 4</span>
                  <span className="tabular-nums">Views 1.2k</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="border-t border-white/8 px-4 py-2.5 text-center text-[10px] leading-snug text-white/35 sm:px-5">
        Preview only — live updates on @SuperteamAU.
      </p>
    </div>
  );
}

function XFeedSection() {
  const nextEvent = events.find((event) => event.status === "Upcoming") ?? events[0];

  return (
    <SectionFrame id="community">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-12">
        <SectionHeader
          label="Community"
          title="The public layer of the ecosystem."
          copy="Feed, calendar, and earn — kept light, not a wall of boxes."
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-1 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-white/72">
              Simulated thread below for readability — links point to live sources.
            </p>
            <a
              href={externalLinks.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white/88 transition hover:text-emerald-300"
            >
              @SuperteamAU
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="text-sm leading-relaxed text-white/65">
            Bounties on{" "}
            <a
              href={externalLinks.opportunities}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-emerald-300/95 underline decoration-white/15 underline-offset-2 transition hover:text-emerald-200"
            >
              Superteam Earn (AU)
            </a>
            .
          </p>

          <nav
            className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[13px] text-white/55"
            aria-label="Community links"
          >
            <a href={externalLinks.x} target="_blank" rel="noreferrer" className="hover:text-white">
              X feed
            </a>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <a href={externalLinks.lumaHub} target="_blank" rel="noreferrer" className="hover:text-white">
              Events ({nextEvent.city})
            </a>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <a
              href={externalLinks.opportunities}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Opportunities
            </a>
          </nav>

          <SimulatedTweetFeed />

          <div className="border-t border-white/10 pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Voices
            </p>
            <ul className="mt-4 space-y-5">
              {testimonials.map((item) => (
                <li key={item.author}>
                  <blockquote className="border-l border-emerald-500/25 pl-4 text-sm leading-relaxed text-white/75">
                    <p>“{item.quote}”</p>
                    <footer className="mt-2 text-xs text-white/45">
                      {item.author}
                      <span className="text-white/25"> · </span>
                      {item.role}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function FinalCtaSection({
  onOpenForm,
  onViewMembers,
}: {
  onOpenForm: () => void;
  onViewMembers: () => void;
}) {
  return (
    <section className="relative overflow-hidden py-6">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.18),rgba(5,10,18,0.04)_22%,rgba(5,10,18,0.18)_100%),radial-gradient(circle_at_top_left,rgba(254,206,0,0.16),transparent_22%),radial-gradient(circle_at_18%_78%,rgba(0,131,62,0.14),transparent_26%),radial-gradient(circle_at_86%_22%,rgba(254,206,0,0.1),transparent_20%),radial-gradient(circle_at_72%_72%,rgba(34,163,90,0.12),transparent_26%)]" />
      <div className="absolute inset-x-[8%] top-8 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]" />
      <div className="absolute inset-x-[12%] bottom-8 h-px bg-[linear-gradient(90deg,transparent,rgba(254,206,0,0.22),transparent)]" />

      <div className="relative grid gap-8 border-y border-white/10 bg-[linear-gradient(180deg,rgba(8,14,24,0.28),rgba(8,14,24,0.12))] px-1 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex px-0 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/68">
            Join the network
          </div>
          <h2 className="mt-6 max-w-[12ch] text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
            Join in, stay close, build with the ecosystem.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
            Onboard once, follow the channels, use members, events, and earn as your workspace.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={onOpenForm} className={primaryButtonClass}>
              Get involved
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onViewMembers} className={secondaryButtonClass}>
              Meet the members
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "Telegram", href: externalLinks.telegram },
              { label: "Discord", href: externalLinks.discord },
              { label: "Twitter / X", href: externalLinks.x },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-[#FECE00]" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Builders", title: "Find collaborators", copy: "Directory + events — intro to build, faster." },
            { label: "Founders", title: "Access support", copy: "Grants, feedback, distribution, launch context." },
            { label: "Institutions", title: "Engage with credibility", copy: "See what ships locally; join the right rooms." },
          ].map((item) => (
            <div key={item.title} className="border-t border-white/10 pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
                {item.label}
              </div>
              <div className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">
                {item.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/68">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage({
  onOpenForm,
  onViewMembers,
}: {
  onOpenForm: () => void;
  onViewMembers: () => void;
}) {
  return (
    <>
      <Hero onOpenForm={onOpenForm} onViewMembers={onViewMembers} />
      <SignalStrip />
      <MissionSection />
      <SectionFrame id="impact">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {impactMetrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>
      </SectionFrame>
      <SupportSection />
      <EventsSection />
      <MeetupStorySection />
      <MembersSection onViewMembers={onViewMembers} />
      <EcosystemSection />
      <XFeedSection />
      <FAQSection />
      <SectionFrame id="join" className="lg:pb-16">
        <FinalCtaSection onOpenForm={onOpenForm} onViewMembers={onViewMembers} />
      </SectionFrame>
    </>
  );
}
