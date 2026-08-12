import express from "express";

import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import { addToWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter
  .route("/:propertyId")
  .post(protect, authorizeRole("tenant"), addToWishlist);

export default wishlistRouter;
