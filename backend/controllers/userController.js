const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        dob: req.user.dob,
        role: req.user.role,
        country: req.user.country,
        city: req.user.city,
        postalCode: req.user.postalCode,
        profileImage: req.user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      role,
      country,
      city,
      postalCode,
      profileImage,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,

        // Keep old name field for compatibility
        name: `${firstName} ${lastName}`,

        email,
        phone,
        dob,
        role,
        country,
        city,
        postalCode,
        profileImage,
      },
      {
        new: true,
      },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
