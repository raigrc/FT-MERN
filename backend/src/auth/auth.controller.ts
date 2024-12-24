import { Request, Response } from "express";
import User from "../users/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const passwordMatch = await bcrypt.compare(password, user?.password!);
    if (!user || !passwordMatch) {
      return;
    }
    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
  }
};
