import { Router } from "express";
import {
  getMe,
  login,
  register,
  verifyEmail,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.route("/me").get(protect, getMe);
authRouter.route("/register").post(register);
authRouter.route("/verify-email").post(verifyEmail);
authRouter.route("/login").post(login);

export default authRouter;
