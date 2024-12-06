"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface UserDetailProviderProps {
  children: ReactNode;
}

const UserDetailProvider = ({ children }: UserDetailProviderProps) => {
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const saveUserData = async () => {
        const role = localStorage.getItem("role");

        if (!role) {
          console.log("Role not found in localStorage");
          return;
        }

        try {
          const url =
            role === "worker"
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/register`
              : role === "client"
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/register`
              : null;

          if (!url) {
            console.log("Invalid role:", role);
            return;
          }

          await axios.post(url, {
            authId: user.id,
            username: user.username,
            email: user.primaryEmailAddress?.emailAddress,
            role,
          });

          toast({
            title: `Successfully register ${role}`,
            description: "Success",
          });
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
