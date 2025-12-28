import mongoose from "mongoose";

const lockedMonthSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number, // 1-12
      required: true,
    },
    lockedAt: {
      type: Date,
      default: Date.now,
    },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const LockedMonth = mongoose.model("LockedMonth", lockedMonthSchema);

export default LockedMonth;
