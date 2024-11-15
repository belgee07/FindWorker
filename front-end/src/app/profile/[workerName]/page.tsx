"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const { workerName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const worker = {
    name: "ProfileName1",
    type: "Гэр ахуй",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/shadcn.png",
    age: "21",
    experience: "10",
    gender: "Male",
    salary: "1hr/15$",
    phoneNumber: "99119911",
    email: "ajiltan7711@gmail.com",
    skills: ["Design", "Barilga"],
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="flex justify-center mt-14">
      <div className="  w-[1220px]   ">
        <div className="border-2 flex gap-4 items-center p-8 justify-between rounded-2xl  ">
          <div className="flex items-center gap-4">
            <img src={worker.avatar} className="w-22 h-20 rounded-full" />
            <div>
              <strong>{workerName}</strong>
              <address>Addresss:{worker.address}</address>
            </div>
          </div>
          <div>
            <Button onClick={handleOpenModal}>Ажилийн хүсэлт +</Button>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4 w-[350px]">
            Та ямар ажил хийлгэхээ бичээд захиалах товч дээр дархад болно
          </h2>
        </Modal>

        <div className="flex">
          <div className="flex-col border-x-2 w-[399px] border-b-2 p-8 rounded-2xl">
            <div>Төрөл : {worker.type}</div>
            <div>Туршлага : {worker.experience}</div>
            <div>Нас : {worker.age}</div>
            <div>Хүйс : {worker.gender}</div>
            <div>Цалин : {worker.salary}</div>
            <div>
              <strong>Холбоо барих : </strong>
              <div>Утас : {worker.phoneNumber}</div>
              <div>Email : {worker.email}</div>
            </div>
          </div>
          <div className="border-b-2 border-r-2 w-[1220px] rounded-2xl p-8">
            <strong>
              <h1>{worker.description}</h1>
            </strong>
            <div>Skills : </div>
            <div className="flex flex-wrap gap-2">
              {worker.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="w-24 h-6 bg-gray-300 text-gray-500 border-none rounded-xl flex items-center justify-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
