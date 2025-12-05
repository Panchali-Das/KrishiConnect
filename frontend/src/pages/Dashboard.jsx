import { useNavigate } from "react-router-dom";
import { Leaf, Bug, ArrowRight, Phone, MapPin, Mail } from "lucide-react";
import { useState } from "react";
import heroImg from "../Images/farming.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id, key) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(key); // update which tab is active
    }
  };

  /*const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Soil Analysis & Crop Recommendations",
      description:
        "Analyze NPK levels from soil samples to receive tailored recommendations for crops and fertilizers to optimize your yield.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      route: "/soil-analysis",
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Disease Prediction & Prevention",
      description:
        "Upload crop images to identify diseases early and receive AI-powered treatment recommendations.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      route: "/disease-prediction",
    },
  ];*/

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="text-3xl font-semibold text-green-700">
              KrishiConnect
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <button
              onClick={() => scrollToSection("home-section", "home")}
              className={`pb-1 border-b-2 ${
                activeSection === "home"
                  ? "text-green-600 border-green-600"
                  : "text-gray-700 border-transparent hover:text-green-600"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("features-section", "features")}
              className={`pb-1 border-b-2 ${
                activeSection === "features"
                  ? "text-green-600 border-green-600"
                  : "text-gray-700 border-transparent hover:text-green-600"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("contact-section", "contact")}
              className={`pb-1 border-b-2 ${
                activeSection === "contact"
                  ? "text-green-600 border-green-600"
                  : "text-gray-700 border-transparent hover:text-green-600"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full border border-green-500 text-green-600 text-sm font-semibold hover:bg-green-50"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="mt-16">
        {/* HERO SECTION */}
        <section
          id="home-section"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={heroImg} // TODO: change to your real image path
              alt="Farming background"
              className="w-full h-full object-cover"
            />
            {/* Green overlay */}
            <div className="absolute inset-0 bg-green-900/60" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-green-500 text-xs font-semibold uppercase tracking-wide">
              Smart Agriculture Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Farming <span className="text-lime-300">Smarter</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Transform traditional farming with AI-powered precision
              agriculture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
              >
                Get Started
                <span className="text-xl">➜</span>
              </button>
              <button
                onClick={() => scrollToSection("features-section", "features")}
                className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 flex items-center justify-center gap-2"
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* Stats bar at bottom of hero */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="bg-green-900 text-white rounded-2xl px-10 py-4 flex gap-10 text-center shadow-xl">
              <div>
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-xs uppercase tracking-wide opacity-80">
                  Farmers
                </div>
              </div>
              <div className="border-l border-green-700 pl-8">
                <div className="text-2xl font-bold">28%</div>
                <div className="text-xs uppercase tracking-wide opacity-80">
                  Yield Increase
                </div>
              </div>
              <div className="border-l border-green-700 pl-8">
                <div className="text-2xl font-bold">35+</div>
                <div className="text-xs uppercase tracking-wide opacity-80">
                  Countries
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer so stats bar doesn't overlap next section */}
        <div className="h-16" />

        {/* SMART FEATURES SECTION */}
        <section
          id="features-section"
          className="bg-[#fbfdf8] py-24 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-green-600">
              Our Smart Features
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-lg">
              KrishiConnect uses cutting-edge technology to revolutionize
              farming practices, making agriculture more sustainable,
              profitable, and efficient.
            </p>

            {/* Cards */}
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
              {/* CARD 1 – Soil Analysis */}
              <div
                className="rounded-2xl bg-white p-8 text-left shadow-sm border border-[#d3efb2]
             transition-colors duration-200 hover:bg-[#d8f0b0]"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-white/80 rounded-2xl mb-5">
                  <Leaf className="w-7 h-7 text-green-600" />
                </div>

                <h3 className="text-lg font-bold text-green-800 mb-3">
                  Soil Analysis & Crop Recommendations
                </h3>

                <p className="text-sm text-green-900/80 leading-relaxed">
                  Analyze NPK levels from soil samples to receive tailored
                  recommendations for crops and fertilizers to optimize your
                  yield.
                </p>

                <button
                  onClick={() => navigate("/soil-analysis")}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* CARD 2 – Disease Prediction */}
              <div
                className="rounded-2xl bg-white p-8 text-left shadow-sm border border-[#d3efb2]
             transition-colors duration-200 hover:bg-[#d8f0b0]"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-white/80 rounded-2xl mb-5">
                  <Bug className="w-7 h-7 text-green-600" />
                </div>

                <h3 className="text-lg font-bold text-green-800 mb-3">
                  Disease Prediction & Prevention
                </h3>

                <p className="text-sm text-green-900/80 leading-relaxed">
                  Our AI technology identifies potential crop diseases early and
                  suggests effective prevention and treatment strategies.
                </p>

                <button
                  onClick={() => navigate("/disease-prediction")}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section
          id="contact-section"
          className="bg-[#f8fff2] py-24 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">
                Contact Us
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
                Have questions about KrishiConnect? We're here to help you
                optimize your farming practices with our technology.
              </p>
            </div>

            {/* Get In Touch FULL WIDTH */}
            <div className="bg-[#e6f8c9] rounded-3xl p-10 md:p-12 shadow-sm flex flex-col gap-10">
              <h3 className="text-2xl font-bold text-green-800">
                Get in Touch
              </h3>

              <div className="grid gap-8 md:grid-cols-3">
                {/* Phone */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Phone</h4>
                    <p className="text-sm text-green-900/80">
                      +91 9876 543 210
                    </p>
                    <p className="text-sm text-green-900/80">
                      +91 1800 2345 6789 (Toll Free)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Email</h4>
                    <p className="text-sm text-green-900/80">
                      info@KrishiConnect.com
                    </p>
                    <p className="text-sm text-green-900/80">
                      support@KrishiConnect.com
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Address
                    </h4>
                    <p className="text-sm text-green-900/80">
                      123 Agriculture Way, Farming District
                    </p>
                    <p className="text-sm text-green-900/80">
                      New Delhi, 110001
                    </p>
                    <p className="text-sm text-green-900/80">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
