import { Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";

export const registerWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { authId, username, email } = req.body;

  const actualEmail = typeof email === "object" ? email.emailAddress : email;

  if (!actualEmail) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    const existingWorker = await WorkerModel.findOne({ email: actualEmail });

    if (existingWorker) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const worker = new WorkerModel({
      authId,
      username,
      email: actualEmail,
    });

    await worker.save();
    res.status(201).json(worker);
    console.log("Register successfully");
  } catch (error) {
    console.error("Error creating worker:", error);
    res.status(500).json({ error: "Worker creation failed" });
  }
};
