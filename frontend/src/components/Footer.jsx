import { Leaf, Github, Linkedin, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = ({ scrollToSection }) => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Home",      action: () => scrollToSection("home-section", "home") },
    { label: "About",     action: () => scrollToSection("about-section", "about") },
    { label: "Services",  action: () => scrollToSection("services-section", "services") },
    { label: "Insights",  action: () => scrollToSection("insights-section", "insights") },
    { label: "Contact",   action: () => scrollToSection("contact-section", "contact") },
  ];

  const features = [
    { label: "🌱 Crop Recommendation", route: "/soil-analysis",     active: true  },
    { label: "🔬 Disease Detection",   route: "/disease-prediction", active: true  },
    { label: "📊 Yield Prediction",    route: null,                  active: false },
  ];

  const socials = [
    { icon: Linkedin,  label: "LinkedIn",  href: "#" },
    { icon: Github,    label: "GitHub",    href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter,   label: "X (Twitter)", href: "#" },
  ];

  return (
    <footer style={{ background: "#1B4332" }} className="text-white">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-14">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}
              >
                <Leaf className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  Krishi<span style={{ color: "#F4A261" }}>Connect</span>
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#74C69D" }}>
                  AI Powered Agriculture
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              Empowering farmers with Artificial Intelligence — crop recommendations,
              disease detection, and smart agricultural insights. Always free.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(244,162,97,0.18)";
                    e.currentTarget.style.borderColor = "rgba(244,162,97,0.4)";
                    e.currentTarget.style.color = "#F4A261";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#74C69D" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, action }, i) => (
                <li key={i}>
                  <button
                    onClick={action}
                    className="text-sm transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#F4A261"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#74C69D" }}>
              AI Features
            </h3>
            <ul className="space-y-3">
              {features.map(({ label, route, active }, i) => (
                <li key={i}>
                  {active ? (
                    <button
                      onClick={() => navigate(route)}
                      className="text-sm text-left transition-all duration-200"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#F4A261"; e.currentTarget.style.paddingLeft = "4px"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.paddingLeft = "0"; }}
                    >
                      {label}
                    </button>
                  ) : (
                    <span
                      className="text-sm flex items-center gap-2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {label}
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                        style={{ background: "rgba(244,162,97,0.15)", color: "#F4A261", border: "1px solid rgba(244,162,97,0.2)" }}
                      >
                        Soon
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#74C69D" }}>
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:support@krishiconnect.com"
                className="flex items-center gap-3 transition-all duration-200 group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: "rgba(244,162,97,0.12)", border: "1px solid rgba(244,162,97,0.2)" }}
                >
                  <Mail size={15} style={{ color: "#F4A261" }} />
                </div>
                <span className="text-sm transition-colors duration-200 group-hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>
                  support@krishiconnect.com
                </span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 transition-all duration-200 group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: "rgba(244,162,97,0.12)", border: "1px solid rgba(244,162,97,0.2)" }}
                >
                  <Phone size={15} style={{ color: "#F4A261" }} />
                </div>
                <span className="text-sm transition-colors duration-200 group-hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>
                  +91 98765 43210
                </span>
              </a>

              {/* Language toggle placeholder */}
              <div
                className="mt-4 flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-base">🌐</span>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Language: English
                </span>
                <span
                  className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: "rgba(64,145,108,0.2)", color: "#74C69D", border: "1px solid rgba(64,145,108,0.25)" }}
                >
                  + Hindi soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © 2025 KrishiConnect. All rights reserved. Made with 💚 for Indian Farmers.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
