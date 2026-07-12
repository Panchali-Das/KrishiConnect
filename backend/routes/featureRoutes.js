const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Protected Disease Prediction API
router.post("/disease-prediction", protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Disease prediction accessed successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Protected Soil Analysis API
router.post("/soil-analysis", protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Soil analysis accessed successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Protected Yield Prediction API
router.post("/yield-prediction", protect, async (req, res) => {
  try {
    const { crop, season, state, area, fertilizer, pesticide, language = "en" } = req.body;

    if (!crop || !season || !state || !area || !fertilizer || !pesticide) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: crop, season, state, area, fertilizer, pesticide",
      });
    }

    const langName = {
      en: "English", hi: "Hindi", bn: "Bengali", te: "Telugu",
      mr: "Marathi", ta: "Tamil", gu: "Gujarati", kn: "Kannada",
      ml: "Malayalam", pa: "Punjabi",
    }[language] || "English";

    const prompt = `You are an expert agricultural scientist specializing in Indian farming. Based on the following inputs, predict the crop yield and provide practical advice for the farmer.

Inputs:
- Crop: ${crop}
- Season: ${season}
- State: ${state}
- Area: ${area} hectares
- Fertilizer used: ${fertilizer} kgs
- Pesticide used: ${pesticide} kgs

Respond ONLY with a valid JSON object (no markdown, no code fences) in the following structure:
{
  "predictedYield": <a number representing yield in tonnes per hectare>,
  "inputSummary": "<1-2 sentences in ${langName} clearly restating the input parameters (crop, season, state, area, fertilizer, pesticide) and stating the predicted yield. Example: 'For your Rice crop in Punjab during Kharif season on 5 hectares with 200 kgs fertilizer and 15 kgs pesticide, the predicted yield is X tonnes per hectare.'>",
  "description": "<a 2-3 sentence farmer-friendly explanation in ${langName} of why this yield is expected, considering typical yields for ${crop} in ${state} during ${season} season, adjusted by the fertilizer and pesticide inputs>",
  "tips": ["<tip 1 in ${langName}>", "<tip 2 in ${langName}>", "<tip 3 in ${langName}>", "<tip 4 in ${langName}>"]
}

Make the inputSummary clearly show what was entered and what the result is. Keep the description practical and easy for a farmer to understand. All text must be in ${langName}.`;

    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse Gemini response");
      }
    }

    res.status(200).json({
      success: true,
      data: {
        predictedYield: parsed.predictedYield,
        inputSummary: parsed.inputSummary || "",
        description: parsed.description,
        tips: parsed.tips || [],
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
