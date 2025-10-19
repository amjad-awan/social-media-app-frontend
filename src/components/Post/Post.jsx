import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/PostsRequests";
import { getImageUrl, handleShare } from "../../utils/getImageUrl";
import CommentComponent from "./Comments/Comments";
import PostHeader from "./PostHeader/PostHeader";
import { deletePost } from "../../actions/PostsActions";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id));
  const [likes, setLikes] = useState(data?.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : prev - 1));
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

  const handleDeletePost = async (postId) => {
    dispatch(deletePost(data._id, user._id));
  };

  return (
    <div className="Post" key={data?._id}>
      <PostHeader post={data} onDelete={handleDeletePost} />
      {data.imageId && <img src={getImageUrl(data.imageId)} alt="" />}
      <div className="PostReact">
        <div className="commentCount">
          <img
            src={liked ? Heart : NotLike}
            alt="like"
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {likes} likes
          </span>
        </div>
        <div className="commentCount">
          <img
            src={Comment}
            alt="comment"
            style={{ cursor: "pointer" }}
            onClick={() => setShowComments((prev) => !prev)}
          />
         
            <span style={{ color: "var(--gray)", fontSize: "12px" }}>
           {data.commentCount}
          </span>
        </div>
        <div className="commentCount">
          <img
            src={Share}
            alt="share"
            style={{ cursor: "pointer" }}
            onClick={() => handleShare(data)}
          />
        </div>
      </div>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
      {showComments && <CommentComponent postId={data._id} />} {/* ✅ */}
    </div>
  );
};

export default Post;
