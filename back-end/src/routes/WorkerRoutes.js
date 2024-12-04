"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workerController_1 = require("../../controllers/workerController");
const router = express_1.default.Router();
router.post("/register", workerController_1.registerWorker);
router.put("/editWorker/:id", workerController_1.updatedWorker);
router.get("/workerDetails/:id", workerController_1.getWorkerWithDetails);
router.get("/allWorkers", workerController_1.getAllWorkers);
router.post("/search", workerController_1.searchController);
exports.default = router;
