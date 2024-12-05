import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./database/config";
import clientRoutes from "./routes/ClientRoutes";
import workerRoutes from "./routes/WorkerRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import jobRoutes from "./routes/JobRoutes";
import reviewRoutes from "./routes/ReviewRoutes";
import applicationRoutes from "./routes/ApplicationRoutes";
import cardRouter from "./routes/CardRoutes";
import userRoutes from "./routes/UserRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/", cardRouter);
app.use("/api/users", userRoutes);

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
