import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const TransactionSchema: Schema<ITransaction> = new Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    transaction_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
