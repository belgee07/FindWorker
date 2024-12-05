import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/application.model";

export const sendNotification = async (req: any, res: any) => {
  const { applicationId } = req.body;

  try {
    const application = await ApplicationModel.findById(applicationId).populate(
      "workerId"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log(`Notification sent to worker ${application.workerId.email}`);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
