import { Request, Response } from "express";
import Transaction from "./transaction.model";
import { ITransaction } from "./transaction.interface";
import Category from "../categories/categories.model";
import Budget from "../budgets/budget.model";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { categoryId, transaction_date, amount } = req.body;
    const category = await Category.findById(categoryId);

    if (category?.type && category.type !== "income" && category.type !== "savings") {
      const budget = await Budget.findOne({
        categoryId,
        amount: { $gte: amount },
        start_date: { $lte: transaction_date },
        end_date: { $gte: transaction_date },
      });

      if (!budget) {
        res.status(400).json({
          message: "You do not have budget for this transaction!",
        });
        return;
      }
    }

    const transaction: ITransaction | null = new Transaction(req.body);
    await transaction.save();
    res
      .status(200)
      .json({ message: "Transaction created successfully!", transaction });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};

export const findAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions: ITransaction[] = await Transaction.find();

    if (!transactions) {
      res.status(404).json({ message: "No transactions found!" });
      return;
    }

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};

export const findOneTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction: ITransaction | null = await Transaction.findById(id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found!" });
      return;
    }

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Transaction updated successfully!", transaction });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found!" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
