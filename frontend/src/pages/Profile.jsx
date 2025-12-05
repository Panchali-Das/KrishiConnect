// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, User, Mail } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const initial = (user.name || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-green-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold mb-3">
              {initial}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {user.name || "User"}
            </h1>
            <p className="text-gray-500 text-sm">
              {user.role || "Farmer / User"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs uppercase text-gray-400 tracking-wide">
                  Full Name
                </p>
                <p className="text-gray-800">{user.name || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs uppercase text-gray-400 tracking-wide">
                  Email
                </p>
                <p className="text-gray-800">{user.email || "Not provided"}</p>
              </div>
            </div>

            {/* Add more fields if you store them in localStorage */}
            {user.phone && (
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                  📱
                </span>
                <div>
                  <p className="text-xs uppercase text-gray-400 tracking-wide">
                    Phone
                  </p>
                  <p className="text-gray-800">{user.phone}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="px-4 py-2 rounded-lg border border-green-200 text-green-700 hover:bg-green-50 text-sm font-medium"
              onClick={() => alert("Edit profile coming soon…")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
