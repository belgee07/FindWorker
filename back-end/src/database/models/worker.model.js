"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerModel = void 0;
const mongoose_1 = require("mongoose");
const WorkerSchema = new mongoose_1.Schema({
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    languages: {
        type: [String],
        enum: ["Англи хэл", "Франц хэл", "Орос хэл", "Япон хэл", "Герман хэл"],
        required: false,
    },
    bio: { type: String, required: false },
    profile_picture: { type: String, default: "" },
    experience: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    address: { type: String, required: false },
    salary_range: { type: Number, required: false },
    education: { type: String, required: false },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    job: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Job" }],
    role: {
        type: String,
        enum: ["worker"], // Define the allowed roles
        default: "worker", // Default role for this model
        required: true,
    },
}, { timestamps: true });
exports.WorkerModel = mongoose_1.models.Worker || (0, mongoose_1.model)("Worker", WorkerSchema);
