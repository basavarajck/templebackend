import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  disableEvent,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { permitRoles, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------
   1️⃣ PUBLIC — Get all active events
------------------------------------------------- */
router.get("/", getEvents);

/* -------------------------------------------------
   2️⃣ COMMITTEE / ADMIN — Create event
------------------------------------------------- */
router.post(
  "/add",
  authMiddleware,
  permitRoles("committee", "admin"),
  createEvent
);

/* -------------------------------------------------
   3️⃣ COMMITTEE / ADMIN — Update event
------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  updateEvent
);

/* -------------------------------------------------
   4️⃣ ADMIN ONLY — Disable event
------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  disableEvent
);

export default router;
 