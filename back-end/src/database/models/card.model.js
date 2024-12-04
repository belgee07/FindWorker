"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModel = void 0;
const mongoose_1 = require("mongoose");
const CardSchema = new mongoose_1.Schema({
    bank: { type: String, required: true },
    cardHolder: { type: String, required: true },
    authId: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: Number, required: true },
}, { timestamps: true });
exports.CardModel = mongoose_1.models.Card || (0, mongoose_1.model)("Card", CardSchema);
