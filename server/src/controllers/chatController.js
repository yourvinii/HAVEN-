import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";

const createOrGetChat = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    const currentUserId = req.user._id;
    const { userId } = req.body;

    // 1. Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // 2. Prevent chatting with yourself
    if (currentUserId.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot create a chat with yourself",
      });
    }

    // 3. Check other user exists
    const otherUser = await User.findById(userId);

    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Find existing chat
    let chat = await Chat.findOne({
      participants: {
        $all: [currentUserId, userId],
      },
    }).populate("participants", "name email role");

    // 5. If chat doesn't exist, create it
    if (!chat) {
      chat = await Chat.create({
        participants: [currentUserId, userId],
      });

      chat = await Chat.findById(chat._id).populate(
        "participants",
        "name email role",
      );
    }

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create or fetch chat",
      error: error.message,
    });
  }
};

export { createOrGetChat };
