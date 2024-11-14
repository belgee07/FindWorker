import { Schema, Model, model, models } from "mongoose";

export type ReviewModelType = {
  _id: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  workerId: Schema.Types.ObjectId;
  rating: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
};
const ReviewSchema = new Schema<ReviewModelType>({
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  workerId: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: false },
});


export const ReviewModel: Model<ReviewModelType> =
  models["Review"] || model<ReviewModelType>("Review", ReviewSchema);
