import { Schema, model, models } from "mongoose";


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
  job: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

const WorkerSchema = new Schema<WorkerModelType>({
  userName: { type: String, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  bio: { type: String, required: false },
  profile_picture: { type: String, required: false },
  experience: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  address: { type: String, required: false },
  salary_range: { type: Number, required: false },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  job: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

export const WorkerModel = models.Worker || model<WorkerModelType>("Worker", WorkerSchema);
