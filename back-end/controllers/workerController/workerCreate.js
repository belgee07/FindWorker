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
exports.registerWorker = void 0;
const worker_model_1 = require("../../src/database/models/worker.model");
const registerWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authId, username, email, role } = req.body;
    const actualEmail = typeof email === "object" ? email.emailAddress : email;
    if (!actualEmail) {
        res.status(200).json({ error: "Invalid email format" });
        return;
    }
    try {
        const existingWorker = yield worker_model_1.WorkerModel.findOne({ email: actualEmail });
        if (existingWorker) {
            res.status(200).json({ error: "Email already in use" });
            return;
        }
        const worker = new worker_model_1.WorkerModel({
            authId,
            username,
            email: actualEmail,
            role,
        });
        yield worker.save();
        res.status(201).json(worker);
        console.log("Register successfully");
    }
    catch (error) {
        console.error("Error creating worker:", error);
        res.status(500).json({ error: "Worker creation failed" });
    }
});
exports.registerWorker = registerWorker;
