import React from "react";
import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import Link from "next/link";
import { Workers } from "./Workers";

export const HomePage = () => {
  return (
    <div>
      <div className="relative ">
        <img src="./banner.png" alt="Banner" className="w-full h-auto" />
        <div className="absolute bottom-64 left-32 flex space-x-4">
          <Link href={"/sign-up"}>
            <Button className="bg-black rounded-3xl">
              <FiUser /> Бүртгүүлэх
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="bg-black rounded-3xl">
              <CgLogIn /> Нэвтрэх
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Workers />
      </div>
    </div>
  );
};
