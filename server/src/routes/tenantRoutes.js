import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";
import { getTenantProfile } from "../controllers/tenantController.js";

const tenantRouter = express.Router();

tenantRouter.get("/dashboard", protect, authorizeRole("tenant"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Tenant Dashboard",
    user: req.user,
  });
});

tenantRouter
  .route("/profile")
  .get(protect, authorizeRole("tenant"), getTenantProfile);

export default tenantRouter;
