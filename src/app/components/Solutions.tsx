import { useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const aiAbstractImg = "https://images.unsplash.com/photo-1768327239584-e97d004f1830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB2aXN1YWxpemF0aW9uJTIwZGFya3xlbnwxfHx8fDE3NzM1NzA4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const visionImg = "https://images.unsplash.com/photo-1772050140977-4ca163b38d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMHRlY2hub2xvZ3klMjBzY3JlZW4lMjBkYXJrJTIwYmx1ZXxlbnwxfHx8fDE3NzM1NzA4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const roboticsImg = "https://images.unsplash.com/photo-1622118490627-e7db0f0765ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcm9ib3RpY3MlMjBmYWN0b3J5JTIwZGFyayUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NzM1Njk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const cloudImg = "https://images.unsplash.com/photo-1757359315242-9813e0544bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYXJrJTIwYWJzdHJhY3QlMjBhcmNoaXRlY3R1cmUlMjBncmFkaWVudHxlbnwxfHx8fDE3NzM1ODA4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const solutions = [
  { name: "KazGard Foundation", domain: "Large Language Models", description: "Proprietary LLMs from 7B to 70B parameters. State-of-the-art reasoning, code generation, and domain expertise.", image: aiAbstractImg, accent: "#2563EB", stat: "89.2% MMLU" },
  { name: "KazGard Vision", domain: "Computer Vision", description: "Real-time visual understanding for industrial inspection, medical imaging, and satellite analytics at scale.", image: visionImg, accent: "#06B6D4", stat: "97.4% OCR" },
  { name: "KazGard Agents", domain: "Autonomous Agents", description: "Multi-step reasoning agents that plan, execute tools, and iterate until objectives are achieved.", image: roboticsImg, accent: "#F59E0B", stat: "94.6% Tool Use" },
  { name: "KazGard Cloud", domain: "AI Infrastructure", description: "Purpose-built GPU clusters with sub-50ms latency, managed fine-tuning, and full data sovereignty.", image: cloudImg, accent: "#10B981", stat: "<50ms p50" },
];

function TiltCard({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(900px) rotateX(${(y - 0.5) * -6}deg) rotateY(${(x - 0.5) * 6}deg) scale3d(1.02,1.02,1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.1 });
  };

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-700"
      style={{ transform, transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <div className="relative h-[340px] sm:h-[400px] overflow-hidden">
        <ImageWithFallback src={solution.image} alt={solution.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/55 to-transparent" />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 50%)` }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="uppercase" style={{ fontSize: "10px", letterSpacing: "2.5px", color: solution.accent }}>{solution.domain}</p>
              <span className="px-2 py-0.5 rounded-md text-white/60 border" style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", borderColor: `${solution.accent}40`, backgroundColor: `${solution.accent}15` }}>
                {solution.stat}
              </span>
            </div>
            <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "26px" }}>{solution.name}</h3>
            <p className="text-white/50 max-w-[340px] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-700" style={{ fontSize: "14px", lineHeight: "1.75", fontWeight: 300 }}>
              {solution.description}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shrink-0 backdrop-blur-sm">
            <ArrowUpRight size={16} className="text-white/70" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-20">
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Our Solutions</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
            Four platforms,<br />one <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>intelligence</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-[420px] lg:text-right lg:ml-auto" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>
            Each platform works independently or as an integrated AI stack — from model training to production deployment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutions.map((s, i) => <TiltCard key={s.name} solution={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
