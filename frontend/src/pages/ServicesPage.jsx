import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  Sprout,
  Search,
  BarChart3,
  ChevronRight,
  Home,
} from "lucide-react";
import SoilAnalysis from "./SoilAnalysis";
import DiseasePrediction from "./DiseasePrediction";
import YieldPrediction from "./YieldPrediction";

const sidebarItems = [
  {
    key: "soil-analysis",
    title: "Crop Suggestion",
    subtitle: "Kaunsi Fasal Ugayen?",
    tag: "Soil Analysis",
    icon: Sprout,
    emoji: "🌱",
    accent: "#40916C",
    desc: "Apni mitti ki jaankaari dein aur pata karein ki aapke khet mein kaunsi fasal sabse acchi ugegi.",
    descEn: "Tell us about your soil. Find out which crop grows best in your field.",
    steps: ["Soil nutrients (N-P-K)", "pH level & moisture", "Temperature & rainfall"],
  },
  {
    key: "disease-prediction",
    title: "Disease Check",
    subtitle: "Patte ki Bimari Pakdein",
    tag: "Image AI",
    icon: Search,
    emoji: "🔬",
    accent: "#E76F51",
    desc: "Fasal ke patte ki photo khenchein — AI turant bata dega ki kya bimari hai aur kaise theek karein.",
    descEn: "Take a photo of your crop leaf. AI will instantly tell what disease it has and how to cure it.",
    steps: ["Upload leaf photo", "Instant diagnosis", "Treatment in plain language"],
  },
  {
    key: "yield-prediction",
    title: "Yield Forecast",
    subtitle: "Kitni Paidawar Hogi?",
    tag: "Analytics",
    icon: BarChart3,
    emoji: "📊",
    accent: "#F4A261",
    desc: "Apni fasal, mausam aur khet ka hisaab dein — pata karein kitni paidawar expect kar sakte hain.",
    descEn: "Enter crop, season & field info. Get AI-powered harvest estimate before you invest.",
    steps: ["Crop & season", "Input cost analysis", "Harvest quantity forecast"],
  },
];

const serviceComponents = {
  "soil-analysis": SoilAnalysis,
  "disease-prediction": DiseasePrediction,
  "yield-prediction": YieldPrediction,
};

/* ─── Sidebar Button (Desktop) ─── */
const SidebarItem = ({ item, isActive, onSelect }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onSelect(item.key)}
      className="w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-200"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${item.accent}16, ${item.accent}08)`
          : "white",
        border: isActive
          ? `2px solid ${item.accent}50`
          : "2px solid rgba(64,145,108,0.10)",
        boxShadow: isActive
          ? `0 4px 16px ${item.accent}20`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200"
        style={{
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}35`,
          transform: isActive ? "scale(1.08)" : "none",
        }}
      >
        <Icon className="w-6 h-6" style={{ color: item.accent }} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>
            {item.emoji} {item.title}
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
            style={{ background: `${item.accent}20`, color: item.accent }}
          >
            {item.tag}
          </span>
        </div>
        <p className="text-[11px] font-semibold mb-1" style={{ color: item.accent }}>
          {item.subtitle}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#6B8F6E" }}>
          {item.descEn}
        </p>
      </div>
      {isActive && (
        <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: item.accent }} />
      )}
    </button>
  );
};

