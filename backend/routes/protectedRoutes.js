const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected dashboard data accessed",
    user: req.user,
  });
});

module.exports = router;
