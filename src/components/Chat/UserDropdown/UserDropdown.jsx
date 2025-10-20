import React from "react";
import "./UserDropdown.css";
import { getImageUrl } from "../../../utils/getImageUrl";

const UserDropdown = ({ users, onSelectUser }) => {
  return (
    <div className="user-dropdown">
      <div className="dropdown-header">Create Chat</div>

      {users?.length === 0 ? (
        <div className="dropdown-item">No followers/following</div>
      ) : (
        users?.map((user) => (
          <div
            key={user.id}
            className="dropdown-item"
            onClick={() => onSelectUser(user)}
          >
            <img
              // src={user.profilePicture}

              src={
                user.profilePictureId
                  ? getImageUrl(user.profilePictureId)
                  : "https://social-media-app-frontend-azure.vercel.app/images/profile.jpeg"
              }
              alt={user.username}
            />
            <span>{user.firstname} {user.lastname}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDropdown;
