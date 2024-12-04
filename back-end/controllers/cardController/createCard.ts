import { Request, Response } from "express";
import { CardModel } from "../../src/database/models/card.model"; 

export const createCard = async (req: Request, res: Response) => {
  try {
    const { bank, cardHolder, cardNumber, expiryDate, cvv, authId } = req.body;


    if (!bank || !cardHolder || !cardNumber || !expiryDate || !cvv) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return
    }
  
    const newCard = new CardModel({
      authId,
      bank,
      cardHolder,
      cardNumber,
      expiryDate,
      cvv,
    });

 
    const savedCard = await newCard.save();

    res.status(201).json({
      success: true,
      message: "Card created successfully",
      data: savedCard,
    });
  } catch (error) {
    console.error("Error creating card:", error);
     res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
