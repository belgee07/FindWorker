"use client";

import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { MdAddCard } from "react-icons/md";

import { Input } from "@/components/ui/input";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("/admin");
  const [role, setRole] = useState<string | null>(null);

  // Hide header for admin pages
  if (isAdmin) {
    return null;
  }

  useEffect(() => {
    // Fetch role from localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "client"); // Default to "client" if no role is found
  }, []);

  return (
    <div className="flex w-full border-b-2 gap-2 px-5 justify-between items-center md:px-14 lg:px-24 xl:px-44 2xl:px-96">
      {/* Logo and tagline */}
      <div>
        <Link href={"/"}>
          <div className="sm:text-3xl text-2xl ">
            <strong>Findwork</strong>
          </div>
        </Link>
        <div className="text-xs sm:lg">Монголын иргэн бүрд ажлын байр!</div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Input
          className="pl-8 pr-2 py-1 rounded-2xl text-sm w-40"
          type="text"
          placeholder="Хайх"
        />
        <IoSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl" />
      </div>

      {/* User actions */}
      <div className="flex gap-2">
        {/* If signed out, show login/signup buttons */}
        <SignedOut>
          <Link href={"/sign-in"}>
            <Button className="bg-black rounded-3xl">
              <CgLogIn /> Нэвтрэх
            </Button>
          </Link>
          <Link href={"/join"}>
            <Button className="bg-black rounded-3xl">Бүртгүүлэх</Button>
          </Link>
        </SignedOut>

        {/* If signed in, show user-specific actions */}
        <SignedIn>
          {user && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Welcome {role}, {user.username || "User"}!
              </span>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Мэдэгдэл"
                    labelIcon={<MdNotificationsActive />}
                    onClick={() => router.push("/")}
                  />
                  <UserButton.Action
                    label="Edit Profile"
                    labelIcon={<CgProfile />}
                    onClick={() => router.push(`/${role}/edit-data-${role}/`)}
                  />
                      <UserButton.Action
                    label="Карт холбох"
                    labelIcon={<CiCreditCard1 />}
                    onClick={() => router.push(`/${role}/payment-${role}/`)}
                  />
                  <UserButton.Action
                    label="Эрх сунгах"
                    labelIcon={<MdAddCard />}
                    onClick={() => router.push(`/${role}/subscription-${role}/`)}
                  />
                 
                </UserButton.MenuItems>
              </UserButton>
            </div>
          )}
        </SignedIn>
      </div>
    </div>
  );
};
