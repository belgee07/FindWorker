import { Model, Schema, models, model } from "mongoose";

export type ClientsModelType = {
  _id: Schema.Types.ObjectId;
  userName: string;
  email: string;
  phoneNumber: string;
  profile_picture: string;
  password: string;
  address: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ClientSchema = new Schema<ClientsModelType>({
  userName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const ClientModel: Model<ClientsModelType> =
  models["Clients"] || model<ClientsModelType>("Clients", ClientSchema);
