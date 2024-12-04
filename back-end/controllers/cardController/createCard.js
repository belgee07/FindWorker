"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = void 0;
const card_model_1 = require("../../src/database/models/card.model");
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bank, cardHolder, cardNumber, expiryDate, cvv, authId } = req.body;
        if (!bank || !cardHolder || !cardNumber || !expiryDate || !cvv) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
            });
            return;
        }
        const newCard = new card_model_1.CardModel({
            authId,
            bank,
            cardHolder,
            cardNumber,
            expiryDate,
            cvv,
        });
        const savedCard = yield newCard.save();
        res.status(201).json({
            success: true,
            message: "Card created successfully",
            data: savedCard,
        });
    }
    catch (error) {
        console.error("Error creating card:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createCard = createCard;
