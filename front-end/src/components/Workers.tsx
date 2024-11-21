"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobButton } from "./JobButton";
import Link from "next/link";
import { StarIcon } from "lucide-react";

type Worker = {
  _id: string;
  authId: string;
  username: string;
  profile_picture: string;
  category: string;
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
};

export const Workers: React.FC = () => {
  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    ? workersData.filter((worker) => worker.gender === selectedType)
    : workersData;

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <JobButton selectedType={selectedType} onSelectType={setSelectedType} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkers.map((worker, index) => (
          <Link
            key={worker.authId || index}
            href={`/profile/${worker.authId}`}
            className="block p-5 bg-white border rounded-lg shadow hover:shadow-lg hover:border-gray-300 transition-shadow"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ">
                <AvatarImage
                  src={worker.profile_picture || "/default-avatar.png"}
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
                <p className="text-sm text-gray-500">
                  {worker.bio || "No bio available."}
                </p>
                <div className="flex items-center mt-2">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <span className="ml-1 text-sm text-gray-700">
                    {worker.rating || "N/A"} / 5.0
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {worker.category || "N/A"}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {worker.gender || "N/A"}
              </p>
              <p>
                <span className="font-medium">Age:</span> {worker.age || "N/A"}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {worker.experience || "N/A"}
              </p>
              <p>
                <span className="font-medium">Joined:</span>{" "}
                {new Date(worker.createdAt).toLocaleDateString() || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
