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
  userName: { type: String, required: false },
  age: { type: Number, required: false },
  sex: { type: String, required: false },
  bio: { type: String, required: false },
  experience: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: false },
  address: { type: String, required: false },
  salary_range: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});
export const WorkerModel: Model<WorkerModelType> =
  models["Workers"] || model<WorkerModelType>("Workers", WorkerSchema);
