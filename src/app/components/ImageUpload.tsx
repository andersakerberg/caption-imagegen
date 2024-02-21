"use client";
import React, { useState } from "react";
import { CaptionGenerator } from "../services/ImageCaption";

const capGen = new CaptionGenerator();

interface ImageFile {
  name: string;
  size: number;
  type: string;
}

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [base64Image, setBase64Image] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPredictions([]);
    //@ts-ignore
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setIsGenerating(true);

    const reader = new FileReader();
    reader.onload = async () => {
      //@ts-ignore
      setBase64Image(reader.result.split(",")[1]); // Skip 'data:image/png;base64,' prefix
      //@ts-ignore
      console.log(reader.result.split(",")[1]);
      //@ts-ignore
      const responseFromApi = await capGen.generateCaptions(
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
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Image</button>

      {base64Image && <p>Base64 image: {base64Image.slice(0, 50)}</p>}
      {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} />}
      {isGenerating && (
        <div className="loader">Please wait while we load the resulsts...</div>
      )}
      {predictions &&
        predictions.map((text, i) => {
          console.log(text);
          // Return the element. Also pass key
          return <p key={i}>{text}</p>;
        })}
    </div>
  );
};

export default ImageUpload;
