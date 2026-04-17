import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const metrics = [
  { value: "12B", label: "Parameters Trained", sub: "Across foundation models" },
  { value: "47ms", label: "Avg Latency", sub: "Global inference speed" },
  { value: "99.97%", label: "Uptime SLA", sub: "Enterprise reliability" },
  { value: "200+", label: "Enterprise Clients", sub: "Across 6 verticals" },
  { value: "10M+", label: "Daily Inferences", sub: "In production systems" },
  { value: "6", label: "Countries", sub: "Active deployments" },
];

export function HorizontalMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-45%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 sm:py-44 bg-white overflow-hidden" style={{ position: "relative" }}>
      <motion.div className="absolute top-0 left-0 h-[2px] rounded-full" style={{ width: lineWidth, background: "linear-gradient(90deg, transparent, #2563EB, #06B6D4, #2563EB, transparent)" }} />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4">
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>By the numbers</span>
        </motion.div>
      </div>

      <motion.div style={{ x }} className="flex gap-0">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex-shrink-0 w-[320px] sm:w-[400px] px-8 sm:px-12 py-10 relative group">
            {i > 0 && <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-slate-100" />}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}>
              <span className="block text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(52px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                {m.value}
              </span>
              <motion.div className="w-8 h-[2px] mt-6 mb-4 rounded-full" style={{ background: "linear-gradient(90deg, #2563EB, #06B6D4)" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }} />
              <p className="text-slate-500 uppercase" style={{ fontSize: "12px", letterSpacing: "3px" }}>{m.label}</p>
              <p className="text-slate-400 mt-2" style={{ fontSize: "13px", fontWeight: 400, lineHeight: "1.6" }}>{m.sub}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
