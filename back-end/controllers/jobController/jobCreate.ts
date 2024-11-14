import { Request, Response } from "express";
import { JobModel } from "../../src/database/models/job.model"; 

export const addJob = async (req: Request, res: Response): Promise<void> => {
  const { categoryId, jobName, description } = req.body;

  if (!categoryId || !jobName) {
    res.status(400).json({ message: "Category ID and job name are required" });
    return; 
  }

  try {
    const job = new JobModel({
      categoryId,
      jobName,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await job.save();

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
