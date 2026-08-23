import { useEffect } from "react";

import socket from "./services/socket.js";

const SocketTest = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    const chatId = "YOUR_CHAT_ID";

    socket.emit("joinChat", chatId);

    console.log("Joined chat:", chatId);

    socket.on("newMessage", (data) => {
      console.log("New message received:", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => {
      socket.off("connect");
      socket.off("newMessage");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);
  return <div>Socket Test</div>;
};

export default SocketTest;
