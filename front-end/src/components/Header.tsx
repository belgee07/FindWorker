"use client";

import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";

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
import JoinPage from "./Join";

export const Header = () => {
  const { user } = useUser();
  const router = usePathname();
  const redirect = useRouter();
  const isAdmin = router.includes("/admin");

  if (isAdmin) {
    return null;
  }

  return (
    <div className="flex w-100% border-b-2 gap-2 px-5 justify-between  items-center md:px-14 lg:px-24 xl:px-44 2xl:px-96">
      <div>
        <Link href={"/"}>
          <div className="sm:text-3xl text-2xl ">
            <strong>Findwork</strong>
          </div>
        </Link>

        <div className="text-xs sm:lg">Монголын иргэн бүрд ажлын байр!</div>
      </div>
      <div className="relative ">
        <Input
          className=" pl-8 pr-2 py-1 rounded-2xl text-sm w-24  "
          type="email"
          placeholder="Хайх"
        />
        <IoSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl" />
      </div>

      <div className="flex gap-2">
        <SignedOut>
          {/* <Link href={"/sign-up"}>
            <Button className="bg-black rounded-3xl">
              <FiUser /> Sign Up
            </Button>
          </Link> */}
          <Link href={"/sign-in"}>
            <Button className="bg-black rounded-3xl">
              <CgLogIn /> Sign In
            </Button>
          </Link>

          <Link href={"/join"}>
            <Button className="bg-black rounded-3xl"> + Join</Button>
          </Link>
        </SignedOut>

        <SignedIn>
          {user && (
            <div className="flex items-center gap-2">
              <span className="font-medium  text-gray-700">
                Welcome, {user.username || "User"}!
              </span>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Profile"
                    labelIcon={<CgProfile />}
                    onClick={() => redirect.push("/profile")}
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
