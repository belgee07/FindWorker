import { Schema, model, models } from "mongoose";

export type CardModeltype = {
  _id: Schema.Types.ObjectId;
  authId: string;
  bank: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: String;
  cvv: number;
};

const CardSchema = new Schema<CardModeltype>(
  {
    bank: { type: String, required: true },
    cardHolder: { type: String, required: true },
    authId: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: Number, required: true },
  },
  { timestamps: true }
);

export const CardModel = models.Card || model<CardModeltype>("Card", CardSchema);
