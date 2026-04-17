import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const words = [
  "We", "don't", "just", "build", "AI.", "—",
  "We", "architect", "intelligence", "that",
  "transforms", "industries,", "empowers",
  "communities,", "and", "redefines", "what's",
  "possible.", "From", "Sydney", "to", "the",
  "world,", "every", "model", "we", "ship",
  "carries", "a", "singular", "conviction:", "—",
  "technology", "should", "elevate", "humanity."
];

function ManifestoWord({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const color = useTransform(progress, range, ["rgba(15,23,42,0.08)", "rgba(15,23,42,0.85)"]);
  const blur = useTransform(progress, [range[0], range[0] + (range[1] - range[0]) * 0.5, range[1]], [4, 0, 0]);
  const filterStr = useTransform(blur, (v) => `blur(${v}px)`);

  if (word === "—") return <br />;

  const isHighlight = ["intelligence", "transforms", "elevate", "humanity."].includes(word);

  return (
    <motion.span
      style={{
        opacity,
        color: isHighlight ? undefined : color,
        filter: filterStr,
        display: "inline-block",
        marginRight: "0.35em",
      }}
      className={isHighlight ? "bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" : ""}
    >
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section className="relative bg-white overflow-hidden" style={{ position: "relative" }}>
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/[0.04] rounded-full blur-[250px]" />
      <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] bg-[#8B5CF6]/[0.03] rounded-full blur-[200px]" />

      <div ref={containerRef} className="min-h-[80vh] flex items-center justify-center py-40 sm:py-56 relative">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-16 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-20"
          >
            <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
            <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>
              Manifesto
            </span>
          </motion.div>

          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 4.5vw, 48px)",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
          }}>
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return <ManifestoWord key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, end]} />;
            })}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 flex items-center gap-6"
          >
            <div className="w-16 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
            <span className="text-slate-400 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
              KazGard Intelligence
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}