import express from "express";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import tenantRouter from "./routes/tenantRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/auth", authRoutes);
app.use("/api/tenant", tenantRouter);
app.use("/api/owner", ownerRouter);

export default app;
