import express from "express";
import { addIncome, getAllIncomes } from "../controllers/incomeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { permitRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE → anyone can view incomes
router.get("/", getAllIncomes);

// PROTECTED ROUTE → only logged-in users can add income
router.post(
  "/add",
  authMiddleware, 
  permitRoles("committee", "admin"),         // checks token
  upload.single("proof"),   // handles file upload
  addIncome                 // controller logic
);

export default router;
