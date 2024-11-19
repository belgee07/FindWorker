"use client";
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const jobs = [
  "Боловсрол",
  "Гэр ахуй",
  "Дизайн & Барилга",
  "Арт",
  "Гоо сайхан",
  "Орчуулга",
];

export const Header = () => {
  const { user } = useUser();
  const router = usePathname();
  const isAdmin = router.includes("/admin");

  if (isAdmin) {
    return null;
  }

  return (
    <div className="flex border-b-2 items-center gap-32 justify-between px-96 py-3">
      <div>
        <Link href={"/"}>
          <div className="text-3xl">
            <strong>Findwork</strong>
          </div>
        </Link>

        <div>Монголын иргэн бүрд ажлын байр!</div>
      </div>

      <div className="flex items-center border border-gray-300 hover:border-gray-500 rounded-3xl px-4 py-2 w-80 gap-3">
        <BiSearchAlt />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 h-8"
        />
      </div>

      <div className="flex gap-2">
        <SignedOut>
          {/* Display these buttons when the user is not signed in */}
          <Link href={"/sign-up"}>
            <Button className="bg-black rounded-3xl">
              <FiUser /> Sign Up
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="bg-black rounded-3xl">
              <CgLogIn /> Sign In
            </Button>
          </Link>
        </SignedOut>

        <SignedIn>
          {/* Display the UserButton and username when the user is signed in */}
          {user && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Welcome, {user.username || "User"}!
              </span>
              <UserButton />
            </div>
          )}
        </SignedIn>
      </div>
    </div>
  );
};
