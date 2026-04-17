import { motion } from "motion/react";

export function SectionDivider({ variant = "default" }: { variant?: "default" | "accent" | "wide" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="relative overflow-hidden"
      style={{ height: variant === "wide" ? "2px" : "1px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "accent"
              ? "linear-gradient(90deg, transparent, rgba(37,99,235,0.15), rgba(6,182,212,0.1), rgba(37,99,235,0.15), transparent)"
              : "linear-gradient(90deg, transparent, rgba(0,0,0,0.04), rgba(0,0,0,0.06), rgba(0,0,0,0.04), transparent)",
        }}
      />
      {variant === "accent" && (
        <motion.div
          className="absolute top-0 left-0 w-[80px] h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)",
          }}
          animate={{ x: ["-80px", "calc(100vw + 80px)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      )}
    </motion.div>
  );
}
