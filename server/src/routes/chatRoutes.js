import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createOrGetChat,
  getChatMessages,
  getMyChats,
  markMessagesAsRead,
  sendMessage,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.route("/my").get(protect, getMyChats);

chatRouter.route("/:chatId/messages").get(protect, getChatMessages);

chatRouter.route("/:chatId/messages/read").patch(protect, markMessagesAsRead)

chatRouter.route("/").post(protect, createOrGetChat);

chatRouter.route("/:chatId/messages").post(protect, sendMessage);

export default chatRouter;
