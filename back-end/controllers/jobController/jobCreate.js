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
exports.addJob = void 0;
const job_model_1 = require("../../src/database/models/job.model");
const addJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, jobName, description } = req.body;
    if (!categoryId || !jobName) {
        res.status(400).json({ message: "Category ID and job name are required" });
        return;
    }
    try {
        const job = new job_model_1.JobModel({
            categoryId,
            jobName,
            description,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        yield job.save();
        res.status(201).json({ message: "Job created successfully", job });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addJob = addJob;
