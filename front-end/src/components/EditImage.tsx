"use client";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type UploadImageProps = {
  imageURL: string | null;
  setImageURL: (url: string | null) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EditImage = ({ imageURL, setImageURL, onImageChange }: UploadImageProps) => {
  return (
    <div className="flex flex-col items-center">
      <label className="relative flex items-center justify-center w-[150px] h-[150px] border border-gray-300 rounded-full overflow-hidden cursor-pointer">
        {/* Display default placeholder if no image is uploaded */}
        {!imageURL && <img src="/images.png" alt="Default placeholder" />}

        {/* Display uploaded image */}
        {imageURL && (
          <Image
            src={imageURL}
            alt="Uploaded Image"
            layout="fill"
            className="object-cover"
          />
        )}

        {/* File input for uploading/editing image */}
        <Input
          type="file"
          className="hidden inset-0 opacity-0 cursor-pointer "
          onChange={onImageChange}
        />
      </label>

      {/* Remove button */}
      <Button onClick={() => setImageURL(null)} className="mt-2">
        Remove Image
      </Button>
    </div>
  );
};

export default EditImage;
