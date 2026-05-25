import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await UserAPI.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          email: response.data.user.email || "",
          phone: response.data.user.phone || "",
          dob: response.data.user.dob || "",
          role: response.data.user.role || "Farmer",
          country: response.data.user.country || "",
          city: response.data.user.city || "",
          postalCode: response.data.user.postalCode || "",
          profileImage: response.data.user.profileImage || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("authToken");

      const response = await UserAPI.put(
        "/profile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          role: formData.role,
          country: formData.country,
          city: formData.city,
          postalCode: formData.postalCode,
          profileImage: formData.profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-800">My Profile</h1>
        {/* Top Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-6">
          <img
            src={formData.profileImage || "https://i.pravatar.cc/150?img=12"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
          />

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </h2>

            <p className="text-gray-500">{formData.role}</p>

            <p className="text-sm text-gray-400">
              {formData.city}, {formData.country}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-green-800">
              Personal Information
            </h3>

            <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
              Edit
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label className="text-sm text-gray-500">First Name</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Last Name</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone Number</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">User Role</label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-6">Address</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Country</label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Postal Code</label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white border px-6 py-3 rounded-xl hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
