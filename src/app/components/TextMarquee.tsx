import { motion } from "motion/react";

const phrases = [
  "FOUNDATION MODELS", "AGENTIC AI", "REAL-TIME INFERENCE", "AUTONOMOUS SYSTEMS",
  "ENTERPRISE INTELLIGENCE", "NEURAL ARCHITECTURE", "RESPONSIBLE AI", "COGNITIVE COMPUTING",
];

export function TextMarquee() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#FAFAFA] overflow-hidden select-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative">
        <motion.div className="flex whitespace-nowrap gap-0" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[...phrases, ...phrases].map((phrase, i) => (
            <span key={`a-${i}`} className="flex items-center">
              <span className="text-transparent mx-6 sm:mx-10" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1, letterSpacing: "-0.03em", WebkitTextStroke: "1px rgba(37,99,235,0.08)" }}>
                {phrase}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2563EB]/20 shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
      <div className="relative mt-4 sm:mt-6">
        <motion.div className="flex whitespace-nowrap gap-0" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
          {[...phrases.slice(4), ...phrases.slice(0, 4), ...phrases.slice(4), ...phrases.slice(0, 4)].map((phrase, i) => (
            <span key={`b-${i}`} className="flex items-center">
              <span className="mx-6 sm:mx-10" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1, letterSpacing: "-0.03em", color: "transparent", WebkitTextStroke: "1px rgba(6,182,212,0.06)" }}>
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
