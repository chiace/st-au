import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
  { label: "Models", href: "#models" },
  { label: "Solutions", href: "#solutions" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Technology", href: "#technology" },
  { label: "Plans", href: "#plans" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateActive = useCallback(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 200) {
        setActiveSection(sections[i]);
        return;
      }
    }
    setActiveSection("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #2563EB, #06B6D4, #2563EB)",
        }}
      />

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/75 backdrop-blur-2xl border-b border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-[32px] h-[32px] border border-slate-200 rounded-lg flex items-center justify-center relative bg-white shadow-sm group-hover:border-[#2563EB]/40 transition-all duration-500">
              <span
                className="text-[#0F172A]"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "15px" }}
              >
                K
              </span>
              <div className="absolute -top-[3px] -right-[3px] w-[7px] h-[7px] bg-[#2563EB] rounded-full">
                <div className="absolute inset-0 bg-[#2563EB] rounded-full animate-ping opacity-40" style={{ animationDuration: "3s" }} />
              </div>
            </div>
            <span
              className="text-[#0F172A] tracking-[0.08em] group-hover:text-[#2563EB] transition-colors duration-500"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "18px" }}
            >
              KazGard
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors duration-400 ${
                    isActive ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-800"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="text-slate-500 hover:text-slate-800 transition-colors duration-400"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Login
            </a>
            <a
              href="#plans"
              className="group/cta relative bg-[#2563EB] text-white px-6 py-2.5 rounded-xl transition-all duration-500 overflow-hidden hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <span className="relative z-10">Get started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-slate-600 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 32px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 bg-white/98 backdrop-blur-3xl z-40 flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-slate-500"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 400 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#plans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-6 bg-[#2563EB] text-white px-10 py-3.5 rounded-xl"
                style={{ fontSize: "14px", fontWeight: 500 }}
                onClick={() => setMobileOpen(false)}
              >
                Get started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}