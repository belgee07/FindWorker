// controllers/application.controller.ts
import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/application.model";

export const createApplication = async (req: any, res: any) => {
  const { authId, workerId, status, description, process } = req.body;

  if (!authId || !workerId || !status || !description || !process) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const application = await ApplicationModel.create({
      authId,
      workerId,
      status,
      description,
      process,
    });
    console.log(authId);

    return res
      .status(201)
      .json({ message: "Application created successfully", application });
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
