import { Request, Response } from "express";
import { WorkerModel } from "../src/database/models/worker.model";
import { ClientModel } from "../src/database/models/client.model";

export const getUserByAuthId = async (req: any, res: any) => {
  const { authId } = req.query;

  if (!authId) {
    return res.status(400).json({ error: "authId is required" });
  }

  try {
    // Check in WorkerModel
    const worker = await WorkerModel.findOne({ authId });
    if (worker) {
      return res.json({ role: "worker", user: worker });
    }

    // Check in ClientModel
    const client = await ClientModel.findOne({ authId });
    if (client) {
      return res.json({ role: "client", user: client });
    }

    // If no user is found
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error fetching user by authId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
