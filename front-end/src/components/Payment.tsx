"use client";
import React, { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "./ui/button";
import ModalCard from "./ModalCard";
import { useUser } from "@clerk/nextjs";

const Payment = () => {
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const { user } = useUser()
  const handleOpenModalCard = () => setIsModalCardOpen(true);
  const handleCloseModalCard = () => setIsModalCardOpen(false);

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <div className="flex flex-row gap-3">
        <Button className="bg-slate-300 rounded-full">
    
          <MdArrowBackIosNew />
        </Button>
        <div>Карт холбох</div>
      </div>
      <img
        src="/card.png"
        alt="Card"
        className="w-[300px] h-[250px] flex justify-center"
      />
      <div className="flex flex-col gap-2">
        <p>Шинээр төлбөрийн карт нэмэх</p>
        <Button
          className="w-[250px] bg-slate-600"
          onClick={handleOpenModalCard}
        >
          + Карт нэмэх
        </Button>
      </div>
      <ModalCard
        isOpen={isModalCardOpen}
        onClose={handleCloseModalCard}
        authId={user?.id}
      >
       
      </ModalCard>
    </div>
  );
};

export default Payment;
