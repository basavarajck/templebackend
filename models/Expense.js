import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["General", "Festival", "Repair", "Other"],
      default: "General",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
    },

    proofUrl: {
      type: String, // file path
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
