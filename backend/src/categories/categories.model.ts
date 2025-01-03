import mongoose, { Schema } from "mongoose";
import { ICategory } from "./categories.interface";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["income", "expense", "savings"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
