import { Router } from "express";
import { addJob , getJobsWithCategory} from "../../controllers"; 

const router = Router();

router.post("/addJob", addJob);
router.get("/getJobs", getJobsWithCategory)
router.put("/updateJobs", )


export default router;
