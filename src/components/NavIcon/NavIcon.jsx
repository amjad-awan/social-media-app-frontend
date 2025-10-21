import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Noti from "../../img/noti.png";
import Home from "../../img/home.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import "./NavIcon.css";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";
import { getNotifications } from "../../api/notificationRequests";
import useSocket from "../../socket/useSocket";

const NavIcon = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  const socket = useSocket(user?._id); // connect socket

  // Fetch notifications once
  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications(user._id);
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.log("Notification fetch error:", err);
      }
    };
    fetchNotifications();
  }, [user]);

  // Listen for incoming notifications
  useEffect(() => {
    if (!socket) return;

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.off("newNotification");
  }, [socket]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="navIcon">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <UilSetting />

      <div className="notification-icon-wrapper" onClick={() => setOpen(!open)}>
        <img src={Noti} alt="notifications" className="nav-icon" />
        {unreadCount > 0 && <span className="noti-badge">{unreadCount}</span>}
      </div>

      <Link to="/chat">
        {" "}
        <img src={Comment} alt="comments" />
      </Link>

      <Notifications
        open={open}
        setOpen={setOpen}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
};

export default NavIcon;
