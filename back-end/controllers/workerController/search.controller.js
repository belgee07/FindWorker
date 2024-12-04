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
exports.searchController = void 0;
const worker_model_1 = require("../../src/database/models/worker.model");
const searchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.body;
    if (!value) {
        res.status(200).send({ foundWorkers: [] });
        return;
    }
    const foundWorkers = yield worker_model_1.WorkerModel.find({
        jobName: { $regex: value, $options: "i" },
    });
    res.status(200).send({ foundWorkers });
});
exports.searchController = searchController;
