import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, RotateCcw, Copy, Check, ChevronRight, Terminal, Zap } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; isStreaming?: boolean; }

const presetPrompts = [
  { label: "Explain quantum computing", icon: "⚛️", prompt: "Explain quantum computing to a software engineer in 3 sentences." },
  { label: "Write Python code", icon: "🐍", prompt: "Write a Python function that implements binary search with type hints." },
  { label: "Analyse 50M rows", icon: "📊", prompt: "I have a CSV with 50M rows of customer transactions. Suggest an optimal approach for anomaly detection." },
  { label: "Translate to Japanese", icon: "🌏", prompt: "Translate the following to Japanese: 'The future of intelligence is autonomous, adaptive, and human-aligned.'" },
];

const simulatedResponses: Record<string, string> = {
  "Explain quantum computing to a software engineer in 3 sentences.":
    "Quantum computing leverages qubits that exist in superposition — simultaneously 0 and 1 — enabling parallel exploration of solution spaces that classical bits cannot. For a software engineer, think of it as replacing serial loops with massive parallelism at the hardware level, where entanglement between qubits creates correlated state that propagates computation exponentially. The practical implication: problems like molecular simulation, cryptographic factoring, and certain optimisation tasks that take classical computers millennia can be solved in hours.",
  "Write a Python function that implements binary search with type hints.":
    'def binary_search(arr: list[int], target: int) -> int:\n    """Return index of target in sorted arr, or -1 if not found."""\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    \n    return -1\n\n# Time: O(log n) · Space: O(1)',
  "I have a CSV with 50M rows of customer transactions. Suggest an optimal approach for anomaly detection.":
    "For 50M transaction rows, I recommend a three-stage pipeline:\n\n→ Stage 1 — Feature Engineering (Spark/Polars)\nCompute rolling aggregates per customer: mean transaction value, frequency, geographic entropy.\n\n→ Stage 2 — Unsupervised Detection\nIsolation Forest + deep autoencoder ensemble. Ensemble reduces false positives by ~40%.\n\n→ Stage 3 — Real-time Scoring\nDeploy on KazGard Cloud with sub-50ms inference.\n\nExpected: >94% precision at 98% recall.",
  "Translate the following to Japanese: 'The future of intelligence is autonomous, adaptive, and human-aligned.'":
    "知能の未来は、自律的で、適応的で、人間と調和するものである。\n\n(Chinō no mirai wa, jiritsu-teki de, tekiō-teki de, ningen to chōwa suru mono de aru.)\n\n→ 自律的 — autonomous\n→ 適応的 — adaptive\n→ 人間と調和する — aligned with humans",
};

const defaultResponse = "I've analysed your request using KazGard Foundation (70B). The query involves multi-step reasoning across several knowledge domains.\n\nFor production deployment, consider our Enterprise Platform for dedicated inference with guaranteed sub-50ms latency and full data sovereignty.";

