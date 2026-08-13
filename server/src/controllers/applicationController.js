import Application from "../models/ApplicationModel.js";
import Property from "../models/PropertyModel.js";

const createApplication = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { message } = req.body;

    const tenantId = req.user._id;

    // 1. Check property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // 2. Check property availability
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Property is not available",
      });
    }

    // 3. Prevent owner from applying to own property
    if (property.owner.toString() === tenantId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot apply to your own property",
      });
    }

    // 4. Check existing application
    const existingApplication = await Application.findOne({
      tenant: tenantId,
      property: propertyId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this property",
      });
    }

    // 5. Create application
    const application = await Application.create({
      tenant: tenantId,
      property: property._id,
      owner: property.owner,
      message: message ? message.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

export { createApplication };