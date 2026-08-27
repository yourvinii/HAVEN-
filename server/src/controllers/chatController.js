import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";
import { getIO } from "../config/socket.js";
// import { io } from "../server.js";

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

const getMyChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      participants: userId,
    })
      .populate("participants", "name email role")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      count: chats.length,
      chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    const senderId = req.user._id;

    // 1. Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // 2. Find chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // 3. Check sender belongs to chat
    const isParticipant = chat.participants.some(
      (participant) => participant.toString() === senderId.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant in this chat",
      });
    }

    // 4. Find receiver
    const receiverId = chat.participants.find(
      (participant) => participant.toString() !== senderId.toString(),
    );

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // 5. Create message
    const newMessage = await Message.create({
      chat: chat._id,
      sender: senderId,
      receiver: receiverId,
      message: message.trim(),
    });

    // 6. Update chat's last message
    chat.lastMessage = message.trim();
    chat.lastMessageAt = new Date();

    await chat.save();

    // 7. Populate sender/receiver
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name email role")
      .populate("receiver", "name email role");

    // io.to(chatId).emit("newMessage", {
    //   chatId,
    //   message: populatedMessage,
    // });

    const io = getIO();

    io.to(chatId).emit("newMessage", {
      chatId,
      message: populatedMessage,
    });
    
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// const getChatMessages = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const userId = req.user._id;

//     // Pagination
//     const page = Math.max(Number(req.query.page) || 1, 1);
//     const limit = Math.min(Number(req.query.limit) || 20, 100);

//     const skip = (path - 1) * limit;

//     // 1. Find chat
//     const chat = await Chat.findById(chatId);

//     if (!chat) {
//       return res.status(404).json({
//         success: false,
//         message: "Chat not found",
//       });
//     }

//     // 2. Check participant
//     const isParticipant = chat.participants.some(
//       (participant) => participant.toString() === userId.toString(),
//     );

//     if (!isParticipant) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not a participant in this chat",
//       });
//     }

//     //  Total messages
//     const totalMessages = await Message.countDocuments({
//       chat: chatId,
//     });

//     // 3. Fetch messages
//     const messages = await Message.find({
//       chat: chatId,
//     })
//       .populate("sender", "name email role")
//       .populate("receiver", "name email role")
//       .sort({ createdAt: 1 })
//       .skip(skip)
//       .limit(limit);

//     return res.status(200).json({
//       success: true,
//       message: "Messages fetched successfully",
//       count: messages.length,
//       pagination: {
//         page,
//         limit,
//         totalMessages,
//         totalPages: Math.ceil(totalMessages / limit),
//         hasNextPage: page < Math.ceil(totalMessages / limit),
//       },
//       messages: messages.reverse(),
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch messages",
//       error: error.message,
//     });
//   }
// };

const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    // 1. Pagination
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const skip = (page - 1) * limit;

    // 2. Find chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // 3. Check participant
    const isParticipant = chat.participants.some(
      (participant) => participant.toString() === userId.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant in this chat",
      });
    }

    // 4. Total messages
    const totalMessages = await Message.countDocuments({
      chat: chatId,
    });

    // 5. Fetch messages
    const messages = await Message.find({
      chat: chatId,
    })
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      count: messages.length,
      pagination: {
        page,
        limit,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        hasNextPage: page < Math.ceil(totalMessages / limit),
      },
      messages: messages.reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    // 1. Find chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // 2. Check participant
    const isParticipant = chat.participants.some(
      (participant) => participant.toString() === userId.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant in this chat",
      });
    }

    // 3. Mark only messages received by current user as read
    const result = await Message.updateMany(
      {
        chat: chatId,
        receiver: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to mark messages as read",
      error: error.message,
    });
  }
};

export {
  createOrGetChat,
  getMyChats,
  sendMessage,
  getChatMessages,
  markMessagesAsRead,
};
