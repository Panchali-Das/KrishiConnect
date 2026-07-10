import { useState, useEffect } from "react";
import { ArrowLeft, Leaf, X } from "lucide-react";
import { diseaseInfo } from "../data/diseaseDatabase";
import { useNavigate } from "react-router-dom";

const DiseasePrediction = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");
  const [diseaseDetails, setDiseaseDetails] = useState(null);
  const [geminiLoading, setGeminiLoading] = useState(false);

  // Crop → diseases mapping
  const cropDiseaseMap = Object.entries(diseaseInfo).reduce((acc, [key]) => {
    const [crop, diseaseRaw] = key.split("___");
    const diseaseName = diseaseRaw.replace(/_/g, " ");
    if (!acc[crop]) acc[crop] = [];
    acc[crop].push(diseaseName);
    return acc;
  }, {});

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setError("");
    setResult(null);
    setDiseaseDetails(null);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setDiseaseDetails(null);
    setError("");
  };

  // Fetch treatment from Gemini API — logic preserved exactly
  const fetchGeminiTreatment = async (disease) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const prompt = `Provide a concise description (1-2 sentences) of the plant disease "${disease}" and suggest exactly 3 bullet point treatments. Format the response as:\nDescription: [Your description]\nTreatments:\n- [Treatment 1]\n- [Treatment 2]\n- [Treatment 3]`;

    setGeminiLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (!response.ok) throw new Error(`Gemini API failed with status ${response.status}`);

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("No valid response from Gemini API");

      const descriptionMatch = text.match(/Description:\s*(.+?)(?=\nTreatments?:|$)/is);
      const treatmentsText = text.split(/Treatments?:/i)[1];

      const description = descriptionMatch ? descriptionMatch[1].trim() : "No description available.";

      let treatments = [];
      if (treatmentsText) {
        treatments = treatmentsText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("-") || /^\d+\./.test(line))
          .map((line) => line.replace(/^[-\d.]\s*/, "").trim())
          .filter((line) => line.length > 0);
      }

      if (treatments.length === 0) treatments = ["Consult a local agricultural expert for treatment options."];

      return { description, treatment: treatments };
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return {
        description: "Unable to fetch description.",
        treatment: ["Consult a local agricultural expert for treatment options."],
      };
    } finally {
      setGeminiLoading(false);
    }
  };

  const fetchLocalDiseaseInfo = (diseaseLabel) => {
    const localData = diseaseInfo[diseaseLabel];
    if (!localData) return { description: "No information available.", treatment: ["Consult a local agricultural expert."] };
    return { description: localData.description, treatment: localData.treatment };
  };

  // CNN model prediction — logic preserved exactly
  const handleAnalyze = async () => {
    if (!file) { setError("Please upload a plant image first"); return; }
    setLoading(true);
    setError("");

    const messages = [
      "📸 Processing your image...",
      "🔍 Scanning leaf patterns...",
      "🤖 Running disease detection AI...",
      "🌿 Fetching treatment advice...",
    ];
    let i = 0;
    setLoadingMsg(messages[0]);
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) setLoadingMsg(messages[i]);
    }, 800);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/predict", { method: "POST", body: formData });

      if (!response.ok) throw new Error(`Prediction API failed with status ${response.status}`);

      const predictionData = await response.json();
      const diseaseLabel = predictionData.prediction || "Unknown Disease";
      let confidence = predictionData.confidence || 0;
      if (confidence > 1) confidence = confidence / 100;

      if (confidence < 0.3) {
        setError("Image unclear or not a plant leaf. Please upload a clear photo of a leaf in good lighting.");
        setResult(null);
        setDiseaseDetails(null);
        return;
      }

      setResult({ label: diseaseLabel, confidence });

      const isHealthy = diseaseLabel.toLowerCase().includes("healthy");
      if (isHealthy) {
        setDiseaseDetails({ description: "Your plant looks healthy! No disease detected.", treatment: ["Keep up current care routine.", "Monitor regularly for early signs.", "Ensure proper watering and nutrition."] });
        return;
      }

      const cleanDiseaseName = diseaseLabel.replace("___", " - ").replace(/_/g, " ");
      let diseaseInfoResult = await fetchGeminiTreatment(cleanDiseaseName);

      if (!diseaseInfoResult || diseaseInfoResult.description?.includes("Unable to fetch") || !Array.isArray(diseaseInfoResult.treatment) || diseaseInfoResult.treatment.length === 0) {
        diseaseInfoResult = fetchLocalDiseaseInfo(diseaseLabel);
      }

      setDiseaseDetails(diseaseInfoResult);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const isHealthy = result?.label?.toLowerCase().includes("healthy");
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;

  const getSeverity = (confidence) => {
    if (isHealthy) return null;
    if (confidence >= 0.8) return { label: "High Severity", color: "#B5430F", bg: "rgba(231,111,81,0.12)", border: "rgba(231,111,81,0.3)" };
    if (confidence >= 0.55) return { label: "Moderate", color: "#8B5E0A", bg: "rgba(244,162,97,0.12)", border: "rgba(244,162,97,0.3)" };
    return { label: "Low Severity", color: "#1B6B42", bg: "rgba(82,183,136,0.12)", border: "rgba(82,183,136,0.3)" };
  };

  const severity = getSeverity(result?.confidence || 0);

  /* ── Loading screen ── */
  if (loading || geminiLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#F8F5F0" }}>
        <div className="text-center px-8 animate-scale-in">
          <div
            className="w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl"
            style={{
              background: "linear-gradient(135deg, rgba(64,145,108,0.12), rgba(116,198,157,0.12))",
              border: "3px solid rgba(64,145,108,0.2)",
              animation: "pulseSoft 1.5s ease-in-out infinite",
            }}
          >
            🔬
          </div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#1A2E1A" }}>
            {geminiLoading ? "Fetching Treatment Info" : "Scanning Your Crop"}
          </h2>
          <p className="text-base font-medium mb-8" style={{ color: "#40916C" }}>{loadingMsg}</p>
          <div className="w-64 mx-auto h-2 rounded-full" style={{ background: "#E0EDE6" }}>
            <div
              className="h-2 rounded-full"
              style={{
                background: "linear-gradient(90deg, #40916C, #F4A261)",
                animation: "progressFill 3.2s ease forwards",
                width: "100%",
              }}
            />
          </div>
          <p className="text-xs mt-4" style={{ color: "#9AB09D" }}>Please wait — analyzing image patterns</p>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => window.history.back()}
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
          🔬 Disease Detection AI
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Page Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
            🌿 Crop Disease Detection
          </h1>
          <p className="text-sm" style={{ color: "#6B8F6E" }}>
            Upload a clear photo of a plant leaf to detect diseases instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Upload Card */}
          <div className="animate-fade-in-up">
            <div className="rounded-3xl p-6 sm:p-7" style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}>
              <h2 className="text-base font-extrabold mb-1" style={{ color: "#1A2E1A" }}>📷 Upload Leaf Photo</h2>
              <p className="text-xs mb-5" style={{ color: "#9AB09D" }}>JPG, PNG, WEBP — Max 10MB</p>

              {/* Sample guidance chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Clear leaf", "Good lighting", "Single leaf", "Close-up shot"].map((tip, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "rgba(64,145,108,0.08)", color: "#40916C", border: "1px solid rgba(64,145,108,0.15)" }}
                  >
                    ✓ {tip}
                  </span>
                ))}
              </div>

              {/* Drop zone */}
              <label
                htmlFor="disease-upload-input"
                className={`relative block rounded-3xl transition-all duration-300 overflow-hidden ${previewUrl ? "cursor-default" : "cursor-pointer"}`}
                style={{
                  border: previewUrl ? `2px solid rgba(64,145,108,0.4)` : `2px dashed rgba(64,145,108,0.3)`,
                  background: previewUrl ? "rgba(64,145,108,0.04)" : "#F8F5F0",
                  minHeight: "260px",
                }}
                onMouseEnter={e => { if (!previewUrl) e.currentTarget.style.borderColor = "rgba(64,145,108,0.6)"; }}
                onMouseLeave={e => { if (!previewUrl) e.currentTarget.style.borderColor = "rgba(64,145,108,0.3)"; }}
              >
                {previewUrl ? (
                  <div className="relative flex items-center justify-center p-4" style={{ minHeight: "260px" }}>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-md"
                      style={{ background: "#E76F51", color: "white" }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={previewUrl}
                      alt="Plant leaf preview"
                      className="max-h-56 rounded-2xl object-contain shadow-md"
                    />
                    <div
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-xs font-bold"
                      style={{ background: "rgba(27,67,50,0.85)", color: "#74C69D", backdropFilter: "blur(8px)" }}
                    >
                      ✓ {file?.name?.substring(0, 20)}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center px-6" style={{ minHeight: "260px" }}>
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 animate-bounce-gentle"
                      style={{ background: "rgba(64,145,108,0.1)", border: "1px solid rgba(64,145,108,0.15)" }}
                    >
                      📷
                    </div>
                    <p className="text-base font-bold mb-1" style={{ color: "#2D6A4F" }}>
                      Tap to Upload Leaf Photo
                    </p>
                    <p className="text-xs" style={{ color: "#9AB09D" }}>
                      Or drag and drop your image here
                    </p>
                  </div>
                )}
                {!previewUrl && (
                  <input
                    id="disease-upload-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}
              </label>

              {/* Error state */}
              {error && (
                <div
                  className="mt-4 flex items-start gap-3 p-4 rounded-2xl animate-scale-in"
                  style={{ background: "rgba(231,111,81,0.08)", border: "1px solid rgba(231,111,81,0.25)" }}
                >
                  <span className="text-xl flex-shrink-0">⚠️</span>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: "#B5430F" }}>Upload Error</p>
                    <p className="text-xs" style={{ color: "#B5430F" }}>{error}</p>
                  </div>
                </div>
              )}

              {/* Analyze button */}
              <button
                id="disease-analyze-btn"
                onClick={handleAnalyze}
                disabled={!file}
                className="mt-5 w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                style={{
                  background: file ? "linear-gradient(135deg, #2D6A4F, #40916C)" : "#ccc",
                  boxShadow: file ? "0 4px 20px rgba(45,106,79,0.3)" : "none",
                }}
                onMouseEnter={e => { if (file) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,106,79,0.4)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = file ? "0 4px 20px rgba(45,106,79,0.3)" : "none"; }}
              >
                {file ? "🔬 Analyze This Leaf" : "📷 Upload an Image First"}
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="animate-fade-in-up delay-100">
            <div className="rounded-3xl p-6 sm:p-7 h-full flex flex-col" style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}>
              <h2 className="text-base font-extrabold mb-5" style={{ color: "#1A2E1A" }}>📊 Analysis Result</h2>

              {/* Empty state */}
              {!result && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="text-6xl mb-4 animate-bounce-gentle">🍃</div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#6B8F6E" }}>
                    No analysis yet
                  </p>
                  <p className="text-xs" style={{ color: "#9AB09D" }}>
                    Upload a leaf photo and tap{" "}
                    <span className="font-bold" style={{ color: "#40916C" }}>Analyze</span>{" "}
                    to see results here
                  </p>
                </div>
              )}

              {/* Results */}
              {result && diseaseDetails && (
                <div className="space-y-4 animate-scale-in flex-1">
                  {/* Status banner */}
                  {isHealthy ? (
                    <div
                      className="rounded-2xl p-4 text-center"
                      style={{ background: "rgba(82,183,136,0.1)", border: "1px solid rgba(82,183,136,0.25)" }}
                    >
                      <div className="text-4xl mb-2">🎉</div>
                      <h3 className="text-lg font-extrabold mb-1" style={{ color: "#1B6B42" }}>
                        Plant is Healthy!
                      </h3>
                      <p className="text-sm" style={{ color: "#40916C" }}>
                        No disease detected. Your crop looks great.
                      </p>
                    </div>
                  ) : (
                    <div
                      className="rounded-2xl p-4"
                      style={{ background: "rgba(231,111,81,0.08)", border: "1px solid rgba(231,111,81,0.2)" }}
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#9AB09D" }}>
                            Detected Disease
                          </p>
                          <h3 className="text-base font-extrabold" style={{ color: "#1A2E1A" }}>
                            {result.label.replace("___", " › ").replace(/_/g, " ")}
                          </h3>
                        </div>
                        {severity && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
                            style={{ background: severity.bg, color: severity.color, border: `1px solid ${severity.border}` }}
                          >
                            {severity.label}
                          </span>
                        )}
                      </div>

                      {/* Confidence bar */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: "#6B8F6E" }}>
                          <span>AI Confidence</span>
                          <span style={{ color: "#1A2E1A" }}>{confidencePct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F0E8E4" }}>
                          <div
                            className="h-2.5 rounded-full"
                            style={{
                              width: `${confidencePct}%`,
                              background: `linear-gradient(90deg, #E76F51, #F4A261)`,
                              animation: "progressFill 0.8s ease both",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#40916C" }}>
                      🧬 About This Disease
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#3D5A40" }}>
                      {diseaseDetails.description}
                    </p>
                  </div>

                  {/* Treatment steps */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#40916C" }}>
                      💊 Treatment Steps
                    </h4>
                    <div className="space-y-2.5">
                      {diseaseDetails.treatment.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-2xl"
                          style={{ background: i % 2 === 0 ? "rgba(64,145,108,0.05)" : "white", border: "1px solid rgba(64,145,108,0.1)" }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5"
                            style={{ background: "rgba(64,145,108,0.15)", color: "#2D6A4F" }}
                          >
                            {i + 1}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: "#3D5A40" }}>{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reset link */}
                  <button
                    onClick={removeImage}
                    className="text-xs font-bold underline transition-colors"
                    style={{ color: "#9AB09D" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#2D6A4F"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9AB09D"; }}
                  >
                    ← Try another image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Supported Crops Section */}
        <div
          className="rounded-3xl p-6 sm:p-8 animate-fade-in-up delay-200"
          style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.06)", border: "1px solid rgba(64,145,108,0.1)" }}
        >
          <h2 className="text-base font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
            🌱 Supported Crops & Diseases
          </h2>
          <p className="text-xs mb-6" style={{ color: "#9AB09D" }}>
            Our AI model can detect diseases across these crops
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(cropDiseaseMap).map(([crop, diseases]) => {
              const cropEmojis = {
                Apple: "🍎", Blueberry: "🫐", Cherry: "🍒", Corn: "🌽",
                Grape: "🍇", Orange: "🍊", Peach: "🍑", Pepper: "🌶️",
                Potato: "🥔", Raspberry: "🍓", Soybean: "🌿", Squash: "🥦",
                Strawberry: "🍓", Tomato: "🍅",
              };
              const emoji = cropEmojis[crop] || "🌾";
              return (
                <div
                  key={crop}
                  className="rounded-2xl p-4 transition-all duration-200 card-lift"
                  style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.12)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{emoji}</span>
                    <span
                      className="text-sm font-extrabold"
                      style={{ color: "#1A2E1A" }}
                    >
                      {crop}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {diseases.map((name, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: "#6B8F6E" }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: "#52B788" }}>•</span>
                        <span className="capitalize">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DiseasePrediction;
