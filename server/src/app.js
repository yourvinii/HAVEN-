import express from "express";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import tenantRouter from "./routes/tenantRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import inquireRouter from "./routes/inquiryRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import leaseRouter from "./routes/leaseRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

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
app.use("/api/admin", adminRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/inquires", inquireRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/leases", leaseRouter);
app.use("api/payments", paymentRouter)

export default app;
