import { Router } from "express";
import { createReview, getReview, getTopRatedWorkers } from "../../controllers";

const router = Router();

router.post("/createReview", createReview);
router.get("/getReview/:workerId", getReview);
router.get("/topRatedWorkers", getTopRatedWorkers); // New route

export default router;
