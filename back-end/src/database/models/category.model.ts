import { Model, Schema, models, model } from "mongoose";

export type CategoryModelType = {
  _id: Schema.Types.ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};


const JobSchema = new Schema<CategoryModelType>({
  categoryName: {type: String , required: true},
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const CategoryModel: Model<CategoryModelType> =
  models["Category"] || model<CategoryModelType>("Category", JobSchema);
