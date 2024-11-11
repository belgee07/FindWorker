import { Router } from "express";
import { registerClient } from "../../controllers/clientCreate";

const router = Router();

router.post("/register", registerClient);


export default router;
