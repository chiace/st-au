import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";

const voices = [
  { name: "Sarah Chen", title: "CTO", org: "Pacific Logistics Group", quote: "KazGard's foundation model reduced our document processing pipeline from hours to seconds. The accuracy on complex legal contracts surpassed every other solution we evaluated — including GPT-4.", metric: "98.7% accuracy", initial: "SC" },
  { name: "James Murray", title: "VP Engineering", org: "Fortescue Future Industries", quote: "We integrated KazGard Vision into our remote monitoring infrastructure. The model detects anomalies in extreme conditions — dust, heat, zero-visibility — with 99.7% accuracy.", metric: "99.7% detection", initial: "JM" },
  { name: "Dr. Priya Kapoor", title: "Head of AI", org: "St Vincent's Health Network", quote: "The fine-tuned diagnostic model identifies early-stage pathologies that our clinicians consistently confirmed. It's become an indispensable second opinion in every scan review.", metric: "3x faster diagnosis", initial: "PK" },
  { name: "Tom Albanese", title: "Director of Engineering", org: "Atlassian", quote: "KazGard Agents automated 60% of our internal code review pipeline. The agentic framework understands context across multiple repositories and catches issues human reviewers miss.", metric: "60% automation", initial: "TA" },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => { setDirection(1); setActive((prev) => (prev + 1) % voices.length); }, []);
  const goTo = (i: number) => { setDirection(i > active ? 1 : -1); setActive(i); };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [next, paused]);

  return (
    <section id="voices" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#2563EB]/[0.02] rounded-full blur-[250px]" />

      <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-4 mb-20">
          <div className="w-12 h-px bg-gradient-to-l from-[#2563EB]/30 to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Voices</span>
          <div className="w-12 h-px bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center text-[#0F172A] mb-20" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
          What our partners<br /><span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>say</span>
        </motion.h2>

        <div className="relative min-h-[360px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={active} custom={direction} initial={{ opacity: 0, y: direction * 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: direction * -24 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center">
              <Quote size={36} className="text-[#2563EB]/10 mx-auto mb-8" strokeWidth={1} />
              <p className="text-slate-700 max-w-[680px] mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(18px, 2.8vw, 24px)", lineHeight: "1.75", fontStyle: "italic" }}>
                {voices[active].quote}
              </p>
              <div className="mt-10 flex justify-center">
                <span className="text-[#2563EB] px-4 py-1.5 rounded-xl border border-[#2563EB]/10 bg-[#2563EB]/[0.04]" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                  {voices[active].metric}
                </span>
              </div>
              <div className="mt-10 flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center mb-4 shadow-lg shadow-[#2563EB]/15">
                  <span className="text-white" style={{ fontSize: "12px", fontWeight: 600 }}>{voices[active].initial}</span>
                </div>
                <p className="text-[#0F172A]" style={{ fontSize: "15px", fontWeight: 500 }}>{voices[active].name}</p>
                <p className="text-slate-400 mt-1" style={{ fontSize: "13px" }}>{voices[active].title}, {voices[active].org}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-16">
          {voices.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="relative w-10 h-[3px] rounded-full overflow-hidden bg-slate-100 hover:bg-slate-200 transition-colors">
              {active === i && (
                <motion.div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(90deg, #2563EB, #06B6D4)" }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: paused ? 99 : 7, ease: "linear" }} key={`progress-${active}-${paused}`} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}