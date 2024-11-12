import { Router } from "express";
import { addCategory, getCategory } from "../../controllers"; 


const router = Router();

router.post("/addCategory", addCategory); 
router.get("/allCategory", getCategory); 

export default router;
