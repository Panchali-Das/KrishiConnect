const express = require("express");
const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const YIELD_API = process.env.YIELD_PREDICTION_API_URL || "https://yield-prediction-ghws.onrender.com";
const CROP_REC_API = process.env.CROP_RECOMMENDATION_API_URL || "https://crop-recommendation-service-qjuq.onrender.com";
const DISEASE_API = process.env.DISEASE_PREDICTION_API_URL || "http://localhost:8000";

const upload = multer({ storage: multer.memoryStorage() });

router.post("/disease-prediction", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded. Please provide a file.",
      });
    }

    const formData = new FormData();
    formData.append("file", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

    const extRes = await fetch(`${DISEASE_API}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!extRes.ok) {
      return res.status(502).json({ success: false, message: "Disease prediction service error" });
    }

    const extData = await extRes.json();

    res.status(200).json({
      success: true,
      data: {
        prediction: extData.prediction,
        confidence: extData.confidence,
      },
    });
  } catch (error) {
    console.error("Disease prediction error:", error);
    res.status(500).json({
      success: false,
      message: "Disease prediction failed. Please try again.",
    });
  }
});

router.post("/soil-analysis", protect, async (req, res) => {
  try {
    const { nitrogen, phosphorous, potassium, ph, temperature, humidity } = req.body;

    if (nitrogen === undefined || phosphorous === undefined || potassium === undefined || ph === undefined || temperature === undefined || humidity === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: nitrogen, phosphorous, potassium, ph, temperature, humidity",
      });
    }

    const extRes = await fetch(`${CROP_REC_API}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        N: nitrogen,
        P: phosphorous,
        K: potassium,
        pH: ph,
        temperature,
        humidity,
      }),
    });

    if (!extRes.ok) {
      return res.status(502).json({ success: false, message: "Crop recommendation service error" });
    }

    const extData = await extRes.json();

    const recommendedCrops = extData.top5.map((item) => ({
      name: item.crop.charAt(0).toUpperCase() + item.crop.slice(1),
      probability: parseFloat(item.confidence.replace("%", "")) / 100,
      why: `Soil conditions are ${parseFloat(item.confidence.replace("%", "")) >= 20 ? "highly" : "moderately"} suitable for ${item.crop}`,
    }));

    const topConfidence = parseFloat(extData.confidence.replace("%", ""));
    const soilHealthScore = Math.min(100, Math.round(topConfidence * 3 + 30));
    let soilStatus = "Good";
    if (soilHealthScore < 50) soilStatus = "Needs Improvement";
    else if (soilHealthScore < 70) soilStatus = "Average";

    res.status(200).json({
      success: true,
      data: {
        recommendedCrops,
        soilHealth: {
          status: soilStatus,
          score: soilHealthScore,
          description: `Your soil shows a ${topConfidence >= 20 ? "strong" : "moderate"} match with ${extData.predicted_crop}. Overall soil condition appears ${soilStatus.toLowerCase()} for cultivation.`,
          tips: [
            "Consider soil testing every season for accurate nutrient tracking",
            "Add organic compost to improve soil structure and fertility",
            "Practice crop rotation to maintain soil health",
          ],
        },
      },
    });
  } catch (error) {
    console.error("Soil analysis error:", error);
    res.status(500).json({
      success: false,
      message: "Soil analysis failed. Please try again.",
    });
  }
});

router.post("/yield-prediction", protect, async (req, res) => {
  try {
    const { crop, season, state, area, fertilizer, pesticide } = req.body;

    if (!crop || !season || !state || !area || !fertilizer || !pesticide) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: crop, season, state, area, fertilizer, pesticide",
      });
    }

    const extRes = await fetch(`${YIELD_API}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crop, season, state, area, fertilizer, pesticide }),
    });

    if (!extRes.ok) {
      return res.status(502).json({ success: false, message: "Yield prediction service error" });
    }

    const extData = await extRes.json();

    res.status(200).json({
      success: true,
      data: {
        predictedYield: extData.predicted_yield,
        inputSummary: `For your ${crop} crop in ${state} during ${season} season on ${area} hectares with ${fertilizer} kgs fertilizer and ${pesticide} kgs pesticide, the predicted yield is ${extData.predicted_yield?.toFixed(2) || extData.predicted_yield} tonnes per hectare.`,
        description: `Based on your inputs for ${crop} cultivation in ${state} during ${season}, the model estimates a yield of ${extData.predicted_yield?.toFixed(2) || extData.predicted_yield} tonnes per hectare with a total production of ${extData.predicted_production?.toFixed(2) || extData.predicted_production} tonnes across ${area} hectares.`,
        tips: [
          "Ensure proper irrigation scheduling for optimal yield",
          "Use balanced NPK fertilizers as per soil test recommendations",
          "Monitor pest activity regularly and take timely action",
          "Practice crop rotation to maintain soil fertility",
        ],
      },
    });
  } catch (error) {
    console.error("Yield prediction error:", error);
    res.status(500).json({
      success: false,
      message: "Yield prediction failed. Please try again.",
    });
  }
});

module.exports = router;
