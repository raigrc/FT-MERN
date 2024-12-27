import mongoose, { Document } from "mongoose";

export interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  amount: number | undefined;
  start_date: Date | undefined;
  end_date: Date | undefined;
}
