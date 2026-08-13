import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import {
  createInquiry,
  getMyInquiries,
  getOwnerInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";

const inquireRouter = express.Router();

inquireRouter.route("/").get(protect, authorizeRole("tenant"), getMyInquiries);

inquireRouter
  .route("/owner")
  .get(protect, authorizeRole("owner"), getOwnerInquiries);

inquireRouter
  .route("/:inquiryId/status")
  .patch(protect, authorizeRole("owner"), updateInquiryStatus);

inquireRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createInquiry);

export default inquireRouter;
