"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

interface StarRatingProps {
  authId: string;
  workerId: string
}

const StarRating: React.FC<StarRatingProps> = ({ authId, workerId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [previousRating, setPreviousRating] = useState<number | null>(null);

  

  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createReview/${authId}`
        );
        if (data) {
          setRating(data.rating);
          setComment(data.comment || "");
          setPreviousRating(data.rating);
        }
      } catch (error) {
        console.log("Error fetching rating:", error);
      }
    };

    if (authId) getRating();
  }, [authId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
  
    try {
      const payload = { rating, comment, authId, workerId};
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/createReview`,
        payload
      );
      alert("Rating submitted successfully!");
      setPreviousRating(rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating. Please try again.");
    }
  };


  return (
    <div className=" flex flex-col rating-container w-[400px] h-[280px] border rounded-xl shadow-xl bg-white  ml-[600px] p-6 mb-12 mt-10">
      <h2 className="text-md font-semibold">Ажилтанд үнэлгээ өгөх</h2>
      <div className="stars" style={{ display: "flex", gap: "5px" }}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className={`text-2xl cursor-pointer ${starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Энд бичнэ үү..."
        rows={4}
        className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <Button onClick={handleSubmit} className=" bg-blue-600 flex mt-6 mb-4 ml-[200px] w-[120px]">
        Үнэлгээ өгөх
      </Button>

      {previousRating !== null && (
        <p style={{ marginTop: "10px" }}>
          Таны өмнөх үнэлгээ: {previousRating} ★
        </p>
      )}
    </div>
  );
};

export default StarRating;


// style={{ maxWidth: "400px", margin: "0 auto" }}

