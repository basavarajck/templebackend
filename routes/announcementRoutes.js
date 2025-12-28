import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { permitRoles, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------
   1️⃣ PUBLIC — Get all active announcements
------------------------------------------------- */
router.get("/", getAnnouncements);

/* -------------------------------------------------
   2️⃣ COMMITTEE / ADMIN — Create announcement
------------------------------------------------- */
router.post(
  "/add",
  authMiddleware,
  permitRoles("committee", "admin"),
  createAnnouncement
);

/* -------------------------------------------------
   3️⃣ COMMITTEE / ADMIN — Update announcement
------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  updateAnnouncement
);

/* -------------------------------------------------
   4️⃣ ADMIN ONLY — Delete announcement
------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  deleteAnnouncement
);

export default router;
