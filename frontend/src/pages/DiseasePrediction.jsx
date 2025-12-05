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
import { useNavigate } from "react-router-dom";
import { diseaseInfo } from "../data/diseaseDatabase";

const DiseasePrediction = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
  };

  // HARD CODED DEMO RESULT
  const handleAnalyze = () => {
    if (!file) return setError("Upload an image first");
    setLoading(true);
    setTimeout(() => {
      setResult({
        label: "Tomato___Late_blight",
        confidence: 0.3866,
      });
      setLoading(false);
    }, 1200);
  };

  const diseaseDetails = result ? diseaseInfo[result.label] : null;
  const confidencePercent = result ? Math.round(result.confidence * 100) : 0;

  return (
    <div className="min-h-screen bg-[#ebf3ec]">
      {/* HEADER */}
      <div className="h-14 bg-white shadow flex items-center px-6 gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-green-700">KrishiConnect</h2>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* TOP GRID: upload + analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-green-600" />
              Upload Plant Image
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Supported formats: JPG, PNG, WEBP
            </p>

            <div
              className={`relative border-2 border-dashed rounded-xl flex items-center justify-center p-6 transition ${
                previewUrl
                  ? "border-green-500 bg-green-50"
                  : "hover:border-green-400 border-gray-300"
              }`}
            >
              {previewUrl ? (
                <>
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="max-h-64 rounded-lg"
                  />
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3 text-gray-500">
                  <Upload className="w-8 h-8 text-green-500" />
                  <span>Click to upload image</span>
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
              <div className="mt-3 text-red-600 text-sm flex gap-2 items-center">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white rounded-2xl shadow p-6">
            {/* Header with green check icon */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Analysis Result</h3>
            </div>

            {!result && (
              <p className="text-gray-500 text-sm">
                Upload an image and click{" "}
                <span className="font-semibold text-green-600">
                  Analyze Image
                </span>{" "}
                to see results here.
              </p>
            )}

            {result && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4 space-y-4">
                {/* Detected Issue row */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 font-medium">
                    Detected Issue:
                  </span>
                  <span className="px-3 py-1 bg-red-200/70 text-red-800 rounded-full text-xs font-semibold">
                    {result.label}
                  </span>
                </div>

                {/* Confidence row */}
                <div>
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                    <span className="font-medium">Confidence</span>
                    <span>{confidencePercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${confidencePercent}%` }}
                    />
                  </div>
                </div>

                {/* Description + treatment with green side line */}
                <div className="flex gap-3">
                  {/* green vertical line */}
                  <div className="w-1 rounded-full bg-green-500" />

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">
                        Disease Description:
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {diseaseDetails?.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">
                        Recommended Treatment:
                      </h4>
                      <ul className="list-disc text-sm text-gray-700 pl-4 space-y-1">
                        {diseaseDetails?.treatment.map((t, i) => (
                          <li key={i}>{t}</li>
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
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Supported Crops & Diseases
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            This model currently supports disease detection for the following
            crops and leaf diseases:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {Object.entries(cropDiseaseMap).map(([crop, diseases]) => (
              <div
                key={crop}
                className="rounded-xl border border-green-100 bg-green-50/70 p-4"
              >
                <span className="inline-flex px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold mb-2">
                  {crop}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-gray-700 mt-1">
                  {diseases.map((name, idx) => (
                    <li key={idx}>{name}</li>
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
