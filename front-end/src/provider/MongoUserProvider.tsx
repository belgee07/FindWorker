"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, ReactNode, useState } from "react";

interface MongoUserProviderProps {
  children: ReactNode;
}

const MongoUserProvider = ({ children }: MongoUserProviderProps) => {
  const { user } = useUser(); // Get the user from Clerk
  const [mongoUser, setMongoUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return; // Ensure the user is available

      const authId = user.id; // Get the authId from Clerk
      const email = user.primaryEmailAddress?.emailAddress;

      if (!email) {
        console.error("Email is not available.");
        return;
      }

      try {
        // Fetch the user data from MongoDB using authId
        const { data: existingUser } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getUserByAuthId`,
          { params: { authId } }
        );

        if (existingUser) {
          console.log("User exists in MongoDB:", existingUser);
          setMongoUser(existingUser); // Save the user data to the state
        } else {
          console.log("User not found in MongoDB.");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]); // This effect runs every time `user` changes

  if (!mongoUser) {
    // Optionally, render a loading state or nothing while waiting for MongoDB data
    return <div>Loading user data...</div>;
  }

  return <>{children}</>; // Render the children once the data is fetched
};

export default MongoUserProvider;
