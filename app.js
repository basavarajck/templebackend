import "dotenv/config";
import express from "express";
import cors from "cors";

// Database connection
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";

const app = express();

// Connect DB (safe to call once)
connectDB();

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// ⚠️ Vercel DOES NOT persist uploads (temporary only)
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Temple Backend Running Successfully",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/activity-logs", activityLogRoutes);

export default app; // ✅ VERY IMPORTANT
