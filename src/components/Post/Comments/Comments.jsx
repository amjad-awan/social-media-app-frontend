import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import "./CommentComponent.css";
import { getImageUrl } from "../../../utils/getImageUrl";
import {
  addComment,
  getCommentsOnPost,
  deleteComment,
} from "../../../api/CommentRequests";
import EmojiPickerComponent from "../../EmojiPickerComponent/EmojiPickerComponent";

const CommentComponent = ({ postId }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");


  useEffect(() => {
    fetchComments();
  }, []);



  const fetchComments = async () => {
    const res = await getCommentsOnPost(postId);
    setComments(res.data);
  };

  const handleAddComment = async () => {
    if (!text.trim()) return;
    await addComment({ postId, userId: user._id, comment: text });
    setText("");
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    fetchComments();
  };

  const onEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <div className="comment-box">
      <div className="comment-list">
        {comments.map((c, i) => (
          <div className="comment-item" key={i}>
            <img
              src={
                c.userId.profilePictureId
                  ? getImageUrl(c.userId.profilePictureId)
                  : "https://social-media-app-frontend-azure.vercel.app/images/profile.jpeg"
              }
              className="comment-user-img"
              alt="profile"
            />

            <div className="comment-content">
              <span className="comment-username">
                {c.userId.firstname} {c.userId.lastname}
              </span>
              <span className="comment-text">{c.comment}</span>
            </div>

            {user._id === c.userId._id && (
              <button
                className="delete-comment-btn"
                onClick={() => handleDeleteComment(c._id)}
             
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Emoji Picker (BOTTOM & AUTO CLOSE) */}

      {/* ✅ Input + Emoji + Post */}
      <div className="comment-input-wrapper">
     
        <EmojiPickerComponent onEmojiSelect={onEmojiSelect} />

        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="comment-input"
        />
        <button className="button comment-btn"    disabled={!text} onClick={handleAddComment}>
          Post
        </button>
      </div>
 
    </div>
  );
};

export default CommentComponent;
