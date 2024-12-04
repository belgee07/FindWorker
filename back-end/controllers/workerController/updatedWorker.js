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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedWorker = void 0;
const worker_model_1 = require("../../src/database/models/worker.model");
const category_model_1 = require("../../src/database/models/category.model");
const job_model_1 = require("../../src/database/models/job.model");
const mongoose_1 = __importDefault(require("mongoose"));
const updatedWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authId = req.params.id;
    console.log(authId);
    const { username, age, gender, bio, profile_picture, experience, education, languages, phoneNumber, address, salary_range, categoryName, jobName, } = req.body;
    try {
        const category = yield category_model_1.CategoryModel.findOne({ categoryName });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        const job = yield job_model_1.JobModel.findOne({ jobName });
        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(job._id)) {
            res.status(400).json({ message: "Invalid jobId format" });
            return;
        }
        const updatedWorkerData = {
            username,
            age,
            gender,
            bio,
            profile_picture,
            experience,
            languages,
            phoneNumber,
            education,
            address,
            salary_range,
            category: [category._id],
            job: [job._id],
            updatedAt: new Date(),
        };
        const worker = yield worker_model_1.WorkerModel.findOneAndUpdate({ authId }, Object.assign({}, updatedWorkerData), { new: true });
        if (!worker) {
            res.status(404).json({ message: "Worker not found" });
            return;
        }
        res.status(200).json({ message: "Worker updated successfully", worker });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatedWorker = updatedWorker;
