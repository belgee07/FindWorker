import { Request, Response } from "express";
import { ReviewModel } from "../../src/database/models/review.model";
import { WorkerModel } from "../../src/database/models/worker.model";

export const getTopRatedWorkers = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.aggregate([
      {
        $group: {
          _id: "$workerId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1, reviewCount: -1 }, // Sort by highest rating and most reviews
      },
      {
        $limit: 10, // Limit to top 10 workers
      },
    ]);

    const workers = await WorkerModel.find({
      _id: { $in: reviews.map((review) => review._id) },
    });

    const results = reviews.map((review) => {
      const worker = workers.find((worker) => worker._id.equals(review._id));
      return { ...worker.toObject(), averageRating: review.averageRating };
    });

    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch top-rated workers", error });
  }
};
