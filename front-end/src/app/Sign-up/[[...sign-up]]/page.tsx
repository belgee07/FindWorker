import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <SignUp
        path="/sign-up"
        appearance={{
          layout: { unsafe_disableDevelopmentModeWarnings: true },
          elements: {
            formButtonPrimary:
              "bg-black text-white p-2 rounded-md hover:bg-gray-800",
            card: "shadow-lg rounded-lg p-6 max-w-md w-full",
            button: "text-white p-2 rounded-md hover:bg-green-500",
          },
        }}
      />
    </div>
  );
}
