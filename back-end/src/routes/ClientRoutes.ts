import { Router } from "express";
import { registerClient } from "../../controllers";

const router = Router();

router.post("/register", registerClient);


export default router;
