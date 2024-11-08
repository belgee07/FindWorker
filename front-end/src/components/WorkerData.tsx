"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import UploadImage from "./UploadImage";
import { Textarea } from "@/components/ui/textarea";
import { RxAvatar } from "react-icons/rx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const WorkerData = () => {
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [images, setImages] = useState<(string | null)[]>([null]);

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
      <div className="flex flex-col gap-5 ml-[300px] ">
        <div className="flex flex-col">
          <Label htmlFor="Профайл зураг оруулах">Профайл зураг оруулах</Label>
          <div className="flex relative">
            <UploadImage
              setImagesURL={setImagesURL}
              imagesURL={imagesURL}
              images={images}
              onImageChange={onImageChange}
            />
            <RxAvatar className=" flex absolute w-[30px] h-[30px] mt-12 ml-12 " />
          </div>
        </div>

        <div className="flex flex-col  w-[400px] h-[60px]  ">
          <Label htmlFor="Хэрэглэгчийн нэр">Хэрэглэгчийн нэр</Label>
          <Input type="text" id="" placeholder="Эрдэнэ.Б" />
        </div>

        <div className="flex flex-col  w-[180px] h-[60px] ">
          <Label htmlFor="Овог">Нас</Label>

          <Input type="text" id="Нас" placeholder="Нас" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Хүйс" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Хүйс</SelectLabel>
              <SelectItem value="эрэгтэй">Эрэгтэй</SelectItem>
              <SelectItem value="эмэгтэй">Эмэгтэй</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Ажлын салбар сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="боловсрол">Боловсрол</SelectItem>
              <SelectItem value="гэр ахуй">Гэр ахуй</SelectItem>
              <SelectItem value="дизайн">Дизайн</SelectItem>
              <SelectItem value="урлаг">Урлаг</SelectItem>
              <SelectItem value="гоо сайхан">Гоо сайхан</SelectItem>
              <SelectItem value="орчуулга">Орчуулга</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col  w-[400px] h-[60px]  ">
          <Label htmlFor="Мэргэжил">Мэргэжил</Label>
          <Input type="text" id="" placeholder="Интерьер дизайнер " />
        </div>
        <div>
          <Label htmlFor="Танилцуулга">Танилцуулга</Label>
          <Textarea placeholder="Энд бичнэ үү " className="w-[400px]" />
        </div>
        <div>
          <Label htmlFor="Ажлын туршлага">Ажлын туршлага</Label>
          <Textarea placeholder="Энд бичнэ үү " className="w-[400px]" />
        </div>
        <div className="flex flex-col  w-[400px] h-[60px]  ">
          <Label htmlFor="И-мэйл хаяг">И-мэйл хаяг</Label>
          <Input type="text" id="" placeholder="findwork@gmail.com" />
        </div>
        <div className="flex flex-col  w-[180px] h-[60px] ">
          <Label htmlFor="Утасны дугаар">Утасны дугаар</Label>

          <Input type="text" id="Утасны дугаар" placeholder="99880909" />
        </div>
        <div className="flex flex-col  w-[400px] h-[60px]  ">
          <Label htmlFor="Хаяг">Хаяг</Label>
          <Input
            type="text"
            id=""
            placeholder="Улаанбаатар хот Сүхбаатар дүүрэг 5-р хороо 36-105"
          />
        </div>
      </div>
    </div>
  );
};
