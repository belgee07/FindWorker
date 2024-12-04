import { Request, Response } from "express";
import { WorkerModel } from "../src/database/models/worker.model";
import { ClientModel } from "../src/database/models/client.model";

export const getUserByAuthId = async (req: any, res: any) => {
  const { authId } = req.query;

  if (!authId) {
    return res.status(400).json({ error: "authId is required" });
  }

  try {
    const worker = await WorkerModel.findOne({ authId });
    if (worker) {
      return res.status(200).json(worker);
    }

    const client = await ClientModel.findOne({ authId });
    if (client) {
      return res.status(200).json(client);
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Error fetching user by authId:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
