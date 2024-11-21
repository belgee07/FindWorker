"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileUpload from "./ProfileUpload";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

export type ClientsModelType = {
  username: string;
  address: string;
  profile_picture: string;
  phoneNumber: string;
};
const getPresignedURL = async () => {
  const { data } = await axios.get("/api/upload");
  return data as { uploadUrl: string; accessUrls: string };
};
export const EditClientData = () => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<ClientsModelType>({
    username: "",
    profile_picture: "",
    phoneNumber: "",
    address: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const { toast } = useToast();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/clientDetails/${user?.id}`
      );
      const { data } = response;
      setEditedData({
        ...data,
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  const handleSaveClicks = async () => {
    try {
      toast({ title: "Saving changes...", description: "Saving please wait" });
      const profilePictureUrl = await uploadImage();

      const updatedData = { ...editedData, profile_picture: profilePictureUrl };
      console.log(updatedData, "updatedDataupdatedDataupdatedData");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/updatedClient/${user?.id}`,
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

  useEffect(() => {
    fetchUserData();
  }, [isSignedIn]);
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
      const response: AxiosResponse<ClientsModelType> = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/clientDetails/${user?.id}`
      );

      const { data } = response;

      setEditedData({
        ...data,
      });
    };
    if (user) {
      fetchUser();
    }
  }, [isSignedIn]);
  return (
    <div className="flex flex-col gap-6 mt-8 items-center">
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
      <div className="">
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
      <div className="">
        <label htmlFor="phoneNumber" className="font-semibold text-sm">
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
      <Button className="w-40 mb-6 " onClick={handleSaveClicks}>
        Save Changes
      </Button>
    </div>
  );
};
