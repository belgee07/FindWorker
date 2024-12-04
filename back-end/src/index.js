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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./database/config");
const ClientRoutes_1 = __importDefault(require("./routes/ClientRoutes"));
const WorkerRoutes_1 = __importDefault(require("./routes/WorkerRoutes"));
const CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
const JobRoutes_1 = __importDefault(require("./routes/JobRoutes"));
const ReviewRoutes_1 = __importDefault(require("./routes/ReviewRoutes"));
const ApplicationRoutes_1 = __importDefault(require("./routes/ApplicationRoutes"));
const CardRoutes_1 = __importDefault(require("./routes/CardRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/clients", ClientRoutes_1.default);
app.use("/api/workers", WorkerRoutes_1.default);
app.use("/api/categories", CategoryRoutes_1.default);
app.use("/api/jobs", JobRoutes_1.default);
app.use("/api/reviews", ReviewRoutes_1.default);
app.use("/api/applications", ApplicationRoutes_1.default);
app.use('/api/', CardRoutes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, config_1.connectDatabase)();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
startServer();
