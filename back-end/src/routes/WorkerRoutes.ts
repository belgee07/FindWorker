import express from "express";
import {
  registerWorker,
  updatedWorker,
  getWorkerWithDetails,
  getAllWorkers,
  searchController
} from "../../controllers/workerController";


const router = express.Router();

router.post("/register", registerWorker);
router.put("/editWorker/:id", updatedWorker);
router.get("/workerDetails/:id", getWorkerWithDetails);
router.get("/allWorkers", getAllWorkers);
router.post("/search", searchController);

export default router;
