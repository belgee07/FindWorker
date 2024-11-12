import { Request, Response } from "express";
import { ReviewModel } from "../../src/database/models/review.model";

export const createReview = async (req: Request, res: Response): Promise<void> => {
  const { clientId, workerId, rating, comments } = req.body;

  console.log("Request body:", req.body);  

  if (!clientId || !workerId || rating === undefined) {
    res.status(400).json({ message: "Client ID, Worker ID, and Rating are required" });
    return;
  }

  try {
    const review = new ReviewModel({
      clientId,
      workerId,
      rating,
      comments,
    });

    await review.save();

    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);  // Log any error
    res.status(500).json({ message: "Internal server error" });
  }
};

