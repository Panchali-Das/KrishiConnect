import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Bug,
  ArrowRight,
  Phone,
  MapPin,
  Mail,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import heroImg from "../Images/farming.webp";
import FeatureImg1 from "../Images/f2.webp";
import FeatureImg2 from "../Images/f3.jpg";
import FeatureImg3 from "../Images/f4.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const scrollToSection = (id, key) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(key); // update which tab is active
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
              <Leaf className="w-6 h-6 text-white" />
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
          {/* Right side profile section */}
          <div className="relative flex items-center gap-4">
            {user ? (
              <>
                {/* Notification Bell */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>

                {/* Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 transition overflow-hidden"
                  >
                    <UserCircle className="w-8 h-8 text-green-700" />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.name || "User"}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Profile Button */}
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        My Profile
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mt-16">
        {/* HERO SECTION */}
        <section
          id="home-section"
          className="relative bg-gradient-to-br from-[#d4f1c5] via-[#c8edb5] to-[#b8e6a0] overflow-visible"
        >
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-40 md:pt-32 md:pb-48">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="text-left">
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Welcome to KrishiConnect
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Grow Smarter & Farm Better with our Intelligent Farming
                  Platform
                </h1>

                <p className="text-base md:text-lg text-gray-700 mb-8 max-w-lg">
                  AI-powered insights for crop planning, soil health, and early
                  disease detection—tailored for Indian farms. Get personalized
                  crop advice, soil analysis, and instant disease detection—all
                  in one place.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    Get Started
                    <span className="text-xl">➜</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection("features-section", "features")
                    }
                    className="px-8 py-3 rounded-full border-2 border-green-700 text-green-700 font-semibold hover:bg-green-700 hover:text-white flex items-center justify-center gap-2"
                  >
                    Explore Features
                  </button>
                </div>
              </div>

              {/* Right image */}
              <div className="relative flex justify-center md:justify-end">
                <div className="relative">
                  {/* Green circle background */}
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-green-700 rounded-full"></div>

                  {/* Person image */}
                  <div className="relative z-10">
                    <img
                      src={heroImg}
                      alt="Happy customer with fresh groceries"
                      className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Feature Cards – PERFECT CENTER OVERLAP */}
            <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 z-20 w-full px-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Smart Automations */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Smart Automations
                    </h3>
                    <p className="text-sm text-gray-600">
                      AI-powered insights to optimize your farming operations
                      and increase productivity
                    </p>
                  </div>

                  {/* Disease Detection */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                      <Bug className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Disease Detection
                    </h3>
                    <p className="text-sm text-gray-600">
                      Early identification and prevention of crop diseases using
                      advanced AI technology
                    </p>
                  </div>

                  {/* Live Analytics */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Live Analytics
                    </h3>
                    <p className="text-sm text-gray-600">
                      Real-time monitoring and data-driven insights for better
                      decision making
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer so stats bar doesn't overlap next section */}
        <div className="h-24" />

        {/* SMART FEATURES SECTION */}
        <section id="features-section" className="bg-white py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left side - Images */}
              <div className="relative">
                <div className="flex items-center gap-4">
                  {/* Small circular image top left */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={FeatureImg1}
                      alt="Farming"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Large circular image */}
                  <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={FeatureImg2}
                      alt="Farmer working"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Small circular image bottom */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mt-4 ml-8">
                  <img
                    src={FeatureImg3}
                    alt="Crops"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div>
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Our Smart <span className="text-green-600">AI powered</span>
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Features
                  </h3>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-6">
                  {/* CARD 1 – Soil Analysis */}
                  <div className="rounded-2xl bg-[#f9faf8] p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg flex-shrink-0">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Soil Analysis & Crop Recommendations
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          Analyze NPK levels from soil samples to receive
                          tailored recommendations for crops and fertilizers to
                          optimize your yield.
                        </p>
                        <button
                          onClick={() => navigate("/soil-analysis")}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 – Disease Prediction */}
                  <div className="rounded-2xl bg-[#f9faf8] p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg flex-shrink-0">
                        <Bug className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Disease Prediction & Prevention
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          Our AI technology identifies potential crop diseases
                          early and suggests effective prevention and treatment
                          strategies.
                        </p>
                        <button
                          onClick={() => navigate("/disease-prediction")}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section id="contact-section" className="bg-white py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-green-700">
                Have a question?
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
                We're here to help you optimize your farming practices with our
                technology.
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
                      +91 1800 2345 6789
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
                      info@KrishiGibi.com
                    </p>
                    <p className="text-sm text-green-900/80">
                      support@KrishiGibi.com
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
