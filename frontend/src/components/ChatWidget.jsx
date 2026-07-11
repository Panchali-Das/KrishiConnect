import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Languages, Bot, Mic, MicOff, ChevronDown } from "lucide-react";
import ChatMessage from "./ChatMessage";

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

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("auto");
  const [streaming, setStreaming] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const panelRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const getSttLang = () => {
    if (language === "auto") return "hi-IN";
    const lang = LANGUAGES.find((l) => l.code === language);
    return lang?.stt || "hi-IN";
  };

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
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #2D6A4F, #40916C)",
          boxShadow: "0 8px 32px rgba(45,106,79,0.4)",
        }}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse-soft">
              AI
            </span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl flex flex-col z-50 overflow-hidden animate-scale-in"
          style={{
            background: "#F8F5F0",
            boxShadow: "0 16px 64px rgba(27,67,50,0.25)",
            border: "1px solid rgba(64,145,108,0.15)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(116,198,157,0.2)" }}>
                <MessageCircle className="w-4 h-4" style={{ color: "#74C69D" }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">KrishiConnect AI</h3>
                <p className="text-[10px]" style={{ color: "#74C69D" }}>Farming Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="px-4 pt-3 pb-1 flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                style={{
                  background: "rgba(64,145,108,0.1)",
                  color: "#2D6A4F",
                  border: "1px solid rgba(64,145,108,0.2)",
                }}
              >
                <Languages className="w-3 h-3" />
                {LANGUAGES.find((l) => l.code === language)?.label?.split(" ")[0] || "Auto"}
              </button>
              {showLangPicker && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 rounded-xl overflow-hidden shadow-xl z-10"
                  style={{
                    background: "white",
                    border: "1px solid rgba(64,145,108,0.15)",
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLangPicker(false); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs transition-all"
                      style={{
                        background: language === lang.code ? "rgba(64,145,108,0.1)" : "transparent",
                        color: language === lang.code ? "#2D6A4F" : "#3D5A40",
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px]" style={{ color: "#9AB09D" }}>
              {language === "auto" ? "Auto-detect language" : `${LANGUAGES.find((l) => l.code === language)?.flag} AI responds in selected language`}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-4xl mb-3 animate-bounce-gentle">🌾</div>
                <h4 className="text-sm font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
                  Ask KrishiConnect AI
                </h4>
                <p className="text-[11px] max-w-[260px]" style={{ color: "#9AB09D" }}>
                  Ask about crops, diseases, fertilizers, weather, soil health, or government schemes.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                  {[
                    "गेहूं में कीट कैसे नियंत्रित करें?",
                    "What fertilizer for tomato?",
                    "Best crops for sandy soil",
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(q); inputRef.current?.focus(); }}
                      className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all"
                      style={{
                        background: "rgba(64,145,108,0.08)",
                        color: "#40916C",
                        border: "1px solid rgba(64,145,108,0.15)",
                      }}
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
              <div className="flex items-start gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}
                >
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className="rounded-xl rounded-tl-md px-3 py-2"
                  style={{
                    background: "white",
                    border: "1px solid rgba(64,145,108,0.12)",
                    boxShadow: "0 2px 8px rgba(45,106,79,0.06)",
                  }}
                >
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#40916C", animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#52B788", animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#74C69D", animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-4 pb-4 pt-2 flex-shrink-0">
            <div
              className="flex items-end gap-1.5 rounded-xl p-1.5"
              style={{
                background: "white",
                border: "1px solid rgba(64,145,108,0.15)",
                boxShadow: "0 2px 8px rgba(45,106,79,0.06)",
              }}
            >
              <button
                onClick={toggleMic}
                disabled={streaming}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-40"
                style={{
                  background: listening ? "rgba(231,111,81,0.15)" : "transparent",
                  animation: listening ? "pulseSoft 1s ease-in-out infinite" : "none",
                }}
                title={listening ? "Stop recording" : "Click and speak"}
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
                placeholder={listening ? "Listening..." : "Type your question..."}
                rows={1}
                className="flex-1 resize-none outline-none text-sm px-2 py-2"
                style={{ color: "#1A2E1A", background: "transparent", fontSize: "13px" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !streaming
                    ? "linear-gradient(135deg, #2D6A4F, #40916C)"
                    : "#E0EDE6",
                }}
              >
                <Send className="w-3.5 h-3.5" style={{ color: input.trim() && !streaming ? "white" : "#9AB09D" }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
