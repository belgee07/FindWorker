"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";

type Worker = {
  _id: string;
  authId: string;
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
  rating: number;
  skills: string;
};

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  console.log(worker);

  return (
    <div className="flex justify-center mt-14">
      <div className="w-[1220px] space-y-6">
        {/* Header Section */}
        <div className="border flex items-center justify-between p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={worker.profile_picture || "/default-avatar.jpg"}
                alt={worker.username}
                className="rounded-full"
              />
              <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-800 font-bold">
                {worker.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{worker.username}</h1>
              <p className="text-sm text-gray-500">Address: {worker.address}</p>
            </div>
          </div>
          <Button onClick={handleOpenModal} className="bg-blue-600 text-white">
            Ажилийн хүсэлт +
          </Button>
        </div>

        {/* Modal Section */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">
            Та ямар ажил хийлгэхээ бичээд захиалах товч дээр дархад болно
          </h2>
          {/* Add form or additional content here */}
        </Modal>

        {/* Main Content Section */}
        <div className="flex gap-6">
          {/* Sidebar - Worker Details */}
          <div className="w-[400px] border rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Worker Details</h2>
            <p>
              <strong>Төрөл:</strong> {worker.gender}
            </p>
            <p>
              <strong>Туршлага:</strong> {worker.experience} жил
            </p>
            <p>
              <strong>Нас:</strong> {worker.age}
            </p>
            <p>
              <strong>Цалин:</strong> {worker.salary_range}
            </p>
            <h3 className="mt-4 text-lg font-semibold">Contact</h3>
            <p>
              <strong>Утас:</strong> {worker.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {worker.email}
            </p>
          </div>

          {/* Main Section - Worker Description & Skills */}
          <div className="flex-1 border rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p>{worker.bio}</p>
            <h3 className="mt-6 text-lg font-semibold">Skills</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
