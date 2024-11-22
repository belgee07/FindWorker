"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { GrUserWorker } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

export default function JoinPage() {
  const [role, setRole] = useState("client");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Join as a Client or Freelancer
      </h1>

      {/* Radio Group with Custom Design */}
      <RadioGroup
        value={role}
        onValueChange={setRole}
        className="flex space-x-4 w-full max-w-xl justify-center"
      >
        {/* Client Option */}
        <div
          className={`flex flex-col items-center p-6 border rounded-lg cursor-pointer transition-all w-1/2 ${
            role === "client"
              ? "border-green-500 bg-green-50 shadow-lg"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <FaUser className="text-4xl " />
            <RadioGroupItem
              className="h-5 w-5 border-gray-400"
              value="client"
              id="client"
            />
          </div>
          <Label
            htmlFor="client"
            className="cursor-pointer text-lg text-center"
          >
            I’m a client
          </Label>
        </div>

        {/* Worker Option */}
        <div
          className={`flex flex-col items-center p-6 border rounded-lg cursor-pointer transition-all w-1/2 ${
            role === "worker"
              ? "border-green-500 bg-green-50 shadow-lg"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <GrUserWorker className="text-4xl" />
            <RadioGroupItem
              className="h-5 w-5 border-gray-400"
              value="worker"
              id="worker"
            />
          </div>
          <Label
            htmlFor="worker"
            className="cursor-pointer text-lg text-center"
          >
            I’m a worker
          </Label>
        </div>
      </RadioGroup>

      {/* Register Button */}
      <Link href={`/sign-up`}>
        <Button className="mt-6 w-full max-w-sm" size="lg">
          Register as a {role === "client" ? "Client" : "Worker"}
        </Button>
      </Link>

      {/* Sign-in Link */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-green-600 underline">
          <SignInButton />
        </Link>
      </p>
    </div>
  );
}
