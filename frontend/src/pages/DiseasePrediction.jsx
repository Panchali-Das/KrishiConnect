import { useState, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";
import { diseaseInfo } from "../data/diseaseDatabase";

const DiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
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
    console.log("File selected:", selected.name);
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
  };

  // Fetch treatment info from Gemini API (Direct approach)
  const fetchGeminiTreatment = async (disease) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const prompt = `Provide a concise description (1-2 sentences) of the plant disease "${disease}" and suggest exactly 3 bullet point treatments. Format the response as:
Description: [Your description]
Treatments:
- [Treatment 1]
- [Treatment 2]
- [Treatment 3]`;

    setGeminiLoading(true);

    try {
      console.log("Sending request to Gemini API for disease:", disease);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );

      console.log("Gemini API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        throw new Error(
          `Gemini API request failed with status ${response.status}`,
        );
      }

      const data = await response.json();
      console.log("Gemini API response data:", data);

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No valid response from Gemini API");
      }

      console.log("=== RAW GEMINI TEXT ===");
      console.log(text);

      // Parse the response
      const descriptionMatch = text.match(
        /Description:\s*(.+?)(?=\nTreatments?:|$)/is,
      );
      const treatmentsText = text.split(/Treatments?:/i)[1];

      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : "No description available.";

      let treatments = [];
      if (treatmentsText) {
        treatments = treatmentsText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("-") || /^\d+\./.test(line))
          .map((line) => line.replace(/^[-\d.]\s*/, "").trim())
          .filter((line) => line.length > 0);
      }

      if (treatments.length === 0) {
        treatments = [
          "Consult a local agricultural expert for treatment options.",
        ];
      }

      console.log("=== PARSED RESULTS ===");
      console.log("Description:", description);
      console.log("Treatments:", treatments);

      return {
        description,
        treatment: treatments,
      };
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return {
        description: "Unable to fetch description.",
        treatment: [
          "Consult a local agricultural expert for treatment options.",
        ],
      };
    } finally {
      setGeminiLoading(false);
    }
  };

  // Fallback: Fetch disease info from local database
  const fetchLocalDiseaseInfo = (diseaseLabel) => {
    // diseaseLabel comes like: Tomato___Late_blight
    const localData = diseaseInfo[diseaseLabel];

    if (!localData) {
      console.warn("Disease not found in local DB:", diseaseLabel);
      return {
        description: "No information available for this disease.",
        treatment: [
          "Consult a local agricultural expert for treatment options.",
        ],
      };
    }

    return {
      description: localData.description,
      treatment: localData.treatment,
    };
  };

  // CNN model prediction
  const handleAnalyze = async () => {
    if (!file) {
      setError("Upload an image first");
      return;
    }

    setLoading(true);
    setError("");
    console.log("Starting analysis...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      console.log("Sending request to CNN API...");

      const response = await fetch("/predict", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Prediction API failed with status ${response.status}`);
      }

      const predictionData = await response.json();
      console.log("Prediction data received:", predictionData);

      const diseaseLabel = predictionData.prediction || "Unknown Disease";
      let confidence = predictionData.confidence || 0;

      if (confidence > 1) {
        confidence = confidence / 100;
      }

      console.log("Disease label:", diseaseLabel);
      console.log("Confidence:", confidence);

      const MIN_CONFIDENCE_THRESHOLD = 0.3;

      if (confidence < MIN_CONFIDENCE_THRESHOLD) {
        console.log("Confidence too low, showing invalid image message");
        setError(
          "Invalid or unclear image. Please upload a clear photo of a plant leaf.",
        );
        setResult(null);
        setDiseaseDetails(null);
        return;
      }

      setResult({
        label: diseaseLabel,
        confidence: confidence,
      });

      const isHealthy = diseaseLabel.toLowerCase().includes("healthy");

      if (isHealthy) {
        console.log("Plant is healthy");
        setDiseaseDetails({
          description: "Healthy leaf. No disease detected.",
          treatment: ["No treatment required. The leaf is healthy."],
        });
        return;
      }

      // Fetch disease info from Gemini (with local DB fallback)
      console.log("Fetching disease information from Gemini...");
      const cleanDiseaseName = diseaseLabel
        .replace("___", " - ")
        .replace(/_/g, " ");

      let diseaseInfoResult = await fetchGeminiTreatment(cleanDiseaseName);

      // 🔁 Fallback to local DB if Gemini fails or quota expires
      if (
        !diseaseInfoResult ||
        diseaseInfoResult.description?.includes("Unable to fetch") ||
        !Array.isArray(diseaseInfoResult.treatment) ||
        diseaseInfoResult.treatment.length === 0
      ) {
        console.warn(
          "Gemini failed. Falling back to local disease database...",
        );
        diseaseInfoResult = fetchLocalDiseaseInfo(diseaseLabel);
      }

      setDiseaseDetails(diseaseInfoResult);
    } catch (err) {
      console.error("Error during analysis:", err);
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
      console.log("Analysis complete");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* HEADER */}
      <div className="h-14 bg-white shadow flex items-center px-6 gap-3">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-800 text-2xl font-bold transition"
        >
          ←
        </button>
        <h2 className="text-2xl font-semibold text-green-700">KrishiGibi</h2>
        <span className="ml-auto text-sm text-gray-500">
          AI-Powered Disease Detection
        </span>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  strokeWidth="2"
                />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path
                  d="M21 15l-5-5L5 21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload Plant Image
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: JPG, PNG, WEBP
            </p>

            <div
              className={`relative border-2 border-dashed rounded-xl p-6 min-h-[300px] flex items-center justify-center transition ${
                previewUrl
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {previewUrl ? (
                <>
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="max-h-64 rounded-lg object-contain"
                  />
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3 text-gray-500">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium">Click to upload image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex gap-2 items-center">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Image"
              )}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Analysis Result
              </h3>
            </div>

            {!result && !loading && (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    strokeWidth="2"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path
                    d="M21 15l-5-5L5 21"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  Upload an image and click{" "}
                  <span className="font-semibold text-green-600">
                    Analyze Image
                  </span>{" "}
                  to see results here.
                </p>
              </div>
            )}

            {(loading || geminiLoading) && (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="w-12 h-12 text-green-600 animate-spin mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  {geminiLoading
                    ? "Fetching treatment info..."
                    : "Analyzing your image..."}
                </p>
              </div>
            )}

            {result && !loading && diseaseDetails && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-5 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-sm text-gray-700 font-medium">
                    Detected Issue:
                  </span>
                  <span className="px-4 py-1.5 bg-red-200/70 text-red-800 rounded-full text-xs font-semibold">
                    {result.label.replace("___", " - ").replace(/_/g, " ")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 font-medium">
                    Confidence:
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="w-1 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Disease Description
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {diseaseDetails.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Recommended Treatment
                      </h4>
                      <ul className="space-y-2">
                        {diseaseDetails.treatment.map((t, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-700 flex gap-2"
                          >
                            <span className="text-green-600 font-bold">
                              {i + 1}.
                            </span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM: Supported crops & diseases */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Supported Crops & Diseases
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            This AI model currently supports disease detection for the following
            crops:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(cropDiseaseMap).map(([crop, diseases]) => (
              <div
                key={crop}
                className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 hover:shadow-md transition"
              >
                <span className="inline-flex px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold mb-3">
                  {crop}
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                  {diseases.map((name, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;
