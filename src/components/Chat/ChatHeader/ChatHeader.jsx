// components/Chat/ChatHeader/ChatHeader.jsx
import React from "react";
import "./ChatHeader.css";
import { getImageUrl } from "../../../utils/getImageUrl";

const ChatHeader = ({ receiver }) => {
  return (
    <div className="chat-header-window">
      <img
        src={
          receiver?.profilePictureId
            ? getImageUrl(receiver?.profilePictureId)
            : "https://social-media-app-frontend-azure.vercel.app/images/profile.jpeg"
        }
        alt={receiver?.username}
        className="receiver-avatar"
      />

      <div className="receiver-info">
        <span className="receiver-name">
          {receiver ? `${receiver.firstname} ${receiver.lastname}` : "Unknown"}
        </span>

        <span className="receiver-status">
          {receiver?.isTyping
            ? "Typing..."
            : receiver?.isOnline
            ? "Online"
            : receiver?.lastSeen
            ? `last seen: ${new Date(receiver.lastSeen).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : ""}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
