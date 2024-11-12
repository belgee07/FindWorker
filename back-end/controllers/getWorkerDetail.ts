import { Request, Response } from "express";
import { WorkerModel } from "../src/database/models/worker.model";

export const getWorkerWithDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const worker = await WorkerModel.findById(req.params.id)
      .populate('category')  
      .populate('jobId');   

    if (!worker) {
      res.status(404).json({ message: "Worker not found" });
      return;
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