export function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModel, setActiveModel] = useState("KazGard-70B");
  const [tokenCount, setTokenCount] = useState(0);
  const [latency, setLatency] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamTimeoutRef = useRef<number[]>([]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const clearTimeouts = () => { streamTimeoutRef.current.forEach(clearTimeout); streamTimeoutRef.current = []; };

  const simulateStream = useCallback((text: string) => {
    setIsThinking(true);
    const startTime = Date.now();
    const thinkDelay = 500 + Math.random() * 400;
    const tid1 = window.setTimeout(() => {
      setIsThinking(false); setIsStreaming(true);
      setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);
      let charIndex = 0;
      const streamChar = () => {
        if (charIndex >= text.length) {
          setIsStreaming(false); setLatency(Date.now() - startTime);
          setTokenCount((prev) => prev + Math.ceil(text.length / 4));
          setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, isStreaming: false } : m)));
          return;
        }
        const end = Math.min(charIndex + 2 + Math.floor(Math.random() * 4), text.length);
        charIndex = end;
        setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: text.slice(0, end) } : m)));
        const tid = window.setTimeout(streamChar, 6 + Math.random() * 12);
        streamTimeoutRef.current.push(tid);
      };
      streamChar();
    }, thinkDelay);
    streamTimeoutRef.current.push(tid1);
  }, []);

  const handleSend = useCallback((text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming || isThinking) return;
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    simulateStream(simulatedResponses[msg] || defaultResponse);
  }, [input, isStreaming, isThinking, simulateStream]);

  const handleReset = () => { clearTimeouts(); setMessages([]); setIsStreaming(false); setIsThinking(false); setTokenCount(0); setLatency(0); };

  const handleCopy = () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (last) { navigator.clipboard.writeText(last.content); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <section id="playground" className="bg-[#FAFAFA] py-36 sm:py-52 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#2563EB]/[0.03] rounded-full blur-[300px]" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-20">
          <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-transparent" />
          <span className="text-slate-400 uppercase" style={{ fontSize: "11px", letterSpacing: "4px" }}>Interactive Demo</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-[#0F172A] mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
              Experience the<br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent" style={{ fontStyle: "italic" }}>intelligence</span>
            </h2>
            <p className="text-slate-500 max-w-[400px] mb-14" style={{ fontSize: "15px", lineHeight: "1.9", fontWeight: 400 }}>
              Interact with KazGard Foundation directly. Choose a prompt or write your own — watch intelligence unfold.
            </p>

            <div className="space-y-3">
              {presetPrompts.map((p, i) => (
                <motion.button key={p.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 + i * 0.05 }}
                  onClick={() => handleSend(p.prompt)} disabled={isStreaming || isThinking}
                  className="group w-full flex items-center gap-4 px-5 py-4.5 rounded-xl border border-slate-150 bg-white hover:bg-[#2563EB]/[0.03] hover:border-[#2563EB]/20 disabled:opacity-30 transition-all duration-500 text-left shadow-sm"
                >
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <span className="text-slate-500 group-hover:text-slate-700 transition-colors flex-1" style={{ fontSize: "14px" }}>{p.label}</span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                </motion.button>
              ))}
            </div>

            {(latency > 0 || tokenCount > 0) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2"><Zap size={12} className="text-[#2563EB]/50" /><span className="text-slate-400" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>{latency}ms latency</span></div>
                <div className="flex items-center gap-2"><Terminal size={12} className="text-[#2563EB]/50" /><span className="text-slate-400" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>{tokenCount} tokens</span></div>
              </motion.div>
            )}
          </motion.div>

          {/* Terminal - keeping dark for contrast */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-[#0F172A] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#1E293B]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
                <div className="flex items-center gap-1.5 ml-3">
                  {["70B", "7B"].map((m) => (
                    <button key={m} onClick={() => setActiveModel(`KazGard-${m}`)}
                      className={`px-2.5 py-1 rounded-md transition-all duration-300 ${activeModel === `KazGard-${m}` ? "bg-[#2563EB]/20 text-[#60A5FA]" : "text-white/25 hover:text-white/45"}`}
                      style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>{m}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="text-white/25 hover:text-white/50 transition-colors p-1">{copied ? <Check size={13} /> : <Copy size={13} />}</button>
                <button onClick={handleReset} className="text-white/25 hover:text-white/50 transition-colors p-1"><RotateCcw size={13} /></button>
              </div>
            </div>

            <div className="h-[440px] overflow-y-auto px-5 py-5 space-y-5" style={{ scrollbarWidth: "none" }}>
              {messages.length === 0 && !isThinking && (
                <div className="h-full flex flex-col items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <Sparkles size={30} className="text-[#2563EB]/50" />
                  </motion.div>
                  <p className="text-white/20 mt-5" style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>Select a prompt to begin</p>
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[90%] ${msg.role === "user" ? "bg-[#2563EB]/15 border border-[#2563EB]/20 rounded-2xl rounded-br-sm px-4 py-3" : "px-1 py-0.5"}`}>
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 rounded-md bg-[#2563EB]/30 flex items-center justify-center">
                            <span style={{ fontSize: "8px", fontFamily: "'Playfair Display'" }} className="text-[#60A5FA]">K</span>
                          </div>
                          <span className="text-white/25" style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}>{activeModel}</span>
                        </div>
                      )}
                      <div className={`whitespace-pre-wrap ${msg.role === "user" ? "text-white/70" : "text-white/50"}`}
                        style={{ fontSize: "13px", lineHeight: "1.85", fontWeight: 300, fontFamily: msg.role === "assistant" ? "'JetBrains Mono', monospace" : "inherit" }}>
                        {msg.content}
                        {msg.isStreaming && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-[6px] h-[14px] bg-[#2563EB]/60 ml-0.5 align-middle rounded-sm" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isThinking && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 px-1">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (<motion.div key={d} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/50" />))}
                  </div>
                  <span className="text-white/25" style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>reasoning...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 px-5 py-3.5 bg-[#1E293B]/50">
              <div className="flex items-center gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..." disabled={isStreaming || isThinking}
                  className="flex-1 bg-transparent text-white/65 placeholder:text-white/20 outline-none disabled:opacity-30"
                  style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }} />
                <button onClick={() => handleSend()} disabled={!input.trim() || isStreaming || isThinking}
                  className="w-8 h-8 rounded-lg bg-[#2563EB]/30 hover:bg-[#2563EB]/50 disabled:opacity-15 flex items-center justify-center transition-all duration-300">
                  <Send size={12} className="text-[#60A5FA]" />
                </button>
              </div>
              <p className="text-white/12 mt-2" style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}>Simulated demo · Responses are pre-generated</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
