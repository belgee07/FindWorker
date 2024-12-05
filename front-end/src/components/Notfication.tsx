"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button"; // Assuming Button is a reusable component

interface NotificationProps {
  notification: {
    _id: string;
    description: string;
    applicationId: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "Accepted" | "Rejected") => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/update-status`,
        {
          applicationId: notification.applicationId,
          action,
        }
      );
      alert(`Application ${action} successfully.`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-card" style={{ marginBottom: "15px" }}>
      <p>{notification.description}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          disabled={loading}
          onClick={() => handleAction("Accepted")}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Accept
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleAction("Rejected")}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default Notification;
