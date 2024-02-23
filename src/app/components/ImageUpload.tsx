"use client";
import React, { useState } from "react";
import { generateCaptions } from "../services/ImageCaption";

interface ImageFile {
  name: string;
  size: number;
  type: string;
}

const ImageUpload: React.FC = () => {
  const [base64Image, setBase64Image] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPredictions([]);
    //@ts-ignore
    if (event.target.files[0]) {
      //@ts-ignore
      await handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (file: Blob) => {
    if (!file) {
      return;
    }
    setIsGenerating(true);

    const reader = new FileReader();
    reader.onload = async () => {
      //@ts-ignore
      setBase64Image(reader.result.split(",")[1]); // Skip 'data:image/png;base64,' prefix
      //@ts-ignore
      const responseFromApi = await generateCaptions(
        //@ts-ignore
        reader.result.split(",")[1]
      );
      console.log(responseFromApi);
      if (responseFromApi && responseFromApi.length > 0) {
        //@ts-ignore
        setPredictions(responseFromApi);
      }

      setIsGenerating(false);
    };
    //@ts-ignore
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload">
      <input
        className="upload-button"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      {base64Image && (
        <img
          width={400}
          height={400}
          src={`data:image/jpeg;base64,${base64Image}`}
        />
      )}
      {isGenerating && (
        <div className="loader">Please wait while we load the results...</div>
      )}
      {predictions &&
        predictions.map((text, i) => {
          // Return the element. Also pass key
          return <i key={i}>{text}</i>;
        })}
    </div>
  );
};

export default ImageUpload;
