import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./database/config";
import clientRoutes from "../src/routes/ClientRoutes";  
import workerRoutes from "../src/routes/WorkerRoutes"
import categoryRoutes from "../src/routes/CategoryRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/category", categoryRoutes)

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
