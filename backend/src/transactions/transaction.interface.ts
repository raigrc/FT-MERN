import mongoose, { Document } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  amount: number | undefined;
  description?: string | undefined;
  transaction_date: Date | undefined;
}
