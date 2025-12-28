import express from "express";
import { addExpense, getAllExpenses } from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { permitRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC – villagers can see expenses
router.get("/", getAllExpenses);

// PROTECTED – only committee or admin can add expenses
router.post(
  "/add",
  authMiddleware,
  permitRoles("committee", "admin"),
  upload.single("proof"),
  addExpense
);

export default router;
