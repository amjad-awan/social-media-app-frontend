import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../actions/UploadActions";
import { getImageUrl } from "../../utils/getImageUrl";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.authReducer?.authData?.user);
  const loading = useSelector((state) => state?.postReducer?.uploading);

  const imageRef = useRef();
  const desc = useRef();

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("desc", desc.current.value);
      if (image) formData.append("file", image);

      await dispatch(uploadPost(formData)); // Upload post including image
      resetShare();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="PostShare">
      <img
        // src={
        //   user?.profilePictureId
        //     ? `${process.env.REACT_APP_API_BASE_URL}/image/${user.profilePictureId}`
        //     : "/images/profile.jpeg"
        // }

        src={user?.profilePictureId?getImageUrl(user.profilePictureId): "https://social-media-app-frontend-azure.vercel.app/images/" + "profile.jpeg"}
        alt=""
      />
      <div>
        <input type="text" placeholder="What's happening?" ref={desc} />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery /> Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle /> Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint /> Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule /> Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>
          <input
            type="file"
            ref={imageRef}
            onChange={onImageChange}
            style={{ display: "none" }}
          />
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
