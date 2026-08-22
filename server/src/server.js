import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket.io connection

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);

    console.log(`Socket ${socket.id} joined chat: ${chatId}`);
  });

  socket.on("sendMessage", (data) => {
    const { chatId, message } = data;

    socket.to(chatId).emit("newMessage", {
      chatId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const startServer = async () => {
  try {
    await connectDB();

    server.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  } catch (error) {
    console.log("Error Connecting Server: ", error);
  }
};
startServer();
