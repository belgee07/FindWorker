import { Router } from "express";
import { addCategory } from "../../controllers/categoryCreate"; 
import { getCategory } from "../../controllers/getAllCategory";

const router = Router();

router.post("/addCategory", addCategory); 
router.get("/allCategory", getCategory); 

export default router;
