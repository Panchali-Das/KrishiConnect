const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

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

module.exports = router;
