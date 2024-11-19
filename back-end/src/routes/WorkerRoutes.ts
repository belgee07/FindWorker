import { Router } from "express";
import {
  registerWorker,
  updatedWorker,
  getWorkerWithDetails,
  getAllWorkers,
} from "../../controllers";

const router = Router();

router.post("/register", registerWorker);
router.put("/editWorker/:id", updatedWorker);
router.get("/workerDetails/:id", getWorkerWithDetails);
router.get("/allWorker", getAllWorkers);

export default router;
