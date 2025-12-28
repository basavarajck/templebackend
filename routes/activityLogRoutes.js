import express from "express";
import { getActivityLogs } from "../controllers/activityLogController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------
   ADMIN — View Activity Logs
------------------------------------------------- */
router.get(
  "/",
  authMiddleware,
  adminOnly,
  getActivityLogs
);

export default router;
