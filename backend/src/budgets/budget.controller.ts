import { Request, Response } from "express";
import Budget from "./budget.model";
import { IBudget } from "./budget.interface";

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { categoryId, amount, start_date, end_date } = req.body;
    const userId = (req.user as { _id: string })._id;

    const budget = new Budget({
      userId,
      categoryId,
      amount,
      start_date,
      end_date,
    });

    res.status(200).json({ budget, message: "Successfully added budget!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const findAllBudgets = async (req: Request, res: Response) => {
  try {
    const budget: IBudget[] = await Budget.find();

    if (!budget) {
      res.status(404).json({ message: "No budget found" });
      return;
    }

    res.status(200).json({ budget });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const findOneBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const budget: IBudget | null = await Budget.findById(id);

    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }

    res.status(200).json({ budget });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const budget: IBudget | null = await Budget.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!budget) {
      res.status(404).json({ message: "Budget not found!" });
    }

    res.status(200).json({ message: "Successfully updated budget!", budget });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      res.status(404).json({ message: "Budget not found!" });
    }

    res.status(200).json({ message: "Successfully deleted budget!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
