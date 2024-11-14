import { Request, Response } from "express";
import { JobModel } from "../../src/database/models/job.model"; 

export const getJobsWithCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await JobModel.find().populate('categoryId'); 

    if (!jobs.length) {
      res.status(404).json({ message: "No jobs found" });
      return;
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
