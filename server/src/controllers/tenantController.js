const getTenantProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "Tenant profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePic: user.profilePic,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tenant profile",
      error: error.message,
    });
  }
};

export { getTenantProfile };