"use client";

import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import { CgLogIn, CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { MdNotificationsActive, MdAddCard } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
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

  // Fetch role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "client"); // Default to "client" if no role is found
  }, []);

  // Prevent rendering until role is retrieved
  if (role === null) {
    return null;
  }

  return (
    <div className="flex w-full border-b-2 gap-2 px-5 py-3 justify-between items-center md:px-14 lg:px-24 xl:px-44 2xl:px-96">
      {/* Logo and tagline */}
      <div>
        <Link href={"/"}>
          <div className="sm:text-3xl text-2xl ">
            <strong>Findwork</strong>
          </div>
        </Link>
      </div>
      {/* Search bar */}

      <Link href={"/freelance-workers"}>
        <div>
          <Button className="bg-black rounded-3xl hidden sm:flex">
            <IoSearch className="" />
            Ажилчдыг хайх
          </Button>
        </div>
      </Link>

      {/* User Actions */}
      <div className="flex gap-2">
        {/* If signed out, show login/signup buttons */}
        <SignedOut>
          <Link href={"/sign-in"}>
            <Button className="bg-black rounded-3xl hidden sm:flex">
              <CgLogIn /> Нэвтрэх
            </Button>
          </Link>
          <Link href={"/join"}>
            <Button className="bg-black rounded-3xl">
              <FiUser />
              Бүртгүүлэх
            </Button>
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
                    onClick={() =>
                      router.push(`/${role}/subscription-${role}/`)
                    }
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
