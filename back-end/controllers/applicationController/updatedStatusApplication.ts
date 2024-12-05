// controllers/application.controller.ts
import { Request, Response } from "express";
import { ApplicationModel } from "../../src/database/models/application.model";
import { ApplicationStatus } from "../../src/database/models/application.model";

export const updateApplicationStatus = async (req: any, res: any) => {
  const { applicationId, action } = req.body;

  if (!applicationId || !["Accepted", "Reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const application = await ApplicationModel.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = action as ApplicationStatus; // Use the imported type here
    application.process =
      action === "Accepted" ? "Ongoing" : application.process;
    application.notificationStatus = "Clicked";

    await application.save();

    return res
      .status(200)
      .json({ message: "Application updated successfully", application });
  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
