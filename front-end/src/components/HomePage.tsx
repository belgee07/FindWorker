import React from "react";
import { Button } from "@/components/ui/button";
import { CgLogIn } from "react-icons/cg";
import Link from "next/link";
import { Workers } from "./Workers";
import { MostStarred } from "./MostStarred";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 px-5 md:px-14 lg:px-24 xl:px-44 2xl:px-96">
      <div className="border-[1px] mt-12 flex flex-col gap-10 rounded-3xl shadow-gray-300  shadow-2xl pt-10 lg:pt-20">
        <div className="flex  items-center justify-center">
          <p className="lg:text-4xl sm:text-2xl font-bold lg:w-[750px] w-[250px] sm:w-[400px]  text-center">
            Бид Таныг ур чадвартай, найдвартай мэргэжилтнүүдтэй холбож өгнө.
          </p>
        </div>
        <div className="flex items-center  justify-center  sm:justify-between ">
          <img
            className="lg:w-[250px] w-[160px] h-[152px]  lg:h-[250px] sm:w-[170px] sm:h-[170px] xl:w-[380px] xl:h-[380px]"
            src="/1.png"
            alt=""
          />

          <div className="flex flex-col lg:gap-40 gap-5  justify-center ">
            <div className=" bottom-64 left-32 flex space-x-4 w-[100%] items-center justify-center ">
              <SignedOut>
                <div className="flex space-x-4 w-full items-center justify-center">
                  <Link href={"/sign-in"}>
                    <Button className="bg-black text-white rounded-3xl px-5 py-2 hover:bg-gray-800 transition">
                      <CgLogIn /> Нэвтрэх
                    </Button>
                  </Link>
                </div>
              </SignedOut>
            </div>
          </div>

          <img
            className="lg:w-[265px] hidden sm:flex lg:h-[285px] sm:w-[165px]  sm:h-[165px] xl:w-[395px] xl:h-[395px]"
            src="/2.png"
            alt=""
          />
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-300">
        <Workers />
      </div>
      <div className=" flex flex-col justify-between sm:flex-row px-14 py-10 lg:py-24 border-solid border-[1px] rounded-2xl shadow-2xl shadow-gray-300 ">
        <div className="flex gap-8  flex-col justify-center items-center sm:w-[40%] lg:[50%]">
          <div className="lg:text-4xl sm:text-2xl font-bold text-center ">
            Ур чадвараа ашиглан нэмэлт орлого олоход тань бид тусална.
          </div>
          <div className=" bottom-64  flex space-x-4 ">
            <Link href={"/join"}>
              <Button className="bg-black rounded-3xl lg:w-36 w-28 text-xl">
                <p className="text-3xl font-bold">+</p>
                <p className="text-xl font-bold">Нэгдэх</p>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="sm:w-[370px] sm:h-[339px] w-[222px] h-[186px]"
            src="/Vector.png"
            alt=""
          />
        </div>
      </div>

      <div className="shadow-2xl shadow-gray-300">
        <MostStarred />
      </div>
      <div className="flex flex-col-reverse sm:flex-row px-14 py-10 lg:py-24  border-[1px] border-solid rounded-3xl shadow-2xl shadow-gray-300 mb-12  items-center lg:gap-28">
        <img
          className="2xl:w-[550.84px] 2xl:h-[452px] sm:w-[370px] sm:h-[339px] w-[270px] h-[239px]"
          src="/Labor.svg"
          alt=""
        />
        <div className=" sm:text-2xl lg:text-4xl font-bold text-center">
          Тулгарсан асуудлыг тань шийдвэрлэх ажилчидтай бид холбох болно{" "}
        </div>
      </div>
    </div>
  );
};
