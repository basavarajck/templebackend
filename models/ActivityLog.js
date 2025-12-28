import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      // examples:
      // "ADD_INCOME", "ADD_EXPENSE", "APPROVE_EXPENSE",
      // "LOCK_MONTH", "CREATE_EVENT", "REPLY_COMPLAINT"
    },

    entityType: {
      type: String,
      required: true,
      // examples: "Income", "Expense", "Event", "Announcement"
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metadata: {
      type: Object,
      default: {},
      // optional extra info like amount, month/year, etc.
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
