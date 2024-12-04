"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.post("/addJob", controllers_1.addJob);
router.get("/getJobs", controllers_1.getJobsWithCategory);
router.put("/updateJobs");
exports.default = router;
