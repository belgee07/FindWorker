"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { StarIcon } from "lucide-react";
import { JobButton } from "./JobButton";
import { WorkersSearch } from "./WorkersSearch";
import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
};

export const Search: React.FC = () => {
  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

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

  const filteredWorkers = inputValue
    ? workersData.filter(
        (worker) =>
          worker.bio?.toLowerCase().includes(inputValue.toLowerCase()) || false
      )
    : workersData;

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col  gap-6 justify-center items-center ">
      <div className="flex flex-col">
        <div className="flex flex-row gap-12  justify-center ">
          <div className="relative flex items-center">
            <IoSearch className="absolute w-[20px] h-[20px]  ml-3" />
            <Input
              className="rounded-xl pl-12 text-sm w-[300px] sm:w-[600px]"
              type="text"
              placeholder="Хайх ажил"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          {/* <Select>
            <SelectTrigger className="w-[180px] mt-12 rounded-xl">
              <SelectValue placeholder="Гадаад хэл" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Гадаад хэл</SelectLabel>
                <SelectItem value="Англи хэл">Англи хэл</SelectItem>
                <SelectItem value="Франц хэл">Франц хэл</SelectItem>
                <SelectItem value="Орос хэл">Орос хэл</SelectItem>
                <SelectItem value="Япон хэл">Япон хэл</SelectItem>
                <SelectItem value="Герман хэл">Герман хэл</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <div className="flex">
        {/* <WorkersSearch selectedType={selectedType} onSelectType={setSelectedType} /> */}
        <div
          className="grid grid-cols-1 w-100% sm:w-100% sm:grid-cols-2 md:grid-cols-3 md:w-100% lg:px-44 gap-12 p-12 
       
        "
        >
          {filteredWorkers.map((worker, index) => (
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
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="ml-1 text-sm text-gray-700">
                      {worker.rating || "N/A"} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4  space-y-1 text-sm text-gray-600">
                {/* <div>
                <span className="font-medium">Ангилал:</span>{" "}
                {worker.category?.length
                  ? worker.category.map((cat) => cat.categoryName).join(", ")
                  : "N/A"}
              </div> */}

                {/* <div>
                <span className="font-medium">Хүйс:</span>{" "}
                {worker.gender || "N/A"}
              </div>
              <div>
                <span className="font-medium">Нас:</span> {worker.age || "N/A"}
              </div> */}
                <div className="flex flex-row">
                  <p>₮</p>
                  <div>{worker.salary_range}</div>
                  <p>/цаг</p>
                </div>
                <div>
                  <span className="font-medium"></span> {worker.bio || "N/A"}
                </div>
                {/* <div>
                <span className="font-medium">Joined:</span>{" "}
                {new Date(worker.createdAt).toLocaleDateString() || "N/A"}
              </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
