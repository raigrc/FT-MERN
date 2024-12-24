import { Document } from "mongoose";

export interface IUser extends Document {
  name: string | undefined;
  email: string | undefined;
  password?: string | undefined;

  // will add this feature later
  // avatar?: string;
  // provider: string;
  // providerId: string;
}
