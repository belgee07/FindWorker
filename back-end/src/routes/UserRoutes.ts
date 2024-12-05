import { Router } from "express";
import { getUserByAuthId } from "../../controllers/userController";

const router = Router();

router.get("/getUserByAuthId", getUserByAuthId);

export default router;
