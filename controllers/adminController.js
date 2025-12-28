import Expense from "../models/Expense.js";
import LockedMonth from "../models/LockedMonth.js";
import { logActivity } from "../utils/activityLogger.js";
import User from "../models/User.js";
// GET ALL PENDING EXPENSES (admin only)
export const getPendingExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ approved: false })
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// APPROVE EXPENSE
export const approveExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.approved = true;
    expense.approvedBy = req.user.id;
    await expense.save();

    // ✅ ACTIVITY LOG — Expense Approved
    await logActivity(
      "APPROVE_EXPENSE",
      "Expense",
      expense._id,
      req.user.id,
      {
        amount: expense.amount,
        category: expense.category,
      }
    );

    return res.json({
      message: "Expense approved successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const lockMonth = async (req, res) => {
  try {
    const { year, month } = req.body;

    if (!year || !month) {
      return res.status(400).json({
        message: "Year and month are required",
      });
    }

    const exists = await LockedMonth.findOne({ year, month });
    if (exists) {
      return res.status(400).json({
        message: "This month is already locked",
      });
    }

    const lockedMonth = await LockedMonth.create({ year, month, lockedBy: req.user.id });

    // ✅ ACTIVITY LOG — Month Locked
    await logActivity(
      "LOCK_MONTH",
      "LockedMonth",
      lockedMonth._id,
      req.user.id,
      { year, month }
    );

    return res.json({
      message: "Month locked successfully",
      lockedMonth,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ----------------------------------
   UPDATE USER ROLE (Admin)
---------------------------------- */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!["villager", "committee"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
