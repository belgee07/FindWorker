import { Request, Response } from "express";
import { ClientModel } from "../../src/database/models/client.model";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, phoneNumber } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email required" });
    return;
  }

  try {
    const existingUser = await ClientModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const client = new ClientModel({
      email,
      phoneNumber,
    });

    await client.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
