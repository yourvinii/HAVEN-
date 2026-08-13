import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import { createInquiry, getMyInquiries } from "../controllers/inquiryController.js";

const inquireRouter = express.Router();

inquireRouter.route("/").get(protect, authorizeRole("tenant"), getMyInquiries);

inquireRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), createInquiry);

export default inquireRouter;
