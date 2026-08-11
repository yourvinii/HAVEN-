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


export default router;
