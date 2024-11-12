import { Router } from "express";
import { registerWorker } from "../../controllers/workerCreate";
import { updatedWorker} from "../../controllers/updatedWorker";
import {getWorkerWithDetails } from "../../controllers/getWorkerDetail";

const router = Router();

router.post("/register", registerWorker);
router.put("/editWorker/:id", updatedWorker);
router.get("/workerDetails/:id", getWorkerWithDetails);


export default router;
