import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Sprout,
  ShieldCheck,
  CloudSun,
  ChevronDown,
} from "lucide-react";

const HeroCard = () => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const metrics = [
    { icon: Thermometer, emoji: "🌡️", label: "Temperature", sub: "Current",     value: "28°C",       color: "#F4A261", bg: "rgba(244,162,97,0.12)", border: "rgba(244,162,97,0.25)" },
    { icon: Droplets,    emoji: "💧", label: "Humidity",    sub: "Current",     value: "72%",        color: "#52B788", bg: "rgba(82,183,136,0.12)", border: "rgba(82,183,136,0.25)" },
    { icon: Sprout,      emoji: "🌱", label: "Soil Health", sub: "AI Analysis", value: "Excellent",  color: "#74C69D", bg: "rgba(116,198,157,0.12)", border: "rgba(116,198,157,0.25)", badge: true },
    { icon: ShieldCheck, emoji: "🛡️", label: "Disease Risk",sub: "AI Predict",  value: "Low",        color: "#74C69D", bg: "rgba(116,198,157,0.12)", border: "rgba(116,198,157,0.25)", badge: true },
  ];

  return (
    <div className="hidden lg:block absolute inset-x-0 top-28 xl:top-32 z-30 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
        <div ref={cardRef} className="pointer-events-auto">
          <div
            className="w-[310px] rounded-2xl p-4 text-white"
            style={{
              background: "rgba(27, 67, 50, 0.75)",
              border: "1px solid rgba(82,183,136,0.25)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 64px rgba(27,67,50,0.45)",
            }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between ${open ? "pb-3 mb-3.5" : ""}`} style={{ borderBottom: open ? "1px solid rgba(82,183,136,0.18)" : "none" }}>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base">🌾</span>
                  <h2 className="text-sm font-bold text-white/90 tracking-wide">AI Farm Dashboard</h2>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#52B788" }} />
                  <p className="text-[10px] font-medium" style={{ color: "#74C69D" }}>Live metrics</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="flex items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200"
                style={{
                  background: "rgba(244,162,97,0.15)",
                  border: "1px solid rgba(244,162,97,0.3)",
                  color: "#F4A261",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,162,97,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(244,162,97,0.15)"; }}
              >
                <CloudSun size={18} />
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            </div>

            {/* Animated metrics panel */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="metrics"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    {metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center rounded-xl p-2.5 transition-all duration-200"
                        style={{ background: m.bg, border: `1px solid ${m.border}` }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{m.emoji}</span>
                          <div>
                            <h4 className="text-xs font-semibold text-white/90">{m.label}</h4>
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{m.sub}</p>
                          </div>
                        </div>
                        {m.badge ? (
                          <span
                            className="text-[10px] font-bold px-2 py-1 rounded-full"
                            style={{ background: "rgba(82,183,136,0.2)", color: "#74C69D", border: "1px solid rgba(82,183,136,0.3)" }}
                          >
                            {m.value}
                          </span>
                        ) : (
                          <span className="text-sm font-bold" style={{ color: m.color }}>{m.value}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* AI Recommendation */}
                  <div
                    className="mt-3 rounded-xl p-3 text-center"
                    style={{ background: "rgba(244,162,97,0.1)", border: "1px solid rgba(244,162,97,0.2)" }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#F4A261" }}>
                      🤖 AI Recommendation
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      Continue Irrigation Tomorrow
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed teaser */}
            {!open && (
              <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span>Tap</span>
                <span style={{ color: "#F4A261" }}>☀️</span>
                <span>to view live farm metrics</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
