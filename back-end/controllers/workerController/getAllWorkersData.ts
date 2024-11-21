import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const getAllWorkers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryName } = req.query;

  try {
    const filter: any = {};
    if (categoryName) {
      filter.category = { $elemMatch: { categoryName: categoryName } };
    }

    const workers = await WorkerModel.find(filter)
      .populate("category")
      .populate("job");

    if (!workers.length) {
      res.status(404).json({ message: "No workers found" });
      return;
    }

    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
};
