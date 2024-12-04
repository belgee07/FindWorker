import { Router } from "express";
import { createCard ,getCard } from "../../controllers";

const router = Router();
router.post("/cards", createCard);
router.get("/card/:authId", getCard);

export default router;
