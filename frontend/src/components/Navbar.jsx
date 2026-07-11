import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Bell,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Layers,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";

const Navbar = ({ activeSection, scrollToSection }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { title: "Home",     id: "home-section",     key: "home",     icon: Home },
    { title: "About",    id: "about-section",    key: "about",    icon: Info },
    { title: "Services", id: "services-section", key: "services", icon: Layers },
    { title: "Insights", id: "insights-section", key: "insights", icon: Star },
    { title: "Contact",  id: "contact-section",  key: "contact",  icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        {/* Floating earthy glass nav pill */}
        <div
          className="backdrop-blur-xl border rounded-2xl px-5 h-[68px] flex items-center justify-between shadow-lg"
          style={{
            background: "rgba(27, 67, 50, 0.85)",
            borderColor: "rgba(82, 183, 136, 0.2)",
            boxShadow: "0 8px 32px rgba(27, 67, 50, 0.3)",
          }}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            onClick={() => scrollToSection("home-section", "home")}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}
            >
              <Leaf className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                Krishi<span style={{ color: "#F4A261" }}>Connect</span>
              </h1>
              <p className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: "#74C69D" }}>
                AI Powered Agriculture
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id, item.key)}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "#F4A261" : "rgba(255,255,255,0.75)",
                    background: isActive ? "rgba(244,162,97,0.12)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.title}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: "#F4A261" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* AI Chat */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "#F4A261";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  }}
                  title="Open AI Chat"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                </button>

                {/* Notifications */}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: "rgba(82,183,136,0.3)",
                      background: "rgba(82,183,136,0.12)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(82,183,136,0.22)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(82,183,136,0.12)"; }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #40916C, #52B788)" }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`}
                      style={{ color: "#74C69D" }}
                    />
                  </button>

                  {showProfileMenu && (
                    <div
                      className="absolute right-0 mt-2 w-60 rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        background: "rgba(27, 67, 50, 0.98)",
                        border: "1px solid rgba(82,183,136,0.2)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div
                        className="px-4 py-4 border-b"
                        style={{ borderColor: "rgba(82,183,136,0.15)", background: "rgba(64,145,108,0.1)" }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#74C69D" }}>
                          Logged in as
                        </p>
                        <h3 className="font-bold text-white mt-0.5 truncate">{user?.name}</h3>
                        <p className="text-xs truncate mt-0.5" style={{ color: "#74C69D" }}>
                          {user?.email}
                        </p>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                          className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <UserCircle className="w-4 h-4" style={{ color: "#74C69D" }} />
                          My Profile
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                          style={{ color: "#F4A261" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,162,97,0.1)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                >
                  Log In
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #F4A261, #E76F51)",
                    color: "#1B4332",
                    boxShadow: "0 4px 16px rgba(244,162,97,0.35)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(244,162,97,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(244,162,97,0.35)"; }}
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid rgba(82,183,136,0.25)", background: "rgba(82,183,136,0.1)", color: "#fff" }}
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div
          className="lg:hidden mx-4 mt-2 rounded-2xl p-4 animate-scale-in"
          style={{
            background: "rgba(27, 67, 50, 0.97)",
            border: "1px solid rgba(82,183,136,0.2)",
            boxShadow: "0 16px 48px rgba(27,67,50,0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { scrollToSection(item.id, item.key); setMobileMenu(false); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(244,162,97,0.15)" : "transparent",
                    color: isActive ? "#F4A261" : "rgba(255,255,255,0.8)",
                    borderLeft: isActive ? "3px solid #F4A261" : "3px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </button>
              );
            })}

            {user && (
              <div className="pt-3 mt-3" style={{ borderTop: "1px solid rgba(82,183,136,0.15)" }}>
                <button
                  onClick={() => { navigate("/dashboard"); setMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: "#74C69D" }} />
                  AI Chat
                </button>
              </div>
            )}

            {!user && (
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(82,183,136,0.15)" }}>
                <button
                  onClick={() => navigate("/login")}
                  className="py-3 text-center text-sm font-semibold rounded-xl transition-all"
                  style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(82,183,136,0.25)" }}
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="py-3 text-center text-sm font-bold rounded-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #F4A261, #E76F51)", color: "#1B4332" }}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
