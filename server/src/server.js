import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(8888, () => {
      console.log("App is running on http://localhost:8888");
    });
  } catch (error) {
    console.log("Error Server side: ", error);
  }
};

startServer();
