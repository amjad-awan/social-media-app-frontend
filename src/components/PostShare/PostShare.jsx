import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "./../../actions/UploadActions";
const PostShare = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state?.authReducer?.authData;
  });
  const loading = useSelector((state) => {
    return state?.postReducer?.uploading;
  });

  const imageRef = useRef();
  const desc = useRef();
  const resetShare=()=>{
    setImage(null)
    desc.current.value=""
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setImage(img);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user?.user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log("data 44", data);
      console.log(newPost);
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost,user?.user._id));
    resetShare();
  };
  return (
    <div className="PostShare">
      <img src={user?.user?.coverPicture ? `${process.env.REACT_APP_API_BASE_URL}/images/` + user?.user?.coverPicture : "https://social-media-app-frontend-azure.vercel.app/images/" + "profile.jpeg"}  alt="" />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
            {loading?"uploading...":"Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
