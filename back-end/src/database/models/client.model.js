"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    profile_picture: { type: String, required: false },
    address: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["client"], // Define the allowed roles
        default: "client", // Default role for this model
        required: true,
    },
    createdAt: { type: Date, default: Date.now, required: true, immutable: true },
    updatedAt: { type: Date, default: Date.now, required: true },
});
exports.ClientModel = mongoose_1.models["Clients"] || (0, mongoose_1.model)("Clients", ClientSchema);
