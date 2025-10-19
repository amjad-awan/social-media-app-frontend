import React from "react";
import { useSelector } from "react-redux";
import Cover from "../../img/cover.jpg";
import profileImage from "../../img/profileImg.jpg";
import { Link } from "react-router-dom"
import "./ProfileCard.css";
const ProfileCard = ({ location }) => {
  const ProfilePage = false;
  const { user } = useSelector(state => state.authReducer.authData)
  const posts = useSelector(state => state.postReducer.posts)
const filteredPosts=posts.filter(post => post.userId === user._id).length
console.log(' user ===',user)
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture ? `${process.env.REACT_APP_API_BASE_URL}/images/` + user.coverPicture : "https://social-media-app-frontend-azure.vercel.app/images/" + "cover.png"} alt="" />
        <img src={user.profilePicture ? `${process.env.REACT_APP_API_BASE_URL}/images/` + user.profilePicture : "https://social-media-app-frontend-azure.vercel.app/images/" + "profile.jpeg"} alt="" />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{filteredPosts}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? '' : <span>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>My Profile</Link>
      </span>}
    </div>
  );
};

export default ProfileCard;
