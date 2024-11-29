"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileUpload from "./ProfileUpload";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

export type CategoryTypes = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};
export type JobTypes = {
  _id: string;
  categoryId: string;
  jobName: string;
  description: string;
};
export type WorkerModelType = {
  address: string;
  age: number;
  authId: string;
  bio: string;
  username: string;
  profile_picture: string;
  categoryName: string;
  education: string;
  jobName: string;
  language: string;
  experience: string;
  email: string;
  phoneNumber: string;
  salary_range: number;
  createdAt: Date;
  category?: CategoryTypes[];
  job?: JobTypes[];
};
type Job = { jobName: string };
type Category = { categoryName: string };

const getPresignedURL = async () => {
  const { data } = await axios.get("/api/upload");
  return data as { uploadUrl: string; accessUrls: string };
};
const languages = [
  { lang: "Eng", label: "Англи" },
  { lang: "Fr", label: "Франц" },
  { lang: "Cn", label: "Хятад" },
  { lang: "Jp", label: "Япон" },
  { lang: "Ru", label: "Орос" },
  { lang: "De", label: "Герман" },
];

const EditWorkerData = () => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<WorkerModelType>({
    username: "",
    profile_picture: "",
    education: "",
    categoryName: "",
    jobName: "",
    language: "",
    bio: "",
    experience: "",
    email: "",
    phoneNumber: "",
    address: "",
    salary_range: 0,
    createdAt: new Date(),
    authId: "",
    age: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user } = useUser();
  const { toast } = useToast();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/workerDetails/${user?.id}`
      );
      const { data } = response;
      setEditedData({
        ...data,
        categoryName: data.category[0]?.categoryName || "",
        jobName: data.job[0]?.jobName || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSaveClicks = async () => {
    try {
      toast({ title: "Saving changes...", description: "Saving please wait" });
      const profilePictureUrl = await uploadImage();

      const updatedData = { ...editedData, profile_picture: profilePictureUrl };
      console.log(updatedData, "updatedDataupdatedDataupdatedData");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/editWorker/${user?.id}`,
        updatedData
      );

      if (response.status === 200) {
        toast({ title: "Changes saved successfully!" });
        fetchUserData();
        return response;
      } else {
        toast({ title: "Failed to save changes." });
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({ title: "An error occurred while saving changes." });
      return null;
    }
  };

  const fetchOptions = async () => {
    try {
      const [jobsRes, categoriesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/getJobs`),
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/allCategory`
        ),
      ]);

      setJobs(jobsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchOptions();
  }, []);

  const uploadImage = async () => {
    if (!image) return editedData.profile_picture;

    try {
      const { uploadUrl, accessUrls } = await axios
        .get("/api/upload")
        .then((res) => res.data);

      await axios.put(uploadUrl, image, {
        headers: { "Content-Type": image.type },
      });

      setImageURL(accessUrls);
      return accessUrls; // Return the uploaded URL
    } catch (error) {
      console.error("Image upload failed:", error);
      return editedData.profile_picture; // Fallback to existing picture
    }
  };

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

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
  useEffect(() => {
    const fetchUser = async () => {
      const response: AxiosResponse<WorkerModelType> = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workers/workerDetails/${user?.id}`
      );

      const { data } = response;

      setEditedData({
        ...data,
        categoryName: data.category?.[0]?.categoryName || "",
        jobName: data.job?.[0]?.jobName || "",
      });
    };

    fetchUser();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="  w-[1200px] mt-6 border rounded-sm border-inherit">
        <div className="flex flex-row   mt-5 ml-5">
          <div>
            {profilePicture && (
              <ProfileUpload
                setImage={setImage}
                setImageURL={setImageURL}
                imageURL={imageURL}
                accessUrl={imageURL}
                onImageChange={uploadImage}
              />
            )}
          </div>
          <div className="ml-60 flex flex-col">
            <label htmlFor="language" className="font-semibold text-sm">
              Хэрэглэгчийн нэр
            </label>
            {editingItem === "username" ? (
              <Input
                className=""
                name="username"
                defaultValue={editedData.username}
                onChange={handleChange}
                placeholder="Enter user name"
                onBlur={() => setEditingItem(null)}
              />
            ) : (
              <h1
                onClick={() => setEditingItem("username")}
                className="cursor-pointer hover:text-blue-500"
              >
                {editedData.username || "Click to edit user name"}
              </h1>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-[100px] mt-10 justify-center">
          <div className="flex flex-col gap-6 ">
            <div className="">
              <label htmlFor="education" className="font-semibold text-sm">
                Боловсрол
              </label>
              {editingItem === "education" ? (
                <Input
                  className="w-[400px] h-[40px] cursor-pointer hover:text-blue-500"
                  name="education"
                  defaultValue={editedData.education}
                  onChange={handleChange}
                  placeholder="Enter your education"
                  onBlur={() => setEditingItem(null)}
                />
              ) : (
                <h1
                  onClick={() => setEditingItem("education")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  {editedData.education || "Click to edit education"}
                </h1>
              )}
            </div>
            <div className="">
              <label htmlFor="salary_range" className="font-semibold text-sm">
                Цалингийн хэмжээ
              </label>
              {editingItem === "salary_range" ? (
                <Input
                  className="w-[400px] h-[40px] cursor-pointer hover:text-blue-500"
                  name="salary_range"
                  defaultValue={editedData.salary_range}
                  onChange={handleChange}
                  placeholder="Enter your salary_range"
                  onBlur={() => setEditingItem(null)}
                />
              ) : (
                <h1 onClick={() => setEditingItem("salary_range")}>
                  {editedData.salary_range || "Click to salary_range"}
                </h1>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="language" className="font-semibold text-sm">
                Гадаад хэл
              </label>
              <select
                id="language"
                name="language"
                defaultValue={editedData.language}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 cursor-pointer hover:text-blue-500"
              >
                {languages.map((language, i) => (
                  <option key={i} value={language.lang}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label htmlFor="language" className="font-semibold text-sm">
                Нас
              </label>
              {editingItem === "age" ? (
                <Input
                  className="w-[400px] h-[40px] cursor-pointer hover:text-blue-500"
                  name="age"
                  defaultValue={editedData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  onBlur={() => setEditingItem(null)}
                />
              ) : (
                <h1 onClick={() => setEditingItem("age")}>
                  {editedData.age || "Click to edit age"}
                </h1>
              )}
            </div>
            <div className="">
              <label htmlFor="language" className="font-semibold text-sm">
                Утасны дугаар
              </label>
              {editingItem === "phoneNumber" ? (
                <Input
                  className="w-[400px] h-[40px] cursor-pointer hover:text-blue-500"
                  name="phoneNumber"
                  defaultValue={editedData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  onBlur={() => setEditingItem(null)}
                />
              ) : (
                <h1 onClick={() => setEditingItem("phoneNumber")}>
                  {editedData.phoneNumber || "Click to edit phoneNumber"}
                </h1>
              )}
            </div>
            <div className="">
              <label htmlFor="language" className="font-semibold text-sm">
                Хаяг
              </label>
              {editingItem === "address" ? (
                <Input
                  className="w-[400px] h-[40px] cursor-pointer hover:text-blue-500"
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
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="language" className="font-semibold text-sm">
                Ангилал
              </label>
              <label htmlFor="category" className="font-semibold"></label>
              <select
                id="category"
                name="categoryName"
                defaultValue={editedData.categoryName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              >
                {categories?.map((category, i) => (
                  <option key={i} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="jobName" className="font-semibold text-sm">
                Мэргэжил
              </label>
              <select
                id="jobName"
                name="jobName"
                defaultValue={editedData.jobName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              >
                {jobs.map((job, i) => (
                  <option key={i} value={job.jobName}>
                    {job.jobName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[450px] h-[150px] flex flex-col ">
              <label htmlFor="language" className="font-semibold text-sm">
                Танилцуулга
              </label>
              {editingItem === "bio" ? (
                <Textarea
                  className="cursor-pointer hover:text-blue-500"
                  name="bio"
                  placeholder="Write your bio here..."
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
            <div className="">
              <label className="text-sm font-bold" htmlFor="">
                Ажлын туршлага, ур чадвар
              </label>
              {editingItem === "experience" ? (
                <Textarea
                  name="experience"
                  placeholder="Write your experience here..."
                  className="w-[400px] h-[80px] cursor-pointer hover:text-blue-500"
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
            <Button className="w-40 mb-6 " onClick={handleSaveClicks}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkerData;
