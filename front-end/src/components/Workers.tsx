"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { StarIcon } from "lucide-react";
import { JobButton } from "./JobButton";
import { Button } from "./ui/button";

type Worker = {
  _id: string;
  authId: string;
  username: string;
  profile_picture: string;
  category: { _id: string; categoryName: string }[];
  job: { _id: string; jobName: string }[];
  bio: string;
  phoneNumber: string;
  address: string;
  gender: string;
  age: number;
  salary_range: number;
  experience: string;
  email: string;
  createdAt: string;
  rating: number;
  comments: { rating: number; text: string }[];

};

export const Workers: React.FC = () => {
  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/allWorkers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch worker data");
        }
        const data: Worker[] = await response.json();
        setWorkersData(data);
      } catch (err) {
        setError("Failed to load worker data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);
  const filteredWorkers = selectedType
    ? workersData.filter(
        (worker) => worker.category?.[0]?.categoryName === selectedType
      )
    : workersData.map((worker) => ({
        ...worker,
        category: worker.category || [{ categoryName: "Uncategorized" }],
      }));

  console.log(workersData);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);  
  };

  return (
    <div className="space-y-6">
     
      <JobButton selectedType={selectedType} onSelectType={setSelectedType} />

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 p-8">
        {filteredWorkers.slice(0, visibleCount).map((worker, index) => (
          <Link
            key={worker.authId || index}
            href={`/profile/${worker.authId}`}
            className="block p-6 bg-white border rounded-lg shadow hover:shadow-lg hover:border-gray-300 transition-shadow"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ">
                <AvatarImage
                  src={worker.profile_picture || "/default-avatar.jpg"}
                  className="rounded-full "
                />
                <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-800 font-bold">
                  {worker.username?.slice(0, 2).toUpperCase() || "N/A"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {worker.username}
                </h3>
                <div>
                  {worker.job?.length
                    ? worker.job.map((job) => job.jobName).join(", ")
                    : "N/A"}
                </div>
                <div className="flex items-center mt-2">
                  <span className="ml-1 text-sm text-gray-700">
                    {worker.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div className="flex flex-row">
                <p>₮</p>
                <div>{worker.salary_range}</div>
                <p>/цаг</p>
              </div>
              <div>
                <span className="font-medium"></span> {worker.bio || "N/A"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredWorkers.length && (
        <div className="text-center mt-4 pb-9">
          <Button
            onClick={handleShowMore}
            className=" text-white py-2 px-4  rounded-lg"
          >
           Цааш үзэх
          </Button>
        </div>
      )}
    </div>
  
  );
};
