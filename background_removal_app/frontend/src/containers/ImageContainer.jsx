import React, { useState } from "react";
import ImageInput from "../components/ImageInput";
import ImageUpload from "../services/ImageUpload";
import SelectedImageDisplay from "../components/SelectedImageDisplay";
import "../styles/ImageContainer.css";

const ImageContainer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [largeImage, setLargeImage] = useState(false);
  const [scanningAnimation, setScanningAnimation] = useState(false);
  const [imageUploadProps, setImageUploadProps] = useState(false);

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const handleImageProcess = (image) => {
    setProcessedImage(image);

    const img = new Image();
    img.src = `data:image/png;base64, ${image}`;
    img.onload = () => {
      const { width, height } = img;
      if (width > 1920 && height > 1080) {
        setLargeImage(true);
      } else {
        setLargeImage(false);
      }
    };
  };

  const handleDownloadImage = () => {
    if (processedImage) {
      // Convert Base64 data to Blob
      const byteCharacters = atob(processedImage);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(byteArrays)], { type: "image/png" });
      
      // Create a download URL for the Blob object
      const downloadUrl = URL.createObjectURL(blob);
      
      // Trigger the download by creating a temporary link and programmatically clicking it
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "processed_image.png";
      link.click();
      
      // Clean up the temporary URL
      URL.revokeObjectURL(downloadUrl);
    }
  };


  const handleUploadAnotherImage = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setScanningAnimation(false);
    setImageInputKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="image-container">
      <div className="image-container-header">
        <h2>Background Removal</h2>
      </div>
      <div className="image-container-body">
        {!selectedImage && (
          <div className="image-input-container">
            <ImageInput key={imageInputKey} onImageUpload={handleImageUpload} />
          </div>
        )}
        {selectedImage && !processedImage && (
          <div className="selected-image-container">
            <SelectedImageDisplay
              selectedImage={selectedImage}
              scanningAnimation={scanningAnimation}
            />

            
              <ImageUpload
        
              selectedImage={selectedImage}
              onImageProcess={handleImageProcess}
              setScanningAnimation={setScanningAnimation}
              />
           
          </div>
        )}
        {processedImage && (
          <div className="image-preview-container">
            <img
              src={`data:image/png;base64, ${processedImage}`}
              alt="Processed Image"
              className={"image-preview" + (largeImage ? " large-image" : "")}
            />
            <div className="image-actions">
              <button className="download-button" onClick={handleDownloadImage}>
                Download Image
              </button>
              <button
                className="upload-another-button"
                onClick={handleUploadAnotherImage}
              >
                Upload Another Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
