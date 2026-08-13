import Lease from "../models/LeaseModel.js";
import Application from "../models/ApplicationModel.js";

const createLease = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const {
      startDate,
      endDate,
      rent,
      securityDeposit,
    } = req.body;

    const ownerId = req.user._id;

    // 1. Validate required fields
    if (!startDate || !endDate || rent === undefined || securityDeposit === undefined) {
      return res.status(400).json({
        success: false,
        message: "All lease details are required",
      });
    }

    // 2. Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid lease dates",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // 3. Find application
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // 4. Only application owner can create lease
    if (application.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create a lease for this application",
      });
    }

    // 5. Application must be approved
    if (application.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Lease can only be created for an approved application",
      });
    }

    // 6. Prevent duplicate lease
    const existingLease = await Lease.findOne({
      application: applicationId,
    });

    if (existingLease) {
      return res.status(409).json({
        success: false,
        message: "Lease already exists for this application",
      });
    }

    // 7. Create lease
    const lease = await Lease.create({
      tenant: application.tenant,
      owner: application.owner,
      property: application.property,
      application: application._id,
      startDate: start,
      endDate: end,
      rent,
      securityDeposit,
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: "Lease created successfully",
      lease,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create lease",
      error: error.message,
    });
  }
};

export { createLease };