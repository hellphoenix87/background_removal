import React, { useEffect } from "react";
import axios from "axios";
import "../styles/ImageUpload.css";



const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "multipart/form-data",
  },
});


const ImageUpload = ({ selectedImage, onImageProcess, setScanningAnimation }) => {


    const handleImageProcess = async () => {
      setScanningAnimation(true);
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await http.post("uploads/", formData);
        onImageProcess(response.data.result);
      } catch (error) {
        console.log("Error processing image: ", error);
      }
  };
  useEffect(() => {
    handleImageProcess();
  }, []);
}
export default ImageUpload;
