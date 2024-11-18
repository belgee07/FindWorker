import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const registerWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { authId, username, email } = req.body;

  if (!authId) {
    res.status(400).json({ message: "Auth ID is required" });
    return;
  }

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const existingWorker = await WorkerModel.findOne({ authId });
    if (existingWorker) {
      res
        .status(400)
        .json({ message: "A user with this Auth ID already exists" });
      return;
    }

    const worker = new WorkerModel({
      authId,
      username,
      email,
    });

    await worker.save();
    res.status(201).json({ message: "Worker created successfully" });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        message: `Duplicate entry detected: ${JSON.stringify(error.keyValue)}`,
      });
    } else {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
