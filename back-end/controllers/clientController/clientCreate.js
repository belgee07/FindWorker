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
exports.registerClient = void 0;
const client_model_1 = require("../../src/database/models/client.model");
const registerClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authId, username, email, role } = req.body;
    const actualEmail = typeof email === "object" ? email.emailAddress : email;
    if (!actualEmail) {
        res.status(200).json({ error: "Invalid email format" });
        return;
    }
    try {
        const existingUser = yield client_model_1.ClientModel.findOne({ email: actualEmail });
        if (existingUser) {
            res.status(200).json({ message: "Email already in use" });
            return;
        }
        const client = new client_model_1.ClientModel({
            authId,
            email: actualEmail,
            username,
            role,
        });
        yield client.save();
        res.status(201).json({ message: "Client created successfully" });
        console.log("Client register successful");
    }
    catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerClient = registerClient;
