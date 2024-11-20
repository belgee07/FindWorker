import { clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
const client = clerkClient as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, role } = req.body;

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    res.status(200).json({ message: "Metadata updated successfully" });
  } catch (error) {
    console.error("Error updating metadata:", error);
    res.status(500).json({ error: "Failed to update metadata" });
  }
}
