import {
  createApplication,
  getMyApplications,
  getOwnerApplications,
} from "../controllers/applicationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

import express from "express";

const applicationRouter = express.Router();

applicationRouter
  .route("/")
  .get(protect, authorizeRole("tenant"), getMyApplications);

applicationRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createApplication);

applicationRouter
  .route("/")
  .get(protect, authorizeRole("owner"), getOwnerApplications);

export default applicationRouter;
