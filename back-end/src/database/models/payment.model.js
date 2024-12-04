"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    workerId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.PaymentModel = mongoose_1.models.Payment ||
    (0, mongoose_1.model)("Payment", PaymentSchema);
