"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    jobName: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
exports.JobModel = mongoose_1.models.Job || (0, mongoose_1.model)("Job", JobSchema);
