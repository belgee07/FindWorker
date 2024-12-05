"use client";

import {  useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import StarRating from "./StarRating";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";


type Worker = {
  _id: string;
  authId: string;
  username: string;
  profile_picture: string;
  category: { _id: string; categoryName: string }[];
  bio: string;
  job: { _id: string; jobName: string }[];
  phoneNumber: string;
  address: string;
  gender: string;
  age: number;
  education: string;
  languages: string[];
  salary_range: number;
  experience: string;
  email: string;
  createdAt: string;
  rating: number;

  comment: string;
  skills: string;
};

const WorkerProfile: React.FC = () => {
  const { id } = useParams();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loadingRating, setLoadingRating] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    const fetchWorkerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/workerDetails/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch worker details");
        }
        const data: Worker = await response.json();
        setWorker(data);

        const review = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/getReview/${data._id}`
        );
        if (!review.ok) {
          throw new Error("Failed to fetch worker review");
        }
        const { reviews } = await review.json();

        const sum = reviews.reduce((accumulator: number, currentValue: { rating: number }) => {
          return accumulator + currentValue.rating;
        }, 0);

        const averageRating = reviews.length > 0 ? sum / reviews.length : 0;
        const parsedRating = Math.trunc(averageRating);
        const latestComment = reviews.length > 0 ? reviews[reviews.length - 1].comment : "";

        setRating(parsedRating.toString());
        setComment(latestComment);
      } catch (err) {
        setError("Failed to load worker details. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerDetails();
  }, [id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!worker) {
    return <div className="text-center text-red-500">Worker not found.</div>;
  }

  return (
    <div className="flex flex-col  items-center justify-center mt-20 ">
      <div className="border rounded-xl w-[1000px] shadow-lg  ">
        <div className=" flex items-center justify-between p-6 border-b ">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 ml-6 mt-4 mb-4">
              <AvatarImage
                src={worker.profile_picture || "/default-avatar.png"}
                alt={worker.username}
                className="rounded-full"
              />
              <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-800 font-bold">
                {worker.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold ">{worker.username}</h1>
              <div className="flex flex-row gap-2 mt-4">
                <IoLocationOutline />
                <p className="text-sm  text-gray-500"> {worker.address}</p>
              </div>
            </div>
          </div>
          <Button onClick={handleOpenModal} className="bg-blue-600 text-white mr-12">
            Ажлын хүсэлт +
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          workerId={worker._id}
        >
          <h2 className="text-lg font-bold mb-4 mt-6 ml-6">
            Та ажлын хүсэлтээ бичээд захиалах товч дээр дарна уу.
          </h2>
        </Modal>
        <div className="flex flex-row w-[1000px] ">
          <div className=" flex flex-col w-[450px] p-6 border-r  gap-4 pl-8">
            <div className="flex flex-col mt-2">
              <p className="text-md  font-semibold">Боловсрол </p>
              <p>{worker.education}</p>
            </div>
            <div className="flex flex-col mt-2 ">
              <p className="text-md font-semibold">Гадаад хэлний мэдлэг</p>
              <p>{worker.languages}</p>
            </div>
            <div className="flex flex-row mt-2 ">
              {worker.salary_range}
              <p>₮/цаг</p>
            </div>
            <p className="mt-2">
              <strong>Хүйс:</strong> {worker.gender}
            </p>
            <div>
              <strong>Нас:</strong> {worker.age}
            </div>
            <h3 className="mt-4 text-md border-t pt-4 font-semibold">Холбоо барих</h3>
            <p>{worker.phoneNumber}</p>
            <p>{worker.email}</p>
          </div>
          <div className="flex flex-col   p-6 w-[950px]  ">
            <div className="text-md font-semibold   flex flex-row gap-2">
              <p className="flex flex-row pl-6">Мэргэжил: </p>
              {worker.job?.length
                ? worker.job.map((job) => job.jobName).join(", ")
                : "N/A"}
            </div>
            <div className="flex flex-col pt-4 pl-6">
              <div className="flex flex-col ">
                <p className="text-md font-semibold">Ажлын туршлага</p>
                <p className="">{worker.bio}</p>
              </div>
              <h2 className="text-md font-semibold pt-4 ">Ур чадвар</h2>
              <p className="" >{worker.experience}</p>
            </div>
            <div className="flex flex-col p-6  mt-5 border-t  gap-2 ">
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < Number(rating) ? <AiFillStar /> : <AiOutlineStar />}
                  </span>
                ))}
              </div>
              <p>{comment || "Хараахан сэтгэгдэл байхгүй байна"}</p>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>

      <StarRating authId={worker.authId} workerId={worker._id} />
    </div>


  );
};

export default WorkerProfile;
