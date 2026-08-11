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

export default router;
