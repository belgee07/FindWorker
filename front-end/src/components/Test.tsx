"use client";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type UploadImageProps = {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
};

const Test = ({ imageUrl, setImageUrl }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload image file to server
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the image URL
      setImageUrl(data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="relative flex items-center justify-center w-[150px] h-[150px] border border-gray-300 rounded-lg overflow-hidden cursor-pointer">
        {/* Default image preview */}
        {!imageUrl && <img src="/images.png" alt="Default placeholder" />}
        
        {/* Uploaded image preview */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            layout="fill"
            className="object-cover"
          />
        )}

        {/* Hidden file input */}
        <Input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageUpload}
          disabled={uploading}
        />
      </label>

      {/* Upload status */}
      {uploading ? <p>Uploading...</p> : <Button onClick={() => setImageUrl(null)}>Remove</Button>}
    </div>
  );
};

export default Test;
