import { useState, useEffect } from "react";
import { User, Bot, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessage = ({ message, language }) => {
  const isUser = message.role === "user";
  const [speaking, setSpeaking] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setVoicesLoaded(true);
      return;
    }
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) setVoicesLoaded(true);
    };
    checkVoices();
    window.speechSynthesis.onvoiceschanged = checkVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const plainText = message.content.replace(/[*#\[\]()`>|~\-_]/g, "").trim();
    if (!plainText) return;

    const utterance = new SpeechSynthesisUtterance(plainText);
    const langMap = {
      hi: "hi-IN", bn: "bn-IN", te: "te-IN", mr: "mr-IN",
      ta: "ta-IN", gu: "gu-IN", kn: "kn-IN", ml: "ml-IN", pa: "pa-IN",
      en: "en-IN",
    };
    utterance.lang = langMap[language] || "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{
          background: isUser
            ? "linear-gradient(135deg, #F4A261, #E76F51)"
            : "linear-gradient(135deg, #40916C, #74C69D)",
        }}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={`rounded-2xl px-4 py-3 ${isUser ? "rounded-tr-md" : "rounded-tl-md"}`}
          style={{
            background: isUser
              ? "linear-gradient(135deg, #2D6A4F, #40916C)"
              : "white",
            color: isUser ? "#fff" : "#1A2E1A",
            boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
            border: isUser ? "none" : "1px solid rgba(64,145,108,0.12)",
          }}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div style={{ color: "#1A2E1A" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-1">{children}</ol>,
                  li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  p: ({ children }) => <p className="text-sm leading-relaxed mb-1 last:mb-0">{children}</p>,
                  h1: ({ children }) => <h1 className="text-base font-extrabold mt-2 mb-1">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-extrabold mt-2 mb-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mt-1 mb-1">{children}</h3>,
                  code: ({ children }) => (
                    <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}>{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="text-xs p-3 rounded-xl overflow-x-auto my-2" style={{ background: "#F8F5F0", border: "1px solid rgba(64,145,108,0.1)" }}>{children}</pre>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {!isUser && message.content && (
          <button
            onClick={handleSpeak}
            className="self-start flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              color: speaking ? "#E76F51" : "#9AB09D",
              background: speaking ? "rgba(231,111,81,0.1)" : "transparent",
            }}
            onMouseEnter={e => { if (!speaking) e.currentTarget.style.color = "#2D6A4F"; }}
            onMouseLeave={e => { if (!speaking) e.currentTarget.style.color = "#9AB09D"; }}
          >
            {speaking ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            <span>{speaking ? "Stop" : "Listen"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
