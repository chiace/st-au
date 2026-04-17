import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const capabilities = [
  { id: "01", title: "Foundation Models", tagline: "Purpose-built intelligence", description: "Proprietary LLMs trained on curated multilingual datasets with RLHF. From 7B specialist models to our flagship 70B — state-of-the-art across reasoning, code, and domain expertise.", metric: "89.2% MMLU" },
  { id: "02", title: "Agentic AI Framework", tagline: "Autonomous reasoning", description: "Deploy AI agents that plan multi-step workflows, use tools, query databases, and iterate until objectives are met. Handles complex enterprise processes without supervision.", metric: "94.6% Tool Use" },
  { id: "03", title: "Real-Time Inference", tagline: "Sub-50ms at any scale", description: "Proprietary inference engine with sub-50ms response times globally. Purpose-built GPU clusters with intelligent routing, batching, and model sharding for consistent performance.", metric: "<50ms p50" },
  { id: "04", title: "Enterprise Fine-Tuning", tagline: "Your data, your model", description: "Bring your data, we fine-tune a model for your domain. Full data sovereignty, on-premises or VPC deployment, and continuous learning loops. LoRA, full fine-tuning, and RLHF.", metric: "100% Private" },
];

export function Features() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="technology" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      <div className="absolute bottom-0 left-[-200px] w-[700px] h-[700px] bg-[#2563EB]/[0.02] rounded-full blur-[250px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-20">
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Core Technology</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-[#0F172A] mb-24 max-w-[520px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
          Technology that<br /><span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>transcends</span> limits
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[4px_1fr] gap-0 lg:gap-12">
          <div className="hidden lg:flex flex-col relative">
            <div className="absolute inset-0 w-[2px] bg-slate-100 left-[1px] rounded-full" />
            {capabilities.map((_, i) => (
              <div key={i} className="flex-1 relative">
                <motion.div className="absolute left-0 top-0 w-[4px] rounded-full"
                  animate={{ height: activeIdx === i ? "100%" : "0%", opacity: activeIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: "linear-gradient(180deg, #2563EB, #06B6D4)" }} />
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-t border-slate-100 cursor-pointer group" onClick={() => setActiveIdx(activeIdx === i ? -1 : i)}>
                <div className="py-9 sm:py-12 flex items-start sm:items-center gap-6 sm:gap-10">
                  <span className={`transition-all duration-500 shrink-0 ${activeIdx === i ? "text-[#2563EB]" : "text-slate-200"}`} style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px" }}>
                    {cap.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={`transition-colors duration-500 ${activeIdx === i ? "text-[#0F172A]" : "text-slate-400 group-hover:text-slate-600"}`}
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(22px, 3vw, 32px)" }}>
                        {cap.title}
                      </h3>
                      <div className="flex items-center gap-4 shrink-0">
                        <AnimatePresence>
                          {activeIdx === i && (
                            <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                              className="hidden sm:block text-[#2563EB] px-3 py-1 rounded-lg border border-[#2563EB]/15 bg-[#2563EB]/5"
                              style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
                              {cap.metric}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${activeIdx === i ? "border-[#2563EB]/40 rotate-45 bg-[#2563EB]/5" : "border-slate-200"}`}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 0v10M0 5h10" stroke={activeIdx === i ? "#2563EB" : "#CBD5E1"} strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                          <div className="mt-5">
                            <p className="text-[#2563EB]/60 uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "3px" }}>{cap.tagline}</p>
                            <p className="text-slate-500 max-w-[560px]" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>{cap.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
