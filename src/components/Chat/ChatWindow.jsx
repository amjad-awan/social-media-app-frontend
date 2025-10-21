import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import "./Chat.css";
import { getImageUrl } from "../../utils/getImageUrl";
import useSocket from "../../socket/useSocket";
import ChatHeader from "./ChatHeader/ChatHeader";

const ChatWindow = ({ chat,setTypingChatId, messages, socket, onSend }) => {
  const [isTyping, setIsTyping] = useState(false);
  // ✅ Listen typing events (hook must be at the top)
  useEffect(() => {
    if (!socket || !chat) return;

    socket.on("typing", ({ chatId }) => {
        setTypingChatId(chatId)
      if (chatId === chat._id) setIsTyping(true);
    });

    socket.on("stopTyping", ({ chatId }) => {
        setTypingChatId(null)
      if (chatId === chat._id) setIsTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, chat]);

  // ✅ Now place conditional return here
  if (!chat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  const receiver = chat?.members?.find((m) => m._id !== chat.currentUser);
  return (
    <div className="chat-window">
   
      <ChatHeader receiver={receiver} />


      {/* Messages */}
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${
              msg?.senderId?._id === chat.currentUser ? "sent" : "received"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* ✅ Typing Indicator */}
        {/* {isTyping && (
          <div className="typing-indicator">
            <span>Typing...</span>
          </div>
        )} */}
      </div>

      {/* Input */}
      <MessageInput
        onSend={onSend}
        socket={socket}
        chatId={chat._id}
        currentUserId={chat.currentUser}
        receiverId={receiver?._id}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChatWindow;
