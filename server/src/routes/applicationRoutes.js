import { createApplication } from "../controllers/applicationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

import express from "express";

const applicationRouter = express.Router();

applicationRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createApplication);

export default applicationRouter;
