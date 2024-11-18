import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { VscAdd } from "react-icons/vsc";

type UploadImageProps = {
  imageURL: string | null;
  setImageURL: (url: string | null) => void;
  accessUrl: string | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  onImageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ProfileUpload = ({
  imageURL,
  setImage,
  accessUrl,
  onImageChange,
}: // curretImage
UploadImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreivewImage] = useState<File>();

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPreivewImage(file);
    if (!file) return;
    setUploading(true);
    try {
      setImage(file);
    } catch (error) {
      console.log("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  // const imageUrl = curretImage && !updatedImage ? curretImage : updatedImage

  return (
    <div className="flex flex-col items-center">
      <label className="relative flex items-center justify-center w-[150px] h-[150px] border border-gray-300 rounded-lg overflow-hidden cursor-pointer">
        {!previewImage ? (
          <VscAdd className=" flex absolute w-[25px] h-[25px]  " />
        ) : (
          <img
            src={URL.createObjectURL(previewImage as File)}
            className="object-cover"
          />
        )}

        <Input
          type="file"
          className="hidden inset-0 opacity-0 cursor-pointer"
          onChange={handleImageUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default ProfileUpload;
