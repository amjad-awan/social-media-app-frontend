import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import "./EmojiPickerComponent.css";

const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  // Emoji click handler
  const handleEmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
  };

  return (
    <div className="emoji-component-wrapper">
      {/* 😊 Emoji Button */}
      <span className="emoji-btn" onClick={() => setShowPicker(!showPicker)}>
        😊
      </span>

      {/* Emoji Picker */}
      {showPicker && (
        <div ref={pickerRef} className="emoji-wrapper-below">
          <EmojiPicker onEmojiClick={handleEmojiClick} height={300} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
