import express, { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const ownerRouter = express.Router();

ownerRouter
  .route("/dashboard")
  .get(protect, authorizeRole("owner"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Owner Dashboard",
      user: req.user,
    });
  });

export default ownerRouter;
