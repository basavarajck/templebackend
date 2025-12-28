import { getMonthlyReport } from "../utils/reportUtils.js";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { generateMonthlyPDF } from "../utils/pdfReport.js";

/* -------------------------------------------------
   1️⃣ GET MONTHLY REPORT (Admin Only)
------------------------------------------------- */
export const monthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res
        .status(400)
        .json({ message: "Year and month are required" });
    }

    const report = await getMonthlyReport(
      Number(year),
      Number(month)
    );

    return res.json(report);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   2️⃣ GET YEARLY REPORT (Admin Only)
------------------------------------------------- */
export const yearlyReport = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const yearlySummary = [];

    for (let month = 1; month <= 12; month++) {
      const monthly = await getMonthlyReport(
        Number(year),
        month
      );

      yearlySummary.push({
        month,
        totalIncome: monthly.income.total,
        totalExpense: monthly.expense.total,
        surplus: monthly.surplus,
      });
    }

    return res.json({
      year,
      summary: yearlySummary,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* -------------------------------------------------
   3️⃣ DOWNLOAD MONTHLY REPORT PDF (Admin Only)
------------------------------------------------- */
export const monthlyReportPDF = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res
        .status(400)
        .json({ message: "Year and month are required" });
    }

    const report = await getMonthlyReport(
      Number(year),
      Number(month)
    );

    generateMonthlyPDF(report, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
