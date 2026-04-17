import { motion } from "motion/react";

const companiesRow1 = [
  "Google Cloud", "NVIDIA", "Microsoft Azure", "AWS", "Atlassian", "Canva",
];
const companiesRow2 = [
  "Cochlear", "CSL Ltd", "Telstra", "BHP Group", "Macquarie", "Woodside",
];

function MarqueeRow({ items, duration, reverse = false }: { items: string[]; duration: number; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex shrink-0"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center shrink-0 px-8 sm:px-12 py-3 text-slate-300 hover:text-slate-500 transition-colors duration-700 cursor-default select-none"
            style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoBar() {
  return (
    <section className="bg-[#FAFAFA] py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center text-slate-400 uppercase mb-10"
        style={{ fontSize: "11px", letterSpacing: "3px", fontWeight: 500 }}
      >
        Trusted by 200+ enterprises worldwide
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="space-y-1"
      >
        <MarqueeRow items={companiesRow1} duration={45} />
        <MarqueeRow items={companiesRow2} duration={55} reverse />
      </motion.div>
    </section>
  );
}