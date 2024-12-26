import mongoose, { Schema } from "mongoose";
import { IBudget } from "./budget.interface";

const BudgetSchema: Schema<IBudget> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);
