"use client";
import { BiSearchAlt } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const jobs = [
  "Боловсрол",
  "Гэр ахуй",
  "Дизайн & Барилга",
  "Арт",
  "Гоо сайхан",
  "Орчуулга",
];

export const Header = () => {
  const [job, setJob] = useState("");

  return (
    <div className="flex border-b-2 items-center gap-32 justify-center py-3">
      <div>
        <div className="text-3xl">
          <strong>Findwork</strong>
        </div>
        <div>Монголын иргэн бүрд ажлын байр!</div>
      </div>

      <Select value={job} onValueChange={setJob}>
        <SelectTrigger className="w-[180px] border-none hover:bg-gray-100">
          <SelectValue placeholder="Ажлын байрууд" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jobs</SelectLabel>

            {jobs.map((jobItem) => (
              <SelectItem key={jobItem} value={jobItem}>
                {jobItem.charAt(0).toUpperCase() + jobItem.slice(1)}{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex items-center border border-gray-300 hover:border-gray-500 rounded-3xl px-4 py-2 w-80 gap-3">
        <BiSearchAlt />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 h-8"
        />
      </div>

      <div className="flex gap-7">
        <div>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
