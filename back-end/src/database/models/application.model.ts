import { Model, Schema, models, model } from "mongoose";

export type ApplicationModelType = {
  _id: Schema.Types.ObjectId;
  jobId: string[];
  clientId: string;
  workerId: string;
  status: string;
  description: string;
  date: string;
  process: string;
  createdAt: Date;
  updatedAt: Date;
};

const ApplicationSchema = new Schema<ApplicationModelType>({
  status: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  process: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const ApplicationModel: Model<ApplicationModelType> =
  models["Applications"] ||
  model<ApplicationModelType>("Applications", ApplicationSchema);
