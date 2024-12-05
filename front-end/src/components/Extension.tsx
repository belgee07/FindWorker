"use client";

import { useState } from "react";
import { Button } from "./ui/button"
import ModalPayment from "./ModalPayment";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

const Extension = () => {
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const handleOpenModalPayment = () => setIsModalPaymentOpen(true);
  const handleCloseModalPayment = () => setIsModalPaymentOpen(false);
  const { user } = useUser()

  return (
    <div className="flex flex-col gap-4  mt-12 text-lg font-semibold">
      <div className="flex flex row gap-2 ml-[730px]">
        <Link href={"/"}>
            <MdArrowBackIosNew className="w-5 h-6 hover:bg-slate-300" />
        </Link>
        <div>Эрх сунгах</div>
      </div>

      <div className="flex flex-col mt-4 gap-6 font-normal justify-center items-center">
        <Button className="bg-slate-600 flex flex-col w-[200px] h-[70px]"
          onClick={handleOpenModalPayment}>
          <span> 3 сарын эрх</span>
          <span>20 000 ₮</span> </Button>
        <Button className="bg-slate-600 flex flex-col w-[200px] h-[70px]"
          onClick={handleOpenModalPayment}>
          <span> 6 сарын эрх</span>
          <span>30 000 ₮</span> </Button>
        <Button className="bg-slate-600 flex flex-col w-[200px] h-[70px]"
          onClick={handleOpenModalPayment}>
          <span>1 жилийн эрх</span>
          <span>40 000 ₮</span> </Button>
      </div>
      {
        isModalPaymentOpen && <ModalPayment
          isOpen={isModalPaymentOpen}
          onClose={handleCloseModalPayment}
          authId={user?.id}
        />
      }

    </div>
  )
}
export default Extension