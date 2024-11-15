"use client";
import { useState, ChangeEvent } from "react";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming a Button component exists
import ProfileUpload from "./ProfileUpload";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type WorkerModelType = {
  userName: string;
  profile_picture: string;
  categoryName: string;
  jobName: string;
  language: string;
  bio: string;
  experience: string;
  email: string;
  phoneNumber: string;
  address: string;
  salary_range: number;
};

const categories = [
  "Боловсрол",
  "Дизайн ба Урлаг",
  "Барилга Интерьер",
  "IT Engineer",
  "Гэр ахуй",
  "Орчуулга",
  "Гоо сайхан",
];
const jobNames = [
  "Архитектор",
  "Интерьер дизайнер",
  "Барилгын дотоод засварчин",
  "График дизайнер",
  "Гэрэл зурагчин",
  "Video Editor",
  "Математикийн багш",
  "Төгөлдөр хуурын багш",
  "Гадаад хэлний багш",
  "Орчуулагч",
  "Цахилгаанчин",
  "Сантехникч",
  "Хүүхэд асрагч",
  "Цэвэрлэгээ",
  "Make up artist",
  "Manicure Pedicure",
];
const languages = [
  "Англи хэл",
  "Япон хэл",
  "Хятад хэл",
  "Франц хэл",
  "Орос хэл",
  "Герман хэл",
];

const EditWorkerData = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [accessUrl, setAccessUrl] = useState("");

  const { user } = useUser();
  const getPresignedURL = async () => {
    const { data } = await axios.get("/api/upload");
    return data as { uploadUrl: string; accessUrls: string };
  };
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<WorkerModelType>({
    userName: "Bat.G",
    profile_picture: "",
    categoryName: categories[0],
    jobName: jobNames[0],
    language: "Англи хэл",
    bio: "As a software engineer with over nine years of experience, I specialize in backend development, focusing on Ruby on Rails, Spring Boot and NestJS. Throughout my career, I’ve been involved in various projects, bringing technical depth and problem-solving skills to each team I work with.",
    experience: "5jiliin ajliin turshlagatai",
    email: "bat@gmail.com",
    phoneNumber: "99119911",
    address: "UB, Mongolia",
    salary_range: 0,

    // categoryName: "IT Enginner",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

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

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col  gap-4 w-[1200px] h-[600px] border rounded-sm border-inherit">
        <div className="flex flex-row mt-5 ml-5">
          <div>
            {profilePicture && (
              <ProfileUpload
                setImage={setImage}
                setImageURL={setImageURL}
                imageURL={imageURL}
                accessUrl={accessUrl}
                onImageChange={uploadImage}
              />
            )}
          </div>
          <div className="ml-60">
            {editingItem === "userName" ? (
              <Input
                className=""
                name="userName"
                defaultValue={editedData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                onBlur={() => setEditingItem(null)}
              />
            ) : (
              <h1 onClick={() => setEditingItem("userName")}>
                {editedData.userName || "Click to edit user name"}
              </h1>
            )}
          </div>
        </div>
        <div className="">
          <label htmlFor="category" className="font-semibold"></label>
          <select
            id="category"
            name="categoryName"
            defaultValue={editedData.categoryName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="jobName" className="font-semibold"></label>
          <select
            id="jobName"
            name="jobName"
            defaultValue={editedData.jobName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            {jobNames.map((jobName) => (
              <option key={jobName} value={jobName}>
                {jobName}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="language" className="font-semibold"></label>
          <select
            id="language"
            name="language"
            defaultValue={editedData.language}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[450px] h-[200px] flex ml-8">
          {editingItem === "bio" ? (
            <Textarea
              name="bio"
              placeholder="Write your bio here..."
              className="w-[400px] h-[200px] "
              value={editedData.bio}
              onChange={handleChange}
              onBlur={() => setEditingItem(null)}
            />
          ) : (
            <div onClick={() => setEditingItem("bio")}>
              {editedData.bio || "Click to edit bio"}
            </div>
          )}
        </div>
        <div className="ml-8">
          <label className="text-sm font-bold" htmlFor="">
            Ажлын туршлага, ур чадвар
          </label>
          {editingItem === "experience" ? (
            <Textarea
              name="experience"
              placeholder="Write your experience here..."
              className="w-[400px] h-[80px]"
              defaultValue={editedData.experience}
              onChange={handleChange}
              onBlur={() => setEditingItem(null)}
            />
          ) : (
            <div onClick={() => setEditingItem("experience")}>
              {editedData.experience || "Click to edit experience"}
            </div>
          )}
        </div>
        <div className="ml-8">
          {editingItem === "email" ? (
            <Input
              className="w-[400px] h-[40px]"
              name="email"
              defaultValue={editedData.email}
              onChange={handleChange}
              placeholder="Enter email"
              onBlur={() => setEditingItem(null)}
            />
          ) : (
            <h1 onClick={() => setEditingItem("email")}>
              {editedData.email || "Click to edit email"}
            </h1>
          )}
        </div>
        <div className="ml-8">
          {editingItem === "phoneNumber" ? (
            <Input
              className="w-[400px] h-[40px]"
              name="phoneNumber"
              defaultValue={editedData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              onBlur={() => setEditingItem(null)}
            />
          ) : (
            <h1 onClick={() => setEditingItem("email")}>
              {editedData.phoneNumber || "Click to edit email"}
            </h1>
          )}
        </div>
        <div className="ml-8">
          {editingItem === "address" ? (
            <Input
              className="w-[400px] h-[40px]"
              name="address"
              defaultValue={editedData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              onBlur={() => setEditingItem(null)}
            />
          ) : (
            <h1 onClick={() => setEditingItem("address")}>
              {editedData.address || "Click to edit address"}
            </h1>
          )}
        </div>
        <Button
          className="w-40"
          onClick={() => console.log("Edited data:", editedData)}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditWorkerData;
