import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const clipPath = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [
    "inset(40% 30% 40% 30% round 24px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)", "inset(20% 15% 20% 15% round 16px)",
  ]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.85]);
  const innerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 0.4, 0.4, 0.9]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  return (
    <section ref={ref} className="relative h-[80vh] sm:h-[90vh] overflow-hidden bg-[#FAFAFA]" style={{ position: "relative" }}>
      <motion.div className="absolute inset-0" style={{ clipPath, scale }}>
        <motion.div className="absolute inset-0" style={{ y: innerY }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2563EB] rounded-full blur-[200px]" />

          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <div className="absolute inset-0 border border-white/[0.04] rounded-full" />
            <div className="absolute inset-8 border border-[#2563EB]/[0.08] rounded-full" />
            <div className="absolute inset-16 border border-white/[0.03] rounded-full" />
          </motion.div>

          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-px origin-bottom"
              style={{ height: "300px", transform: `translate(-50%, -100%) rotate(${i * 30}deg)`, background: `linear-gradient(0deg, rgba(37,99,235,${0.04 + (i % 3) * 0.02}), transparent)` }} />
          ))}
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity, background: "radial-gradient(ellipse at center, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.8) 100%)" }} />

        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: textOpacity, y: textY }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 border border-white/15 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-sm bg-white/5">
            <span className="text-white/70" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "32px" }}>K</span>
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#2563EB] rounded-full shadow-[0_0_16px_rgba(37,99,235,0.5)]">
              <div className="absolute inset-0 bg-[#2563EB] rounded-full animate-ping opacity-30" style={{ animationDuration: "2.5s" }} />
            </div>
          </motion.div>

          <h2 className="text-white text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Intelligence at{" "}
            <span className="bg-clip-text text-transparent" style={{ fontStyle: "italic", backgroundImage: "linear-gradient(90deg, #60A5FA, #06B6D4, #60A5FA)", backgroundSize: "200% 100%", animation: "shimmer 4s ease-in-out infinite" }}>
              scale
            </span>
          </h2>
          <p className="text-white/40 mt-6 text-center max-w-[400px]" style={{ fontSize: "14px", lineHeight: "1.8", fontWeight: 400 }}>
            Powering the next generation of autonomous systems across every industry vertical.
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-slate-200 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-slate-200 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-slate-200 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-slate-200 rounded-br-lg pointer-events-none" />
    </section>
  );
}
