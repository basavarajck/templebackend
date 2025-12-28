import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

/* -------------------------------------------------
   Helper: Get start & end date of month
------------------------------------------------- */
const getMonthRange = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  return { startDate, endDate };
};

/* -------------------------------------------------
   Monthly Report Aggregation
------------------------------------------------- */
export const getMonthlyReport = async (year, month) => {
  const { startDate, endDate } = getMonthRange(year, month);

  /* ---------- INCOME ---------- */
  const incomeData = await Income.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$source",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = incomeData.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  /* ---------- EXPENSE ---------- */
  const expenseData = await Expense.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        approved: true, // ONLY approved expenses
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpense = expenseData.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  return {
    year,
    month,
    income: {
      total: totalIncome,
      breakdown: incomeData,
    },
    expense: {
      total: totalExpense,
      breakdown: expenseData,
    },
    surplus: totalIncome - totalExpense,
  };
};
