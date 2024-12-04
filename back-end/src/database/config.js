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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.MONGO || "";
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!URL) {
        console.error("MongoDB connection string is missing in environment variables.");
        process.exit(1);
    }
    try {
        yield (0, mongoose_1.connect)(URL);
        console.log("Database connected successfully");
    }
    catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
});
exports.connectDatabase = connectDatabase;
