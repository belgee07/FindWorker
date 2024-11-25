"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";

// type Job = {
//   jobName: string;
// };
// type Category = {
//   categoryName: string;
// };
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
  skills: string;
};

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [jobs, setJobs] = useState<Job[]>([]);
  // const [categories, setCategories] = useState<Category[]>([]);

  // const getJobs = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/getJobs`
  //     );
  //     setJobs(data);
  //   } catch (err) {
  //     console.error("Failed to fetch jobs:", err);
  //   }
  // };

  // const getCategories = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/allCategory`
  //     );
  //     setCategories(data);
  //   } catch (err) {
  //     console.error("Failed to fetch categories:", err);
  //   }
  // };
  // useEffect(() => {
  //   getJobs();
  //   getCategories();
  // }, []);

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
      } catch (err) {
        setError("Failed to load worker details. Please try again.");
        console.error(err);
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
    <div className="flex justify-center mt-14">
      <div className="w-[1220px] space-y-6">
        <div className="border flex items-center justify-between p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
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
              <h1 className="text-xl font-bold">{worker.username}</h1>
              <div className="flex flex-row gap-2">
                <IoLocationOutline />
                <p className="text-sm text-gray-500"> {worker.address}</p>
              </div>
            </div>
          </div>
          <Button onClick={handleOpenModal} className="bg-blue-600 text-white">
            Ажлын хүсэлт +
          </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-lg font-bold mb-4 mt-6 ml-6">
            Та ажлын хүсэлтээ бичээд захиалах товч дээр дарна уу.
          </h2>
        </Modal>
        <div className="flex gap-6">
          <div className="w-[400px] border rounded-2xl p-6 shadow-lg gap-4 pl-8">
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
            <h3 className="mt-4 text-тб font-semibold">Холбоо барих</h3>
            <p>{worker.phoneNumber}</p>
            <p>{worker.email}</p>
          </div>
          {/* Main Section - Worker Description & Skills */}
          <div className="flex-1 border rounded-2xl    pl-8 pt-6 shadow-lg">
            <div className="text-md font-semibold flex flex-row gap-2">
              <p>Мэргэжил: </p>
              {worker.job?.length
                ? worker.job.map((job) => job.jobName).join(", ")
                : "N/A"}
            </div>
            <div className="flex flex-col pt-4 ">
              <div className="flex flex-col ">
                <p className="text-md font-semibold">Ажлын туршлага</p>
                <p className="w-[600px]">{worker.bio}</p>
              </div>
              <h2 className="text-md font-semibold pt-4 ">Ур чадвар</h2>
              <p>{worker.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
