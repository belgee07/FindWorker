import React from "react";
import { IoAccessibilityOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Gi3dStairs } from "react-icons/gi";

export const FooterComp = () => {
  return (
    <div className="h-[250px] bg-black text-white">
      <div className="flex justify-between px-40 py-20">
        <IoAccessibilityOutline className="size-8" />
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
      <div className="flex gap-2 opacity-50 justify-center py-4 border-t-2 border-solid border-gray-500 border-opacity-50">
        <p className="h-5 w-5 border-solid flex border-2 justify-center items-center  rounded-full">
          c
        </p>
        <p>Mon Service MN</p>
      </div>
    </div>
  );
};
