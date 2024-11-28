import { Schema, model, models, Document } from "mongoose";
import { Types } from "mongoose";

export type ApplicationStatus = "Pending" | "Accepted" | "Reject";
export type ApplicationProcess = "Ongoing" | "Done";

export interface Application {
  _id: Types.ObjectId;
  workerId: Types.ObjectId;
  status: ApplicationStatus;
  description: string;
  process: ApplicationProcess;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<Application & Document>(
  {
    workerId: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Reject"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    process: {
      type: String,
      enum: ["Ongoing", "Done"],
      required: true,
    },
  },
  { timestamps: true }
);

export const ApplicationModel =
  models.Application ||
  model<Application & Document>("Application", ApplicationSchema);
