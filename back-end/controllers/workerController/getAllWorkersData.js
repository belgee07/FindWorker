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
exports.getAllWorkers = void 0;
const worker_model_1 = require("../../src/database/models/worker.model");
const getAllWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.query;
    try {
        const filter = {};
        if (categoryName) {
            filter.category = { $elemMatch: { categoryName: categoryName } };
        }
        const workers = yield worker_model_1.WorkerModel.find(filter)
            .populate("category")
            .populate("job");
        if (!workers.length) {
            res.status(404).json({ message: "No workers found" });
            return;
        }
        res.status(200).json(workers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch workers" });
    }
});
exports.getAllWorkers = getAllWorkers;
