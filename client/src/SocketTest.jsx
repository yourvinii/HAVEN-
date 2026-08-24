import { useEffect } from "react";

import socket from "./services/socket.js";

const SocketTest = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    const chatId = "6a85e377bd849485c9f5b9bb";

    socket.emit("joinChat", chatId);

    console.log("Joined chat:", chatId);

    // socket.emit("sendMessage", {
    //   chatId,
    //   message: "Hello from Socket.IO",
    // });

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
