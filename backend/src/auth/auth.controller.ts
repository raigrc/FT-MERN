import { Request, Response } from "express";
import User from "../users/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../users/users.interface";
import { exit } from "process";

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password!" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Email or Password!" });
    }

    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000, // 1 hour
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ user, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
  }
};
