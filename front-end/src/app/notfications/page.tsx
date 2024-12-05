"use client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// Define the structure of a notification
interface Notification {
  applicationId: string;
  description: string;
  status: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Explicitly typed
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) {
        console.error("Auth ID is not available.");
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/worker/notifications?authId=${user.id}`
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
  if (!notifications.length) return <p>No notifications available.</p>;

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.applicationId}>
          <p>{notification.description}</p>
          <p>Status: {notification.status}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
