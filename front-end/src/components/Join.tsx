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
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Join as a Client or Freelancer
      </h1>

      <RadioGroup
        value={role}
        onValueChange={setRole}
        className="space-y-6 w-full max-w-sm "
      >
        <div
          className={`flex items-center justify-between p-4 border rounded-md transition-all ${
            role === "client"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <FaUser />
          <Label htmlFor="client" className="cursor-pointer text-lg">
            I’m a client
          </Label>
          <RadioGroupItem value="client" id="client" />
        </div>

        <div
          className={`flex items-center  justify-between p-4 border rounded-md transition-all ${
            role === "freelancer"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <GrUserWorker />
          <Label htmlFor="worker" className="cursor-pointer text-lg">
            I’m a worker
          </Label>
          <RadioGroupItem value="worker" id="worker" />
        </div>
      </RadioGroup>

      <Link href="/sign-up/${role}">
        <Button className="mt-6 w-full max-w-sm" size="lg">
          Register a {role === "client" ? "Client" : "Worker"}
        </Button>
      </Link>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-green-600 underline">
          <SignInButton />
        </Link>
      </p>
    </div>
  );
}
