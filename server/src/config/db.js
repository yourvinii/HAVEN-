import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ingenuine");
    console.log("DB Connected.");
  } catch (error) {
    console.log("Error connecting DB: ", error);
  }
};

export default connectDB;
