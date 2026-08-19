import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createOrGetChat } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.route("/").post(protect, createOrGetChat);

export default chatRouter;
