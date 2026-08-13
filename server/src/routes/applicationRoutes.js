import {
  createApplication,
  getMyApplications,
  getOwnerApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

import express from "express";

const applicationRouter = express.Router();

applicationRouter
  .route("/")
  .get(protect, authorizeRole("tenant"), getMyApplications);

applicationRouter
  .route("/owner")
  .get(protect, authorizeRole("owner"), getOwnerApplications);

applicationRouter
  .route("/:applicationId/status")
  .patch(protect, authorizeRole("owner"), updateApplicationStatus);

applicationRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createApplication);

export default applicationRouter;
