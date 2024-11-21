import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";

export const FooterComp = () => {
  return (
    <div className="h-fit bg-black text-white">
      <div className="flex justify-between  px-5 gap-8 py-10 md:px-14 lg:px-24 xl:px-44 2xl:px-96">
        <div className="flex  flex-col gap-4">
          <div className="font-bold">Ажлын байрууд</div>
          <div className="flex flex-col gap-2 text-sm">
            <div>Арт</div>
            <div>Орчуулга</div>
            <div>Гэр ахуй</div>
            <div>Боловсрол</div>
            <div>Гоо сайхан</div>
            <div> Дизайн & Барилга</div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10 border-gray-500 border-opacity-50 border-2 rounded-full hover:bg-sky-500 hover:border-orange-500 transition-all duration-300 ease-in-out ">
              <GrLocation />
            </div>

            <p>Улаанбаатар, Монгол Улс</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" flex justify-center items-center w-10 h-10 border-gray-500 border-opacity-50 border-2 rounded-full hover:bg-blue-500 hover:border-orange-500  transition-all duration-300 ease-in-out">
              <FaFacebook />
            </div>

            <p>Findwork</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" flex justify-center items-center w-10 h-10 border-gray-500 border-opacity-50 border-2 rounded-full  hover:bg-green-500 hover:border-pink-500 transition-all duration-300 ease-in-out ">
              <FaPhone />
            </div>

            <p>(976)80008000</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" flex justify-center items-center w-10 h-10 border-gray-500 border-opacity-50 border-2 rounded-full  hover:bg-indigo-500 hover:border-orange-500 transition-all duration-300 ease-in-out">
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
        <p>2024 FindWork MN</p>
      </div>
    </div>
  );
};
