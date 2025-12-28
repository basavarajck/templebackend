import express from "express";
import {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  replyToComplaint,
  updateComplaintStatus,
  updateComplaint
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { permitRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------------------
    1️⃣ VILLAGER: Submit Complaint
------------------------------------------------------------- */
router.post(
  "/add",
  authMiddleware,
  permitRoles("villager", "committee", "admin"),  // villagers allowed
  submitComplaint
);

/* -------------------------------------------------------------
    2️⃣ VILLAGER: Get My Complaints
------------------------------------------------------------- */
router.get(
  "/my",
  authMiddleware,
  permitRoles("villager", "committee", "admin"),
  getMyComplaints
);

/* -------------------------------------------------------------
    3️⃣ COMMITTEE/Admin: Get All Complaints
------------------------------------------------------------- */
router.get(
  "/",
  authMiddleware,
  permitRoles("committee", "admin"),
  getAllComplaints
);

/* -------------------------------------------------------------
    4️⃣ COMMITTEE/Admin: Reply to Complaint
------------------------------------------------------------- */
router.post(
  "/reply/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  replyToComplaint
);

/* -------------------------------------------------------------
    5️⃣ COMMITTEE/Admin: Update Status (open/in-progress/resolved)
------------------------------------------------------------- */
router.post(
  "/status/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  updateComplaintStatus
);


/* -------------------------------------------------------------
    6️⃣ COMMITTEE/Admin: Update Complaint (Status + Reply)
------------------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  permitRoles("committee", "admin"),
  updateComplaint
);

export default router;
