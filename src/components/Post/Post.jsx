import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostsRequests";

const Post = ({ data }) => {
  const { user } = useSelector(state => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id));
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    try {
      await likePost(data._id, user._id);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  useEffect(() => {
    setLiked(data?.likes?.includes(user?._id));
    setLikes(data?.likes?.length || 0);
  }, [data.likes, data._id, user?._id]);

  return (
    <div className="Post" key={data?._id}>
      {data.image && (
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/images/${data.image}`}
          alt=""
        />
      )}
      <div className="PostReact">
        <img
          src={liked ? Heart : NotLike}
          alt="like"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
