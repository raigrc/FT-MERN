import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../transactions/transaction.model";
import Budget from "../budgets/budget.model";
import Category from "../categories/categories.model";

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
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
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
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
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
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    { $match: { "category.type": "savings" } },
    { $group: { _id: null, totalSavings: { $sum: "$amount" } } },
  ]);

  const totalIncomeAmount =
    totalIncome.length > 0 ? totalIncome[0].totalIncome : 0;
  const totalExpenseAmount =
    totalExpense.length > 0 ? totalExpense[0].totalExpense : 0;
  const totalSavingsAmount =
    totalSavings.length > 0 ? totalSavings[0].totalSavings : 0;

  // Calculate the total balance
  const totalBalance = totalIncomeAmount - totalExpenseAmount;

  res.json({
    totalSavings: totalSavingsAmount,
    totalExpense: totalExpenseAmount,
    totalBalance,
  });
};

export const getBudgets = async (req: Request, res: Response) => {
  const userId = (req.user as { _id: string })._id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const budgets = await Budget.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        start_date: { $lte: today },
        end_date: { $gte: today },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "transactions",
        // localField: "categoryId",
        // foreignField: "categoryId",
        let: { categoryId: "$categoryId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$categoryId", "$$categoryId"] },
                  { $lte: ["$transaction_date", new Date()] },
                ],
              },
            },
          },
        ],
        as: "transactions",
      },
    },
    { $addFields: { totalSpent: { $sum: "$transactions.amount" } } },
  ]);

  res.json(budgets);
};

export const getCategories = async (req: Request, res: Response) => {
  const userId = (req.user as { _id: string })._id;

  const categories = await Category.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "categoryId",
        as: "transactions",
      },
    },
    { $addFields: { totalTransactions: { $size: "$transactions" } } },
    { $sort: { totalTransactions: -1, name: 1 } },
  ]);

  res.json(categories);
};

export const getTransactionsWithCategories = async (
  req: Request,
  res: Response
) => {
  const userId = (req.user as { _id: string })._id;

  const transactions = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    { $unwind: { path: "$categories", preserveNullAndEmptyArrays: true } },
  ]);

  res.json(transactions);
};
