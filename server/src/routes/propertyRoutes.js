import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/propertyController.js";

const propertyRouter = express.Router();

propertyRouter.route("/").post(protect, authorizeRole("owner"), createProperty);
propertyRouter.route("/").get(protect, getAllProperties);
propertyRouter.route("/:id").get(protect, getPropertyById);
export default propertyRouter;
