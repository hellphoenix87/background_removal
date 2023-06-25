import React from "react";
import ScanningAnimation from "./ScanningAnimation";
import "../styles/SelectedImageDisplay.css";

const SelectedImageDisplay = ({ selectedImage, scanningAnimation }) => {
  return (
    <div className="selected-image-display">
      {scanningAnimation && <ScanningAnimation />}

      <img
        src={URL.createObjectURL(selectedImage)}
        alt="Selected Image"
        className="image-preview"
        />

    </div>
  );
};

export default SelectedImageDisplay;
