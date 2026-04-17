import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  { q: "What AI models does KazGard offer?", a: "We offer proprietary foundation models from 7B to 70B parameters: general-purpose LLMs for reasoning and code, specialised medical/legal models, computer vision for industrial inspection, and our agentic framework for autonomous workflows." },
  { q: "How does KazGard compare to OpenAI or Anthropic?", a: "KazGard is purpose-built for enterprise deployment in Asia-Pacific. Our models are trained with regional data, offer on-premises and VPC deployment, and come with dedicated solutions architecture — something API-only providers cannot match." },
  { q: "Can I fine-tune a model on my own data?", a: "Absolutely. Our Enterprise Platform includes managed fine-tuning pipelines. Your data never leaves your chosen environment, and the resulting model is exclusively yours. We support LoRA, full fine-tuning, and RLHF." },
  { q: "Where is my data processed and stored?", a: "By default, inference runs on Sydney-based GPU clusters. Enterprise clients choose Sydney, Singapore, or London — or deploy entirely on-premises. We're SOC 2 Type II certified with full encryption at rest and in transit." },
  { q: "What is the free tier?", a: "Our API plan includes 10M tokens/month free — designed for developers to experiment and prototype. No credit card required. Sign up and get your API key instantly." },
  { q: "How do I apply for a Research Partnership?", a: "Submit an application outlining your research goals. Our team reviews within 10 business days. Accepted partners receive compute grants up to $500K and direct researcher access." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-36 sm:py-52 relative overflow-hidden">
      <div className="max-w-[760px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-4 mb-20">
          <div className="w-12 h-px bg-gradient-to-l from-[#2563EB]/30 to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>FAQ</span>
          <div className="w-12 h-px bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center text-[#0F172A] mb-20" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Questions &{" "}<span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>answers</span>
        </motion.h2>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="border-t border-slate-100">
              <button className="w-full flex items-start justify-between py-7 text-left gap-6 group" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className={`transition-colors duration-500 ${openIdx === i ? "text-[#0F172A]" : "text-slate-500 group-hover:text-slate-700"}`} style={{ fontSize: "16px", lineHeight: "1.55" }}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-500 ${openIdx === i ? "border-[#2563EB]/40 rotate-45 bg-[#2563EB]/10" : "border-slate-200 group-hover:border-slate-300"}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 0v10M0 5h10" stroke={openIdx === i ? "#2563EB" : "#CBD5E1"} strokeWidth="1.5" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="text-slate-500 pb-7" style={{ fontSize: "14px", lineHeight: "1.9", fontWeight: 400 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-slate-100" />
        </div>
      </div>
    </section>
  );
}
