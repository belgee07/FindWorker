import { Request, Response } from 'express';
import {ReviewModel} from "../../src/database/models/review.model" // Assuming the Review model is located here


export const getReview = async (req: Request, res: Response) => {
  const { workerId, } = req.params; 
  console.log(workerId); 

  try {
 
    const reviews = await ReviewModel.find({workerId});


    if (!reviews.length) {
      res.status(404).json({ message: "No reviews found for this worker" });
      return
    }
 
    res.status(200).json({ reviews });
  } catch (err: any) {
    console.error(err); 
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};








