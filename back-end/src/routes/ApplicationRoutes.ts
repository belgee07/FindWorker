// routes/ApplicationRoutes.ts
import { Router } from "express";
import { sendEmailController } from "../../controllers";
import { createApplication } from "../../controllers/";
import { updateApplicationStatus } from "../../controllers/";
import { sendNotification } from "../../controllers/";
import { getWorkerNotifications } from "../../controllers";

const router = Router();

router.post("/send-mail", sendEmailController);
router.post("/create", createApplication);
router.post("/update-status", updateApplicationStatus);
router.post("/send-notification", sendNotification);
router.get("/worker/notifications", getWorkerNotifications);

export default router;
