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
exports.getJobsWithCategory = void 0;
const job_model_1 = require("../../src/database/models/job.model");
const getJobsWithCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield job_model_1.JobModel.find().populate('categoryId');
        if (!jobs.length) {
            res.status(404).json({ message: "No jobs found" });
            return;
        }
        res.status(200).json(jobs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getJobsWithCategory = getJobsWithCategory;
