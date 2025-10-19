import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./PostHeader.css";
import { getImageUrl } from "../../../utils/getImageUrl";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

const PostHeader = ({ post, onDelete }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [showMenu, setShowMenu] = useState(false);

 
  const handleDelete = () => {
    onDelete();
    setShowMenu(false);
  };
  return (
    <div className="post-header">
      <div className="post-left">
        <img
          src={
            post.userId?.profilePictureId
              ? getImageUrl(post.userId.profilePictureId)
              : "https://social-media-app-frontend-azure.vercel.app/images/profile.jpeg"
          }
          alt="user"
          className="post-user-img"
        />
        <div className="post-user-info">
          <span className="post-username">
            {post.userId?.firstname} {post.userId?.lastname}
          </span>
          <span className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Three Dots */}
      {post?.userId?._id?.toString() === user?._id?.toString()&& (
        <div className="post-menu-wrapper">
          <span className="three-dots" onClick={() => setShowMenu(!showMenu)}>
            
            <IoEllipsisVerticalOutline />

          </span>

          {showMenu && (
            <div className="post-dropdown">
              <p onClick={handleDelete}>Delete</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
