import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/application.model";
import { WorkerModel } from "../../src/database/models/worker.model";

export const getWorkerNotifications = async (req: any, res: any) => {
  const { workerId, authId } = req.query;

  if (!workerId && !authId) {
    return res
      .status(400)
      .json({ message: "Either workerId or authId is required" });
  }

  try {
    let worker;

    if (authId) {
      worker = await WorkerModel.findOne({ authId });
      if (!worker) {
        return res
          .status(404)
          .json({ message: "Worker not found using authId" });
      }
    }

    if (workerId) {
      worker = await WorkerModel.findById(workerId);
      if (!worker) {
        return res
          .status(404)
          .json({ message: "Worker not found using workerId" });
      }
    }

    const notifications = await ApplicationModel.find({ workerId: worker._id })
      .populate("workerId", "name email") // Populate worker details if needed
      .select("description applicationId status process createdAt");

    if (!notifications.length) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
