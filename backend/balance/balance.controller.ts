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
  const { categoryName } = req.query;

  const matchCategoryName = categoryName
    ? { "category.name": { $regex: categoryName, $options: "i" } }
    : {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const budgets = await Budget.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        start_date: { $lte: today },
        end_date: { $gte: today },
        ...matchCategoryName,
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
        let: {
          categoryId: "$categoryId",
          start_date: "$start_date",
          end_date: "$end_date",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$categoryId", "$$categoryId"] },
                  { $gte: ["$transaction_date", "$$start_date"] },
                  { $lte: ["$transaction_date", "$$end_date"] },
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
  const { name } = req.query;

  const matchName = name ? { name: { $regex: name, $options: "i" } } : {};

  const categories = await Category.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), ...matchName } },
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

export const getOneCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as { _id: string })._id;

  const category = await Category.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "categoryId",
        as: "transactions",
      },
    },
    { $addFields: { totalTransactions: { $size: "$transactions" } } },
  ]);

  res.json(category);
};

export const getTransactionsWithCategories = async (
  req: Request,
  res: Response
) => {
  const userId = (req.user as { _id: string })._id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const { search } = req.query;

  const matchSearch = search
    ? { description: { $regex: search, $options: "i" } }
    : {};

  const totalTransactions = await Transaction.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
  });

  const transactions = await Transaction.aggregate([
    { $sort: { transaction_date: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    { $unwind: { path: "$categories", preserveNullAndEmptyArrays: true } },
    { $match: { userId: new mongoose.Types.ObjectId(userId), ...matchSearch } },
    // {
    //   $project: {
    //     amount: 1,
    //     description: 1,
    //     transaction_date: 1,
    //     categories: {
    //       name: 1,
    //       type: 1,
    //     },
    //   },
    // },
  ]);

  const totalPages = Math.ceil(totalTransactions / limit);

  res.json({
    totalPages,
    transactions,
    page,
    limit,
  });
};

export const getTransactionsByMonth = async (req: Request, res: Response) => {
  const userId = (req.user as { _id: string })._id;

  const transactions = await Transaction.aggregate([
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
    {
      $group: {
        _id: {
          transaction_date: {
            $dateToString: { format: "%Y-%m", date: "$transaction_date" },
          },
          // type: "$category.type",
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$category.type", "expense"] }, "$amount", 0],
          },
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$category.type", "income"] }, "$amount", 0],
          },
        },
        // totalAmount: { $sum: "$amount" },
        // transactions: { $push: "$$ROOT" }, //! DO NOT NEED THIS FOR NOW
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(transactions);
};
