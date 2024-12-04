"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.post("/cards", controllers_1.createCard);
router.get("/card/:authId", controllers_1.getCard);
exports.default = router;
