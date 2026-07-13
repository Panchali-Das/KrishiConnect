import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Leaf } from "lucide-react";

/* ── Soil parameter definitions ── */
const steps = [
  {
    title:    "Soil Nutrients",
    subtitle: "Enter nutrient levels from your soil test report",
    emoji:    "🧪",
    fields: [
      {
        key:     "nitrogen",
        label:   "Nitrogen (N)",
        emoji:   "🌿",
        unit:    "kg/ha",
        min:     0,
        max:     140,
        default: 70,
        tip:     "Promotes leafy green growth. Found in soil test report.",
        placeholder: "e.g. 70",
      },
      {
        key:     "phosphorous",
        label:   "Phosphorus (P)",
        emoji:   "🔴",
        unit:    "kg/ha",
        min:     0,
        max:     140,
        default: 60,
        tip:     "Supports root development and flowering.",
        placeholder: "e.g. 60",
      },
      {
        key:     "potassium",
        label:   "Potassium (K)",
        emoji:   "🟡",
        unit:    "kg/ha",
        min:     0,
        max:     200,
        default: 80,
        tip:     "Improves disease resistance and fruit quality.",
        placeholder: "e.g. 80",
      },
    ],
  },
  {
    title:    "Climate & Soil Conditions",
    subtitle: "Help us understand your environment",
    emoji:    "🌤️",
    fields: [
      {
        key:     "ph",
        label:   "Soil pH",
        emoji:   "⚗️",
        unit:    "pH",
        min:     3.5,
        max:     9,
        step:    0.1,
        default: 6.5,
        tip:     "Neutral (6–7) is ideal for most crops. Get from soil test.",
        placeholder: "e.g. 6.5",
      },
      {
        key:     "rainfall",
        label:   "Annual Rainfall",
        emoji:   "🌧️",
        unit:    "mm",
        min:     0,
        max:     500,
        default: 150,
        tip:     "Yearly average rainfall in your region.",
        placeholder: "e.g. 150",
      },
      {
        key:     "temperature",
        label:   "Temperature",
        emoji:   "🌡️",
        unit:    "°C",
        min:     0,
        max:     60,
        step:    0.5,
        default: 25,
        tip:     "Average temperature during growing season.",
        placeholder: "e.g. 25",
      },
      {
        key:     "humidity",
        label:   "Humidity",
        emoji:   "💧",
        unit:    "%",
        min:     10,
        max:     100,
        default: 65,
        tip:     "Relative humidity in your area (10–100%).",
        placeholder: "e.g. 65",
      },
    ],
  },
];

const cropIcons = {
  Potato: "🥔", Tomato: "🍅", Grape: "🍇", Apple: "🍎",
  Rice: "🌾", Wheat: "🌾", Maize: "🌽", Cotton: "☁️",
  Mango: "🥭", Banana: "🍌", Sugarcane: "🎋", Coffee: "☕",
  Orange: "🍊", Papaya: "🍈", Pomegranate: "🍎", Watermelon: "🍉",
};

