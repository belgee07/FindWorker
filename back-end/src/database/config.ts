import { connect } from "mongoose";
import env from "dotenv";

env.config();

const URL: string = process.env.MONGO || "";

export const connectDatabase = async () => {
  if (!URL) {
    console.error(
      "MongoDB connection string is missing in environment variables."
    );
    process.exit(1);
  }

  try {
    await connect(URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};
