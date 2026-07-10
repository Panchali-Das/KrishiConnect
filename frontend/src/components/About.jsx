import A1 from "../Images/A1.jpg";
import A2 from "../Images/A2.jpg";
import A3 from "../Images/A3.jpeg";
import A4 from "../Images/A4.jpg";
import A5 from "../Images/A5.jpg";

const stats = [
  { emoji: "👨‍🌾", value: "50,000+", label: "Farmers Helped",     sub: "Across India"     },
  { emoji: "🌾",   value: "22+",     label: "Crops Supported",   sub: "Paddy to Grapes"  },
  { emoji: "🤖",   value: "95%",     label: "AI Accuracy",       sub: "Disease detection" },
  { emoji: "📱",   value: "Free",    label: "Always Free",       sub: "No subscription"   },
];

const About = () => {
  return (
    <section id="about-section" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
            style={{
              background: "rgba(244,162,97,0.12)",
              border: "1px solid rgba(244,162,97,0.3)",
              color: "#7C5C3A",
            }}
          >
            <span>🌿</span> About Us
          </div>
        </div>

        {/* Main Heading with inline images */}
        <div className="mb-14 animate-fade-in-up delay-100">
          <h2
            className="text-3xl lg:text-5xl font-extrabold leading-snug max-w-4xl"
            style={{ color: "#1A2E1A" }}
          >
            We Help Farmers{" "}
            <img src={A1} alt="Farmer" className="inline-block w-12 h-10 rounded-full object-cover mx-1 align-middle shadow-md" />
            <img src={A4} alt="Farmer" className="inline-block w-12 h-10 rounded-full object-cover mx-1 align-middle shadow-md" />
            {" "}Improve Productivity
            <br />
            and Sustainability Through{" "}
            <span style={{ color: "#40916C" }}>Innovative
              <img src={A2} alt="Farm" className="inline-block w-16 h-10 rounded-full object-cover mx-2 align-middle shadow-md" />
            </span>
            <br />
            Agricultural{" "}
            <img src={A3} alt="Crop" className="inline-block w-12 h-10 rounded-full object-cover mx-1 align-middle shadow-md" />
            Solutions.
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed max-w-3xl mb-16 animate-fade-in-up delay-200" style={{ color: "#6B8F6E" }}>
          KrishiConnect was built with one goal: make advanced agricultural AI accessible to every
          farmer — regardless of technology comfort level or literacy. Our tools are designed to
          be fast, simple, and useful in the field, on any device.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-300">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl transition-all duration-300 card-lift text-center"
              style={{
                background: i % 2 === 0 ? "#F8F5F0" : "white",
                border: "1px solid rgba(64,145,108,0.12)",
                boxShadow: "0 2px 16px rgba(45,106,79,0.06)",
              }}
            >
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-3xl font-extrabold mb-1" style={{ color: "#2D6A4F" }}>
                {s.value}
              </div>
              <div className="text-sm font-bold mb-0.5" style={{ color: "#1A2E1A" }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: "#9AB09D" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
