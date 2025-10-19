import React from "react";
import "./ImagePicker.css";

const ImagePicker = ({ label, name, image, onChange, type }) => {
  const inputId = `${name}-input`;

  return (
    <div className="image-picker">
      <label className="picker-label">{label}</label>

      {image && (
        <div className={`img-preview ${type === "profile" ? "profile-img" : "cover-img"}`}>
          <img src={URL.createObjectURL(image)} alt={name} />
        </div>
      )}

      <button
        type="button"
        className="picker-btn"
        onClick={() => document.getElementById(inputId).click()}
      >
        {image ? "Change Image" : `Choose ${label}`}
      </button>

      <input
        type="file"
        id={inputId}
        name={name}
        accept="image/*"
        onChange={onChange}
        hidden
      />
    </div>
  );
};

export default ImagePicker;
