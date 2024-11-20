import express from "express";
import {
  registerWorker,
  updatedWorker,
  getWorkerWithDetails,
  getAllWorkers,
} from "../../controllers/workerController";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.post("/register", registerWorker);
router.put("/editWorker/:id", authMiddleware, updatedWorker);
router.get("/workerDetails/:id", authMiddleware, getWorkerWithDetails);
router.get("/allWorkers", getAllWorkers);

export default router;
