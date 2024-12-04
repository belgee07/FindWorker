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
exports.getWorkerWithDetails = void 0;
const worker_model_1 = require("../../src/database/models/worker.model");
const getWorkerWithDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield worker_model_1.WorkerModel.findOne({ authId: req.params.id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const worker = yield worker_model_1.WorkerModel.findById(user._id)
            .populate("category")
            .populate("job");
        if (!worker) {
            res.status(404).json({ message: "Worker not found" });
            return;
        }
        res.status(200).json(worker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getWorkerWithDetails = getWorkerWithDetails;
