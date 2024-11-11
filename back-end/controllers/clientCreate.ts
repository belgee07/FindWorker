import { ClientModel } from "../src/database/models/client.model";
import bcrypt from "bcryptjs";

export const registerClient = async (req: any, res: any) => {
  const {  email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await ClientModel.findOne({ email });
    console.log(existingUser, "exists");

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new ClientModel({
      email,
      password: hashedPassword,
    });

    await client.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error irj bn medjinu" });
  }
};
