import { Request, Response } from "express";
import { ClientModel } from "../../src/database/models/client.model";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { authId, email, username } = req.body;

  const actualEmail = typeof email === "object" ? email.emailAddress : email;

  if (!actualEmail) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    const existingUser = await ClientModel.findOne({ email: actualEmail });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const client = new ClientModel({
      authId,
      email: actualEmail,
      username,
    });

    await client.save();
    res.status(201).json({ message: "Client created successfully" });
    console.log("Client register successful");
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
