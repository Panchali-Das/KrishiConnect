import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Send, MessageCircle, Languages, Bot, Mic, MicOff } from "lucide-react";
import ChatMessage from "../components/ChatMessage";

const LANGUAGES = [
  { code: "auto", label: "Auto Detect", flag: "🌐", stt: "" },
  { code: "en", label: "English", flag: "🇬🇧", stt: "en-IN" },
  { code: "hi", label: "हिन्दी (Hindi)", flag: "🇮🇳", stt: "hi-IN" },
  { code: "bn", label: "বাংলা (Bengali)", flag: "🇮🇳", stt: "bn-IN" },
  { code: "te", label: "తెలుగు (Telugu)", flag: "🇮🇳", stt: "te-IN" },
  { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳", stt: "mr-IN" },
  { code: "ta", label: "தமிழ் (Tamil)", flag: "🇮🇳", stt: "ta-IN" },
  { code: "gu", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳", stt: "gu-IN" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳", stt: "kn-IN" },
  { code: "ml", label: "മലയാളം (Malayalam)", flag: "🇮🇳", stt: "ml-IN" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳", stt: "pa-IN" },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("auto");
  const [streaming, setStreaming] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getSttLang = () => {
    if (language === "auto") return "hi-IN";
    const lang = LANGUAGES.find((l) => l.code === language);
    return lang?.stt || "hi-IN";
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [...prev, { role: "bot", content: "❌ Voice input is not supported in this browser. Please use Chrome or Edge." }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = getSttLang();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      setInput(finalTranscript || interim);
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setMessages((prev) => [...prev, { role: "bot", content: `❌ Mic error: ${event.error}. Please check permissions.` }]);
      }
    };

    recognition.onend = () => {
      setListening(false);
      if (finalTranscript.trim()) {
        handleSendWithText(finalTranscript.trim());
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.error("SpeechRecognition start error:", err);
      setListening(false);
      setMessages((prev) => [...prev, { role: "bot", content: "❌ Failed to start voice recognition. Please refresh and try again." }]);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      setListening(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      stopListening();
    } else if (!streaming) {
      startListening();
    }
  };

  const handleSendWithText = async (text) => {
    const question = text.trim();
    if (!question || streaming) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setStreaming(true);

    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question, language }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.event === "token") {
                botMessage += parsed.data;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "bot", content: botMessage };
                  return updated;
                });
              } else if (parsed.event === "error") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "bot", content: parsed.data };
                  return updated;
                });
              }
            } catch {
              botMessage += data;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "bot", content: botMessage };
                return updated;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I couldn't process your request. Please try again." },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  const handleSend = () => {
    handleSendWithText(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F5F0" }}>
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
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
            Krishi<span style={{ color: "#40916C" }}>Connect</span>
          </span>
        </div>
        <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}>
          🤖 AI Chat
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex-1 flex flex-col">
        {/* Language Selector */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: "rgba(64,145,108,0.1)",
                color: "#2D6A4F",
                border: "1px solid rgba(64,145,108,0.2)",
              }}
            >
              <Languages className="w-3.5 h-3.5" />
              {LANGUAGES.find((l) => l.code === language)?.label || "Auto"}
            </button>
            {showLangPicker && (
              <div
                className="absolute top-full left-0 mt-1 w-56 rounded-2xl overflow-hidden shadow-xl z-10 animate-scale-in"
                style={{
                  background: "white",
                  border: "1px solid rgba(64,145,108,0.15)",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm transition-all"
                    style={{
                      background: language === lang.code ? "rgba(64,145,108,0.1)" : "transparent",
                      color: language === lang.code ? "#2D6A4F" : "#3D5A40",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(64,145,108,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = language === lang.code ? "rgba(64,145,108,0.1)" : "transparent"; }}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs" style={{ color: "#9AB09D" }}>
            {language === "auto"
              ? "🌐 Auto — AI detects your language from the question"
              : `${LANGUAGES.find((l) => l.code === language)?.flag || "🌐"} AI responds in your chosen language`}
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 px-1" style={{ maxHeight: "calc(100vh - 320px)", minHeight: "400px" }}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="text-6xl mb-4 animate-bounce-gentle">🌾</div>
              <h3 className="text-lg font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
                Ask KrishiConnect AI
              </h3>
              <p className="text-sm max-w-md" style={{ color: "#9AB09D" }}>
                Ask any farming question — crop diseases, fertilizers, weather, soil health, government schemes. Get answers in your language.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "गेहूं में कीट कैसे नियंत्रित करें?",
                  "What fertilizer for tomato?",
                  "मिट्टी की जांच कैसे करें?",
                  "Best crops for sandy soil",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                    style={{
                      background: "rgba(64,145,108,0.08)",
                      color: "#40916C",
                      border: "1px solid rgba(64,145,108,0.15)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(64,145,108,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(64,145,108,0.08)"; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} language={language} />
          ))}

          {streaming && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}
              >
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div
                className="rounded-2xl rounded-tl-md px-4 py-3"
                style={{
                  background: "white",
                  border: "1px solid rgba(64,145,108,0.12)",
                  boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
                }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#40916C", animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#52B788", animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#74C69D", animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 pb-4">
          <div
            className="flex items-end gap-2 rounded-2xl p-2"
            style={{
              background: "white",
              border: "1px solid rgba(64,145,108,0.15)",
              boxShadow: "0 2px 12px rgba(45,106,79,0.06)",
            }}
          >
            {/* Mic Button */}
            <button
              onClick={toggleMic}
              disabled={streaming}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-40"
              style={{
                background: listening
                  ? "rgba(231,111,81,0.15)"
                  : "transparent",
                animation: listening ? "pulseSoft 1s ease-in-out infinite" : "none",
              }}
              onMouseEnter={e => { if (!listening) e.currentTarget.style.background = "rgba(64,145,108,0.08)"; }}
              onMouseLeave={e => { if (!listening) e.currentTarget.style.background = "transparent"; }}
              title={listening ? "Stop recording" : "Click and speak your question"}
            >
              {listening ? (
                <MicOff className="w-4 h-4" style={{ color: "#E76F51" }} />
              ) : (
                <Mic className="w-4 h-4" style={{ color: "#9AB09D" }} />
              )}
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? "Listening..." : "Type or speak your farming question in any language..."}
              rows={1}
              className="flex-1 resize-none outline-none text-sm px-3 py-2"
              style={{ color: "#1A2E1A", background: "transparent" }}
            />
            <button
              data-send-btn
              onClick={handleSend}
              disabled={!input.trim() || streaming}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: input.trim() && !streaming
                  ? "linear-gradient(135deg, #2D6A4F, #40916C)"
                  : "#E0EDE6",
              }}
            >
              <Send className="w-4 h-4" style={{ color: input.trim() && !streaming ? "white" : "#9AB09D" }} />
            </button>
          </div>
          <p className="text-[10px] mt-2 text-center" style={{ color: "#9AB09D" }}>
            🎤 Tap the mic to speak — AI auto-detects your language and responds in the same language
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
