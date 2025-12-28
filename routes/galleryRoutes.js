import express from "express";
import {
  uploadMedia,
  getGallery,
  deleteMedia,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { permitRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------
   1️⃣ PUBLIC — View gallery
------------------------------------------------- */
router.get("/", getGallery);

/* -------------------------------------------------
   2️⃣ COMMITTEE / ADMIN — Upload media
------------------------------------------------- */
router.post(
  "/upload",
  authMiddleware,
  permitRoles("committee", "admin"),
  upload.single("file"),
  uploadMedia
);

/* -------------------------------------------------
   3️⃣ ADMIN / COMMITTEE — Disable media
------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  deleteMedia

);

export default router;
