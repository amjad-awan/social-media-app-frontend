import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import EmojiPicker from "emoji-picker-react";
import "./EmojiPickerComponent.css";

const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Toggle and calculate picker position near button
  const togglePicker = () => {
    if (!showPicker && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 250, // adjust for width
      });
    }
    setShowPicker((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  // Emoji select
  const handleEmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
  };

  return (
    <>
      <span ref={buttonRef} className="emoji-btn" onClick={togglePicker}>
        😊
      </span>

      {showPicker &&
        ReactDOM.createPortal(
          <div
            ref={pickerRef}
            className="emoji-portal-popup"
            style={{ top: position.top, left: position.left }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} height={320} />
          </div>,
          document.body // ← renders outside parent, prevents cutting
        )}
    </>
  );
};

export default EmojiPickerComponent;
