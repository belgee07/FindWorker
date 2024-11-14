"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import UploadImage from "./UploadImage";
import { Textarea } from "@/components/ui/textarea";
import { VscAdd } from "react-icons/vsc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export const WorkerData = () => {
  const { toast } = useToast();
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [images, setImages] = useState<(string | null)[]>([null]);

  const [inputValue, setInputValue] = useState({
    userName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    category: "",
    jobId: "",
    bio: "",
    experience: "",
    language: "",
    salary_range: "",
  });
  const [textAreaValue, setTextAreaValue] = useState({
    experience: "",
    bio: "",
  });
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
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, category: value }));
  };
  const handleGenderChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, gender: value }));
  };
  const handleJobIdChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, profession: value }));
  };
  const handleLanguageChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, language: value }));
  };
  const textAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setTextAreaValue((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(inputValue);
  // console.log(textAreaValue);

  const addData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const {
      userName,
      age,
      gender,
      email,
      phoneNumber,
      address,
      category,
      jobId,
      language,
      salary_range,
    } = inputValue;
    const { experience, bio } = textAreaValue;

    if (
      !userName ||
      !age ||
      !gender ||
      !email ||
      !phoneNumber ||
      !address ||
      !category ||
      !jobId ||
      !language ||
      !salary_range ||
      !experience ||
      !bio
    ) {
      toast({
        title: "All fields are required",
        description: "error here",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/worker`,
        {
          profile_picture: imagesURL,
          userName: userName,
          age,
          gender,
          email,
          phoneNumber,
          address,
          category,
          jobId,
          language,
          salary_range,
          experience,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setImagesURL([]);
      setUploadImages([]);
      setImages([null]);
      setInputValue({
        userName: "",
        age: "",
        gender: "",
        email: "",
        phoneNumber: "",
        address: "",
        category: "",
        jobId: "",
        bio: "",
        experience: "",
        language: "",
        salary_range: "",
      });
      toast({
        title: "Хэрэглэгчийн мэдээлэл амжилттай бүртгэгдлээ",
        description: "success",
      });
      console.log("Хэрэглэгчийн мэдээлэл амжилттай бүртгэгдлээ", category);
    } catch (error) {
      console.error("Хэрэглэгчийн бүртгэлд алдаа гарлаа");
      toast({ title: "Бүртгэл амжилтгүй", description: "error" });
    }
  };

  return (
    <div className="flex flex-col mt-16 mb-16 justify-center items-center">
      <div className="flex flex-row gap-[100px]  ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <Label htmlFor="Профайл зураг оруулах">Профайл зураг оруулах</Label>
            <div className="flex relative">
              <UploadImage
                setImagesURL={setImagesURL}
                imagesURL={imagesURL}
                images={images}
                onImageChange={onImageChange}
              />
              {images[0] === null ? (
                <VscAdd className=" flex absolute w-[25px] h-[25px] mt-16 ml-12 " />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex flex-col  w-[400px] h-[60px]  ">
            <Label htmlFor="Хэрэглэгчийн нэр">Хэрэглэгчийн нэр</Label>
            <Input
              type="text"
              id=""
              placeholder="Эрдэнэ.Б"
              name="userName"
              value={inputValue.userName}
              onChange={inputHandler}
            />
          </div>

          <div className="flex flex-col  w-[180px] h-[60px] ">
            <Label htmlFor="Овог">Нас</Label>
            <Input
              type="text"
              id="Нас"
              placeholder="Нас"
              name="age"
              value={inputValue.age}
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col"></div>
          <Select
            name="gender"
            value={inputValue.gender}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Хүйс" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Хүйс</SelectLabel>
                <SelectItem value="эрэгтэй">Эрэгтэй</SelectItem>
                <SelectItem value="Эмэгтэй">Эмэгтэй</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col  w-[400px] h-[60px]  ">
            <Label htmlFor="И-мэйл хаяг">И-мэйл хаяг</Label>
            <Input
              type="text"
              id=""
              placeholder="findwork@gmail.com"
              name="email"
              value={inputValue.email}
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col  w-[180px] h-[60px] ">
            <Label htmlFor="Утасны дугаар">Утасны дугаар</Label>
            <Input
              type="text"
              id="Утасны дугаар"
              placeholder="99880909"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col  w-[400px] h-[60px]  ">
            <Label htmlFor="Хаяг">Хаяг</Label>
            <Input
              type="text"
              id=""
              name="address"
              value={inputValue.address}
              onChange={inputHandler}
              placeholder="Улаанбаатар хот Сүхбаатар дүүрэг 5-р хороо 36-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <Label htmlFor="Ажлын салбар сонгох">Ажлын салбар сонгох</Label>
            <Select
              onValueChange={handleCategoryChange}
              name="category"
              value={inputValue.category}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
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
          </div>
          <div>
            <Label htmlFor="Мэргэжил сонгох">Мэргэжил сонгох</Label>
            <Select
              onValueChange={handleJobIdChange}
              name="jobId"
              value={inputValue.jobId}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="гэрэл зурагчин">Гэрэл зурагчин</SelectItem>
                  <SelectItem value="Software Enginner">
                    Software Enginner{" "}
                  </SelectItem>
                  <SelectItem value="График дизайнер">
                    График дизайнер
                  </SelectItem>
                  <SelectItem value="Интерьер дизайнер">
                    Интерьер дизайнер
                  </SelectItem>
                  <SelectItem value="UX UI designer">UX UI designer</SelectItem>
                  <SelectItem value="Орчуулагч">Орчуулагч</SelectItem>
                  <SelectItem value="гэрэл зурагчин">Make up artist</SelectItem>
                  <SelectItem value="Make up artis">
                    Математикийн багш
                  </SelectItem>
                  <SelectItem value="Төгөлдөр хуурын багш">
                    Төгөлдөр хуурын багш
                  </SelectItem>
                  <SelectItem value="Гадаад хэлний багш">
                    Гадаад хэлний багш
                  </SelectItem>
                  <SelectItem value="Manicure Pedicure">
                    Manicure Pedicure
                  </SelectItem>
                  <SelectItem value="Цахилгаанчин">Цахилгаанчин</SelectItem>
                  <SelectItem value="Мужаан">Мужаан</SelectItem>
                  <SelectItem value="Сантехникч">Сантехникч</SelectItem>
                  <SelectItem value="Хүүхэд асрагч">Хүүхэд асрагч</SelectItem>
                  <SelectItem value="Цэвэрлэгээ">Цэвэрлэгээ</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="Гадаад хэл">Гадаад хэл</Label>
            <Select
              onValueChange={handleLanguageChange}
              name="language"
              value={inputValue.language}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Англи хэл">Англи хэл</SelectItem>
                  <SelectItem value="Франц хэл">Франц хэл</SelectItem>
                  <SelectItem value="Орос хэл">Орос хэл</SelectItem>
                  <SelectItem value="Япон хэл">Япон хэл</SelectItem>
                  <SelectItem value="Герман хэл">Герман хэл</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="Танилцуулга">Танилцуулга</Label>
            <Textarea
              name="bio"
              placeholder="Энд бичнэ үү"
              className="w-[400px] h-[80px]"
              value={textAreaValue.bio}
              onChange={textAreaHandler}
            />
          </div>
          <div>
            <Label htmlFor="Ажлын туршлага">Ажлын туршлага, Ур чадвар</Label>
            <Textarea
              name="experience"
              placeholder="Энд бичнэ үү"
              className="w-[400px] h-[80px]"
              value={textAreaValue.experience}
              onChange={textAreaHandler}
            />
          </div>
          <div className="flex flex-col  w-[180px] h-[60px] ">
            <Label htmlFor="ажлын үнэлгээ">Ажлын хөлс</Label>
            <Input
              type="text"
              placeholder="₮"
              name="salary_range"
              value={inputValue.salary_range}
              onChange={inputHandler}
            />
          </div>
          <Button onClick={addData} className="mt-[20px]">
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};
