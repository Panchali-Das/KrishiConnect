const express = require("express");
const protect = require("../middleware/authMiddleware");
const { askChatbot } = require("../controllers/chatbotController");
const router = express.Router();

router.post("/ask", protect, askChatbot);

module.exports = router;
