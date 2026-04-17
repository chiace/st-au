import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { NeuralCanvas } from "./NeuralCanvas";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

function AnimatedLetters({
  text,
  baseDelay,
  className,
  style,
}: {
  text: string;
  baseDelay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: baseDelay + i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Floating badge component */
function FloatingBadge({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 shadow-xl shadow-slate-200/30 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
        className="flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />
        <span className="text-slate-600" style={{ fontSize: "12px", fontWeight: 500 }}>{text}</span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ position: "relative" }}>
      {/* Mesh gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 70% 40% at 20% 60%, rgba(6,182,212,0.05) 0%, transparent 50%),
          linear-gradient(180deg, #F0F4FF 0%, #FAFBFF 40%, #FAFAFA 100%)
        `,
      }} />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.07) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <NeuralCanvas />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [-20, 20, -20] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#2563EB] rounded-full blur-[200px] opacity-[0.10] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 0.85, 1.1], x: [20, -30, 20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[35%] right-[5%] w-[450px] h-[450px] bg-[#8B5CF6] rounded-full blur-[200px] opacity-[0.07] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], y: [-20, 20, -20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[15%] left-[35%] w-[350px] h-[350px] bg-[#06B6D4] rounded-full blur-[180px] opacity-[0.06] pointer-events-none"
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent pointer-events-none z-10" />

      {/* Floating badges */}
      <FloatingBadge text="89.2% MMLU Score" delay={2.8} className="top-[22%] right-[12%] z-20" />
      <FloatingBadge text="Sub-50ms Latency" delay={3.2} className="bottom-[28%] left-[8%] z-20" />
      <FloatingBadge text="200+ Enterprise Clients" delay={3.6} className="top-[38%] left-[5%] z-20" />

      <motion.div style={{ opacity, y, scale }} className="relative max-w-[1000px] mx-auto px-6 sm:px-10 text-center z-20">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/70 shadow-lg shadow-slate-200/20">
            <div className="relative flex items-center justify-center">
              <div className="w-[7px] h-[7px] rounded-full bg-emerald-500" />
              <div className="absolute w-[7px] h-[7px] rounded-full bg-emerald-500 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
            <span className="text-slate-500" style={{ fontSize: "12px", letterSpacing: "0.5px", fontWeight: 500 }}>
              Sydney · Singapore · London
            </span>
            <div className="w-px h-3 bg-slate-200" />
            <Sparkles size={11} className="text-[#2563EB]" />
            <span className="text-[#2563EB]" style={{ fontSize: "11px", fontWeight: 600 }}>New: v4.0</span>
          </div>
        </motion.div>

        {/* Main title */}
        <h1
          className="text-[#0F172A]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            fontSize: "clamp(48px, 8.5vw, 92px)",
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
          }}
        >
          <AnimatedLetters text="The new" baseDelay={0.4} />
          {" "}
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontStyle: "italic" }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #8B5CF6 100%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 5s ease-in-out infinite",
                }}
              >
                AI
              </span>
            </motion.span>
          </span>
          <br />
          <AnimatedLetters text="standard" baseDelay={0.85} />
        </h1>

        {/* Divider with animated glow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center justify-center gap-5 mt-8 mb-7"
        >
          <div className="w-20 h-px bg-gradient-to-l from-[#2563EB]/25 to-transparent" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] animate-ping opacity-30" style={{ animationDuration: "3s" }} />
          </motion.div>
          <div className="w-20 h-px bg-gradient-to-r from-[#2563EB]/25 to-transparent" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-slate-500 max-w-[540px] mx-auto"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: "1.8", fontWeight: 400 }}
        >
          Pioneering foundation models, autonomous agents, and intelligent
          infrastructure — from Sydney to the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#playground"
            className="group relative bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3.5 rounded-2xl transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_48px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Try the AI live
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </a>
          <a
            href="#models"
            className="group flex items-center gap-2.5 text-slate-600 hover:text-[#2563EB] px-8 py-3.5 rounded-2xl border border-slate-200 hover:border-[#2563EB]/25 bg-white/70 backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-[#2563EB]/5 hover:-translate-y-0.5"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Explore models
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          {["SOC 2 Certified", "99.97% Uptime", "GDPR Compliant"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M4 7L6 9L10 5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-slate-400" style={{ fontSize: "12px", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-slate-300/60 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ height: ["4px", "8px", "4px"], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] rounded-full bg-gradient-to-b from-[#2563EB] to-[#06B6D4]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
