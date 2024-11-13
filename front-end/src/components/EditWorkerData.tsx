import { useState, ChangeEvent } from "react";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type WorkerModelType = {
    profile_picture: string;
    bio: string;
    experience: string;
    email: string;
    phoneNumber: string;
    address: string;
    salary_range: number;
    category: string;
    jobId: string;
};
const categories = [
    "Боловсрол",
    "Гэр ахуй",
    "Дизайн",
    "Орчуулга",
    "Гоо сайхан",
    "Урлаг",  
];

const EditWorkerData = () => {
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<WorkerModelType | null>({
        profile_picture: "",
        bio: "",
        experience: "",
        email: "",
        phoneNumber: "",
        address: "",
        salary_range: 0,
        category: "Боловсрол, Гэр ахуй, Дизайн, Орчуулга, Гоо сайхан, Урлаг ", 
        jobId: "",
    });
    
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // Set the local URL to preview the selected image
            setProfilePicture(URL.createObjectURL(file));

            // You can also upload the file to the server here if needed
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (editedData) {
            setEditedData({ ...editedData, [name]: value });
        }
    };
    

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-[150px] h-[150px] border border-gray-300 rounded-full overflow-hidden cursor-pointer">
                {/* Display uploaded or default profile picture */}
                {profilePicture ? (
                    <Image
                        src={profilePicture}
                        alt="Profile Picture"
                        layout="fill"
                        className="object-cover"
                    />
                ) : (
                    <img src="/images/default-profile.png" alt="Default profile" />
                )}

                {/* Hidden file input for uploading profile picture */}
                <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onImageChange}
                />

                {/* Edit Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full">
                    <FaRegEdit className="text-gray-500" />
                </div>
            </div>
            <div className="w-full flex items-center gap-2">
                <label htmlFor="category" className="font-semibold">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={editedData?.category || ""}
                    
                    className="border border-gray-300 rounded-md p-2"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {/* Textarea for editing bio */}
                {editingItem === "bio" ? (
                    <Textarea
                        name="bio"
                        placeholder="Write your bio here..."
                        className="w-[400px] h-[80px]"
                        value={editedData?.bio || ""}
                        onChange={handleChange}
                    />
                ) : (
                    <div onClick={() => setEditingItem("bio")}>
                        {editedData?.bio || "Click to edit bio"}
                    </div>
                )}
            </div>
            <div>
                {editingItem === "experience" ? (
                    <Textarea
                    name="experience"
                    placeholder="Write your experience here..."
                    className="w-[400px] h-[80px]"
                    value={editedData?.experience || ""}
                    onChange={handleChange}
                />  
                ) :(
                    <div onClick={() => setEditingItem("bio")}>
                        {editedData?.experience || "Click to edit experience"}
                    </div>
                )}
            </div>


        </div>
    );
};

export default EditWorkerData;
