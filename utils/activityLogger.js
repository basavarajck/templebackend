import ActivityLog from "../models/ActivityLog.js";

/**
 * Logs user activity for audit trail
 *
 * @param {String} action - Action name (e.g., ADD_INCOME)
 * @param {String} entityType - Model name (Income, Expense, Event, etc.)
 * @param {String} entityId - MongoDB ObjectId of entity
 * @param {String} userId - User who performed the action
 * @param {Object} metadata - Optional extra info
 */
export const logActivity = async (
  action,
  entityType,
  entityId,
  userId,
  metadata = {}
) => {
  try {
    await ActivityLog.create({
      action,
      entityType,
      entityId,
      performedBy: userId,
      metadata,
    });
  } catch (error) {
    // IMPORTANT: Never break main flow because of logging
    console.error("Activity log error:", error.message);
  }
};
