"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobButton } from "./JobButton";
import Link from "next/link";

type Worker = {
  _id: string;
  username: string;
  profile_picture: string;
  bio: string;
  phoneNumber: string;
  address: string;
  gender: string;
  age: number;
  salary_range: number;
  experience: string;
  email: string;
  createdAt: string;
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
        console.log(err);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <JobButton selectedType={selectedType} onSelectType={setSelectedType} />

      <div className="grid grid-cols-3 gap-10">
        {filteredWorkers.map((worker) => (
          <Link
            key={worker._id}
            href={`/profile/${encodeURIComponent(worker.username)}`}
          >
            <div className="w-[400px] mt-4 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={worker.profile_picture || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {worker.username?.slice(0, 2).toUpperCase() || "N/A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>Ажилтан: {worker.username}</div>
                  <div>Хүйс: {worker.gender}</div>
                  <div>Нас: {worker.age}</div>
                  <div>
                    Огноо: {new Date(worker.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div>{worker.bio}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
