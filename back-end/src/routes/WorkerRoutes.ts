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
router.put("/editWorker/:id", updatedWorker);
router.get("/workerDetails/:id", getWorkerWithDetails);
router.get("/allWorkers", getAllWorkers);

export default router;
