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

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only the owner who created the property can update it
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this property",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "propertyType",
      "rent",
      "securityDeposit",
      "address",
      "city",
      "bedrooms",
      "bathrooms",
      "area",
      "images",
      "amenities",
      "isAvailable",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only the owner who created the property can delete it
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this property",
      });
    }

    await Property.findByIdAndDelete(id);

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

export {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
