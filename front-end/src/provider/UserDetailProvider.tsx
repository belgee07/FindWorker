"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, ReactNode } from "react";

interface UserDetailProviderProps {
  children: ReactNode;
}

const UserDetailProvider = ({ children }: UserDetailProviderProps) => {
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (user?.username && user.emailAddresses?.length > 0) {
      const registerUser = async () => {
        try {
          const userEmail = user.emailAddresses[0].emailAddress;

          await axios.post("http://localhost:8000/api/workers/register", {
            username: user.username,
            email: userEmail,
          });
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };

      registerUser();
    }
  }, [user]);

  return <>{children}</>;
};

export default UserDetailProvider;
