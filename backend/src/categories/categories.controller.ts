import { Request, Response } from "express";
import Category from "./categories.model";
import { ICategory } from "./categories.interface";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { userId, name, type } = req.body;

    if (!name || !type) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    if (type !== "income" && type !== "expense" && type!== 'savings') {
      res
        .status(400)
        .json({ message: "Category type must be income or expense!" });
      return;
    }

    const category = new Category({ userId, name, type });
    await category.save();

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
export const findAllCategories = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
    const { type } = req.query;
    const categories: ICategory[] = await Category.find({
      userId,
      ...(type ? { type } : {}),
    });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
export const findOneCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category: ICategory | null = await Category.findById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found!" });
      return;
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.body.type !== "income" && req.body.type !== "expense") {
      res
        .status(400)
        .json({ message: "Category type must be income or expense!" });
      return;
    }

    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!category) {
      res.status(404).json({ message: "Category not found!" });
      return;
    }

    res
      .status(200)
      .json({ message: "Successfully updated category!", category });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      res.status(404).json({ message: "Category not found!" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted category!" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error!",
    });
  }
};
