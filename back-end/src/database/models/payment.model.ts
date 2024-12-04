import mongoose, { Schema, Document, model, models, Model } from 'mongoose';
import { Types } from "mongoose";

export type PaymentStatus = "Pending" | "Accepted" | 'FAILED';
export type PaymentProcess = "Ongoing" | "Done";

export interface Payment {
    _id: Types.ObjectId;
    workerId: Types.ObjectId;
    invoiceId: string;
    amount: number;
    description: string;
    status: PaymentStatus;
    process: PaymentProcess;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema<Payment & Document>(
    {
        workerId: {
            type: Schema.Types.ObjectId,
            ref: "Worker",
            required: true,
        },
        invoiceId: { type: String, required: true, unique: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], required: true, },
        process: {
            type: String,
            enum: ["Ongoing", "Done"],
            required: true,
        },
    },
    { timestamps: true }
);
export const PaymentModel = 
models.Payment ||
model<Payment & Document>("Payment", PaymentSchema )

