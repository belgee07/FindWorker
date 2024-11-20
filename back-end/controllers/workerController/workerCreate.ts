import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const registerWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { authId, username, email } = req.body;

  try {
    const existingWorker = await WorkerModel.findOne({ email });

    if (existingWorker) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const worker = new WorkerModel({
      authId,
      username,
      email,
    });

    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    console.error("Error creating worker:", error);
    res.status(500).json({ error: "Worker creation failed" });
  }
};
