import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white flex items-center justify-center">
      <SignUp
        appearance={{
          layout: { unsafe_disableDevelopmentModeWarnings: true },
          
          elements: {
            formButtonPrimary: "bg-red-500 hover-bg-white",
            card: "",
            button: "bg-green-500",
          },
        }}
      />
    </div>
  );
}
