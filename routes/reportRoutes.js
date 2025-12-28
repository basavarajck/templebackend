import express from "express";
import {
  monthlyReport,
  yearlyReport,
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { monthlyReportPDF } from "../controllers/reportController.js";

const router = express.Router();

/* -------------------------------------------------
   1️⃣ MONTHLY REPORT (Admin Only)
------------------------------------------------- */
router.get(
  "/monthly",
  authMiddleware,
  adminOnly,
  monthlyReport
);
/* -------------------------------------------------
   3️⃣ MONTHLY REPORT PDF (Admin Only)
------------------------------------------------- */
router.get(
  "/monthly/pdf",
  authMiddleware,
  adminOnly,
  monthlyReportPDF
);


/* -------------------------------------------------
   2️⃣ YEARLY REPORT (Admin Only)
------------------------------------------------- */
router.get(
  "/yearly",
  authMiddleware,
  adminOnly,
  yearlyReport
);

export default router;
