import { Request, Response } from "express";
import { WorkerModel } from "../src/database/models/worker.model";
import { CategoryModel } from "../src/database/models/category.model";
import mongoose from "mongoose";

export const updatedWorker = async (req: Request, res: Response): Promise<void> => {
  const { userName, age, gender, bio, profile_picture, experience, phoneNumber, address, salary_range, categoryName, jobId } = req.body;

  // Ensure all required fields are present
  if (!categoryName || !jobId || !userName || !age || !gender || !bio || !profile_picture || !experience || !phoneNumber || !address || !salary_range) {
    res.status(400).json({ message: "All fields are required" });
    return; 
  }

  try {
    // Fetch the category by name
    const category = await CategoryModel.findOne({ categoryName });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
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
      jobId: [jobId],
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
