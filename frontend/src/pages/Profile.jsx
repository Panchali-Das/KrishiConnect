import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Leaf, User, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import UserAPI from "../services/userService";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    role: "",
    country: "",
    city: "",
    postalCode: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await UserAPI.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          firstName:    response.data.user.firstName    || "",
          lastName:     response.data.user.lastName     || "",
          email:        response.data.user.email        || "",
          phone:        response.data.user.phone        || "",
          dob:          response.data.user.dob          || "",
          role:         response.data.user.role         || "Farmer",
          country:      response.data.user.country      || "",
          city:         response.data.user.city         || "",
          postalCode:   response.data.user.postalCode   || "",
          profileImage: response.data.user.profileImage || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await UserAPI.put(
        "/profile",
        {
          firstName: formData.firstName, lastName: formData.lastName,
          email: formData.email, phone: formData.phone,
          dob: formData.dob, role: formData.role,
          country: formData.country, city: formData.city,
          postalCode: formData.postalCode, profileImage: formData.profileImage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayName = [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "Your Profile";
  const initials = [(formData.firstName?.[0] || ""), (formData.lastName?.[0] || "")].join("").toUpperCase() || "👤";

  const inputField = ({ id, name, label, emoji, type = "text", placeholder, icon: Icon }) => (
    <div key={name}>
      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B8F6E" }}>
        {emoji} {label}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9AB09D" }} />}
        <input
          id={id}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input-earth ${Icon ? "pl-11" : ""}`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0" }}>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "rgba(64,145,108,0.1)", color: "#2D6A4F" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#40916C,#74C69D)" }}>
            <Leaf className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-base font-bold" style={{ color: "#1A2E1A" }}>
            Krishi<span style={{ color: "#40916C" }}>Connect</span>
          </span>
        </div>
        <span className="ml-auto text-xs font-semibold" style={{ color: "#9AB09D" }}>
          My Profile
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in-up">

        {/* Success toast */}
        {saved && (
          <div
            className="flex items-center gap-3 p-4 rounded-2xl animate-scale-in"
            style={{ background: "rgba(82,183,136,0.12)", border: "1px solid rgba(82,183,136,0.3)" }}
          >
            <span className="text-xl">✅</span>
            <p className="text-sm font-bold" style={{ color: "#1B6B42" }}>Profile saved successfully!</p>
          </div>
        )}

        {/* Profile header card */}
        <div
          className="rounded-3xl"
          style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.08)", border: "1px solid rgba(64,145,108,0.12)" }}
        >
          {/* Banner — avatar is anchored here, not clipped */}
          <div
            className="h-24 relative rounded-t-3xl"
            style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F, #40916C)" }}
          >
            <div className="absolute inset-0 opacity-10 rounded-t-3xl" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #74C69D 0%, transparent 60%)" }} />

            {/* Avatar anchored to banner bottom — extends down into white area */}
            <div className="absolute bottom-0 left-6 translate-y-1/2">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-4 border-white shadow-lg text-white"
                  style={{ background: "linear-gradient(135deg, #2D6A4F, #52B788)" }}
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          {/* Content — pt-14 clears the half-avatar hanging down (80px/2 = 40px + 16px buffer) */}
          <div className="px-6 pb-6 pt-14">
            <h1 className="text-xl font-extrabold" style={{ color: "#1A2E1A" }}>{displayName}</h1>
            <p className="text-sm flex items-center gap-1.5 mt-0.5" style={{ color: "#6B8F6E" }}>
              <Briefcase className="w-3.5 h-3.5" />
              {formData.role || "Farmer"}
              {formData.city && formData.country && (
                <>
                  <span style={{ color: "#D9B896" }}>·</span>
                  <MapPin className="w-3.5 h-3.5" />
                  {formData.city}, {formData.country}
                </>
              )}
            </p>
          </div>
        </div>



        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Personal info section */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.06)", border: "1px solid rgba(64,145,108,0.1)" }}
          >
            <h2 className="text-base font-extrabold mb-6 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
              <span className="text-xl">👤</span> Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {inputField({ id: "profile-firstname", name: "firstName", label: "First Name", emoji: "", placeholder: "Ramesh", icon: User })}
              {inputField({ id: "profile-lastname",  name: "lastName",  label: "Last Name",  emoji: "", placeholder: "Kumar",  icon: User })}
              {inputField({ id: "profile-dob",       name: "dob",       label: "Date of Birth", emoji: "", type: "date", icon: Calendar })}
              {inputField({ id: "profile-email",     name: "email",     label: "Email",      emoji: "", type: "email", placeholder: "you@example.com", icon: Mail })}
              {inputField({ id: "profile-phone",     name: "phone",     label: "Phone",      emoji: "", placeholder: "+91 98765 43210", icon: Phone })}
              {inputField({ id: "profile-role",      name: "role",      label: "Occupation", emoji: "", placeholder: "Farmer, Agronomist...", icon: Briefcase })}
            </div>
          </div>

          {/* Address section */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "white", boxShadow: "0 4px 24px rgba(45,106,79,0.06)", border: "1px solid rgba(64,145,108,0.1)" }}
          >
            <h2 className="text-base font-extrabold mb-6 flex items-center gap-2" style={{ color: "#1A2E1A" }}>
              <span className="text-xl">📍</span> Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {inputField({ id: "profile-country",    name: "country",    label: "Country",     emoji: "", placeholder: "India",    icon: MapPin })}
              {inputField({ id: "profile-city",       name: "city",       label: "City / District", emoji: "", placeholder: "Amritsar", icon: MapPin })}
              {inputField({ id: "profile-postalcode", name: "postalCode", label: "PIN Code",    emoji: "", placeholder: "143001",   icon: MapPin })}
            </div>
          </div>

          {/* Save button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="profile-save-btn"
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #F4A261, #E76F51)",
                boxShadow: "0 6px 24px rgba(244,162,97,0.35)",
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(244,162,97,0.45)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(244,162,97,0.35)"; }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              style={{ background: "white", border: "1.5px solid rgba(64,145,108,0.2)", color: "#2D6A4F" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(64,145,108,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Profile;
