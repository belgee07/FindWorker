"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "lucide-react";

interface Worker {
  _id: string;
  profile_picture?: string; // Matches API field
  username: string; // Matches API field
  averageRating: number; // Matches API field
}

export const MostStarred = () => {
  const [topWorkers, setTopWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/topRatedWorkers`
        );
        console.log("Top workers data:", response.data); // Debugging log
        setTopWorkers(response.data); // Save the full response data
      } catch (error) {
        console.error("Failed to fetch top-rated workers:", error);
      }
    };

    fetchTopWorkers();
  }, []);

  // Sort workers by rating (optional)
  const sortedWorkers = [...topWorkers].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl mb-4">
        Хамгийн өндөр үнэлгээтэй ажилчид
      </h2>
      <div className="w-[1200px] overflow-x-auto">
        <div className="flex gap-4">
        {sortedWorkers.map((worker) => (
          <div
            key={worker._id}
            className="flex flex-col items-center gap-2 shadow-md rounded-lg p-4 min-w-[200px]"
          >
            {/* Profile Image */}
            <img
              src={worker.profile_picture || "/default-avatar.png"}
              alt={worker.username}
              className="w-20 h-20 rounded-full"
            />
            {/* Username */}
            <p className="text-center font-medium">{worker.username}</p>
            {/* Average Rating */}
            {worker.averageRating !== undefined &&
            worker.averageRating !== null ? (
              <div className="flex">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <p className="text-sm text-gray-500">
                  Rating: {worker.averageRating.toFixed(1)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No ratings yet</p>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
