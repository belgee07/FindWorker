import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="bg-red-500 flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-red-500 hover-bg-white",
            card: "bg-green-500",
          },
        }}
      />
    </div>
  );
}
