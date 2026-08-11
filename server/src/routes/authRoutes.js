import express from "express";
import {
  loginUser,
  registerUser,
  resendOTP,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/verify-otp").post(verifyOTP);
router.route("/resend-otp").post(resendOTP);
router.route("/login").post(loginUser);

// temporary protected routes
import protect from "../middlewares/authMiddleware.js";
router.route("/me").get(protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Your are authencicated",
    user: req.user,
  });
});

// Temporary role test route
import authorizeRole from "../middlewares/roleMiddleware.js";
// tenant
router
  .route("/tenant-test")
  .get(protect, authorizeRole("tenant"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "Tenant access guranted",
      user: req.user,
    });
  });

// owner
router
  .route("/owner-test")
  .get(protect, authorizeRole("owner"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "owner access guranted",
      user: req.user,
    });
  });

// admin
router
  .route("/admin-test")
  .get(protect, authorizeRole("admin"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "admin access guranted",
      user: req.user,
    });
  });

export default router;
