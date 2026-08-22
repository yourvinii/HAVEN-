import { useEffect } from "react";

import socket from "./services/socket.js";

const SocketTest = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);
  return <div>Socket Test</div>;
};

export default SocketTest;
