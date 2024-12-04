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
  languages: string[];
  phoneNumber: string;
  password: string;
  address: string;
  salary_range: number;
  education: string;
  category: Schema.Types.ObjectId[];
  job: Schema.Types.ObjectId[];
  role: string;
  rating:number;
  comment:string;
  createdAt: Date;
  updatedAt: Date;
};

const WorkerSchema = new Schema<WorkerModelType>(
  {
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    languages: {
      type: [String],
      enum: ["Англи хэл", "Франц хэл", "Орос хэл", "Япон хэл", "Герман хэл"],
      required: false,
    },
    bio: { type: String, required: false },
    profile_picture: { type: String, default: "" },
    experience: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    address: { type: String, required: false },
    salary_range: { type: Number, required: false },
    education: { type: String, required: false },
    rating:{type:Number, required:false},
    comment:{ type: String, required: false },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    job: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    role: {
      type: String,
      enum: ["worker"], // Define the allowed roles
      default: "worker", // Default role for this model
      required: true,
    },
  },
  { timestamps: true }
);

export const WorkerModel =
  models.Worker || model<WorkerModelType>("Worker", WorkerSchema);
