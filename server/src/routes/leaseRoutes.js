import { createLease } from "../controllers/leaseController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

import express from "express";

const leaseRouter = express.Router();

leaseRouter
  .route("/:applicationId")
  .post(protect, authorizeRole("owner"), createLease);

export default leaseRouter;
