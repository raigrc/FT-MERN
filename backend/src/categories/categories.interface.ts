import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  userId: mongoose.Types.ObjectId;
  name: string | undefined;
  type: "income" | "expense" | undefined;
}
