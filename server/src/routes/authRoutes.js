import express from "express";
import {
  registerUser,
  resendOTP,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/verify-otp").post(verifyOTP);
router.route("/resend-otp").post(resendOTP);

export default router;
