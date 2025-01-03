import { Request, Response } from "express";
import mongoose from "mongoose";
import Categories from "../categories/categories.model";
import Budget from "../budgets/budget.model";
import Transaction from "../transactions/transaction.model";

export const getAllBalance = async (req: Request, res: Response) => {
  const userId = (req.user as { _id: string })._id;

  const totalIncome = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    { $match: { "category.type": "income" } },
    { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
  ]);

  const totalExpense = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    { $match: { "category.type": "expense" } },
    { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
  ]);
  const totalSavings = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    { $match: { "category.type": "savings" } },
    { $group: { _id: null, totalSavings: { $sum: "$amount" } } },
  ]);

  const totalBalance =
    totalIncome[0].totalIncome - totalExpense[0].totalExpense;

  res.json({
    totalSavings: totalSavings[0].totalSavings,
    totalExpense: totalExpense[0].totalExpense,
    totalBalance,
  });
};
