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

export { createProperty };