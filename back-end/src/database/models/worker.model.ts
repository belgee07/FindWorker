import { Model, Schema, models, model } from "mongoose";

export type WorkerModelType = {
  _id: Schema.Types.ObjectId;
  jobId: string[];
  userName: string;
  age: number;
  sex: string;
  bio: string;
  profile_picture: string;
  experience: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  salary_range: number;
  createdAt: Date;
  updatedAt: Date;
};

const WorkerSchema = new Schema<WorkerModelType>({
  userName: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: false },
  bio: { type: String, required: false },
  experience: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  salary_range: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});
export const WorkerModel: Model<WorkerModelType> =
  models["Workers"] || model<WorkerModelType>("Workers", WorkerSchema);
