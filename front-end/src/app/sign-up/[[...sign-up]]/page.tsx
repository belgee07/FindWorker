"use client";
import { SignUp } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole || "client") {
      setRole(storedRole);
    } else {
      setRole("client");
    }
  }, []);

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-center mt-4 text-black text-2xl">
        Sign Up as {role === "client" ? "Client" : "Worker"}
      </h1>
      <SignUp
        fallbackRedirectUrl={`/${role}/${role}-data`} // This replaces afterSignUpUrl
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
