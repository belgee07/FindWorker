import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const registerWorker= async (req: Request, res: Response): Promise<void> => {
  const { username} = req.body;

  if (!username ) {
    res.status(400).json({ message: "Email and password are required" });
    return;  
  }

  try {
    const existingUser = await WorkerModel.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return; 
    }


    const worker = new WorkerModel({
      username,
    });

    await worker.save();
    res.status(201).json({ message: "Worker created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
