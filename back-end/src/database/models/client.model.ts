import { Model, Schema, models, model } from "mongoose";

export type ClientsModelType = {
  _id: Schema.Types.ObjectId;
  authId: string;
  username: string;
  email: string;
  phoneNumber: string;
  profile_picture: string;
  address: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ClientSchema = new Schema<ClientsModelType>({
  username: { type: String, required: false },
  authId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  profile_picture: { type: String, required: false },
  address: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const ClientModel: Model<ClientsModelType> =
  models["Clients"] || model<ClientsModelType>("Clients", ClientSchema);
