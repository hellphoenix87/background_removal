import React, { useEffect, useState } from "react";
import { getImageFromServer } from "../services/ImageService";

const ImageReceiver = () => {
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    // Make the API request to get the processed image from the server
    getImageFromServer()
      .then((response) => {
        // Assuming the server responds with the processed image data
        const processedImage = response.data;

        // Store the processed image data in the state
        setProcessedImage(processedImage);
      })
      .catch((error) => {
        console.error("Error fetching processed image:", error);
      });
  }, []);

  return (
    <div className="image-receiver-container">
      {/* Render any UI components to display the processed image */}
      {processedImage && (
        <img
          src={`data:image/png;base64, ${processedImage}`}
          alt="Processed Image"
        />
      )}
    </div>
  );
};

export default ImageReceiver;
