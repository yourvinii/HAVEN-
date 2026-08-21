import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";


const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    
    server.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  } catch (error) {
    console.log("Error Connecting Server: ", error);
  }
};
startServer();
