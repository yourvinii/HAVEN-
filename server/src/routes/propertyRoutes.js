import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import { createProperty } from "../controllers/propertyController.js";

const propertyRouter = express.Router();

propertyRouter.route("/").post(protect, authorizeRole("owner"), createProperty);

export default propertyRouter;
