import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    emoji:       "🌱",
    title:       "Crop Recommendation",
    tag:         "Soil Analysis",
    description: "Enter your soil nutrients (N-P-K), pH, rainfall & temperature — get instant AI crop suggestions tailored to your exact conditions.",
    route:       "/soil-analysis",
    tips:        ["N-P-K levels", "pH & moisture", "Climate data"],
    accent:      "#40916C",
    accentLight: "rgba(64,145,108,0.10)",
    accentBorder:"rgba(64,145,108,0.2)",
    badge:       { text: "Most Used", color: "#40916C", bg: "rgba(64,145,108,0.12)" },
  },
  {
    emoji:       "🔬",
    title:       "Disease Detection",
    tag:         "Image AI",
    description: "Upload a photo of your crop leaf. Our AI scans for 38+ diseases across 10+ crops and gives you plain-language treatment advice.",
    route:       "/disease-prediction",
    tips:        ["Upload leaf photo", "Instant diagnosis", "Treatment guide"],
    accent:      "#E76F51",
    accentLight: "rgba(231,111,81,0.10)",
    accentBorder:"rgba(231,111,81,0.2)",
    badge:       { text: "AI Powered", color: "#B5430F", bg: "rgba(231,111,81,0.12)" },
  },
  {
    emoji:       "📊",
    title:       "Yield Prediction",
    tag:         "Analytics",
    description: "Predict your expected harvest output using historical data, weather patterns and soil conditions. Plan better, waste less.",
    route:       null,
    tips:        ["Historical data", "Weather patterns", "Harvest forecast"],
    accent:      "#F4A261",
    accentLight: "rgba(244,162,97,0.10)",
    accentBorder:"rgba(244,162,97,0.2)",
    badge:       { text: "Coming Soon", color: "#8B5E0A", bg: "rgba(244,162,97,0.15)" },
    comingSoon:  true,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services-section" className="py-24 scroll-mt-24" style={{ background: "#F8F5F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-5"
            style={{
              background: "rgba(244,162,97,0.12)",
              border: "1px solid rgba(244,162,97,0.3)",
              color: "#7C5C3A",
            }}
          >
            <span className="text-base">🌾</span>
            Our AI Services
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "#1A2E1A" }}>
            Everything a Farmer Needs,
            <br />
            <span style={{ color: "#40916C" }}>Powered by AI</span>
          </h2>

          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "#6B8F6E" }}>
            Simple, accurate, and fast — designed to work even in low-connectivity
            areas on any mobile device.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 transition-all duration-400 cursor-default"
              style={{
                border: `1px solid ${service.accentBorder}`,
                boxShadow: "0 2px 16px rgba(45,106,79,0.07)",
                animationDelay: `${index * 0.08}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 24px 48px rgba(45,106,79,0.14), 0 0 0 2px ${service.accent}33`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(45,106,79,0.07)";
              }}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: service.accentLight, border: `1px solid ${service.accentBorder}` }}
                >
                  {service.emoji}
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: service.badge.bg, color: service.badge.color }}
                >
                  {service.badge.text}
                </span>
              </div>

              {/* Tag */}
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: service.accent }}>
                {service.tag}
              </p>

              {/* Title */}
              <h3 className="text-xl font-extrabold mb-3 transition-colors duration-200" style={{ color: "#1A2E1A" }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B8F6E" }}>
                {service.description}
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {service.tips.map((tip, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: service.accentLight, color: service.accent, border: `1px solid ${service.accentBorder}` }}
                  >
                    {tip}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {service.comingSoon ? (
                  <div
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: service.accent }}
                  >
                    <span className="animate-pulse-soft">🔔</span>
                    Notify me when ready
                  </div>
                ) : (
                  <button
                    id={`service-${service.tag.toLowerCase().replace(/\s+/g, "-")}-btn`}
                    onClick={() => navigate(service.route)}
                    className="group/btn flex items-center gap-2 text-sm font-bold transition-all duration-200"
                    style={{ color: service.accent }}
                  >
                    Try Now
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover/btn:translate-x-1.5"
                    />
                  </button>
                )}
              </div>

              {/* Subtle accent bar at bottom on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div
          className="mt-16 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
            boxShadow: "0 16px 48px rgba(27,67,50,0.25)",
          }}
        >
          <div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
              🚀 Ready to transform your farm?
            </h3>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
              Join 50,000+ farmers already using KrishiConnect's AI tools.
            </p>
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="flex-shrink-0 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #F4A261, #E76F51)",
              color: "#1B4332",
              boxShadow: "0 8px 32px rgba(244,162,97,0.4)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
          >
            Start for Free →
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;
