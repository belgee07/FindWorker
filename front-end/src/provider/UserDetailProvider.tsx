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
    if (user?.id && user?.username && user?.emailAddresses?.length > 0) {
      const registerUser = async () => {
        try {
          const userEmail = user.emailAddresses[0].emailAddress;

          await axios.post("http://localhost:8000/api/workers/register", {
            authId: user.id,
            username: user.username,
            email: userEmail,
          });
          console.log("Clerk Auth ID:", user.id);
        } catch (error) {
          console.log("error");
        }
      };

      registerUser();
    }
  }, [user]);

  return <>{children}</>;
};

export default UserDetailProvider;
