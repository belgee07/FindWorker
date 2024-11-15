"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
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

export const WorkerData = () => {
  const { toast } = useToast();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessUrl, setAccessUrl] = useState("");
  const workerID = useParams();

  const [inputValue, setInputValue] = useState({
    userName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    categoryName: "",
    jobName: "",
    bio: "",
    experience: "",
    language: "",
    salary_range: "",
  });
  const [textAreaValue, setTextAreaValue] = useState({
    experience: "",
    bio: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getJobs = async () => {
    const { data } = await axios.get("http://localhost:8000/api/jobs/getJobs");
    setJobs(data);
  };
  const getCategories = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/categories/allCategory"
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
      return accessUrl;
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
  const handleLanguageChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, language: value }));
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
      userName,
      age,
      gender,
      email,
      phoneNumber,
      address,
      categoryName,
      jobName,
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
      !categoryName ||
      !jobName ||
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
      const asd = await uploadImage();
      console.log(asd);

      const response = await axios.put(
        `http://localhost:8000/api/workers/editworker/67340e6e1b0a2b92eb4031bf`,
        {
          profile_picture: accessUrl,
          userName: userName,
          age,
          gender,
          email,
          phoneNumber,
          address,
          categoryName,
          jobName,
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

      setInputValue({
        userName: "",
        age: "",
        gender: "",
        email: "",
        phoneNumber: "",
        address: "",
        categoryName: "",
        jobName: "",
        bio: "",
        experience: "",
        language: "",
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <Label htmlFor="Профайл зураг оруулах">Профайл зураг оруулах</Label>
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
          <div>
            <Label htmlFor="Мэргэжил сонгох">Мэргэжил сонгох</Label>
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
