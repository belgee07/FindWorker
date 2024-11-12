import { Router } from "express";
import { registerWorker } from "../../controllers/workerCreate";

const router = Router();

router.post("/register", registerWorker);


export default router;
