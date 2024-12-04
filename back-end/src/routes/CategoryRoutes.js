"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.post("/addCategory", controllers_1.addCategory);
router.get("/allCategory", controllers_1.getCategory);
exports.default = router;
