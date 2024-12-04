"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client", required: true },
    workerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Worker", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String, required: false },
});
exports.ReviewModel = mongoose_1.models["Review"] || (0, mongoose_1.model)("Review", ReviewSchema);
