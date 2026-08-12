import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import { createProperty, getAllProperties } from "../controllers/propertyController.js";

const propertyRouter = express.Router();

propertyRouter.route("/").post(protect, authorizeRole("owner"), createProperty);
propertyRouter.route("/").get(protect, getAllProperties);
export default propertyRouter;
