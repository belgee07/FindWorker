import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

export const FooterComp = () => {
  return (
    <div className="h-fit bg-black text-white">
      <div className="flex justify-between px-40 py-12">
        <div className="flex gap-36">
          <div className="flex flex-col gap-4">
            <div>Ажлын байрууд</div>
            <div className="flex flex-col gap-2 text-sm">
              <div>Арт</div>
              <div>Орчуулга</div>
              <div>Гэр ахуй</div>
              <div>Боловсрол</div>
              <div>Гоо сайхан</div>
              <div> Дизайн & Барилга</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>Байгууллага</div>
            <div className="flex flex-col gap-2 text-sm">
              <div>Үйл ажиллагаа</div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className=" flex justify-center items-center w-8 h-8 border-gray-500 border-opacity-50 border-2 rounded-full ">
              <FaPhone />
            </div>

            <p>(976)80008000</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" flex justify-center items-center w-8 h-8 border-gray-500 border-opacity-50 border-2 rounded-full ">
              <IoIosMail />
            </div>

            <p>monservice@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2  justify-center items-center  py-4 border-t-2 border-solid border-gray-500 border-opacity-50">
        <p className="h-5 w-5 border-solid opacity-50  flex border-2 justify-center items-center  rounded-full">
          c
        </p>
        <p>2024 Mon Service MN</p>
      </div>
    </div>
  );
};
