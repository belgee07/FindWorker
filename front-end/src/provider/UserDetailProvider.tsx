"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, ReactNode } from "react";

interface UserDetailProviderProps {
  children: ReactNode;
}

const UserDetailProvider = ({ children }: UserDetailProviderProps) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const saveUserData = async () => {
        const role = localStorage.getItem("role");

        if (!role) {
          console.log("Role not found in localStorage");
          return;
        }

        try {
          const userEmail = user.emailAddresses[0].emailAddress;

          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/register`,
            {
              authId: user.id,
              username: user.username,
              email: userEmail,
            }
          );
          console.log("Clerk Auth ID:", user.id);
        } catch (error) {
          console.log("Error saving user data:", error);
        }
      };

      saveUserData();
    }
  }, [user]);

  return <>{children}</>;
};

export default UserDetailProvider;
