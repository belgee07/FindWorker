import { Router } from "express";
import { registerWorker, updatedWorker, getWorkerWithDetails } from "../../controllers";

const router = Router();

router.post("/register", registerWorker);
router.put("/editWorker/:id", updatedWorker);
router.get("/workerDetails/:id", getWorkerWithDetails);

export default router;
