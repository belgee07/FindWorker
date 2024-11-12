import { Router } from "express";
import { createReview } from "../../controllers";

const router = Router();

router.post("/createReview", createReview);

export default router;
