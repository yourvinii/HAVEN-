import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
} from "../controllers/propertyController.js";

const propertyRouter = express.Router();

propertyRouter.route("/").post(protect, authorizeRole("owner"), createProperty);
propertyRouter.route("/").get(protect, getAllProperties);
propertyRouter.route("/:id").get(protect, getPropertyById);
propertyRouter
  .route("/:id")
  .patch(protect, authorizeRole("owner"), updateProperty);
export default propertyRouter;
