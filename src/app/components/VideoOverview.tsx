import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

const posterImg = "https://images.unsplash.com/photo-1718154621829-881f65a74a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBkYXJrJTIwZnV0dXJpc3RpYyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzM1OTEyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function VideoOverview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="overview" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#2563EB]/[0.03] rounded-full blur-[250px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Overview</span>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#0F172A] mx-auto"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            The KazGard <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 mt-6 max-w-[520px] mx-auto"
            style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}
          >
            From EdTech to enterprise compliance, healthcare AI to robotics — a unified portfolio of intelligence solutions reshaping Australia's digital landscape.
          </motion.p>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden group"
        >
          {/* Outer glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#2563EB]/20 via-transparent to-[#8B5CF6]/10 opacity-60" />

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#0F172A]">
            {/* Top bar - macOS style */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#1E293B] border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-white/20" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
                kazgard_overview.mp4
              </span>
              <div className="w-[52px]" />
            </div>

            {/* Video area with poster image */}
            <div className="relative aspect-video bg-[#0F172A] cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
              <img
                src={posterImg}
                alt="KazGard Portfolio Overview"
                className="w-full h-full object-cover"
                style={{ opacity: isPlaying ? 0.3 : 1, transition: "opacity 0.8s ease" }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-[#0F172A]/30" />

              {/* Play button overlay */}
              <AnimatedPlayButton isPlaying={isPlaying} />

              {/* Cinematic scan line effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                }}
              />
            </div>

            {/* Controls bar */}
            <div className="flex items-center gap-4 px-5 py-3 bg-[#1E293B] border-t border-white/[0.05]">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/50 hover:text-white/90 transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* Progress bar */}
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, #2563EB, #06B6D4)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: isPlaying ? 120 : 0.3, ease: "linear" }}
                />
              </div>

              <span className="text-white/20" style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
                {isPlaying ? "0:00" : "2:34"} / 2:34
              </span>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/50 hover:text-white/90 transition-colors"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              <button className="text-white/50 hover:text-white/90 transition-colors">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats strip below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "10+", label: "Active Products" },
            { value: "6", label: "Industry Verticals" },
            { value: "50+", label: "Enterprise Clients" },
            { value: "∞", label: "Possibilities" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center py-6 rounded-xl border border-slate-100 bg-white shadow-sm"
            >
              <p className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 500 }}>
                {stat.value}
              </p>
              <p className="text-slate-400 mt-1" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedPlayButton({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Pulse rings */}
        <div className="absolute inset-0 -m-4">
          <div
            className="w-full h-full rounded-full border border-white/[0.08]"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
        </div>
        <div className="absolute inset-0 -m-8">
          <div
            className="w-full h-full rounded-full border border-white/[0.04]"
            style={{ animation: "pulse 2s ease-in-out infinite 0.5s" }}
          />
        </div>

        <div className="w-20 h-20 rounded-full bg-[#2563EB]/80 backdrop-blur-xl border border-[#60A5FA]/30 flex items-center justify-center shadow-2xl shadow-[#2563EB]/20">
          <Play size={28} className="text-white/90 ml-1" fill="currentColor" />
        </div>
      </motion.div>

      {/* Playing indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        >
          <div className="flex items-end gap-0.5 h-4">
            {[0, 0.15, 0.3, 0.15, 0].map((delay, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-[#60A5FA]/60 rounded-full"
                animate={{ height: ["4px", "16px", "4px"] }}
                transition={{ duration: 0.8, delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <span className="text-white/30 uppercase" style={{ fontSize: "9px", letterSpacing: "3px" }}>
            Now Playing
          </span>
        </motion.div>
      )}
    </div>
  );
}