import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const tenantRouter = express.Router();

tenantRouter.get("/dashboard", protect, authorizeRole("tenant"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Tenant Dashboard",
    user: req.user,
  });
});

export default tenantRouter;
