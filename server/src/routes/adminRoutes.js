import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
});

adminRouter.route("/users").get(protect, authorizeRoles("admin"), getAllUsers);

export default adminRouter;
