import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./Chat.css";
import { useSelector } from "react-redux";
import {
  getUserChats,
  getChatMessages,
  sendMessage,
} from "../../api/chatRequest";
import useSocket from "../../socket/useSocket";

const ChatContainer = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const currentUserId = user?._id;
  const [typingChatId, setTypingChatId] = useState(null);
  console.log("typingChatId", typingChatId);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  console.log("typingChatId", chats);
  const socket = useSocket(currentUserId);

  // Fetch user's chats
  useEffect(() => {
    if (!currentUserId) return;

    const fetchChats = async () => {
      try {
        const res = await getUserChats(currentUserId);
        const userChats = res.data || [];

        const transformedChats = userChats.map((chat) => {
          const otherMember = chat.members.find((m) => m._id !== currentUserId);
          return {
            _id: chat._id,
            id: chat._id,
            firstname: otherMember.firstname,
            lastname: otherMember.lastname,
            username: otherMember.username,
            profilePicture:
              otherMember.profilePictureId?.url || "/img/default.jpg",
            lastMessage: chat.lastMessage || "",
            members: chat.members,
          };
        });

        setChats(transformedChats);
        if (transformedChats.length > 0) setActiveChat(transformedChats[0]);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, [currentUserId]);


  // ✅ Listen Online / Offline Users
useEffect(() => {
  if (!socket) return;

  socket.on("userOnline", ({ userId }) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        const receiver = chat.members.find((m) => m._id !== currentUserId);
        if (receiver?._id === userId) {
          return { ...chat, isOnline: true };
        }
        return chat;
      })
    );
  });

  socket.on("userOffline", ({ userId, lastSeen }) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        const receiver = chat.members.find((m) => m._id !== currentUserId);
        if (receiver?._id === userId) {
          return { ...chat, isOnline: false, lastSeen };
        }
        return chat;
      })
    );
  });

  return () => {
    socket.off("userOnline");
    socket.off("userOffline");
  };
}, [socket, currentUserId]);


  useEffect(() => {
    if (activeChat?._id === typingChatId) return;
    setChats((prevChats) =>
      prevChats.map((chat) => {
        // If typingChatId matches → isTyping: true
        if (chat._id === typingChatId) {
          return { ...chat, isTyping: true };
        }
        // all others → isTyping: false
        return { ...chat, isTyping: false };
      })
    );
  }, [typingChatId]);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const res = await getChatMessages(activeChat._id);
        setMessages(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [activeChat]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      // Only add if message belongs to current chat
      if (activeChat && message.chatId === activeChat._id) {
        setMessages((prev) => [...prev, message]);
      }

      // Optionally update lastMessage in chat list
      setChats((prevChats) =>
        prevChats.map((c) =>
          c._id === message.chatId ? { ...c, lastMessage: message.text } : c
        )
      );
    });
    setTypingChatId(null);
    return () => socket.off("newMessage");
  }, [socket, activeChat]);

  // Send message
  const handleSend = async (text) => {
    if (!activeChat) return;

    const newMsg = {
      chatId: activeChat._id,
      senderId: currentUserId,
      text,
    };

    // 1️⃣ Send via API for persistence
    // try {
    //   await sendMessage(newMsg);
    // } catch (err) {
    //   console.error(err);
    // }

    // 2️⃣ Emit via socket for real-time
    if (socket) socket.emit("sendMessage", newMsg);

    // 3️⃣ Update local state
    // setMessages((prev) => [...prev, { ...newMsg, _id: Date.now() }]);
  };

  return (
    <div className="chat-container">
      <ChatList
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        currentUserId={currentUserId}
      />
      <ChatWindow
        chat={{ ...activeChat, currentUser: currentUserId }}
        messages={messages}
        onSend={handleSend}
        socket={socket}
        setTypingChatId={setTypingChatId}
      />
    </div>
  );
};

export default ChatContainer;
