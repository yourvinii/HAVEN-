import {
  createPayment,
  getMyPayments,
  getOwnerPayments,
} from "../controllers/paymentController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

import express from "express";

const paymentRouter = express.Router();

paymentRouter.route("/my").get(protect, authorizeRole("tenant"), getMyPayments);

paymentRouter
  .route("/owner")
  .get(protect, authorizeRole("owner"), getOwnerPayments);

paymentRouter
  .route("/:leaseId")
  .post(protect, authorizeRole("tenant"), createPayment);

export default paymentRouter;
