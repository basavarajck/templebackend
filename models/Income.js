import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: ["Hundi", "Donation", "Sponsor"],
      default: "Hundi",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    proofUrl: {
      type: String, // stores image path
    },
    addedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
