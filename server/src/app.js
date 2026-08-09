import express from "express";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/auth", authRoutes);

export default app;
