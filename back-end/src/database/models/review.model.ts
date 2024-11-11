import { Model, Schema, models, model } from "mongoose";

export type ReviewModelType = {
  _id: Schema.Types.ObjectId;
  clientId: string;
  workerId: string;
  rating: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
};
const ReviewSchema = new Schema<ReviewModelType>({
  rating: { type: Number, required: false },
  comments: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});
export const ReviewModel: Model<ReviewModelType> =
  models["Reviews"] || model<ReviewModelType>("Reviews", ReviewSchema);
