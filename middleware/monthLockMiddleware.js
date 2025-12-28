import LockedMonth from "../models/LockedMonth.js";

// Extract year and month from a given date
const extractYearMonth = (dateValue) => {
  const dateObj = new Date(dateValue);
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1, // JS months start at 0
  };
};

const monthLockMiddleware = async (req, res, next) => {
  try {
    const { date } = req.body;

    // If no date is provided → allow (we default to current date)
    const entryDate = date ? new Date(date) : new Date();
    const { year, month } = extractYearMonth(entryDate);

    // Check if this month is locked
    const locked = await LockedMonth.findOne({ year, month });

    if (locked) {
      return res.status(403).json({
        message: `Entries for ${month}/${year} are locked and cannot be modified.`,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default monthLockMiddleware;
