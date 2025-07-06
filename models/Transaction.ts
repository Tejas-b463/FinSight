import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
