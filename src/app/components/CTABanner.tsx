import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/* Floating geometric shapes */
function FloatingShapes() {
  const shapes = [
    { x: "10%", y: "20%", size: 60, rotate: 45, delay: 0, duration: 18 },
    { x: "85%", y: "15%", size: 40, rotate: 0, delay: 3, duration: 22 },
    { x: "75%", y: "70%", size: 80, rotate: 30, delay: 6, duration: 20 },
    { x: "15%", y: "75%", size: 50, rotate: 60, delay: 2, duration: 24 },
    { x: "50%", y: "10%", size: 35, rotate: 15, delay: 8, duration: 16 },
    { x: "90%", y: "50%", size: 45, rotate: 75, delay: 4, duration: 19 },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [s.rotate, s.rotate + 90, s.rotate],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          <div
            className="border border-white/[0.08] rounded-xl"
            style={{ width: s.size, height: s.size }}
          />
        </motion.div>
      ))}
    </>
  );
}

export function CTABanner() {
  return (
    <section className="relative py-36 sm:py-48 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 30% 30%, rgba(139,92,246,0.1) 0%, transparent 50%),
          radial-gradient(ellipse 40% 50% at 70% 70%, rgba(6,182,212,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)
        `,
      }} />

      <FloatingShapes />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-16 text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-gradient-to-l from-[#2563EB]/40 to-transparent" />
            <span className="text-white/30 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>The future is now</span>
            <div className="w-12 h-px bg-gradient-to-r from-[#2563EB]/40 to-transparent" />
          </div>

          <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Ready to build<br />with{" "}
            <span className="bg-clip-text text-transparent" style={{ fontStyle: "italic", backgroundImage: "linear-gradient(135deg, #60A5FA, #06B6D4, #A78BFA)", backgroundSize: "200% 200%", animation: "shimmer 4s ease-in-out infinite" }}>
              intelligence
            </span>?
          </h2>

          <p className="text-white/35 max-w-[500px] mx-auto mb-14 mt-8" style={{ fontSize: "16px", lineHeight: "1.85", fontWeight: 400 }}>
            Join 200+ enterprises already deploying KazGard AI in production. From API access to custom infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#plans" className="group relative text-white px-12 py-4 rounded-2xl transition-all duration-500 hover:-translate-y-0.5 overflow-hidden"
              style={{ fontSize: "14px", fontWeight: 500 }}>
              {/* Animated gradient background */}
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED, #06B6D4, #2563EB)", backgroundSize: "300% 300%", animation: "shimmer 6s ease-in-out infinite" }} />
              <div className="absolute inset-[1px] rounded-[15px] bg-[#2563EB] group-hover:bg-[#1D4ED8] transition-colors duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Get started today
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />
            </a>
            <a href="#contact" className="text-white/35 hover:text-white/70 px-8 py-4 rounded-2xl border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.03]"
              style={{ fontSize: "14px", fontWeight: 500 }}>
              Schedule a demo
            </a>
          </div>

          {/* Trusted by text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center" style={{ zIndex: 4 - i }}>
                  <span className="text-white/60" style={{ fontSize: "8px", fontWeight: 600 }}>
                    {["SC", "JM", "PK", "TA"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-white/25 ml-2" style={{ fontSize: "12px" }}>
              Trusted by enterprise leaders
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
