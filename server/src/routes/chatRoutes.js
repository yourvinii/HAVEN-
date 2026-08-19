import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createOrGetChat, getMyChats } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.route("/my").get(protect, getMyChats);

chatRouter.route("/").post(protect, createOrGetChat);

export default chatRouter;
