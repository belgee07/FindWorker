import { WorkerModel } from "../../src/database/models/worker.model";
import { ClientModel } from "../../src/database/models/client.model";

// Universal function to check if a user already exists
const findExistingUser = async (authId: string, email: string) => {
  const worker = await WorkerModel.findOne({ $or: [{ authId }, { email }] });
  const client = await ClientModel.findOne({ $or: [{ authId }, { email }] });
  return worker || client;
};

export const registerWorker = async (req: any, res: any) => {
  const { authId, username, email, role } = req.body;

  if (!authId || !username || !email || role !== "worker") {
    return res.status(400).json({ message: "Invalid worker data" });
  }

  try {
    const existingUser = await findExistingUser(authId, email);
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newWorker = await WorkerModel.create({
      authId,
      username,
      email,
      role,
    });
    return res
      .status(201)
      .json({ message: "Worker registered successfully", worker: newWorker });
  } catch (error) {
    console.error("Error registering worker:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
