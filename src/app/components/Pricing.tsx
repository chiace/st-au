import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const tiers = [
  { name: "API Access", price: "$0.002", unit: "per 1K tokens", tagline: "For developers & startups", description: "Full access to all foundation models via REST API. Pay-as-you-go with a generous free tier.", features: ["All models (7B–70B)", "99.9% uptime SLA", "Sub-50ms responses", "10M tokens/month free", "Community support"], cta: "Get API key", ctaHref: "#contact" },
  { name: "Enterprise", price: "Custom", unit: "tailored to scale", tagline: "For scaling organisations", description: "Dedicated infrastructure, custom fine-tuning, and white-glove onboarding for production AI at scale.", features: ["Dedicated GPU clusters", "Custom model fine-tuning", "Private VPC deployment", "Priority support & SLA", "Named solutions architect"], cta: "Talk to sales", ctaHref: "#contact", featured: true },
  { name: "Research", price: "By invitation", unit: "collaborative R&D", tagline: "For institutions & labs", description: "Joint research programmes, early model access, and co-authored publications with our research team.", features: ["Pre-release model access", "Joint research", "Co-published papers", "Compute grants to $500K", "Direct researcher access"], cta: "Apply for access", ctaHref: "#contact" },
];

export function Pricing() {
  return (
    <section id="plans" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#2563EB]/[0.02] rounded-full blur-[300px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-20">
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Plans</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
            Scale your AI<br /><span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>your way</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-[380px] lg:text-right lg:ml-auto" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>
            From a single API call to dedicated infrastructure — we meet you wherever you are.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative rounded-2xl p-8 sm:p-9 flex flex-col transition-all duration-700 hover:-translate-y-2 ${
                tier.featured
                  ? "bg-white border-2 border-[#2563EB]/15 shadow-xl shadow-[#2563EB]/[0.06] ring-1 ring-[#2563EB]/5"
                  : "bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200"
              }`}>
              {tier.featured && (
                <>
                  <div className="absolute -top-px left-0 right-0 h-[3px] rounded-t-2xl overflow-hidden">
                    <div className="w-full h-full" style={{ background: "linear-gradient(90deg, #2563EB, #06B6D4, #8B5CF6, #2563EB)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#2563EB]/[0.02] via-transparent to-transparent pointer-events-none" />
                </>
              )}

              <div className="relative">
                {tier.featured && (
                  <div className="mb-5 flex items-center gap-2">
                    <Sparkles size={12} className="text-[#2563EB]" />
                    <span className="text-[#2563EB] uppercase" style={{ fontSize: "10px", letterSpacing: "2px", fontWeight: 600 }}>Most popular</span>
                  </div>
                )}
                <p className="text-slate-400 uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "3px" }}>{tier.tagline}</p>
                <h3 className="text-[#0F172A] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "26px" }}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 500 }}>{tier.price}</span>
                  <span className="text-slate-400" style={{ fontSize: "12px" }}>{tier.unit}</span>
                </div>
                <p className="text-slate-500 mb-8" style={{ fontSize: "14px", lineHeight: "1.8", fontWeight: 400 }}>{tier.description}</p>
                <div className="h-px bg-slate-100 mb-7" />
                <ul className="space-y-4 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={14} className={`mt-0.5 shrink-0 ${tier.featured ? "text-[#2563EB]" : "text-slate-300"}`} strokeWidth={2} />
                      <span className="text-slate-500" style={{ fontSize: "14px", lineHeight: "1.5" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={tier.ctaHref}
                  className={`mt-10 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-500 group/cta relative overflow-hidden ${
                    tier.featured
                      ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-100"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 500 }}>
                  <span className="relative z-10 flex items-center gap-2">
                    {tier.cta}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}