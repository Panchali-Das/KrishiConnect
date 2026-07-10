import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import Farmer1 from "../Images/Farmer1.jpg";
import Farmer2 from "../Images/Farmer2.jpeg";
import Farmer3 from "../Images/Farmer3.jpg";
import Farmer4 from "../Images/Farmer4.jpeg";

const testimonials = [
  {
    image: Farmer1,
    name: "Ramesh Kumar",
    location: "Punjab, India",
    flag: "🇮🇳",
    crop: "Wheat",
    review: "KrishiConnect helped me identify crop diseases much earlier. The AI recommendations improved my wheat yield by 30% and reduced fertilizer costs significantly.",
    rating: 5,
    metric: { label: "Yield increase", value: "+30%" },
  },
  {
    image: Farmer2,
    name: "Sunita Devi",
    location: "West Bengal, India",
    flag: "🇮🇳",
    crop: "Rice",
    review: "The soil analysis feature is extremely useful. I now know exactly which nutrients my rice field needs before every season. Very easy to use!",
    rating: 5,
    metric: { label: "Cost saved", value: "₹8,000" },
  },
  {
    image: Farmer3,
    name: "Anita Sharma",
    location: "Maharashtra, India",
    flag: "🇮🇳",
    crop: "Tomato",
    review: "Disease prediction saved my tomato crop. The suggestions were easy to understand and very accurate. I've recommended it to my whole village.",
    rating: 5,
    metric: { label: "Crop saved", value: "100%" },
  },
  {
    image: Farmer4,
    name: "Mahesh Patil",
    location: "Rajasthan, India",
    flag: "🇮🇳",
    crop: "Wheat",
    review: "KrishiConnect has completely changed the way we monitor our crops. It's simple, fast and reliable — even on my basic smartphone.",
    rating: 5,
    metric: { label: "Time saved", value: "2 hrs/day" },
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 200);
  };

  const t = testimonials[current];

  return (
    <section
      id="insights-section"
      className="py-24 overflow-hidden"
      style={{ background: "#F8F5F0" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
              style={{
                background: "rgba(244,162,97,0.12)",
                border: "1px solid rgba(244,162,97,0.3)",
                color: "#7C5C3A",
              }}
            >
              <span>⭐</span> Farmer Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: "#1A2E1A" }}>
              Voices from the Field
            </h2>
            <p className="mt-3 text-lg max-w-xl leading-relaxed" style={{ color: "#6B8F6E" }}>
              Real farmers, real results — from Punjab to Maharashtra.
            </p>
          </div>

          {/* Nav buttons (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border"
              style={{
                background: "white",
                borderColor: "rgba(64,145,108,0.2)",
                color: "#2D6A4F",
                boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2D6A4F"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#2D6A4F"; }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo((current + 1) % testimonials.length)}
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border"
              style={{
                background: "#2D6A4F",
                borderColor: "#2D6A4F",
                color: "white",
                boxShadow: "0 4px 16px rgba(45,106,79,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1B4332"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#2D6A4F"; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div
          className="rounded-3xl overflow-hidden transition-opacity duration-200"
          style={{
            background: "white",
            boxShadow: "0 8px 48px rgba(45,106,79,0.12)",
            opacity: isAnimating ? 0.6 : 1,
          }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left — Image */}
            <div className="relative h-64 lg:h-auto min-h-[340px]">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(27,67,50,0.2), transparent)" }}
              />
              {/* Crop tag */}
              <div
                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(27,67,50,0.85)", color: "#74C69D", backdropFilter: "blur(8px)" }}
              >
                <span>🌾</span>
                {t.crop} Farmer
              </div>
              {/* Metric badge */}
              <div
                className="absolute bottom-4 left-4 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(244,162,97,0.92)", backdropFilter: "blur(8px)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#5C3D1E" }}>{t.metric.label}</p>
                <p className="text-xl font-extrabold" style={{ color: "#1B4332" }}>{t.metric.value}</p>
              </div>
            </div>

            {/* Right — Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote icon */}
              <div className="text-5xl font-serif mb-4" style={{ color: "rgba(64,145,108,0.2)", lineHeight: 1 }}>
                "
              </div>

              {/* Review */}
              <p className="text-xl leading-relaxed font-medium mb-8" style={{ color: "#3D5A40" }}>
                {t.review}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2"
                  style={{ borderColor: "rgba(64,145,108,0.2)" }}
                />
                <div>
                  <h3 className="text-base font-extrabold" style={{ color: "#1A2E1A" }}>
                    {t.name}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#40916C" }}>
                    {t.flag} {t.location}
                  </p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === current ? "32px" : "8px",
                      height: "8px",
                      background: i === current ? "#2D6A4F" : "rgba(64,145,108,0.25)",
                    }}
                  />
                ))}

                {/* Mobile nav */}
                <div className="flex items-center gap-2 ml-auto lg:hidden">
                  <button
                    onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
                    style={{ borderColor: "rgba(64,145,108,0.2)", color: "#2D6A4F" }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => goTo((current + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: "#2D6A4F", color: "white" }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
