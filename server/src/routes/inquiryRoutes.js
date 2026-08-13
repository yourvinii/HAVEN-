import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import {
  createInquiry,
  getMyInquiries,
  getOwnerInquiries,
} from "../controllers/inquiryController.js";

const inquireRouter = express.Router();

inquireRouter.route("/").get(protect, authorizeRole("tenant"), getMyInquiries);

inquireRouter
  .route("/owner")
  .get(protect, authorizeRole("owner"), getOwnerInquiries);

inquireRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createInquiry);

export default inquireRouter;
