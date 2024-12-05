import { Router } from "express";
import { createReview, getReview } from "../../controllers";

const router = Router();

router.post("/createReview", createReview);
router.get("/getReview/:workerId", getReview)

export default router;
