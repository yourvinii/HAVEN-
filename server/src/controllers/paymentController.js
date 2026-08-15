import Payment from "../models/PaymentModel.js";
import Lease from "../models/LeaseModel.js";

const createPayment = async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { amount, paymentType } = req.body;

    const tenantId = req.user._id;

    // 1. Validate required fields
    if (amount === undefined || !paymentType) {
      return res.status(400).json({
        success: false,
        message: "Amount and payment type are required",
      });
    }

    // 2. Validate payment type
    const allowedPaymentTypes = ["rent", "security_deposit"];

    if (!allowedPaymentTypes.includes(paymentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment type",
      });
    }

    // 3. Validate amount
    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    // 4. Find lease
    const lease = await Lease.findById(leaseId);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: "Lease not found",
      });
    }

    // 5. Only lease tenant can create payment
    if (lease.tenant.toString() !== tenantId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to make payment for this lease",
      });
    }

    // 6. Lease must be active
    if (lease.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Payment can only be made for an active lease",
      });
    }

    // 7. Create payment
    const payment = await Payment.create({
      tenant: lease.tenant,
      owner: lease.owner,
      property: lease.property,
      lease: lease._id,
      amount: Number(amount),
      paymentType,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
};

export { createPayment }