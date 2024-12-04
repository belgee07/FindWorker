"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
}, { timestamps: true });
exports.CategoryModel = mongoose_1.models.Category || (0, mongoose_1.model)("Category", CategorySchema);
