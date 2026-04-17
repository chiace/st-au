import { useState, useRef, forwardRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, Sparkles, Code, Shield, GraduationCap, Building2, Heart, Palette, BookOpen, Brain, Bot } from "lucide-react";

const projects = [
  {
    id: "magic-story",
    name: "Magic Story Builder",
    category: "EdTech",
    description: "AI-powered interactive storytelling platform for children. Generates personalised stories with illustrations, fostering creativity and literacy through imaginative play.",
    image: "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN0b3J5dGVsbGluZyUyMGNyZWF0aXZlJTIwZWR1Y2F0aW9uJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczNTg5NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles,
    accent: "#F59E0B",
    tags: ["Generative AI", "Children", "Storytelling"],
    featured: true,
  },
  {
    id: "codeflix",
    name: "CodeFlix",
    category: "EdTech",
    description: "Interactive AI coding education platform with real-time code generation, gamified learning paths, and adaptive curriculum powered by intelligent tutoring systems.",
    image: "https://images.unsplash.com/photo-1753998941488-fc3064ab6094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBlZHVjYXRpb24lMjBwbGF0Zm9ybSUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzczNTg5NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Code,
    accent: "#8B5CF6",
    tags: ["AI Tutor", "Code Generation", "Gamification"],
    featured: true,
  },
  {
    id: "policy-checker",
    name: "Policy Checker Bot",
    category: "Compliance",
    description: "AI-driven policy compliance engine for Childcare, Aged Care, Auditing, and NDIS sectors. Analyses documents against regulatory frameworks in real-time.",
    image: "https://images.unsplash.com/photo-1704969724221-8b7361b61f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wbGlhbmNlJTIwYXVkaXQlMjBkb2N1bWVudCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczNTg5NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Shield,
    accent: "#10B981",
    tags: ["NLP", "Regulatory", "Automation"],
    featured: false,
  },
  {
    id: "ece-bubble",
    name: "ECE Bubble",
    category: "EdTech",
    description: "Comprehensive Early Childhood Education platform designed in Australia. AI-powered observation tracking, learning story generation, and developmental milestone analysis.",
    image: "https://images.unsplash.com/photo-1567746512136-f005499a7575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJseSUyMGNoaWxkaG9vZCUyMGVkdWNhdGlvbiUyMG51cnNlcnklMjBjbGFzc3Jvb218ZW58MXx8fHwxNzczNTg5NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: GraduationCap,
    accent: "#06B6D4",
    tags: ["ECE", "Documentation", "Australian Standards"],
    featured: false,
  },
  {
    id: "auditor-tools",
    name: "HLB auditor.tools",
    category: "Enterprise",
    description: "Enterprise-grade AI auditing platform built for HLB International. Automates audit workflows, risk assessment, and compliance reporting with intelligent document analysis.",
    image: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhdWRpdGluZyUyMGNvcnBvcmF0ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM1ODk2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Building2,
    accent: "#3B82F6",
    tags: ["Auditing", "Risk AI", "Enterprise"],
    featured: true,
  },
  {
    id: "ndis-compliance",
    name: "NDIS Compliance Suite",
    category: "Healthcare",
    description: "AI-powered NDIS compliance and plan variation management. Streamlines participant plans, automates compliance checks, and generates regulatory documentation.",
    image: "https://images.unsplash.com/photo-1761234852163-23f2ededd04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwc3VwcG9ydCUyMGNhcmluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM1ODk2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Heart,
    accent: "#EC4899",
    tags: ["NDIS", "Plan Variations", "Compliance"],
    featured: false,
  },
  {
    id: "cultural-heritage",
    name: "Cultural Heritage Package",
    category: "EdTech",
    description: "Digital platform preserving and teaching indigenous cultural heritage. AI-curated learning journeys, interactive cultural experiences, and progress tracking for communities.",
    image: "https://images.unsplash.com/photo-1772945858746-e10be2d90613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMGFib3JpZ2luYWwlMjBhcnR8ZW58MXx8fHwxNzczNTg5NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Palette,
    accent: "#D97706",
    tags: ["Cultural AI", "Heritage", "Community"],
    featured: false,
  },
  {
    id: "etgo",
    name: "ETGO Platform",
    category: "EdTech",
    description: "EdTech Group's AI-powered teaching content platform. Generates curriculum-aligned resources, lesson plans, and assessment materials with intelligent content adaptation.",
    image: "https://images.unsplash.com/photo-1608600712992-03e5325d94c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVhY2hpbmclMjBjb250ZW50JTIwcGxhdGZvcm0lMjBlZHVjYXRpb258ZW58MXx8fHwxNzczNTg5NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: BookOpen,
    accent: "#14B8A6",
    tags: ["Content Gen", "Curriculum", "EdTech Group"],
    featured: false,
  },
  {
    id: "kist",
    name: "KIST",
    category: "Infrastructure",
    description: "Kazacos AI's Intelligence System Toolkit — a unified multi-LLM orchestration layer. Routes between OpenAI, Claude, Gemini, and Grok for optimal cost, speed, and accuracy.",
    image: "https://images.unsplash.com/photo-1770233621425-5d9ee7a0a700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdG9vbGtpdCUyMG5ldXJhbCUyMG5ldHdvcmslMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzM1ODk2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Brain,
    accent: "#2563EB",
    tags: ["Multi-LLM", "Orchestration", "API"],
    featured: true,
  },
  {
    id: "robotics",
    name: "KazGard Robotics",
    category: "Research",
    description: "AI-powered robotics research division. Developing autonomous systems with advanced computer vision, reinforcement learning, and real-time decision-making capabilities.",
    image: "https://images.unsplash.com/photo-1768323275769-6615e7cfcbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMEFJJTIwYXV0b21hdGlvbiUyMGluZHVzdHJpYWwlMjByb2JvdCUyMGFybXxlbnwxfHx8fDE3NzM1ODk2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Bot,
    accent: "#6366F1",
    tags: ["Robotics", "Computer Vision", "RL"],
    featured: true,
  },
];