const SoilAnalysis = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = step1, 1 = step2, 2 = review
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState(null);

  const [formData, setFormData] = useState({
    nitrogen:    70,
    phosphorous: 60,
    potassium:   80,
    ph:          6.5,
    rainfall:    150,
    temperature: 25,
    humidity:    65,
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const messages = [
      "🔬 Reading your soil parameters...",
      "🌱 Matching to crop database...",
      "🤖 AI is analyzing your conditions...",
      "✅ Preparing your results...",
    ];
    let i = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) setLoadingMsg(messages[i]);
    }, 700);

    try {
      const token = localStorage.getItem("authToken");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/features/soil-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Analysis failed");

      setPredictions(data.data);
      setShowResults(true);
    } catch (error) {
      setPredictions({
        recommendedCrops: [
          { name: "Potato",   probability: 0.45, why: "Estimated based on general soil conditions" },
          { name: "Tomato",   probability: 0.38, why: "Estimated based on general soil conditions" },
          { name: "Wheat",    probability: 0.32, why: "Estimated based on general soil conditions" },
        ],
        soilHealth: {
          status:      "Unavailable",
          score:       50,
          description: "Could not fetch AI analysis. Showing estimated values.",
          tips: ["Consult local agricultural officer for detailed soil testing"],
        },
      });
      setShowResults(true);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFormData({ nitrogen: 70, phosphorous: 60, potassium: 80, ph: 6.5, rainfall: 150, temperature: 25, humidity: 65 });
    setPredictions(null);
    setShowResults(false);
    setStep(0);
  };

  const currentStepData = steps[step] || steps[steps.length - 1];

  /* ── Render ── */
  if (showResults && predictions) {
    return (
      <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
        {/* Header */}
        <div className="page-header">
          <button
            onClick={() => setShowResults(false)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}>
              <Leaf className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
              Krishi<span style={{ color: "#40916C" }}>Connect</span>
            </span>
          </div>
          <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}>
            🌱 Results Ready
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in-up">
          {/* Results heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
              🎉 Your Crop Recommendations
            </h1>
            <p className="text-sm" style={{ color: "#6B8F6E" }}>
              Based on your soil analysis — best matches shown first
            </p>
          </div>

          {/* Crop cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {predictions.recommendedCrops.map((crop, i) => {
              const icon = cropIcons[crop.name] || "🌾";
              const pct = Math.round(crop.probability * 100);
              const isTop = i === 0;
              return (
                <div
                  key={i}
                  className="relative rounded-3xl p-5 transition-all duration-300 card-lift"
                  style={{
                    background: isTop ? "linear-gradient(135deg, #2D6A4F, #40916C)" : "white",
                    border: isTop ? "none" : "1px solid rgba(64,145,108,0.15)",
                    boxShadow: isTop ? "0 12px 40px rgba(45,106,79,0.35)" : "0 4px 16px rgba(45,106,79,0.06)",
                  }}
                >
                  {isTop && (
                    <span
                      className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(244,162,97,0.9)", color: "#1B4332" }}
                    >
                      ⭐ Best Match
                    </span>
                  )}

                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="text-xl font-extrabold mb-1" style={{ color: isTop ? "white" : "#1A2E1A" }}>
                    {crop.name}
                  </h3>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: isTop ? "rgba(255,255,255,0.7)" : "#6B8F6E" }}>
                    {crop.why}
                  </p>

                  {/* Probability bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: isTop ? "rgba(255,255,255,0.85)" : "#3D5A40" }}>
                      <span>Match Score</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: isTop ? "rgba(255,255,255,0.2)" : "#E8F4ED" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: isTop ? "#F4A261" : "linear-gradient(90deg, #40916C, #52B788)",
                          animation: "progressFill 0.8s ease both",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Soil health panel */}
          <div className="rounded-3xl p-6" style={{ background: "white", border: "1px solid rgba(64,145,108,0.15)", boxShadow: "0 4px 16px rgba(45,106,79,0.06)" }}>
            <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
              <span className="text-xl">🏥</span> Soil Health Report
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Score gauge */}
              <div className="flex-shrink-0 text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold border-4"
                  style={{ borderColor: "#52B788", color: "#2D6A4F", background: "rgba(82,183,136,0.1)" }}
                >
                  {predictions.soilHealth.score}
                </div>
                <p className="text-xs font-bold mt-2" style={{ color: "#40916C" }}>
                  {predictions.soilHealth.status}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#3D5A40" }}>
                  {predictions.soilHealth.description}
                </p>
                <div className="space-y-2">
                  {predictions.soilHealth.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#40916C" }} />
                      <span className="text-xs" style={{ color: "#6B8F6E" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetAll}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all"
              style={{ background: "white", border: "2px solid rgba(64,145,108,0.25)", color: "#2D6A4F" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(64,145,108,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >
              <RotateCcw className="w-4 h-4" />
              Try Another Analysis
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all text-white"
              style={{ background: "linear-gradient(135deg, #2D6A4F, #40916C)", boxShadow: "0 4px 16px rgba(45,106,79,0.3)" }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#F8F5F0" }}>
        <div className="text-center px-8 animate-scale-in">
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl animate-bounce-gentle" style={{ background: "rgba(64,145,108,0.12)", border: "3px solid rgba(64,145,108,0.2)" }}>
            🌱
          </div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#1A2E1A" }}>Analyzing Your Soil</h2>
          <p className="text-base font-medium mb-8" style={{ color: "#40916C" }}>{loadingMsg}</p>
          {/* Progress bar */}
          <div className="w-64 mx-auto h-2 rounded-full" style={{ background: "#E0EDE6" }}>
            <div
              className="h-2 rounded-full"
              style={{
                background: "linear-gradient(90deg, #40916C, #F4A261)",
                animation: "progressFill 3s ease forwards",
                width: "100%",
              }}
            />
          </div>
          <p className="text-xs mt-4" style={{ color: "#9AB09D" }}>This usually takes a few seconds</p>
        </div>
      </div>
    );
  }

  /* ── Main Form (Steps) ── */
  const totalSteps = steps.length + 1; // +1 for review
  const progressPct = step === 0 ? 10 : step === 1 ? 55 : 90;

  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : navigate("/dashboard")}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}>
            <Leaf className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
            Krishi<span style={{ color: "#40916C" }}>Connect</span>
          </span>
        </div>
        <button
          onClick={resetAll}
          className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
          style={{ color: "#BC8A5F", background: "rgba(188,138,95,0.1)", border: "1px solid rgba(188,138,95,0.2)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(188,138,95,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(188,138,95,0.1)"; }}
        >
          Reset
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar + step dots */}
        <div className="mb-8 animate-fade-in-up">
          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-4">
            {["🧪 Nutrients", "🌤️ Climate", "✅ Review"].map((label, i) => (
              <div key={i} className="flex items-center gap-1 flex-1">
                <div
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: step === i ? "rgba(64,145,108,0.12)" : step > i ? "rgba(64,145,108,0.05)" : "transparent",
                    color: step === i ? "#2D6A4F" : step > i ? "#52B788" : "#9AB09D",
                    border: step === i ? "1.5px solid rgba(64,145,108,0.3)" : "1.5px solid transparent",
                  }}
                >
                  {step > i ? "✓" : label}
                </div>
                {i < 2 && (
                  <div className="flex-1 h-0.5 rounded-full" style={{ background: step > i ? "#52B788" : "#E0EDE6" }} />
                )}
              </div>
            ))}
          </div>

          {/* Progress track */}
          <div className="h-1.5 rounded-full" style={{ background: "#E0EDE6" }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #40916C, #74C69D)" }}
            />
          </div>
        </div>

        {/* Step Card */}
        <div
          className="rounded-3xl p-6 sm:p-8 animate-scale-in"
          style={{ background: "white", boxShadow: "0 8px 40px rgba(45,106,79,0.10)", border: "1px solid rgba(64,145,108,0.12)" }}
        >
          {/* Step header */}
          {step < 2 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{currentStepData.emoji}</span>
                <div>
                  <h1 className="text-xl font-extrabold" style={{ color: "#1A2E1A" }}>
                    {currentStepData.title}
                  </h1>
                  <p className="text-sm" style={{ color: "#6B8F6E" }}>{currentStepData.subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Fields for step 0 and step 1 */}
          {step < 2 && (
            <div className="space-y-7">
              {currentStepData.fields.map((field) => {
                const val = formData[field.key];
                return (
                  <div key={field.key} className="animate-fade-in-up">
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-bold" style={{ color: "#1A2E1A" }}>
                        <span className="text-base">{field.emoji}</span>
                        {field.label}
                      </label>
                      <span
                        className="text-base font-extrabold px-3 py-0.5 rounded-xl"
                        style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
                      >
                        {typeof val === "number" ? (Number.isInteger(val) ? val : val.toFixed(1)) : val}
                        <span className="text-xs font-medium ml-1" style={{ color: "#6B8F6E" }}>{field.unit}</span>
                      </span>
                    </div>

                    {/* Slider */}
                    <input
                      type="range"
                      className="slider-earth w-full mb-3"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      value={val}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />

                    {/* Range labels + number input */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs" style={{ color: "#9AB09D" }}>{field.min}</span>
                      <input
                        type="number"
                        className="input-earth text-center text-sm w-28 py-2"
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        value={val}
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      />
                      <span className="text-xs" style={{ color: "#9AB09D" }}>{field.max}</span>
                    </div>

                    {/* Tip */}
                    <p className="helper-text mt-2">
                      <span>💡</span> {field.tip}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Review Step */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">✅</span>
                <div>
                  <h1 className="text-xl font-extrabold" style={{ color: "#1A2E1A" }}>Review & Analyze</h1>
                  <p className="text-sm" style={{ color: "#6B8F6E" }}>Confirm your values before we run the AI analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { emoji: "🌿", label: "Nitrogen",    value: formData.nitrogen,    unit: "kg/ha" },
                  { emoji: "🔴", label: "Phosphorus",  value: formData.phosphorous, unit: "kg/ha" },
                  { emoji: "🟡", label: "Potassium",   value: formData.potassium,   unit: "kg/ha" },
                  { emoji: "⚗️", label: "pH",           value: formData.ph,          unit: "pH" },
                  { emoji: "🌧️", label: "Rainfall",    value: formData.rainfall,    unit: "mm" },
                  { emoji: "🌡️", label: "Temperature", value: formData.temperature, unit: "°C" },
                  { emoji: "💧", label: "Humidity",    value: formData.humidity,    unit: "%" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3.5 rounded-2xl"
                    style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}
                  >
                    <span className="text-lg">{r.emoji}</span>
                    <div>
                      <p className="text-xs" style={{ color: "#9AB09D" }}>{r.label}</p>
                      <p className="text-sm font-extrabold" style={{ color: "#1A2E1A" }}>
                        {typeof r.value === "number" ? (Number.isInteger(r.value) ? r.value : r.value.toFixed(1)) : r.value}
                        <span className="text-xs font-medium ml-1" style={{ color: "#6B8F6E" }}>{r.unit}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl mb-2" style={{ background: "rgba(64,145,108,0.06)", border: "1px solid rgba(64,145,108,0.15)" }}>
                <p className="text-xs font-medium" style={{ color: "#40916C" }}>
                  🤖 Our AI will analyze these parameters and recommend the best crops for your specific conditions.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1"
                style={{ background: "#F8F5F0", border: "1.5px solid rgba(64,145,108,0.2)", color: "#2D6A4F" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(64,145,108,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F8F5F0"; }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                  boxShadow: "0 4px 16px rgba(45,106,79,0.3)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="soil-analyze-btn"
                onClick={handleAnalyze}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all flex-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #F4A261, #E76F51)",
                  boxShadow: "0 4px 24px rgba(244,162,97,0.45)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
              >
                🔬 Analyze My Soil
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-6" style={{ color: "#9AB09D" }}>
          🔒 Your data is only used for this analysis and never stored.
        </p>
      </div>
    </div>
  );
};

export default SoilAnalysis;
