import { Schema, model, models } from "mongoose";

export type WorkerModelType = {
  _id: Schema.Types.ObjectId;
  authId: string;
  username: string;
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
  education: string;
  category: Schema.Types.ObjectId[];
  job: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

const WorkerSchema = new Schema<WorkerModelType>(
  {
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    bio: { type: String, required: false },
    profile_picture: { type: String, required: false },
    experience: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    address: { type: String, required: false },
    salary_range: { type: Number, required: false },
    education: { type: String, required: false },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    job: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export const WorkerModel =
  models.Worker || model<WorkerModelType>("Worker", WorkerSchema);
