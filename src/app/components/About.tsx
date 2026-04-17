import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";

const labImg = "https://images.unsplash.com/photo-1558258516-12eba3ac5ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHJlc2VhcmNoJTIwbGFib3JhdG9yeSUyMG1vZGVybiUyMGRhcmt8ZW58MXx8fHwxNzczNTcwODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const techImg = "https://images.unsplash.com/photo-1695902173528-0b15104c4554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwZnV0dXJpc3RpYyUyMGRhcmslMjBibHVlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM1ODA4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const stats = [
  { value: "47", label: "AI patents filed", suffix: "" },
  { value: "3B+", label: "Parameters trained", suffix: "" },
  { value: "200+", label: "Enterprise clients", suffix: "" },
  { value: "340", label: "AI researchers", suffix: "" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const img1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [80, -30]);

  return (
    <section ref={sectionRef} id="about" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden" style={{ position: "relative" }}>
      <div className="absolute top-20 right-[-200px] w-[600px] h-[600px] bg-[#2563EB]/[0.03] rounded-full blur-[250px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>
            About KazGard
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-[#0F172A]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 5vw, 58px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
              }}
            >
              Building the
              <br />
              infrastructure of
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>
                intelligence
              </span>
            </h2>

            <div className="mt-12 space-y-6">
              <p className="text-slate-500" style={{ fontSize: "16px", lineHeight: "1.9", fontWeight: 400 }}>
                KazGard is a Sydney-born AI company engineering the next wave
                of machine intelligence. We research, build, and deploy
                foundation models, autonomous AI agents, and scalable
                inference infrastructure for enterprise and government.
              </p>
              <p className="text-slate-400" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>
                Founded in 2021 by researchers from UNSW, DeepMind,
                and Google Brain, we've grown into one of the Asia-Pacific's
                most ambitious AI companies — training proprietary LLMs,
                deploying computer vision at industrial scale, and building
                agent frameworks that think, plan, and act autonomously.
              </p>
            </div>

            {/* Stats grid */}
            <div className="mt-16 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                  className="group relative rounded-2xl p-6 bg-white border border-slate-100 hover:border-[#2563EB]/15 transition-all duration-700 cursor-default overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[#2563EB]/5 hover:-translate-y-1"
                >
                  {/* Gradient accent top */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#2563EB]/0 to-transparent group-hover:via-[#2563EB]/30 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <p
                    className="text-[#0F172A] relative"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 500 }}
                  >
                    <span className="bg-gradient-to-br from-[#0F172A] to-[#334155] bg-clip-text text-transparent group-hover:from-[#2563EB] group-hover:to-[#06B6D4] transition-all duration-700">
                      <AnimatedCounter value={s.value} />
                    </span>
                  </p>
                  <p className="text-slate-400 mt-2 relative group-hover:text-slate-500 transition-colors duration-500" style={{ fontSize: "12px", letterSpacing: "0.5px", fontWeight: 500 }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Parallax Images */}
          <div className="space-y-5 relative">
            <motion.div style={{ y: img1Y }} className="rounded-2xl overflow-hidden relative group shadow-lg">
              <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ImageWithFallback
                  src={labImg}
                  alt="AI Research Lab"
                  className="w-full h-[300px] sm:h-[360px] object-cover transition-transform duration-[2s] group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <p
                className="absolute bottom-5 left-6 text-white/80"
                style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}
              >
                AI Research Lab — Sydney
              </p>
            </motion.div>
            <motion.div style={{ y: img2Y }} className="rounded-2xl overflow-hidden relative group shadow-lg">
              <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <ImageWithFallback
                  src={techImg}
                  alt="Neural architecture"
                  className="w-full h-[300px] sm:h-[360px] object-cover transition-transform duration-[2s] group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <p
                className="absolute bottom-5 left-6 text-white/80"
                style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}
              >
                Proprietary Neural Architecture
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}