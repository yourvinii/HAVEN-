import { Router } from "express";
import { register, verifyEmail } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").post(register);
authRouter.route("/verify-email").post(verifyEmail);

export default authRouter;
