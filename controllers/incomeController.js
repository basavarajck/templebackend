import Income from "../models/Income.js";
import { logActivity } from "../utils/activityLogger.js";

// ADD INCOME
export const addIncome = async (req, res) => {
  try {
    const { amount, source, date, description } = req.body;

    const income = await Income.create({
  amount,
  source,
  date,
  description,
  proofUrl: req.file?.path || "",
  addedBy: req.user.id,
});


    // ✅ ACTIVITY LOG (non-blocking)
    await logActivity(
      "ADD_INCOME",
      "Income",
      income._id,
      req.user.id,
      {
        amount: income.amount,
        source: income.source,
        date: income.date,
      }
    );

    return res.json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 

// GET ALL INCOMES (public)
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find()
      .populate("addedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.json(incomes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
