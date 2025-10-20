import React, { useState, useEffect } from "react";
import "./Chat.css";
import UserDropdown from "./UserDropdown/UserDropdown";
import { getUserContacts } from "../../api/UserRequest";
import { createChat } from "../../api/chatRequest";
import { getImageUrl } from "../../utils/getImageUrl";

const ChatList = ({
  chats,
  setChats,
  activeChat,
  setActiveChat,
  currentUserId,
  socket
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  // ✅ SOCKET: Online / Offline updates
  useEffect(() => {
    if (!socket) return;

    socket.on("userOnline", ({ userId }) => {
      setChats(prev =>
        prev.map(chat =>
          chat.receiverId === userId || chat.senderId === userId
            ? { ...chat, isOnline: true, lastSeen: null }
            : chat
        )
      );
    });

    socket.on("userOffline", ({ userId, lastSeen }) => {
      setChats(prev =>
        prev.map(chat =>
          chat.receiverId === userId || chat.senderId === userId
            ? { ...chat, isOnline: false, lastSeen }
            : chat
        )
      );
    });

    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [socket, setChats]);

  // ✅ Fetch dropdown users
  useEffect(() => {
    if (!dropdownOpen) return;
    const fetchContacts = async () => {
      try {
        const res = await getUserContacts(currentUserId);
        setContacts(res.data.contacts);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };
    fetchContacts();
  }, [dropdownOpen, currentUserId]);

  const handleSelectUser = async (user) => {
    setDropdownOpen(false);
    try {
      const res = await createChat({
        senderId: currentUserId,
        receiverId: user._id,
      });
      const chatData = res.data;
      const exists = chats.find((c) => c._id === chatData._id);
      if (!exists) setChats((prev) => [chatData, ...prev]);
      setActiveChat(chatData);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-header">
        Chats
        <button className="plus-button" onClick={() => setDropdownOpen(prev => !prev)}>
          +
        </button>
      </div>

      {dropdownOpen && <UserDropdown users={contacts} onSelectUser={handleSelectUser} />}

      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`chat-list-item ${activeChat?._id === chat._id ? "active" : ""}`}
          onClick={() => setActiveChat(chat)}
        >
          <div className="chat-avatar-wrapper">
            <img
              src={chat?.profilePictureId ? getImageUrl(chat?.profilePictureId) : "/images/profile.jpeg"}
              alt="profile"
              className="chat-avatar"
            />
            {chat.isOnline ? <span className="online-dot"></span> : <span className="offline-dot"></span>}
          </div>

          <div className="chat-info">
            <strong>{chat.firstname} {chat.lastname}</strong>
            <p className="last-message">
              {chat.isTyping ? "Typing..." :
                chat.isOnline ? "Online" :
                chat.lastSeen ? `last seen: ${new Date(chat.lastSeen).toLocaleTimeString()}` :
                chat.lastMessage || ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
