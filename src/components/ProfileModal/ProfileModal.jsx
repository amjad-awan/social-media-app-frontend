import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/UserActions";
import ImagePicker from "../ImagePicker/ImagePicker";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "ProfileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to send files and text data
    const data = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append profile picture
    if (profileImage) {
      data.append("profilePicture", profileImage);
    }

    // Append cover picture
    if (coverImage) {
      data.append("coverPicture", coverImage);
    }

    try {
      await dispatch(updateUser(param.id, data));
      setModalOpened(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname || ""}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname || ""}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Works At"
            className="infoInput"
            name="worksAt"
            onChange={handleChange}
            value={formData.worksAt || ""}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lives in"
            className="infoInput"
            name="livesin"
            onChange={handleChange}
            value={formData.livesin || ""}
          />
          <input
            type="text"
            placeholder="Country"
            className="infoInput"
            name="country"
            onChange={handleChange}
            value={formData.country || ""}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Relationship Status"
            className="infoInput"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship || ""}
          />
        </div>

        <div className="image-picker-wrapper">
          <ImagePicker
            label="Profile Image"
            name="ProfileImage"
            type="profile"
            image={profileImage}
            onChange={onImageChange}
          />

          <ImagePicker
            label="Cover Image"
            name="CoverImage"
            type="cover"
            image={coverImage}
            onChange={onImageChange}
          />
        </div>

        <button
          type="submit"
          className="button infoButton"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
