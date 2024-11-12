import { Schema, model, models } from "mongoose";
import { JobModel } from "./job.model";  // Import Job model
import { CategoryModel } from "./category.model";  // Import Category model

export type WorkerModelType = {
  _id: Schema.Types.ObjectId;
  userName: string;
  age: number;
  gender: string;
  bio: string;
  profile_picture: string;
  experience: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  salary_range: number;
  category: Schema.Types.ObjectId[];
  jobId: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

const WorkerSchema = new Schema<WorkerModelType>({
  userName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bio: { type: String, required: true },
  profile_picture: { type: String, required: true },
  experience: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  salary_range: { type: Number, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  jobId: [{ type: Schema.Types.ObjectId, ref: "Job" }],
}, { timestamps: true });

export const WorkerModel = models.Worker || model<WorkerModelType>("Worker", WorkerSchema);
