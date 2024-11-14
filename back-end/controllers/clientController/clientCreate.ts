import { Request, Response } from "express";
import { ClientModel } from "../../src/database/models/client.model";
import bcrypt from "bcryptjs";

export const registerClient = async (req: Request, res: Response): Promise<void> => {
  const { email, password ,phoneNumber} = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;  
  }

  try {
    const existingUser = await ClientModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new ClientModel({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await client.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
