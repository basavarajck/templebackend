import express from "express";
import { 
  getPendingExpenses, 
  approveExpense,
  lockMonth
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { getAllUsers, updateUserRole } from "../controllers/adminController.js";

const router = express.Router();

router.get("/pending-expenses", authMiddleware, adminOnly, getPendingExpenses);

router.post("/approve/:id", authMiddleware, adminOnly, approveExpense);

router.post("/lock-month", authMiddleware, adminOnly, lockMonth);
router.get(
  "/users",
  authMiddleware,
  adminOnly,
  getAllUsers
);

router.put(
  "/users/:id/role",
  authMiddleware,
  adminOnly,
  updateUserRole
);
export default router;
