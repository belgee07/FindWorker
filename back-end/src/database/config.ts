import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.MONGO || "";
export const connectDatabase = async () => {
  try {
    await connect(URL);
  } catch (err) {
    console.log("DB not connect");
  }
};
