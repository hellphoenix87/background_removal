import React from "react";
import "../styles/ScanningAnimation.css";

const ScanningAnimation = () => {
  return (
    <div className="scanning-animation">
      <div className="scanning-line"></div>
      <div className="scanning-animation__scanning-text">Scanning...</div>
    </div>
  );
};

export default ScanningAnimation;
