"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface StarRatingProps {
  authId: string;
  workerId: string;
  onClose: () => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  authId,
  workerId,
  onClose,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [previousRating, setPreviousRating] = useState<number | null>(null);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/getReview/${workerId}`
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
  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Та эхлээд нэвтэрнэ үү.</p>
          <Link href="/sign-in">
            <Button>Нэвтрэх</Button>
          </Link>

          <Button onClick={onClose}>Гарах</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Please select a rating before submitting",
      });
      return;
    }

    try {
      const payload = { rating, comment, authId, workerId };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/createReview`,
        payload
      );
      toast({
        description: "success",
      });
      setPreviousRating(rating);
    } catch (error) {
      console.log("Error submitting rating:", error);
      toast({
        title:
          "An error occurred while submitting the rating. Please try again.",
        description: "error",
      });
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
              className={`text-2xl cursor-pointer ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
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
      <Button
        onClick={handleSubmit}
        className="flex mt-6 mb-4 ml-[200px] w-[120px]"
      >
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
