"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ApplicationRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const controllers_2 = require("../../controllers/");
const router = (0, express_1.Router)();
router.post("/send-mail", controllers_1.sendEmailController);
router.post("/create", controllers_2.createApplication);
exports.default = router;
