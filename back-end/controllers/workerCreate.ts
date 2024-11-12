import { Request, Response } from "express";
import { WorkerModel } from "../src/database/models/worker.model";
import bcrypt from "bcryptjs";

export const registerWorker= async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;  
  }

  try {
    const existingUser = await WorkerModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new WorkerModel({
      email,
      password: hashedPassword,
    });

    await client.save();
    res.status(201).json({ message: "Worker created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
