import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link"; 

export default function JoinPage() {
  const [role, setRole] = useState("client");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="text-3xl font-semibold mb-8">Join as a Client or Freelancer</h1>
      
      <RadioGroup
        value={role}
        onValueChange={setRole}
        className="space-y-6 w-full max-w-sm"
      >
        {/* Client Option */}
        <div
          className={`flex items-center justify-between p-4 border rounded-md ${
            role === "client" ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <Label htmlFor="client" className="cursor-pointer">
            I’m a client, hiring for a project
          </Label>
          <RadioGroupItem value="client" id="client" />
        </div>

        {/* Worker Option */}
        <div
          className={`flex items-center justify-between p-4 border rounded-md ${
            role === "freelancer" ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <Label htmlFor="freelancer" className="cursor-pointer">
            I’m a freelancer, looking for work
          </Label>
          <RadioGroupItem value="freelancer" id="worker" />
        </div>
      </RadioGroup>

      <Button className="mt-6 w-full max-w-sm" size="lg">
        Join as a {role === "client" ? "Client" : "Worker"}
      </Button>

      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
