import ActivityLog from "../models/ActivityLog.js";

/* -------------------------------------------------
   GET ACTIVITY LOGS (Admin Only)
   Query params (optional):
   - action
   - userId
   - startDate
   - endDate
   - page
   - limit
------------------------------------------------- */
export const getActivityLogs = async (req, res) => {
  try {
    const {
      action,
      userId,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (action) filter.action = action;
    if (userId) filter.performedBy = userId;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const logs = await ActivityLog.find(filter)
      .populate("performedBy", "name email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ActivityLog.countDocuments(filter);

    return res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      logs,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
