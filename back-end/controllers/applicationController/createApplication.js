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
exports.createApplication = void 0;
const application_model_1 = require("../../src/database/models/application.model");
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, workerId, status, description, process } = req.body;
    if (!clientId || !workerId || !status || !description || !process) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const application = yield application_model_1.ApplicationModel.create({
            clientId,
            workerId,
            status,
            description,
            process,
        });
        console.log(clientId);
        return res
            .status(201)
            .json({ message: "Application created successfully", application });
    }
    catch (error) {
        console.error("Error creating application:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.createApplication = createApplication;
