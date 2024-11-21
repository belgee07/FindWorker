import { Request, Response } from "express";
import { ClientModel } from "../../src/database/models/client.model";

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authId = req.params.id;

  const { username, phoneNumber, address, profile_picture } = req.body;

  try {
    const updatedClient = await ClientModel.findOneAndUpdate(
      { authId },
      { username, phoneNumber, address, profile_picture },
      { new: true }
    );

    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Client updated successfully", client: updatedClient });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
