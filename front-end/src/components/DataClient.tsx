"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProfileUpload from "./ProfileUpload";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const getPresignedURL = async () => {
  const { data } = await axios.get("/api/upload");
  return data as { uploadUrl: string; accessUrls: string };
};

export const DataClient = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [accessUrl, setAccessUrl] = useState("");
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { toast } = useToast();

  const [inputValue, setInputValue] = useState({
    username: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (isSignedIn === false) {
      toast({ title: "Please log in", description: "Redirecting to login..." });
      router.push("/sign-in");
    }
  }, [isSignedIn, router, toast]);

  const uploadImage = async () => {
    if (!image) return null;

    try {
      const img = image as File;
      const { uploadUrl, accessUrls } = await getPresignedURL();

      await axios.put(uploadUrl, img, {
        headers: {
          "Content-Type": img.type,
        },
      });
      setAccessUrl(accessUrls);
      return accessUrls;
    } catch (error) {
      toast({ title: "Image upload failed", description: String(error) });
      return null;
    }
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const addData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { username, phoneNumber, address } = inputValue;

    if (!username || !phoneNumber || !address) {
      toast({
        title: "All fields are required",
        description: "Please fill out all fields.",
      });
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage();

      // if (!uploadedImageUrl) {
      //   toast({
      //     title: "Image is required",
      //     description: "Please upload an image.",
      //   });
      //   return;
      // }

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/updatedClient/${user?.id}`,
        {
          profile_picture: uploadedImageUrl,
          username,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setInputValue({ username: "", phoneNumber: "", address: "" });
      toast({
        title: "Data saved successfully",
        description: "User data has been updated.",
      });
      // Redirect to homepage
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast({
        title: "Data save failed",
        description: String(error),
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 py-20">
      <div>
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="profile-upload">1.Профайл зураг оруулах</Label>
          <ProfileUpload
            setImage={setImage}
            setImageURL={setImageURL}
            imageURL={imageURL}
            accessUrl={accessUrl}
            onImageChange={uploadImage}
          />
        </div>
        <div className="flex flex-col gap-2 w-full mb-4">
          <Label htmlFor="username">2.Хэрэглэгчийн нэр</Label>
          <Input
            type="text"
            id="username"
            placeholder="Эрдэнэ.Б"
            name="username"
            value={inputValue.username}
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col gap-2 w-full mb-4">
          <Label htmlFor="phoneNumber">3.Утасны дугаар</Label>
          <Input
            type="text"
            id="phoneNumber"
            placeholder="99880909"
            name="phoneNumber"
            value={inputValue.phoneNumber}
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col gap-2 w-full mb-4">
          <Label htmlFor="address">4.Хаяг</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={inputValue.address}
            onChange={inputHandler}
            placeholder="Улаанбаатар хот Сүхбаатар дүүрэг 5-р хороо 36-105"
          />
        </div>
        <Button onClick={addData} className="mt-4">
          Save
        </Button>
      </div>
    </div>
  );
};
