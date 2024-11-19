import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const getWorkerWithDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await WorkerModel.findOne({ authId: req.params.id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const worker = await WorkerModel.findById(user._id)
      .populate("category")
      .populate("job");

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
