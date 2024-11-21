import { Schema, model, models } from "mongoose";

export type JobModelType = {
  _id: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  jobName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const JobSchema = new Schema<JobModelType>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    jobName: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const JobModel = models.Job || model<JobModelType>("Job", JobSchema);
