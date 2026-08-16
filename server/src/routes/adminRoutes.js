import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  deleteProperty,
  getAllProperties,
  getAllUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
});

adminRouter.route("/users").get(protect, authorizeRoles("admin"), getAllUsers);

adminRouter
  .route("/properties")
  .get(protect, authorizeRoles("admin"), getAllProperties);

adminRouter
  .route("/:propertyId")
  .delete(protect, authorizeRoles("admin"), deleteProperty);

export default adminRouter;
