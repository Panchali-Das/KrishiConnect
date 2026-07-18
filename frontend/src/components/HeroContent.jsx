import { ArrowRight, Compass, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: Sprout,      value: "22+",     label: "Crops Covered" },
];

const HeroContent = ({ scrollToSection }) => {
  const navigate = useNavigate();

  return (
    <div className="text-white max-w-2xl space-y-7 animate-fade-in-up">
      {/* AI Badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
        style={{
          background: "rgba(244,162,97,0.15)",
          border: "1px solid rgba(244,162,97,0.35)",
          color: "#EFBA6B",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ background: "#F4A261" }} />
        🌾 AI Powered Smart Farming Platform
      </div>

      {/* Main Title */}
      <h1 className="text-5xl lg:text-[62px] font-extrabold tracking-tight leading-[1.1] text-white">
        Smart Farming
        <br />
        for a{" "}
        <span
          className="inline-block"
          style={{
            background: "linear-gradient(90deg, #74C69D, #F4A261, #52B788)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientTravel 3s ease infinite",
          }}
        >
          Greener
        </span>{" "}
        Future
        <style>{`
          @keyframes gradientTravel {
            0%, 100% { background-position: 0% 50%; }
            50%       { background-position: 100% 50%; }
          }
        `}</style>
      </h1>

      {/* Subtitle */}
      <p className="text-lg leading-relaxed font-normal max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
        Get AI crop recommendations, detect plant diseases instantly, and
        predict your yield — all designed to be simple for every farmer.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          id="hero-get-started-btn"
          onClick={() => navigate("/login")}
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #F4A261, #E76F51)",
            color: "#1B4332",
            boxShadow: "0 8px 32px rgba(244,162,97,0.45)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(244,162,97,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(244,162,97,0.45)"; }}
        >
          Get Started Free
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        <button
          id="hero-explore-btn"
          onClick={() => scrollToSection("services-section", "services")}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 active:scale-[0.98]"
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = ""; }}
        >
          <Compass size={18} style={{ color: "#74C69D" }} />
          Explore Features
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-6 pt-2">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(82,183,136,0.18)", border: "1px solid rgba(82,183,136,0.3)" }}
            >
              <Icon className="w-5 h-5" style={{ color: "#74C69D" }} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white leading-tight">{value}</div>
              <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
