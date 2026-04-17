import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Eye, Bot, Zap, ArrowRight } from "lucide-react";

interface Model {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  params: string;
  context: string;
  speed: string;
  benchmarks: { name: string; score: number; max: number }[];
  description: string;
  useCases: string[];
}

const models: Model[] = [
  {
    id: "foundation-70b", name: "Foundation 70B", tagline: "Flagship reasoning model",
    icon: <Brain size={18} />, color: "#2563EB", params: "70B", context: "128K", speed: "38ms",
    benchmarks: [{ name: "MMLU", score: 89.2, max: 100 }, { name: "HumanEval", score: 84.7, max: 100 }, { name: "GSM8K", score: 92.1, max: 100 }, { name: "MT-Bench", score: 91, max: 100 }],
    description: "Our most capable model. Complex reasoning, code generation, and creative writing with 128K context.", useCases: ["Complex analysis", "Code generation", "Research", "Strategy"],
  },
  {
    id: "foundation-7b", name: "Foundation 7B", tagline: "Fast & efficient",
    icon: <Zap size={18} />, color: "#6BA5D7", params: "7B", context: "32K", speed: "12ms",
    benchmarks: [{ name: "MMLU", score: 72.4, max: 100 }, { name: "HumanEval", score: 68.9, max: 100 }, { name: "GSM8K", score: 76.3, max: 100 }, { name: "MT-Bench", score: 78, max: 100 }],
    description: "Optimised for speed and cost-efficiency. Ideal for high-volume production workloads.", useCases: ["Chat", "Summarisation", "Classification", "Extraction"],
  },
  {
    id: "vision", name: "Vision Pro", tagline: "Multimodal perception",
    icon: <Eye size={18} />, color: "#7EC8A4", params: "22B", context: "16K + images", speed: "45ms",
    benchmarks: [{ name: "ImageNet", score: 91.3, max: 100 }, { name: "COCO mAP", score: 62.8, max: 100 }, { name: "OCR Acc", score: 97.4, max: 100 }, { name: "VQA v2", score: 84.2, max: 100 }],
    description: "State-of-the-art vision + text. Images, documents, medical scans, satellite imagery.", useCases: ["Medical imaging", "Document OCR", "Quality control", "Satellite"],
  },
  {
    id: "agents", name: "Agent Framework", tagline: "Autonomous workflows",
    icon: <Bot size={18} />, color: "#D4A76A", params: "70B + tools", context: "128K + memory", speed: "Variable",
    benchmarks: [{ name: "SWE-bench", score: 41.2, max: 100 }, { name: "WebArena", score: 38.7, max: 100 }, { name: "Tool Use", score: 94.6, max: 100 }, { name: "Planning", score: 87.3, max: 100 }],
    description: "Autonomous agents that plan, use tools, and iterate. Built-in safety rails and HITL controls.", useCases: ["Process automation", "Research agents", "Code agents", "Data pipelines"],
  },
];

function BenchmarkBar({ name, score, max, color, delay }: { name: string; score: number; max: number; color: string; delay: number }) {
  const pct = (score / max) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-slate-400" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
        <motion.span
          key={score}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className="text-slate-600"
          style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {score}%
        </motion.span>
      </div>
      <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          key={`${name}-${score}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}50, ${color})` }}
        >
          {/* Shimmer on bar */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 3s ease-in-out infinite",
              animationDelay: `${delay + 1}s`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function ModelExplorer() {
  const [activeId, setActiveId] = useState(models[0].id);
  const active = models.find((m) => m.id === activeId) || models[0];

  return (
    <section id="models" className="bg-white py-36 sm:py-52 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.15) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Model Explorer</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#0F172A]"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            Explore the{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>models</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-[380px] lg:text-right lg:ml-auto"
            style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}
          >
            Click each model to explore its architecture, benchmarks, and ideal use cases.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 lg:gap-6">
          {/* Selector */}
          <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {models.map((model, i) => (
              <motion.button
                key={model.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActiveId(model.id)}
                className={`flex items-center gap-3.5 px-5 py-4 rounded-xl border transition-all duration-500 text-left shrink-0 lg:shrink ${
                  activeId === model.id
                    ? "bg-[#2563EB]/[0.05] border-[#2563EB]/20 shadow-md"
                    : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${activeId === model.id ? "opacity-100 scale-105" : "opacity-30"}`}
                  style={{ backgroundColor: `${model.color}15`, color: model.color }}
                >
                  {model.icon}
                </div>
                <div className="min-w-0">
                  <p className={`transition-colors duration-500 ${activeId === model.id ? "text-[#0F172A]" : "text-slate-400"}`}
                    style={{ fontSize: "14px", fontFamily: "'Playfair Display', serif" }}>
                    {model.name}
                  </p>
                  <p className="text-slate-400 truncate" style={{ fontSize: "11px" }}>{model.tagline}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-100 bg-white backdrop-blur-sm overflow-hidden shadow-lg"
            >
              <div className="px-7 sm:px-9 pt-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${active.color}15`, color: active.color }}>
                    {active.icon}
                  </div>
                  <div>
                    <h3 className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "24px" }}>{active.name}</h3>
                    <p className="text-slate-400" style={{ fontSize: "12px" }}>{active.tagline}</p>
                  </div>
                </div>
                <p className="text-slate-500 max-w-[520px]" style={{ fontSize: "14px", lineHeight: "1.8", fontWeight: 400 }}>{active.description}</p>
              </div>

              <div className="grid grid-cols-3 border-b border-slate-100">
                {[{ label: "Parameters", value: active.params }, { label: "Context", value: active.context }, { label: "Latency (p50)", value: active.speed }].map((s) => (
                  <div key={s.label} className="px-7 sm:px-9 py-5 border-r border-slate-100 last:border-r-0">
                    <p className="text-slate-400 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>{s.label}</p>
                    <p className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="px-7 sm:px-9 py-7 border-b sm:border-b-0 sm:border-r border-slate-100">
                  <p className="text-slate-400 uppercase mb-5" style={{ fontSize: "10px", letterSpacing: "3px" }}>Benchmarks</p>
                  <div className="space-y-4">
                    {active.benchmarks.map((b, i) => (
                      <BenchmarkBar key={`${active.id}-${b.name}`} name={b.name} score={b.score} max={b.max} color={active.color} delay={i * 0.08} />
                    ))}
                  </div>
                </div>
                <div className="px-7 sm:px-9 py-7">
                  <p className="text-slate-400 uppercase mb-5" style={{ fontSize: "10px", letterSpacing: "3px" }}>Ideal for</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.useCases.map((uc) => (
                      <span key={uc} className="px-3.5 py-1.5 rounded-lg border text-slate-500" style={{ fontSize: "12px", borderColor: `${active.color}25`, backgroundColor: `${active.color}08` }}>
                        {uc}
                      </span>
                    ))}
                  </div>
                  <a href="#plans" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2563EB] transition-colors duration-500 group/link"
                    style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Get started
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}