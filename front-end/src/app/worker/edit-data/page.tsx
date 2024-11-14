"use client";
import { ChangeEvent, useState } from "react";
import EditImage from "@/components/EditImage";
import EditWorkerData from "@/components/EditWorkerData";
import Test from "@/components/Test";

const EditDataPage = () => {
  // Manage a single image URL and file
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadImage(file);

      // Create a preview URL for the selected file
      setImageURL(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* <div>
        <EditImage
          imageURL={imageURL}
          setImageURL={setImageURL}
          onImageChange={onImageChange}
        />
      </div> */}
      <div>
        <EditWorkerData />
      </div>
    </div>
  );
};

export default EditDataPage;
