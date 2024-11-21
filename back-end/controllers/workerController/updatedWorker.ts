import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";
import { CategoryModel } from "../../src/database/models/category.model";
import { JobModel } from "../../src/database/models/job.model";
import mongoose from "mongoose";

export const updatedWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authId = req.params.id;
  console.log(authId);
  const {
    username,
    age,
    gender,
    bio,
    profile_picture,
    experience,
    education,
    languages,
    phoneNumber,
    address,
    salary_range,
    categoryName,
    jobName,
  } = req.body;

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

    const updatedWorkerData = {
      username,
      age,
      gender,
      bio,
      profile_picture,
      experience,
      languages,
      phoneNumber,
      education,
      address,
      salary_range,
      category: [category._id],
      job: [job._id],
      updatedAt: new Date(),
    };

    const worker = await WorkerModel.findOneAndUpdate(
      { authId },
      { ...updatedWorkerData },
      { new: true }
    );

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
