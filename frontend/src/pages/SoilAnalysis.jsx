import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  CheckCircle2,
  Database,
  TrendingUp,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react";

const SoilAnalysis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  });
  const [predictions, setPredictions] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePredictCrops = async () => {
    setLoading(true);

    // TODO: Replace with actual API call
    // Example API call structure:
    /*
    try {
      const response = await fetch('YOUR_API_ENDPOINT/predict-crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPredictions(data);
      setShowResults(true);
    } catch (error) {
      console.error('Prediction error:', error);
    }
    */

    // Mock data for demonstration
    setTimeout(() => {
      setPredictions({
        recommendedCrops: [
          { name: "Potato", probability: 0.92 },
          { name: "Tomato", probability: 0.85 },
          { name: "Grape", probability: 0.78 },
          { name: "Apple", probability: 0.71 },
        ],
        soilHealth: {
          status: "Good",
          color: "green",
          description:
            "Your soil parameters are well-balanced for cultivation.",
        },
      });
      setShowResults(true);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      nitrogen: "",
      phosphorous: "",
      potassium: "",
      ph: "",
      rainfall: "",
      temperature: "",
      humidity: "",
    });
    setPredictions(null);
    setShowResults(false);
  };

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
        <h2 className="text-2xl font-semibold text-green-700">KrishiConnect</h2>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT PANEL - Green Background */}
          <div className="lg:col-span-2 bg-green-700 text-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Crop Prediction</h1>
            <p className="text-green-100 text-lg mb-6">
              Our advanced algorithms analyze multiple factors to recommend the
              best crops for your land.
            </p>
            <p className="text-green-100 mb-8">
              Enter your soil parameters and get instant AI-powered
              recommendations tailored to your specific conditions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <span className="text-green-50">98% Accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 flex-shrink-0" />
                <span className="text-green-50">Historical Data</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="mt-8 w-full bg-white text-green-700 font-semibold py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              Reset All Fields
            </button>
          </div>

          {/* RIGHT PANEL - Forms */}
          <div className="lg:col-span-3 space-y-6">
            {/* Soil Parameter Analysis Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Soil Parameter Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your soil test results for accurate predictions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nitrogen */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nitrogen (N): <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleInputChange}
                      placeholder="Range, 0-140"
                      className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      kg/ha
                    </span>
                  </div>
                </div>

                {/* Phosphorous */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phosphorous (P): <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="phosphorous"
                      value={formData.phosphorous}
                      onChange={handleInputChange}
                      placeholder="Range, 0-140"
                      className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      kg/ha
                    </span>
                  </div>
                </div>

                {/* Potassium */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Potassium (K): <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="potassium"
                      value={formData.potassium}
                      onChange={handleInputChange}
                      placeholder="Range, 0-200"
                      className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      kg/ha
                    </span>
                  </div>
                </div>

                {/* pH Value */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    pH Value: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="ph"
                    value={formData.ph}
                    onChange={handleInputChange}
                    placeholder="Range, 3.5-9"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Rainfall */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rainfall:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      placeholder="Range, 0-500"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      mm
                    </span>
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Temperature:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      placeholder="Range, 0-60"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      °C
                    </span>
                  </div>
                </div>

                {/* Humidity - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Humidity:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      placeholder="Range, 10-100"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePredictCrops}
                disabled={loading}
                className="mt-6 w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? "Analyzing..." : "Predict Suitable Crops"}
              </button>
            </div>

            {/* Results Section */}
            {showResults && predictions && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Recommended Crops
                </h3>

                <div className="space-y-3 mb-6">
                  {predictions.recommendedCrops.map((crop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{crop.icon}</span>
                        <span className="font-semibold text-gray-800">
                          {crop.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Soil Health: {predictions.soilHealth.status}
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        {predictions.soilHealth.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;
