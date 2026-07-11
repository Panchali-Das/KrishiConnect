const CHATBOT_SERVICE_URL = process.env.CHATBOT_SERVICE_URL || "http://localhost:8001";

const askChatbot = async (req, res) => {
  try {
    const { question, language } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: "Question is required" });
    }

    const response = await fetch(`${CHATBOT_SERVICE_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.trim(), language: language || "auto" }),
    });

    if (!response.ok) {
      return res.status(502).json({ success: false, message: "Chatbot service error" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          break;
        }
        const text = decoder.decode(value, { stream: true });
        res.write(text);
      }
    };

    pump().catch((err) => {
      console.error("SSE relay error:", err);
      if (!res.headersSent) {
        res.status(502).json({ success: false, message: "Chatbot service error" });
      }
      res.end();
    });

    req.on("close", () => {
      reader.cancel();
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { askChatbot };
