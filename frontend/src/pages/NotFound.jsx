import { useNavigate } from "react-router-dom";
import { Home, Leaf, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#F8F5F0" }}
    >
      {/* Top logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
          style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}
        >
          <Leaf className="w-5 h-5 text-white fill-white" />
        </div>
        <h2 className="text-xl font-bold" style={{ color: "#1A2E1A" }}>
          Krishi<span style={{ color: "#F4A261" }}>Connect</span>
        </h2>
      </div>

      {/* Big emoji */}
      <div
        className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl mb-6 animate-bounce-gentle"
        style={{
          background: "white",
          border: "2px dashed rgba(64,145,108,0.25)",
          boxShadow: "0 4px 24px rgba(45,106,79,0.08)",
        }}
      >
        🌾
      </div>

      {/* 404 badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
        style={{
          background: "rgba(244,162,97,0.12)",
          border: "1px solid rgba(244,162,97,0.3)",
          color: "#7C5C3A",
        }}
      >
        404 — Page Not Found
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: "#1A2E1A" }}>
        Yeh Raasta Galat Hai! 🙏
      </h1>
      <p className="text-base sm:text-lg max-w-md mb-2 leading-relaxed" style={{ color: "#6B8F6E" }}>
        Lagta hai aap galat page par aa gaye hain.
      </p>
      <p className="text-sm max-w-sm mb-8" style={{ color: "#9AB09D" }}>
        The page you are looking for does not exist or has been moved.
        Please go back to the home page.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #40916C, #2D6A4F)",
            color: "white",
            boxShadow: "0 8px 24px rgba(45,106,79,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(45,106,79,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,106,79,0.3)";
          }}
        >
          <Home className="w-4 h-4" />
          Go to Home Page
        </button>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: "white",
            color: "#40916C",
            border: "2px solid rgba(64,145,108,0.25)",
            boxShadow: "0 2px 12px rgba(45,106,79,0.06)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "2px solid rgba(64,145,108,0.5)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "2px solid rgba(64,145,108,0.25)";
            e.currentTarget.style.transform = "";
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>

      {/* Helpful links */}
      <div
        className="mt-10 p-5 rounded-2xl w-full max-w-sm"
        style={{ background: "white", border: "1px solid rgba(64,145,108,0.12)", boxShadow: "0 2px 16px rgba(45,106,79,0.06)" }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#40916C" }}>
          Quick Links
        </p>
        <div className="flex flex-col gap-2">
          {[
            { label: "🌱 Crop Suggestion", path: "/soil-analysis" },
            { label: "🔬 Disease Check", path: "/disease-prediction" },
            { label: "📊 Yield Forecast", path: "/yield-prediction" },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#F8F5F0", color: "#1A2E1A" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(64,145,108,0.08)";
                e.currentTarget.style.color = "#40916C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F8F5F0";
                e.currentTarget.style.color = "#1A2E1A";
              }}
            >
              {label}
              <span style={{ color: "#40916C", fontSize: 18 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
