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
exports.createReview = void 0;
const review_model_1 = require("../../src/database/models/review.model");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, workerId, rating, comments } = req.body;
    console.log("Request body:", req.body);
    if (!clientId || !workerId || rating === undefined) {
        res.status(400).json({ message: "Client ID, Worker ID, and Rating are required" });
        return;
    }
    try {
        const review = new review_model_1.ReviewModel({
            clientId,
            workerId,
            rating,
            comments,
        });
        yield review.save();
        res.status(201).json({ message: "Review created successfully", review });
    }
    catch (error) {
        console.error("Error creating review:", error); // Log any error
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createReview = createReview;
