import React, { useState, useRef } from "react";
import "./Chat.css";
import { FiSend } from "react-icons/fi";
import EmojiPickerComponent from "../EmojiPickerComponent/EmojiPickerComponent";

const MessageInput = ({
  onSend,
  isTyping,
  socket,
  chatId,
  currentUserId,
  receiverId,
}) => {
  const [text, setText] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    socket.emit("stopTyping", { chatId, receiverId });
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
  };

  // ✅ Emit typing
//   const handleTyping = (e) => {
//     setText(e.target.value);
//     socket.emit("typing", { chatId, receiverId });

//     clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       socket.emit("stopTyping", { chatId, receiverId });
//     }, 1000);
//   };


const handleTyping = (e) => {
  setText(e.target.value);
  socket.emit("typing", { chatId, senderId: currentUserId, receiverId });

  clearTimeout(typingTimeoutRef.current);
  typingTimeoutRef.current = setTimeout(() => {
    socket.emit("stopTyping", { chatId, senderId: currentUserId, receiverId });
  }, 1000);
};


  // ✅ ENTER to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && text.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-wrapper">
      <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />

      <input
        type="text"
        placeholder={isTyping ? "Typing..." : "Type a message..."}
        value={text}
        onChange={handleTyping}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSend}>
        <FiSend />
      </button>
    </div>
  );
};

export default MessageInput;
