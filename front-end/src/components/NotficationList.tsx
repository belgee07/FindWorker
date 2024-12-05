"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerNotification from "./Notfication"; // Ensure the correct path
import { useUser } from "@clerk/nextjs";

// Define the Notification interface to ensure type safety
interface Notification {
  _id: string;
  description: string;
  applicationId: string;
  [key: string]: any;
}

const WorkerNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) {
        console.error("User is not available.");
        setLoading(false);
        return;
      }

      try {
        const workerId = user.id; // safely accessing user.id
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/worker/notifications?workerId=${workerId}`
        );
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  if (loading) return <p>Loading notifications...</p>;
  if (!user) return <p>User is not logged in.</p>;

  return (
    <div>
      {notifications.map((notification) => (
        <WorkerNotification
          key={notification._id}
          notification={notification} // Ensure correct typing here
        />
      ))}
    </div>
  );
};

export default WorkerNotifications;
