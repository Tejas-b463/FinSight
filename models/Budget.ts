import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  month: String, 
  category: String,
  amount: Number,
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default Budget;