/* ─── Welcome Screen (shown when no service selected) ─── */
const WelcomeScreen = ({ onSelect }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
    <div
      className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 animate-bounce-gentle"
      style={{
        background: "linear-gradient(135deg, rgba(64,145,108,0.12), rgba(82,183,136,0.08))",
        border: "2px dashed rgba(64,145,108,0.25)",
      }}
    >
      🌾
    </div>
    <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#1A2E1A" }}>
      Namaste, Kisan! 🙏
    </h2>
    <p className="text-base font-semibold mb-1" style={{ color: "#40916C" }}>
      Welcome to KrishiConnect AI Services
    </p>
    <p className="text-sm max-w-md mb-8 leading-relaxed" style={{ color: "#6B8F6E" }}>
      Choose any service below to get started. All tools are free and easy to use —
      no technical knowledge required.
    </p>

    {/* Quick action cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
      {sidebarItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 active:scale-95"
          style={{
            background: "white",
            border: `2px solid ${item.accent}25`,
            boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 12px 32px ${item.accent}25`;
            e.currentTarget.style.border = `2px solid ${item.accent}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,106,79,0.08)";
            e.currentTarget.style.border = `2px solid ${item.accent}25`;
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}
          >
            {item.emoji}
          </div>
          <div>
            <div className="text-sm font-extrabold mb-0.5" style={{ color: "#1A2E1A" }}>
              {item.title}
            </div>
            <div className="text-[11px] font-medium" style={{ color: item.accent }}>
              {item.subtitle}
            </div>
          </div>
        </button>
      ))}
    </div>

    {/* How it works */}
    <div
      className="mt-10 w-full max-w-xl rounded-2xl p-5 text-left"
      style={{ background: "rgba(64,145,108,0.06)", border: "1px solid rgba(64,145,108,0.15)" }}
    >
      <p className="text-sm font-bold mb-3" style={{ color: "#1A2E1A" }}>
        📌 How to use:
      </p>
      <ol className="space-y-2">
        {[
          "Click on any service card above (Crop Suggestion / Disease Check / Yield Forecast)",
          "Fill in the simple form with your field details",
          "Click 'Get Result' — AI gives you answer in seconds!",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#5A7A5E" }}>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: "#40916C", color: "white" }}
            >
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

/* ─── Mobile Bottom Tab Bar ─── */
const MobileTabBar = ({ active, onSelect }) => (
  <div
    className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    style={{
      background: "rgba(27,67,50,0.97)",
      borderTop: "1px solid rgba(82,183,136,0.2)",
      backdropFilter: "blur(20px)",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}
  >
    <div className="flex items-stretch">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-200 active:scale-95"
            style={{
              color: isActive ? item.accent : "rgba(255,255,255,0.45)",
              borderTop: isActive ? `2px solid ${item.accent}` : "2px solid transparent",
              background: isActive ? `${item.accent}12` : "transparent",
            }}
          >
            <span className="text-lg">{item.emoji}</span>
            <span
              className="text-[9px] font-bold leading-tight text-center"
              style={{ maxWidth: 60 }}
            >
              {item.title}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ─── Main ServicesPage ─── */
const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);

  const ActiveComponent = activeService ? serviceComponents[activeService] : null;
  const activeItem = sidebarItems.find((i) => i.key === activeService);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F8F5F0" }}
    >
      {/* ── Top Header Bar ── */}
      <div
        className="sticky top-0 z-30 backdrop-blur-xl border-b"
        style={{
          background: "rgba(27, 67, 50, 0.97)",
          borderColor: "rgba(82,183,136,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: back + logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}
                >
                  <Leaf className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-white leading-tight">
                    Krishi<span style={{ color: "#F4A261" }}>Connect</span>
                  </h1>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block"
                    style={{ color: "#74C69D" }}
                  >
                    AI Services
                  </p>
                </div>
              </div>

              {/* Breadcrumb on desktop */}
              {activeItem && (
                <div className="hidden sm:flex items-center gap-1.5 ml-2">
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {activeItem.emoji} {activeItem.title}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Home button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 pb-20 lg:pb-6">

        {/* Desktop Sidebar */}
        <div
          className="hidden lg:flex flex-col gap-3 flex-shrink-0"
          style={{ width: 288 }}
        >
          {/* Sidebar header */}
          <div
            className="px-4 py-3 rounded-2xl"
            style={{ background: "white", border: "1px solid rgba(64,145,108,0.12)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#40916C" }}>
              🌾 AI Services
            </p>
            <p className="text-xs" style={{ color: "#6B8F6E" }}>
              Choose a service to get started
            </p>
          </div>

          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              isActive={activeService === item.key}
              onSelect={setActiveService}
            />
          ))}

          {/* Help box */}
          <div
            className="mt-2 p-4 rounded-2xl"
            style={{ background: "rgba(64,145,108,0.06)", border: "1px solid rgba(64,145,108,0.15)" }}
          >
            <p className="text-xs font-bold mb-1.5" style={{ color: "#1A2E1A" }}>
              💡 Need Help?
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: "#6B8F6E" }}>
              All fields have hints. If stuck, use the AI Chat button on the home page.
            </p>
          </div>
        </div>

        {/* Mobile: service selector strip (when no service selected) */}
        {!activeService && (
          <div className="lg:hidden">
            {/* Mobile service cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveService(item.key)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl active:scale-95 transition-all"
                  style={{
                    background: "white",
                    border: `2px solid ${item.accent}25`,
                    boxShadow: "0 2px 8px rgba(45,106,79,0.06)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}
                  >
                    {item.emoji}
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-center leading-tight" style={{ color: "#1A2E1A" }}>
                      {item.title}
                    </div>
                    <div className="text-[9px] font-medium text-center leading-tight mt-0.5" style={{ color: item.accent }}>
                      {item.subtitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {ActiveComponent ? (
            <>
              {/* Mobile: back to services button */}
              <button
                onClick={() => setActiveService(null)}
                className="lg:hidden flex items-center gap-1.5 text-sm font-semibold mb-3 transition-all active:scale-95"
                style={{ color: "#40916C" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </button>

              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "white",
                  boxShadow: "0 4px 24px rgba(45,106,79,0.08)",
                  border: "1px solid rgba(64,145,108,0.1)",
                }}
              >
                <ActiveComponent />
              </div>
            </>
          ) : (
            <WelcomeScreen onSelect={setActiveService} />
          )}
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar active={activeService} onSelect={setActiveService} />
    </div>
  );
};

export default ServicesPage;
