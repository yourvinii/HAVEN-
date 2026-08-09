import express from "express";
import { registerUser, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.route("/verify-otp", verifyOTP);

export default router;
