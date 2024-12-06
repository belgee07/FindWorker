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
  const [role, setRole] = useState<string | null>(null); // Store role separately

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const authId = user.id;

      try {
        // Fetch user data from backend
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getUserByAuthId`,
          { params: { authId } }
        );

        if (data) {
          console.log("User found in MongoDB:", data);
          setMongoUser(data.user);
          setRole(data.role); // Update role based on backend response
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <MongoUserContext.Provider value={{ mongoUser, role }}>
      {children}
    </MongoUserContext.Provider>
  );
};

export const useMongoUser = () => useContext(MongoUserContext);

export default MongoUserProvider;
