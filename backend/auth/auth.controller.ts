import { Request, Response } from "express";
import User from "../users/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../users/users.interface";

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found!" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Ensure this is true in production
      maxAge: 3600000, // 1 hour
      sameSite: "none",
    });

    res.status(200).json({ user, token, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const verifyToken = (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const signOut = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signout successful!" });
};
