import Inquiry from "../models/InquiryModel.js";
import Property from "../models/PropertyModel.js";

const createInquiry = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { message } = req.body;

    const tenantId = req.user._id;

    // 1. Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // 2. Check property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // 3. Check property availability
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Property is not available",
      });
    }

    // 4. Prevent owner from being the tenant
    if (property.owner.toString() === tenantId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot inquire about your own property",
      });
    }

    // 5. Create inquiry
    const inquiry = await Inquiry.create({
      tenant: tenantId,
      property: property._id,
      owner: property.owner,
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      inquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create inquiry",
      error: error.message,
    });
  }
};

export { createInquiry };