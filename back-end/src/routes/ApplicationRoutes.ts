// routes/ApplicationRoutes.ts
import { Router } from "express";
import { sendEmailController } from "../../controllers";
import { createApplication } from "../../controllers/";

const router = Router();

router.post("/send-mail", sendEmailController);
router.post("/create", createApplication);

export default router;
