import { Request, Response } from "express";
import User from "./users.model";
import bycrpt from "bcrypt";
import { IUser } from "./users.interface";

//create
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExist: IUser | null = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ message: "User already exist!" });
      return;
    }

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);
    const user: IUser = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ user: user, message: "User created successfully!" });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

//read
export const findAllUser = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!user) res.status(404).json({ message: "User not found!" });

    res.status(200).json({ user, message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findByIdAndDelete(id);

    if (!user) res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Successfully deleted user!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
