import React, { useState } from "react";
import "../styles/ImageInput.css"

const ImageInput = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div
      className={`image-input ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="image-input-content">
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
        <p> -- or --</p>
        <p>Drag & Drop your image or Browse</p>
        </div>
    </div>
  );
};

export default ImageInput;
