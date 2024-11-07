"use client";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="flex flex-col w-[563px] h-[213px] rounded-xl bg-[white] mt-6 ">
      <h1 className="flex text-lg font-semibold mt-6 ml-6 ">
        Бүтээгдэхүүний зураг
      </h1>
      <div className="flex flex-row  ml-6 gap-2">
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
                <div className="border relative rounded-xl h-[125px] flex items-center justify-center w-[125px] border-[#D6D8DB] border-dashed mt-4">
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
        <Button
          // onClick={handleImageUpload}
          className="w-[125px] h-[125px]  mt-4"
        >
          {/* <img
            // src="/Chip.png"
            alt=""
            className=" w-[32px] h-[32px] flex items-center justify-center ml-[44.5px] "
          /> */}
        </Button>
      </div>
    </div>
  );
};
export default UploadImage;
