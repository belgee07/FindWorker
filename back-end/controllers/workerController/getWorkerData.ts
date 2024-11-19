import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const getAllWorkers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const workers = await WorkerModel.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
};