const categories = ["All", "EdTech", "Compliance", "Enterprise", "Healthcare", "Infrastructure", "Research"];

const ProjectCard = forwardRef<HTMLDivElement, { project: typeof projects[0]; index: number; onSelect: () => void }>(
  function ProjectCard({ project, index, onSelect }, forwardedRef) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const Icon = project.icon;

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(900px) rotateX(${(y - 0.5) * -5}deg) rotateY(${(x - 0.5) * 5}deg) scale3d(1.02,1.02,1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.08 });
  };

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={forwardedRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ transform, transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-[220px] sm:h-[260px] overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/10" />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 50%)` }}
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-2.5 py-1 rounded-full text-white/70 border backdrop-blur-md"
            style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", borderColor: `${project.accent}30`, backgroundColor: `${project.accent}15` }}
          >
            {project.category}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span
              className="px-2 py-1 rounded-full border backdrop-blur-md"
              style={{ fontSize: "8px", letterSpacing: "1px", textTransform: "uppercase", borderColor: "#2563EB40", backgroundColor: "#2563EB15", color: "#2563EB" }}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center border"
                style={{ borderColor: `${project.accent}25`, backgroundColor: `${project.accent}10` }}
              >
                <Icon size={13} style={{ color: project.accent }} />
              </div>
              <h3 className="text-white truncate" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "18px" }}>
                {project.name}
              </h3>
            </div>
            <p
              className="text-white/35 line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700"
              style={{ fontSize: "13px", lineHeight: "1.7", fontWeight: 300 }}
            >
              {project.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-white/25 border border-white/[0.06] rounded-md px-2 py-0.5 bg-white/[0.02]"
                  style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shrink-0 backdrop-blur-sm">
            <ArrowUpRight size={14} className="text-white/50" />
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.04] group-hover:border-white/[0.08] transition-all duration-700" />
      {/* Hover gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 40%, ${project.accent}20 50%, transparent 60%)`,
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

/* ─── Project Detail Modal ─── */
function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-slate-200 bg-white backdrop-blur-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-[200px] sm:h-[280px] overflow-hidden">
          <ImageWithFallback src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ borderColor: `${project.accent}25`, backgroundColor: `${project.accent}10` }}
            >
              <Icon size={18} style={{ color: project.accent }} />
            </div>
            <div>
              <h3 className="text-[#0F172A]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "24px" }}>
                {project.name}
              </h3>
              <span className="text-slate-400 uppercase" style={{ fontSize: "10px", letterSpacing: "2px" }}>
                {project.category}
              </span>
            </div>
          </div>

          <p className="text-slate-500 mb-6" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-slate-500 border border-slate-100 rounded-lg px-3 py-1.5 bg-slate-50"
                style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="bg-white py-36 sm:py-52 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 left-[-200px] w-[600px] h-[600px] bg-[#2563EB]/[0.02] rounded-full blur-[250px]" />
      <div className="absolute bottom-1/4 right-[-150px] w-[500px] h-[500px] bg-[#8B5CF6]/[0.015] rounded-full blur-[200px]" />

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
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Portfolio</span>
        </motion.div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#0F172A]"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
          >
            Shaping industries
            <br />
            with <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 max-w-[420px] lg:text-right lg:ml-auto"
            style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}
          >
            From education to enterprise compliance, healthcare to robotics — our AI solutions
            are deployed across Australia's most critical sectors.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-14"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full border transition-all duration-500"
              style={{
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase" as const,
                fontFamily: "'Inter', sans-serif",
                borderColor: filter === cat ? "#2563EB30" : "rgba(0,0,0,0.06)",
                backgroundColor: filter === cat ? "#2563EB08" : "rgba(0,0,0,0.01)",
                color: filter === cat ? "#2563EB" : "rgba(15,23,42,0.45)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="text-slate-400" style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
          <div className="flex-1 h-px bg-slate-100" />
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onSelect={() => setSelectedProject(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}