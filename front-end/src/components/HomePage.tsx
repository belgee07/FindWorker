import React from "react";
import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import Link from "next/link";
import { Workers } from "./Workers";
import { Input } from "@/components/ui/input";
import { CgSearch } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import { CgSearch } from "react-icons/cg";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 px-96">
      <div className="border-[1px] mt-12 flex flex-col  rounded-3xl shadow-gray-300  shadow-2xl pt-20 ">
        <div className="flex  items-center justify-center">
          <p className="text-5xl font-bold w-[750px] text-center">
            Бид Таныг ур чадвартай, найдвартай мэргэжилтнүүдтэй холбож өгнө.  
          </p>
        </div>
        <div className="flex items-center justify-between">
          <img className="w-[380px] h-[380px]" src="/1.png" alt="" />
          <div className="flex flex-col gap-40 justify-center ">
            <div className="flex w-full max-w-sm items-center space-x-2 relative justify-end pr-3 mt-12">
              <Input
                className="py-5 rounded-3xl w-[320px]"
                type="email"
                placeholder="Мэргэжилтэн, Ур чадвараар"
              />
              <Button
                className="rounded-3xl bg-black absolute right-4  "
                type="submit"
              >
                <CgSearch />
                Хайх
              </Button>
            </div>
            <div className=" bottom-64 left-32 flex space-x-4 w-[100%] items-center justify-center ">
              <Link href={"/sign-in"}>
                <Button className="bg-black rounded-3xl px-5">
                  <CgLogIn /> Нэвтрэх
                </Button>
              </Link>
            </div>
          </div>
          <img className="w-[395px] h-[395px]" src="/2.png" alt="" />
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-300 ">
        <Workers />
      </div>
      <div className=" flex justify-between px-20 py-20 border-solid border-[1px] rounded-2xl shadow-2xl shadow-gray-300 ">
        <div className="flex gap-8  flex-col justify-center w-[50%]">
          <div className="text-5xl font-bold ">
            Ур чадвараа ашиглан нэмэлт орлого олоход тань бид тусална.
          </div>
          <div className=" bottom-64  flex space-x-4 ">
            <Link href={"/join"}>
              <Button className="bg-black rounded-3xl w-36 text-xl">
                <p className="text-3xl font-bold">+</p>
                <p className="text-xl font-bold">Нэгдэх</p>
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <img className="w-[480px] h-[436px]" src="/Vector.png" alt="" />
        </div>
      </div>

      <div className="flex px-28 py-32 border-[1px] border-solid rounded-3xl shadow-2xl shadow-gray-300 mb-12 justify-center gap-28 items-center">
        <img className="w-[550.84px] h-[452px]" src="/Labor.svg" alt="" />
        <div className="text-5xl font-bold">
          Тулгарсан асуудлыг тань шийдвэрлэх ажилчидтай бид холбох болно{" "}
        </div>
      </div>
      <div className=" flex justify-between px-20 py-20 border-solid border-[1px] rounded-2xl shadow-2xl shadow-gray-300 ">
        <div className="flex gap-8  flex-col justify-center w-[50%]">
          <div className="text-5xl font-bold ">
            Ур чадвараа ашиглан нэмэлт орлого олоход тань бид тусална.
          </div>
          <div className=" bottom-64  flex space-x-4 ">
            <Link href={"/join"}>
              <Button className="bg-black rounded-3xl w-36 text-xl">
                <p className="text-3xl font-bold">+</p>
                <p className="text-xl font-bold">Нэгдэх</p>
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <img className="w-[480px] h-[436px]" src="/Vector.png" alt="" />
        </div>
      </div>

      <div className="flex px-28 py-32 border-[1px] border-solid rounded-3xl shadow-2xl shadow-gray-300 mb-12 justify-center gap-28 items-center">
        <img className="w-[550.84px] h-[452px]" src="/Labor.svg" alt="" />
        <div className="text-5xl font-bold">
          Тулгарсан асуудлыг тань шийдвэрлэх ажилчидтай бид холбох болно{" "}
        </div>
      </div>
    </div>
  );
};
