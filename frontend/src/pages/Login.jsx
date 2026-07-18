import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight } from "lucide-react";
import API from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F5F0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Left panel — illustration */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12"
        style={{ background: "linear-gradient(160deg, #1B4332, #2D6A4F, #40916C)" }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "rgba(116,198,157,0.12)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full" style={{ background: "rgba(244,162,97,0.08)", transform: "translate(-30%, 30%)" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Leaf className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white leading-tight">
              Krishi<span style={{ color: "#F4A261" }}>Connect</span>
            </h2>
            <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
              AI Powered Agriculture
            </p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div className="text-7xl animate-leaf-sway">🌾</div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Welcome Back,<br />
            <span style={{ color: "#F4A261" }}>Farmer!</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Access your AI-powered farming tools — crop recommendations,
            disease detection, and yield predictions — all in one place.
          </p>

          {/* Feature pills */}
          <div className="space-y-2">
            {[
              { emoji: "🌱", text: "Smart Crop Recommendations" },
              { emoji: "🔬", text: "Instant Disease Detection" },
              { emoji: "📊", text: "Yield Prediction (Coming Soon)" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span className="text-lg">{f.emoji}</span>
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            "Making farming smarter with AI-powered insights"
          </p>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[420px] animate-fade-in-up">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}>
              <Leaf className="w-4.5 h-4.5 text-white fill-white" />
            </div>
            <span className="text-lg font-extrabold" style={{ color: "#1A2E1A" }}>
              Krishi<span style={{ color: "#40916C" }}>Connect</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
            Sign In
          </h1>
          <p className="text-sm mb-8" style={{ color: "#6B8F6E" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold" style={{ color: "#2D6A4F" }}>
              Sign up free →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-3 p-4 rounded-2xl animate-scale-in"
                style={{ background: "rgba(231,111,81,0.08)", border: "1px solid rgba(231,111,81,0.25)" }}
              >
                <span className="text-lg flex-shrink-0">⚠️</span>
                <p className="text-sm" style={{ color: "#B5430F" }}>{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>
                📧 Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5" style={{ color: "#9AB09D" }} />
                <input
                  id="login-email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-earth pl-12"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>
                🔒 Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5" style={{ color: "#9AB09D" }} />
                <input
                  id="login-password-input"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-earth pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#9AB09D" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#40916C"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9AB09D"; }}
                >
                  {showPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#2D6A4F" }}
                />
                <span className="text-sm" style={{ color: "#6B8F6E" }}>Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold transition-colors" style={{ color: "#2D6A4F" }}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #F4A261, #E76F51)",
                boxShadow: "0 6px 24px rgba(244,162,97,0.4)",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(244,162,97,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(244,162,97,0.4)"; }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Language toggle placeholder */}
          <div className="mt-8 text-center">
            <button className="text-xs font-medium" style={{ color: "#9AB09D" }}>
              🌐 English · हिंदी (coming soon)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
