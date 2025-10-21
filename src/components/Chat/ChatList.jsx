import React, { useState, useEffect } from "react";
import "./Chat.css";
import UserDropdown from "./UserDropdown/UserDropdown";
import { getUserContacts } from "../../api/UserRequest";
import { createChat } from "../../api/chatRequest";
import { getImageUrl } from "../../utils/getImageUrl";
import { LuPackageOpen } from "react-icons/lu";

const ChatList = ({
  chats,
  setChats,
  activeChat,
  setActiveChat,
  currentUserId,
  socket,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  // ✅ SOCKET: Online / Offline updates
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("userOnline", ({ userId }) => {
  //     setChats(prev =>
  //       prev.map(chat =>
  //         chat.receiverId === userId || chat.senderId === userId
  //           ? { ...chat, isOnline: true, lastSeen: null }
  //           : chat
  //       )
  //     );
  //   });

  //   socket.on("userOffline", ({ userId, lastSeen }) => {
  //     setChats(prev =>
  //       prev.map(chat =>
  //         chat.receiverId === userId || chat.senderId === userId
  //           ? { ...chat, isOnline: false, lastSeen }
  //           : chat
  //       )
  //     );
  //   });

  //   return () => {
  //     socket.off("userOnline");
  //     socket.off("userOffline");
  //   };
  // }, [socket, setChats]);

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
        <button
          className="plus-button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          +
        </button>
      </div>

      {dropdownOpen && (
        <UserDropdown users={contacts} onSelectUser={handleSelectUser} />
      )}
  {/* ✅ Empty State */}
  {(!chats || chats.length === 0) && (
    <div className="empty-chat-list">
      {/* <img src="/images/empty-chat.png" alt="no chats" /> */}
      <LuPackageOpen />

      <h4>No chats yet</h4>
      <p>Start a new conversation</p>
    </div>
  )}
      {chats.map((chat) => {
        const receiver = chat?.members?.find((m) => m._id !== currentUserId);
        return (
          <div
            key={chat._id}
            className={`chat-list-item ${
              activeChat?._id === chat._id ? "active" : ""
            }`}
            onClick={() => {
              setActiveChat(chat);
              setChats((prevChats) =>
                prevChats.map((c) =>
                  c._id === chat._id ? { ...c, unreadCount: 0 } : c
                )
              );
            }}
          >
            <div className="chat-avatar-wrapper">
              <img
                src={
                  chat?.profilePictureId
                    ? getImageUrl(chat?.profilePictureId)
                    : "/images/profile.jpeg"
                }
                alt="profile"
                className="chat-avatar"
              />
              {receiver.isOnline ? (
                <span className="online-dot"></span>
              ) : (
                <span className="offline-dot"></span>
              )}
            </div>

            <div className="chat-info">
              <strong>
                {chat.firstname} {chat.lastname}
              </strong>
              <p className="last-message">
                {receiver.isTyping
                  ? "Typing..."
                  : !receiver.isOnline && receiver.lastSeen
                  ? `last seen: ${new Date(
                      receiver.lastSeen
                    ).toLocaleTimeString()}`
                  : chat.lastMessage || ""}
              </p>
              {chat.unreadCount > 0 && (
                <span className="unread-badge">{chat.unreadCount}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
