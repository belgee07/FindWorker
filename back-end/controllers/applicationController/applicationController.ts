import { Request, Response } from 'express';
import { ApplicationModel } from '../../src/database/models/application.model';  


export const createApplication = async (req: Request, res: Response): Promise<void> => {
  const { jobId, clientId, workerId, status, description, process } = req.body;

  if (!jobId || !clientId || !workerId || !status || !description || !process) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const newApplication = new ApplicationModel({
      jobId,
      clientId,
      workerId,
      status,
      description,
      process,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application created successfully", application: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body; 

  if (!status || !['Pending', 'Accepted', 'Reject'].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  try {
    const updatedApplication = await ApplicationModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json({ message: "Application status updated successfully", application: updatedApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await ApplicationModel.find();

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
