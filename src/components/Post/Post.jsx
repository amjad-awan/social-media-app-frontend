import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../../api/PostsRequests";
const Post = ({ data }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.authReducer.authData)
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id))
  const [likes, setLikes]=useState(data.likes.length)

  const handleLike=()=>{
    setLiked((prev)=>!prev)
    likePost(data._id, user._id)
    likes?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }
  return (
    <div className="Post" key={data?.id}>
      <img src={data.image ? "http://localhost:3000/images/" + data.image : ""} alt="" />
      <div className="PostReact">
        <img src={liked ? Heart : NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
        <img src={Comment} alt="" />
        <img src={data.image} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
