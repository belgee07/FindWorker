import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

const UserDetailProvider = () => {
  const { user } = useUser();

  useEffect(() => {
    axios.post("http://localhost:8000/api/workers/register");
  }, [user]);
  return <div>UserDetailProvider</div>;
};

export default UserDetailProvider;
