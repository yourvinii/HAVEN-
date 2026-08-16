import User from "../models/UserModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -otp -otpExpiresAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

import Property from "../models/PropertyModel.js";

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      count: properties.length,
      properties,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(propertyId);

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

export { getAllUsers, getAllProperties, deleteProperty };
