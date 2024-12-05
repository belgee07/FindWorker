"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  useEffect,
  ReactNode,
  useState,
  createContext,
  useContext,
} from "react";

const MongoUserContext = createContext<any>(null);

interface MongoUserProviderProps {
  children: ReactNode;
}

const MongoUserProvider = ({ children }: MongoUserProviderProps) => {
  const { user } = useUser();
  const [mongoUser, setMongoUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const authId = user.id;
      const email = user.primaryEmailAddress?.emailAddress;

      if (!email) {
        console.error("Email is not available.");
        return;
      }

      try {
        const { data: existingUser } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getUserByAuthId`,
          { params: { authId } }
        );

        if (existingUser) {
          console.log("User exists in MongoDB:", existingUser);
          setMongoUser(existingUser);
        } else {
          console.log("User not found in MongoDB.");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [mongoUser]);

  return (
    <MongoUserContext.Provider value={mongoUser}>
      {children}
    </MongoUserContext.Provider>
  );
};

export default MongoUserProvider;
