import { Router } from "express";
import { createApplication } from "../../controllers";

const router = Router();

router.post("/create", createApplication);

export default router;
