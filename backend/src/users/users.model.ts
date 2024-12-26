import mongoose, { Schema } from "mongoose";
import { IUser } from "./users.interface";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String },

    // avatar: { type: String },
    // provider: { type: String, require: true },
    // providerId: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
