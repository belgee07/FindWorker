"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    workerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Worker",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Reject"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    process: {
        type: String,
        enum: ["Ongoing", "Done"],
        required: true,
    },
}, { timestamps: true });
exports.ApplicationModel = mongoose_1.models.Application ||
    (0, mongoose_1.model)("Application", ApplicationSchema);
