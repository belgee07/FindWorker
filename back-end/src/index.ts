import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./database/config";
import { registerClient } from "../controllers/clientCreate";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", registerClient);

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`http://localhost:8000`);
  });
};

startServer();
