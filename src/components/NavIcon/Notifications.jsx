import React, { useEffect, useRef } from "react";
import "./Notifications.css";
import { markNotificationRead } from "../../api/notificationRequests";

const Notifications = ({ open, setOpen, notifications, setNotifications }) => {
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  // Format time
  const formatTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date; // ms
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  // Mark as read
  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.log("Mark read error:", err);
    }
  };

  if (!open) return null;
console.log('notifications ====',notifications)
  return (
    <div className="noti-dropdown glass" ref={dropdownRef}>
      <div className="noti-header">
        <span>Notifications</span>
        <span className="close-btn" onClick={() => setOpen(false)}>×</span>
      </div>
      <div className="noti-main">
  {notifications.length === 0 ? (
        <p className="empty">No notifications yet</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`noti-item ${n.isRead ? "read" : "unread"}`}
            onClick={() => handleMarkRead(n._id)}
          >
            <strong>{n.senderId?.username || "Someone"}</strong> {n.message}
            {n.postId && <span style={{ fontStyle: "italic", marginLeft: 4 }}>📌</span>}
            <div className="time">{formatTime(n.createdAt)}</div>
          </div>
        ))
      )}
      </div>

    
    </div>
  );
};

export default Notifications;
