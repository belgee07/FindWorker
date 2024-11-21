import { Router } from "express";
import { registerClient, getClients, updateClient } from "../../controllers";

const router = Router();

router.post("/register", registerClient);

router.get("/clientDetails/:id", getClients);

router.put("/updatedClient/:id", updateClient);

export default router;
