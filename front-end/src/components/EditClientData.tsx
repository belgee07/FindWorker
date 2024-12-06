"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileUpload from "./ProfileUpload";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
  const { user, isSignedIn } = useUser();
  const { toast } = useToast();
  const router = useRouter();

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

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/updatedClient/${user?.id}`,
        updatedData
      );

      if (response.status === 200) {
        toast({ title: "Changes saved successfully!" });
        fetchUserData(); // Fetch updated data
      } else {
        toast({ title: "Failed to save changes." });
      }

      // Redirect to homepage
      setTimeout(() => {
        router.push("/"); // Redirect to homepage after a short delay
      }, 1500);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({ title: "An error occurred while saving changes." });
    }
  };

  useEffect(() => {
    if (!isSignedIn) {
      toast({ title: "Please log in", description: "Redirecting to login..." });
      router.push("/sign-in");
    }
  }, [isSignedIn, router, toast]);

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
    if (user) {
      fetchUserData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex flex-1 flex-col gap-8 mt-8 items-center">
      {/* Profile Picture Upload Section */}
      <div className="w-full flex justify-center">
        {imageURL && (
          <ProfileUpload
            setImage={setImage}
            setImageURL={setImageURL}
            imageURL={imageURL}
            accessUrl={imageURL}
            onImageChange={uploadImage}
          />
        )}
      </div>

      {/* Username Section */}
      <div className="w-full max-w-xl">
        <label htmlFor="username" className="font-semibold text-sm">
          1. Хэрэглэгчийн нэр
        </label>
        {editingItem === "username" ? (
          <Input
            className="mt-2"
            name="username"
            value={editedData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            onBlur={() => setEditingItem(null)}
          />
        ) : (
          <h1
            onClick={() => setEditingItem("username")}
            className="cursor-pointer text-xl mt-2 hover:text-blue-500"
          >
            {editedData.username || "Click to edit your username"}
          </h1>
        )}
      </div>

      {/* Phone Number Section */}
      <div className="w-full max-w-xl">
        <label htmlFor="phoneNumber" className="font-semibold text-sm">
          2. Утасны дугаар
        </label>
        {editingItem === "phoneNumber" ? (
          <Input
            className="mt-2"
            name="phoneNumber"
            value={editedData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            onBlur={() => setEditingItem(null)}
          />
        ) : (
          <h1
            onClick={() => setEditingItem("phoneNumber")}
            className="text-xl mt-2 cursor-pointer hover:text-blue-500"
          >
            {editedData.phoneNumber || "Click to edit your phone number"}
          </h1>
        )}
      </div>

      {/* Address Section */}
      <div className="w-full max-w-xl">
        <label htmlFor="address" className="font-semibold text-sm">
          3. Хаяг
        </label>
        {editingItem === "address" ? (
          <Input
            className="mt-2"
            name="address"
            value={editedData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            onBlur={() => setEditingItem(null)}
          />
        ) : (
          <h1
            onClick={() => setEditingItem("address")}
            className="text-xl mt-2 cursor-pointer hover:text-blue-500"
          >
            {editedData.address || "Click to edit your address"}
          </h1>
        )}
      </div>

      {/* Save Changes Button */}
      <Button className="w-40 mt-6" onClick={handleSaveClicks}>
        Save Changes
      </Button>
    </div>
  );
};
