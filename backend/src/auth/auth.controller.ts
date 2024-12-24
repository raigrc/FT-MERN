import { Request, Response } from "express";
import User from "../users/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!);
    if (!passwordMatch) {
      res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user?._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
