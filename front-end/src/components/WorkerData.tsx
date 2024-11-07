"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import UploadImage from "./UploadImage";
export const WorkerData = () => {
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const onImageChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setUploadImages((prev) => [...prev, file]);

        const newImages = [...images];
        newImages[index] = URL.createObjectURL(event.target.files[0]);
        setImages(newImages);
      }
    };
  return (
    <div className="flex flex-col mt-8 ml-8 ">
      <div>
        <UploadImage
          setImagesURL={setImagesURL}
          imagesURL={imagesURL}
          images={images}
          onImageChange={onImageChange}
        />
      </div>
      <div className="flex flex-col w-[400px] h-[60px] ">
        <Label htmlFor="Нэр">Нэр</Label>

        <Input type="text" id="" placeholder="Нэр" />
      </div>
    </div>
  );
};
