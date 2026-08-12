import Property from "../models/PropertyModel.js";

const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      rent,
      securityDeposit,
      address,
      city,
      bedrooms,
      bathrooms,
      area,
      images,
      amenities,
    } = req.body;

    const property = await Property.create({
      owner: req.user._id,
      title,
      description,
      propertyType,
      rent,
      securityDeposit,
      address,
      city,
      bedrooms,
      bathrooms,
      area,
      images,
      amenities,
    });

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isAvailable: true,
    })
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

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate(
      "owner",
      "name email phone",
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

export { createProperty, getAllProperties, getPropertyById };
