"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const category_model_1 = require("../../src/database/models/category.model");
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.body;
    if (!categoryName) {
        res.status(400).json({ message: "Category name is required" });
        return;
    }
    try {
        const category = new category_model_1.CategoryModel({
            categoryName,
        });
        yield category.save();
        res.status(201).json({ message: "Category created successfully", category });
    }
    catch (error) {
        console.error(error);
    }
});
exports.addCategory = addCategory;
