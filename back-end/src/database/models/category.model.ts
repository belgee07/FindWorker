import { Schema, model, models } from "mongoose";

export type CategoryModelType = {
  _id: Schema.Types.ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const CategorySchema = new Schema<CategoryModelType>(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const CategoryModel =
  models.Category || model<CategoryModelType>("Category", CategorySchema);
