import { Router } from "express";
import { addJob } from "../../controllers/jobCreate"; 
import {getJobsWithCategory} from "../../controllers/getJob"

const router = Router();

router.post("/addJob", addJob);
router.get("/getJobs", getJobsWithCategory)

export default router;
