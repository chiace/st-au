import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl border border-slate-200 bg-white/90 backdrop-blur-xl flex items-center justify-center group hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-500 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={14} className="text-slate-400 group-hover:text-[#2563EB] transition-colors duration-300" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
