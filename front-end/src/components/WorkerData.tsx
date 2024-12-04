"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";

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
import ProfileUpload from "./ProfileUpload";
import { useUser } from "@clerk/nextjs";

type Job = {
  jobName: string;
};
type Category = {
  categoryName: string;
};
const getPresignedURL = async () => {
  const { data } = await axios.get("/api/upload");
  return data as { uploadUrl: string; accessUrls: string };
};
console.log(process.env.BACKEND_URL || "hi", "Shitass");

export const WorkerData = () => {
  const { toast } = useToast();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessUrl, setAccessUrl] = useState("");
  const { user } = useUser();

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const languages = [
    "Англи хэл",
    "Франц хэл",
    "Орос хэл",
    "Япон хэл",
    "Герман хэл",
  ];

  const toggleLanguageItem = (value: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const [inputValue, setInputValue] = useState({
    username: "",
    age: "",
    gender: "",
    phoneNumber: "",
    address: "",
    categoryName: "",
    jobName: "",
    education: "",
    bio: "",
    selectedLanguages: [""],
    experience: "",
    salary_range: "",
  });

  const [textAreaValue, setTextAreaValue] = useState({
    experience: "",
    bio: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getJobs = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/getJobs`
    );
    setJobs(data);
  };
  const getCategories = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/allCategory`
    );
    setCategories(data);
  };

  useEffect(() => {
    getJobs();
    getCategories();
  }, []);

  const uploadImage = async () => {
    if (image) {
      const img = image as File;
      const { uploadUrl, accessUrls } = await getPresignedURL();

      await axios.put(uploadUrl, img, {
        headers: {
          "Content-Type": img.type,
        },
      });
      setAccessUrl(accessUrls);
      return accessUrls;
    }
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, categoryName: value }));
  };
  const handleGenderChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, gender: value }));
  };
  const handleJobChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, jobName: value }));
  };
  const textAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTextAreaValue((prev) => ({ ...prev, [name]: value }));
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const addData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const {
      username,
      age,
      gender,
      phoneNumber,
      address,
      categoryName,
      jobName,
      education,
      selectedLanguages,
      salary_range,
    } = inputValue;
    const { experience, bio } = textAreaValue;
    console.log(
      !username ||
        !age ||
        !gender ||
        !phoneNumber ||
        !address ||
        !categoryName ||
        !jobName ||
        !education ||
        !selectedLanguages.length ||
        !salary_range ||
        !experience ||
        !bio
    );
    console.log(inputValue);

    if (
      !username ||
      !age ||
      !gender ||
      !phoneNumber ||
      !address ||
      !categoryName ||
      !jobName ||
      !education ||
      !selectedLanguages.length ||
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
      const accessUrl = await uploadImage();

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/editworker/${user?.id}`,
        {
          profile_picture: accessUrl,
          username: username,
          age,
          gender,

          phoneNumber,
          address,
          categoryName,
          jobName,
          education,
          languages: selectedLanguages,
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

      setInputValue({
        username: "",
        age: "",
        gender: "",
        selectedLanguages: [""],
        phoneNumber: "",
        address: "",
        categoryName: "",
        jobName: "",
        education: "",
        bio: "",
        experience: "",
        salary_range: "",
      });
      toast({
        title: "Хэрэглэгчийн мэдээлэл амжилттай бүртгэгдлээ",
        description: "success",
      });
      console.log("Хэрэглэгчийн мэдээлэл амжилттай бүртгэгдлээ", categoryName);
    } catch (error) {
      toast({ title: "Бүртгэл амжилтгүй", description: "error" });
    }
  };

  return (
    <div className="flex flex-col mt-16 mb-16 justify-center items-center">
      <div className="flex flex-row gap-[100px]  ">
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-2  ">
            <Label htmlFor="Профайл зураг оруулах">
              1. Профайл зураг оруулах
            </Label>
            <div>
              <ProfileUpload
                setImage={setImage}
                setImageURL={setImageURL}
                imageURL={imageURL}
                accessUrl={accessUrl}
                onImageChange={uploadImage}
              />
            </div>
          </div>

          <div className="flex flex-col  w-[400px] h-[60px] gap-2  ">
            <Label htmlFor="Хэрэглэгчийн нэр">2. Хэрэглэгчийн нэр</Label>
            <Input
              type="text"
              id=""
              placeholder="Эрдэнэ.Б"
              name="username"
              value={inputValue.username}
              onChange={inputHandler}
            />
          </div>

          <div className="flex flex-col  w-[180px] h-[60px] gap-2 ">
            <Label htmlFor="Овог">3. Нас</Label>
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
          <Label htmlFor="Овог">4. Хүйс</Label>
          <Select
            name="gender"
            value={inputValue.gender}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className="w-[180px] gap-2">
              <SelectValue placeholder="Хүйс" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="эрэгтэй">Эрэгтэй</SelectItem>
                <SelectItem value="Эмэгтэй">Эмэгтэй</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col  w-[180px] h-[60px] gap-2 ">
            <Label htmlFor="Утасны дугаар"> 5. Утасны дугаар</Label>
            <Input
              type="text"
              id="Утасны дугаар"
              placeholder="99880909"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col  w-[400px] h-[60px] gap-2  ">
            <Label htmlFor="Хаяг"> 6. Хаяг</Label>
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
          <div className="flex flex-col  w-[400px] h-[60px] gap-2  ">
            <Label htmlFor="Боловсрол"> 8. Боловсрол</Label>
            <Input
              type="text"
              id=""
              name="education"
              value={inputValue.education}
              onChange={inputHandler}
              placeholder="Mongolian University of Science and Technology"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <Label htmlFor="Ажлын салбар сонгох"> 9. Ажлын салбар сонгох</Label>
            <Select
              onValueChange={handleCategoryChange}
              name="category"
              value={inputValue.categoryName}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category, i) => {
                    return (
                      <SelectItem key={i} value={category.categoryName}>
                        {category.categoryName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Мэргэжил сонгох"> 10. Мэргэжил сонгох</Label>
            <Select
              onValueChange={handleJobChange}
              name="jobName"
              value={inputValue.jobName}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobs.map((job, i) => {
                    return (
                      <SelectItem key={i} value={job.jobName}>
                        {job.jobName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Гадаад хэл"> 11. Гадаад хэл</Label>
            <Select
              onValueChange={toggleLanguageItem}
              name="languages"
              value={selectedLanguages[0]}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue>
                  {selectedLanguages.length > 0
                    ? selectedLanguages.join(", ") // Show selected languages
                    : "Select languages"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> 12. Гадаад хэл</SelectLabel>
                  {languages.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                      className={
                        selectedLanguages.includes(option)
                          ? "bg-gray-200 font-bold"
                          : ""
                      }
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Танилцуулга">13. Танилцуулга</Label>
            <Textarea
              name="bio"
              placeholder="Энд бичнэ үү"
              className="w-[400px] h-[80px]"
              value={textAreaValue.bio}
              onChange={textAreaHandler}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="Ажлын туршлага">
              {" "}
              14. Ажлын туршлага, Ур чадвар
            </Label>
            <Textarea
              name="experience"
              placeholder="Энд бичнэ үү"
              className="w-[400px] h-[80px]"
              value={textAreaValue.experience}
              onChange={textAreaHandler}
            />
          </div>
          <div className="flex flex-col  w-[180px] h-[60px] gap-2 ">
            <Label htmlFor="ажлын үнэлгээ"> 15. Ажлын хөлс</Label>
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
