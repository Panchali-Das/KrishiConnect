import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import API from "../services/authService";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Compute filled fields for progress
  const filledCount = Object.values(formData).filter(v => v.length > 0).length;
  const progress = Math.round((filledCount / 5) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F5F0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Left panel — illustration (mirrored from Login) */}
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
          <div className="text-7xl animate-bounce-gentle">🌱</div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Join the Future<br />
            of <span style={{ color: "#F4A261" }}>Farming!</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Create your free account and get instant access to AI crop recommendations,
            disease detection, and personalized farming insights.
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              "Free forever — no credit card needed",
              "Works on any phone, even low-end devices",
              "Available in your local language (coming soon)",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#74C69D" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            "Trusted by 50,000+ farmers across India"
          </p>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[440px] animate-fade-in-up">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #40916C, #74C69D)" }}>
              <Leaf className="w-4.5 h-4.5 text-white fill-white" />
            </div>
            <span className="text-lg font-extrabold" style={{ color: "#1A2E1A" }}>
              Krishi<span style={{ color: "#40916C" }}>Connect</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: "#1A2E1A" }}>
            Create Account
          </h1>
          <p className="text-sm mb-2" style={{ color: "#6B8F6E" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-bold" style={{ color: "#2D6A4F" }}>
              Sign in →
            </Link>
          </p>

          {/* Form completion progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span style={{ color: "#9AB09D" }}>Form completion</span>
              <span className="font-bold" style={{ color: "#2D6A4F" }}>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "#E0EDE6" }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #40916C, #74C69D)" }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* First + Last name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>👤 First Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />
                  <input
                    id="signup-firstname-input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-earth pl-10 text-sm"
                    placeholder="Ramesh"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>Last Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />
                  <input
                    id="signup-lastname-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-earth pl-10 text-sm"
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>📧 Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />
                <input
                  id="signup-email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-earth pl-11"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>🔒 Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />
                <input
                  id="signup-password-input"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-earth pl-11 pr-11"
                  placeholder="Min. 6 characters"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#9AB09D" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#40916C"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9AB09D"; }}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "#1A2E1A" }}>✅ Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />
                <input
                  id="signup-confirm-password-input"
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-earth pl-11 pr-11"
                  placeholder="Re-enter password"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#9AB09D" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#40916C"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9AB09D"; }}
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="helper-text mt-1.5" style={{ color: "#B5430F" }}>
                  ❌ Passwords don't match
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6 && (
                <p className="helper-text mt-1.5" style={{ color: "#1B6B42" }}>
                  ✅ Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4.5 h-4.5 rounded"
                style={{ accentColor: "#2D6A4F" }}
              />
              <span className="text-sm leading-relaxed" style={{ color: "#6B8F6E" }}>
                I agree to the{" "}
                <a href="#" className="font-semibold" style={{ color: "#2D6A4F" }}>Terms & Conditions</a>{" "}
                and{" "}
                <a href="#" className="font-semibold" style={{ color: "#2D6A4F" }}>Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
              style={{
                background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                boxShadow: "0 6px 24px rgba(45,106,79,0.35)",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(45,106,79,0.45)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,106,79,0.35)"; }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Free Account
                </>
              )}
            </button>
          </form>

          {/* Language placeholder */}
          <div className="mt-6 text-center">
            <button className="text-xs font-medium" style={{ color: "#9AB09D" }}>
              🌐 English · हिंदी (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
