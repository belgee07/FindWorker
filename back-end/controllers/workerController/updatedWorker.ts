import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";
import { CategoryModel } from "../../src/database/models/category.model";
import { JobModel } from "../../src/database/models/job.model";
import mongoose from "mongoose";

export const updatedWorker = async (req: Request, res: Response): Promise<void> => {
  const { userName, age, gender, bio, profile_picture, experience, phoneNumber, address, salary_range, categoryName, jobName } = req.body;

  if (!categoryName || !jobName || !userName || !age || !gender || !bio || !profile_picture || !experience || !phoneNumber || !address || !salary_range) {
    res.status(400).json({ message: "All fields are required" });
    return; 
  }

  try {
    const category = await CategoryModel.findOne({ categoryName });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const job = await JobModel.findOne({ jobName });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(job._id)) {
      res.status(400).json({ message: "Invalid jobId format" });
      return;
    }

    const workerId = req.params.id;
    console.log(workerId);

    const updatedWorkerData = {
      userName,
      age,
      gender,
      bio,
      profile_picture,
      experience,
      phoneNumber,
      address,
      salary_range,
      category: [category._id],  
      job: [job._id], 
      updatedAt: new Date(),
    };

    const worker = await WorkerModel.findByIdAndUpdate(workerId, updatedWorkerData, { new: true });

    if (!worker) {
      res.status(404).json({ message: "Worker not found" });
      return;
    }

    res.status(200).json({ message: "Worker updated successfully", worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
