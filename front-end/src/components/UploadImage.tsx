"use client";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


type UploadImageProps = {
  setImagesURL: Dispatch<SetStateAction<string[]>>;
  imagesURL: string[];
  images: (string | null)[];
  onImageChange: (
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage = ({
  setImagesURL,
  imagesURL,
  images,
  onImageChange,
}: UploadImageProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-[white]  ">
      <div className="flex flex-row  gap-2">
        <div className="flex gap-2">
          {/* image ee maplaj bn */}
          {images.map((image, index) => (
            <div key={index}>
              <label key={index}>
                <Input
                  type="file"
                  className="hidden"
                  onChange={onImageChange(index)}
                />
                <div className="border relative rounded-xl h-[125px] flex items-center justify-center w-[125px] border-[#D6D8DB]  mt-4">
                  <img src="/images.png" alt="" />
                  {image && (
                    <Image
                      src={image}
                      fill
                      className="absolute object-cover "
                      alt="image"
                    />
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
        {/* <Button
          // onClick={handleImageUpload}
          className="w-[100px] h-[25px]  mt-4"
        ></Button> */}
      </div>
    </div>
  );
};
export default UploadImage;
