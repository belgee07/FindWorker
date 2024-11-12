import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../src/database/models/category.model";

export const addCategory = async (req: Request, res: Response): Promise<void> => {
  const { categoryName } = req.body;

  if (!categoryName) {
    res.status(400).json({ message: "Category name is required" });
    return; 
  }

  try {
    const category = new CategoryModel({
      categoryName,
    });

    await category.save();

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
  }
};
