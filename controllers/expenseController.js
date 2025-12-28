import Expense from "../models/Expense.js";
import { logActivity } from "../utils/activityLogger.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    const expense = await Expense.create({
      amount,
      category,
      date,
      description,
      proofUrl: req.file?.path || "",
      uploadedBy: req.user.id,
      approved: false,
    });

    // ✅ ACTIVITY LOG — Expense Added
    await logActivity(
      "ADD_EXPENSE",
      "Expense",
      expense._id,
      req.user.id,
      {
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      }
    );

    return res.json({
      message: "Expense added successfully. Awaiting approval.",
      expense,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// GET ALL EXPENSES
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
