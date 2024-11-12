import { Request, Response } from "express"; 
import { CategoryModel } from "../src/database/models/category.model";

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryModel.find();

    if (!categories.length) {
      res.status(404).json({ message: "No categories found" });
      return; 
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
