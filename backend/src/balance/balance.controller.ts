import { Request, Response } from "express";
import mongoose from "mongoose";
import Categories from "../categories/categories.model";
import Budget from "../budgets/budget.model";

export const getAllBalance = async (req: Request, res: Response) => {
  const userId = (req.user as { _id: string })._id;

  const totalIncome = await Categories.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), type: "income" } },
  ]);

  const totalBudget = await Budget.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalBudget: { $sum: "$amount" } } },
  ]);

  res.json({ totalBudget });
};
