import { Model, Schema, models, model } from "mongoose";

export type JobModelType = {
  _id: Schema.Types.ObjectId;
  categoryId: string;
  image: string;
  jobName: string;
  desciption: string;
  createdAt: Date;
  updatedAt: Date;
};

const JobSchema = new Schema<JobModelType>({
  image: { type: String, required: false },
  jobName: { type: String, required: true },
  desciption: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const JobModel: Model<JobModelType> =
  models["Jobs"] || model<JobModelType>("Jobs", JobSchema);
